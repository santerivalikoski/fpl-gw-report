const fs = require('fs')
const fileWriter = fs.createWriteStream('data.txt')

let content

fs.readFile('./db.json', function read(err, data) {
    if (err) throw err
    content = data;
    processFile();
})

// FUNCTIONS
function getCaptain(objectList, manager) {
    for (const player of objectList) {
        if (player.captainBoolean && player.manager === manager) {
            return player.playerName
        }
    }
    return undefined
}
function getPlayers(objectList, manager) {
    let playerList = new Set()
    for (const player of objectList) {
        if (player.manager === manager) playerList.add(player.playerName)
    }
    return playerList
}
function getOwners(objectList) {
    let playerSet = new Set()
    for (const player of objectList)
        if (player.playerName !== undefined) playerSet.add(player.playerName)

    let ownerList = new Array
    for (const player of playerSet) {
        ownerList.push({
            player: player,
            owners: new Set()
        })
    }

    for (const owner of ownerList) {
        for (const player of objectList) {
            if (player.playerName === owner.player) {
                owner.owners.add(player.manager)
            }
        }
    }
    ownerList.sort((a, b) => a.player.localeCompare(b.player))
    return ownerList
}
function filterDifferentials(data, ownerNumber) {
    let filteredList = data.filter(d => d.owners.size === ownerNumber)
    return filteredList
}
function getCaptainList(managers) {
    let captainSet = new Set()
    for (const m of managers) captainSet.add(m.captain)

    let captainList = new Array
    for (const captain of captainSet) {
        captainList.push({
            captain: captain,
            owners: new Set()
        })
    }
    for (const captain of captainList) {
        for (const manager of managers) {
            if (captain.captain === manager.captain) captain.owners.add(manager.manager)
        }
    }
    try {
        captainList.sort((a, b) => a.captain.localeCompare(b.captain))
        captainList.sort((a, b) => Number(a.owners.size) - Number(b.owners.size))
    }
    catch {
        console.log('Jonkun kapteeni heitetetty vaihtoon, ohjelma toimii kunnolla vain ennenkuin kierros on loppunut.')
    }
    return captainList
}
function getMostPopular(owners, managerList, topX) {
    let popularPlayers = new Array()
    for(const player of owners) {
        popularPlayers.push({
            player: player.player,
            popularity: Math.round(player.owners.size / managerList.size * 100)
        })
    }
    popularPlayers.sort((a, b) => Number(b.popularity) - Number(a.popularity))
    popularPlayers = popularPlayers.slice(0, topX)
    return popularPlayers
}

// MAIN PROGRAM
function processFile() {
    const dataFromJSON = JSON.parse(content)

    let managerList = new Set();
    let objectList = [{}]
    let managers = []

    for (const o1 of dataFromJSON) {
        for (const o2 of Object.entries(o1)) {
            objectList.push({
                manager: o2[1].manager,
                captainBoolean: o2[1].captain,
                playerName: o2[1].name
            })
            managerList.add(o2[1].manager)
        }
    }
    managerList.delete(undefined)
    for (const mana of managerList) {
        managers.push({
            manager: mana,
            captain: getCaptain(objectList, mana),
            playerList: getPlayers(objectList, mana)
        })
    }
    // print data.txt
    const owners = getOwners(objectList)
    const captains = getCaptainList(managers)
    const popularity = getMostPopular(owners, managerList, 10)
    const single = filterDifferentials(owners, 1)
    const double = filterDifferentials(owners, 2)
    const triple = filterDifferentials(owners, 3)
    fileWriter.write(`MANAGERIT ${managerList.size}KPL\n----------------------------------------------`)
    fileWriter.write('\nKAPTEENIT:')
    for (const captain of captains) {
        const owners = Array.from(captain.owners).join(", ")
        fileWriter.write(`\n${captain.captain}: ${owners}`)
    }
    fileWriter.write('\n----------------------------------------------')
    fileWriter.write('\nDIFFERENTIAALIT\nYHDELLÄ:')
    for (const s of single) {
        const owners = Array.from(s.owners).join(", ")
        fileWriter.write(`\n${s.player} : ${owners}`)
    }
    fileWriter.write('\n----------------------------------------------')
    fileWriter.write('\nKAHDELLA:')
    for (const s of double) {
        const owners = Array.from(s.owners).join(", ")
        fileWriter.write(`\n${s.player} : ${owners}`)
    }
    fileWriter.write('\n----------------------------------------------')
    fileWriter.write('\nKOLMELLA:')
    for (const s of triple) {
        const owners = Array.from(s.owners).join(", ")
        fileWriter.write(`\n${s.player} : ${owners}`)
    }
    fileWriter.write('\n----------------------------------------------')
    fileWriter.write('\nSUOSITUIMMAT:')
    for (const s of popularity) {
        fileWriter.write(`\n${s.player} : ${s.popularity}%`)
    }
    fileWriter.write(`\nYhteensä ${owners.length} eri pelaajaa valittu.`)
    fileWriter.end()
    console.log('Gameweek report saved in data.txt!')
}

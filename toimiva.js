const fs = require('fs');

let content;
fs.readFile('./db.json', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    processFile();
});
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
    captainList.sort((a, b) => Number(b.owners.size) - Number(a.owners.size))
  
    console.log(captainList)
    return captainList
}

function processFile() {
    const dada = JSON.parse(content)
    const dadaPituus = Object.keys(dada).length

    let managerList = new Set();
    let objectList = [{}]
    let managers = []

    for (const terve of dada) {
        for (const sisa of Object.entries(terve)) {
            objectList.push({
                manager: sisa[1].manager,
                captainBoolean: sisa[1].captain,
                playerName: sisa[1].name
            })
            managerList.add(sisa[1].manager)
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
    const owners = getOwners(objectList)
    const single = filterDifferentials(owners, 2)
    getCaptainList(managers)
//     fs.writeFile("data.txt",
//         `MANAGERIT ${managerList.size}KPL: \n ----------------------------------------------`,
//         function (err) {
//             if (err) {
//                 return console.log(err)
//             }
//             console.log("The file was saved!");
//         })


}

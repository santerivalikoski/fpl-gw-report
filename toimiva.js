const fs = require('fs');

let content;
fs.readFile('./db.json', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    processFile();
});
function getCaptain(data, manager) {
    for (const player of data) {
        if(player.captainBoolean && player.manager === manager) {
            return player.playerName
        }
    }
    return undefined
}
function getPlayers(data, manager) {
    let playerList = new Set()
    for(const player of data) {
        if (player.manager === manager) playerList.add(player.playerName)
    }
    return playerList
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
    console.log(managers.map(manakeri => `${manakeri.manager}: ${manakeri.captain}` ))
}

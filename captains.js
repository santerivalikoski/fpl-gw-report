const fs = require('fs');



var content;
// First I want to read the file
fs.readFile('./db.json', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
  
    processFile();          // Or put the next step in a function and invoke it
});


function processFile() {
    var dada = JSON.parse(content)
    var dadaPituus = Object.keys(dada).length
    var captains = []
    var players = []
    for(var i = 0; i < dadaPituus; i++) {
        var sisaPit = dada[i].length
        for(var j=0; j<sisaPit; j++) {
            if (dada[i][j].captain === true) {
                captains.push({
                    captain: dada[i][j].name,
                    manager: dada[i][j].manager
                })
            }        
        }
    }
    var lopullisetpelaajat = []
    var lopullisetkaput = []
    for(var i = 0; i < captains.length; i++) {
        var laskuri = 0
        for(var j = 0; j < captains.length; j++) {
            if (captains[i].captain === captains[j].captain) {
                laskuri++
            }
        }
        if (lopullisetkaput.includes(captains[i].captain)) {
            // console.log(laskuri)
        }
        else {
            lopullisetkaput.push(captains[i].captain)
        }
    }
    var nimilista = new Array(lopullisetkaput.length)
    for (var i = 0; i < nimilista.length; i++) {
        nimilista[i] = new Array()
    }
    console.log(`MANAGERIT ${captains.length}kpl :`)
    console.log('----------------------------------------------')
    console.log('KAPTEENIT:')
    for (var i = 0; i < lopullisetkaput.length; i++) {
        for (var j = 0; j < captains.length; j++) {
            if (lopullisetkaput[i] === captains[j].captain) {
                nimilista[i].push(captains[j].manager)
            }
        }
        console.log(lopullisetkaput[i], ": ", nimilista[i].join(", "))
    }

    // console.log(nimilista)
    // console.log(lopullisetkaput)
     for(var i = 0; i < dadaPituus; i++) {
        var sisaPit = dada[i].length
        for(var j=0; j<sisaPit; j++) {
            players.push({
                player: dada[i][j].name,
                manager: dada[i][j].manager
            })
        }
    }
    var lopullisetpelaajat = []
    for(var i = 0; i < players.length; i++) {
        var laskuri = 0
        for(var j = 0; j < players.length; j++) {
            if (players[i].player === players[j].player) {
                laskuri++
            }
        }
        if (lopullisetpelaajat.includes(players[i].player)) {
            // console.log(laskuri)
        }
        else {
            lopullisetpelaajat.push(players[i].player)
        }
    }

    var managerilista = new Array(lopullisetpelaajat.length)
    for (var i = 0; i < managerilista.length; i++) {
        managerilista[i] = new Array()
    }
    console.log('----------------------------------------------')
    console.log('DIFFERENTIAALIT:')
    console.log('YHDELLÄ:')

    for (var i = 0; i < lopullisetpelaajat.length; i++) {
        for (var j = 0; j < players.length; j++) {
            if (lopullisetpelaajat[i] === players[j].player) {
                managerilista[i].push(players[j].manager)
            }
        }
        if (managerilista[i].length === 1) {
            console.log(lopullisetpelaajat[i], ": ", managerilista[i].join(", "))
        }
        // console.log('pituus ', managerilista[i].length)
    }

    var manageriTupla = new Array(lopullisetpelaajat.length)
    for (var i = 0; i < manageriTupla.length; i++) {
        manageriTupla[i] = new Array()
    }
    console.log('----------------------------------------------')
    console.log('KAHDELLA:')
    for (var i = 0; i < lopullisetpelaajat.length; i++) {
        for (var j = 0; j < players.length; j++) {
            if (lopullisetpelaajat[i] === players[j].player) {
                manageriTupla[i].push(players[j].manager)
            }
        }
        if (manageriTupla[i].length === 2) {
            console.log(lopullisetpelaajat[i], ": ", manageriTupla[i].join(", "))
        }
        // console.log('pituus ', manageriTupla[i].length)
    }

    var manageriTripla = new Array(lopullisetpelaajat.length)
    for (var i = 0; i < manageriTripla.length; i++) {
        manageriTripla[i] = new Array()
    }
    console.log('----------------------------------------------')
    console.log('KOLMELLA:')
    for (var i = 0; i < lopullisetpelaajat.length; i++) {
        for (var j = 0; j < players.length; j++) {
            if (lopullisetpelaajat[i] === players[j].player) {
                manageriTripla[i].push(players[j].manager)
            }
        }
        if (manageriTripla[i].length === 3) {
            console.log(lopullisetpelaajat[i], ": ", manageriTripla[i].join(", "))
        }
        // console.log('pituus ', manageriTripla[i].length)
    }
    // console.dir(players)
    }
    
const puppeteer = require('puppeteer');
const fs = require('fs');
const gw = 11
let teamUrlsList = [
    `https://fantasy.premierleague.com/entry/403555/event/${gw}`,
    `https://fantasy.premierleague.com/entry/2491640/event/${gw}`,
    `https://fantasy.premierleague.com/entry/937861/event/${gw}`,
    `https://fantasy.premierleague.com/entry/152498/event/${gw}`,
    `https://fantasy.premierleague.com/entry/686663/event/${gw}`,
    `https://fantasy.premierleague.com/entry/2262018/event/${gw}`,
    `https://fantasy.premierleague.com/entry/3071221/event/${gw}`,
    `https://fantasy.premierleague.com/entry/3347188/event/${gw}`,
    `https://fantasy.premierleague.com/entry/3041619/event/${gw}`,
    `https://fantasy.premierleague.com/entry/4329720/event/${gw}`,
    `https://fantasy.premierleague.com/entry/3656504/event/${gw}`,
    `https://fantasy.premierleague.com/entry/85564/event/${gw}`,
    `https://fantasy.premierleague.com/entry/488333/event/${gw}`,
    `https://fantasy.premierleague.com/entry/1748058/event/${gw}`,
    `https://fantasy.premierleague.com/entry/424204/event/${gw}`,
    `https://fantasy.premierleague.com/entry/1273510/event/${gw}`,
    `https://fantasy.premierleague.com/entry/635637/event/${gw}`,
    `https://fantasy.premierleague.com/entry/3892961/event/${gw}`,
    `https://fantasy.premierleague.com/entry/2302161/event/${gw}`
];
let managers = [{}]
var pituus = teamUrlsList.length
var laskuri = 0
console.log(`Starting gameweek ${gw} report`)
let tulos =    (async () => {
        for (var i = 0; i < pituus; i++) {
            let teamUrl = teamUrlsList[i];
            laskuri++
            process.setMaxListeners(12)
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            // await page.setViewport({ width: 1920, height: 926 });
            await page.goto(teamUrl, { waitUntil: 'networkidle2' });
            // get player details
            let teamData = await page.evaluate(() => {
                let players = [];
                let manager = document.querySelector('div[class="sc-bdVaJa jWQvkU"] > h2[class="Entry__EntryName-sc-1kf863-0 frXpNV"]').innerText
                let captains = []
                // get the player elements
                let playersElms = document.querySelectorAll('div[class="Pitch__PitchUnit-sc-1mctasb-3 gYXrCB"]')

                // get the player data
                playersElms.forEach((playerElement) => {
                    let playerJson = {};
                    try {
                        playerJson.name = playerElement.querySelector('div[class="PitchElementData__ElementName-sc-1u4y6pr-0 hZsmkV"]').innerText
                        playerJson.captain = false
                        playerJson.manager = manager
                        if (playerElement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]')) {
                            playerJson.captain = true
                        }


                    }
                    catch (exception) {

                    }
                    players.push(playerJson);
                });
                // KELTASELLA JA PUNASELLA OLEVAT PITÄÄ OTTAA ERIKSEEN, PUNASIA EI TÄLLÄ HETKELLÄ HAETA OLLENKAAN
                playersElms.forEach((playerElement) => {
                    let yellowPlayer = {};
                    try {
                        yellowPlayer.name = playerElement.querySelector('div[class="PitchElementData__ElementName-sc-1u4y6pr-0 fXSnzv"]').innerText
                        yellowPlayer.captain = false
                        yellowPlayer.manager = manager
                        if (playerElement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]')) {
                            yellowPlayer.captain = true
                        }

                    }
                    catch (exception) {

                    }
                    players.push(yellowPlayer);
                });
                return players;
            });
            managers.push(teamData)
            console.log(laskuri, ' / ', pituus, ' teams loaded.')
            // console.dir(teamData);
            // fs.writeFile("./db.json", JSON.stringify(teamData), function(err) {
            //     if (err) {
            //         return console.log(err)
            //     }
            //     console.log("The file was saved!");
            // })
            await browser.close()
            if (laskuri === pituus) {
                console.log('Writing file...')
                fs.writeFile("./db.json", JSON.stringify(managers), function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("The file was saved!");
                })
            }
        }
    })();

// setTimeout(() => {
//     for (var i = 11; i < 19; i++) {
//         let teamUrl = teamUrlsList[i];
//         (async () => {
//             const browser = await puppeteer.launch({ headless: true });
//             const page = await browser.newPage();
//             // await page.setViewport({ width: 1920, height: 926 });
//             await page.goto(teamUrl, { waitUntil: 'networkidle2' });
//             // get player details
//             let teamData = await page.evaluate(() => {
//                 let players = [];
//                 let manager = document.querySelector('div[class="sc-bdVaJa jWQvkU"] > h2[class="Entry__EntryName-sc-1kf863-0 frXpNV"]').innerText
//                 let captains = []
//                 // get the player elements
//                 let playersElms = document.querySelectorAll('div[class="Pitch__PitchUnit-sc-1mctasb-3 gYXrCB"]')

//                 // get the player data
//                 playersElms.forEach((playerElement) => {
//                     let playerJson = {};
//                     try {
//                         playerJson.name = playerElement.querySelector('div[class="PitchElementData__ElementName-sc-1u4y6pr-0 hZsmkV"]').innerText
//                         playerJson.captain = false
//                         playerJson.manager = manager
//                         if (playerElement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]')) {
//                             playerJson.captain = true
//                         }


//                     }
//                     catch (exception) {

//                     }
//                     players.push(playerJson);
//                 });
//                 playersElms.forEach((playerElement) => {
//                     let yellowPlayer = {};
//                     try {
//                         yellowPlayer.name = playerElement.querySelector('div[class="PitchElementData__ElementName-sc-1u4y6pr-0 fXSnzv"]').innerText
//                         yellowPlayer.captain = false
//                         yellowPlayer.manager = manager
//                         if (playerElement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]')) {
//                             yellowPlayer.captain = true
//                         }

//                     }
//                     catch (exception) {

//                     }
//                     players.push(yellowPlayer);
//                 });
//                 return players;
//             });
//             managers.push(teamData)
//             // console.dir(teamData);
//             // fs.writeFile("./db.json", JSON.stringify(teamData), function(err) {
//             //     if (err) {
//             //         return console.log(err)
//             //     }
//             //     console.log("The file was saved!");
//             // })
//             await browser.close()
//         })();
//     }
// }, 45000);

// setTimeout(() => {
//     fs.writeFile("./db.json", JSON.stringify(managers), function (err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("The file was saved!");
//     })
// }, 85000);
// console.log('----LOPPU-----')
// console.dir(managers)

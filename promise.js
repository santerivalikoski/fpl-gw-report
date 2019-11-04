const puppeteer = require('puppeteer');
const fs = require('fs')

let tulostus = [{}]
let urlList = new Set()
let leagueUrl = 'https://fantasy.premierleague.com/leagues/727333/standings/c'
let managers = [{}]
let pituus = 0
let laskuri = 0
let promise = new Promise(function (resolve, reject) {
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(leagueUrl, { waitUntil: 'networkidle2' });
        let urlData = await page.evaluate(() => {
            let urls = []
            let leagueName = document.querySelector('div[class="Copy-zj3yf2-0 kbodRR"] > h2[class="Title-sc-9c7mfn-0 ldEDNa"]').innerText
            let urlElements = document.querySelectorAll('tr[class="StandingsRow-fwk48s-0 jRzimt"]')
            urlElements.forEach((playerElement) => {
                let urlJson = {};
                try {
                    urlJson.name = playerElement.querySelector('a[class="Link-a4a9pd-1 jwJFdW"]').getAttribute('href')
                    urlJson.league = leagueName
                }
                catch (exception) {
                    console.log(exception)
                }
                urls.push(urlJson);
            });
            return urls;
        });
        tulostus.push(urlData)
        await browser.close()
        pituus = tulostus[1].length
        if (tulostus[1].length > 1) resolve(tulostus[1][1].league)
        else reject('buu')
    })();
})
promise.then(function (val) {
    console.log(val)
    for (let i = 0; i < tulostus[1].length; i++) {
        urlList.add(`https://fantasy.premierleague.com${tulostus[1][i].name}`)
    }
    console.log(urlList)
    console.log(`Starting gameweek report`);
        (async () => {
            for (const teamUrl of urlList) {
                laskuri++
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                // await page.setViewport({ width: 1920, height: 926 });
                await page.goto(teamUrl, { waitUntil: 'networkidle2' });
                // get player details
                let teamData = await page.evaluate(() => {
                    let players = [];
                    let manager = document.querySelector('div[class="sc-bdVaJa jWQvkU"] > h2[class="Entry__EntryName-sc-1kf863-0 frXpNV"]').innerText

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
                            console.log('exception: ', exception)
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
                            console.log('exception: ', exception)
                        }
                        players.push(yellowPlayer);
                    });
                    return players;
                });
                managers.push(teamData)
                console.log(`${laskuri} / ${pituus} teams loaded.`)
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
})


console.log('koodin loppu')
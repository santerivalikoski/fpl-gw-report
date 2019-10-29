const puppeteer = require('puppeteer');
const fs = require('fs');

const GetPlayers = (url) => {
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 926 });
        await page.goto(url, { waitUntil: 'networkidle2' });

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
    
                }
                players.push(playerJson);
            });
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
        })
        await browser.close()
        return teamData
})
}

var tetete = GetPlayers('https://fantasy.premierleague.com/entry/2302161/event/10')
console.dir(tetete)


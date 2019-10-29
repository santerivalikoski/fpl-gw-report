const puppeteer = require('puppeteer');
let bookingUrl = 'https://fantasy.premierleague.com/entry/403555/event/10';

let managers = []
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);
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
                if(playerElement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]'))   { 
                    playerJson.captain = true
                }
   

            }
            catch (exception){

            }
            players.push(playerJson);
        });
        playersElms.forEach((playerElement) => {
            let yellowPlayer = {};
            try {
                yellowPlayer.name = playerElement.querySelector('div[class="PitchElementData__ElementName-sc-1u4y6pr-0 fXSnzv"]').innerText
                yellowPlayer.captain = false
                yellowPlayer.manager = manager
                if(playerElement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]'))   { 
                    yellowPlayer.captain = true
                }  

            }
            catch (exception){

            }
            players.push(yellowPlayer);
        });
        return players;
    });


   

    // for(var i = teamData.length; i > -1; i--) {
    //     if (i === 0 || i === 1 || i === 3 || i === 4) {
    //         delete teamData[i]
    //     }
    // }

    console.dir(teamData);
    await browser.close()
})();  


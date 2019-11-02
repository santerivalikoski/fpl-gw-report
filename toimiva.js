const puppeteer = require('puppeteer');

let bookingUrl = 'https://fantasy.premierleague.com/entry/2491640/event/10';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('button[class="Utils__UnstyledButton-sc-1cvr1yj-1 eCLNIm"]')
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {

                hotelJson.name = hotelelement.querySelector('div[class="PitchElementData__ElementName-sc-1u4y6pr-0 hZsmkV"]').innerText
                hotelJson.captain = false
                if (hotelelement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]')) {
                    hotelJson.captain = true
                }

                // console.log(hotelJson.captain)
            }
            catch (exception) {

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
    await browser.close()
})();


//         let hotels = [];
//         // get the hotel elements
//         let hotelsElms = document.querySelectorAll('div.Pitch__PitchUnit-sc-1mctasb-3 gYXrCB');
//         // get the hotel data
//         hotelsElms.forEach((hotelelement) => {
//             let hotelJson = {};
//             try {
//                 hotelJson.name = hotelelement.querySelector('div.PitchElementData__ElementName-sc-1u4y6pr-0 hZsmkV').innerText;

//             }
//             catch (exception){
//                 console.log('catchi', exception)
//             }
//             hotels.push(hotelJson);
//             console.log('testi')
//         });
//         return hotels;
//     });

//     console.dir(hotelData);
// })();
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://fantasy.premierleague.com/entry/2491640/event/10');

//   // Get the "viewport" of the page, as reported by the page.
//   const dimensions = await page.evaluate(() => {
//     return {
//       width: document.documentElement.clientWidth,
//       height: document.documentElement.clientHeight,
//       deviceScaleFactor: window.devicePixelRatio
//     };
//   });

//   console.log('Dimensions:', dimensions);

//   await browser.close();



for (var i = 0; i < urlList.length; i++) {
    let url = urlList[i];
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        let Data = await page.evaluate(() => {
            let manager = document.querySelector('div[class="sc-bdVaJa jWQvkU"] > h2[class="Entry__EntryName-sc-1kf863-0 frXpNV"]').innerText
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
        // console.dir(teamData);
        // fs.writeFile("./db.json", JSON.stringify(teamData), function(err) {
        //     if (err) {
        //         return console.log(err)
        //     }
        //     console.log("The file was saved!");
        // })
        await browser.close()
    })();
}

const puppeteer = require('puppeteer');
const fs = require('fs');

let urlList = [
    'www.esimerkki.fi/1',
    'www.esimerkki.fi/2',
    'www.esimerkki.fi/3',
    'www.esimerkki.fi/4',
    'www.esimerkki.fi/5',
    ...
    'www.esimerkki.fi/50',
]
let tulos = [{}]

for (var i = 0; i < urlList.length; i++) {
    let url = urlList[i];
    // puppeteer koodi:
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        let Data = await page.evaluate(() => {
            // ..................
        })
        tulos.push(Data)
        await browser.close()
    })()
}

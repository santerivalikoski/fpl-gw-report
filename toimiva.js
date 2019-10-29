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
                if(hotelelement.querySelector('svg[class="TeamPitchElement__StyledCaptain-sc-202u14-1 giBNVk"]'))   { 
                    hotelJson.captain = true
                }
                
                // console.log(hotelJson.captain)
            }
            catch (exception){

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

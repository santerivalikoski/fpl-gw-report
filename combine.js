const $ = require('jquery')
const fs = require('fs')

// var obj1 = {"name": "Garrett Davidson", "gender": "male", "dob": "1990/04/20"};
// var obj2 = {"position": "System Administrator", "location": "New York"};

// var final = $.extend(obj1, obj2);

var content = fs.readFile('./db.json', function read(err, data) {
    if (err) {
        throw err;
    }
    return JSON.parse(data)
});
console.log (content)
// var content2
// var saveConte = []
// fs.readFile('./db2.json', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content2 = data;
//     processFile(content2)
//     // Invoke the next step here however you like

// });
// function processFile(rere) {
//     var dada = JSON.parse(rere)
//     // console.log(dada)
//     saveConte.push(dada)
// }



// // var object = Object.assign(content, content2)
// console.log(saveConte)

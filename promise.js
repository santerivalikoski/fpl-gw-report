var promise = new Promise(function(resolve, reject) {
    console.log('terve')
  
    if (2 === 2) {
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  });
  promise.then(function(result) {
    console.log(result); // "Stuff worked!"
  }, function(err) {
    console.log(err); // Error: "It broke"
  });
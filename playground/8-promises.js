const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([9, 9, 9]);
    reject("Something went wrong !!!");
    resolve([9, 6, 3]);
  }, 2000);
});

doWorkPromise
  .then((result) => console.log("Success: " + result))
  .catch((error) => console.log("Error: " + error))
  .finally(() => console.log(`Last Execution after the try, catch...`));

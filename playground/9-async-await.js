const add = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) return reject("Number must be non -ve");
    setTimeout(() => resolve(a + b), 0000);
  });
};

const doWork = async () => {
  //   throw new Error("Something went wrong!");
  //   return await add(5, 5);
  //   return "SS vzan2012";
  const sum = await add(5, 5);
  const sum2 = await add(sum, sum);
  const sum3 = await add(sum2, 10);
  return sum3;
};

// console.log(doWork());

// console.log(doWork().then((result) => console.log(result)));

doWork()
  .then((result) => console.log(result))
  .catch((e) => console.log(`Error: ${e}`));

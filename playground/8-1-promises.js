// const add = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(a + b), 2000);
//   });
// };

const add = (a, b) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(a + b), 2000));

// Without chaining
// add(5, 5)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 10).then((sum2) => console.log(sum2));
//   })
//   .catch((e) => console.log(e));

// Promise Chaining
add(5, 5)
  .then((sum) => {
    console.log(sum);
    return add(sum, 10);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => console.log(e));

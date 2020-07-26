const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

// test("Hello World", () => {});

// test("This should fail !!!", () => {
//   throw new Error("FAILURE");
// });

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);

  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);

  expect(total).toBe(12.5);
});

test("Should convert 32 F to 0 C", () =>
  expect(fahrenheitToCelsius(32)).toBe(0));

test("Should convert 0 C to 32 F", () =>
  expect(celsiusToFahrenheit(0)).toBe(32));

// test("Async test demo", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 3000);
// });

test("Should add two numbers", (done) => {
  add(3, 3).then((sum) => {
    expect(sum).toBe(6);
    done();
  });
});

test("Should add two numbers - async/await", async () => {
  const sum = await add(30, 60);
  expect(sum).toBe(90);
});

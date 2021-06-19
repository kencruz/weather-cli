const { temperatureString } = require("../helper");

test("temp string in celsius", () => {
  expect(temperatureString(true, false, 289).temperature).toBe("15.85C");
});

test("temp string in farhenheit", () => {
  expect(temperatureString(false, false, 289).temperature).toBe("60.53F");
});

test("temp string in celsius, farhenheit", () => {
  expect(temperatureString(true, true, 289).temperature).toBe(
    "15.85C / 60.53F"
  );
});

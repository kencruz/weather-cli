const { temperatureString } = require("../helper");

test("temp string in celsius", () => {
  expect(temperatureString(true, false, 289).temperature).toBe("15.85C");
});

test("temp string in farhenheit", () => {
  expect(temperatureString(false, false, 289).temperature).toBe("60.53F");
});

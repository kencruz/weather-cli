const { temperatureString } = require("../helper");

test("temp string", () => {
  expect(temperatureString(true, false, 289).temperature).toBe("15.85C");
});

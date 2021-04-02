exports.toFahrenheit = (kelvin) => {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
};

exports.toCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

function toFahrenheit(kelvin) {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
}

function toCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

exports.temperatureString = (celsius, farhenheit, kelvin) => {
  if (celsius && farhenheit)
    return `${toCelsius(kelvin)}C / ${toFahrenheit(kelvin)}F`;

  if (celsius) return `${toCelsius(kelvin)}C`;

  if (farhenheit) return `${toFahrenheit(kelvin)}F`;
};

function toFahrenheit(kelvin) {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
}

function toCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

function tempColor(kelvin, tempString) {
  if (kelvin > 303) {
    return tempString.toString().red;
  }
  if (kelvin > 293) {
    return tempString.toString().yellow;
  }
  if (kelvin > 283) {
    return tempString.toString().gray;
  }
  if (kelvin > 273) {
    return tempString.toString().cyan;
  }
  return tempString.toString().blue;
}

exports.temperatureString = (celsius, farhenheit, kelvin) => {
  if (celsius && farhenheit) {
    const tempString = `${toCelsius(kelvin)}C / ${toFahrenheit(kelvin)}F`;
    return tempColor(kelvin, tempString);
  }

  if (celsius) {
    const tempString = `${toCelsius(kelvin)}C`;
    return tempColor(kelvin, tempString);
  }

  if (farhenheit) {
    const tempString = `${toFahrenheit(kelvin)}F`;
    return tempColor(kelvin, tempString);
  }
};

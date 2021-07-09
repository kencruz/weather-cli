import * as _ from "colors";

function toFahrenheit(kelvin: number): String {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
}

function toCelsius(kelvin: number): String {
  return (kelvin - 273.15).toFixed(2);
}

function tempColor(kelvin: number, tempString: string): string {
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

export const temperatureString = (
  celsius: boolean | undefined,
  farhenheit: boolean | undefined,
  kelvin: number
): { temperature: string; temperatureColored: string } => {
  let tempString: string, tempStringColor: string;

  if (celsius && farhenheit) {
    tempString = `${toCelsius(kelvin)}C / ${toFahrenheit(kelvin)}F`;
    tempStringColor = tempColor(kelvin, tempString);
  } else if (celsius) {
    tempString = `${toCelsius(kelvin)}C`;
    tempStringColor = tempColor(kelvin, tempString);
  } else {
    tempString = `${toFahrenheit(kelvin)}F`;
    tempStringColor = tempColor(kelvin, tempString);
  }

  return { temperature: tempString, temperatureColored: tempStringColor };
};

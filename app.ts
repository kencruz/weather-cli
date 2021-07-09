require("dotenv").config();
import https from "https";
import fs from "fs";
import yargs from "yargs";
import _ from "colors";
import { temperatureString } from "./helper";

// builds arguments
const argv = yargs
  .option("farhenheit", {
    alias: "f",
    description: "Show the number of degrees in farhenheit",
    type: "boolean",
  })
  .option("celsius", {
    alias: "c",
    description: "Show the number of degrees in celsius",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

function get_coords(
  query: string
): Promise<{ name: string; coords: number[] }> {
  return new Promise((resolve, reject) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAPBOX_API}`;

    https.get(url, (response) => {
      let data = "";

      // Accumulate received chunk of data
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const result = JSON.parse(data);
        // check if api response sends an error
        if (result.message) {
          reject("Mapbox API: " + result.message);
        }
        // check if no results found
        else if (result.features.length < 1) {
          reject("ERROR: No coordinates were found with the given query");
        } else {
          const location = {
            name: result.features[0].place_name,
            coords: result.features[0].geometry.coordinates,
          };
          resolve(location);
        }
      });

      response.on("error", (e) => {
        reject(e);
      });
    });
  });
}

function get_weather(location: {
  name: string;
  coords: number[];
}): Promise<{ weather: string; weather_color: string }> {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${location.coords[0]}&lat=${location.coords[1]}&exclude=minutely,hourly,alerts&appid=${process.env.OPEN_WEATHER_API}`;

    https.get(url, (response) => {
      let data = "";

      // Accumulate received chunk of data
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const result = JSON.parse(data);
        // check if api response sends an error
        if (result.message) {
          reject("OpenWeather API: " + result.message);
        } else {
          const temp = temperatureString(
            argv.celsius,
            argv.farhenheit,
            result.current.temp
          );
          const output = `Current temperature in ${location.name} is ${temp.temperature}.
Conditions are currently: ${result.current.weather[0].description}.
What you should expect: ${result.daily[0].weather[0].description} throughout the day.\n`;
          const output_color = `Current temperature in ${location.name} is ${temp.temperatureColored}.
Conditions are currently: ${result.current.weather[0].description}.
What you should expect: ${result.daily[0].weather[0].description} throughout the day.\n`;
          resolve({ weather: output, weather_color: output_color });
        }
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
}

// the main function
(async function () {
  // check if api keys exist
  if (!process.env.MAPBOX_API || !process.env.OPEN_WEATHER_API) {
    throw "ERROR: Must have MAPBOX_API and OPEN_WEATHER_API values in the environment or .env file";
  }

  // check if at least one flag argument exists
  if (!argv.farhenheit && !argv.celsius) {
    throw "ERROR: Must include at least one farhenheit or celsius flag ([--farhenheit|-f] | [--celsius|-c])";
  }

  // check if query was entered
  if (argv._.length < 1) throw "ERROR: Must input region!";

  const query = argv._.join(" ");
  const location = await get_coords(query).catch((e) => {
    throw e;
  });
  const weather = await get_weather(location).catch((e) => {
    throw e;
  });
  console.log(weather.weather_color);

  // try to append info to file
  fs.appendFile("weather.txt", weather.weather + "\n", function (e) {
    if (e) throw e;
    console.log("Weather was added to your weather tracking file, weather.txt");
  });
})().catch((e) => {
  console.error(e.red);
});

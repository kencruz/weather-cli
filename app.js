require("dotenv").config();
const https = require("https");
const fs = require("fs");
const yargs = require("yargs");
const { toCelsius, toFahrenheit } = require("./helper");

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

function get_coords(query) {
  return new Promise((resolve, reject) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAPBOX_API}`;

    https.get(url, (response) => {
      let data = "";

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      response.on("end", () => {
        let result = JSON.parse(data);
        let location = {
          name: result.features[0].place_name,
          coords: result.features[0].geometry.coordinates,
        };
        resolve(location);
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
}

function get_weather(location) {
  return new Promise((resolve, reject) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lon=${location.coords[0]}&lat=${location.coords[1]}&exclude=minutely,hourly,alerts&appid=${process.env.OPEN_WEATHER_API}`;

    https.get(url, (response) => {
      let data = "";

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      response.on("end", () => {
        let result = JSON.parse(data);
        let temp = argv.farhenheit
          ? `${toFahrenheit(result.current.temp)}F`
          : `${toCelsius(result.current.temp)}C`;
        let output = `Current temperature in ${location.name} is ${temp}.
Conditions are currently: ${result.current.weather[0].description}.
What you should expect: ${result.daily[0].weather[0].description} throughout the day.\n`;
        resolve(output);
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
}

// example function to get started
(async () => {
  if (
    (!argv.farhenheit && !argv.celsius) ||
    (argv.farhenheit && argv.celsius)
  ) {
    console.log(
      "ERROR: Must include farhenheit or celsius flags but not both ([--farhenheit|-f] | [--celsius|-c])"
    );
  } else if (argv._length < 1) {
    console.log("ERROR: Must input region!");
  } else {
    const location = await get_coords(argv._.join(" "));
    const weather = await get_weather(location);
    console.log(weather);

    fs.appendFile("weather.txt", weather + "\n", function (err) {
      if (err) throw err;
      console.log(
        "Weather was added to your weather tracking file, weather.txt"
      );
    });
  }
})();

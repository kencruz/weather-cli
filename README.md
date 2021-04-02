# Weather CLI

![preview](./preview.gif)

## Overview

This CLI app pulls a summary of weather information of the day for the region defined by the argument and saves the data to a file. Utilizes the Node.js runtime. It pulls location data from the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) and weather data from the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api).

## Features

- Can pull precison weather data from a country to down to a street address.

- Option to choose between showing Celsuis or Fareinheit temperatures.

- Saves output data to text file.

## Getting started

Ensure [node.js](https://nodejs.org/) is installed in your system.

Clone this repo:

```
$ git clone https://github.com/kencruz/weather-cli.git && cd weather-cli
```

Install the dependencies:
```
$ npm install
```

Create a `.env` file at the project root with your `OpenWeather API key` and `Mapbox access token`.

```dosini
OPEN_WEATHER_API=
MAPBOX_API=
```

## Usage

For showing celsius temperatures, add `--celsius` or `-c` to the location query.
```
$ node app.js Toronto -c
```
For showing farhenheit temperatures, add `--farhenheit` or `-f` to the location query.
```
$ node app.js Toronto -f
```

Weather data queries are saved to `weather.txt`

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv)
- [yargs](https://www.npmjs.com/package/yargs)

require("dotenv").config();

const yargs = require("yargs");

const argv = yargs
  .option("farhenheit", {
    alias: "f",
    description: "Show the number of degrees in farhenheit",
    type: "number",
  })
  .option("celsius", {
    alias: "c",
    description: "Show the number of degrees in celsius",
    type: "number",
  })
  .help()
  .alias("help", "h").argv;

if (!argv.farhenheit && !argv.celsius) {
  console.log(
    "ERROR: Must have at least --farhenheit -f or --celsius -c flags in arguments!"
  );
}

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

if (argv._length < 1) {
  console.log("ERROR: Must input region!");
}

if (!argv.farhenheit && !argv.celsius) {
  console.log(
    "ERROR: Must include farhenheit or celsius values ([--farhenheit|-f] <degrees> | [--celsius|-c] <degrees>)"
  );
}

if (argv.farhenheit) {
  console.log("Show farhenheit");
}

if (argv.celsius) {
  console.log("Show celsius");
}

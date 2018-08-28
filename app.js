const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: "Address to fetch",
      string: true
    }
  })
  .help()
  .argv;

geocode.geocodeAddress(argv.address, (error, res) => {
  if (error) {
    console.log(error);
  } else {
    weather.getWeather(res.latitude, res.longitude, (error, wres) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`It's currently ${((wres.temp - 32) * 0.5556).toFixed(2)} Celsius in ${res.address}`);
      }
    });
  }
});

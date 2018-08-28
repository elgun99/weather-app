const yargs = require('yargs');
const axios = require('axios');

const { argv } = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch',
      string: true
    }
  })
  .help();

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://eu1.locationiq.com/v1/search.php?key=d45a88f995a7d7&q=${encodedAddress}&format=json`;

axios.get(geocodeUrl).then((response) => {
  const { lat } = response.data[0];
  const { lon } = response.data[0];
  const weatherUrl = `https://api.darksky.net/forecast/7734a493f556e367ec432f4fbb094a3d/${lat},${lon}`;
  console.log(response.data[0].display_name);
  return axios.get(weatherUrl);
}).then((response) => {
  const temp = response.data.currently.temperature;
  console.log(`It's currently ${((temp - 32) * 0.5556).toFixed(2)} Celsius`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to the servers');
  } else {
    console.log('Unable to find that address');
  }
});

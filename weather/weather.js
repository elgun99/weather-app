const request = require('request');

var getWeather = (lat, lon, callback) => {
  request({
    url:  `https://api.darksky.net/forecast/7734a493f556e367ec432f4fbb094a3d/${lat},${lon}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temp: body.currently.temperature,
        actualTemp: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch');
    }
  })
}

module.exports = {
  getWeather
}

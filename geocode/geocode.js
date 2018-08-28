const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://eu1.locationiq.com/v1/search.php?key=d45a88f995a7d7&q=${encodedAddress}&format=json`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to the servers")
    } else if (Object.prototype.toString.call(body) === '[object Object]') {
      callback("Unable to find that address");
    } else {
      callback(undefined, {
        address: body[0].display_name,
        latitude: body[0].lat,
        longitude: body[0].lon
      });

    }
  })
}

module.exports = {
  geocodeAddress
}

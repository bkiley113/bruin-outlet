var http = require('http');

var options = {
    hostname: 'ipinfo.io',
    port: 80,
    path: '/json',
    method: 'GET'
};

var request = require('request');

request('http://ipinfo.io/json', function(error, response, body) {
    var json = JSON.parse(body);
    console.log('Your location: ' + json.city + ', ' + json.region);
});


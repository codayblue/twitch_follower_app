var fs = require('fs');
var https = require('https');

function getSettings() {
	
	var data = fs.readFileSync('settings.csv', 'UTF-8');
	var settings = data.split(",");

	return settings;
}

function getData(username) {

	var data = {};

	var options = {
  		hostname: 'api.twitch.tv',
  		port: 443,
 		path: '/kraken/channels/'+ username +'/follows',
 		method: 'GET',
 		headers: {
    		'Content-Type': 'Accept: application/vnd.twitchtv.v3+json',
  		}
	};

	var req = https.request(options, function(res){
		res.setEncoding('UTF-8');
	  	res.on('data', function (chunk) {
	  		var obj = JSON.parse(chunk);
	    	data = obj._total;
  		});

	});

	req.on('error', function(err){
		console.error(err);
	});

	req.end();

	return data;
}

function setSettings(uname, intval, goal, dintval) {

}

function writeToFile(fileName, File, encoding, data) {

}
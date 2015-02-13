var fs = require('fs');
var https = require('https');
var close = true;
var user = [];
var num = "";

function getSettings() {
	var settings = [];
	var fdata = fs.readFileSync('settings.csv', 'utf8');
	settings = fdata.split(",");

	//console.log(settings);

	return settings;
}

function getData(username) {

	var idata = {};

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
		res.setEncoding('utf8');
	  	res.on('data', function (chunk) {
	  		var obj = JSON.parse(chunk);
	    	idata = obj._total;
	    	num = String(idata);
	    	
	    	//console.log(idata);
  		});

	});

	req.on('error', function(err){
		console.error(err);
	});

	req.end();

	//return req;
}

function setData(data) {

	var set = [];
	set = getSettings();

	var sent = set[1] + " Goal " + data + "/" + set[2];

	//console.log(data);

	writeToFile('goal.txt', sent);
}

function writeToFile(fileName, data) {

	fs.writeFileSync(fileName, data);

}

user = getSettings();
intval = user[3] * 1000;
getData(user[0]);

console.log("To exit press ctrl-c");
setInterval(function() {
	getData(user[0]);
	console.log("it fired");
	setData(num);
}, intval);
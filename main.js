var fs = require('fs');
var https = require('https');
var prompt = require('prompt');
var close = true;
var user = [];
var num = "";

function getSettings() {
	var settings = [];
	var fdata = fs.readFileSync('settings.json', 'utf8');
	settings = JSON.parse(fdata);

	console.log(settings);

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

	var sent = set.text + " Goal " + data + "/" + set.victory;

	//console.log(data);

	writeToFile('goal.txt', sent);
}

function writeToFile(fileName, data) {

	fs.writeFileSync(fileName, data);

}

function setSettings(user, time, goal, intval) {
	var settings = {};
	var settingsFile = '';
	
	settings = {
					username: user,
					text: time,
					victory: goal,
					refresh: intval			
			   };
    settingsFile = '{"username":"' + settings.username + 
				   '","text":"' + settings.text + 
				   '","victory":"' + settings.victory + 
				   '","refresh":"' + settings.refresh +
				   '"}';
			   
    writeToFile('settings.json', settingsFile);
	
}

prompt.start();

console.log('Please Select a function');
console.log('1. run');
console.log('2. set settings');

prompt.get(['run'], function(err, result){
	
if(result.run == 1){
	user = getSettings();
	var intval = user.refresh * 1000;
	getData(user.username);
	
	console.log("To exit press ctrl-c");
	setInterval(function() {
		getData(user.username);
		console.log("it fired");
		setData(num);
	}, intval);
} else if (result.run == 2) {
	prompt.get(['username','timeframe','goal','interval'], function(err, result){
		setSettings(result.username, result.timeframe, result.goal, result.interval);
	});
} else {
	console.log('Error: Please select a function as listed.');
}

});
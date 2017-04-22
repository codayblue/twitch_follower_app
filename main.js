// Get Node modules
var fs = require('fs');
var https = require('https');

// Get prompt module
var prompt = require('prompt');

// Set some module variables
var close = true;
var user = [];
var num = "";

// Reads the settings file
// then parses the results and returns a json object
function getSettings() {
	var settings = [];
	var fdata = fs.readFileSync('settings.json', 'utf8');
	settings = JSON.parse(fdata);

	console.log(settings);

	return settings;
}

// Sends the request to the twitch api
// then when we get data back (ASYNC) we store it in
// our module variable to be printed to the file later.
function getData(username) {

    var idata = {};

    var options = {
        hostname: 'api.twitch.tv',
        port: 443,
        path: '/kraken/channels/'+ username +'/follows',
        method: 'GET',
        headers: {
        'Content-Type': 'Accept: application/vnd.twitchtv.v5+json',
        }
    };

    var req = https.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var obj = JSON.parse(chunk);

            idata = obj._total;
            num = String(idata);
            console.log(obj);
        });

    });

    req.on('error', function(err){
        console.error(err);
    });

    req.end();
}

// Gets the data ready to be written to the file
function setData(data) {

	var set = [];
	set = getSettings();

	var sent = set.text + " Goal " + data + "/" + set.victory;

	writeToFile('goal.txt', sent);
}

// Writes data to a file.
function writeToFile(fileName, data) {

	fs.writeFileSync(fileName, data);

}

// Get the settings ready to be written to the settings file.
function setSettings(user, time, goal, intval, subs) {
	var settings = {};
	var settingsFile = '';

	settings = {
					username: user,
					text: time,
					victory: goal,
					refresh: intval,
                    subs: subs
			   };
    settingsFile = '{"username":"' + settings.username +
				   '","text":"' + settings.text +
				   '","victory":"' + settings.victory +
				   '","refresh":"' + settings.refresh +
                    '","subs":"' + settings.subs +
				   '"}';

    writeToFile('settings.json', settingsFile);

}

// Start the prompt
prompt.start();

// Create the menu
console.log('Please Select a function');
console.log('1. run');
console.log('2. set settings');

// Get the option the user would like to do
prompt.get(['run'], function(err, result){

    if(result.run == 1){
        user = getSettings();
        var intval = user.refresh * 1000;
        getData(user.username);

        console.log("To exit press ctrl-c");
        setInterval(function() {
            getData(user.username);
            console.log("it fired");
        }, intval);
    } else if (result.run == 2) {
        prompt.get(['username','timeframe','goal','interval',"subs"], function(err, result){
            setSettings(result.username, result.timeframe, result.goal, result.interval, result.subs);
        });
    } else {
        console.log('Error: Please select a function as listed.');
    }

});

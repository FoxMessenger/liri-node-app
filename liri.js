
// Begin with the Requires

// this is necessary for the twitter NPM to work, as it contains they keys needed
var twitterKeys = require('./keys');
// this inquirer NPM is to get the list function
var inquirer = require('inquirer');

// SWITCH CASE 1: pull a series of tweets from my personal account
var myTweets = {
	check: "Twitter Check", // use this just to make sure this is working
	// main twitter pull function
	tweets: function() {
		// grabbing from the twitter NPM, as opposed to the twitter keys I have stored
		var twitter = require('twitter');
		var keys = new twitter(twitterKeys.twitterKeys);
		var params = {screen_name: 'mianmagugeti'};
		keys.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
  				for (i = 1; i < 12; i++) {
  				console.log("\n" + i + ": " + tweets[i].text + "\n");
  			}
  			}
  			
		})
	}
};

// use the broken Spotify NPM to choose SONG
var spotifyThisSong = function (){
	console.log("information");
};

var movieThis = function (){
	console.log("information");
};

var doWhatItSays = function (){
	console.log("information");
};

inquirer.prompt([
	{
		type: "list",
		message: "Choose an option:",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
		name: "options"
		
	}
]).then(function(user) {
	console.log("choice is: " + user.options);
	switch(user.options) {
		case "my-tweets":
		// run the function tweets of myTweets
		myTweets.tweets();
		break;

		case "spotify-this-song":
		console.log("soptify");
		break;

		case "movie-this":
		console.log("movies");
		break;

		case "do-what-it-says":
		console.log("say something");
		break;
	}
});


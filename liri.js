
// Begin with the Requires

// this is necessary for the twitter NPM to work, as it contains they keys needed
var twitterKeys = require('./keys');
// this inquirer NPM is to get the list function
var inquirer = require('inquirer');
// filesystem API
var fs = require('fs')
// using the fs to store the information in a text file
var fileStore = function(dataType){
	fs.appendFile('log.txt', JSON.stringify(dataType, null, 2), (err) => {
						if (!err) {
							console.log('New Info has been logged!');
						}
					});	
}

// ==============
// SWITCH CASE 1: pull a series of tweets from my personal account
// ==============
var myTweets = {
	check: 'Twitter Check', // use this just to make sure this is working
	// main twitter pull function
	tweets: function() {
		// grabbing from the twitter NPM, as opposed to the twitter keys I have stored
		var twitter = require('twitter');
		var keys = new twitter(twitterKeys.twitterKeys);
		var params = [
			{screen_name: 'mianmagugeti'},
			{count: 20}
		];
		// var count = 20;
		keys.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
  				// running a for loop to get the first 10 tweets (+1 because the array starts at 0, and I wanted 'i' to start at 1)
  				for (i = 0; i < 20; i++) {
  				// print to the screen the information. "\n" creates a line break
  				// console.log(tweets.id);

  					console.log(JSON.stringify(tweets[i].text, null, 2) + '\n');
  					
  					fileStore(tweets[i].text);
  				} // } // --- END for loop
			
  			} // --- END if not err

		}) // --- END keys.get
	} // --- END tweets function()
}; // --- END myTweets object





// ==============
// SWITCH CASE 2: use the broken Spotify NPM to choose a SONG
// ==============
var spotifyThisSong = {
	// prompt the user to input a song
	prompt: function() {
		inquirer.prompt([
			{
				type: 'input',
				message: 'Type in a song: ',
				name: 'song'
			} // --- END inquire.prompt
		]).then( function(user) {
			// so the spotify API has VERY LITTLE documentation. I'm not even sure I understood everything.
			// once a song is input we want to run the function songSearch
			var spotify = require('spotify');

			// take the input of, in the case you get nothing you will default as Ace of Base
			var userSong = user.song || 'Ace of Base';
			// now, the actual search.
			spotify.search({ type: 'track', query: ('"' + userSong + '"')}, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
			    }	

				printInfo = function(){

					// this is the longest set of arrays and objects I've ever had to dig through.
				    var name = data.tracks.items[1].artists[0].name;
				    var songName = data.tracks.items[0].name;
				    var previewLink = data.tracks.items[0].external_urls.spotify;
				    var album = data.tracks.items[0].album.name 

			    	console.log(JSON.stringify('artist/band: ' + name));
				    console.log(JSON.stringify('song title: ' + songName));
				    console.log(JSON.stringify('album title ' + album));
				    console.log(JSON.stringify('preview link: ' + previewLink));
				}
    			
    			printInfo();

    			fileStore(data);
			}); // --- END songSearch function
		}) // --- END promise
	}, // --- END spotifyThisSong.prompt	

	justRequest: function(randomTxt) {
			// so the spotify API has VERY LITTLE documentation. I'm not even sure I understood everything.
			// once a song is input we want to run the function songSearch
			var spotify = require('spotify');

			// take the input of, in the case you get nothing you will default as Ace of Base
			var userSong = randomTxt || 'Ace of Base';
			// now, the actual search.
			spotify.search({ type: 'track', query: ('"' + randomTxt + '"')}, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
			    }	
			 	printInfo = function(){

			 					    // console.log(data)
				   	// this is the longest set of arrays and objects I've ever had to dig through.
				    var name = data.tracks.items[1].artists[0].name;
				    var songName = data.tracks.items[0].name;
				    var previewLink = data.tracks.items[0].external_urls.spotify;
				    var album = data.tracks.items[0].album.name 
				    
			    	console.log(JSON.stringify('artist/band: ' + name));
				    console.log(JSON.stringify('song title: ' + songName));
				    console.log(JSON.stringify('album title ' + album));
				    console.log(JSON.stringify('preview link: ' + previewLink));
				}

				printInfo();

			    fileStore(printInfo());
			}); // --- END songSearch function
	}, // --- END spotifyThisSong.justRequest
} // --- END spotifyThisSong object




// ==============
// SWITCH CASE 3: find a movie using OMDB
// ==============
var movieThis = {	
	
	check: console.log('give me a movie.'),
	prompt: function() {

		inquirer.prompt([
			{
				type: 'input',
				message: 'Type in a movie: ',
				name: 'movie'
			} // --- END inquire.prompt
		]).then(function(user) {

			var request = require('request');
			request('http://www.omdbapi.com/?t=' + user.movie, function (error, response, body) {
				console.log('http://www.omdb.com/?t=' + user.movie)
  				console.log('error:', error); // Print the error if one occurred 
  				console.log('response: ' + JSON.stringify(response)); // && response.statusCode // Print the response status code if a response was received 
  				console.log('body: ' + JSON.stringify(body));
			});
		});
	},
};

// ==============
// SWITCH CASE 4: use the broken Spotify NPM to choose SONG
// ==============
var doWhatItSays = function (){

	fs.readFile("random.txt", "utf8", function(error, data) {
  		spotifyThisSong.justRequest(data);
	});
};

inquirer.prompt([
	{
		type: 'list',
		message: 'Choose an option:',
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'options'
		
	}
]).then(function(user) {
	
	console.log('choice is: ' + user.options);
	
	switch(user.options) {
		case 'my-tweets':
		// run the function tweets of myTweets
		myTweets.tweets();
		break;

		case 'spotify-this-song':
		spotifyThisSong.prompt();
		break;

		case 'movie-this':
		movieThis.prompt();
		break;

		case 'do-what-it-says':
		doWhatItSays();
		break;
	}
});


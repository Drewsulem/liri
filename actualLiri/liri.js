//I was unable to get the keys from the .env to work. I had to just put them into the key.js.

require("dotenv").config;

var fs = require("fs");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var request = process.argv[2]
var name = process.argv[3]

if (request == null) {
    console.log("TYPE:\n\nconcert-this and who you would like to see.\n\nspotify - this - song and you would like to find\n\nmovie - this and a movie you want to know about\n\nIf you having trouble thinking a song.Type do -what - it - says\n\nCheck the log.txt to see your previous queries.")
}


switch (request) {
    case "concert-this":
        concertList();
        break;

    case "spotify-this-song":
        spotifyList();
        break;

    case "movie-this":
        movieList();
        break;
}

function concertList() {
    axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Venue: " + response.data[0].venue.name)
            console.log("Location: " + response.data[0].venue.city)
            console.log("Date and Time: " + response.data[0].datetime)
            fs.appendFile("log.txt", "Concert: " + name, function (err) {
                if (err) {
                    console.log(err)
                }
            })
        }
    );
}


function spotifyList() {
    if (name == null) {
        console.log("Artist: Ace of Base \nSong: 'The Sign'")
    }
    var song = name
    spotify.search({ type: "track", query: song }, function (err, data) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name)
        console.log("Track name: " + data.tracks.items[0].name)
        console.log("link preview: " + data.tracks.items[0].artists[0].href)
        console.log("Album: " + data.tracks.items[0].album.name)
        fs.appendFile("log.txt", "\n Song: " + name, function (err) {
            if (err) {
                console.log(err)
            }
        })
    })
}

function movieList() {
    if (name == null) {
        console.log("Mr.Nobody. Check it ou! <http://www.imdb.com/title/tt0485947/>")
        fs.appendFile("log.txt", "\n Movie: Mr.Nobody", function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    if (request == "movie-this") {
        axios.get("http://www.omdbapi.com/?t=" + name + "&apikey=trilogy").then(
            function (response) {
                console.log("Title: " + response.data.Title)
                console.log("Released: " + response.data.Released)
                console.log("IMDB: " + response.data.Ratings[0].Value)
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value)
                console.log("Country: " + response.data.Country)
                console.log("Language: " + response.data.Language)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                fs.appendFile("log.txt", "\n Movie: " + name, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        );
    }
}

if (request == "do-what-it-says") {
    fs.readFile("random.txt", function (err, data) {
        var doIt = data.toString().split(",")
        if (doIt[0] === "spotify-this-song") {
            name = doIt[1]
            song = name
            spotify.search({ type: "track", query: song }, function (err, data) {
                console.log("Artist: " + data.tracks.items[0].artists[0].name)
                console.log("Track name: " + data.tracks.items[0].name)
                console.log("link preview: " + data.tracks.items[0].artists[0].href)
                console.log("Album: " + data.tracks.items[0].album.name)
                fs.appendFile("log.txt", "\n The Backstreet Boys" + song, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        }
    })
}
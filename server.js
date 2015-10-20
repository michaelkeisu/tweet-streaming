var Twit = require('twit'),
    http = require('http'),
    config = require('./config'),
    express = require('express'),
    path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use("/client", express.static(path.join(__dirname, 'client')));

var port = config.web.port || 3000;
server.listen(port);

var keywords = ['Politics'];

var client = new Twit(config.twitter);
var stream = client.stream('statuses/filter', { track: keywords, language: 'en' });
stream.on('tweet', function(tweet) {
    console.log('Author: ' + tweet.user.screen_name + '(' + tweet.user.name + ')');
    console.log(tweet.text);
    console.log('\n');
    io.emit('tweetData', tweet);
});

stream.on('error', function(error) {
    console.log(error);
});

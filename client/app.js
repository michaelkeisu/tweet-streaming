var app = angular.module('MyApp', []);

app.factory('socket', function () {
    return io.connect('');
});

app.controller('TweetCtrl', function (socket, $scope) {
    var self = this;
    self.tweets = [];
    socket.on('tweetData', function (tweet) {
        $scope.$apply(function() {
            if(self.tweets.length >= 7) {
                self.tweets.shift();
            }
            self.tweets.push({
                screen_name: tweet.user.screen_name,
                name: tweet.user.name,
                text: tweet.text,
                location: tweet.location
            });
        });
    });
});
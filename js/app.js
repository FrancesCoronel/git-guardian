var app = angular.module("flickrTimes", ["ngMaterial"]);

app.config(function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter('momentify', function() {
    return function(val) {
        return moment(val).format('dddd, MMMM Do - h:mm a');
    };
});

app.controller("MainController", function($scope, $http) {
    $http({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
            'api-key': API_KEY,
            'q': "south carolina",
            'begin_date': "20170309",
            'end_date': "20170309",
            'sort': "newest",
            'fl': "web_url,headline,lead_paragraph,pub_date",
            'page': 0
        }
    }).then(function successCallback(response) {
        $scope.articles = response.docs;
    }, function errorCallback(response) {
        console.log(response);
    });
});

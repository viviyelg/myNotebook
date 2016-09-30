angular.
module('myApp').
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix("!");

        $routeProvider.
        when('/add', {
            template: '<add-product></add-product>'
        }).
        when('/search', {
            template: '<search></search>'
        }).
        otherwise('/search');
    }
]);

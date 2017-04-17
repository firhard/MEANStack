var app = angular.module('Onlineblogging', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        // .when('/add-blog', {
        //     templateUrl: 'partials/blog-form.html',
        //     controller: 'AddBlogCtrl'
        // })
        // .when('/blog/delete/:id', {
        //     templateUrl: 'partials/blog-delete.html',
        //     controller: 'DeleteBlogCtrl'
        // })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location', 
	function($scope, $resource, $location){
		var Blogs = $resource('/api/blogs');
		Blogs.query(function(blogs){
			$scope.blogs = blogs;
		});
		$scope.save = function(){
			var Blogs = $resource('/api/movies');
            Blogs.save($scope.blog, function(){
                $location.path('/');
            });
        };
}]);
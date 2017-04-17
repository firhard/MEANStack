var app = angular.module('Onlineblogging', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
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
			var Blogs = $resource('/api/blogs');
            Blogs.save($scope.blog, function(){
                $location.path('/');
            });
        };
        $scope.delete = function(blog_id){
       		var Blogs = $resource('/api/blogs/' + blog_id);

            Blogs.delete({ id: blog_id }, function(blog){
                $location.path('/');
            });
        }
}]);
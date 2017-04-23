var app = angular.module('Onlineblogging', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/blog/viewblog/:id', {
            templateUrl: 'partials/blog-view.html',
            controller: 'ViewBlogCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location', 
	function($scope, $resource, $location){
		var Blogs = $resource('/api/blogs');
        var reset = function(){
            Blogs.query(function(blogs){
                $scope.blogs = blogs;
            }); 
        }
		Blogs.query(function(blogs){
			$scope.blogs = blogs;
		});
		$scope.save = function(){
			var Blogs = $resource('/api/blogs');
            Blogs.save($scope.blog, function(){
                reset();
            });
        };
        $scope.delete = function(blog_id){
       		var Blogs = $resource('/api/blogs/' + blog_id);
            Blogs.delete({ id: blog_id }, function(blog){
                reset();
            });
        }
}]);

app.controller('ViewBlogCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Blogs = $resource('/api/blogs/:id');
        var setting = function(){
            Blogs.get({ id: $routeParams.id}, function(blog){
                $scope.blog = blog;
            });
        };

        Blogs.get({ id: $routeParams.id}, function(blog){
            $scope.blog = blog;
        });

        $scope.save = function(){
            var Blogs = $resource('/api/blogs/:id');
            Blogs.save({ id: $routeParams.id}, $scope.blog, function(){
                setting();
            });
        };

        $scope.delete = function(postId){
            var Blogs = $resource('/api/blogs/:id/' + postId);
            Blogs.delete({ id: $routeParams.id }, function(blog){
                setting();
            });
        }

        $scope.rating = function(){
            var Blogs = $resource('/api/blogs/:id', { id: $routeParams.id}, { 'rating': { method: 'PUT' } });
            Blogs.rating({ id: $routeParams.id }, $scope.blog, function(){
                setting();
            });
        }
}]);

var app = angular.module('onlinespablog', ['ngResource']);

app.controller('HomteCtrl', ['scope', '$resource', 
	function($scope, $resource){
		var Blogs = $resource('/api/blogs');
		Blogs.query(function(blogs){
			$scope.blogs = blogs;
	}]);
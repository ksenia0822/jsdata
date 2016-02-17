'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		templateUrl: '/main.html',
		controller: 'MainController', 
		resolve: {
			allUsers: function(User) {
				return User.findAll();
			},
			allPosts: function(Post) {
				return Post.findAll();
			}
		}
	})
})

app.controller('MainController', function($scope, allUsers, allPosts, Post) {
 	$scope.allUsers = allUsers;
 	$scope.allPosts = allPosts;
})



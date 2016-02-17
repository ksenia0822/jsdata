'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('create', {
		url: '/create/:userId',
		templateUrl: 'js/create/create.html',
		controller: 'CreateCtrl',
		resolve: {
			author: function($stateParams) {
				console.log($stateParams)
				return $stateParams.userId || "";
			}
		}
	})
})

// add necessary dependencies here 
app.controller('CreateCtrl', function($scope, author, User, Post) {

	$scope.pageTitle = "Write New Post";

	$scope.previewTrue = false;

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	}
	if (!$scope.newPost) $scope.newPost = {};

	User.find(author)
	.then(function(user) {
		$scope.newPost.name = user.username;
	});

	$scope.addPost = function() {
		Post.create({
			title: $scope.newPost.title,
			body: $scope.newPost.body,
			author: author
		})
		.then(function(post) {
			post.go();
		});
	}
	
}) 
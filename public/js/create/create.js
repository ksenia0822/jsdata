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

	$scope.previewTrue = false;

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	}
	console.log('CreateCtrl received ', author)
	if (!$scope.newPost) $scope.newPost = {};

	$scope.newPost.name = User.get(author).username;

	$scope.addPost = function() {
		console.log('Hello. We are going to add a new post')
		Post.create({
			title: $scope.newPost.title,
			body: $scope.newPost.body,
			author: author
		})
		.then(function(post) {
			post.go();
		});
	}
	/*

	TODOS: 
	1 - create the object that the form can use via ng-model
  2 - create a function that 
	 		a) persists the ng-modeled post object 
			b) changes the state to 'main'  

	*/
	
}) 
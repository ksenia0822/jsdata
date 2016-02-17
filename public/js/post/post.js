'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl', 
		resolve: {
			postData: function($stateParams, Post) {
				return Post.find($stateParams.postId); 
			}
		}
		/*
				add a resolve block that retrieves all the users
				so that the author field of the posts will be automatically 
				populated
		*/
	})
	.state('edit', {
		url: '/edit/:postId',
		templateUrl: 'js/create/create.html',
		controller: 'EditCtrl', 
		resolve: {
			postData: function($stateParams, Post) {
				return Post.find($stateParams.postId); 
			}
		}
	})
});

app.controller('EditCtrl', function($scope, postData, User, Post) {
	$scope.isEditing = true;

	$scope.pageTitle = "Edit Post";

	$scope.previewTrue = false;

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	}

	$scope.newPost = postData;

	User.find(postData.author)
	.then(function(user) {
		$scope.newPost.name = user.username;
		console.log($scope.newPost);
	});


	$scope.editPost = function() {
		Post.update({
			title: $scope.newPost.title,
			body: $scope.newPost.body,
			author: postData.author
		})
		.then(function(post) {
			post.go();
		});
	}
})

// add necessary dependencies 
app.controller('PostCtrl', function($scope, $state, postData, User) {
	$scope.post = postData;

	User.find(postData.author)
	
	$scope.edit = function() {
		$state.go('edit', {postId: postData._id})
	}

})
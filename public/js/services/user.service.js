'use  strict';

app.factory('User', function(DS) {

	var User = DS.defineResource({
		name: 'users'

	});
	return User;

}).run(function (User) {

	console.log('I ran, user is:', User)
})


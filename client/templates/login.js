Template.login.helpers({
	'showUsers': function() {
		return Meteor.users.find({}, {sort: {uploadedAt: -1}});
	},
	'usersCount': function() {
		return Meteor.users.find().count();
	}
});



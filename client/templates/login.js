Template.login.helpers({
	'showUsers': function() {
		return Meteor.users.find({}, {sort: {uploadedAt: -1}});
	},
});



Template.login.helpers({
	'showUsers': function() {
		return Meteor.users.find({}, {sort: {createdAt: -1}});
	},
	'usersCount': function() {
		return Meteor.users.find().count();
	}
});
Template.login.events({
	'click .editorCheck': function (event, template) {
			var thisId = this._id;
			var checked = event.target.checked;
			Meteor.call('toggleIsEditor', thisId, checked);
	},
	'change .adminCheck': function (event, template) {
			var thisId = this._id;
			var checked = event.target.checked;
			Meteor.call('toggleIsAdmin', thisId, checked);
	},
});
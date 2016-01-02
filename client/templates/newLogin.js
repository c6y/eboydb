Template.newLogin.onCreated(function() {
	const self = this;
	self.autorun(function() {
		self.subscribe('userStatus');
	});
});

Template.newLogin.helpers({
	showUsers() {
		return Meteor.users.find({}, {sort: {createdAt: -1}});
	},
	usersCount() {
		return Meteor.users.find().count();
	},
});

Template.newLogin.events({
	'click .editorCheck': function(event) {
		const thisId = this._id;
		const checked = event.target.checked;
		Meteor.call('toggleIsEditor', thisId, checked);
	},
	'change .adminCheck': function(event) {
		const thisId = this._id;
		const checked = event.target.checked;
		Meteor.call('toggleIsAdmin', thisId, checked);
	},
});

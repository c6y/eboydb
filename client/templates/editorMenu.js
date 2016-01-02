Template.editorMenu.onCreated(function() {
	const self = this;
	self.autorun(function() {
		self.subscribe('userStatus');
	});
});

Template.editorMenu.helpers({
	showEditor() {
		if (Session.get('displayEditor') === 'false') {
			return false;
		}
		return true;
	},
	onNewSpriteBox() {
		const routeName = FlowRouter.getRouteName();
		if (routeName === 'newSpriteBox') {
			const thisId = FlowRouter.getParam('_id');
			return {id: thisId};
		}
	},
	showThisUserName() {
		const thisUserId = Meteor.userId();
		const thisUserObj = Meteor.users.findOne(thisUserId);
		const thisUserName = thisUserObj.username;
		return thisUserName;
	},
});

Template.editorMenu.events({

	'click .toPool': function() {
		FlowRouter.go('/newpool/everything/1');
	},
	'click .toAddDoc': function() {
		FlowRouter.go('addDoc');
	},
	'click .toLogin': function() {
		FlowRouter.go('newLogin');
	},
	'click .toColors': function() {
		FlowRouter.go('colors');
	},
	'click .toDocEdit': function() {
		const routeName = FlowRouter.getRouteName();
		if (routeName === 'newSpriteBox') {
			const thisId = FlowRouter.getParam('_id');
			const params = {_id: thisId};
			FlowRouter.go('newDocEdit', params);
		}
	},
	'click #toggleEditorMenu': function() {
		// set default if it hasn't been set before:
		Session.setDefault('displayEditor', 'false');
		const theSession = Session.get('displayEditor');

		if (theSession === 'false') {
			Session.set('displayEditor', 'true');
		} else if (theSession === 'true') {
			Session.set('displayEditor', 'false');
		}
	},
});

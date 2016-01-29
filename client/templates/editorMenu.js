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
	onSpriteBox() {
		const routeName = FlowRouter.getRouteName();
		if (routeName === 'spriteBox') {
			const thisId = FlowRouter.getParam('_id');
			return {id: thisId};
		}
	},
	thisUserName() {
		let profileName = Meteor.user().profile.name;
		if (!profileName) {
			const thisUserId = Meteor.userId();
			const thisUserObj = Meteor.users.findOne(thisUserId);
			profileName = thisUserObj.username;
		}
		return profileName;
	},
	toPoolPath() {
		return FlowRouter.path('/pool/everything/1');
	},
	toAddDocPath() {
		return FlowRouter.path('addDoc');
	},
	toColorsPath() {
		return FlowRouter.path('colors');
	},
	toTagsPath() {
		return FlowRouter.path('tags');
	},
	toLoginPath() {
		return FlowRouter.path('login');
	},
	toDocEditPath() {
		const routeName = FlowRouter.getRouteName();
		if (routeName === 'spriteBox') {
			const thisId = FlowRouter.getParam('_id');
			const params = {_id: thisId};
			return FlowRouter.path('docEdit', params);
		}
	},
});

Template.editorMenu.events({
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

Template.mainLayout.helpers({
	onSpriteBox: function () {
		var routeName = Router.current().route.getName();
		if (routeName == 'spriteBox') {
			var thisDocID = Router.current().params._id;
			return {
				id: thisDocID
			};
			// else this will return false
		}
	},
	showEditor: function () {
		if (Session.get('displayEditor') == 'false') {
			return false
		} else {
			return true;
		};
	}
});

Template.mainLayout.events({

	'click #toggleEditorMenu': function () {
		// set default if it hasn't been set before:
		Session.setDefault('displayEditor', 'false');
		var theSession = Session.get('displayEditor');

		if (theSession == 'false') {
			Session.set('displayEditor', 'true');
		} else if (theSession == 'true') {
			Session.set('displayEditor', 'false');
		} else {
			console.log('Session displayEditor error');
		}

		// console.log('theSession: ' + theSession);

	},

});
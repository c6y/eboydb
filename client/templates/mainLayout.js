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
	}
});
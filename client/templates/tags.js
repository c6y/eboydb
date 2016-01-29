Template.tags.onCreated(function() {
	Meteor.call('getTagsData', function(error, result) {
		if (error) {
			alert('Error');
		} else {
			console.log('typeof ' + 'result: ' + typeof result);

			Session.set('tagsList', result);
			Template.instance().tagsList = new ReactiveVar( 'test' );
		}
	});
});

Template.tags.helpers({
	showTagCloud() {
		const tagsArray = Session.get('tagsList').join(', ');;
		console.log('typeof ' + 'tagsArray: ' + typeof tagsArray);

		return tagsArray;
		// return Template.instance().tagsList.get();
	}
});

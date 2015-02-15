Template.mainHeader.helpers({
	'postsCount': function() {
		return Counts.get('numberOfPosts')
	},
	'currentPage': function() {
		var currentPage = Number(Router.current().params.page);
		return currentPage;
	},
	'totalPages': function() {
		return Math.ceil(Counts.get('numberOfPosts') / displayQty);
	},
	'searchSlug': function() {
		return Session.get('slug');
	}
});

Template.mainHeader.events({
	'keypress input.searchFor': function (event) {
		if (event.which === 13) {
			var searching = event.currentTarget.value;
			Session.set('slug', searching);
			console.log(Session.get('slug'));
			// console.log('slug: ' + slug);
			Router.go('pool', {slug: searching, page: 1});
		}
	},

	'change .myPixInput': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
	
			var newFile = new FS.File(file);
			newFile.metadata = {
				copyright: '©eBoy',
				backColor: 'default',
				tags: ['sprite', 'ecity']
			};

			MyPix.insert(newFile, function(err, fileObj) {
				//If !err, we have inserted new doc with ID fileObj._id, and
				//kicked off the data upload using HTTP
			});
		});
	}
});

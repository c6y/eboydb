Template.addDocument.events({
	'change .myPixInput': function(event, template) {
		if (Meteor.user().profile.isEditor) {
			FS.Utility.eachFile(event, function(file) {
				var newFile = new FS.File(file);
				newFile.metadata = {
					copyright: '©eBoy',
					backColor: defaultBackColor,
					tags: ['sprite', 'ecity']
				};
				MyPix.insert(newFile, function(err, fileObj) {
					//If !err, we have inserted new doc with ID fileObj._id, and
					//kicked off the data upload using HTTP
				});
			});
			Router.go('pool', {slug: "all", page: 1});
		};
	}
});
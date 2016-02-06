Template.addDoc.onRendered(function() {
	const route = FlowRouter.getRouteName();
	DocHead.setTitle(route + ' – eboy.io');
});

Template.addDoc.events({
	'change .myPixInput': function(event) {
		if (Meteor.user().profile.isEditor) {
			FS.Utility.eachFile(event, function(file) {
				const newFile = new FS.File(file);
				const theId = Meteor.userId();
				const theUserName = Meteor.user().profile.name;
				newFile.metadata = {
					copyright: '©eBoy',
					license: 'CC BY-NC-ND 4.0',
					fullframe: false,
					backColor: defaultBackColor,
					tags: ['sprite', 'ecity'],
					uploadedBy: {id: theId, username: theUserName},
				};
				MyPix.insert(newFile, function(error, fileObj) {
					if (error) {
						console.log('error: ' + error);
					}
					console.log('Uploaded Document ID: ' + fileObj._id);
				});
			});
			FlowRouter.go('pool', {slug: 'everything', page: '1'});
		}
	},
});

Meteor.methods({
	addATag: function(taskId, thisTag) {
		MyPix.update(
			taskId,
			{ $addToSet: { 'metadata.tags': { $each: [ thisTag ] }}}
		);
	},
	removeTag: function(taskId, thisTag) {
		MyPix.update(
			taskId,
			{ $pull: { 'metadata.tags': thisTag }}
		);
	},
	updateBackColor: function(taskId, cHex) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.backColor': cHex }}
		);
	},
	updateMadeDate: function(taskId, thisDate) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.madeDate': thisDate }}
		);
	},
	updateFullframe: function(taskId, fullframe) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.fullframe': fullframe }}
		);
	},
	updateLicense: function(taskId, license) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.license': license }}
		);
	},
	deleteDocument: function(taskId) {
		MyPix.remove(taskId);
	},
	toggleIsAdmin: function(taskId, checked) {
		Meteor.users.update(
			taskId,
			{ $set: { 'profile.isAdmin': checked }}
		);
	},
	toggleIsEditor: function(taskId, checked) {
		Meteor.users.update(
			taskId,
			{ $set: { 'profile.isEditor': checked }}
		);
	},
	updateLinkLabel: function(imageId, linkLabel) {
		const selector = { myPixId: imageId };
		const modifier = { label: linkLabel, myPixId: imageId };
		DocLinks.upsert(
			selector,
			{ $set: modifier}
		);
	},
	updateLinkName: function(imageId, linkName) {
		const selector = { myPixId: imageId };
		const modifier = { name: linkName, myPixId: imageId };
		DocLinks.upsert(
			selector,
			{ $set: modifier}
		);
	},
	updateLinkURL: function(imageId, linkURL) {
		const selector = { myPixId: imageId };
		const modifier = { url: linkURL, myPixId: imageId };
		DocLinks.upsert(
			selector,
			{ $set: modifier}
		);
	},
	deleteLink: function(imageId) {
		const selector = { myPixId: imageId };
		DocLinks.remove(selector);
	},
});

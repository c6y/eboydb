Meteor.methods({
	addATag(taskId, thisTag) {
		MyPix.update(
			taskId,
			{ $addToSet: { 'metadata.tags': { $each: [ thisTag ] }}}
		);
	},
	removeTag(taskId, thisTag) {
		MyPix.update(
			taskId,
			{ $pull: { 'metadata.tags': thisTag }}
		);
	},
	updateBackColor(taskId, cHex) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.backColor': cHex }}
		);
	},
	updateMadeDate(taskId, thisDate) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.madeDate': thisDate }}
		);
	},
	updateFullframe(taskId, fullframe) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.fullframe': fullframe }}
		);
	},
	updateLicense(taskId, license) {
		MyPix.update(
			taskId,
			{ $set: { 'metadata.license': license }}
		);
	},
	deleteDocument(taskId) {
		MyPix.remove(taskId);
	},
	toggleIsAdmin(taskId, checked) {
		Meteor.users.update(
			taskId,
			{ $set: { 'profile.isAdmin': checked }}
		);
	},
	toggleIsEditor(taskId, checked) {
		Meteor.users.update(
			taskId,
			{ $set: { 'profile.isEditor': checked }}
		);
	},
	addLink(imageId, linkLabel, linkName, linkURL) {
		const newDoc = {
			myPixId: imageId,
			label: linkLabel,
			name: linkName,
			url: linkURL,
		};
		DocLinks.insert(newDoc);
	},
	deleteLink(linkId) {
		const selector = { _id: linkId };
		DocLinks.remove(selector);
	},
});

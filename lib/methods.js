Meteor.methods({
	removeTag: function(taskId, thisTag) {
		MyPix.update (
			taskId,
			{ $pull: { 'metadata.tags': thisTag }}
		);
	},
	updateBackColor: function(taskId, cHex) {
		MyPix.update (
			taskId,
			{ $set: { 'metadata.backColor': cHex }}
		);
	},
	addATag: function(taskId, thisTag) {
		MyPix.update (
			taskId,
			{ $addToSet: { 'metadata.tags': { $each: [ thisTag ] }}}
		);
	},
	deleteDocument: function(taskId) {
		MyPix.remove(taskId);
	},
	toggleIsAdmin: function(taskId, checked) {
		Meteor.users.update (
			taskId,
			{ $set: { 'profile.isAdmin': checked }}
		);
	},
	toggleIsEditor: function(taskId, checked) {
		Meteor.users.update (
			taskId,
			{ $set: { 'profile.isEditor': checked }}
		);
	}
})
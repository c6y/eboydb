Meteor.methods({
	getDistinctTags() {
		// get unique tags only, via Mongo's distinct method
		return Meteor.wrapAsync(function(callback) {
			MyPix.files.rawCollection().distinct('metadata.tags', callback);
		})();
	},
});

Template.home.helpers({
	'posts': function() {
		return Counts.get('numberOfPosts')
	},
	'currentPage': function() {
		var page = Math.floor(Session.get('docCursor') / 4) + 1;
		return page;
	}, 
	'showPix': function() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
	'thedate': function() {
		var date = this.uploadedAt;
		return "date: " + date;
	},
	'img': function() {
		var bin = this.binary;
		return bin;
	}
})

Template.home.events({
	'change .myPixInput': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
	
			var newFile = new FS.File(file);
			newFile.metadata = {copyright: "eBoy"};

			MyPix.insert(newFile, function(err, fileObj) {
				//If !err, we have inserted new doc with ID fileObj._id, and
				//kicked off the data upload using HTTP
			});
		});
	},
	'click .remove': function(event, template) {
		console.log("Removing \"" + this._id + "\"");
		MyPix.remove(this._id);
	},

	'click .previous': function(event, template) {
		if(Number(Session.get('docCursor') > (displayQty-1))) {
			Session.set('docCursor', Number(Session.get('docCursor')) - displayQty);
			console.log("docCursor: " + Session.get('docCursor'));
		}		
	},

	'click .next': function(event, template) {
		if(Number(Session.get('docCursor')) + displayQty < Counts.get('numberOfPosts')) {
			Session.set('docCursor', Number(Session.get('docCursor')) + displayQty);
			console.log("docCursor: " + Session.get('docCursor'));
		};
	}
})

Template.doc.events({
	'submit form': function (event) {
		event.preventDefault();
		var updatedTags =  event.target.tags.value;
		MyPix.update(this._id, {$set: {tags: updatedTags}})
		// console.log('event.target.name: ' + event.target.tags.value);
	}
});



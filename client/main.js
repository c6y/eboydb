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
		if(Number(Session.get('docCursor') > 3)) {
			Session.set('docCursor', Number(Session.get('docCursor')) - 4);
			console.log("Cursor: " + Session.get('docCursor'));
		}		
	},

	'click .next': function(event, template) {
		if(Number(Session.get('docCursor')) + 4 < Counts.get('numberOfPosts')) {
			Session.set('docCursor', Number(Session.get('docCursor')) + 4);
			console.log("Cursor: " + Session.get('docCursor'));
		};
	}
})
Template.pixUpload.events({
	'change .myPixInput': function(event, template) {
		event.preventDefault();
		var file = event.target.files[0];
		if (!file) return;
		MyPix.insert(file, function (err, fileObj) {
			//Inserted new doc with ID fileObj._id,
			//and kicked off the data upload using HTTP
		});
	}
})

Template.pixCount.helpers({
	'posts': function() {
		return Counts.get('numberOfPosts')
	},
	'currentPage': function() {
		var page = Math.floor(Session.get('docCursor') / 4) + 1;
		return page;
	} 
})

Template.pixList.helpers({
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
	},
	'thumbnail': function() {
		var bin = this.binary;
		var thumb = new FileReader();
		Imagemagick.convert(['bin', '-filter', 'point', '64x64', 'thumb']);
		return thumb;
	}
})

Template.pixList.events({
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
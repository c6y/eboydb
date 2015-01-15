Template.pixUpload.events({
	'change .myPixInput': function(event, template) {
		event.preventDefault();
		var file = event.target.files[0];
		var reader = new FileReader();

		reader.onload = function(event){
			MyPix.insert({
				binary: reader.result,
				createdAt: new Date
			});
		}
		reader.readAsDataURL(file);
	}
})

Template.pixCount.helpers({
	'posts': function() {
		return MyPix.find().count();
	}
})

Template.pixList.helpers({
	'showPix': function(){
		return MyPix.find({}, {sort: {createdAt: -1}});
	},
	'thedate': function(){
		var date = this.createdAt;
		var formattedDate = moment(date).format('hh:mm:ss/dddd/DD/MMMM/YYYY');
		return "date: " + formattedDate;
	}
})

Template.pixList.events({
	'click .remove': function() {
		console.log("Removing \"" + this._id + "\"");
		MyPix.remove(this._id);
	}
})
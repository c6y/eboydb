//Publish method

Meteor.publish('MyPix', function(cursor) {
	
	var length = MyPix.find().count();
	return MyPix.find({}, {limit:4, skip:cursor});
})

// Meteor.publish('PixQty', function() {
// 	return MyPix.find().count();
// })

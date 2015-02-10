// Template.spriteBox.rendered = function () {
// 	var myImage = new Image();
// 	// myImage.src= this.data.sprite.url({store: 'OriginalPix'});
// 	myImage.src= this.data.sprite.url();
// 	console.log('myImage.src: ' + myImage.src); // returns the path – everything ok
	
// 	myImage.onload = function() {
// 		var c = document.getElementById("myCanvas");
// 		var ctx = c.getContext("2d");

// 		ctx.fillStyle = this.data.sprite.metadata.backColor; 
// 		ctx.fillRect(0, 0, scaledSprite.widthDevice, scaledSprite.heightDevice);
// 		ctx.imageSmoothingEnabled = false;
// 		ctx.drawImage(myImage, 0, 0, scaledSprite.widthDevice, scaledSprite.heightDevice);
// 		var ratio = window.devicePixelRatio;
	
// 		// generate png from canvas
// 		var foo = document.getElementById("genImg");
// 		var dataURL = c.toDataURL("image/png");
// 		// foo.src = imageGenerated;
// 		foo.href = dataURL;
// 	}
// };

Template.spriteBox.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'scaledSprite': function () {
		var widthOriginal = this.sprite.metadata.width;
		var heightOriginal = this.sprite.metadata.height;
		var widthMax =  this.boxsize; //zoomDimension;
		var dimensionsTo = Meteor.myFunctions.scaleToByInt(widthOriginal, heightOriginal, widthMax);
		return {
			width: dimensionsTo.width,
			height: dimensionsTo.height,
			scaleFactor: dimensionsTo.factor,
			widthDevice: dimensionsTo.width * window.devicePixelRatio,
			heightDevice: dimensionsTo.height * window.devicePixelRatio,
			scaleFactorDevice: dimensionsTo.factor * window.devicePixelRatio
		}
	},
	'visibility': function () {
		if (Session.get('displaySpriteBoxInfo' + this.sprite._id) == 'block') {
			return 'block'
		} else {
			return 'none';
		};
	}
});

Template.spriteBox.events({
	'click .spriteBoxInfoToggle': function () {
		Session.setDefault('displaySpriteBoxInfo' + this.sprite._id, 'none');
		var theSession = Session.get('displaySpriteBoxInfo' + this.sprite._id);
		if (theSession == 'block') {
			Session.set('displaySpriteBoxInfo' + this.sprite._id, 'none');
		} else {
			Session.set('displaySpriteBoxInfo' + this.sprite._id, 'block');
		};
	}
});
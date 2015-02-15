Template.doc.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'deviceDimensions': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var deviceRatio = window.devicePixelRatio;
		var deviceWidth = widthOriginal / deviceRatio;
		var deviceHeight = heightOriginal / deviceRatio;
		return {
			ratio: deviceRatio,
			width: deviceWidth,
			height: deviceHeight
		}
	},
	'backColor': function() {
		if (this.metadata.backColor != 'default') {
			return this.metadata.backColor;
		} else {
			return defaultBackColor;
		}	
	}
});

Template.doc.events({
	'submit form': function (event) {
		event.preventDefault();
		var updatedTags =  event.target.tags.value;
		var updatedColor = event.target.backColor.value;
		if (!!updatedTags) { // if not empty
			MyPix.update(this._id, {
				$addToSet: {
					'metadata.tags': {
							$each: [ updatedTags ]
					}
				}
			});
		}
		MyPix.update(this._id, {
			$set: {
				'metadata.backColor': updatedColor
			}
		});
		event.target.tags.value = ""; // empty input field  
	},
	'click .goBack': function(event) {
		history.back();
	},
});
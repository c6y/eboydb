Template.docEdit.helpers({
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

Template.docEdit.events({
	'keypress input.addtag': function (event) {
		if (event.which === 13) {

			console.log('YES');

			// var searching = event.currentTarget.value;
			// Session.set('slug', searching);
			// console.log(Session.get('slug'));
			// // console.log('slug: ' + slug);
			// Router.go('pool', {slug: searching, page: 1});
		}
	},
	'submit form': function (event) {
		event.preventDefault();
		var newTag =  event.target.tags.value.toLowerCase().replace(/ /gi, "-");
		var updatedColor = event.target.backColor.value;
		if (!!newTag) { // if not empty
			MyPix.update (
				this._id,
				{
					$addToSet: {
						'metadata.tags': {
								$each: [ newTag ]
						}
					}
				}
			);
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
	'click .remove': function(event, template) {
		var thisTag = String(this);
		console.log("removing tag: " + thisTag);

		MyPix.update (
			template.data._id,
			{ $pull: { 'metadata.tags': thisTag }}
		);
	},
});






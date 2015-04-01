Meteor.myFunctions = {
	// takes the original image and scales it by integers to a max size
	scaleToByInt : function(originalWidth, originalHeight, maxTargetDim) {
		
		var wDim = originalWidth;
		var hDim = originalHeight;

		var zoomBox = maxTargetDim;
		var maxDim = Math.max(wDim, hDim); // larger value is taken only

		
		if (maxDim > zoomBox) {
			if (wDim < (zoomBox * 2)) {
				return {
					width: wDim,
					height: hDim,
					factor: 1,
					antialiase: ''
				};
			} else {
				if (window.devicePixelRatio == 1) {
					var smoothing = 'image-rendering: auto;' //inject smoothing css
					console.log(' smooth the image');
				} else {
					var smoothing = '';
				}
				return {
					width: wDim * 0.5,
					height: hDim * 0.5,
					factor: 0.5,
					antialiase: smoothing 
				};
			}
		} else {
			var scaleInt = Math.floor(zoomBox/maxDim);
			var scaleToWidth = scaleInt * wDim;
			var scaleToHeight = scaleInt * hDim;
			return {
				width: scaleToWidth,
				height: scaleToHeight,
				factor: scaleInt,
				antialiase: ''
			};
		};
	},
	colourNameToHex : function (colour) {
		if( /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour) ) {
			return colour;
		} else {
			var colours = colorNames;
			if (typeof colours[colour.toLowerCase()] != 'undefined') {
				return colours[colour.toLowerCase()];
			}
			return '#888888'; // return medium grey if parameter can't be resolved
		}
	},
	inverseHex: function (hex) {

		function pad(num) {
			if (num.length < 2) {
				return "0" + num;
			} else {
				return num;
			}
		}

		if (hex.length != 7 || hex.indexOf('#') != 0) {
			return null;
		}
		var r = (255 - parseInt(hex.substring(1, 3), 16)).toString(16);
		var g = (255 - parseInt(hex.substring(3, 5), 16)).toString(16);
		var b = (255 - parseInt(hex.substring(5, 7), 16)).toString(16);
		var inverse = "#" + pad(r) + pad(g) + pad(b);

		return inverse
	}
}


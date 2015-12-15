Meteor.myFunctions = {
	// takes the original image and scales it by integers to fit best into current window
	scaleByIntToFit : function(originalWidth, originalHeight, maxWidth, maxHeight) {
		var wImg = originalWidth;
		var hImg = originalHeight;
		var wMax = maxWidth;
		var hMax = maxHeight;

		var wFactor = Math.floor(wMax/wImg);
		var hFactor = Math.floor(hMax/hImg);
		var minFactor = Math.max(Math.min(wFactor, hFactor), 1); // scale to no less than 1

		var wTarget = wImg * minFactor;
		var hTarget = hImg * minFactor;

		return {
			width: wTarget,
			height: hTarget,
			factor: minFactor,
		}
	},
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
				};
			} else {
				// only scale down for devices highres displays
				if (window.devicePixelRatio != 1) {
					return {
						width: wDim * 0.5,
						height: hDim * 0.5,
						factor: 0.5,
					}
				} else {
					return {
						width: wDim,
						height: hDim,
						factor: 1,
					}
				}
			}
		} else {
			var scaleInt = Math.floor(zoomBox/maxDim);
			var scaleToWidth = scaleInt * wDim;
			var scaleToHeight = scaleInt * hDim;
			return {
				width: scaleToWidth,
				height: scaleToHeight,
				factor: scaleInt,
			};
		};
	},
	scaleToSoft : function(originalWidth, originalHeight, maxTargetDim) {
		var longerSideRounded = Math.max(originalWidth, originalHeight);
		var granularity = 4; // 4 will quarter wholes: 0.25, 0.5, 0.75, etc 
		var bestFactor = (Math.ceil(maxTargetDim/longerSideRounded * granularity))/granularity;

		var scaleToWidth = originalWidth * bestFactor;
		var scaleToHeight = originalHeight * bestFactor;
		var scaleInt = bestFactor;

		return {
			width: scaleToWidth,
			height: scaleToHeight,
			factor: scaleInt,
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


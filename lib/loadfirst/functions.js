Meteor.myFunctions = {
	scaleToByInt : function(originalWidth, originalHeight, maxTargetDim) {
		
		var wDim = originalWidth;
		var hDim = originalHeight;

		var zoomBox = maxTargetDim;
		var maxDim = Math.max(wDim, hDim);

		if (maxDim > zoomBox) {
			if (wDim > (zoomBox * 2)) {
				return {
				width: wDim * 0.5,
				height: hDim * 0.5,
				factor: 0.5
				};
			} else {
				return {
				width: wDim,
				height: hDim,
				factor: 1
				};
			}
		} else {
			var scaleInt = Math.floor(zoomBox/maxDim);
			var scaleToWidth = scaleInt * wDim;
			var scaleToHeight = scaleInt * hDim;
			return {
				width: scaleToWidth,
				height: scaleToHeight,
				factor: scaleInt
			};
		};
	},
}
Meteor.myFunctions = {
	scaleToByInt : function(originalWidth, originalHeight, maxTargetDim) {
		
		var wDim = originalWidth;
		var hDim = originalHeight;

		var zoomBox = maxTargetDim;
		var maxDim = Math.max(wDim, hDim);

		if (maxDim > zoomBox) {
			return {
				width: wDim,
				height: hDim,
				factor: 1
			};
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


// Meteor.myFunctions = {
// 	scaleToByInt : function(originalWidth, originalHeight, maxTargetWidth) {
// 		var h = originalHeight;
// 		var w = originalWidth;
// 		var maxWidth = maxTargetWidth;

// 		if (w > maxWidth) {
// 			return {
// 				width: w,
// 				height: h
// 			};
// 		} else {
// 			var scaleInt = Math.floor(maxWidth/w);
// 			var scaleToWidth = scaleInt * w;
// 			var scaleToHeight = scaleInt * h;
// 			return {
// 				width: scaleToWidth,
// 				height: scaleToHeight
// 			};
// 		};
// 	},
// }
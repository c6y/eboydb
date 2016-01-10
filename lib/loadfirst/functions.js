Meteor.myFunctions = {
	// takes the original image and scales it by integers
	// to fit best into current window
	scaleByIntToFit(originalWidth, originalHeight, maxWidth, maxHeight) {
		const wImg = originalWidth;
		const hImg = originalHeight;
		const wMax = maxWidth;
		const hMax = maxHeight;

		const wFactor = Math.floor(wMax / wImg);
		const hFactor = Math.floor(hMax / hImg);
		// scale to no less than 1
		const minFactor = Math.max(Math.min(wFactor, hFactor), 1);

		const wTarget = wImg * minFactor;
		const hTarget = hImg * minFactor;

		return {
			width: wTarget,
			height: hTarget,
			factor: minFactor,
		};
	},
	// takes the original image and scales it by integers to a max size
	scaleToByInt(originalWidth, originalHeight, maxTargetDim) {
		const wDim = originalWidth;
		const hDim = originalHeight;

		const zoomBox = maxTargetDim;
		const maxDim = Math.max(wDim, hDim); // larger value is taken only

		let theWidth = wDim;
		let theHeight = hDim;
		let theFactor = 1;

		if (maxDim > zoomBox) {
			if (wDim >= zoomBox * 2) {
				// only scale down for devices highres displays
				if (window.devicePixelRatio !== 1) {
					theWidth = wDim * 0.5;
					theHeight = hDim * 0.5;
					theFactor = 0.5;
				}
			}
		} else {
			const scaleInt = Math.floor(zoomBox / maxDim);
			const scaleToWidth = scaleInt * wDim;
			const scaleToHeight = scaleInt * hDim;
			theWidth = scaleToWidth;
			theHeight = scaleToHeight;
			theFactor = scaleInt;
		}
		return {
			width: theWidth,
			height: theHeight,
			factor: theFactor,
		};
	},
	scaleToSoft(originalWidth, originalHeight, maxTargetDim) {
		const longerSideRounded = Math.max(originalWidth, originalHeight);
		const granularity = 4; // 4 will quarter wholes: 0.25, 0.5, 0.75, etc
		const floatFactor = maxTargetDim / longerSideRounded * granularity;
		const bestFactor = Math.ceil(floatFactor) / granularity;

		const scaleToWidth = originalWidth * bestFactor;
		const scaleToHeight = originalHeight * bestFactor;
		const scaleInt = bestFactor;

		return {
			width: scaleToWidth,
			height: scaleToHeight,
			factor: scaleInt,
		};
	},
	scaleSoftToFit(originalWidth, originalHeight, windowWidth, windowHeight) {
		let orientationImage = 'landscape';
		let orientationWindow = 'landscape';
		let scalingFactor = 1;

		if (originalHeight > originalWidth) {
			orientationImage = 'portrait';
		}
		if (windowHeight > windowWidth) {
			orientationWindow = 'portrait';
		}

		const imageRatio = originalHeight / originalWidth;
		const windowRatio = windowHeight / windowWidth;

		if (orientationImage === 'landscape') {
			if (orientationWindow === 'landscape') {
				// console.log('landscape pic in landscape window');
				if (windowRatio > imageRatio) {
					scalingFactor = windowHeight / originalHeight;
				} else {
					scalingFactor = windowWidth / originalWidth;
				}
			} else if (orientationWindow === 'portrait') {
				// console.log('landscape pic in portrait window');
				scalingFactor = windowHeight / originalHeight;
			}
		}
		if (orientationImage === 'portrait') {
			if (orientationWindow === 'portrait') {
				// console.log('portrait pic in portrait window');
				if (windowRatio > imageRatio) {
					scalingFactor = windowHeight / originalHeight;
				} else {
					scalingFactor = windowWidth / originalWidth;
				}
			} else if (orientationWindow === 'landscape') {
				// console.log('portrait pic in landscape window');
				scalingFactor = windowWidth / originalWidth;
			}
		}
		const scaleToWidth = originalWidth * scalingFactor;
		const scaleToHeight = originalHeight * scalingFactor;
		const scaleInt = scalingFactor;
		return {
			width: scaleToWidth,
			height: scaleToHeight,
			factor: scaleInt,
		};
	},
	colourNameToHex(colour) {
		let hexColour;
		if ( /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour) ) {
			hexColour = colour;
		} else {
			const colours = colorNames;
			if (typeof colours[colour.toLowerCase()] !== 'undefined') {
				hexColour = colours[colour.toLowerCase()];
			} else {
				// return medium grey if parameter can't be resolved
				hexColour = '#888888';
			}
		}
		return hexColour;
	},
	inverseHex(hex) {
		function pad(num) {
			if (num.length < 2) {
				return '0' + num;
			}
			return num;
		}
		if (hex.length !== 7 || hex.indexOf('#') !== 0) {
			return null;
		}
		const r = (255 - parseInt(hex.substring(1, 3), 16)).toString(16);
		const g = (255 - parseInt(hex.substring(3, 5), 16)).toString(16);
		const b = (255 - parseInt(hex.substring(5, 7), 16)).toString(16);
		const inverse = '#' + pad(r) + pad(g) + pad(b);

		return inverse;
	},
	// in an Object, get the name of a property if it contains a specific value
	getNameOfValue(theObject, value) {
		for (n in theObject) {
			if ({}.hasOwnProperty.call(theObject, n)) {
				const properties = theObject[n];
				const hasTag = properties.indexOf(value) > -1;
				if (hasTag) {
					return n;
				}
			}
		}
	},
	// checks if tag has an alias
	getTagAlias(newTag) {
		const tagAlias = Meteor.myFunctions.getNameOfValue(tagaliases, newTag);
		if (tagAlias) {
			return tagAlias;
		}
		return newTag
	}
};

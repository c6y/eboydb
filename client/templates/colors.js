Template.colors.helpers({
	colorListArray() {
		let result = [];
		for (key in colorNames) {
			if ({}.hasOwnProperty.call(colorNames, key)) {
				result.push({
					name: key,
					value: colorNames[key],
				});
			}
		}
		return result;
	},
});

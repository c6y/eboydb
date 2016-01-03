Template.colors.helpers({
	colorListArray() {
		let result = [];
		for (var key in colorNames) result.push({
			name: key,
			value: colorNames[key],
		});
		return result;
	},
});

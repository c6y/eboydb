noConsoleUpdates = true; // prevent users to be updated from any client console, active when true

siteName = 'eboy.io'
displayQty = 24;
pathToThumbsFolder = "/eboydb_test/images/thumbs";
pathToOriginalsFolder = "/eboydb_test/images/originals";
thumbnailDimension = 216;
thumbnailBleed = 24;
zoomDimension = 512;
defaultBackColor = '#272822';

Accounts.config({
	forbidClientAccountCreation: false,
	loginExpirationInDays: 7
});

if (Meteor.isClient) {
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});
}
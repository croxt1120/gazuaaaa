require.config({
    baseUrl : 'resource',
    paths: {
        jquery : 'lib/jquery/dist/jquery.min',
        // "popper": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper",
        // "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap",
        backbone : 'lib/backbone/backbone-min',
        underscore: 'lib/underscore/underscore-min',
        text : 'lib/text/text',
        moment : 'lib/moment/moment',
    },
});

require([
	'router',
	'backbone'
// 	"popper"
], function (
	Router,
	Backbone
) {
	Backbone.history.start();
});

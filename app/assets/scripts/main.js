window.router = require('./partials/router.js');
window.about  = require('./partials/about.js');
window.home   = require('./partials/home.js');

(function() {

	window.loadScripts = function() {
		home.init();
	};

	about.init();
	router.init();
	
})();
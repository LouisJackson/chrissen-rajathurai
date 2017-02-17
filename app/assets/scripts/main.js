window.router = require('./partials/router.js');
window.about  = require('./partials/about.js');

(function() {

	window.loadScripts = function() {
		//load all class here
	};

	about.init();
	router.init();
	
})();
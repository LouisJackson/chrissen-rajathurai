window.router  = require('./partials/router.js');
window.about   = require('./partials/about.js');
window.home    = require('./partials/home.js');
window.project = require('./partials/project.js');

(function() {

	window.loadScripts = function() {
		home.init();
		project.init();
	};

	about.init();
	router.init();
	
})();
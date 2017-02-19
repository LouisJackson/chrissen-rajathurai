module.exports = (function () {

	'use strict'

	var templates = window["Portfolio"]['templates']
	var $pageContent = document.querySelectorAll('.page-content')[0]
	var currentViewClass
	var couldStateChange = true
	var history = window.history


	var init = function() {

		$pageContent.style.display = 'none'
		var request = new XMLHttpRequest()
		request.open('GET', 'content.json', true)

		request.onload = () => {
		  if (request.status >= 200 && request.status < 400) {
		    window.content = JSON.parse(request.responseText)
			_bindLinks()
			_onStateChange()
		  }
		}

		request.send()

	};

	var _onStateChange = function() {
		var path = window.location.pathname.split('/')
		path.shift()
		_setRouting(path)
	}

	var _bindLinks = function() {
		var $links = document.querySelectorAll('a:not([target])')
		for (var $link of $links) {
			$link.addEventListener('click', _onLinkClick)
		}
    };

	var _setRouting = function(path) {

		var view = path[0];

		if (!view) {
			_updateView('home', false)
		} else if (view == 'project') {
			var projectName = path[1]
			if (!projectName) {
				_updateView('home', false)
			}
			else {
				var data = content.views[view][projectName]
				_updateView('project', data)
			}
		} else {
			_updateView('home', false)
		}

	}

	var _removeCurrView = function(view,params) {

		$pageContent.style.display = 'none'
		$pageContent.classList.remove('view-loaded')
		$pageContent.classList.remove('currentViewClass')
		_appendNewView(view, params)
	};

	var _appendNewView = function(view, params) {
		var content = templates[view](params)
		$pageContent.innerHTML = content

		if ($pageContent.classList)
		  $pageContent.classList.add('view-'+view)
		else
		  $pageContent.className += ' ' + 'view-'+view

		setTimeout(() => {
			$pageContent.style.display = 'block'
			setTimeout(function() {
				if ($pageContent.classList)
				  $pageContent.classList.add('view-loaded')
				else
				  $pageContent.className += ' ' + 'view-loaded'
				currentViewClass = 'view-'+view
				window.loadScripts()
			}, 100)
		}, 100)

	};

	var _updateView = function(view, params) {

		if (currentViewClass) {
			_removeCurrView(view,params)
		} else {
			_appendNewView(view, params)
		}
	};

	var _onLinkClick = function(e) {
		e.preventDefault()

		if (couldStateChange) {
			
            var href = e.currentTarget.getAttribute('href')
            var link = href

            var location = window.location.hash != "" ? window.location.href.replace("/" + window.location.hash, "").replace(window.location.hash, "") : window.location.href.split('/')[3];
                location = '/' + location;

            // Push into history new state
            if (link != location) {
                 history.pushState(null, null, link);
                 _onStateChange();
            }
        }

	}

	return {
		init: init
	};

})();
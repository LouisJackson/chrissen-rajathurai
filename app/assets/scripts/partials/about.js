module.exports = (function () {

	'use strict'

	let $about = document.querySelectorAll('.about')[0]
	let $aboutToggler = document.querySelectorAll('.header a.cta')[0]

	let VISIBLE_CLASS = 'about--visible'
	let MORE_TEXT = 'more about me'
	let LESS_TEXT = 'less about me'

	var init = () => {

		_initEvents()

	};

	var _initEvents = () => {

		$aboutToggler.addEventListener('click', _toggleAbout)

	}

	var _toggleAbout = () => {

		if ($about.classList.contains(VISIBLE_CLASS)) {
			$about.classList.remove(VISIBLE_CLASS)
			$aboutToggler.innerHTML = MORE_TEXT
		}
		else {
			$about.classList.add(VISIBLE_CLASS)
			$aboutToggler.innerHTML = LESS_TEXT
		}
		
	}



	return {
		init: init
	};

})();
module.exports = (function () {

	'use strict'
	var $project
	var $gallery = {}
	let MAX_SCROLL = 0
	let POSITION = []

	var init = () => {

		$project = document.querySelectorAll('.view-project')[0]

		console.log($project)

		if ($project != null) {
			$gallery.galleryContainer = document.querySelectorAll('.teaser__gallery-container')[0]
			$gallery.gallery = document.querySelectorAll('.teaser__gallery')[0]
			$gallery.nextProject = document.querySelectorAll('.next-project')[0]
			$gallery.scrollbox = document.querySelectorAll('.scrollbox')[0]
			$gallery.images = document.querySelectorAll('.teaser__gallery-container img')
			$gallery.legend = document.querySelectorAll('.teaser__legend')[0]
			_initEvents()
			_initVariables()
		}

	}

	var _initEvents = () => {

		$project.addEventListener('mousewheel', _bindMouseWheel)
		window.addEventListener('resize', _initVariables)		

	}

	var _initVariables = () => {


		//init max scroll
		let containerHeight = parseInt(window.getComputedStyle($gallery.galleryContainer, null).getPropertyValue('height'))
		let galleryHeight = parseInt(window.getComputedStyle($gallery.gallery, null).getPropertyValue('height'))

		var offset = $gallery.legend.offsetTop

		MAX_SCROLL = -1 * (containerHeight - galleryHeight)

		POSITION = []

		//init images position
		for (var image of $gallery.images) {
			POSITION.push(image.offsetTop - offset)
		}

	}

	var _bindMouseWheel = (e) => {

		let scrollValue = e.deltaY * -0.6
		let currTransform = window.getComputedStyle($gallery.galleryContainer,null).getPropertyValue('transform')
		let currScroll = _getComputedTranslateY(currTransform);

		let newScrollValue = currScroll + scrollValue
		if (newScrollValue > 0)
			newScrollValue = 0
		else if (newScrollValue < MAX_SCROLL) {
			newScrollValue = MAX_SCROLL
			$gallery.nextProject.classList.add('next-project--visible');
			$gallery.scrollbox.classList.add('scrollbox--hidden');
		}
		else {
			$gallery.nextProject.classList.remove('next-project--visible');
			$gallery.scrollbox.classList.remove('scrollbox--hidden');
		}
		
		let index = 0

		POSITION.forEach(function (pos, i) {
			if ((-1*newScrollValue) > pos)
				index = i
		})

		let legend = $gallery.images[index].getAttribute('alt')

		$gallery.legend.innerHTML = legend
		$gallery.galleryContainer.style.transform = `translateY(${newScrollValue}px)`

	}

	var _getComputedTranslateY = (transform) => {

		let mat = transform.match(/^matrix3d\((.+)\)$/)
		if(mat) return parseFloat(mat[1].split(', ')[13])
		mat = transform.match(/^matrix\((.+)\)$/)
		return mat ? parseFloat(mat[1].split(', ')[5]) : 0

	}

	return {
		init: init
	}

})();
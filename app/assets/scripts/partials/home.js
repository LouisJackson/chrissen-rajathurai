module.exports = (function () {

	'use strict'

	var $home
	var $textFields = {}
	var $slider = {}

	const ANIMATION_DURATION = 1500
	let CURRENT_PROJECT = 1
	let THUMBNAIL_HEIGHT = 0
	let PREV_CLASS = 'teaser__thumbnail--prev'
	let CURRENT_CLASS = 'teaser__thumbnail--current'
	let NEXT_CLASS = 'teaser__thumbnail--next'

	let PROJECT_COUNT
	let projects

	var init = () => {

		$home = document.querySelectorAll('.view-home')[0]

		if ($home != null) {
			CURRENT_PROJECT = 1
			_setGallery()
		}

	}

	var _setGallery = () => {

		projects = content.views.project //get projects
		projects = Object.keys(projects).map((k) => projects[k]) //convert object to array
		
		PROJECT_COUNT = projects.length

		$textFields.title = document.querySelectorAll('.teaser__title')[0]
		$textFields.type = document.querySelectorAll('.teaser__project-type')[0]
		$textFields.link = document.querySelectorAll('.teaser__text .cta')[0]

		$slider.container = document.querySelectorAll('.teaser__gallery-container')[0]
		$slider.slides = document.querySelectorAll('.teaser__thumbnail')
		$slider.background = document.querySelectorAll('.teaser__background')[0]
		$slider.countCurrent = document.querySelectorAll('.teaser__count-current')[0]
		$slider.scrollUp = document.querySelectorAll('.scrollbox__up')[0]
		$slider.scrollDown = document.querySelectorAll('.scrollbox__down')[0]

		document.querySelectorAll('.teaser__count-current')[0].innerHTML = CURRENT_PROJECT
		document.querySelectorAll('.teaser__count-total')[0].innerHTML = PROJECT_COUNT

		THUMBNAIL_HEIGHT = _outerHeight($slider.slides[0])

		_changeText('-down')
		_initEvents()
		_initKeyboard()

	}

	var _initEvents = () => {

		$home.addEventListener('mousewheel', _bindMouseWheel)
		$slider.scrollDown.addEventListener('click', _bindScrollDown)
		$slider.scrollUp.addEventListener('click', _bindScrollUp)
		$slider.scrollDown.addEventListener('click', () => {})

	}

	var _initKeyboard = () => {

		document.addEventListener('keydown', _bindKeyboard)
	}

	var _bindMouseWheel = (e) => {

		$home.removeEventListener('mousewheel', _bindMouseWheel)

		if (e.wheelDelta < 0)
			_goToProject('next')
		else 
			_goToProject('prev')

		setTimeout(() => _initEvents(), ANIMATION_DURATION)

	}

	var _bindScrollDown = (e) => {

		$slider.scrollDown.removeEventListener('click', _bindScrollDown)

		_goToProject('next')

		setTimeout(() => _initEvents(), ANIMATION_DURATION)

	}

	var _bindScrollUp = (e) => {

		$slider.scrollUp.removeEventListener('click', _bindScrollUp)

		_goToProject('prev')

		setTimeout(() => _initEvents(), ANIMATION_DURATION)

	}

	var _bindKeyboard = (e) => {

		document.removeEventListener('keydown', _bindKeyboard)

		switch(e.which) {
		    case 38:
		    _goToProject('prev')
		    break

		    case 40:
		    _goToProject('next')
		    break

		    default: return
		}
		e.preventDefault()

		setTimeout(() => _initKeyboard(), ANIMATION_DURATION)
			
	}

	var _goToProject = (way) => {
		
		if (way == 'next' && CURRENT_PROJECT < PROJECT_COUNT)
			_goToNext()
		else if (way == 'prev' && CURRENT_PROJECT > 1)
			_goToPrev()

	}

	var _goToNext = () => {
		var translate = -CURRENT_PROJECT * THUMBNAIL_HEIGHT
		CURRENT_PROJECT = CURRENT_PROJECT + 1
		$slider.container.style.transform = `translateY(${translate}px)`
		_changeText('-down')
	}

	var _goToPrev = () => {
		CURRENT_PROJECT = CURRENT_PROJECT - 1
		var translate = -(CURRENT_PROJECT - 1) * THUMBNAIL_HEIGHT
		$slider.container.style.transform = `translateY(${translate}px)`
		_changeText('-up')
	}

	var _changeText = (way_prefix) => {

		$slider.countCurrent.classList.add(`teaser__count-current--out${way_prefix}`)
		$textFields.title.classList.add(`teaser__title--out${way_prefix}`)
		$textFields.type.classList.add(`teaser__project-type--out${way_prefix}`)

		//set classes
		if ($slider.slides[CURRENT_PROJECT - 2] != null) {
			$slider.slides[CURRENT_PROJECT - 2].classList.add(PREV_CLASS)
			$slider.slides[CURRENT_PROJECT - 2].classList.remove(CURRENT_CLASS, NEXT_CLASS)
			$slider.scrollUp.classList.add('scrollbox__up--active')
		}
		else {
			$slider.scrollUp.classList.remove('scrollbox__up--active')
		}

		if ($slider.slides[CURRENT_PROJECT] != null) {
			$slider.slides[CURRENT_PROJECT].classList.add(NEXT_CLASS)
			$slider.slides[CURRENT_PROJECT].classList.remove(CURRENT_CLASS, PREV_CLASS)
			$slider.scrollDown.classList.add('scrollbox__down--active')
		}
		else {
			$slider.scrollDown.classList.remove('scrollbox__down--active')
		}

		$slider.slides[CURRENT_PROJECT - 1].classList.add(CURRENT_CLASS)
		$slider.slides[CURRENT_PROJECT - 1].classList.remove(PREV_CLASS, NEXT_CLASS)

		var content = projects[CURRENT_PROJECT-1]
		$slider.background.style.backgroundImage = `url(${content.teaser})`

		//change text
		$textFields.link.setAttribute('href', content.link)

		setTimeout(() => {

			$slider.countCurrent.classList.remove(`teaser__count-current--out${way_prefix}`)
			$textFields.title.classList.remove(`teaser__title--out${way_prefix}`)
			$textFields.type.classList.remove(`teaser__project-type--out${way_prefix}`)
			$slider.countCurrent.classList.add(`teaser__count-current--in${way_prefix}`)
			$textFields.title.classList.add(`teaser__title--in${way_prefix}`)
			$textFields.type.classList.add(`teaser__project-type--in${way_prefix}`)

			$slider.countCurrent.innerHTML = CURRENT_PROJECT
			$textFields.title.innerHTML = content.title
			$textFields.type.innerHTML = content.type

			setTimeout(() => {

				$slider.countCurrent.classList.remove(`teaser__count-current--in${way_prefix}`)
				$textFields.title.classList.remove(`teaser__title--in${way_prefix}`)
				$textFields.type.classList.remove(`teaser__project-type--in${way_prefix}`)

			}, 100)
		}, 600)
	}

	var _outerHeight = (el) => {
		var height = el.offsetHeight
		var style = getComputedStyle(el)

		height += parseInt(style.marginTop) + parseInt(style.marginBottom)
		return height
	}

	return {
		init: init
	}

})();
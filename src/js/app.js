// import * as flsFunctions from "./modules/functions.js";
// flsFunctions.isWebp();

"use strict"

// Menu burger
const menuIcon = document.querySelector('.menu__icon');
const menu = document.querySelector('.menu__body');
if (menuIcon) {
	menuIcon.addEventListener('click', function (e) {
		menuIcon.classList.toggle('menu__icon_active');
		document.body.classList.toggle('lock');
		menu.classList.toggle('menu__body_open');
	});
}

// Header
const header = document.querySelector('.header');
const intro = document.querySelector('.intro');
const headerHeight = header.offsetHeight;
const introHeight = intro.offsetHeight;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;
	if (scrollDistance >= introHeight + headerHeight) {
		header.classList.add('header_fixed');
		intro.style.marginTop = `${headerHeight}px`;
	} else {
		header.classList.remove('header_fixed');
		intro.style.marginTop = null;
	}
	lastScrollTop = scrollDistance;
});

// Masonry with grid
const gridStyles = getComputedStyle(document.querySelector('.clients__inner', null));
const rowHeight = parseInt(gridStyles.gridAutoRows);
const gap = parseInt(gridStyles.gridGap);

let makeGrid = function () {
	let items = document.querySelectorAll('.item-clients');
	for (let i = 0, item; item = items[i]; i++) {
		item.classList.remove('item-clients_ready');
		let height = item.offsetHeight;
		let rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
		item.style.gridRowEnd = 'span ' + rowSpan;
		item.classList.add('item-clients_ready');
	}
}
makeGrid();
window.addEventListener('load', makeGrid);
window.addEventListener('resize', () => {
	clearTimeout(makeGrid.resizeTimer);
	makeGrid.resizeTimer = setTimeout(makeGrid, 50);
});

// Animation
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

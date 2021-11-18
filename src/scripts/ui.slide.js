'use strict';

/**
 * 슬라이더
 * @param {String} 슬라이더 아이디 이름
 */
const sliderName = 'slider';

const slider = document.getElementById(sliderName),
    list = slider.querySelector('.' + sliderName + '__list'),
    items = list.children,
    sliderWidth = slider.offsetWidth,
    sliderHeight = list.firstChild.offsetHeight;

slider.className = sliderName;
list.style.width = sliderWidth * items.length + 'px'
slider.style.height = sliderHeight + 'px'


console.log(sliderWidth, sliderHeight)


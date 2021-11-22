'use strict';

/**
 * 슬라이더
 * @param id {String} 슬라이더 아이디 이름
 */
const id = 'slider';
var left = 0;

const $slider = document.getElementById(id),
  $list = $slider.querySelector('.' + id + '__list'),
  $items = $list.children,
  $pavigation = $slider.querySelector('.pavigation');

const width = $slider.offsetWidth;
const widthList = width * $items.length;
const height = $list.offsetHeight;

/**
 * DOM 만들기 
 * @param slider {} 전체 슬라이드
 * @param wrapper {function} 슬라이드 리스트 감싸는 프레임
 */
const DOM = {
  wrapper: function(){
    const dom = document.createElement('div');
    dom.className = id + '__wrap'
    dom.style.position = 'relative';
    dom.style.overflow = 'hidden';
    dom.style.height = `${height}px`;
    return dom;
  },
  list: function () {
    const dom = $list;
    dom.style.position = 'absolute';
    dom.style.width = `${widthList}px`;
    return dom;
  }
}
const wrapper = DOM.wrapper();
const temp = DOM.list();
wrapper.innerHTML = temp.outerHTML;
$slider.prepend(wrapper);
$list.remove();

const next = () => {
  left -= width;
  var limit = (-1) * width * ($items.length - 1);
  if (left < limit) {
    left = limit;
  }
  document.querySelector('.'+ id + '__list').style.left = `${left}px`;
}

$pavigation.addEventListener("click", next)
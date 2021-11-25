'use strict';

/**
 * 슬라이더
 * @param id {String} 슬라이더 아이디 이름
 */
const id = 'slider';
const active = 'is-active';

// selector
const $slider = document.getElementById(id);
const $list = $slider.querySelector('.' + id + '__list');
const $items = $list.childNodes;
const $pavigation = $slider.querySelectorAll('.pavigation li');

// variation
let left = 0;
const count = $items.length;
const width = $slider.offsetWidth;
const widthList = width * count;
const height = $list.offsetHeight;

// 값확인 나중에 삭제
console.dir($list)
console.log(`슬라이드 높이 ${height}px???`)


$items.forEach((item) => {
  item.style.width = `${width}px`
})

/**
 * DOM 만들기 
 * @param wrapper {function} 슬라이드 리스트 감싸는 프레임
 * @param list {function} 리스트 html 가져오기
 */
const DOM = {
  wrapper: function(){
    const dom = document.createElement('div');
    dom.className = id + '__wrap'
    dom.style.position = 'relative';
    dom.style.overflow = 'hidden';
    // dom.style.height = `${height}px`;
    dom.style.height = `420px`;
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


/**
 * 다음 슬라이드 이동
 * @param {function} next
 */
const next = (e) => {
  e.target.classList.add(active)

  left -= width;
  let limit = `-${widthList - width}`;

  if (left < limit) {
    left = limit;
  }
  document.querySelector('.'+ id + '__list').style.left = `${left}px`;
}

// $pavigation.addEventListener("click", next)

$pavigation.forEach((item) => { 
  item.addEventListener("click", next)
})
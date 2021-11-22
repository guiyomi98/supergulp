(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _ui=require("./ui"),one=(0,_ui.random)(10),two=(0,_ui.random)(20);console.log("".concat(one," ").concat(two));

},{"./ui":2}],2:[function(require,module,exports){
"use strict";var _ui=require("./ui.slide");console.log("ui was working");

},{"./ui.slide":3}],3:[function(require,module,exports){
"use strict";var id="slider",left=0,$slider=document.getElementById(id),$list=$slider.querySelector("."+id+"__list"),$items=$list.children,$pavigation=$slider.querySelector(".pavigation"),width=$slider.offsetWidth,widthList=width*$items.length,height=$list.offsetHeight,DOM={wrapper:function(){var e=document.createElement("div");return e.className=id+"__wrap",e.style.position="relative",e.style.overflow="hidden",e.style.height="".concat(height,"px"),e},list:function(){var e=$list;return e.style.position="absolute",e.style.width="".concat(widthList,"px"),e}},wrapper=DOM.wrapper(),temp=DOM.list();wrapper.innerHTML=temp.outerHTML,$slider.prepend(wrapper),$list.remove();var next=function(){left-=width;var e=-1*width*($items.length-1);left<e&&(left=e),document.querySelector("."+id+"__list").style.left="".concat(left,"px")};$pavigation.addEventListener("click",next);

},{}]},{},[1]);

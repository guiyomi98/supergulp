(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _ui=require("./ui"),one=(0,_ui.random)(10),two=(0,_ui.random)(20);console.log("".concat(one," ").concat(two));

},{"./ui":2}],2:[function(require,module,exports){
"use strict";var _ui=require("./ui.slide");console.log("ui was working");

},{"./ui.slide":3}],3:[function(require,module,exports){
"use strict";var sliderName="slider",slider=document.getElementById(sliderName),list=slider.querySelector("."+sliderName+"__list"),items=list.children,sliderWidth=slider.offsetWidth;slider.className=sliderName,list.style.width=sliderWidth*items.length+"px",console.log(sliderWidth,sliderHeight);

},{}]},{},[1]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive en|ja":
/*!***********************************************!*\
  !*** ./node_modules/moment/locale sync en|ja ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive en|ja";

/***/ }),

/***/ "./src/img/movie-01.mp4":
/*!******************************!*\
  !*** ./src/img/movie-01.mp4 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/movie-01.mp4";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js");
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonbox_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonbox-node */ "./node_modules/jsonbox-node/dist/index.js");
/* harmony import */ var jsonbox_node__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonbox_node__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/js/swiper.esm.bundle.js");
/* harmony import */ var imagesLoaded__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! imagesLoaded */ "./node_modules/imagesLoaded/imagesloaded.js");
/* harmony import */ var imagesLoaded__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(imagesLoaded__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var velocity_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! velocity-animate */ "./node_modules/velocity-animate/velocity.js");
/* harmony import */ var velocity_animate__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(velocity_animate__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_fontawesome_free_js_fontawesome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/fontawesome */ "./node_modules/@fortawesome/fontawesome-free/js/fontawesome.js");
/* harmony import */ var _fortawesome_fontawesome_free_js_fontawesome__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_fontawesome__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fortawesome_fontawesome_free_js_brands__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/brands */ "./node_modules/@fortawesome/fontawesome-free/js/brands.js");
/* harmony import */ var _fortawesome_fontawesome_free_js_brands__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_brands__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _module_util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./module/util */ "./src/module/util.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _img_movie_01_mp4__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./img/movie-01.mp4 */ "./src/img/movie-01.mp4");
/* harmony import */ var _img_movie_01_mp4__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_img_movie_01_mp4__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var object_fit_images__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! object-fit-images */ "./node_modules/object-fit-images/dist/ofi.common-js.js");
/* harmony import */ var object_fit_images__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(object_fit_images__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var objectFitPolyfill__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! objectFitPolyfill */ "./node_modules/objectFitPolyfill/dist/objectFitPolyfill.min.js");
/* harmony import */ var objectFitPolyfill__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(objectFitPolyfill__WEBPACK_IMPORTED_MODULE_14__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import "es6-promise/auto";
// import "fetch-polyfill";







imagesLoaded__WEBPACK_IMPORTED_MODULE_6___default.a.makeJQueryPlugin(jquery__WEBPACK_IMPORTED_MODULE_4___default.a);






var vidtag = document.getElementById('bg-video');
vidtag.addEventListener('canplay', function () {
  var ua = navigator.userAgent;

  if (/(iPhone|iPod)/.test(ua) && /OS 9/.test(ua)) {
    // iOS9以下のサファリは自動再生されない
    // これで可能か調査する
    var lastTime = Date.now();
    var ctime = 0;
    setInterval(function () {
      var curTime = Date.now();
      var diff = Date.now() - lastTime;
      lastTime = curTime;
      ctime += diff / 1000;
      vidtag.currentTime = ctime;

      if (vidtag.duration <= vidtag.currentTime) {
        ctime = 0;
      }
    }, 1000 / 30);
  }
}, false); // vidtag.src = mov;




(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function () {
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozcancelAnimationFrame || window.webkitcancelAnimationFrame || window.mscancelAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
})();

var loading = [];

loading.startLoader = function () {
  var dotsList = document.querySelectorAll('.box-loader .dot');
  var loaderLength = dotsList.length;
  var index = 0,
      // マイクロ秒までの精度を持った浮動小数点の値
  // https://developer.mozilla.org/ja/docs/Web/API/Performance/now
  lastTime = performance.now(),
      currentTime,
      elapsedTime;

  function moveDots() {
    // 一回前のカラーを外す
    if (index !== 0) {
      dotsList[index - 1].classList.remove('is-colored');
    } else {
      dotsList[loaderLength - 1].classList.remove('is-colored');
    } // カラーをつける


    dotsList[index].classList.add('is-colored');

    if (index >= loaderLength - 1) {
      index = 0;
    } else {
      index++;
    }
  }

  moveDots();

  function dotsLoop() {
    // ブラウザの描画更新単位と同じ単位で呼び出される
    // 次の再描画が行われる前に次のアニメーションをする関数を呼び出す
    // タブが非アクティブの時はFPSを落とす
    // https://liginc.co.jp/web/js/130758
    loading.requestID = window.requestAnimationFrame(dotsLoop);
    currentTime = performance.now();
    elapsedTime = currentTime - lastTime;

    if (elapsedTime > 600) {
      moveDots();
      lastTime = currentTime;
    }
  }

  dotsLoop();
};

loading.startLoader();
jquery__WEBPACK_IMPORTED_MODULE_4___default()('.swiper-wrapper').imagesLoaded({
  background: true
}, function () {
  jquery__WEBPACK_IMPORTED_MODULE_4___default()('.loading .box-loader').delay(200).velocity({
    opacity: 0
  }, {
    duration: 2800,
    easing: 'easeInOutQuad',
    begin: function begin() {
      jquery__WEBPACK_IMPORTED_MODULE_4___default()('.loading').delay(400).velocity('fadeOut', {
        duration: 2400,
        easing: 'easeInOutQuad',
        begin: function begin() {
          jquery__WEBPACK_IMPORTED_MODULE_4___default()('body, html').scrollTop(0);
          initSwiper();
        },
        complete: function complete() {
          window.cancelAnimationFrame(loading.requestID);
          jquery__WEBPACK_IMPORTED_MODULE_4___default()('.loading').remove();
        }
      });
    }
  });
});
var $header = jquery__WEBPACK_IMPORTED_MODULE_4___default()('#header');
$header.hide(); // const sec = $('.swiper-slide');
// const nvp = sec.outerHeight() + sec.offset().top;
// $(window).scroll(function () {
//   var distanceTop = $(document).scrollTop();
//   if (distanceTop > nvp) {
//     $header.show().addClass("scroll")
//   }
//   if (distanceTop < nvp) {
//     $header.removeClass("scroll").hide()
//   }
// });

jquery__WEBPACK_IMPORTED_MODULE_4___default()('.js-anchor').click(function (e) {
  e.preventDefault();
  var href = jquery__WEBPACK_IMPORTED_MODULE_4___default()(this).attr("href");
  jquery__WEBPACK_IMPORTED_MODULE_4___default()(href).delay(100).velocity("scroll", {
    duration: 500,
    easing: "easeInOutQuart",
    complete: function complete() {
      document.querySelector('html').classList.remove('open');
    }
  }); // document.querySelector(href).scrollIntoView({
  //   behavior: "smooth",
  //   block: "start"
  // });

  return false;
});

function initSwiper() {
  var mySwiper = new swiper__WEBPACK_IMPORTED_MODULE_5__["default"]('.hero-slider', {
    loop: true,
    speed: 1600,
    simulateTouch: false,
    effect: 'fade',
    autoplay: {
      delay: 2800,
      disableOnInteraction: false
    }
  });
  var facilitySwiper = new swiper__WEBPACK_IMPORTED_MODULE_5__["default"]('.facility-slider', {
    loop: true,
    slidesPerView: 5,
    speed: 600,
    spaceBetween: 36,
    centeredSlides: true,
    breakpoints: {
      // when window width is <= 800px
      800: {
        spaceBetween: 20
      }
    },
    autoplay: {
      delay: 2000,
      reverseDirection: true,
      disableOnInteraction: false
    }
  });
}

function fetch() {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var jbn, data, startDay, clone, lastDay, isRunning;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jbn = new jsonbox_node__WEBPACK_IMPORTED_MODULE_2__["JsonBox"]();
            _context.next = 3;
            return jbn.read(_module_util__WEBPACK_IMPORTED_MODULE_10__["BOX_ID"]);

          case 3:
            data = _context.sent;
            moment__WEBPACK_IMPORTED_MODULE_3___default.a.locale("ja", {
              weekdays: ["日", "月", "火", "水", "木", "金", "土"] //dddd
              // weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"]//ddd

            });
            startDay = moment__WEBPACK_IMPORTED_MODULE_3___default()(data[0].start, "YYYY.MM.DD");
            clone = moment__WEBPACK_IMPORTED_MODULE_3___default()(startDay);
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('#start').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(startDay.format('YYYY.MM.D')));
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('#start_day').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(startDay.format('ddd').toUpperCase()));
            lastDay = startDay.add(data[0].term - 1, 'days');

            if (lastDay.format('YYYY.MM.D') == clone.format('YYYY.MM.D')) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#end').text("");
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#end_day').text("");
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#end').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(lastDay.format('D')));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#end_day').text(lastDay.format('ddd').toUpperCase());
            }

            jquery__WEBPACK_IMPORTED_MODULE_4___default()('#at').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(data[0].at));

            if (lastDay.format('YYYY.MM.D') == clone.format('YYYY.MM.D')) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('.date').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(clone.format('YYYY年MM月DD日(dddd)')));
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('.date').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(clone.format('YYYY年MM月DD日(dddd)')) + '～' + Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(lastDay.format('MM月DD日(dddd)')));
            }

            jquery__WEBPACK_IMPORTED_MODULE_4___default()('.event_name').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].event_name)));
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('.venue').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].venue)));
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('.time').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].time)));
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('.fee').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee)));
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('.content').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].content)));
            jquery__WEBPACK_IMPORTED_MODULE_4___default()('.hashtag').text(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].hashtag)));

            if (data[0].fee_item1) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item1)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee1)), "</dd>"));
            }

            if (data[0].fee_item2) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item2)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee2)), "</dd>"));
            }

            if (data[0].fee_item3) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item3)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee3)), "</dd>"));
            }

            if (data[0].fee_item4) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item4)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee4)), "</dd>"));
            }

            if (data[0].fee_item5) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item5)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee5)), "</dd>"));
            }

            if (data[0].fee_item6) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item6)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee6)), "</dd>"));
            }

            if (data[0].fee_item7) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item7)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee7)), "</dd>"));
            }

            if (data[0].fee_item8) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item8)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee8)), "</dd>"));
            }

            if (data[0].fee_item9) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item9)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee9)), "</dd>"));
            }

            if (data[0].fee_item10) {
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dt>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee_item10)), "</dt>"));
              jquery__WEBPACK_IMPORTED_MODULE_4___default()('#price-table').append("<dd>".concat(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["escape_html"])(Object(_module_util__WEBPACK_IMPORTED_MODULE_10__["changeBlank"])(data[0].fee10)), "</dd>"));
            }

            setWidth(data[0].width);
            isRunning = false;
            jquery__WEBPACK_IMPORTED_MODULE_4___default()(window).resize(function (e) {
              // 呼び出されるまで何もしない
              if (!isRunning) {
                isRunning = true; // 描画する前のタイミングで呼び出してもらう

                window.requestAnimationFrame(function () {
                  setWidth(data[0].width);
                  setFullHeight();
                  isRunning = false;
                });
              }
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

jquery__WEBPACK_IMPORTED_MODULE_4___default()(document).ready(function () {
  setFullHeight();
  fetch();
  jquery__WEBPACK_IMPORTED_MODULE_4___default()('.nav-button').click(function () {
    document.querySelector('html').classList.toggle('open');
  });

  if (!document.currentScript) {
    object_fit_images__WEBPACK_IMPORTED_MODULE_13___default()(); //IE only
  }

  var elements = document.querySelectorAll('.fit');
  objectFitPolyfill(elements);
});

function setFullHeight() {
  var hSize = jquery__WEBPACK_IMPORTED_MODULE_4___default()(window).height();
  jquery__WEBPACK_IMPORTED_MODULE_4___default()('.hero-slider').height(hSize);
}

function setWidth(width) {
  if (window.innerWidth < 800) {
    jquery__WEBPACK_IMPORTED_MODULE_4___default()('.hero-date').css('width', width + 'rem');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_4___default()('.hero-date').css('width', 'auto');
  }
}

var element = document.getElementById('hero');
var observer = new IntersectionObserver(callback); // IntersectionObserverのインスタンスを生成

observer.observe(element);

function callback(entries, observer) {
  var _iterator = _createForOfIteratorHelper(entries),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var entry = _step.value;
      var _element = entry.target;

      if (entry.isIntersecting) {
        // ヒーローイメージが表示されているとき
        $header.removeClass("scrolled");
      } else {
        // ヒーローイメージが表示されていないとき
        $header.show().addClass("scrolled");
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

/***/ }),

/***/ "./src/module/util.js":
/*!****************************!*\
  !*** ./src/module/util.js ***!
  \****************************/
/*! exports provided: changeBlank, escape_html, BOX_ID, JBN_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeBlank", function() { return changeBlank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape_html", function() { return escape_html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOX_ID", function() { return BOX_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JBN_ID", function() { return JBN_ID; });
function changeBlank(string) {
  if (string == "") {
    return '-';
  } else {
    return string;
  }
}
function escape_html(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return string.replace(/[&'`"<>]/g, function (match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    }[match];
  });
}
var BOX_ID = 'box_efaacfeddbbd64bb47f3';
var JBN_ID = '5e21b50fcd442f0017cd446d';

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=index.js.map?9b913c9d82e77efad319
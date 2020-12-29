/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/views/ts/index.ts":
/*!*******************************!*\
  !*** ./src/views/ts/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst socket_io_client_1 = __webpack_require__(/*! socket.io-client */ \"socket.io-client\");\r\nconst socket = socket_io_client_1.io('http://localhost:3001');\r\nsocket.on('add-users', (data) => {\r\n    data.forEach((item, index) => {\r\n        const el = document.createElement('div');\r\n        el.setAttribute('id', item);\r\n        el.innerHTML = item;\r\n        el.addEventListener('click', () => {\r\n            console.log(item);\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://express-mysql/./src/views/ts/index.ts?");

/***/ }),

/***/ "socket.io-client":
/*!*********************!*\
  !*** external "io" ***!
  \*********************/
/***/ ((module) => {

eval("module.exports = io;\n\n//# sourceURL=webpack://express-mysql/external_%22io%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/views/ts/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
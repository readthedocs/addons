/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 967:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\nCSS required for the flyout\n\nNOTE: this is a simplified version of\nhttps://github.com/readthedocs/readthedocs.org/blob/761e3b653be9f1ddca2893b161c63150993062d7/media/css/readthedocs-doc-embed.css\n */\n.rst-versions.rst-badge {\n    display: block;\n\n    bottom: 50px;\n\n    /* Workaround for mkdocs which set a specific height for this element */\n    height: auto;\n}\n\n.rst-other-versions {\n    text-align: left;\n}\n\n.rst-other-versions a {\n    border: 0;\n}\n\n.rst-other-versions dl {\n    margin: 0;\n}\n\n.rtd-current-item {\n    font-weight: bold;\n}\n\n\n/* Fix RTD theme bottom margin */\n.rst-content .line-block {\n    margin-bottom: 24px\n}\n\n/* Fix for nav bottom padding with flyout */\nnav.wy-nav-side {\n    padding-bottom: 3em;\n}\n\n\n/* theme.css */\n.rst-versions.rst-badge {\n    width: auto;\n    bottom: 20px;\n    right: 20px;\n    left: auto;\n    border: none;\n    max-width: 300px;\n    max-height: 90%;\n}\n\n\n.rst-versions.shift-up {\n    height: auto;\n    max-height: 100%;\n    overflow-y: scroll;\n}\n\n.rst-versions {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 300px;\n    color: #fcfcfc;\n    background: #1f1d1d;\n    font-family: Lato,proxima-nova,Helvetica Neue,Arial,sans-serif;\n    z-index: 400;\n}\n\n.rst-versions.rst-badge.shift-up .rst-current-version {\n\n    text-align: right;\n\n}\n\n.rst-versions.rst-badge > .rst-current-version {\n\n    width: auto;\n    height: 30px;\n    line-height: 30px;\n    padding: 0 6px;\n    display: block;\n    text-align: center;\n\n}\n\n.rst-versions .rst-current-version {\n\n    padding: 12px;\n    background-color: #272525;\n    display: block;\n    text-align: right;\n    font-size: 90%;\n    cursor: pointer;\n    color: #27ae60;\n    zoom: 1;\n\n}\n.rst-versions.shift-up .rst-other-versions {\n\n    display: block;\n\n}\n\n.rst-versions .rst-other-versions {\n\n    font-size: 90%;\n    padding: 12px;\n    color: grey;\n    display: none;\n\n}\n\n.rst-other-versions dl {\n\n    margin: 0px;\n\n}\n\n.rst-versions .rst-other-versions hr {\n\n    display: block;\n    height: 1px;\n    border: 0;\n        border-top-color: currentcolor;\n        border-top-style: none;\n        border-top-width: 0px;\n    margin: 20px 0;\n    padding: 0;\n    border-top: 1px solid #413d3d;\n}\n", ""]);
// Exports
var ___CSS_LOADER_STYLE_SHEET___ = new CSSStyleSheet();
___CSS_LOADER_STYLE_SHEET___.replaceSync(___CSS_LOADER_EXPORT___.toString());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_STYLE_SHEET___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 245:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_543__(moduleId) {
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_543__);
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
/******/ 	__nested_webpack_require_543__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_543__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_543__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_543__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__nested_webpack_require_543__.r = function(exports) {
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
/******/ 	__nested_webpack_require_543__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __nested_webpack_require_543__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__nested_webpack_require_543__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __nested_webpack_require_543__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_543__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_543__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_543__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_543__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_543__(__nested_webpack_require_543__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Placement, check_dependencies, load_placements, wait, load, uplifted, detectedKeywords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Placement\", function() { return Placement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"check_dependencies\", function() { return check_dependencies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load_placements\", function() { return load_placements; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wait\", function() { return wait; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load\", function() { return load; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uplifted\", function() { return uplifted; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detectedKeywords\", function() { return detectedKeywords; });\n/* harmony import */ var verge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! verge */ \"./node_modules/verge/verge.js\");\n/* harmony import */ var verge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(verge__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ \"./styles.scss\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, \"prototype\", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === \"function\" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== \"function\") { throw new TypeError(\"Super expression must either be null or a function\"); } if (typeof _cache !== \"undefined\") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\nfunction _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf(\"[native code]\") !== -1; }\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/* Ethical ad publisher JavaScript client\n *\n * Loads placement from Ethical Ad decision API. Searches for elements with\n * `ethical-ad` data binding attributes and uses these attributes to query the\n * decision API.\n *\n * This is native JavaScript, no JQuery. It uses the API JSONP interface to get\n * around CORS and related issues. A script is added with a callback on\n * `window`. The promise is rejected if there are errors with the request or the\n * response doesn't look correct.\n *\n * Currently, only two parameters are supported with the ad placement: publisher\n * id and the place type. All of this is determined by the server and this\n * client so far only renders the API return HTML.\n *\n * This can be loaded async. CSS styles are preloaded via webpack `style-loader`.\n * There is some potential for problems if CSP rules disallow inline\n * stylesheets, but webpack does allow for a hardcoded nonce.\n *\n * Usage:\n *\n *     <script async src=\"ethicalads.min.js\"></script>\n *     <div data-ea-publisher=\"foo\" data-ea-type=\"text\"></div>\n */\n\n\n\nvar AD_CLIENT_VERSION = \"1.6.2\"; // Sent with the ad request\n\n// For local testing, set this\n// const AD_DECISION_URL = \"http://ethicaladserver:5000/api/v1/decision/\";\nvar AD_DECISION_URL = \"https://server.ethicalads.io/api/v1/decision/\";\nvar AD_TYPES_VERSION = 1; // Used with the ad type slugs\nvar ATTR_PREFIX = \"data-ea-\";\nvar ABP_DETECTION_PX = \"https://media.ethicalads.io/abp/px.gif\";\n\n// Keywords and topics\n//\n// This allows us to categorize pages simply and have better content targeting.\n// Additional categorization can be done on the server side for pages\n// that request ads commonly but this quick and easy categorization\n// works decently well most of the time.\nvar KEYWORDS = {\n  // Topics\n  \"android\": \"android\",\n  \"ios\": \"ios\",\n  \"iphone\": \"ios\",\n  \"blockchain\": \"blockchain\",\n  \"bitcoin\": \"bitcoin\",\n  \"ethereum\": \"ethereum\",\n  \"hyperledger\": \"hyperledger\",\n  \"solidity\": \"solidity\",\n  \"cryptography\": \"cryptography\",\n  \"security\": \"security\",\n  \"infosec\": \"security\",\n  \"privacy\": \"privacy\",\n  \"authentication\": \"authentication\",\n  \"authorization\": \"authorization\",\n  \"otp\": \"otp\",\n  \"2fa\": \"2fa\",\n  \"mfa\": \"mfa\",\n  \"sms\": \"sms\",\n  \"frontend\": \"frontend\",\n  \"backend\": \"backend\",\n  \"full-stack\": \"backend\",\n  \"devops\": \"devops\",\n  \"ai\": \"artificial-intelligence\",\n  \"nlp\": \"nlp\",\n  \"ml\": \"machine-learning\",\n  \"cloud\": \"cloud\",\n  \"api\": \"api\",\n  \"docker\": \"docker\",\n  \"kubernetes\": \"kubernetes\",\n  \"container\": \"containers\",\n  \"containers\": \"containers\",\n  \"ansible\": \"ansible\",\n  \"serverless\": \"serverless\",\n  \"openshift\": \"openshift\",\n  \"terraform\": \"terraform\",\n  \"openid\": \"openid\",\n  \"aws\": \"aws\",\n  \"azure\": \"azure\",\n  \"gcp\": \"gcp\",\n  \"linux\": \"linux\",\n  \"ubuntu\": \"ubuntu\",\n  \"monitoring\": \"monitoring\",\n  \"redis\": \"redis\",\n  \"rabbitmq\": \"rabbitmq\",\n  \"nosql\": \"nosql\",\n  \"postgres\": \"postgresql\",\n  \"postgresql\": \"postgresql\",\n  \"mysql\": \"mysql\",\n  \"database\": \"database\",\n  \"testing\": \"testing\",\n  \"pytest\": \"pytest\",\n  \"lint\": \"lint\",\n  \"linting\": \"lint\",\n  \"pylint\": \"pylint\",\n  \"unittest\": \"unittest\",\n  \"ci\": \"ci\",\n  \"cd\": \"cd\",\n  \"tdd\": \"test-driven-development\",\n  \"elasticsearch\": \"elasticsearch\",\n  \"lucene\": \"lucene\",\n  \"solr\": \"solr\",\n  \"nginx\": \"nginx\",\n  \"heroku\": \"heroku\",\n  \"spa\": \"spa\",\n  // Frameworks amd modules\n  \"django\": \"django\",\n  \"rails\": \"rails\",\n  \"angular\": \"angular\",\n  \"angularjs\": \"angular\",\n  \"laravel\": \"laravel\",\n  \"react\": \"reactjs\",\n  \"reactjs\": \"reactjs\",\n  \"react-native\": \"reactjs\",\n  \"jupyter\": \"jupyter\",\n  \"matplotlib\": \"matplotlib\",\n  \"pytorch\": \"pytorch\",\n  \"pydata\": \"pydata\",\n  \"pandas\": \"pandas\",\n  \"numpy\": \"numpy\",\n  \"wsgi\": \"wsgi\",\n  \"celery\": \"celery\",\n  \"jinja\": \"jinja\",\n  \"jinja2\": \"jinja\",\n  \"flask\": \"flask\",\n  \"werkzeug\": \"werkzeug\",\n  \"oauth\": \"oauth\",\n  \"vuejs\": \"vuejs\",\n  \"vue\": \"vuejs\",\n  \"tensorflow\": \"tensorflow\",\n  \"tensor\": \"tensor\",\n  \"webpack\": \"webpack\",\n  // Programming & markup languages\n  \"dotnet\": \"dotnet\",\n  \".net\": \"dotnet\",\n  \"c#\": \"c-sharp\",\n  \"c++\": \"cplusplus\",\n  \"erlang\": \"erlang\",\n  \"f#\": \"fsharp\",\n  \"golang\": \"golang\",\n  \"haskell\": \"haskell\",\n  \"java\": \"java\",\n  \"javascript\": \"javascript\",\n  \"julia\": \"julia\",\n  \"kotlin\": \"kotlin\",\n  \"obj-c\": \"obj-c\",\n  \"objective-c\": \"obj-c\",\n  \"php\": \"php\",\n  \"python\": \"python\",\n  \"perl\": \"perl\",\n  \"sql\": \"sql\",\n  \"ruby\": \"ruby\",\n  \"rust\": \"rust\",\n  \"scala\": \"scala\",\n  \"swift\": \"swift\",\n  \"css\": \"css\",\n  \"scss\": \"scss\",\n  \"typescript\": \"typescript\",\n  \"redux\": \"redux\"\n\n  // Phrases (not currently implemented)\n  //\"data science\": \"datascience\",\n  //\"machine learning\": \"machine-learning\",\n};\n\n// Maximum number of words of a document to analyze looking for keywords\n// This is simply a check against taking too much time on very long documents\nvar MAX_WORDS_ANALYZED = 9999;\n\n// Max number of detected keywords to send\n// Lowering this number means that only major topics of the page get sent on long pages\nvar MAX_KEYWORDS = 3;\n\n// Minimum number of occurrences of a keyword to consider it\nvar MIN_KEYWORD_OCCURRENCES = 2;\n\n// Time between checking whether the ad is in the viewport to count the time viewed\n// Time viewed is an important advertiser metric\nvar VIEW_TIME_INTERVAL = 1; // seconds\nvar VIEW_TIME_MAX = 5 * 60; // seconds\n\n// In-viewport fudge factor\n// A fudge factor of ~3 is needed for the case where the ad\n// is hidden off the side of the screen by a sliding sidebar\n// For example, if the right side of the ad is at x=0\n// or the left side of the ad is at the right side of the viewport\nvar VIEWPORT_FUDGE_FACTOR = -3; // px\n\n/* Placement object to query decision API and return an Element node\n *\n * @param {string} publisher - Publisher ID\n * @param {string} ad_type - Placement ad type id\n * @param {Element} target - Target element\n * @param {Object} options - Various options for configuring the placement such as:\n      keywords, styles, campaign_types, load_manually, force_ad, force_campaign\n */\nvar Placement = /*#__PURE__*/function () {\n  function Placement(publisher, ad_type, target, options) {\n    _classCallCheck(this, Placement);\n    this.publisher = publisher;\n    this.ad_type = ad_type;\n    this.target = target;\n\n    // Options\n    this.options = options;\n    this.style = options.style;\n    this.keywords = options.keywords || [];\n    this.load_manually = options.load_manually;\n    this.force_ad = options.force_ad;\n    this.force_campaign = options.force_campaign;\n    this.campaign_types = options.campaign_types || [];\n    if (!this.campaign_types.length) {\n      this.campaign_types = [\"paid\", \"publisher-house\", \"community\", \"house\"];\n    }\n\n    // Initialized and will be used in the future\n    this.view_time = 0;\n    this.view_time_sent = false; // true once the view time is sent to the server\n    this.response = null;\n  }\n\n  /* Create a placement from an element\n   *\n   * Returns null if the placement is already loaded.\n   *\n   * @static\n   * @param {Element} element - Load placement and append to this Element\n   * @returns {Placement}\n   */\n  _createClass(Placement, [{\n    key: \"load\",\n    value:\n    /* Transforms target element into a placement\n     *\n     * This method organizes all of the operations to transform the placement\n     * configuration wrapper `div` into an ad placement -- including starting the\n     * API transaction, displaying the ad element,\n     * and handling the viewport detection.\n     *\n     * @returns {Promise}\n     */\n    function load() {\n      var _this = this;\n      // Detect the keywords\n      this.keywords = this.keywords.concat(this.detectKeywords());\n      return this.fetch().then(function (element) {\n        if (element === undefined) {\n          throw new EthicalAdsWarning(\"Ad decision request blocked\");\n        }\n        if (!element) {\n          throw new EthicalAdsWarning(\"No ads to show.\");\n        }\n\n        // Add `loaded` class, signifying that the CSS styles should finally be\n        // applied to the target element.\n        var classes = _this.target.className || \"\";\n        classes += \" loaded\";\n        _this.target.className = classes.trim();\n\n        // Make this element the only child element of the target element\n        while (_this.target.firstChild) {\n          _this.target.removeChild(_this.target.firstChild);\n        }\n\n        // Apply any styles based on the specified styling\n        _this.applyStyles(element);\n        _this.target.appendChild(element);\n        return _this;\n      }).then(function (placement) {\n        // Detect when the ad is in the viewport\n        // Add the view pixel to the DOM to count the view\n        // Also count the time the ad is in view\n        //  this will be sent before the page/tab is closed or navigated away\n\n        var viewport_detection = setInterval(function (element) {\n          if (placement.inViewport(element)) {\n            // This ad was seen!\n            var pixel = document.createElement(\"img\");\n            pixel.src = placement.response.view_url;\n            if (uplifted) {\n              pixel.src += \"?uplift=true\";\n            }\n            pixel.className = \"ea-pixel\";\n            element.appendChild(pixel);\n            clearInterval(viewport_detection);\n          }\n        }, 100, placement.target);\n        var view_time_counter = setInterval(function (element) {\n          if (placement.view_time_sent) {\n            clearInterval(view_time_counter);\n          } else if (placement.inViewport(element)) {\n            // Increment the ad's time in view counter\n            placement.view_time += VIEW_TIME_INTERVAL;\n            if (placement.view_time >= VIEW_TIME_MAX) {\n              clearInterval(view_time_counter);\n            }\n          }\n        }, VIEW_TIME_INTERVAL * 1000, placement.target);\n        var visibility_change_listener = function visibility_change_listener() {\n          if (placement.view_time <= 0 || placement.view_time_sent || !placement.response.view_time_url) return;\n          // Check if the tab loses focus/is closed or the browser/app is minimized/closed\n          // In that case, no longer count further time that the ad is in view\n          // Send the time the ad was viewed to the server\n          if (document.visibilityState === \"hidden\" || document.visibilityState === \"unloaded\") {\n            var pixel = document.createElement(\"img\");\n            pixel.src = placement.response.view_time_url + \"?view_time=\" + placement.view_time;\n            pixel.className = \"ea-pixel\";\n            placement.target.appendChild(pixel);\n            placement.view_time_sent = true;\n            document.removeEventListener(\"visibilitychange\", visibility_change_listener);\n          }\n        };\n        document.addEventListener(\"visibilitychange\", visibility_change_listener);\n      });\n    }\n\n    /* Returns whether the ad is visible in the viewport\n     *\n     * @param {Element} element - The ad element\n     * @returns {boolean} True if the ad is loaded and visible in the viewport\n     *  (including the tab being focused and not minimized) and returns false otherwise.\n     */\n  }, {\n    key: \"inViewport\",\n    value: function inViewport(element) {\n      if (this.response && this.response.view_url && verge__WEBPACK_IMPORTED_MODULE_0___default.a.inViewport(element, VIEWPORT_FUDGE_FACTOR) && document.visibilityState === \"visible\") {\n        return true;\n      }\n      return false;\n    }\n\n    /* Get placement data from decision API\n     *\n     * @returns {Promise<Element>} Resolves with an Element converted from an HTML\n     * string from API response. Can also be null, indicating a noop action.\n     */\n  }, {\n    key: \"fetch\",\n    value: function fetch() {\n      var _this2 = this;\n      // Make sure callbacks don't collide even with multiple placements\n      var callback = \"ad_\" + Date.now() + \"_\" + Math.floor(Math.random() * 1000000);\n      var div_id = callback;\n      if (this.target.id) {\n        div_id = this.target.id;\n      }\n\n      // There's no hard maximum on URL lengths (all of these get added to the query params)\n      // but ideally we want to keep our URLs below ~2k which should work basically everywhere\n      var params = {\n        publisher: this.publisher,\n        ad_types: this.ad_type,\n        div_ids: div_id,\n        callback: callback,\n        keywords: this.keywords.join(\"|\"),\n        campaign_types: this.campaign_types.join(\"|\"),\n        format: \"jsonp\",\n        client_version: AD_CLIENT_VERSION,\n        // location.href includes query params (possibly sensitive) and fragments (unnecessary)\n        url: (window.location.origin + window.location.pathname).slice(0, 256)\n      };\n      if (this.force_ad) {\n        params[\"force_ad\"] = this.force_ad;\n      }\n      if (this.force_campaign) {\n        params[\"force_campaign\"] = this.force_campaign;\n      }\n      var url_params = new URLSearchParams(params);\n      var url = new URL(AD_DECISION_URL + \"?\" + url_params.toString());\n      return new Promise(function (resolve, reject) {\n        window[callback] = function (response) {\n          if (response && response.html && response.view_url) {\n            _this2.response = response;\n            var node_convert = document.createElement(\"div\");\n            node_convert.innerHTML = response.html;\n            return resolve(node_convert.firstChild);\n          } else {\n            // No ad to show for this targeting/publisher\n            return resolve(null);\n          }\n        };\n        var script = document.createElement(\"script\");\n        script.src = url;\n        script.type = \"text/javascript\";\n        script.async = true;\n        script.addEventListener(\"error\", function (err) {\n          // There was a problem loading this request, likely this was blocked by\n          // an ad blocker. We'll resolve with an empty response instead of\n          // throwing an error.\n          return resolve();\n        });\n        document.getElementsByTagName(\"head\")[0].appendChild(script);\n      });\n    }\n\n    /* Detect whether this ad is \"uplifted\" meaning allowed by ABP's Acceptable Ads list\n     *\n     * Calls the provided callback passing a boolean whether this ad is uplifted.\n     * We need this data to provide back to the AcceptableAds folks.\n     *\n     * This code comes directly from Eyeo/AdblockPlus team to measure Acceptable Ads.\n     *\n     * @static\n     * @param {string} px - A URL of a pixel to test\n     * @param {function) callback - A callback to call when finished\n     */\n  }, {\n    key: \"detectABP\",\n    value: function detectABP(px, callback) {\n      var detected = false;\n      var checksRemain = 2;\n      var error1 = false;\n      var error2 = false;\n      if (typeof callback != \"function\") return;\n      px += \"?ch=*&rn=*\";\n      function beforeCheck(callback, timeout) {\n        if (checksRemain == 0 || timeout > 1E3) callback(checksRemain == 0 && detected);else setTimeout(function () {\n          beforeCheck(callback, timeout * 2);\n        }, timeout * 2);\n      }\n      function checkImages() {\n        if (--checksRemain) return;\n        detected = !error1 && error2;\n      }\n      var random = Math.random() * 11;\n      var img1 = new Image();\n      img1.onload = checkImages;\n      img1.onerror = function () {\n        error1 = true;\n        checkImages();\n      };\n      img1.src = px.replace(/\\*/, 1).replace(/\\*/, random);\n      var img2 = new Image();\n      img2.onload = checkImages;\n      img2.onerror = function () {\n        error2 = true;\n        checkImages();\n      };\n      img2.src = px.replace(/\\*/, 2).replace(/\\*/, random);\n      beforeCheck(callback, 250);\n    }\n\n    /* Returns an array of keywords (strings) found on the page\n     *\n     * @returns {Array[string]} Advertising keywords found on the page\n     */\n  }, {\n    key: \"detectKeywords\",\n    value: function detectKeywords() {\n      // Return previously detected keywords\n      // If this code has already run.\n      // Note: if there are \"no\" keywords (an empty list) this is still true\n      if (detectedKeywords) return detectedKeywords;\n      var keywordHist = {}; // Keywords found => count of keyword\n      var mainContent = document.querySelector(\"[role='main']\") || document.querySelector(\"main\") || document.querySelector(\"body\");\n      var words = mainContent.textContent.split(/\\s+/);\n      var wordTrimmer = /^[\\('\"]?(.*?)[,\\.\\?\\!:;\\)'\"]?$/g;\n      for (var x = 0; x < words.length && x < MAX_WORDS_ANALYZED; x++) {\n        // Remove certain punctuation from beginning and end of the word\n        var word = words[x].replace(wordTrimmer, \"$1\").toLowerCase();\n        if (KEYWORDS.hasOwnProperty(word)) {\n          keywordHist[KEYWORDS[word]] = (keywordHist[KEYWORDS[word]] || 0) + 1;\n        }\n      }\n\n      // Sort the hist with the most common items first\n      // Grab only the MAX_KEYWORDS most common\n      var keywords = Object.entries(keywordHist).filter(\n      // Only consider a keyword with at least this many occurrences\n      function (a) {\n        return a[1] >= MIN_KEYWORD_OCCURRENCES;\n      }).sort(function (a, b) {\n        if (a[1] > b[1]) return -1;\n        if (a[1] < b[1]) return 1;\n        return 0;\n      }).slice(0, MAX_KEYWORDS).map(function (x) {\n        return x[0];\n      });\n      detectedKeywords = keywords;\n      return keywords;\n    }\n\n    /* Apply custom styles based on data-ea-style\n     *\n     */\n  }, {\n    key: \"applyStyles\",\n    value: function applyStyles(element) {\n      // Stickybox: https://ethical-ad-client.readthedocs.io/en/latest/#stickybox\n      if (this.style === \"stickybox\") {\n        var hideButton = document.createElement(\"div\");\n        hideButton.setAttribute(\"class\", \"ea-stickybox-hide\");\n        hideButton.append(\"×\");\n        hideButton.addEventListener(\"click\", function () {\n          document.querySelector(\"[data-ea-publisher]\").remove();\n        });\n        element.appendChild(hideButton);\n      }\n\n      // FixedFooter: https://ethical-ad-client.readthedocs.io/en/latest/#fixedfooter\n      if (this.style === \"fixedfooter\") {\n        //element.querySelector('.ea-callout a').remove();\n\n        var container = document.createElement(\"div\");\n        container.setAttribute(\"class\", \"ea-fixedfooter-hide\");\n        element.appendChild(container);\n        var _hideButton = document.createElement(\"span\");\n        _hideButton.append(\"Close Ad\");\n        _hideButton.addEventListener(\"click\", function () {\n          document.querySelector(\"[data-ea-publisher]\").remove();\n        });\n        container.appendChild(_hideButton);\n      }\n    }\n  }], [{\n    key: \"from_element\",\n    value: function from_element(element) {\n      // Get attributes from DOM node\n      var publisher = element.getAttribute(ATTR_PREFIX + \"publisher\");\n      var ad_type = element.getAttribute(ATTR_PREFIX + \"type\");\n      if (!ad_type) {\n        ad_type = \"image\";\n        element.setAttribute(ATTR_PREFIX + \"type\", \"image\");\n      }\n      var keywords = (element.getAttribute(ATTR_PREFIX + \"keywords\") || \"\").split(\"|\").filter(function (word) {\n        return word.length > 1;\n      });\n      var campaign_types = (element.getAttribute(ATTR_PREFIX + \"campaign-types\") || \"\").split(\"|\").filter(function (word) {\n        return word.length > 1;\n      });\n      var load_manually = element.getAttribute(ATTR_PREFIX + \"manual\") === \"true\";\n      var style = element.getAttribute(ATTR_PREFIX + \"style\");\n      var force_ad = element.getAttribute(ATTR_PREFIX + \"force-ad\");\n      var force_campaign = element.getAttribute(ATTR_PREFIX + \"force-campaign\");\n\n      // Add version to ad type to verison the HTML return\n      if (ad_type === \"image\" || ad_type === \"text\") {\n        ad_type += \"-v\" + AD_TYPES_VERSION;\n      }\n      var classes = (element.className || \"\").split(\" \");\n      if (classes.indexOf(\"loaded\") >= 0) {\n        console.error(\"EthicalAd already loaded.\");\n        return null;\n      }\n      return new Placement(publisher, ad_type, element, {\n        keywords: keywords,\n        style: style,\n        campaign_types: campaign_types,\n        load_manually: load_manually,\n        force_ad: force_ad,\n        force_campaign: force_campaign\n      });\n    }\n  }]);\n  return Placement;\n}();\n\n/* Detects whether the browser supports the necessary JS APIs to support the ad client\n *\n * Generally we support recent versions of evergreen browsers (Chrome, Firefox, Safari, Edge)\n * but we no longer support IE11.\n *\n *  @returns {boolean} true if all dependencies met and false otherwise\n */\nfunction check_dependencies() {\n  if (!Object.entries || !window.URL || !window.URLSearchParams || !window.Promise) {\n    console.error(\"Browser does not meet ethical ad client dependencies. Not showing ads\");\n    return false;\n  }\n  return true;\n}\n\n/* Find all placement DOM elements and hot load HTML as child nodes\n *\n * @param {boolean} force_load - load placements even if they are set to load manually\n * @returns {Promise<[Placement]>} Resolves to a list of Placement instances\n */\nfunction load_placements() {\n  var force_load = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  // Find all elements matching required data binding attribute.\n  var node_list = document.querySelectorAll(\"[\" + ATTR_PREFIX + \"publisher]\");\n  var elements = Array.prototype.slice.call(node_list);\n\n  // Create main promise. Iterator `all()` Promise will surround array of found\n  // elements. If any of these elements have issues, this main promise will\n  // reject.\n  if (elements.length === 0) {\n    throw new Error(\"No ad placements found.\");\n  }\n  return Promise.all(elements.map(function (element, index) {\n    var placement = Placement.from_element(element);\n\n    // Run AcceptableAds detection code\n    // This lets us know how many impressions are attributed to AceeptableAds\n    // Only run this once even for multiple placements\n    // All impressions will be correctly attributed\n    if (index === 0 && placement && !force_load) {\n      placement.detectABP(ABP_DETECTION_PX, function (usesABP) {\n        uplifted = usesABP;\n        if (usesABP) {\n          console.debug(\"Acceptable Ads enabled. Thanks for allowing our non-tracking ads :)\");\n        }\n      });\n    }\n    if (placement && (force_load || !placement.load_manually)) {\n      return placement.load();\n    } else {\n      // This will be manually loaded later or has already been loaded\n      return null;\n    }\n  }));\n}\n\n// An error class that we will not surface to clients normally.\nvar EthicalAdsWarning = /*#__PURE__*/function (_Error) {\n  _inherits(EthicalAdsWarning, _Error);\n  var _super = _createSuper(EthicalAdsWarning);\n  function EthicalAdsWarning() {\n    _classCallCheck(this, EthicalAdsWarning);\n    return _super.apply(this, arguments);\n  }\n  return _createClass(EthicalAdsWarning);\n}( /*#__PURE__*/_wrapNativeSuper(Error));\n/* Wrapping Promise to allow for handling of errors by user\n *\n * This promise currently does not reject on error as this will emit a console\n * warning if the user hasn't added a promise rejection handler (which is most\n * cases).\n *\n * This promise resolves to an aray of Placement instances, or an empty list if\n * there was any error configuring the placements.\n *\n * For example, to perform an action when no placements are loaded:\n *\n *   <script>\n *   ethicalads.wait.then((placements) => {\n *     if (!placements.length) {\n *       console.log('Ads were not able to load');\n *     }\n *   }\n *   </script>\n *\n * @type {Promise<[Placement]>}\n */\nvar wait;\n\n/* Loading placements manually rather than the normal way\n *\n *   <div data-ea-publisher=\"...\" data-ea-manual=\"true\"></div>\n *   <script>\n *     ethicalads.load();\n *   </script>\n *\n * @type function\n */\nvar load;\n\n/* Whether this ad impression is attributed to being on the Acceptable Ads list.\n * @type boolean\n */\nvar uplifted = false;\n\n/* Keywords detected on the page\n * @type {Array[string]}\n */\nvar detectedKeywords = null;\n\n//# sourceURL=webpack://ethicalads/./index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* Ad styles */\\n[data-ea-publisher].loaded,\\n[data-ea-type].loaded {\\n  font-size: 14px;\\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;\\n  font-weight: normal;\\n  font-style: normal;\\n  leter-spacing: 0px;\\n  vertical-align: baseline;\\n  line-height: 1.3em;\\n}\\n[data-ea-publisher].loaded a,\\n[data-ea-type].loaded a {\\n  text-decoration: none;\\n}\\n[data-ea-publisher].loaded .ea-pixel,\\n[data-ea-type].loaded .ea-pixel {\\n  display: none;\\n}\\n[data-ea-publisher].loaded .ea-content,\\n[data-ea-type].loaded .ea-content {\\n  margin: 1em 1em 0.5em 1em;\\n  padding: 1em;\\n  background: rgba(0, 0, 0, 0.03);\\n  color: rgb(80, 80, 80);\\n}\\n[data-ea-publisher].loaded .ea-content a:link,\\n[data-ea-type].loaded .ea-content a:link {\\n  color: rgb(80, 80, 80);\\n}\\n[data-ea-publisher].loaded .ea-content a:visited,\\n[data-ea-type].loaded .ea-content a:visited {\\n  color: rgb(80, 80, 80);\\n}\\n[data-ea-publisher].loaded .ea-content a:hover,\\n[data-ea-type].loaded .ea-content a:hover {\\n  color: #373737;\\n}\\n[data-ea-publisher].loaded .ea-content a:active,\\n[data-ea-type].loaded .ea-content a:active {\\n  color: #373737;\\n}\\n[data-ea-publisher].loaded .ea-content a strong,\\n[data-ea-publisher].loaded .ea-content a b,\\n[data-ea-type].loaded .ea-content a strong,\\n[data-ea-type].loaded .ea-content a b {\\n  color: #088cdb;\\n}\\n[data-ea-publisher].loaded .ea-callout a:link,\\n[data-ea-type].loaded .ea-callout a:link {\\n  color: #6a6a6a;\\n}\\n[data-ea-publisher].loaded .ea-callout a:visited,\\n[data-ea-type].loaded .ea-callout a:visited {\\n  color: #6a6a6a;\\n}\\n[data-ea-publisher].loaded .ea-callout a:hover,\\n[data-ea-type].loaded .ea-callout a:hover {\\n  color: #505050;\\n}\\n[data-ea-publisher].loaded .ea-callout a:active,\\n[data-ea-type].loaded .ea-callout a:active {\\n  color: #505050;\\n}\\n[data-ea-publisher].loaded .ea-callout a strong,\\n[data-ea-publisher].loaded .ea-callout a b,\\n[data-ea-type].loaded .ea-callout a strong,\\n[data-ea-type].loaded .ea-callout a b {\\n  color: #088cdb;\\n}\\n[data-ea-publisher].loaded .ea-callout a,\\n[data-ea-type].loaded .ea-callout a {\\n  font-size: 0.8em;\\n}\\n[data-ea-publisher].loaded.dark .ea-content,\\n[data-ea-type].loaded.dark .ea-content {\\n  background: rgba(255, 255, 255, 0.05);\\n  color: rgb(220, 220, 220);\\n}\\n[data-ea-publisher].loaded.dark .ea-content a:link,\\n[data-ea-type].loaded.dark .ea-content a:link {\\n  color: rgb(220, 220, 220);\\n}\\n[data-ea-publisher].loaded.dark .ea-content a:visited,\\n[data-ea-type].loaded.dark .ea-content a:visited {\\n  color: rgb(220, 220, 220);\\n}\\n[data-ea-publisher].loaded.dark .ea-content a:hover,\\n[data-ea-type].loaded.dark .ea-content a:hover {\\n  color: #f6f6f6;\\n}\\n[data-ea-publisher].loaded.dark .ea-content a:active,\\n[data-ea-type].loaded.dark .ea-content a:active {\\n  color: #f6f6f6;\\n}\\n[data-ea-publisher].loaded.dark .ea-content a strong,\\n[data-ea-publisher].loaded.dark .ea-content a b,\\n[data-ea-type].loaded.dark .ea-content a strong,\\n[data-ea-type].loaded.dark .ea-content a b {\\n  color: #50baf9;\\n}\\n[data-ea-publisher].loaded.dark .ea-callout a:link,\\n[data-ea-type].loaded.dark .ea-callout a:link {\\n  color: #c3c3c3;\\n}\\n[data-ea-publisher].loaded.dark .ea-callout a:visited,\\n[data-ea-type].loaded.dark .ea-callout a:visited {\\n  color: #c3c3c3;\\n}\\n[data-ea-publisher].loaded.dark .ea-callout a:hover,\\n[data-ea-type].loaded.dark .ea-callout a:hover {\\n  color: gainsboro;\\n}\\n[data-ea-publisher].loaded.dark .ea-callout a:active,\\n[data-ea-type].loaded.dark .ea-callout a:active {\\n  color: gainsboro;\\n}\\n[data-ea-publisher].loaded.dark .ea-callout a strong,\\n[data-ea-publisher].loaded.dark .ea-callout a b,\\n[data-ea-type].loaded.dark .ea-callout a strong,\\n[data-ea-type].loaded.dark .ea-callout a b {\\n  color: #50baf9;\\n}\\n@media (prefers-color-scheme: dark) {\\n  [data-ea-publisher].loaded.adaptive .ea-content,\\n  [data-ea-type].loaded.adaptive .ea-content {\\n    background: rgba(255, 255, 255, 0.05);\\n    color: rgb(220, 220, 220);\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-content a:link,\\n  [data-ea-type].loaded.adaptive .ea-content a:link {\\n    color: rgb(220, 220, 220);\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-content a:visited,\\n  [data-ea-type].loaded.adaptive .ea-content a:visited {\\n    color: rgb(220, 220, 220);\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-content a:hover,\\n  [data-ea-type].loaded.adaptive .ea-content a:hover {\\n    color: #f6f6f6;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-content a:active,\\n  [data-ea-type].loaded.adaptive .ea-content a:active {\\n    color: #f6f6f6;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-content a strong,\\n  [data-ea-publisher].loaded.adaptive .ea-content a b,\\n  [data-ea-type].loaded.adaptive .ea-content a strong,\\n  [data-ea-type].loaded.adaptive .ea-content a b {\\n    color: #50baf9;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-callout a:link,\\n  [data-ea-type].loaded.adaptive .ea-callout a:link {\\n    color: #c3c3c3;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-callout a:visited,\\n  [data-ea-type].loaded.adaptive .ea-callout a:visited {\\n    color: #c3c3c3;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-callout a:hover,\\n  [data-ea-type].loaded.adaptive .ea-callout a:hover {\\n    color: gainsboro;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-callout a:active,\\n  [data-ea-type].loaded.adaptive .ea-callout a:active {\\n    color: gainsboro;\\n  }\\n  [data-ea-publisher].loaded.adaptive .ea-callout a strong,\\n  [data-ea-publisher].loaded.adaptive .ea-callout a b,\\n  [data-ea-type].loaded.adaptive .ea-callout a strong,\\n  [data-ea-type].loaded.adaptive .ea-callout a b {\\n    color: #50baf9;\\n  }\\n}\\n\\n[data-ea-publisher].loaded .ea-content,\\n[data-ea-type].loaded .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);\\n}\\n[data-ea-publisher].loaded.raised .ea-content,\\n[data-ea-type].loaded.raised .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);\\n}\\n[data-ea-publisher].loaded.bordered .ea-content,\\n[data-ea-type].loaded.bordered .ea-content {\\n  border: 1px solid rgba(0, 0, 0, 0.04);\\n  border-radius: 3px;\\n  box-shadow: none;\\n}\\n[data-ea-publisher].loaded.bordered.dark .ea-content,\\n[data-ea-type].loaded.bordered.dark .ea-content {\\n  border: 1px solid rgba(255, 255, 255, 0.07);\\n}\\n@media (prefers-color-scheme: dark) {\\n  [data-ea-publisher].loaded.bordered.adaptive .ea-content,\\n  [data-ea-type].loaded.bordered.adaptive .ea-content {\\n    border: 1px solid rgba(255, 255, 255, 0.07);\\n  }\\n}\\n[data-ea-publisher].loaded.flat .ea-content,\\n[data-ea-type].loaded.flat .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: none;\\n}\\n\\n[data-ea-type=image].loaded,\\n[data-ea-publisher]:not([data-ea-type]).loaded,\\n.ea-type-image {\\n  display: inline-block;\\n}\\n[data-ea-type=image].loaded .ea-content,\\n[data-ea-publisher]:not([data-ea-type]).loaded .ea-content,\\n.ea-type-image .ea-content {\\n  max-width: 180px;\\n  overflow: auto;\\n  text-align: center;\\n}\\n[data-ea-type=image].loaded .ea-content > a > img,\\n[data-ea-publisher]:not([data-ea-type]).loaded .ea-content > a > img,\\n.ea-type-image .ea-content > a > img {\\n  width: 120px;\\n  height: 90px;\\n  display: inline-block;\\n}\\n[data-ea-type=image].loaded .ea-content > .ea-text,\\n[data-ea-publisher]:not([data-ea-type]).loaded .ea-content > .ea-text,\\n.ea-type-image .ea-content > .ea-text {\\n  margin-top: 1em;\\n  font-size: 1em;\\n  text-align: center;\\n}\\n[data-ea-type=image].loaded .ea-callout,\\n[data-ea-publisher]:not([data-ea-type]).loaded .ea-callout,\\n.ea-type-image .ea-callout {\\n  max-width: 180px;\\n  margin: 0em 1em 1em 1em;\\n  padding-left: 1em;\\n  padding-right: 1em;\\n  font-style: italic;\\n  text-align: right;\\n}\\n[data-ea-type=image].loaded.horizontal .ea-content,\\n[data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-content,\\n.ea-type-image.horizontal .ea-content {\\n  max-width: 320px;\\n}\\n[data-ea-type=image].loaded.horizontal .ea-content > a > img,\\n[data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-content > a > img,\\n.ea-type-image.horizontal .ea-content > a > img {\\n  float: left;\\n  margin-right: 1em;\\n}\\n[data-ea-type=image].loaded.horizontal .ea-content .ea-text,\\n[data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-content .ea-text,\\n.ea-type-image.horizontal .ea-content .ea-text {\\n  margin-top: 0em;\\n  text-align: left;\\n  overflow: auto;\\n}\\n[data-ea-type=image].loaded.horizontal .ea-callout,\\n[data-ea-publisher]:not([data-ea-type]).loaded.horizontal .ea-callout,\\n.ea-type-image.horizontal .ea-callout {\\n  max-width: 320px;\\n  text-align: right;\\n}\\n\\n[data-ea-type=text].loaded,\\n.ea-type-text {\\n  font-size: 14px;\\n}\\n[data-ea-type=text].loaded .ea-content,\\n.ea-type-text .ea-content {\\n  text-align: left;\\n}\\n[data-ea-type=text].loaded .ea-callout,\\n.ea-type-text .ea-callout {\\n  margin: 0.5em 1em 1em 1em;\\n  padding-left: 1em;\\n  padding-right: 1em;\\n  text-align: right;\\n  font-style: italic;\\n}\\n\\n[data-ea-style=stickybox].loaded {\\n  position: fixed;\\n  bottom: 20px;\\n  right: 20px;\\n  z-index: 10;\\n}\\n[data-ea-style=stickybox].loaded .ea-type-image .ea-stickybox-hide {\\n  cursor: pointer;\\n  position: absolute;\\n  top: 0.75em;\\n  right: 0.75em;\\n  background-color: #fefefe;\\n  border: 1px solid #088cdb;\\n  border-radius: 50%;\\n  color: #088cdb;\\n  font-size: 1em;\\n  text-align: center;\\n  height: 1.5em;\\n  width: 1.5em;\\n  line-height: 1.5em;\\n}\\n@media (max-width: 1300px) {\\n  [data-ea-style=stickybox].loaded {\\n    position: static;\\n    bottom: 0;\\n    right: 0;\\n    margin: auto;\\n    text-align: center;\\n  }\\n  [data-ea-style=stickybox].loaded .ea-stickybox-hide {\\n    display: none;\\n  }\\n}\\n@media (min-width: 1301px) {\\n  [data-ea-style=stickybox].loaded .ea-type-image .ea-content {\\n    background: rgb(220, 220, 220);\\n  }\\n  [data-ea-style=stickybox].loaded.dark .ea-type-image .ea-content {\\n    background: rgb(80, 80, 80);\\n  }\\n}\\n@media (min-width: 1301px) and (prefers-color-scheme: dark) {\\n  [data-ea-style=stickybox].loaded.adaptive .ea-type-image .ea-content {\\n    background: rgb(80, 80, 80);\\n  }\\n}\\n\\n[data-ea-style=fixedfooter].loaded {\\n  position: fixed;\\n  bottom: 0;\\n  left: 0;\\n  z-index: 10;\\n  width: 100%;\\n  max-width: 100%;\\n}\\n[data-ea-style=fixedfooter].loaded .ea-type-text {\\n  width: 100%;\\n  max-width: 100%;\\n  display: flex;\\n  z-index: 10;\\n  background: rgb(220, 220, 220);\\n}\\n[data-ea-style=fixedfooter].loaded .ea-type-text .ea-content {\\n  border: 0px;\\n  border-radius: 3px;\\n  box-shadow: none;\\n}\\n[data-ea-style=fixedfooter].loaded .ea-type-text .ea-content {\\n  background-color: inherit;\\n  max-width: 100%;\\n  margin: 0;\\n  padding: 1em;\\n  flex: auto;\\n}\\n[data-ea-style=fixedfooter].loaded .ea-type-text .ea-callout {\\n  max-width: 100%;\\n  margin: 0;\\n  padding: 1em;\\n  flex: initial;\\n}\\n@media (max-width: 576px) {\\n  [data-ea-style=fixedfooter].loaded .ea-type-text .ea-callout {\\n    display: none;\\n  }\\n}\\n[data-ea-style=fixedfooter].loaded .ea-type-text .ea-fixedfooter-hide {\\n  cursor: pointer;\\n  color: rgb(80, 80, 80);\\n  padding: 1em;\\n  flex: initial;\\n  margin: auto 0;\\n}\\n[data-ea-style=fixedfooter].loaded .ea-type-text .ea-fixedfooter-hide span {\\n  padding: 0.25em;\\n  font-size: 0.8em;\\n  font-weight: bold;\\n  border: 0.15em solid rgb(80, 80, 80);\\n  border-radius: 0.5em;\\n  white-space: nowrap;\\n}\\n[data-ea-style=fixedfooter].loaded.dark .ea-type-text {\\n  background: rgb(80, 80, 80);\\n}\\n[data-ea-style=fixedfooter].loaded.dark .ea-type-text .ea-fixedfooter-hide span {\\n  color: rgb(220, 220, 220);\\n  border-color: rgb(220, 220, 220);\\n}\\n@media (prefers-color-scheme: dark) {\\n  [data-ea-style=fixedfooter].loaded.adaptive .ea-type-text {\\n    background: rgb(80, 80, 80);\\n  }\\n  [data-ea-style=fixedfooter].loaded.adaptive .ea-type-text .ea-fixedfooter-hide span {\\n    color: rgb(220, 220, 220);\\n    border-color: rgb(220, 220, 220);\\n  }\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack://ethicalads/./styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack://ethicalads/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://ethicalads/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/verge/verge.js":
/*!*************************************!*\
  !*** ./node_modules/verge/verge.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*!\r\n * verge 1.10.2+201705300050\r\n * http://npm.im/verge\r\n * MIT Ryan Van Etten\r\n */\r\n\r\n!function(root, name, make) {\n  if ( true && module['exports']) module['exports'] = make();\r\n  else root[name] = make();\r\n}(this, 'verge', function() {\r\n\r\n  var xports = {}\r\n    , win = typeof window != 'undefined' && window\r\n    , doc = typeof document != 'undefined' && document\r\n    , docElem = doc && doc.documentElement\r\n    , matchMedia = win['matchMedia'] || win['msMatchMedia']\r\n    , mq = matchMedia ? function(q) {\r\n        return !!matchMedia.call(win, q).matches;\r\n      } : function() {\r\n        return false;\r\n      }\r\n    , viewportW = xports['viewportW'] = function() {\r\n        var a = docElem['clientWidth'], b = win['innerWidth'];\r\n        return a < b ? b : a;\r\n      }\r\n    , viewportH = xports['viewportH'] = function() {\r\n        var a = docElem['clientHeight'], b = win['innerHeight'];\r\n        return a < b ? b : a;\r\n      };\r\n\n  /**\n   * Test if a media query is active. Like Modernizr.mq\r\n   * @since 1.6.0\r\n   * @return {boolean}\r\n   */\n  xports['mq'] = mq;\r\n\r\n  /**\n   * Normalized matchMedia\r\n   * @since 1.6.0\r\n   * @return {MediaQueryList|Object}\r\n   */\n  xports['matchMedia'] = matchMedia ? function() {\r\n    // matchMedia must be binded to window\r\n    return matchMedia.apply(win, arguments);\r\n  } : function() {\r\n    // Gracefully degrade to plain object\r\n    return {};\r\n  };\r\n\r\n  /**\r\n   * @since 1.8.0\r\n   * @return {{width:number, height:number}}\r\n   */\r\n  function viewport() {\r\n    return {'width':viewportW(), 'height':viewportH()};\r\n  }\r\n  xports['viewport'] = viewport;\r\n\n  /**\n   * Cross-browser window.scrollX\r\n   * @since 1.0.0\r\n   * @return {number}\r\n   */\r\n  xports['scrollX'] = function() {\r\n    return win.pageXOffset || docElem.scrollLeft;\n  };\r\n\r\n  /**\n   * Cross-browser window.scrollY\r\n   * @since 1.0.0\r\n   * @return {number}\r\n   */\r\n  xports['scrollY'] = function() {\r\n    return win.pageYOffset || docElem.scrollTop;\n  };\r\n\r\n  /**\r\n   * @param {{top:number, right:number, bottom:number, left:number}} coords\r\n   * @param {number=} cushion adjustment\r\n   * @return {Object}\r\n   */\r\n  function calibrate(coords, cushion) {\r\n    var o = {};\r\n    cushion = +cushion || 0;\r\n    o['width'] = (o['right'] = coords['right'] + cushion) - (o['left'] = coords['left'] - cushion);\r\n    o['height'] = (o['bottom'] = coords['bottom'] + cushion) - (o['top'] = coords['top'] - cushion);\r\n    return o;\r\n  }\r\n\r\n  /**\r\n   * Cross-browser element.getBoundingClientRect plus optional cushion.\r\n   * Coords are relative to the top-left corner of the viewport.\r\n   * @since 1.0.0\r\n   * @param {Element|Object} el element or stack (uses first item)\r\n   * @param {number=} cushion +/- pixel adjustment amount\r\n   * @return {Object|boolean}\r\n   */\r\n  function rectangle(el, cushion) {\r\n    el = el && !el.nodeType ? el[0] : el;\r\n    if (!el || 1 !== el.nodeType) return false;\r\n    return calibrate(el.getBoundingClientRect(), cushion);\r\n  }\r\n  xports['rectangle'] = rectangle;\r\n\r\n  /**\r\n   * Get the viewport aspect ratio (or the aspect ratio of an object or element)\r\n   * @since 1.7.0\r\n   * @param {(Element|Object)=} o optional object with width/height props or methods\r\n   * @return {number}\r\n   * @link http://w3.org/TR/css3-mediaqueries/#orientation\r\n   */\r\n  function aspect(o) {\r\n    o = null == o ? viewport() : 1 === o.nodeType ? rectangle(o) : o;\r\n    var h = o['height'], w = o['width'];\r\n    h = typeof h == 'function' ? h.call(o) : h;\r\n    w = typeof w == 'function' ? w.call(o) : w;\r\n    return w/h;\r\n  }\r\n  xports['aspect'] = aspect;\r\n\r\n  /**\r\n   * Test if an element is in the same x-axis section as the viewport.\r\n   * @since 1.0.0\r\n   * @param {Element|Object} el\r\n   * @param {number=} cushion\r\n   * @return {boolean}\r\n   */\r\n  xports['inX'] = function(el, cushion) {\r\n    var r = rectangle(el, cushion);\r\n    return !!r && r.right >= 0 && r.left <= viewportW();\r\n  };\r\n\r\n  /**\r\n   * Test if an element is in the same y-axis section as the viewport.\r\n   * @since 1.0.0\r\n   * @param {Element|Object} el\r\n   * @param {number=} cushion\r\n   * @return {boolean}\r\n   */\r\n  xports['inY'] = function(el, cushion) {\r\n    var r = rectangle(el, cushion);\r\n    return !!r && r.bottom >= 0 && r.top <= viewportH();\r\n  };\r\n\r\n  /**\r\n   * Test if an element is in the viewport.\r\n   * @since 1.0.0\r\n   * @param {Element|Object} el\r\n   * @param {number=} cushion\r\n   * @return {boolean}\r\n   */\r\n  xports['inViewport'] = function(el, cushion) {\r\n    // Equiv to `inX(el, cushion) && inY(el, cushion)` but just manually do both\n    // to avoid calling rectangle() twice. It gzips just as small like this.\r\n    var r = rectangle(el, cushion);\r\n    return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= viewportH() && r.left <= viewportW();\r\n  };\r\n\r\n  return xports;\r\n});\n\n\n//# sourceURL=webpack://ethicalads/./node_modules/verge/verge.js?");

/***/ }),

/***/ "./styles.scss":
/*!*********************!*\
  !*** ./styles.scss ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack://ethicalads/./styles.scss?");

/***/ })

/******/ });
});

/***/ }),

/***/ 593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(411)

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ 257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }

  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false,
      }
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    const sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>')
    const sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<')
    const sameSemVer = this.semver.version === comp.semver.version
    const differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=')
    const oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, options) &&
      (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<')
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>')

    return (
      sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan
    )
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(893)
const { re, t } = __webpack_require__(765)
const cmp = __webpack_require__(539)
const debug = __webpack_require__(225)
const SemVer = __webpack_require__(376)
const Range = __webpack_require__(902)


/***/ }),

/***/ 902:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.format()
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First, split based on boolean or ||
    this.raw = range
    this.set = range
      .split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0) {
        this.set = [first]
      } else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.format()
  }

  format () {
    this.range = this.set
      .map((comps) => {
        return comps.join(' ').trim()
      })
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    range = range.trim()

    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts = Object.keys(this.options).join(',')
    const memoKey = `parseRange:${memoOpts}:${range}`
    const cached = cache.get(memoKey)
    if (cached) {
      return cached
    }

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range)

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)

    // normalize spaces
    range = range.split(/\s+/).join(' ')

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    let rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))

    if (loose) {
      // in loose mode, throw out any that are not valid comparators
      rangeList = rangeList.filter(comp => {
        debug('loose invalid filter', comp, this.options)
        return !!comp.match(re[t.COMPARATORLOOSE])
      })
    }
    debug('range list', rangeList)

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const rangeMap = new Map()
    const comparators = rangeList.map(comp => new Comparator(comp, this.options))
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp]
      }
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has('')) {
      rangeMap.delete('')
    }

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}
module.exports = Range

const LRU = __webpack_require__(593)
const cache = new LRU({ max: 1000 })

const parseOptions = __webpack_require__(893)
const Comparator = __webpack_require__(257)
const debug = __webpack_require__(225)
const SemVer = __webpack_require__(376)
const {
  re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace,
} = __webpack_require__(765)

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options) =>
  comp.trim().split(/\s+/).map((c) => {
    return replaceTilde(c, options)
  }).join(' ')

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options) =>
  comp.trim().split(/\s+/).map((c) => {
    return replaceCaret(c, options)
  }).join(' ')

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map((c) => {
    return replaceXRange(c, options)
  }).join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<') {
        pr = '-0'
      }

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp.trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return (`${from} ${to}`).trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ 376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(225)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(295)
const { re, t } = __webpack_require__(765)

const parseOptions = __webpack_require__(893)
const { compareIdentifiers } = __webpack_require__(742)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier)
        this.inc('pre', identifier)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier)
        }
        this.inc('pre', identifier)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0]
            }
          } else {
            this.prerelease = [identifier, 0]
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format()
    this.raw = this.version
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const eq = __webpack_require__(718)
const neq = __webpack_require__(194)
const gt = __webpack_require__(312)
const gte = __webpack_require__(903)
const lt = __webpack_require__(544)
const lte = __webpack_require__(56)

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a === b

    case '!==':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ 269:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(376)
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ 718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(269)
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ 312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(269)
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ 903:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(269)
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ 544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(269)
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(269)
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ 194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(269)
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ 295:
/***/ ((module) => {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

module.exports = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH,
  MAX_SAFE_INTEGER,
  MAX_SAFE_COMPONENT_LENGTH,
}


/***/ }),

/***/ 225:
/***/ ((module) => {

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 742:
/***/ ((module) => {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
}


/***/ }),

/***/ 893:
/***/ ((module) => {

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl']
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((o, k) => {
    o[k] = true
    return o
  }, {})
module.exports = parseOptions


/***/ }),

/***/ 765:
/***/ ((module, exports, __webpack_require__) => {

const { MAX_SAFE_COMPONENT_LENGTH } = __webpack_require__(295)
const debug = __webpack_require__(225)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const createToken = (name, value, isGlobal) => {
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*')

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+')

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


/***/ }),

/***/ 775:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(376)
const Range = __webpack_require__(902)

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ 602:
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(602)(Yallist)
} catch (er) {}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/readthedocs-config.js
/**
 * Load Read the Docs configuration from API endpoint.
 *
 */
function getReadTheDocsConfig() {
    return fetch("/_/readthedocs-config.json", {method: 'GET'})
    .then(response => {
        if (!response.ok) {
            console.debug("Error parsing configuration data");
            return undefined;
        }
        return response.json();
    });
}

;// CONCATENATED MODULE: ./src/external-version-warning.js
/**
 * Inject a warning informing the documentation comes from an external version (e.g. pull request)
 *
 */
function injectExternalVersionWarning(config) {
    // TODO: make all these banners (injected HTML) templates that users can override with their own.
    // This way, we allow customization of the look&feel without compromising the logic.

    return new Promise((resolve, reject) => {
        let admonition = `
<div class="admonition warning">
  <p class="admonition-title">Warning</p>
  <p>
    This page
    <a class="reference external" href="${ window.location.protocol }//${ config.domains.dashboard }/projects/${ config.project.slug }/builds/${ config.build.id }/">was created </a>
    from a pull request
    (<a class="reference external" href="${ config.project.repository_url }/pull/${ config.version.slug }">#${ config.version.slug }</a>).
  </p>
</div>
`;

        // Allow to override the admonition template
        // if (config.features.banner.external.template) {
        //     admonition = config.features.banner.external.template;
        // }

        let main = document.querySelector('[role=main]') || document.querySelector('#main');
        let node = document.createElement("div");
        node.innerHTML = admonition;
        main.insertBefore(node, main.firstChild);
    });
}

// EXTERNAL MODULE: ./node_modules/semver/ranges/max-satisfying.js
var max_satisfying = __webpack_require__(775);
var max_satisfying_default = /*#__PURE__*/__webpack_require__.n(max_satisfying);
;// CONCATENATED MODULE: ./src/non-latest-version-warning.js
// We cannot use named imports for this module
// https://stackoverflow.com/a/64553998/2187091


/**
 * Inject a warning informing the documentation is not the latest.
 *
 */
function injectNonLatestVersionWarning(config) {
    const highest = max_satisfying_default()(config.features.non_latest_version_warning.versions, '0.0.0');

    if (highest && highest !== config.version.slug) {
        let admonition = `
<div class="admonition warning">
  <p class="admonition-title">Warning</p>
  <p>
    This page documents version
    <a class="reference" href="${ window.location.protocol }//${ window.location.hostname }/${ config.project.language }/${ config.version.slug }/">${ config.version.slug }</a>.
    The latest version is
    <a class="reference" href="${ window.location.protocol }//${ window.location.hostname }/${ config.project.language }/${ config.version.slug }/">${ config.version.slug }</a>.
  </p>
</div>
`;

        // Borrowed and adapted from:
        // https://github.com/readthedocs/readthedocs.org/blob/7ce98a4d4f34a4c1845dc6e3e0e5112af7c39b0c/readthedocs/core/static-src/core/js/doc-embed/version-compare.js#L1
        let main = document.querySelector(config.features.non_latest_version_warning.query_selector);
        let node = document.createElement("div");
        node.innerHTML = admonition;
        main.insertBefore(node, main.firstChild);
    }
}

// EXTERNAL MODULE: ./src/flyout.css
var src_flyout = __webpack_require__(967);
;// CONCATENATED MODULE: ./src/flyout.js


/**
   Injects the footer into the page

   There are 2 main cases:
   * EXPLICIT_FLYOUT_PLACEMENT_SELECTOR is defined, inject it there
   * `div.rst-other-versions` is defined (theme that looks like Read the Docs)
   * All other pages just get it appended to the <body>
*/
function injectFlyout(config) {
    // Inject our styles for the flyout
    document.adoptedStyleSheets.push(src_flyout/* default */.Z);

    const languageTemplate = (translation) =>
          `
<dd class="rtd-current-item">
  <a href="${translation.name}">${translation.code}</a>
</dd>
`;
    const versionTemplate = (version) =>
          `
<dd>
  <a href="${version.url}">${version.slug}</a>
</dd>
`;
    const downloadTemplate = (download) =>
          `
<dd>
  <a href="${download.url}">${download.slug}</a>
</dd>
`;

    function get_languages(config) {
        if (config.features.flyout.translations.length === 0) {
            return "";
        }

        let result = [
            // TODO: how do we handle translations here?
            `<dl><dt>Languages</dt>`
        ];
        for (const language of config.features.flyout.translations) {
            result.push(languageTemplate(language));
        }
        result.push(`</dl>`);
        return result.join("");
    }

    function get_versions(config) {
        if (config.features.flyout.versions.length === 0) {
            return "";
        }

        let result = [
            // TODO: how do we handle translations here?
            `<dl><dt>Versions</dt>`
        ];
        for (const version of config.features.flyout.versions) {
            result.push(versionTemplate(version));
        }
        result.push(`</dl>`);
        return result.join("");
    }

    function get_downloads(config) {
        if (config.features.flyout.downloads.length === 0) {
            return "";
        }

        let result = [
            // TODO: how do we handle translations here?
            `<dl><dt>Downloads</dt>`
        ];
        for (const download of config.features.flyout.downloads) {
            result.push(downloadTemplate(download));
        }
        result.push(`</dl>`);
        return result.join("");
    }

    const template = `
<div class="injected">
   <div class="rst-versions rst-badge shift-down" data-toggle="rst-versions">
      <span class="rst-current-version" data-toggle="rst-current-version">
      <span class="fa fa-book">&nbsp;</span>
      v: ${config.version.slug}
      <span class="fa fa-caret-down"></span>
      </span>
      <div class="rst-other-versions">
         ${get_languages(config)}

         ${get_versions(config)}

         ${get_downloads(config)}

         <dl>
            <dt>On Read the Docs</dt>
            <dd>
               <a href="//${config.domains.dashboard}/projects/${config.project.slug}/">Project Home</a>
            </dd>
            <dd>
               <a href="//${config.domains.dashboard}/projects/${config.project.slug}/builds/">Builds</a>
            </dd>
            <dd>
               <a href="//${config.domains.dashboard}/projects/${config.project.slug}/downloads/">Downloads</a>
            </dd>
         </dl>

         <dl>
            <dt>On GitHub</dt>
            <dd>
               <a href="${config.features.flyout.vcs.url}/${config.features.flyout.vcs.username}/${config.features.flyout.vcs.repository}/blob/${config.features.flyout.vcs.branch}/${config.features.flyout.vcs.filepath}">View</a>
            </dd>
            <dd>
               <a href="${config.features.flyout.vcs.url}/${config.features.flyout.vcs.username}/${config.features.flyout.vcs.repository}/edit/${config.features.flyout.vcs.branch}/${config.features.flyout.vcs.filepath}">Edit</a>
            </dd>
         </dl>

         <dl>
            <dt>Search</dt>
            <dd>
               <div style="padding: 6px;">
                  <form id="flyout-search-form" class="wy-form" target="_blank" action="//${config.domains.dashboard}/projects/${config.project.slug}/search/" method="get">
                     <input type="text" name="q" aria-label="Search docs" placeholder="Search docs">
                  </form>
               </div>
            </dd>
         </dl>

         <hr>
         <small>
         <span>Hosted by <a href="${config.domains.dashboard}">Read the Docs</a></span>
         <span> &middot; </span>
         <a href="https://docs.readthedocs.io/page/privacy-policy.html">Privacy Policy</a>
         </small>
      </div>
   </div>
</div>
`;

    // Default placement for the flyout
    const EXPLICIT_FLYOUT_PLACEMENT_SELECTOR = "#readthedocs-embed-flyout";
    const placements = [
        EXPLICIT_FLYOUT_PLACEMENT_SELECTOR,
        // NOTE: avoid integrating it with Sphinx themes because we need more CSS work for this
        // "div.rst-other-versions",
    ];

    for (const query_selector of placements) {
        let placement = document.querySelector(query_selector);
        if (placement !== null) {
            // TODO: does it make sense to implement a new flyout endpoint as suggested in
            // https://github.com/readthedocs/readthedocs.org/pull/8052
            placement.innerHTML = template;
            return;
        }
    }

    document.body.insertAdjacentHTML("beforeend", template);

    // Attach event to show/hide the flyout on click
    const flyout = document.querySelector("[data-toggle='rst-versions']");
    if (flyout != null) {
        flyout.addEventListener('click', function () {
            flyout.classList.toggle("shift-up");
        });
    };
};

/**
   Track clicks on flyout.
*/
function trackFlyoutEvents(config) {
    // TODO: `div.injected` is not the best selector.
    // We should probably change it to use `EXPLICIT_FLYOUT_PLACEMENT_SELECTOR`
    const flyout = document.querySelector("[data-toggle='rst-current-version']");

    if (flyout != null) {
        flyout.addEventListener('click', function () {
            const state = document.querySelector("[data-toggle='rst-versions']").classList.contains("shift-up") ? 'was_open' : 'was_closed';

            // Only report back if analytics is enabled
            if (typeof window.ga !== 'undefined') {
                window.ga('rtfd.send', 'event', 'Flyout', 'Click', state);
            };
        });
    };
}

;// CONCATENATED MODULE: ./src/analytics.js
/**
  Register page view on Read the Docs analytics feature.
  https://docs.readthedocs.io/en/stable/reference/analytics.html
*/
function registerPageView(config) {
    const params = {
        project: config.project.slug,
        version: config.version.slug,
        absolute_uri: window.location.href,
    };

    const url = "/_" + '/api/v2/analytics/?' + new URLSearchParams(params).toString();
    fetch(url, {method: 'GET', cache: 'no-store'})
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
        })
        .catch(error => {
            console.error('Error registering page view');
        });
};

/**
  For more details on analytics at Read the Docs, please see:
  https://docs.readthedocs.io/en/stable/advertising/advertising-details.html#analytics
*/
function injectAnalytics(config) {
    // Skip analytics for users with Do Not Track enabled
    if (navigator.doNotTrack === "1") {
        console.debug('Respecting DNT with respect to analytics...');
    } else {
        if (config.readthedocs.analytics.code) {
            (function () {
                // New Google Site Tag (gtag.js) tagging/analytics framework
                // https://developers.google.com/gtagjs
                let script = document.createElement("script");
                script.src = "https://www.googletagmanager.com/gtag/js?id=" + config.readthedocs.analytics.code;
                script.type = "text/javascript";
                script.async = true;
                document.getElementsByTagName("head")[0].appendChild(script);
            }());

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Setup the Read the Docs global analytics code and send a pageview
            gtag('config', config.readthedocs.analytics.code, {
                'anonymize_ip': true,
                'cookie_expires': 0,  // Session cookie (non-persistent)
                'dimension1': config.project.slug,
                'dimension2': config.version.slug,
                'dimension3': config.project.language,
                'dimension5': config.project.programming_language,
                'groups': 'rtfd'
            });

            // Setup the project (user) analytics code and send a pageview
            if (config.features.analytics.code) {
                gtag('config', config.features.analytics.code, {
                    'anonymize_ip': true,
                    'cookie_expires': 0,  // Session cookie (non-persistent)
                });
            }
        }
    }
}

// EXTERNAL MODULE: ./node_modules/ethical-ad-client/dist/ethicalads.js
var ethicalads = __webpack_require__(245);
;// CONCATENATED MODULE: ./src/sponsorship.js
// FIXME: how should we remove the `dist/` from this path?
// NOTE: it requires this PR to work: https://github.com/readthedocs/ethical-ad-client/pull/148


const EXPLICIT_PLACEMENT_SELECTOR = "[data-ea-publisher]";

function createAdPlacement() {
    let placement;

    placement = document.querySelector(EXPLICIT_PLACEMENT_SELECTOR);
    if (placement) {
        placement.setAttribute("data-ea-publisher", "readthedocs");
        placement.setAttribute("data-ea-manual", "true");
        if (placement.getAttribute("data-ea-type") !== "image" && placement.getAttribute("data-ea-type") !== "text") {
            placement.setAttribute("data-ea-type", "readthedocs-sidebar");
        }
    } else {
        // Inject our own floating element
        placement = document.createElement("div");
        placement.setAttribute("data-ea-publisher", "readthedocs");
        placement.setAttribute("data-ea-type", "image");
        // placement.setAttribute("data-ea-manual", "true");
        placement.setAttribute("data-ea-style", "stickybox");
        placement.classList.add("raised");

        // TODO: find the right last resourse to append (probably not `document.body`)
        let main = document.querySelector("[role=main]") || document.body;
        main.insertBefore(placement, main.lastChild);
        console.log("EthicalAd placement injected.");
    }
    return placement;
};

function injectEthicalAd(config) {
    createAdPlacement();
    // FIXME: the function `ethicalads.load_placements()` is called automatically when the module is imported,
    // but we want to call it manually because we need to inject our `div` first.
    (0,ethicalads.load_placements)();
};

;// CONCATENATED MODULE: ./node_modules/readthedocs-search/dist/readthedocs-search.js
/******/ var __webpack_modules__ = ({

/***/ 968:
/***/ ((module, __webpack_exports__, __nested_webpack_require_87__) => {

/* harmony export */ __nested_webpack_require_87__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_87__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_87__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_87__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_87__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_87__(667);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_87__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __nested_webpack_require_87__(896), __nested_webpack_require_87__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".search__outer__wrapper {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 700;\n}\n\n/* Backdrop */\n\n.search__backdrop {\n    /* Positioning */\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 500;\n\n    /* Display and box model */\n    width: 100%;\n    height: 100%;\n    display: none;\n\n    /* Other */\n    background-color: rgba(0, 0, 0, 0.502);\n}\n\n.search__outer {\n    /* Positioning */\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 100000;\n\n    /* Display and box model */\n    height: 80%;\n    width: 80%;\n    max-height: 1000px;\n    max-width: 1500px;\n    padding: 10px;\n    overflow-y: scroll;\n\n    /* Other */\n    border: 1px solid #e0e0e0;\n    line-height: 1.875;\n    background-color: #fcfcfc;\n    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.09);\n    text-align: left;\n}\n\n/* Custom scrollbar */\n\n.search__outer::-webkit-scrollbar-track {\n    border-radius: 10px;\n    background-color: #fcfcfc;\n}\n\n.search__outer::-webkit-scrollbar {\n    width: 7px;\n    height: 7px;\n    background-color: #fcfcfc;\n}\n\n.search__outer::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background-color: #8f8f8f;\n}\n\n/* Cross icon on top-right corner */\n\n.search__cross__img {\n    width: 15px;\n    height: 15px;\n    margin: 12px;\n}\n\n.search__cross {\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.search__cross:hover {\n    cursor: pointer;\n}\n\n/* Input field on search modal */\n\n.search__outer__input {\n    /* Display and box model */\n    width: 90%;\n    height: 30px;\n    font-size: 19px;\n    outline: none;\n    box-sizing: border-box;\n\n    /* Other */\n    background-color: #fcfcfc;\n    border: none;\n    border-bottom: 1px solid #757575;\n\n    /* search icon */\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-repeat: no-repeat;\n    background-position: left;\n    background-size: 15px 15px;\n    padding-left: 25px;\n}\n\n.search__outer__input:focus {\n    outline: none;\n}\n\n/* For material UI style underline on input field */\n\n.search__outer .bar {\n    position: relative;\n    display: block;\n    width: 90%;\n    margin-bottom: 15px;\n}\n\n.search__outer .bar:before,\n.search__outer .bar:after {\n    content: \"\";\n    height: 2px;\n    width: 0;\n    bottom: 1px;\n    position: absolute;\n    background: #5264ae;\n    transition: 0.2s ease all;\n}\n\n.search__outer .bar:before {\n    left: 50%;\n}\n\n.search__outer .bar:after {\n    right: 50%;\n}\n\n.search__outer__input:focus ~ .bar:before,\n.search__outer__input:focus ~ .bar:after {\n    width: 50%;\n}\n\n/* Search result */\n\n.search__result__single {\n    margin-top: 10px;\n    padding: 0px 10px;\n    border-bottom: 1px solid #e6e6e6;\n}\n\n.search__result__box .active {\n    background-color: rgb(245, 245, 245);\n}\n\n.search__error__box {\n    color: black;\n    min-width: 300px;\n    font-weight: 700;\n}\n\n.outer_div_page_results {\n    margin: 5px 0px;\n    overflow: auto;\n    padding: 3px 5px;\n}\n\n.search__result__single a {\n    text-decoration: none;\n    cursor: pointer;\n}\n\n/* Title of each search result */\n\n.search__result__title {\n    /* Display and box model */\n    display: inline-block;\n    font-weight: 500;\n    margin-bottom: 15px;\n    margin-top: 0;\n    font-size: 15px;\n\n    /* Other */\n    color: #6ea0ec;\n    border-bottom: 1px solid #6ea0ec;\n}\n\n.search__result__subheading {\n    color: black;\n    font-weight: 700;\n    float: left;\n    width: 20%;\n    font-size: 15px;\n    margin-right: 10px;\n    word-break: break-all;\n    overflow-x: hidden;\n}\n\n.search__result__content {\n    margin: 0;\n    text-decoration: none;\n    color: black;\n    font-size: 15px;\n    display: block;\n    margin-bottom: 5px;\n    margin-bottom: 0;\n    line-height: inherit;\n    float: right;\n    width: calc(80% - 15px);\n    text-align: left;\n}\n\n/* Highlighting of matched results */\n\n.search__outer span {\n    font-style: normal;\n}\n\n.search__outer .search__result__title span {\n    background-color: #e5f6ff;\n    padding-bottom: 3px;\n    border-bottom-color: black;\n}\n\n.search__outer .search__result__content span {\n    background-color: #e5f6ff;\n    border-bottom: 1px solid black;\n}\n\n.search__result__subheading span {\n    border-bottom: 1px solid black;\n}\n\n.outer_div_page_results:hover {\n    background-color: rgb(245, 245, 245);\n}\n\n.br-for-hits {\n    display: block;\n    content: \"\";\n    margin-top: 10px;\n}\n\n.rtd_ui_search_subtitle {\n    all: unset;\n    color: inherit;\n    font-size: 85%;\n}\n\n.rtd__search__credits {\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: calc(-80% - 20px);\n    width: 80%;\n    max-width: 1500px;\n    height: 30px;\n    overflow: hidden;\n    background: #eee;\n    z-index: 100000;\n    border: 1px solid #eee;\n    padding: 5px 10px;\n    text-align: center;\n    color: black;\n}\n\n.rtd__search__credits a {\n    color: black;\n    text-decoration: underline;\n}\n\n.search__domain_role_name {\n    font-size: 80%;\n    letter-spacing: 1px;\n}\n\n@media (max-width: 670px) {\n    .rtd__search__credits {\n        height: 50px;\n        bottom: calc(-80% - 40px);\n        overflow: hidden;\n    }\n}\n\n@media (min-height: 1250px) {\n    .rtd__search__credits {\n        bottom: calc(-1000px - 30px);\n    }\n}\n\n@media (max-width: 630px) {\n    .search__result__subheading {\n        float: none;\n        width: 90%;\n    }\n\n    .search__result__content {\n        float: none;\n        width: 90%;\n    }\n}\n\n@keyframes fade-in {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n", ""]);
// Exports
var ___CSS_LOADER_STYLE_SHEET___ = new CSSStyleSheet();
___CSS_LOADER_STYLE_SHEET___.replaceSync(___CSS_LOADER_EXPORT___.toString());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_STYLE_SHEET___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 667:
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 896:
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDUxIDQ1MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUxIDQ1MTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQ0Ny4wNSw0MjhsLTEwOS42LTEwOS42YzI5LjQtMzMuOCw0Ny4yLTc3LjksNDcuMi0xMjYuMUMzODQuNjUsODYuMiwyOTguMzUsMCwxOTIuMzUsMEM4Ni4yNSwwLDAuMDUsODYuMywwLjA1LDE5Mi4zDQoJCXM4Ni4zLDE5Mi4zLDE5Mi4zLDE5Mi4zYzQ4LjIsMCw5Mi4zLTE3LjgsMTI2LjEtNDcuMkw0MjguMDUsNDQ3YzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNA0KCQlDNDUyLjI1LDQ0MS44LDQ1Mi4yNSw0MzMuMiw0NDcuMDUsNDI4eiBNMjYuOTUsMTkyLjNjMC05MS4yLDc0LjItMTY1LjMsMTY1LjMtMTY1LjNjOTEuMiwwLDE2NS4zLDc0LjIsMTY1LjMsMTY1LjMNCgkJcy03NC4xLDE2NS40LTE2NS4zLDE2NS40QzEwMS4xNSwzNTcuNywyNi45NSwyODMuNSwyNi45NSwxOTIuM3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K";

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nested_webpack_require_12626__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_12626__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __nested_webpack_require_12626__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_12626__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__nested_webpack_require_12626__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nested_webpack_require_12626__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nested_webpack_require_12626__.o(definition, key) && !__nested_webpack_require_12626__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nested_webpack_require_12626__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	__nested_webpack_require_12626__.b = document.baseURI || self.location.href;
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		773: 0
/******/ 	};
/******/ 	
/******/ 	// no chunk on demand loading
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	// no on chunks loaded
/******/ 	
/******/ 	// no jsonp function
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony export */ __nested_webpack_require_12626__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ initializeSearchAsYouType)
/* harmony export */ });
/* harmony import */ var _css_rtd_sphinx_search_css__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_12626__(968);


const MAX_SUGGESTIONS = 50;
const MAX_SECTION_RESULTS = 3;
const MAX_SUBSTRING_LIMIT = 100;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;
const RTD_SEARCH_PARAMETER  = "rtd_search";


function initializeSearchAsYouType(config) {
    // Inject our styles for the search-as-you-type
    document.adoptedStyleSheets.push(_css_rtd_sphinx_search_css__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

    const project = config.project.slug;
    const version = config.version.slug;
    const api_host = '/_';

    let initialHtml = generateAndReturnInitialHtml();
    document.body.appendChild(initialHtml);

    let search_outer_wrapper = document.querySelector(
        ".search__outer__wrapper"
    );
    let search_outer_input = document.querySelector(
        ".search__outer__input"
    );
    let cross_icon = document.querySelector(".search__cross");

    // this stores the current request.
    let current_request = null;

    let search_bar = getInputField();
    search_bar.addEventListener("focus", e => {
        showSearchModal();
    });

    search_outer_input.addEventListener("input", e => {
        let search_query = getSearchTerm();
        if (search_query.length > 0) {
            if (current_request !== null) {
                // cancel previous ajax request.
                current_request.cancel();
            }
            const search_endpoint = api_host + "/api/v2/search/";
            const search_params = {
                q: search_query,
                project: project,
                version: version,
            };
            current_request = fetchAndGenerateResults(search_endpoint, search_params, project);
            current_request();
        } else {
            // if the last request returns the results,
            // the suggestions list is generated even if there
            // is no query. To prevent that, this function
            // is debounced here.
            let func = () => {
                removeResults();
                updateUrl();
            };
            debounce(func, CLEAR_RESULTS_DELAY)();
            updateUrl();
        }
    });

    search_outer_input.addEventListener("keydown", e => {
        // if "ArrowDown is pressed"
        if (e.keyCode === 40) {
            e.preventDefault();
            selectNextResult(true);
        }

        // if "ArrowUp" is pressed.
        if (e.keyCode === 38) {
            e.preventDefault();
            selectNextResult(false);
        }

        // if "Enter" key is pressed.
        if (e.keyCode === 13) {
            e.preventDefault();
            const current_item = document.querySelector(
                ".outer_div_page_results.active"
            );
            // if an item is selected,
            // then redirect to its link
            if (current_item !== null) {
                const link = current_item.parentElement["href"];
                window.location.href = link;
            }
        }
    });

    search_outer_wrapper.addEventListener("click", e => {
        // HACK: only close the search modal if the
        // element clicked has <body> as the parent Node.
        // This is done so that search modal only gets closed
        // if the user clicks on the backdrop area.
        if (e.target.parentNode === document.body) {
            removeSearchModal();
        }
    });

    // close the search modal if clicked on cross icon.
    cross_icon.addEventListener("click", e => {
        removeSearchModal();
    });

    // close the search modal if the user pressed
    // Escape button
    document.addEventListener("keydown", e => {
        if (e.keyCode === 27) {
            removeSearchModal();
        }
    });

    // open search modal if "forward slash" button is pressed
    document.addEventListener("keydown", e => {
        if (e.keyCode === 191 && !isModalVisible()) {
            // prevent opening "Quick Find" in Firefox
            e.preventDefault();
            showSearchModal();
        }
    });

    // if "rtd_search" is present in URL parameters,
    // then open the search modal and show the results
    // for the value of "rtd_search"
    const url_params = new URLSearchParams(document.location.search);
    const query = url_params.get(RTD_SEARCH_PARAMETER);
    if (query !== null) {
        showSearchModal(query);
        search_outer_input.value = query;

        let event = document.createEvent("Event");
        event.initEvent("input", true, true);
        search_outer_input.dispatchEvent(event);
    }
};

/**
 * Debounce the function.
 * Usage::
 *
 *    let func = debounce(() => console.log("Hello World"), 3000);
 *
 *    // calling the func
 *    func();
 *
 *    //cancelling the execution of the func (if not executed)
 *    func.cancel();
 *
 * @param {Function} func function to be debounced
 * @param {Number} wait time to wait before running func (in miliseconds)
 * @return {Function} debounced function
 */
const debounce = (func, wait) => {
    let timeout;

    let debounced = function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};


/**
  * Build a section with its matching results.
  *
  * A section has the form:
  *
  *   <a href="{link}">
  *     <div class="outer_div_page_results" id="{id}">
  *       <span class="search__result__subheading">
  *         {title}
  *       </span>
  *       <p class="search__result__content">
  *         {contents[0]}
  *       </p>
  *       <p class="search__result__content">
  *         {contents[1]}
  *       </p>
  *       ...
  *     </div>
  *   </a>
  *
  * @param {String} id.
  * @param {String} title.
  * @param {String} link.
  * @param {Array} contents.
  */
const buildSection = function (id, title, link, contents) {
    let span_element = createDomNode("span", {class: "search__result__subheading"});
    span_element.innerHTML = title;

    let div_element = createDomNode("div", {class: "outer_div_page_results", id: id});
    div_element.appendChild(span_element);

    for (var i = 0; i < contents.length; i += 1) {
        let p_element = createDomNode("p", {class: "search__result__content"});
        p_element.innerHTML = contents[i];
        div_element.appendChild(p_element);
    }

    let section = createDomNode("a", {href: link});
    section.appendChild(div_element);
    return section;
};


/**
 * Adds/removes "rtd_search" url parameter to the url.
 */
const updateUrl = () => {
    let parsed_url = new URL(window.location.href);
    let search_query = getSearchTerm();
    // search_query should not be an empty string.
    if (search_query.length > 0) {
        parsed_url.searchParams.set(RTD_SEARCH_PARAMETER, search_query);
    } else {
        parsed_url.searchParams.delete(RTD_SEARCH_PARAMETER);
    }
    // Update url.
    window.history.pushState({}, null, parsed_url.toString());
};


/*
 * Keeps in sync the original search bar with the input from the modal.
 */
const updateSearchBar = () => {
  let search_bar = getInputField();
  search_bar.value = getSearchTerm();
};


/*
 * Returns true if the modal window is visible.
 */
const isModalVisible = () => {
  let modal = document.querySelector(".search__outer__wrapper");
  if (modal !== null && modal.style !== null && modal.style.display !== null) {
    return modal.style.display === 'block';
  }
  return false;
};


/**
 * Create and return DOM nodes
 * with passed attributes.
 *
 * @param {String} nodeName name of the node
 * @param {Object} attributes obj of attributes to be assigned to the node
 * @return {Object} dom node with attributes
 */
const createDomNode = (nodeName, attributes) => {
    let node = document.createElement(nodeName);
    if (attributes !== null) {
        for (let attr in attributes) {
            node.setAttribute(attr, attributes[attr]);
        }
    }
    return node;
};

/**
 * Checks if data type is "string" or not
 *
 * @param {*} data data whose data-type is to be checked
 * @return {Boolean} 'true' if type is "string" and length is > 0
 */
const _is_string = str => {
    if (typeof str === "string" && str.length > 0) {
        return true;
    } else {
        return false;
    }
};


/**
 * Generate and return html structure
 * for a page section result.
 *
 * @param {Object} sectionData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 * @param {Number} id to be used in for this section
 */
const get_section_html = (sectionData, page_link, id) => {
    let section_subheading = sectionData.title;
    let highlights = sectionData.highlights;
    if (highlights.title.length) {
        section_subheading = highlights.title[0];
    }

    let section_content = [
        sectionData.content.substring(0, MAX_SUBSTRING_LIMIT) + " ..."
    ];

    if (highlights.content.length) {
        let highlight_content = highlights.content;
        section_content = [];
        for (
            let j = 0;
            j < highlight_content.length && j < MAX_SECTION_RESULTS;
            ++j
        ) {
            section_content.push("... " + highlight_content[j] + " ...");
        }
    }

    let section_link = `${page_link}#${sectionData.id}`;
    let section_id = "hit__" + id;
    return buildSection(section_id, section_subheading, section_link, section_content);
};

/**
 * Generate and return html structure
 * for a sphinx domain result.
 *
 * @param {Object} domainData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 * @param {Number} id to be used in for this section
 */
const get_domain_html = (domainData, page_link, id) => {
    let domain_link = `${page_link}#${domainData.id}`;
    let domain_role_name = domainData.role;
    let domain_name = domainData.name;
    let domain_content =
        domainData.content.substr(0, MAX_SUBSTRING_LIMIT) + " ...";

    let highlights = domainData.highlights;
    if (highlights.name.length) {
        domain_name = highlights.name[0];
    }
    if (highlights.content.length) {
        domain_content = highlights.content[0];
    }

    let domain_id = "hit__" + id;

    let div_role_name = createDomNode("div", {class: "search__domain_role_name"});
    div_role_name.innerText = `[${domain_role_name}]`;
    domain_name += div_role_name.outerHTML;

    return buildSection(
        domain_id,
        domain_name,
        domain_link,
        [domain_content]
    );
};


/**
 * Generate search results for a single page.
 *
 * This has the form:
 *   <div>
 *     <a href="{link}">
 *       <h2 class="search__result__title">
 *         {title}
 *         <small class="rtd_ui_search_subtitle">{subtitle}</small>
 *         <br/>
 *       </h2>
 *     </a>
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *     <br class="br-for-hits" />
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *     <br class="br-for-hits" />
 *   </div>
 *
 * @param {Object} resultData search results of a page
 * @param {String} projectName
 * @param {Number} id from the last section
 * @return {Object} a <div> node with the results of a single page
 */
const generateSingleResult = (resultData, projectName, id) => {
    let page_link = resultData.path;
    let page_title = resultData.title;
    let highlights = resultData.highlights;

    if (highlights.title.length) {
        page_title = highlights.title[0];
    }

    let h2_element = createDomNode("h2", {class: "search__result__title"});
    h2_element.innerHTML = page_title;

    // If the result is not from the same project,
    // then it's from a subproject.
    if (projectName !== resultData.project) {
        let subtitle = createDomNode("small", {class: "rtd_ui_search_subtitle"});
        subtitle.innerText = `(from project ${resultData.project})`;
        h2_element.appendChild(subtitle);
    }
    h2_element.appendChild(createDomNode("br"));

    let a_element = createDomNode("a", {href: page_link});
    a_element.appendChild(h2_element);

    let content = createDomNode("div");
    content.appendChild(a_element);

    let separator = createDomNode("br", {class: "br-for-hits"});
    for (let i = 0; i < resultData.blocks.length; ++i) {
        let block = resultData.blocks[i];
        let section = null;
        id += 1;
        if (block.type === "section") {
            section = get_section_html(
                block,
                page_link,
                id,
            );
        } else if (block.type === "domain") {
            section = get_domain_html(
                block,
                page_link,
                id,
            );
        }

        if (section !== null) {
          content.appendChild(section);
          content.appendChild(separator);
        }
    }
    return content;
};

/**
 * Generate search suggestions list.
 *
 * @param {Object} data response data from the search backend
 * @param {String} projectName name (slug) of the project
 * @return {Object} a <div> node with class "search__result__box" with results
 */
const generateSuggestionsList = (data, projectName) => {
    let search_result_box = createDomNode("div", {
        class: "search__result__box"
    });

    let max_results = Math.min(MAX_SUGGESTIONS, data.results.length);
    let id = 0;
    for (let i = 0; i < max_results; ++i) {
        let search_result_single = createDomNode("div", {
            class: "search__result__single"
        });

        let content = generateSingleResult(data.results[i], projectName, id);

        search_result_single.appendChild(content);
        search_result_box.appendChild(search_result_single);

        id += data.results[i].blocks.length;
    }
    return search_result_box;
};

/**
 * Removes .active class from all the suggestions.
 */
const removeAllActive = () => {
    const results = document.querySelectorAll(".outer_div_page_results.active");
    const results_arr = Object.keys(results).map(i => results[i]);
    for (let i = 1; i <= results_arr.length; ++i) {
        results_arr[i - 1].classList.remove("active");
    }
};

/**
 * Add .active class to the search suggestion
 * corresponding to `id`, and scroll to that suggestion smoothly.
 *
 * @param {Number} id of the suggestion to activate
 */
const addActive = (id) => {
    const current_item = document.querySelector("#hit__" + id);
    // in case of no results or any error,
    // current_item will not be found in the DOM.
    if (current_item !== null) {
        current_item.classList.add("active");
        current_item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }
};


/*
 * Select next/previous result.
 * Go to the first result if already in the last result,
 * or to the last result if already in the first result.
 *
 * @param {Boolean} forward.
 */
const selectNextResult = (forward) => {
    const all = document.querySelectorAll(".outer_div_page_results");
    const current = document.querySelector(".outer_div_page_results.active");

    let next_id = 1;
    let last_id = 1;

    if (all.length > 0) {
      let last = all[all.length - 1];
      if (last.id !== null) {
        let match = last.id.match(/\d+/);
        if (match !== null) {
          last_id = Number(match[0]);
        }
      }
    }

    if (current !== null && current.id !== null) {
      let match = current.id.match(/\d+/);
      if (match !== null) {
        next_id = Number(match[0]);
        next_id += forward? 1 : -1;
      }
    }

    // Cycle to the first or last result.
    if (next_id <= 0) {
      next_id = last_id;
    } else if (next_id > last_id) {
      next_id = 1;
    }

    removeAllActive();
    addActive(next_id);
};


/**
 * Returns initial search input field,
 * which is already present in the docs.
 *
 * @return {Object} Input field node
 */
const getInputField = () => {
    let inputField;

    // Integration with the flyout search input only
    // TODO: make this trigger configurable by the user
    inputField = document.querySelector("#flyout-search-form > input");
    if (inputField === undefined || inputField === null) {
        console.log("Flyout search form not found");
    }

    return inputField;
};

/*
 * Returns the current search term from the modal.
 */
const getSearchTerm = () => {
  let search_outer_input = document.querySelector(".search__outer__input");
  if (search_outer_input !== null) {
      return search_outer_input.value || "";
  }
  return "";
};

/**
 * Removes all results from the search modal.
 * It doesn't close the search box.
 */
const removeResults = () => {
    let all_results = document.querySelectorAll(".search__result__box");
    for (let i = 0; i < all_results.length; ++i) {
        all_results[i].parentElement.removeChild(all_results[i]);
    }
};

/**
 * Creates and returns a div with error message
 * and some styles.
 *
 * @param {String} err_msg error message to be displayed
 */
const getErrorDiv = err_msg => {
    let err_div = createDomNode("div", {
        class: "search__result__box search__error__box"
    });
    err_div.innerHTML = err_msg;
    return err_div;
};

/**
 * Fetch the suggestions from search backend,
 * and appends the results to <div class="search__outer"> node,
 * which is already created when the page was loaded.
 *
 * @param {String} api_endpoint: API endpoint
 * @param {Object} parameters: search parameters
 * @param {String} projectName: name (slug) of the project
 * @return {Function} debounced function with debounce time of 500ms
 */
const fetchAndGenerateResults = (api_endpoint, parameters, projectName) => {
    let search_outer = document.querySelector(".search__outer");

    // Removes all results (if there is any),
    // and show the "Searching ...." text to
    // the user.
    removeResults();
    let search_loding = createDomNode("div", { class: "search__result__box" });
    search_loding.innerHTML = "<strong>Searching ....</strong>";
    search_outer.appendChild(search_loding);

    let fetchFunc = () => {
        // Update URL just before fetching the results
        updateUrl();
        updateSearchBar();

        const url = api_endpoint + "?" + new URLSearchParams(parameters).toString();

        fetch(url, {method: "GET"})
        .then(response => {
            if (!response.ok) {
              throw new Error();
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                let search_result_box = generateSuggestionsList(
                    data,
                    projectName
                );
                removeResults();
                search_outer.appendChild(search_result_box);

                // remove active classes from all suggestions
                // if the mouse hovers, otherwise styles from
                // :hover and .active will clash.
                search_outer.addEventListener("mouseenter", e => {
                    removeAllActive();
                });
            } else {
                removeResults();
                let err_div = getErrorDiv("No results found");
                search_outer.appendChild(err_div);
            }
        })
        .catch(error => {
            removeResults();
            let err_div = getErrorDiv("There was an error. Please try again.");
            search_outer.appendChild(err_div);
        });
    };
    return debounce(fetchFunc, FETCH_RESULTS_DELAY);
};

/**
 * Creates the initial html structure which will be
 * appended to the <body> as soon as the page loads.
 * This html structure will serve as the boilerplate
 * to show our search results.
 *
 * @return {String} initial html structure
 */
const generateAndReturnInitialHtml = () => {
    let innerHTML =
        '<div class="search__outer"> \
            <div class="search__cross" title="Close"> \
                <!--?xml version="1.0" encoding="UTF-8"?--> \
                <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"> \
                    <polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon> \
                </svg> \
            </div> \
            <input class="search__outer__input" placeholder="Search ..."> \
            <span class="bar"></span> \
        </div> \
        <div class="rtd__search__credits"> \
            Search by <a href="https://readthedocs.org/">Read the Docs</a> & <a href="https://readthedocs-sphinx-search.readthedocs.io/en/latest/">readthedocs-sphinx-search</a> \
        </div>';

    let div = createDomNode("div", {
        class: "search__outer__wrapper search__backdrop",
    });
    div.innerHTML = innerHTML;
    return div;
};

/**
 * Opens the search modal.
 *
 * @param {String} custom_query if a custom query is provided,
 * initialize the value of input field with it, or fallback to the
 * value from the original search bar.
 */
const showSearchModal = custom_query => {
    // removes previous results (if there are any).
    removeResults();

    let show_modal = function () {
        // removes the focus from the initial input field
        // which as already present in the docs.
        let search_bar = getInputField();
        search_bar.blur();

        // sets the value of the input field to empty string and focus it.
        let search_outer_input = document.querySelector(
            ".search__outer__input"
        );
        if (search_outer_input !== null) {
            if (
                typeof custom_query !== "undefined" &&
                _is_string(custom_query)
            ) {
                search_outer_input.value = custom_query;
                search_bar.value = custom_query;
            } else {
                search_outer_input.value = search_bar.value;
            }
            search_outer_input.focus();
        }
    };

    let element = document.querySelector(".search__outer__wrapper");
    if (element && element.style) {
    element.style.display = "block";
    }
    show_modal();
};

/**
 * Closes the search modal.
 */
const removeSearchModal = () => {
    // removes previous results before closing
    removeResults();

    updateSearchBar();

    // sets the value of input field to empty string and remove the focus.
    let search_outer_input = document.querySelector(".search__outer__input");
    if (search_outer_input !== null) {
        search_outer_input.value = "";
        search_outer_input.blur();
    }

    // update url (remove 'rtd_search' param)
    updateUrl();

    let element = document.querySelector(".search__outer__wrapper");
    if (element && element.style) {
    element.style.display = "none";
    }
};

})();

var __webpack_exports__initializeSearchAsYouType = __webpack_exports__.A;


;// CONCATENATED MODULE: ./src/index.js








function setup() {
    const is_loaded = new Promise((resolve) => {
        if (
            document.readyState === "interactive" ||
                document.readyState === "complete"
        ) {
            return resolve();
        } else {
            document.addEventListener(
                "DOMContentLoaded",
                () => {
                    resolve();
                },
                {
                    capture: true,
                    once: true,
                    passive: true,
                }
            );
        };
        return undefined;
    });

    return new Promise((resolve) => {
        is_loaded
            .then(() => {
                return getReadTheDocsConfig();
            })
            .then((config) => {
                let promises = [];

                promises.push(injectAnalytics(config));
                promises.push(injectFlyout(config));
                promises.push(__webpack_exports__initializeSearchAsYouType(config));
                promises.push(trackFlyoutEvents(config));
                promises.push(registerPageView(config));
                promises.push(injectEthicalAd(config));

                if (config.features.non_latest_version_warning.enabled && !config.version.external) {
                    promises.push(injectNonLatestVersionWarning(config));
                };

                if (config.features.external_version_warning.enabled && config.version.external) {
                    promises.push(injectExternalVersionWarning(config));
                };
                return Promise.all(promises);
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                console.error(err.message);
            });
    });
}

setup();

})();

/******/ })()
;
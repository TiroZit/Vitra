(function() {
  var __webpack_modules__ = {
    537: function() {},
    220: function(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {
      "use strict";
      var injectStylesIntoStyleTag = __webpack_require__(379);
      var injectStylesIntoStyleTag_default = __webpack_require__.n(injectStylesIntoStyleTag);
      var styleDomAPI = __webpack_require__(795);
      var styleDomAPI_default = __webpack_require__.n(styleDomAPI);
      var insertBySelector = __webpack_require__(569);
      var insertBySelector_default = __webpack_require__.n(insertBySelector);
      var setAttributesWithoutAttributes = __webpack_require__(565);
      var setAttributesWithoutAttributes_default = __webpack_require__.n(setAttributesWithoutAttributes);
      var insertStyleElement = __webpack_require__(216);
      var insertStyleElement_default = __webpack_require__.n(insertStyleElement);
      var styleTagTransform = __webpack_require__(589);
      var styleTagTransform_default = __webpack_require__.n(styleTagTransform);
      var style = __webpack_require__(537);
      var style_default = __webpack_require__.n(style);
      var options = {};
      options.styleTagTransform = styleTagTransform_default();
      options.setAttributes = setAttributesWithoutAttributes_default();
      options.insert = insertBySelector_default().bind(null, "head");
      options.domAPI = styleDomAPI_default();
      options.insertStyleElement = insertStyleElement_default();
      injectStylesIntoStyleTag_default()(style_default(), options);
      style_default() && style_default().locals && style_default().locals;
      let bodyLockStatus = true;
      let bodyLockToggle = function() {
        let delay = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 500;
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
      };
      let bodyUnlock = function() {
        let delay = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 500;
        let body = document.querySelector("body");
        if (bodyLockStatus) {
          let lock_padding = document.querySelectorAll("[data-lp]");
          setTimeout((() => {
            for (let index = 0; index < lock_padding.length; index++) {
              const el = lock_padding[index];
              el.style.paddingRight = "0px";
            }
            body.style.paddingRight = "0px";
            document.documentElement.classList.remove("lock");
          }), delay);
          bodyLockStatus = false;
          setTimeout((function() {
            bodyLockStatus = true;
          }), delay);
        }
      };
      let bodyLock = function() {
        let delay = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 500;
        let body = document.querySelector("body");
        if (bodyLockStatus) {
          let lock_padding = document.querySelectorAll("[data-lp]");
          for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
          }
          body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
          document.documentElement.classList.add("lock");
          bodyLockStatus = false;
          setTimeout((function() {
            bodyLockStatus = true;
          }), delay);
        }
      };
      function menuInit() {
        if (document.querySelector(".burger")) document.addEventListener("click", (function(e) {
          if (bodyLockStatus && e.target.closest(".burger")) {
            bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
            if (document.documentElement.classList.contains("submenu-open")) document.documentElement.classList.remove("submenu-open");
          }
        }));
      }
      __webpack_require__(944);
      function DynamicAdapt(type) {
        this.type = type;
      }
      DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          const data = node.dataset.da.trim();
          const dataArray = data.split(",");
          const оbject = {};
          оbject.element = node;
          оbject.parent = node.parentNode;
          оbject.destination = document.querySelector(dataArray[0].trim());
          оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
          оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
          return "(" + this.type + "-width: " + item.breakpoint + "em)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
          return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
          const media = this.mediaQueries[i];
          const mediaSplit = String.prototype.split.call(media, ",");
          const matchMedia = window.matchMedia(mediaSplit[0]);
          const mediaBreakpoint = mediaSplit[1];
          const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
            return item.breakpoint === mediaBreakpoint;
          }));
          matchMedia.addListener((function() {
            _this.mediaHandler(matchMedia, оbjectsFilter);
          }));
          this.mediaHandler(matchMedia, оbjectsFilter);
        }
      };
      DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
          const оbject = оbjects[i];
          if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      };
      DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
          destination.insertAdjacentElement("beforeend", element);
          return;
        }
        if ("first" === place) {
          destination.insertAdjacentElement("afterbegin", element);
          return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
      };
      DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
      };
      DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
      };
      DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) return 0;
            if ("first" === a.place || "last" === b.place) return -1;
            if ("last" === a.place || "first" === b.place) return 1;
            return a.place - b.place;
          }
          return a.breakpoint - b.breakpoint;
        })); else {
          Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
              if (a.place === b.place) return 0;
              if ("first" === a.place || "last" === b.place) return 1;
              if ("last" === a.place || "first" === b.place) return -1;
              return b.place - a.place;
            }
            return b.breakpoint - a.breakpoint;
          }));
          return;
        }
      };
      const da = new DynamicAdapt("max");
      da.init();
      document.addEventListener("click", documentActions);
      function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.closest("[data-parent]")) {
          const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
          const subMenu = document.querySelector(`[data-submenu='${subMenuId}']`);
          if (subMenu) {
            const activeLink = document.querySelector(".submenu-active");
            const activeBlock = document.querySelector(".submenu-open");
            if (activeLink && activeLink !== targetElement) {
              activeLink.classList.remove("submenu-active");
              activeBlock.classList.remove("submenu-open");
            }
            targetElement.classList.toggle("submenu-active");
            subMenu.classList.toggle("submenu-open");
          }
          e.preventDefault();
        }
        if (targetElement.closest("[data-sub-parent]")) {
          const subMenuId = targetElement.dataset.subParent ? targetElement.dataset.subParent : null;
          const subMenu = document.querySelector(`[data-sub-submenu='${subMenuId}']`);
          if (subMenu) {
            const activeLink = document.querySelector(".sub-submenu-active");
            const activeBlock = document.querySelector(".sub-submenu-open");
            if (activeLink && activeLink !== targetElement) {
              activeLink.classList.remove("sub-submenu-active");
              activeBlock.classList.remove("sub-submenu-open");
            }
            targetElement.classList.toggle("sub-submenu-active");
            subMenu.classList.toggle("sub-submenu-open");
          }
          e.preventDefault();
        }
        if (targetElement.closest(".inner-mobile__link")) {
          document.documentElement.classList.add("submenu-open");
          e.preventDefault();
        }
        if (targetElement.closest(".submenu-mobile__back")) {
          document.documentElement.classList.remove("submenu-open");
          e.preventDefault();
        }
      }
      window["FLS"] = false;
      menuInit();
    }
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }
  __webpack_require__.m = __webpack_modules__;
  !function() {
    var deferred = [];
    __webpack_require__.O = function(result, chunkIds, fn, priority) {
      if (chunkIds) {
        priority = priority || 0;
        for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
        deferred[i] = [ chunkIds, fn, priority ];
        return;
      }
      var notFulfilled = 1 / 0;
      for (i = 0; i < deferred.length; i++) {
        chunkIds = deferred[i][0];
        fn = deferred[i][1];
        priority = deferred[i][2];
        var fulfilled = true;
        for (var j = 0; j < chunkIds.length; j++) if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((function(key) {
          return __webpack_require__.O[key](chunkIds[j]);
        }))) chunkIds.splice(j--, 1); else {
          fulfilled = false;
          if (priority < notFulfilled) notFulfilled = priority;
        }
        if (fulfilled) {
          deferred.splice(i--, 1);
          var r = fn();
          if (void 0 !== r) result = r;
        }
      }
      return result;
    };
  }();
  !function() {
    __webpack_require__.n = function(module) {
      var getter = module && module.__esModule ? function() {
        return module["default"];
      } : function() {
        return module;
      };
      __webpack_require__.d(getter, {
        a: getter
      });
      return getter;
    };
  }();
  !function() {
    __webpack_require__.d = function(exports, definition) {
      for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key]
      });
    };
  }();
  !function() {
    __webpack_require__.o = function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }();
  !function() {
    var installedChunks = {
      179: 0
    };
    __webpack_require__.O.j = function(chunkId) {
      return 0 === installedChunks[chunkId];
    };
    var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
      var chunkIds = data[0];
      var moreModules = data[1];
      var runtime = data[2];
      var moduleId, chunkId, i = 0;
      if (chunkIds.some((function(id) {
        return 0 !== installedChunks[id];
      }))) {
        for (moduleId in moreModules) if (__webpack_require__.o(moreModules, moduleId)) __webpack_require__.m[moduleId] = moreModules[moduleId];
        if (runtime) var result = runtime(__webpack_require__);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (;i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) installedChunks[chunkId][0]();
        installedChunks[chunkId] = 0;
      }
      return __webpack_require__.O(result);
    };
    var chunkLoadingGlobal = self["webpackChunkgulp_webpack"] = self["webpackChunkgulp_webpack"] || [];
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
  }();
  !function() {
    __webpack_require__.nc = void 0;
  }();
  var __webpack_exports__ = __webpack_require__.O(void 0, [ 216 ], (function() {
    return __webpack_require__(220);
  }));
  __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})();
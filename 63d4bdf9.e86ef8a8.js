/*! For license information please see 63d4bdf9.e86ef8a8.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{111:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return c})),t.d(r,"metadata",(function(){return i})),t.d(r,"rightToc",(function(){return a})),t.d(r,"default",(function(){return l}));var n=t(1),o=t(6),u=(t(122),t(121)),c={id:"overview",title:"Overview"},i={id:"overview",title:"Overview",description:"stuff",source:"@site/../docs/Overview.md",permalink:"/imperium/docs/overview",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/Overview.md",sidebar:"someSidebar",next:{title:"ImperiumServer",permalink:"/imperium/docs/imperiumServer"}},a=[],f={rightToc:a};function l(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(u.b)("wrapper",Object(n.a)({},f,t,{components:r,mdxType:"MDXLayout"}),Object(u.b)("p",null,"stuff"))}l.isMDXComponent=!0},121:function(e,r,t){"use strict";t.d(r,"a",(function(){return p})),t.d(r,"b",(function(){return d}));var n=t(0),o=t.n(n);function u(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){u(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)t=u[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)t=u[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var f=o.a.createContext({}),l=function(e){var r=o.a.useContext(f),t=r;return e&&(t="function"==typeof e?e(r):i({},r,{},e)),t},p=function(e){var r=l(e.components);return o.a.createElement(f.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},y=Object(n.forwardRef)((function(e,r){var t=e.components,n=e.mdxType,u=e.originalType,c=e.parentName,f=a(e,["components","mdxType","originalType","parentName"]),p=l(t),y=n,d=p["".concat(c,".").concat(y)]||p[y]||s[y]||u;return t?o.a.createElement(d,i({ref:r},f,{components:t})):o.a.createElement(d,i({ref:r},f))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var u=t.length,c=new Array(u);c[0]=y;var i={};for(var a in r)hasOwnProperty.call(r,a)&&(i[a]=r[a]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var f=2;f<u;f++)c[f]=t[f];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},122:function(e,r,t){"use strict";e.exports=t(123)},123:function(e,r,t){"use strict";var n=t(124),o="function"==typeof Symbol&&Symbol.for,u=o?Symbol.for("react.element"):60103,c=o?Symbol.for("react.portal"):60106,i=o?Symbol.for("react.fragment"):60107,a=o?Symbol.for("react.strict_mode"):60108,f=o?Symbol.for("react.profiler"):60114,l=o?Symbol.for("react.provider"):60109,p=o?Symbol.for("react.context"):60110,s=o?Symbol.for("react.forward_ref"):60112,y=o?Symbol.for("react.suspense"):60113,d=o?Symbol.for("react.memo"):60115,m=o?Symbol.for("react.lazy"):60116,v="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O={};function w(e,r,t){this.props=e,this.context=r,this.refs=O,this.updater=t||h}function g(){}function j(e,r,t){this.props=e,this.context=r,this.refs=O,this.updater=t||h}w.prototype.isReactComponent={},w.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,r,"setState")},w.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=w.prototype;var S=j.prototype=new g;S.constructor=j,n(S,w.prototype),S.isPureReactComponent=!0;var k={current:null},P=Object.prototype.hasOwnProperty,E={key:!0,ref:!0,__self:!0,__source:!0};function _(e,r,t){var n,o={},c=null,i=null;if(null!=r)for(n in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(c=""+r.key),r)P.call(r,n)&&!E.hasOwnProperty(n)&&(o[n]=r[n]);var a=arguments.length-2;if(1===a)o.children=t;else if(1<a){for(var f=Array(a),l=0;l<a;l++)f[l]=arguments[l+2];o.children=f}if(e&&e.defaultProps)for(n in a=e.defaultProps)void 0===o[n]&&(o[n]=a[n]);return{$$typeof:u,type:e,key:c,ref:i,props:o,_owner:k.current}}function x(e){return"object"==typeof e&&null!==e&&e.$$typeof===u}var C=/\/+/g,$=[];function R(e,r,t,n){if($.length){var o=$.pop();return o.result=e,o.keyPrefix=r,o.func=t,o.context=n,o.count=0,o}return{result:e,keyPrefix:r,func:t,context:n,count:0}}function T(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>$.length&&$.push(e)}function D(e,r,t){return null==e?0:function e(r,t,n,o){var i=typeof r;"undefined"!==i&&"boolean"!==i||(r=null);var a=!1;if(null===r)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(r.$$typeof){case u:case c:a=!0}}if(a)return n(o,r,""===t?"."+A(r,0):t),1;if(a=0,t=""===t?".":t+":",Array.isArray(r))for(var f=0;f<r.length;f++){var l=t+A(i=r[f],f);a+=e(i,l,n,o)}else if(null===r||"object"!=typeof r?l=null:l="function"==typeof(l=v&&r[v]||r["@@iterator"])?l:null,"function"==typeof l)for(r=l.call(r),f=0;!(i=r.next()).done;)a+=e(i=i.value,l=t+A(i,f++),n,o);else if("object"===i)throw n=""+r,Error(b(31,"[object Object]"===n?"object with keys {"+Object.keys(r).join(", ")+"}":n,""));return a}(e,"",r,t)}function A(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return r[e]}))}(e.key):r.toString(36)}function I(e,r){e.func.call(e.context,r,e.count++)}function M(e,r,t){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,r,e.count++),Array.isArray(e)?N(e,n,t,(function(e){return e})):null!=e&&(x(e)&&(e=function(e,r){return{$$typeof:u,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||r&&r.key===e.key?"":(""+e.key).replace(C,"$&/")+"/")+t)),n.push(e))}function N(e,r,t,n,o){var u="";null!=t&&(u=(""+t).replace(C,"$&/")+"/"),D(e,M,r=R(r,u,n,o)),T(r)}var U={current:null};function q(){var e=U.current;if(null===e)throw Error(b(321));return e}var F={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:k,IsSomeRendererActing:{current:!1},assign:n};r.Children={map:function(e,r,t){if(null==e)return e;var n=[];return N(e,n,null,r,t),n},forEach:function(e,r,t){if(null==e)return e;D(e,I,r=R(null,null,r,t)),T(r)},count:function(e){return D(e,(function(){return null}),null)},toArray:function(e){var r=[];return N(e,r,null,(function(e){return e})),r},only:function(e){if(!x(e))throw Error(b(143));return e}},r.Component=w,r.Fragment=i,r.Profiler=f,r.PureComponent=j,r.StrictMode=a,r.Suspense=y,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F,r.cloneElement=function(e,r,t){if(null==e)throw Error(b(267,e));var o=n({},e.props),c=e.key,i=e.ref,a=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,a=k.current),void 0!==r.key&&(c=""+r.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(l in r)P.call(r,l)&&!E.hasOwnProperty(l)&&(o[l]=void 0===r[l]&&void 0!==f?f[l]:r[l])}var l=arguments.length-2;if(1===l)o.children=t;else if(1<l){f=Array(l);for(var p=0;p<l;p++)f[p]=arguments[p+2];o.children=f}return{$$typeof:u,type:e.type,key:c,ref:i,props:o,_owner:a}},r.createContext=function(e,r){return void 0===r&&(r=null),(e={$$typeof:p,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:l,_context:e},e.Consumer=e},r.createElement=_,r.createFactory=function(e){var r=_.bind(null,e);return r.type=e,r},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:s,render:e}},r.isValidElement=x,r.lazy=function(e){return{$$typeof:m,_ctor:e,_status:-1,_result:null}},r.memo=function(e,r){return{$$typeof:d,type:e,compare:void 0===r?null:r}},r.useCallback=function(e,r){return q().useCallback(e,r)},r.useContext=function(e,r){return q().useContext(e,r)},r.useDebugValue=function(){},r.useEffect=function(e,r){return q().useEffect(e,r)},r.useImperativeHandle=function(e,r,t){return q().useImperativeHandle(e,r,t)},r.useLayoutEffect=function(e,r){return q().useLayoutEffect(e,r)},r.useMemo=function(e,r){return q().useMemo(e,r)},r.useReducer=function(e,r,t){return q().useReducer(e,r,t)},r.useRef=function(e){return q().useRef(e)},r.useState=function(e){return q().useState(e)},r.version="16.13.0"},124:function(e,r,t){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;function c(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,r){for(var t,i,a=c(e),f=1;f<arguments.length;f++){for(var l in t=Object(arguments[f]))o.call(t,l)&&(a[l]=t[l]);if(n){i=n(t);for(var p=0;p<i.length;p++)u.call(t,i[p])&&(a[i[p]]=t[i[p]])}}return a}}}]);
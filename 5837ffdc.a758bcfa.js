/*! For license information please see 5837ffdc.a758bcfa.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{109:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return u})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return f}));var n=r(1),o=r(6),i=(r(122),r(121)),u={id:"imperiumClient",title:"ImperiumClient",sidebar_label:"ImperiumClient"},c={id:"imperiumClient",title:"ImperiumClient",description:"The instance of the current ImperiumClient is passed down to a lot of the module definition functions.",source:"@site/../docs/ImperiumClient.md",permalink:"/imperium/docs/imperiumClient",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/ImperiumClient.md",sidebar_label:"ImperiumClient",sidebar:"someSidebar",previous:{title:"ImperiumServer",permalink:"/imperium/docs/imperiumServer"},next:{title:"Server Module Definition",permalink:"/imperium/docs/serverModule"}},l=[{value:"constructor(options: ImperiumClientOptions)",id:"constructoroptions-imperiumclientoptions",children:[]},{value:"async start()",id:"async-start",children:[]},{value:"initialState",id:"initialstate",children:[]},{value:"initialConf",id:"initialconf",children:[]}],a={rightToc:l};function f(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},a,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The instance of the current ImperiumClient is passed down to a lot of the module definition functions."),Object(i.b)("h2",{id:"constructoroptions-imperiumclientoptions"},"constructor(options: ImperiumClientOptions)"),Object(i.b)("p",null,"Creates a new instance of an Imperium server."),Object(i.b)("p",null,"The options object is comprised of the following keys:"),Object(i.b)("h4",{id:"routedefaults-key-string-any"},Object(i.b)("inlineCode",{parentName:"h4"},"routeDefaults: {[key: string]: any}")),Object(i.b)("h4",{id:"rootroute-imperiumroute"},Object(i.b)("inlineCode",{parentName:"h4"},"rootRoute: ImperiumRoute")),Object(i.b)("h4",{id:"clientmodules-imperiumclientmodulefunction"},Object(i.b)("inlineCode",{parentName:"h4"},"clientModules: ImperiumClientModuleFunction[]")),Object(i.b)("p",null,"An array of ",Object(i.b)("inlineCode",{parentName:"p"},"ImperiumClientModuleFunction"),"'s. These are functions that return the client module definition. "),Object(i.b)("h2",{id:"async-start"},"async start()"),Object(i.b)("p",null,"This starts the client."),Object(i.b)("h2",{id:"initialstate"},"initialState"),Object(i.b)("h2",{id:"initialconf"},"initialConf"))}f.isMDXComponent=!0},121:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return y}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=o.a.createContext({}),f=function(e){var t=o.a.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},s=function(e){var t=f(e.components);return o.a.createElement(a.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,u=e.parentName,a=l(e,["components","mdxType","originalType","parentName"]),s=f(r),m=n,y=s["".concat(u,".").concat(m)]||s[m]||p[m]||i;return r?o.a.createElement(y,c({ref:t},a,{components:r})):o.a.createElement(y,c({ref:t},a))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,u=new Array(i);u[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,u[1]=c;for(var a=2;a<i;a++)u[a]=r[a];return o.a.createElement.apply(null,u)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},122:function(e,t,r){"use strict";e.exports=r(123)},123:function(e,t,r){"use strict";var n=r(124),o="function"==typeof Symbol&&Symbol.for,i=o?Symbol.for("react.element"):60103,u=o?Symbol.for("react.portal"):60106,c=o?Symbol.for("react.fragment"):60107,l=o?Symbol.for("react.strict_mode"):60108,a=o?Symbol.for("react.profiler"):60114,f=o?Symbol.for("react.provider"):60109,s=o?Symbol.for("react.context"):60110,p=o?Symbol.for("react.forward_ref"):60112,m=o?Symbol.for("react.suspense"):60113,y=o?Symbol.for("react.memo"):60115,d=o?Symbol.for("react.lazy"):60116,b="function"==typeof Symbol&&Symbol.iterator;function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O={};function j(e,t,r){this.props=e,this.context=t,this.refs=O,this.updater=r||v}function g(){}function w(e,t,r){this.props=e,this.context=t,this.refs=O,this.updater=r||v}j.prototype.isReactComponent={},j.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(h(85));this.updater.enqueueSetState(this,e,t,"setState")},j.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=j.prototype;var C=w.prototype=new g;C.constructor=w,n(C,j.prototype),C.isPureReactComponent=!0;var S={current:null},k=Object.prototype.hasOwnProperty,P={key:!0,ref:!0,__self:!0,__source:!0};function _(e,t,r){var n,o={},u=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(u=""+t.key),t)k.call(t,n)&&!P.hasOwnProperty(n)&&(o[n]=t[n]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var a=Array(l),f=0;f<l;f++)a[f]=arguments[f+2];o.children=a}if(e&&e.defaultProps)for(n in l=e.defaultProps)void 0===o[n]&&(o[n]=l[n]);return{$$typeof:i,type:e,key:u,ref:c,props:o,_owner:S.current}}function E(e){return"object"==typeof e&&null!==e&&e.$$typeof===i}var x=/\/+/g,I=[];function $(e,t,r,n){if(I.length){var o=I.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function R(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>I.length&&I.push(e)}function T(e,t,r){return null==e?0:function e(t,r,n,o){var c=typeof t;"undefined"!==c&&"boolean"!==c||(t=null);var l=!1;if(null===t)l=!0;else switch(c){case"string":case"number":l=!0;break;case"object":switch(t.$$typeof){case i:case u:l=!0}}if(l)return n(o,t,""===r?"."+M(t,0):r),1;if(l=0,r=""===r?".":r+":",Array.isArray(t))for(var a=0;a<t.length;a++){var f=r+M(c=t[a],a);l+=e(c,f,n,o)}else if(null===t||"object"!=typeof t?f=null:f="function"==typeof(f=b&&t[b]||t["@@iterator"])?f:null,"function"==typeof f)for(t=f.call(t),a=0;!(c=t.next()).done;)l+=e(c=c.value,f=r+M(c,a++),n,o);else if("object"===c)throw n=""+t,Error(h(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n,""));return l}(e,"",t,r)}function M(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))}(e.key):t.toString(36)}function D(e,t){e.func.call(e.context,t,e.count++)}function N(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?A(e,n,r,(function(e){return e})):null!=e&&(E(e)&&(e=function(e,t){return{$$typeof:i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(x,"$&/")+"/")+r)),n.push(e))}function A(e,t,r,n,o){var i="";null!=r&&(i=(""+r).replace(x,"$&/")+"/"),T(e,N,t=$(t,i,n,o)),R(t)}var F={current:null};function U(){var e=F.current;if(null===e)throw Error(h(321));return e}var q={ReactCurrentDispatcher:F,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:S,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:function(e,t,r){if(null==e)return e;var n=[];return A(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;T(e,D,t=$(null,null,t,r)),R(t)},count:function(e){return T(e,(function(){return null}),null)},toArray:function(e){var t=[];return A(e,t,null,(function(e){return e})),t},only:function(e){if(!E(e))throw Error(h(143));return e}},t.Component=j,t.Fragment=c,t.Profiler=a,t.PureComponent=w,t.StrictMode=l,t.Suspense=m,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=q,t.cloneElement=function(e,t,r){if(null==e)throw Error(h(267,e));var o=n({},e.props),u=e.key,c=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,l=S.current),void 0!==t.key&&(u=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(f in t)k.call(t,f)&&!P.hasOwnProperty(f)&&(o[f]=void 0===t[f]&&void 0!==a?a[f]:t[f])}var f=arguments.length-2;if(1===f)o.children=r;else if(1<f){a=Array(f);for(var s=0;s<f;s++)a[s]=arguments[s+2];o.children=a}return{$$typeof:i,type:e.type,key:u,ref:c,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:s,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:f,_context:e},e.Consumer=e},t.createElement=_,t.createFactory=function(e){var t=_.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:p,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:d,_ctor:e,_status:-1,_result:null}},t.memo=function(e,t){return{$$typeof:y,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return U().useCallback(e,t)},t.useContext=function(e,t){return U().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return U().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return U().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return U().useLayoutEffect(e,t)},t.useMemo=function(e,t){return U().useMemo(e,t)},t.useReducer=function(e,t,r){return U().useReducer(e,t,r)},t.useRef=function(e){return U().useRef(e)},t.useState=function(e){return U().useState(e)},t.version="16.13.0"},124:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function u(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var r,c,l=u(e),a=1;a<arguments.length;a++){for(var f in r=Object(arguments[a]))o.call(r,f)&&(l[f]=r[f]);if(n){c=n(r);for(var s=0;s<c.length;s++)i.call(r,c[s])&&(l[c[s]]=r[c[s]])}}return l}}}]);
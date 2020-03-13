/*! For license information please see e0331e13.56818972.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{114:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return p}));var n=r(1),o=r(6),u=(r(122),r(121)),a={id:"routes",title:"Routes",sidebar_label:"Routes"},i={id:"routes",title:"Routes",description:"Route definitions follow React Router with a few additions.",source:"@site/../docs/Routes.md",permalink:"/imperium/docs/routes",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/Routes.md",sidebar_label:"Routes"},c=[{value:"React Router properties:",id:"react-router-properties",children:[]},{value:"RouteDirector properties",id:"routedirector-properties",children:[]},{value:"Layout properties",id:"layout-properties",children:[]},{value:"Reroute properties",id:"reroute-properties",children:[]},{value:"Portal Routes",id:"portal-routes",children:[]}],l={rightToc:c};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(u.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(u.b)("p",null,"Route definitions follow React Router with a few additions."),Object(u.b)("h3",{id:"react-router-properties"},"React Router properties:"),Object(u.b)("p",null,"You can see React Router properties ",Object(u.b)("a",Object(n.a)({parentName:"p"},{href:"https://reacttraining.com/react-router/web/api/Route"}),"here"),"."),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"path: string")," - Any valid URL path or array of paths."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"exact: bool")," - When true, will only match if the location path matches exactly. "),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"strict: bool")," - When true, a path with a trailing slash will only match a trailing slash."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"sensitive: bool")," - When true, will match if the path is case sensitive.")),Object(u.b)("h3",{id:"routedirector-properties"},"RouteDirector properties"),Object(u.b)("p",null,"You can find the ",Object(u.b)("inlineCode",{parentName:"p"},"RouterDirector")," component in the ",Object(u.b)("inlineCode",{parentName:"p"},"@thx/router")," package."),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"layout: Component")," - A React Component to render that usually wraps the content."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"content: Component")," - A React Component to render.")),Object(u.b)("h3",{id:"layout-properties"},"Layout properties"),Object(u.b)("p",null,"Layout properties depend on which layout you have specified but should usually include the following properties."),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"statusbar: Component")),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"sidebar: Component")),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"content: Component")),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"menu: Component")),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"footer: Component"))),Object(u.b)("h3",{id:"reroute-properties"},"Reroute properties"),Object(u.b)("p",null,"You can find the ",Object(u.b)("inlineCode",{parentName:"p"},"Reroute")," component in the ",Object(u.b)("inlineCode",{parentName:"p"},"@thx/router")," package. Keep in mind that reroute is NOT\nsecure. It just displays an 'unauthorized' component if accessing a route that the user does not have\naccess to. Use server-side permissions for real security."),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"permissions: string | ","[string]")," - Permissions that are required to render the route. "),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"redirect: bool")," - When true, redirects to ",Object(u.b)("inlineCode",{parentName:"li"},"/signin")," if not logged in or unauthorized.")),Object(u.b)("h2",{id:"portal-routes"},"Portal Routes"),Object(u.b)("p",null,"These are special routes that render a popup Portal overtop of other content. While they are defined alongside\nother routes, they have different properties. For maximum customization Imperium doesn't actually render the Portal\ncomponent for you. It just renders the component outside of the normal layout."),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"key: string")," - ",Object(u.b)("em",{parentName:"li"},"Required")," - Used as the key in the query string as well as the React component key"),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},"portal: Component")," - ",Object(u.b)("em",{parentName:"li"},"Required")," - The component to display in the Portal")))}p.isMDXComponent=!0},121:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n);function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i({},t,{},e)),r},s=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,u=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),s=p(r),b=n,d=s["".concat(a,".").concat(b)]||s[b]||f[b]||u;return r?o.a.createElement(d,i({ref:t},l,{components:r})):o.a.createElement(d,i({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var u=r.length,a=new Array(u);a[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,a[1]=i;for(var l=2;l<u;l++)a[l]=r[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},122:function(e,t,r){"use strict";e.exports=r(123)},123:function(e,t,r){"use strict";var n=r(124),o="function"==typeof Symbol&&Symbol.for,u=o?Symbol.for("react.element"):60103,a=o?Symbol.for("react.portal"):60106,i=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,l=o?Symbol.for("react.profiler"):60114,p=o?Symbol.for("react.provider"):60109,s=o?Symbol.for("react.context"):60110,f=o?Symbol.for("react.forward_ref"):60112,b=o?Symbol.for("react.suspense"):60113,d=o?Symbol.for("react.memo"):60115,m=o?Symbol.for("react.lazy"):60116,y="function"==typeof Symbol&&Symbol.iterator;function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},j={};function v(e,t,r){this.props=e,this.context=t,this.refs=j,this.updater=r||O}function g(){}function w(e,t,r){this.props=e,this.context=t,this.refs=j,this.updater=r||O}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(h(85));this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=v.prototype;var R=w.prototype=new g;R.constructor=w,n(R,v.prototype),R.isPureReactComponent=!0;var N={current:null},C=Object.prototype.hasOwnProperty,P={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var n,o={},a=null,i=null;if(null!=t)for(n in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(a=""+t.key),t)C.call(t,n)&&!P.hasOwnProperty(n)&&(o[n]=t[n]);var c=arguments.length-2;if(1===c)o.children=r;else if(1<c){for(var l=Array(c),p=0;p<c;p++)l[p]=arguments[p+2];o.children=l}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===o[n]&&(o[n]=c[n]);return{$$typeof:u,type:e,key:a,ref:i,props:o,_owner:N.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===u}var x=/\/+/g,_=[];function E(e,t,r,n){if(_.length){var o=_.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function $(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>_.length&&_.push(e)}function T(e,t,r){return null==e?0:function e(t,r,n,o){var i=typeof t;"undefined"!==i&&"boolean"!==i||(t=null);var c=!1;if(null===t)c=!0;else switch(i){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case u:case a:c=!0}}if(c)return n(o,t,""===r?"."+D(t,0):r),1;if(c=0,r=""===r?".":r+":",Array.isArray(t))for(var l=0;l<t.length;l++){var p=r+D(i=t[l],l);c+=e(i,p,n,o)}else if(null===t||"object"!=typeof t?p=null:p="function"==typeof(p=y&&t[y]||t["@@iterator"])?p:null,"function"==typeof p)for(t=p.call(t),l=0;!(i=t.next()).done;)c+=e(i=i.value,p=r+D(i,l++),n,o);else if("object"===i)throw n=""+t,Error(h(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n,""));return c}(e,"",t,r)}function D(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))}(e.key):t.toString(36)}function A(e,t){e.func.call(e.context,t,e.count++)}function I(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?q(e,n,r,(function(e){return e})):null!=e&&(S(e)&&(e=function(e,t){return{$$typeof:u,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(x,"$&/")+"/")+r)),n.push(e))}function q(e,t,r,n,o){var u="";null!=r&&(u=(""+r).replace(x,"$&/")+"/"),T(e,I,t=E(t,u,n,o)),$(t)}var U={current:null};function L(){var e=U.current;if(null===e)throw Error(h(321));return e}var M={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:N,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:function(e,t,r){if(null==e)return e;var n=[];return q(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;T(e,A,t=E(null,null,t,r)),$(t)},count:function(e){return T(e,(function(){return null}),null)},toArray:function(e){var t=[];return q(e,t,null,(function(e){return e})),t},only:function(e){if(!S(e))throw Error(h(143));return e}},t.Component=v,t.Fragment=i,t.Profiler=l,t.PureComponent=w,t.StrictMode=c,t.Suspense=b,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M,t.cloneElement=function(e,t,r){if(null==e)throw Error(h(267,e));var o=n({},e.props),a=e.key,i=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,c=N.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(p in t)C.call(t,p)&&!P.hasOwnProperty(p)&&(o[p]=void 0===t[p]&&void 0!==l?l[p]:t[p])}var p=arguments.length-2;if(1===p)o.children=r;else if(1<p){l=Array(p);for(var s=0;s<p;s++)l[s]=arguments[s+2];o.children=l}return{$$typeof:u,type:e.type,key:a,ref:i,props:o,_owner:c}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:s,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:p,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:f,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:m,_ctor:e,_status:-1,_result:null}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return L().useCallback(e,t)},t.useContext=function(e,t){return L().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return L().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return L().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return L().useLayoutEffect(e,t)},t.useMemo=function(e,t){return L().useMemo(e,t)},t.useReducer=function(e,t,r){return L().useReducer(e,t,r)},t.useRef=function(e){return L().useRef(e)},t.useState=function(e){return L().useState(e)},t.version="16.13.0"},124:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var r,i,c=a(e),l=1;l<arguments.length;l++){for(var p in r=Object(arguments[l]))o.call(r,p)&&(c[p]=r[p]);if(n){i=n(r);for(var s=0;s<i.length;s++)u.call(r,i[s])&&(c[i[s]]=r[i[s]])}}return c}}}]);
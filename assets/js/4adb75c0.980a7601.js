"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1756],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,f=m["".concat(s,".").concat(d)]||m[d]||p[d]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4591:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={},s=void 0,c={unversionedId:"Layout/Page Sidebar Items/Common",id:"version-8.0.0/Layout/Page Sidebar Items/Common",title:"Common",description:"sidebar items have the following properties.",source:"@site/versioned_docs/version-8.0.0/14-Layout/06-Page Sidebar Items/01-Common.md",sourceDirName:"14-Layout/06-Page Sidebar Items",slug:"/Layout/Page Sidebar Items/Common",permalink:"/imperium/docs/Layout/Page Sidebar Items/Common",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-8.0.0/14-Layout/06-Page Sidebar Items/01-Common.md",tags:[],version:"8.0.0",sidebarPosition:1,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Menu Items",permalink:"/imperium/docs/Layout/Layout Items/Menu Items"},next:{title:"Routed Items",permalink:"/imperium/docs/Layout/Page Sidebar Items/Routed Items"}},u=[{value:"weight",id:"weight",children:[],level:2},{value:"visible",id:"visible",children:[],level:2},{value:"stateSelectorHook",id:"stateselectorhook",children:[],level:2},{value:"text",id:"text",children:[],level:2},{value:"icon",id:"icon",children:[],level:2},{value:"color",id:"color",children:[],level:2}],p={toc:u};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"sidebar items have the following properties."),(0,a.kt)("h2",{id:"weight"},"weight"),(0,a.kt)("p",null,"Larger numbers move the item farther down."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"weight?: number\n")),(0,a.kt)("h2",{id:"visible"},"visible"),(0,a.kt)("p",null,"When this is a function, it receives the current ContentData. If you return true from this function the item is visible.\nIf you return false, the item is hidden."),(0,a.kt)("p",null,"When this is an object, it represents a mingo (see npm 'mingo' package) query that is matched against the current ContentData.\nIf the mingo query returns true, the item is visible, otherwise the item is hidden."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"visible?: Object | (data: ContentData) => boolean\n")),(0,a.kt)("h2",{id:"stateselectorhook"},"stateSelectorHook"),(0,a.kt)("p",null,"Pass a state select hook (or array of hooks) that return data, usually from Redux state."),(0,a.kt)("p",null,"This state data is added to the ContentData object."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"stateSelectorHook?: () => State | (() => State)[]\n")),(0,a.kt)("h2",{id:"text"},"text"),(0,a.kt)("p",null,"Usually required (except for custom sidebar items). Either a static string or a function that returns a string.\nThe text is displayed as the items main text."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"text: string | (data: ContentData) => string\n")),(0,a.kt)("h2",{id:"icon"},"icon"),(0,a.kt)("p",null,"Similar to the ",(0,a.kt)("inlineCode",{parentName:"p"},"text")," field. If supplied, the icon is shown on the item."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"icon?: SemanticICONS | (data: ContentData) => SemanticICONS\n")),(0,a.kt)("h2",{id:"color"},"color"),(0,a.kt)("p",null,"Similar to the ",(0,a.kt)("inlineCode",{parentName:"p"},"text")," field. If supplied, the color is applied to the item."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"color?: SemanticCOLORS | (data: ContentData) => SemanticCOLORS\n")))}m.isMDXComponent=!0}}]);
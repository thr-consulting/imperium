"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9187],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),s=c(n),m=o,f=s["".concat(l,".").concat(m)]||s[m]||d[m]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=s;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},7986:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return s}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],u={},l=void 0,c={unversionedId:"Layout/Intro",id:"Layout/Intro",title:"Intro",description:"About",source:"@site/docs/14-Layout/01-Intro.md",sourceDirName:"14-Layout",slug:"/Layout/Intro",permalink:"/imperium/docs/next/Layout/Intro",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/14-Layout/01-Intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Hooks",permalink:"/imperium/docs/next/Auth Client/Hooks"},next:{title:"Layout",permalink:"/imperium/docs/next/Layout/Layout"}},p=[{value:"About",id:"about",children:[],level:2},{value:"Installation",id:"installation",children:[{value:"Add to client modules",id:"add-to-client-modules",children:[],level:3},{value:"Add layout and pages to your feature index",id:"add-layout-and-pages-to-your-feature-index",children:[],level:3}],level:2}],d={toc:p};function s(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"about"},"About"),(0,a.kt)("p",null,"This is an Imperium client module providing an abstraction for page layout, menu items, and content."),(0,a.kt)("p",null,"The major parts of this package are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Imperium client module"),(0,a.kt)("li",{parentName:"ul"},"Main layout type: ",(0,a.kt)("inlineCode",{parentName:"li"},"LayoutData")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"createPages()")," function")),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("h3",{id:"add-to-client-modules"},"Add to client modules"),(0,a.kt)("p",null,"In your ",(0,a.kt)("inlineCode",{parentName:"p"},"clientModules.ts")," file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export function clientModules(): ImperiumClientModule[] {\n    return [\n        // ...other client modules  \n        layoutClientModule(),\n    ];\n}\n")),(0,a.kt)("h3",{id:"add-layout-and-pages-to-your-feature-index"},"Add layout and pages to your feature index"),(0,a.kt)("p",null,"In your feature ",(0,a.kt)("inlineCode",{parentName:"p"},"index.ts")," file, add layout and pages (routeProps). Layout is not optional, but it can be an empty object.\nUsing ",(0,a.kt)("inlineCode",{parentName:"p"},"createPages()")," is entirely optional."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import {routeProps} from './pages.tsx';\nimport {layout} from './layout.tsx';\n\nexport function feature(): ImperiumLayoutClientModule & ImperiumRouterClientModule {\n  return {\n    name: 'Feature',\n    layout,\n    routeProps, // Use `routeProps` from `createPages()`\n };\n}\n")))}s.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2553],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,f=d["".concat(u,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(f,a(a({ref:t},s),{},{components:n})):r.createElement(f,a({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9529:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return s},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={},u=void 0,c={unversionedId:"Auth Client/Intro",id:"Auth Client/Intro",title:"Intro",description:"About",source:"@site/docs/01-Auth Client/01-Intro.md",sourceDirName:"01-Auth Client",slug:"/Auth Client/Intro",permalink:"/imperium/docs/next/Auth Client/Intro",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/01-Auth Client/01-Intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Installation & Usage",permalink:"/imperium/docs/next/installation"},next:{title:"Hooks",permalink:"/imperium/docs/next/Auth Client/Hooks"}},s=[{value:"About",id:"about",children:[],level:2},{value:"Installation",id:"installation",children:[{value:"Add to client modules",id:"add-to-client-modules",children:[],level:3}],level:2}],p={toc:s};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"about"},"About"),(0,i.kt)("p",null,"This is an Imperium client module providing authentication and authorization support for a web client."),(0,i.kt)("p",null,"The major parts of this package are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Imperium client module")),(0,i.kt)("p",null,"The Imperium feature module tracks if a user is logged in. It also creates a cache for authorization information. The user\ninformation is persisted in Local Storage. The authorization cache is persisted in an IndexedDB."),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("h3",{id:"add-to-client-modules"},"Add to client modules"),(0,i.kt)("p",null,"In your ",(0,i.kt)("inlineCode",{parentName:"p"},"clientModules.ts")," file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export function clientModules(): ImperiumClientModule[] {\n    return [\n        // ...other client modules  \n        authClientModule(),\n    ];\n}\n")))}d.isMDXComponent=!0}}]);
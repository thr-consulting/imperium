"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6174],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),s=c(n),m=o,f=s["".concat(l,".").concat(m)]||s[m]||d[m]||i;return n?r.createElement(f,u(u({ref:t},p),{},{components:n})):r.createElement(f,u({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,u=new Array(i);u[0]=s;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:o,u[1]=a;for(var c=2;c<i;c++)u[c]=n[c];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},7958:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return s}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),u=["components"],a={},l=void 0,c={unversionedId:"Router/Intro",id:"version-8.0.0/Router/Intro",title:"Intro",description:"About",source:"@site/versioned_docs/version-8.0.0/16-Router/01-Intro.md",sourceDirName:"16-Router",slug:"/Router/Intro",permalink:"/imperium/docs/8.0.0/Router/Intro",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-8.0.0/16-Router/01-Intro.md",tags:[],version:"8.0.0",sidebarPosition:1,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Divider Items",permalink:"/imperium/docs/8.0.0/Layout/Page Sidebar Items/Divider Items"},next:{title:"Define Routes",permalink:"/imperium/docs/8.0.0/Router/Define Routes"}},p=[{value:"About",id:"about",children:[],level:2},{value:"Installation",id:"installation",children:[{value:"Add to client modules",id:"add-to-client-modules",children:[],level:3},{value:"Add routes to your feature index",id:"add-routes-to-your-feature-index",children:[],level:3}],level:2}],d={toc:p};function s(e){var t=e.components,n=(0,o.Z)(e,u);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"about"},"About"),(0,i.kt)("p",null,"This is an Imperium client module for defining and using routes."),(0,i.kt)("p",null,"The major parts of this package are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Imperium client module"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"defineRoutes()")," function"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"<ContentRouter>")," component")),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("h3",{id:"add-to-client-modules"},"Add to client modules"),(0,i.kt)("p",null,"In your ",(0,i.kt)("inlineCode",{parentName:"p"},"clientModules.ts")," file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export function clientModules(): ImperiumClientModule[] {\n    return [\n        // ...other client modules  \n        routerClientModule(),\n    ];\n}\n")),(0,i.kt)("p",null,"In your ",(0,i.kt)("inlineCode",{parentName:"p"},"client.tsx")," file, render the ",(0,i.kt)("inlineCode",{parentName:"p"},"<ContentRouter>")," component (with optional errorBoundary component):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"jsx",jsx:!0},"const client = new ImperiumClient({\n  clientModules,\n  render: props => {\n    return <ContentRouter {...props} />; // Add this prop optionally: errorBoundary={ErrorBoundary}\n  },\n});\n")),(0,i.kt)("h3",{id:"add-routes-to-your-feature-index"},"Add routes to your feature index"),(0,i.kt)("p",null,"In your feature ",(0,i.kt)("inlineCode",{parentName:"p"},"index.ts")," file add routeProps."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"import {routeProps} from './routes.tsx';\n\nexport function feature(): ImperiumRouterClientModule {\n  return {\n    name: 'Feature',\n    routeProps,\n };\n}\n")))}s.isMDXComponent=!0}}]);
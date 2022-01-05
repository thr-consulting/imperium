"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2316],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=n,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return r?a.createElement(h,o(o({ref:t},p),{},{components:r})):a.createElement(h,o({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4075:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var a=r(7462),n=r(3366),i=(r(7294),r(3905)),o=["components"],s={},l=void 0,c={unversionedId:"Layout/Data",id:"Layout/Data",title:"Data",description:"A specific set of data is created and used by all layout items and page content in various ways.",source:"@site/docs/14-Layout/04-Data.md",sourceDirName:"14-Layout",slug:"/Layout/Data",permalink:"/imperium/docs/next/Layout/Data",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/14-Layout/04-Data.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Pages",permalink:"/imperium/docs/next/Layout/Pages"},next:{title:"Common",permalink:"/imperium/docs/next/Layout/Layout Items/Common"}},p=[{value:"loc",id:"loc",children:[],level:3},{value:"route",id:"route",children:[],level:3},{value:"state",id:"state",children:[],level:3},{value:"active",id:"active",children:[],level:3},{value:"permissions",id:"permissions",children:[],level:3},{value:"id",id:"id",children:[],level:3},{value:"params",id:"params",children:[],level:3}],u={toc:p};function d(e){var t=e.components,r=(0,n.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A specific set of data is created and used by all layout items and page content in various ways."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"interface Data {\n    loc: Location;\n    route: {\n        path: string[];\n        hash: string;\n        search: Record<string, any>;\n    };\n    state: State;\n    active: boolean;\n    permissions: PermissionResults;\n    id?: string;\n  \n    // Page data has an additional field:\n    params: RouteParameters;\n}\n")),(0,i.kt)("p",null,"The data object is built in a certain order:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"The user id is added."),(0,i.kt)("li",{parentName:"ol"},"The previous permissions are retrieved from Redux state."),(0,i.kt)("li",{parentName:"ol"},"The state selector hooks are executed."),(0,i.kt)("li",{parentName:"ol"},"The route location is retrieved."),(0,i.kt)("li",{parentName:"ol"},"The route location is split into its object fields."),(0,i.kt)("li",{parentName:"ol"},"Active is determined loc, route, state, id, and previous permissions."),(0,i.kt)("li",{parentName:"ol"},"Permissions are determined from previous permissions, location, active, route, and id."),(0,i.kt)("li",{parentName:"ol"},"Permissions are merged and the entire data object is built.")),(0,i.kt)("h3",{id:"loc"},"loc"),(0,i.kt)("p",null,"A location object matching the current React Router location. It's defined somewhat like the following. See React Router for more information."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"loc: Location\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"interface Location {\n  state: object | null;\n  key: string;\n  pathname: string;\n  search: string;\n  hash: string;\n}\n")),(0,i.kt)("h3",{id:"route"},"route"),(0,i.kt)("p",null,"The route object is basically the same as the Location object, but processed for easier use in visibility queries."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"route: {\n  path: string[]; // An array of strings. The loc.pathname split by the '/' character.\n  hash: string; // A copy of the loc.hash string.\n  search: Record<string, any>; // The loc.search string, parsed by queryString.parse(). See node package 'querystring'.\n}\n")),(0,i.kt)("h3",{id:"state"},"state"),(0,i.kt)("p",null,"Layout and content items can use hooks that select slices of Redux state (see @imperium/state). This is the selected state merged together."),(0,i.kt)("p",null,"Parent items can also select state. This state is merged together with child state and passed to the child."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"state: Record<string, any>\n")),(0,i.kt)("h3",{id:"active"},"active"),(0,i.kt)("p",null,"This is only relevant in layout items that redirect to a route. Active is true when the current path matches the route ",(0,i.kt)("inlineCode",{parentName:"p"},"to")," path, otherwise it's false."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"active: boolean\n")),(0,i.kt)("h3",{id:"permissions"},"permissions"),(0,i.kt)("p",null,"If a layout item (or parent) has a ",(0,i.kt)("inlineCode",{parentName:"p"},"permissionSelectorHook"),", the results of those hooks are available."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"permissions: PermissionResults;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type PermissionResults = Record<string, boolean>;\n")),(0,i.kt)("h3",{id:"id"},"id"),(0,i.kt)("p",null,"If a user is currently logged in, this will be the id of the user. Otherwise undefined."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"id: string | undefined\n")),(0,i.kt)("h3",{id:"params"},"params"),(0,i.kt)("p",null,"This is only available to page data. Since each page is rendered from a route, the type of the route parameters are known.\nIf the route doesn't have any parameters, this type is ",(0,i.kt)("inlineCode",{parentName:"p"},"never"),". If the route does have parameters this is an object, typed with\nthe parameters as fields."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"params: RouteParameters\n")))}d.isMDXComponent=!0}}]);
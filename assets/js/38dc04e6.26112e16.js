"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5959],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(r),d=o,h=p["".concat(l,".").concat(d)]||p[d]||m[d]||i;return r?n.createElement(h,a(a({ref:t},c),{},{components:r})):n.createElement(h,a({ref:t},c))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var u=2;u<i;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},8596:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return p}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),a=["components"],s={},l=void 0,u={unversionedId:"Layout/Layout Items/Common",id:"version-8.2.1/Layout/Layout Items/Common",title:"Common",description:"Most layout items have the following properties:",source:"@site/versioned_docs/version-8.2.1/14-Layout/05-Layout Items/01-Common.md",sourceDirName:"14-Layout/05-Layout Items",slug:"/Layout/Layout Items/Common",permalink:"/imperium/docs/Layout/Layout Items/Common",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-8.2.1/14-Layout/05-Layout Items/01-Common.md",tags:[],version:"8.2.1",sidebarPosition:1,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Data",permalink:"/imperium/docs/Layout/Data"},next:{title:"Routed Items",permalink:"/imperium/docs/Layout/Layout Items/Routed Items"}},c=[{value:"weight",id:"weight",children:[],level:2},{value:"visible",id:"visible",children:[],level:2},{value:"permissionSelectorHook",id:"permissionselectorhook",children:[],level:2},{value:"stateSelectorHook",id:"stateselectorhook",children:[],level:2},{value:"text",id:"text",children:[],level:2},{value:"icon",id:"icon",children:[],level:2},{value:"moveToKey",id:"movetokey",children:[],level:2}],m={toc:c};function p(e){var t=e.components,r=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Most layout items have the following properties:"),(0,i.kt)("h2",{id:"weight"},"weight"),(0,i.kt)("p",null,"Larger numbers move the item farther to the left or down."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"weight?: number \n")),(0,i.kt)("h2",{id:"visible"},"visible"),(0,i.kt)("p",null,"When this is a function, it receives the current Data. If you return true from this function the item is visible.\nIf you return false, the item is hidden."),(0,i.kt)("p",null,"When this is an object, it represents a mingo (see npm 'mingo' package) query that is matched against the current Data.\nIf the mingo query returns true, the item is visible, otherwise the item is hidden."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"visible?: Object | (data: Data) => boolean\n")),(0,i.kt)("h2",{id:"permissionselectorhook"},"permissionSelectorHook"),(0,i.kt)("p",null,"Pass a permission selector hook (or array of hooks) that return results of permission checks, usually from ",(0,i.kt)("inlineCode",{parentName:"p"},"useCan")," in @imperium/auth-client."),(0,i.kt)("p",null,"These permission results are added to the Data object."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"permissionSelectorHook?: () => PermissionResult | (() => PermissionResult)[]\n")),(0,i.kt)("h2",{id:"stateselectorhook"},"stateSelectorHook"),(0,i.kt)("p",null,"Pass a state select hook (or array of hooks) that return data, usually from Redux state."),(0,i.kt)("p",null,"This state data is added to the Data object."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"stateSelectorHook?: () => State | (() => State)[]\n")),(0,i.kt)("h2",{id:"text"},"text"),(0,i.kt)("p",null,"Usually required (except for custom layout items). Either a static string or a function that returns a string.\nThe text is displayed as the items main text."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"text: string | (data: Data) => string\n")),(0,i.kt)("h2",{id:"icon"},"icon"),(0,i.kt)("p",null,"Similar to the ",(0,i.kt)("inlineCode",{parentName:"p"},"text")," field. If supplied, the icon is shown on the item."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"icon?: SemanticICONS | (data: Data) => SemanticICONS\n")),(0,i.kt)("h2",{id:"movetokey"},"moveToKey"),(0,i.kt)("p",null,"If you would like to have this item moved to a child of a different item (dropdown or submenu), usually from a different\nfeature, enter the target item's key string here. Note, items do not have keys unless expressly defined."),(0,i.kt)("p",null,"The item will be removed from its current location and rendered in the target item's children."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"moveToKey?: string\n")))}p.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8043],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=i,h=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(h,a(a({ref:t},c),{},{components:n})):r.createElement(h,a({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8510:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return c},default:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],l={},u=void 0,s={unversionedId:"Auth Client/Hooks",id:"Auth Client/Hooks",title:"Hooks",description:"useLogin",source:"@site/docs/01-Auth Client/02-Hooks.md",sourceDirName:"01-Auth Client",slug:"/Auth Client/Hooks",permalink:"/imperium/docs/next/Auth Client/Hooks",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/01-Auth Client/02-Hooks.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Intro",permalink:"/imperium/docs/next/Auth Client/Intro"},next:{title:"Intro",permalink:"/imperium/docs/next/Layout/Intro"}},c=[{value:"useLogin",id:"uselogin",children:[{value:"LoginInfo",id:"logininfo",children:[],level:3}],level:2},{value:"useLogout",id:"uselogout",children:[],level:2},{value:"useAuth",id:"useauth",children:[{value:"id",id:"id",children:[],level:3},{value:"authorization",id:"authorization",children:[],level:3}],level:2},{value:"useCan",id:"usecan",children:[{value:"result",id:"result",children:[],level:3},{value:"loading",id:"loading",children:[],level:3}],level:2}],p={toc:c};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"uselogin"},"useLogin"),(0,o.kt)("p",null,"Returns a function that can be used to attempt a login."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"useLogin: (loginInfo: LoginInfo) => Promise<void>\n")),(0,o.kt)("h3",{id:"logininfo"},"LoginInfo"),(0,o.kt)("p",null,"An object used to pass login information to the server during a login operation. It contains an identifier (usually an email address),\nan encoded password (usually with sha256), and a boolean used to tell the server to remember this device."),(0,o.kt)("h2",{id:"uselogout"},"useLogout"),(0,o.kt)("p",null,"Returns a function that can be used to log a user out."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"useLogout: () => Promise<void>\n")),(0,o.kt)("h2",{id:"useauth"},"useAuth"),(0,o.kt)("p",null,"Get authentication and authorization information for the current logged in user."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const {id, authorization} = useAuth(); \n")),(0,o.kt)("h3",{id:"id"},"id"),(0,o.kt)("p",null,"The logged-in users' id, or undefined if the user is not logged in."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"id: string | undefined\n")),(0,o.kt)("h3",{id:"authorization"},"authorization"),(0,o.kt)("p",null,"The current instance of the Authorization class, from @imperium/authorization."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"authorization: Authorization\n")),(0,o.kt)("h2",{id:"usecan"},"useCan"),(0,o.kt)("p",null,"Query for a permission (or multiple permissions) and optional data."),(0,o.kt)("p",null,"There are multiple caches in the pipeline for requesting a permission. If the permission is not cached on the\nclient, it is requested from the server."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"In memory, LRU cache, with expiry and maximum items."),(0,o.kt)("li",{parentName:"ol"},"Longer term storage in IndexedDB, with expiry."),(0,o.kt)("li",{parentName:"ol"},"Per request memory cache on the server."),(0,o.kt)("li",{parentName:"ol"},"Longer term storage in Redis, with expiry."),(0,o.kt)("li",{parentName:"ol"},"Calculated by business logic.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const [result, loading] = useCan('doStuff', {optional: 'data'});\n")),(0,o.kt)("h3",{id:"result"},"result"),(0,o.kt)("p",null,"The boolean result of the permission check. If an array of permissions are requested, the result is the\nlogical AND of all permission checks. The result will be initially ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),", until it is finished loading."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"result: boolean\n")),(0,o.kt)("h3",{id:"loading"},"loading"),(0,o.kt)("p",null,"True if the permission is still being loaded, otherwise false."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"loading: boolean\n")))}d.isMDXComponent=!0}}]);
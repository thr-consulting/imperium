"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[541],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=s(n),h=i,g=p["".concat(u,".").concat(h)]||p[h]||d[h]||a;return n?r.createElement(g,l(l({ref:t},c),{},{components:n})):r.createElement(g,l({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=p;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},937:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return c},default:function(){return p}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),l=["components"],o={},u=void 0,s={unversionedId:"Auth Client/Hooks",id:"version-8.0.0/Auth Client/Hooks",title:"Hooks",description:"useAuthId",source:"@site/versioned_docs/version-8.0.0/01-Auth Client/02-Hooks.md",sourceDirName:"01-Auth Client",slug:"/Auth Client/Hooks",permalink:"/imperium/docs/8.0.0/Auth Client/Hooks",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-8.0.0/01-Auth Client/02-Hooks.md",tags:[],version:"8.0.0",sidebarPosition:2,frontMatter:{},sidebar:"docsSidebar",previous:{title:"Intro",permalink:"/imperium/docs/8.0.0/Auth Client/Intro"},next:{title:"Intro",permalink:"/imperium/docs/8.0.0/Layout/Intro"}},c=[{value:"useAuthId",id:"useauthid",children:[{value:"id",id:"id",children:[],level:3},{value:"access",id:"access",children:[],level:3},{value:"setAuth",id:"setauth",children:[],level:3},{value:"getAuth",id:"getauth",children:[],level:3}],level:2},{value:"useLogin",id:"uselogin",children:[{value:"LoginInfo",id:"logininfo",children:[],level:3}],level:2},{value:"useLogout",id:"uselogout",children:[],level:2},{value:"useAuth",id:"useauth",children:[{value:"level: AuthLevel",id:"level-authlevel",children:[],level:3},{value:"loading",id:"loading",children:[],level:3},{value:"id",id:"id-1",children:[],level:3},{value:"hasAccess",id:"hasaccess",children:[],level:3}],level:2},{value:"useLazyAuth",id:"uselazyauth",children:[],level:2}],d={toc:c};function p(e){var t=e.components,n=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"useauthid"},"useAuthId"),(0,a.kt)("p",null,"Returns an object with the following properties."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"    const {id, access, setAuth, getAuth} = useAuthId();\n")),(0,a.kt)("h3",{id:"id"},"id"),(0,a.kt)("p",null,"Returns the logged-in users' id, or undefined if the user is not logged in."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"id: string | undefined\n")),(0,a.kt)("h3",{id:"access"},"access"),(0,a.kt)("p",null,"The encoded JWT returned from the server. Usually stores the user id, issued and expired timestamps, along with any other\ndata passed from the server."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"access: string | undefined\n")),(0,a.kt)("h3",{id:"setauth"},"setAuth"),(0,a.kt)("p",null,"A function that can be used to set the current logged-in user. This is usually used after something like a login operation."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"setAuth: (auth: IAuth | null) => void\n")),(0,a.kt)("h3",{id:"getauth"},"getAuth"),(0,a.kt)("p",null,"A function that can be used to retrieve the current logged-in user."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"getAuth: () => Promise<IAuth | null>\n")),(0,a.kt)("h2",{id:"uselogin"},"useLogin"),(0,a.kt)("p",null,"Returns a function that can be used to attempt a login."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"useLogin: (loginInfo: LoginInfo) => Promise<void>\n")),(0,a.kt)("h3",{id:"logininfo"},"LoginInfo"),(0,a.kt)("p",null,"An object used to pass login information to the server during a login operation. It contains an identifier (usually an email address),\nan encoded password (usually with sha256), and a boolean used to tell the server to remember this device."),(0,a.kt)("h2",{id:"uselogout"},"useLogout"),(0,a.kt)("p",null,"Returns a function that can be used to log a user out."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"useLogout: () => Promise<void>\n")),(0,a.kt)("h2",{id:"useauth"},"useAuth"),(0,a.kt)("p",null,"Using an authorization selector (see @imperium/authorization) returns an object with authorization details.\nThe fields are:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const {level, loading, id, hassAccess, useLazyAuth} = useAuth(selector: AbstractAuthSelector); \n")),(0,a.kt)("h3",{id:"level-authlevel"},"level: AuthLevel"),(0,a.kt)("p",null,"The current access level based on the current user and the passed in selector. (See @imperium/authorization for more details.)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"level: AuthLevel\n")),(0,a.kt)("h3",{id:"loading"},"loading"),(0,a.kt)("p",null,"True if the authorization is still loading, otherwise false."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"loading: boolean\n")),(0,a.kt)("h3",{id:"id-1"},"id"),(0,a.kt)("p",null,"The logged-in users' id, or undefined if the user is not logged in."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"id: string | undefined\n")),(0,a.kt)("h3",{id:"hasaccess"},"hasAccess"),(0,a.kt)("p",null,"Returns a function that can be used to get an authorization result. (See @imperium/authorization for more details.)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"hasAccess: (lvl: AuthLevel, opts?: SyncHasAccessOptions) => SyncAuthorizationResult\n")),(0,a.kt)("h2",{id:"uselazyauth"},"useLazyAuth"),(0,a.kt)("p",null,"Using an authorization selector returns"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"(selector: AbstractAuthSelector) \n")))}p.isMDXComponent=!0}}]);
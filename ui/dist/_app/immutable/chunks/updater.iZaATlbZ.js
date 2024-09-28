import{s as Re,F as Ye,r as H,T as Ae,o as X,U as Le,b as _e,f as q,V as Y,i as le,h as Ze,H as Je,I as Qe,J as $e,p as et,A as he,B as me,K as Be}from"./scheduler.DvhgI56V.js";import{S as tt,i as rt,t as nt,b as at}from"./index.cJPS-mTp.js";import{e as pe,g as Me,r as G,q as Z,E as it,F as ce,G as ot,h as ge,H as R}from"./events.CRn_k7UJ.js";import{b as V}from"./entry.DFeKHh1B.js";import{r as ye,w as we}from"./index.ClmdFyi7.js";/**
 * @license lucide-svelte v0.438.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function Ne(r,e,t){const n=r.slice();return n[11]=e[t][0],n[12]=e[t][1],n}function ae(r){let e,t=[r[12]],n={};for(let a=0;a<t.length;a+=1)n=H(n,t[a]);return{c(){e=Ae(r[11]),this.h()},l(a){e=Le(a,r[11],{}),_e(e).forEach(q),this.h()},h(){Y(e,n)},m(a,u){le(a,e,u)},p(a,u){Y(e,n=Me(t,[u&32&&a[12]]))},d(a){a&&q(e)}}}function Ee(r){let e=r[11],t,n=r[11]&&ae(r);return{c(){n&&n.c(),t=X()},l(a){n&&n.l(a),t=X()},m(a,u){n&&n.m(a,u),le(a,t,u)},p(a,u){a[11]?e?Re(e,a[11])?(n.d(1),n=ae(a),e=a[11],n.c(),n.m(t.parentNode,t)):n.p(a,u):(n=ae(a),e=a[11],n.c(),n.m(t.parentNode,t)):e&&(n.d(1),n=null,e=a[11])},d(a){a&&q(t),n&&n.d(a)}}}function st(r){let e,t,n,a,u,i=pe(r[5]),f=[];for(let l=0;l<i.length;l+=1)f[l]=Ee(Ne(r,i,l));const v=r[10].default,b=Ye(v,r,r[9],null);let p=[Te,r[7],{width:r[2]},{height:r[2]},{stroke:r[1]},{"stroke-width":n=r[4]?Number(r[3])*24/Number(r[2]):r[3]},{class:a=r[6]("lucide-icon","lucide",r[0]?`lucide-${r[0]}`:"",r[8].class)}],h={};for(let l=0;l<p.length;l+=1)h=H(h,p[l]);return{c(){e=Ae("svg");for(let l=0;l<f.length;l+=1)f[l].c();t=X(),b&&b.c(),this.h()},l(l){e=Le(l,"svg",{width:!0,height:!0,stroke:!0,"stroke-width":!0,class:!0});var m=_e(e);for(let c=0;c<f.length;c+=1)f[c].l(m);t=X(),b&&b.l(m),m.forEach(q),this.h()},h(){Y(e,h)},m(l,m){le(l,e,m);for(let c=0;c<f.length;c+=1)f[c]&&f[c].m(e,null);Ze(e,t),b&&b.m(e,null),u=!0},p(l,[m]){if(m&32){i=pe(l[5]);let c;for(c=0;c<i.length;c+=1){const T=Ne(l,i,c);f[c]?f[c].p(T,m):(f[c]=Ee(T),f[c].c(),f[c].m(e,t))}for(;c<f.length;c+=1)f[c].d(1);f.length=i.length}b&&b.p&&(!u||m&512)&&Je(b,v,l,l[9],u?$e(v,l[9],m,null):Qe(l[9]),null),Y(e,h=Me(p,[Te,m&128&&l[7],(!u||m&4)&&{width:l[2]},(!u||m&4)&&{height:l[2]},(!u||m&2)&&{stroke:l[1]},(!u||m&28&&n!==(n=l[4]?Number(l[3])*24/Number(l[2]):l[3]))&&{"stroke-width":n},(!u||m&257&&a!==(a=l[6]("lucide-icon","lucide",l[0]?`lucide-${l[0]}`:"",l[8].class)))&&{class:a}]))},i(l){u||(nt(b,l),u=!0)},o(l){at(b,l),u=!1},d(l){l&&q(e),et(f,l),b&&b.d(l)}}}function ut(r,e,t){const n=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];let a=he(e,n),{$$slots:u={},$$scope:i}=e,{name:f=void 0}=e,{color:v="currentColor"}=e,{size:b=24}=e,{strokeWidth:p=2}=e,{absoluteStrokeWidth:h=!1}=e,{iconNode:l=[]}=e;const m=(...c)=>c.filter((T,k,S)=>!!T&&S.indexOf(T)===k).join(" ");return r.$$set=c=>{t(8,e=H(H({},e),me(c))),t(7,a=he(e,n)),"name"in c&&t(0,f=c.name),"color"in c&&t(1,v=c.color),"size"in c&&t(2,b=c.size),"strokeWidth"in c&&t(3,p=c.strokeWidth),"absoluteStrokeWidth"in c&&t(4,h=c.absoluteStrokeWidth),"iconNode"in c&&t(5,l=c.iconNode),"$$scope"in c&&t(9,i=c.$$scope)},e=me(e),[f,v,b,p,h,l,m,a,e,i,u]}class Zt extends tt{constructor(e){super(),rt(this,e,ut,st,Re,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5})}}const ie=r=>r.replace(/\/$/,""),Jt=(r,e)=>{const t=ie(r),n=e.includes(V)?ie(e):ie(`${V}${e}`);return n==V?t==V:t.includes(n)},Qt=r=>r[0].toUpperCase()+r.slice(1),$t=(r,e)=>Object.keys(r).reduce((t,n)=>(e.includes(n)||(t[n]=r[n]),t),{}),er=r=>r?(r==null?void 0:r.name)||(r==null?void 0:r.title)||(r==null?void 0:r.email)||(r==null?void 0:r.id):"Unknown";function Ke(r){return new Promise(e=>setTimeout(e,r))}const je=()=>typeof window<"u";function lt(){const r=navigator.userAgentData;return(r==null?void 0:r.platform)??navigator.platform}const Ue=r=>je()&&r.test(lt().toLowerCase()),ct=()=>je()&&!!navigator.maxTouchPoints,ft=()=>Ue(/^mac/)&&!ct(),dt=()=>Ue(/mac|iphone|ipad|ipod/i),vt=()=>dt()&&!ft(),oe="data-melt-scroll-lock";function Se(r,e){if(!r)return;const t=r.style.cssText;return Object.assign(r.style,e),()=>{r.style.cssText=t}}function bt(r,e,t){if(!r)return;const n=r.style.getPropertyValue(e);return r.style.setProperty(e,t),()=>{n?r.style.setProperty(e,n):r.style.removeProperty(e)}}function ht(r){const e=r.getBoundingClientRect().left;return Math.round(e)+r.scrollLeft?"paddingLeft":"paddingRight"}function tr(r){const e=document,t=e.defaultView??window,{documentElement:n,body:a}=e;if(a.hasAttribute(oe))return G;a.setAttribute(oe,"");const i=t.innerWidth-n.clientWidth,f=()=>bt(n,"--scrollbar-width",`${i}px`),v=ht(n),b=t.getComputedStyle(a)[v],p=()=>Se(a,{overflow:"hidden",[v]:`calc(${b} + ${i}px)`}),h=()=>{const{scrollX:m,scrollY:c,visualViewport:T}=t,k=(T==null?void 0:T.offsetLeft)??0,S=(T==null?void 0:T.offsetTop)??0,D=Se(a,{position:"fixed",overflow:"hidden",top:`${-(c-Math.floor(S))}px`,left:`${-(m-Math.floor(k))}px`,right:"0",[v]:`calc(${b} + ${i}px)`});return()=>{D==null||D(),t.scrollTo(m,c)}},l=[f(),vt()?h():p()];return()=>{l.forEach(m=>m==null?void 0:m()),a.removeAttribute(oe)}}function mt(r){let e=r.parentElement;for(;Z(e)&&!e.hasAttribute("data-portal");)e=e.parentElement;return e||"body"}function rr(r,e){return e!==void 0?e:mt(r)==="body"?document.body:null}async function nr(r){const{prop:e,defaultEl:t}=r;if(await Promise.all([Ke(1),Be]),e===void 0){t==null||t.focus();return}const n=it(e)?e(t):e;if(typeof n=="string"){const a=document.querySelector(n);if(!Z(a))return;a.focus()}else Z(n)&&n.focus()}/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var We=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],J=We.join(","),qe=typeof Element>"u",L=qe?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,Q=!qe&&Element.prototype.getRootNode?function(r){var e;return r==null||(e=r.getRootNode)===null||e===void 0?void 0:e.call(r)}:function(r){return r==null?void 0:r.ownerDocument},$=function r(e,t){var n;t===void 0&&(t=!0);var a=e==null||(n=e.getAttribute)===null||n===void 0?void 0:n.call(e,"inert"),u=a===""||a==="true",i=u||t&&e&&r(e.parentNode);return i},pt=function(e){var t,n=e==null||(t=e.getAttribute)===null||t===void 0?void 0:t.call(e,"contenteditable");return n===""||n==="true"},Ge=function(e,t,n){if($(e))return[];var a=Array.prototype.slice.apply(e.querySelectorAll(J));return t&&L.call(e,J)&&a.unshift(e),a=a.filter(n),a},Ve=function r(e,t,n){for(var a=[],u=Array.from(e);u.length;){var i=u.shift();if(!$(i,!1))if(i.tagName==="SLOT"){var f=i.assignedElements(),v=f.length?f:i.children,b=r(v,!0,n);n.flatten?a.push.apply(a,b):a.push({scopeParent:i,candidates:b})}else{var p=L.call(i,J);p&&n.filter(i)&&(t||!e.includes(i))&&a.push(i);var h=i.shadowRoot||typeof n.getShadowRoot=="function"&&n.getShadowRoot(i),l=!$(h,!1)&&(!n.shadowRootFilter||n.shadowRootFilter(i));if(h&&l){var m=r(h===!0?i.children:h.children,!0,n);n.flatten?a.push.apply(a,m):a.push({scopeParent:i,candidates:m})}else u.unshift.apply(u,i.children)}}return a},ze=function(e){return!isNaN(parseInt(e.getAttribute("tabindex"),10))},A=function(e){if(!e)throw new Error("No node provided");return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||pt(e))&&!ze(e)?0:e.tabIndex},gt=function(e,t){var n=A(e);return n<0&&t&&!ze(e)?0:n},yt=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},xe=function(e){return e.tagName==="INPUT"},wt=function(e){return xe(e)&&e.type==="hidden"},Tt=function(e){var t=e.tagName==="DETAILS"&&Array.prototype.slice.apply(e.children).some(function(n){return n.tagName==="SUMMARY"});return t},Nt=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]},Et=function(e){if(!e.name)return!0;var t=e.form||Q(e),n=function(f){return t.querySelectorAll('input[type="radio"][name="'+f+'"]')},a;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")a=n(window.CSS.escape(e.name));else try{a=n(e.name)}catch(i){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",i.message),!1}var u=Nt(a,e.form);return!u||u===e},St=function(e){return xe(e)&&e.type==="radio"},Ft=function(e){return St(e)&&!Et(e)},Pt=function(e){var t,n=e&&Q(e),a=(t=n)===null||t===void 0?void 0:t.host,u=!1;if(n&&n!==e){var i,f,v;for(u=!!((i=a)!==null&&i!==void 0&&(f=i.ownerDocument)!==null&&f!==void 0&&f.contains(a)||e!=null&&(v=e.ownerDocument)!==null&&v!==void 0&&v.contains(e));!u&&a;){var b,p,h;n=Q(a),a=(b=n)===null||b===void 0?void 0:b.host,u=!!((p=a)!==null&&p!==void 0&&(h=p.ownerDocument)!==null&&h!==void 0&&h.contains(a))}}return u},Fe=function(e){var t=e.getBoundingClientRect(),n=t.width,a=t.height;return n===0&&a===0},kt=function(e,t){var n=t.displayCheck,a=t.getShadowRoot;if(getComputedStyle(e).visibility==="hidden")return!0;var u=L.call(e,"details>summary:first-of-type"),i=u?e.parentElement:e;if(L.call(i,"details:not([open]) *"))return!0;if(!n||n==="full"||n==="legacy-full"){if(typeof a=="function"){for(var f=e;e;){var v=e.parentElement,b=Q(e);if(v&&!v.shadowRoot&&a(v)===!0)return Fe(e);e.assignedSlot?e=e.assignedSlot:!v&&b!==e.ownerDocument?e=b.host:e=v}e=f}if(Pt(e))return!e.getClientRects().length;if(n!=="legacy-full")return!0}else if(n==="non-zero-area")return Fe(e);return!1},Dt=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if(t.tagName==="FIELDSET"&&t.disabled){for(var n=0;n<t.children.length;n++){var a=t.children.item(n);if(a.tagName==="LEGEND")return L.call(t,"fieldset[disabled] *")?!0:!a.contains(e)}return!0}t=t.parentElement}return!1},ee=function(e,t){return!(t.disabled||$(t)||wt(t)||kt(t,e)||Tt(t)||Dt(t))},ue=function(e,t){return!(Ft(t)||A(t)<0||!ee(e,t))},Ct=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},It=function r(e){var t=[],n=[];return e.forEach(function(a,u){var i=!!a.scopeParent,f=i?a.scopeParent:a,v=gt(f,i),b=i?r(a.candidates):f;v===0?i?t.push.apply(t,b):t.push(f):n.push({documentOrder:u,tabIndex:v,item:a,isScope:i,content:b})}),n.sort(yt).reduce(function(a,u){return u.isScope?a.push.apply(a,u.content):a.push(u.content),a},[]).concat(t)},Ot=function(e,t){t=t||{};var n;return t.getShadowRoot?n=Ve([e],t.includeContainer,{filter:ue.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:Ct}):n=Ge(e,t.includeContainer,ue.bind(null,t)),It(n)},Rt=function(e,t){t=t||{};var n;return t.getShadowRoot?n=Ve([e],t.includeContainer,{filter:ee.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):n=Ge(e,t.includeContainer,ee.bind(null,t)),n},_=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return L.call(e,J)===!1?!1:ue(t,e)},At=We.concat("iframe").join(","),se=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return L.call(e,At)===!1?!1:ee(t,e)};/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/function Pe(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),t.push.apply(t,n)}return t}function ke(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Pe(Object(t),!0).forEach(function(n){Lt(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Pe(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function Lt(r,e,t){return e=Bt(e),e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function _t(r,e){if(typeof r!="object"||r===null)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Bt(r){var e=_t(r,"string");return typeof e=="symbol"?e:String(e)}var De={activateTrap:function(e,t){if(e.length>0){var n=e[e.length-1];n!==t&&n.pause()}var a=e.indexOf(t);a===-1||e.splice(a,1),e.push(t)},deactivateTrap:function(e,t){var n=e.indexOf(t);n!==-1&&e.splice(n,1),e.length>0&&e[e.length-1].unpause()}},Mt=function(e){return e.tagName&&e.tagName.toLowerCase()==="input"&&typeof e.select=="function"},Kt=function(e){return(e==null?void 0:e.key)==="Escape"||(e==null?void 0:e.key)==="Esc"||(e==null?void 0:e.keyCode)===27},W=function(e){return(e==null?void 0:e.key)==="Tab"||(e==null?void 0:e.keyCode)===9},jt=function(e){return W(e)&&!e.shiftKey},Ut=function(e){return W(e)&&e.shiftKey},Ce=function(e){return setTimeout(e,0)},Ie=function(e,t){var n=-1;return e.every(function(a,u){return t(a)?(n=u,!1):!0}),n},U=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return typeof e=="function"?e.apply(void 0,n):e},z=function(e){return e.target.shadowRoot&&typeof e.composedPath=="function"?e.composedPath()[0]:e.target},Wt=[],qt=function(e,t){var n=(t==null?void 0:t.document)||document,a=(t==null?void 0:t.trapStack)||Wt,u=ke({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0,isKeyForward:jt,isKeyBackward:Ut},t),i={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0,recentNavEvent:void 0},f,v=function(s,o,d){return s&&s[o]!==void 0?s[o]:u[d||o]},b=function(s,o){var d=typeof(o==null?void 0:o.composedPath)=="function"?o.composedPath():void 0;return i.containerGroups.findIndex(function(g){var y=g.container,N=g.tabbableNodes;return y.contains(s)||(d==null?void 0:d.includes(y))||N.find(function(E){return E===s})})},p=function(s){var o=u[s];if(typeof o=="function"){for(var d=arguments.length,g=new Array(d>1?d-1:0),y=1;y<d;y++)g[y-1]=arguments[y];o=o.apply(void 0,g)}if(o===!0&&(o=void 0),!o){if(o===void 0||o===!1)return o;throw new Error("`".concat(s,"` was specified but was not a node, or did not return a node"))}var N=o;if(typeof o=="string"&&(N=n.querySelector(o),!N))throw new Error("`".concat(s,"` as selector refers to no known node"));return N},h=function(){var s=p("initialFocus");if(s===!1)return!1;if(s===void 0||!se(s,u.tabbableOptions))if(b(n.activeElement)>=0)s=n.activeElement;else{var o=i.tabbableGroups[0],d=o&&o.firstTabbableNode;s=d||p("fallbackFocus")}if(!s)throw new Error("Your focus-trap needs to have at least one focusable element");return s},l=function(){if(i.containerGroups=i.containers.map(function(s){var o=Ot(s,u.tabbableOptions),d=Rt(s,u.tabbableOptions),g=o.length>0?o[0]:void 0,y=o.length>0?o[o.length-1]:void 0,N=d.find(function(F){return _(F)}),E=d.slice().reverse().find(function(F){return _(F)}),P=!!o.find(function(F){return A(F)>0});return{container:s,tabbableNodes:o,focusableNodes:d,posTabIndexesFound:P,firstTabbableNode:g,lastTabbableNode:y,firstDomTabbableNode:N,lastDomTabbableNode:E,nextTabbableNode:function(O){var K=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,I=o.indexOf(O);return I<0?K?d.slice(d.indexOf(O)+1).find(function(j){return _(j)}):d.slice(0,d.indexOf(O)).reverse().find(function(j){return _(j)}):o[I+(K?1:-1)]}}}),i.tabbableGroups=i.containerGroups.filter(function(s){return s.tabbableNodes.length>0}),i.tabbableGroups.length<=0&&!p("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");if(i.containerGroups.find(function(s){return s.posTabIndexesFound})&&i.containerGroups.length>1)throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.")},m=function w(s){var o=s.activeElement;if(o)return o.shadowRoot&&o.shadowRoot.activeElement!==null?w(o.shadowRoot):o},c=function w(s){if(s!==!1&&s!==m(document)){if(!s||!s.focus){w(h());return}s.focus({preventScroll:!!u.preventScroll}),i.mostRecentlyFocusedNode=s,Mt(s)&&s.select()}},T=function(s){var o=p("setReturnFocus",s);return o||(o===!1?!1:s)},k=function(s){var o=s.target,d=s.event,g=s.isBackward,y=g===void 0?!1:g;o=o||z(d),l();var N=null;if(i.tabbableGroups.length>0){var E=b(o,d),P=E>=0?i.containerGroups[E]:void 0;if(E<0)y?N=i.tabbableGroups[i.tabbableGroups.length-1].lastTabbableNode:N=i.tabbableGroups[0].firstTabbableNode;else if(y){var F=Ie(i.tabbableGroups,function(re){var ne=re.firstTabbableNode;return o===ne});if(F<0&&(P.container===o||se(o,u.tabbableOptions)&&!_(o,u.tabbableOptions)&&!P.nextTabbableNode(o,!1))&&(F=E),F>=0){var O=F===0?i.tabbableGroups.length-1:F-1,K=i.tabbableGroups[O];N=A(o)>=0?K.lastTabbableNode:K.lastDomTabbableNode}else W(d)||(N=P.nextTabbableNode(o,!1))}else{var I=Ie(i.tabbableGroups,function(re){var ne=re.lastTabbableNode;return o===ne});if(I<0&&(P.container===o||se(o,u.tabbableOptions)&&!_(o,u.tabbableOptions)&&!P.nextTabbableNode(o))&&(I=E),I>=0){var j=I===i.tabbableGroups.length-1?0:I+1,be=i.tabbableGroups[j];N=A(o)>=0?be.firstTabbableNode:be.firstDomTabbableNode}else W(d)||(N=P.nextTabbableNode(o))}}else N=p("fallbackFocus");return N},S=function(s){var o=z(s);if(!(b(o,s)>=0)){if(U(u.clickOutsideDeactivates,s)){f.deactivate({returnFocus:u.returnFocusOnDeactivate});return}U(u.allowOutsideClick,s)||s.preventDefault()}},D=function(s){var o=z(s),d=b(o,s)>=0;if(d||o instanceof Document)d&&(i.mostRecentlyFocusedNode=o);else{s.stopImmediatePropagation();var g,y=!0;if(i.mostRecentlyFocusedNode)if(A(i.mostRecentlyFocusedNode)>0){var N=b(i.mostRecentlyFocusedNode),E=i.containerGroups[N].tabbableNodes;if(E.length>0){var P=E.findIndex(function(F){return F===i.mostRecentlyFocusedNode});P>=0&&(u.isKeyForward(i.recentNavEvent)?P+1<E.length&&(g=E[P+1],y=!1):P-1>=0&&(g=E[P-1],y=!1))}}else i.containerGroups.some(function(F){return F.tabbableNodes.some(function(O){return A(O)>0})})||(y=!1);else y=!1;y&&(g=k({target:i.mostRecentlyFocusedNode,isBackward:u.isKeyBackward(i.recentNavEvent)})),c(g||i.mostRecentlyFocusedNode||h())}i.recentNavEvent=void 0},C=function(s){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;i.recentNavEvent=s;var d=k({event:s,isBackward:o});d&&(W(s)&&s.preventDefault(),c(d))},B=function(s){if(Kt(s)&&U(u.escapeDeactivates,s)!==!1){s.preventDefault(),f.deactivate();return}(u.isKeyForward(s)||u.isKeyBackward(s))&&C(s,u.isKeyBackward(s))},fe=function(s){var o=z(s);b(o,s)>=0||U(u.clickOutsideDeactivates,s)||U(u.allowOutsideClick,s)||(s.preventDefault(),s.stopImmediatePropagation())},de=function(){if(i.active)return De.activateTrap(a,f),i.delayInitialFocusTimer=u.delayInitialFocus?Ce(function(){c(h())}):c(h()),n.addEventListener("focusin",D,!0),n.addEventListener("mousedown",S,{capture:!0,passive:!1}),n.addEventListener("touchstart",S,{capture:!0,passive:!1}),n.addEventListener("click",fe,{capture:!0,passive:!1}),n.addEventListener("keydown",B,{capture:!0,passive:!1}),f},ve=function(){if(i.active)return n.removeEventListener("focusin",D,!0),n.removeEventListener("mousedown",S,!0),n.removeEventListener("touchstart",S,!0),n.removeEventListener("click",fe,!0),n.removeEventListener("keydown",B,!0),f},Xe=function(s){var o=s.some(function(d){var g=Array.from(d.removedNodes);return g.some(function(y){return y===i.mostRecentlyFocusedNode})});o&&c(h())},te=typeof window<"u"&&"MutationObserver"in window?new MutationObserver(Xe):void 0,M=function(){te&&(te.disconnect(),i.active&&!i.paused&&i.containers.map(function(s){te.observe(s,{subtree:!0,childList:!0})}))};return f={get active(){return i.active},get paused(){return i.paused},activate:function(s){if(i.active)return this;var o=v(s,"onActivate"),d=v(s,"onPostActivate"),g=v(s,"checkCanFocusTrap");g||l(),i.active=!0,i.paused=!1,i.nodeFocusedBeforeActivation=n.activeElement,o==null||o();var y=function(){g&&l(),de(),M(),d==null||d()};return g?(g(i.containers.concat()).then(y,y),this):(y(),this)},deactivate:function(s){if(!i.active)return this;var o=ke({onDeactivate:u.onDeactivate,onPostDeactivate:u.onPostDeactivate,checkCanReturnFocus:u.checkCanReturnFocus},s);clearTimeout(i.delayInitialFocusTimer),i.delayInitialFocusTimer=void 0,ve(),i.active=!1,i.paused=!1,M(),De.deactivateTrap(a,f);var d=v(o,"onDeactivate"),g=v(o,"onPostDeactivate"),y=v(o,"checkCanReturnFocus"),N=v(o,"returnFocus","returnFocusOnDeactivate");d==null||d();var E=function(){Ce(function(){N&&c(T(i.nodeFocusedBeforeActivation)),g==null||g()})};return N&&y?(y(T(i.nodeFocusedBeforeActivation)).then(E,E),this):(E(),this)},pause:function(s){if(i.paused||!i.active)return this;var o=v(s,"onPause"),d=v(s,"onPostPause");return i.paused=!0,o==null||o(),ve(),M(),d==null||d(),this},unpause:function(s){if(!i.paused||!i.active)return this;var o=v(s,"onUnpause"),d=v(s,"onPostUnpause");return i.paused=!1,o==null||o(),l(),de(),M(),d==null||d(),this},updateContainerElements:function(s){var o=[].concat(s).filter(Boolean);return i.containers=o.map(function(d){return typeof d=="string"?n.querySelector(d):d}),i.active&&l(),M(),this}},f.updateContainerElements(e),f};function ar(r={}){let e;const{immediate:t,...n}=r,a=we(!1),u=we(!1),i=h=>e==null?void 0:e.activate(h),f=h=>{e==null||e.deactivate(h)},v=()=>{e&&(e.pause(),u.set(!0))},b=()=>{e&&(e.unpause(),u.set(!1))};return{useFocusTrap:h=>(e=qt(h,{...n,onActivate(){var l;a.set(!0),(l=r.onActivate)==null||l.call(r)},onDeactivate(){var l;a.set(!1),(l=r.onDeactivate)==null||l.call(r)}}),t&&i(),{destroy(){f(),e=void 0}}),hasFocus:ye(a),isPaused:ye(u),activate:i,deactivate:f,pause:v,unpause:b}}const x=[],ir=(r,e)=>{let t=G;function n(){const u=x.indexOf(r);u>=0&&x.splice(u,1)}function a(u){t();const{open:i,onClose:f,shouldCloseOnInteractOutside:v,closeOnInteractOutside:b}=u;Ke(100).then(()=>{i?x.push(r):n()});function p(){return ot(x)===r}function h(){p()&&f&&(f(),n())}function l(c){const T=c.target;ce(T)&&T&&p()&&(c.preventDefault(),c.stopPropagation(),c.stopImmediatePropagation())}function m(c){v!=null&&v(c)&&p()&&(c.preventDefault(),c.stopPropagation(),c.stopImmediatePropagation(),h())}t=Gt(r,{onInteractOutsideStart:l,onInteractOutside:b?m:void 0,enabled:i}).destroy}return a(e),{update:a,destroy(){n(),t()}}},or=(r,e="body")=>{let t;if(!Z(e)&&typeof e!="string")return{destroy:G};async function n(u){if(e=u,typeof e=="string"){if(t=document.querySelector(e),t===null&&(await Be(),t=document.querySelector(e)),t===null)throw new Error(`No element found matching css selector: "${e}"`)}else if(e instanceof HTMLElement)t=e;else throw new TypeError(`Unknown portal target type: ${e===null?"null":typeof e}. Allowed types: string (CSS selector) or HTMLElement.`);r.dataset.portal="",t.appendChild(r),r.hidden=!1}function a(){r.remove()}return n(e),{update:n,destroy:a}},Gt=(r,e)=>{let t=G,n=G,a=!1,u=!1,i=!1;function f(p){t(),n();const{onInteractOutside:h,onInteractOutsideStart:l,enabled:m}=p;if(!m)return;function c(S){h&&Oe(S,r)&&(l==null||l(S));const D=S.target;ce(D)&&He(r,D)&&(u=!0),a=!0}function T(S){h==null||h(S)}const k=Vt(r);if(typeof PointerEvent<"u"){const S=D=>{n();const C=B=>{v(B)&&T(B),b()};if(D.pointerType==="touch"){n=R(k,"click",C,{capture:!0,once:!0});return}C(D)};t=ge(R(k,"pointerdown",c,!0),R(k,"pointerup",S,!0))}else{const S=C=>{i?i=!1:v(C)&&T(C),b()},D=C=>{i=!0,v(C)&&T(C),b()};t=ge(R(k,"mousedown",c,!0),R(k,"mouseup",S,!0),R(k,"touchstart",c,!0),R(k,"touchend",D,!0))}}function v(p){return!!(a&&!u&&Oe(p,r))}function b(){a=!1,u=!1}return f(e),{update:f,destroy(){t(),n()}}};function Oe(r,e){if("button"in r&&r.button>0)return!1;const t=r.target;if(!ce(t))return!1;const n=t.ownerDocument;return!n||!n.documentElement.contains(t)?!1:e&&!He(e,t)}function He(r,e){return r===e||r.contains(e)}function Vt(r){return(r==null?void 0:r.ownerDocument)??document}function sr(r){const e={};for(const t in r){const n=r[t];n!==void 0&&(e[t]=n)}return e}function ur(r){return function(e,t){if(t===void 0)return;const n=r[e];n&&n.set(t)}}export{Zt as I,or as a,sr as b,ar as c,ur as d,Jt as e,ie as f,rr as g,nr as h,Qt as i,er as j,$t as k,tr as r,Ke as s,ir as u};
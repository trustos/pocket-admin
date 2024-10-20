import{K as J,q as K,s as U,E as A,H as E,I as F,J as S,k as q,m as N,i as B,f as p,p as v,r as y,u as L,D as Q,e as W,c as X,b as Y,F as T,G as Z,z as M,A as w}from"./scheduler.CqdvYHi_.js";import{S as j,i as z,t as O,b as h,g as x,e as $}from"./index.ByeJd0xS.js";import{d as tt}from"./index.CpBNo5DZ.js";import{d as et,c as ot,g as st}from"./events.FRsraPB8.js";import{c as nt}from"./create.CMiO05FO.js";import{r as it,g as lt}from"./updater.BVlJMZ9J.js";function G(){return{NAME:"dialog",PARTS:["close","content","description","overlay","portal","title","trigger"]}}function ct(e){const{NAME:t,PARTS:o}=G(),s=et(t,o),n={...nt({...it(e),role:"dialog",forceVisible:!0}),getAttrs:s};return J(t,n),{...n,updateOption:lt(n.options)}}function ut(){const{NAME:e}=G();return K(e)}const rt=e=>({ids:e&1}),P=e=>({ids:e[0]});function at(e){let t;const o=e[12].default,s=A(o,e,e[11],P);return{c(){s&&s.c()},l(n){s&&s.l(n)},m(n,a){s&&s.m(n,a),t=!0},p(n,[a]){s&&s.p&&(!t||a&2049)&&E(s,o,n,n[11],t?S(o,n[11],a,rt):F(n[11]),P)},i(n){t||(O(s,n),t=!0)},o(n){h(s,n),t=!1},d(n){s&&s.d(n)}}}function ft(e,t,o){let s,{$$slots:n={},$$scope:a}=t,{preventScroll:l=void 0}=t,{closeOnEscape:d=void 0}=t,{closeOnOutsideClick:c=void 0}=t,{portal:i=void 0}=t,{open:r=void 0}=t,{onOpenChange:_=void 0}=t,{openFocus:m=void 0}=t,{closeFocus:g=void 0}=t,{onOutsideClick:b=void 0}=t;const{states:{open:k},updateOption:f,ids:C}=ct({closeOnEscape:d,preventScroll:l,closeOnOutsideClick:c,portal:i,forceVisible:!0,defaultOpen:r,openFocus:m,closeFocus:g,onOutsideClick:b,onOpenChange:({next:u})=>(r!==u&&(_==null||_(u),o(2,r=u)),u)}),D=tt([C.content,C.description,C.title],([u,H,I])=>({content:u,description:H,title:I}));return q(e,D,u=>o(0,s=u)),e.$$set=u=>{"preventScroll"in u&&o(3,l=u.preventScroll),"closeOnEscape"in u&&o(4,d=u.closeOnEscape),"closeOnOutsideClick"in u&&o(5,c=u.closeOnOutsideClick),"portal"in u&&o(6,i=u.portal),"open"in u&&o(2,r=u.open),"onOpenChange"in u&&o(7,_=u.onOpenChange),"openFocus"in u&&o(8,m=u.openFocus),"closeFocus"in u&&o(9,g=u.closeFocus),"onOutsideClick"in u&&o(10,b=u.onOutsideClick),"$$scope"in u&&o(11,a=u.$$scope)},e.$$.update=()=>{e.$$.dirty&4&&r!==void 0&&k.set(r),e.$$.dirty&8&&f("preventScroll",l),e.$$.dirty&16&&f("closeOnEscape",d),e.$$.dirty&32&&f("closeOnOutsideClick",c),e.$$.dirty&64&&f("portal",i),e.$$.dirty&256&&f("openFocus",m),e.$$.dirty&512&&f("closeFocus",g),e.$$.dirty&1024&&f("onOutsideClick",b)},[s,D,r,l,d,c,i,_,m,g,b,a,n]}class Et extends j{constructor(t){super(),z(this,t,ft,at,U,{preventScroll:3,closeOnEscape:4,closeOnOutsideClick:5,portal:6,open:2,onOpenChange:7,openFocus:8,closeFocus:9,onOutsideClick:10})}}const dt=e=>({builder:e&4}),V=e=>({builder:e[2]}),_t=e=>({builder:e&4}),R=e=>({builder:e[2]});function mt(e){let t,o,s,n;const a=e[8].default,l=A(a,e,e[7],V);let d=[e[2],{type:"button"},e[5]],c={};for(let i=0;i<d.length;i+=1)c=y(c,d[i]);return{c(){t=W("button"),l&&l.c(),this.h()},l(i){t=X(i,"BUTTON",{type:!0});var r=Y(t);l&&l.l(r),r.forEach(p),this.h()},h(){T(t,c)},m(i,r){B(i,t,r),l&&l.m(t,null),t.autofocus&&t.focus(),e[9](t),o=!0,s||(n=[Z(e[2].action(t)),M(t,"m-click",e[4]),M(t,"m-keydown",e[4])],s=!0)},p(i,r){l&&l.p&&(!o||r&132)&&E(l,a,i,i[7],o?S(a,i[7],r,dt):F(i[7]),V),T(t,c=st(d,[r&4&&i[2],{type:"button"},r&32&&i[5]]))},i(i){o||(O(l,i),o=!0)},o(i){h(l,i),o=!1},d(i){i&&p(t),l&&l.d(i),e[9](null),s=!1,w(n)}}}function gt(e){let t;const o=e[8].default,s=A(o,e,e[7],R);return{c(){s&&s.c()},l(n){s&&s.l(n)},m(n,a){s&&s.m(n,a),t=!0},p(n,a){s&&s.p&&(!t||a&132)&&E(s,o,n,n[7],t?S(o,n[7],a,_t):F(n[7]),R)},i(n){t||(O(s,n),t=!0)},o(n){h(s,n),t=!1},d(n){s&&s.d(n)}}}function bt(e){let t,o,s,n;const a=[gt,mt],l=[];function d(c,i){return c[1]?0:1}return t=d(e),o=l[t]=a[t](e),{c(){o.c(),s=N()},l(c){o.l(c),s=N()},m(c,i){l[t].m(c,i),B(c,s,i),n=!0},p(c,[i]){let r=t;t=d(c),t===r?l[t].p(c,i):(x(),h(l[r],1,1,()=>{l[r]=null}),$(),o=l[t],o?o.p(c,i):(o=l[t]=a[t](c),o.c()),O(o,1),o.m(s.parentNode,s))},i(c){n||(O(o),n=!0)},o(c){h(o),n=!1},d(c){c&&p(s),l[t].d(c)}}}function Ot(e,t,o){let s;const n=["asChild","el"];let a=v(t,n),l,{$$slots:d={},$$scope:c}=t,{asChild:i=!1}=t,{el:r=void 0}=t;const{elements:{close:_},getAttrs:m}=ut();q(e,_,f=>o(6,l=f));const g=ot(),b=m("close");function k(f){Q[f?"unshift":"push"](()=>{r=f,o(0,r)})}return e.$$set=f=>{t=y(y({},t),L(f)),o(5,a=v(t,n)),"asChild"in f&&o(1,i=f.asChild),"el"in f&&o(0,r=f.el),"$$scope"in f&&o(7,c=f.$$scope)},e.$$.update=()=>{e.$$.dirty&64&&o(2,s=l),e.$$.dirty&4&&Object.assign(s,b)},[r,i,s,_,g,a,l,c,d,k]}class Ft extends j{constructor(t){super(),z(this,t,Ot,bt,U,{asChild:1,el:0})}}export{Et as D,Ft as a,ut as g};

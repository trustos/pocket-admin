import{s as x,e as L,c as O,b as S,f as c,m as b,i as g,k as ee,a as w,g as E,t as C,o as A,d as N,h as k,j as G,p as te}from"../chunks/scheduler.DvhgI56V.js";import{S as le,i as ae,c as P,a as I,m as j,t as d,b as h,d as D,g as J,e as K}from"../chunks/index.cJPS-mTp.js";import{u as se,e as U}from"../chunks/events.CRn_k7UJ.js";import{C as re,a as ne}from"../chunks/card-content.BzAhehVp.js";import{C as oe,a as fe,b as ie}from"../chunks/card-title.C3GYjrfl.js";import{L as H}from"../chunks/label.D9IRjRLZ.js";function W(o,e,a){const l=o.slice();return l[1]=e[a][0],l[2]=e[a][1],l}function ce(o){let e;return{c(){e=C("Profile")},l(a){e=N(a,"Profile")},m(a,l){g(a,e,l)},d(a){a&&c(e)}}}function $e(o){let e;return{c(){e=C("Your personal information")},l(a){e=N(a,"Your personal information")},m(a,l){g(a,e,l)},d(a){a&&c(e)}}}function ue(o){let e,a,l,t;return e=new fe({props:{$$slots:{default:[ce]},$$scope:{ctx:o}}}),l=new ie({props:{$$slots:{default:[$e]},$$scope:{ctx:o}}}),{c(){P(e.$$.fragment),a=w(),P(l.$$.fragment)},l(s){I(e.$$.fragment,s),a=E(s),I(l.$$.fragment,s)},m(s,r){j(e,s,r),g(s,a,r),j(l,s,r),t=!0},p(s,r){const f={};r&32&&(f.$$scope={dirty:r,ctx:s}),e.$set(f);const n={};r&32&&(n.$$scope={dirty:r,ctx:s}),l.$set(n)},i(s){t||(d(e.$$.fragment,s),d(l.$$.fragment,s),t=!0)},o(s){h(e.$$.fragment,s),h(l.$$.fragment,s),t=!1},d(s){s&&c(a),D(e,s),D(l,s)}}}function me(o){let e;return{c(){e=C("Name")},l(a){e=N(a,"Name")},m(a,l){g(a,e,l)},d(a){a&&c(e)}}}function _e(o){let e;return{c(){e=C("Email")},l(a){e=N(a,"Email")},m(a,l){g(a,e,l)},d(a){a&&c(e)}}}function X(o){let e,a,l=U(Object.entries(o[0])),t=[];for(let r=0;r<l.length;r+=1)t[r]=y(W(o,l,r));const s=r=>h(t[r],1,1,()=>{t[r]=null});return{c(){for(let r=0;r<t.length;r+=1)t[r].c();e=A()},l(r){for(let f=0;f<t.length;f+=1)t[f].l(r);e=A()},m(r,f){for(let n=0;n<t.length;n+=1)t[n]&&t[n].m(r,f);g(r,e,f),a=!0},p(r,f){if(f&1){l=U(Object.entries(r[0]));let n;for(n=0;n<l.length;n+=1){const _=W(r,l,n);t[n]?(t[n].p(_,f),d(t[n],1)):(t[n]=y(_),t[n].c(),d(t[n],1),t[n].m(e.parentNode,e))}for(J(),n=l.length;n<t.length;n+=1)s(n);K()}},i(r){if(!a){for(let f=0;f<l.length;f+=1)d(t[f]);a=!0}},o(r){t=t.filter(Boolean);for(let f=0;f<t.length;f+=1)h(t[f]);a=!1},d(r){r&&c(e),te(t,r)}}}function Z(o){let e,a,l,t,s=o[2]+"",r,f,n,_;return a=new H({props:{for:o[1],$$slots:{default:[pe]},$$scope:{ctx:o}}}),{c(){e=L("div"),P(a.$$.fragment),l=w(),t=L("p"),r=C(s),n=w(),this.h()},l(p){e=O(p,"DIV",{class:!0});var $=S(e);I(a.$$.fragment,$),l=E($),t=O($,"P",{id:!0,class:!0});var v=S(t);r=N(v,s),v.forEach(c),n=E($),$.forEach(c),this.h()},h(){b(t,"id",f=o[1]),b(t,"class","text-sm"),b(e,"class","space-y-2")},m(p,$){g(p,e,$),j(a,e,null),k(e,l),k(e,t),k(t,r),k(e,n),_=!0},p(p,$){const v={};$&1&&(v.for=p[1]),$&33&&(v.$$scope={dirty:$,ctx:p}),a.$set(v),(!_||$&1)&&s!==(s=p[2]+"")&&G(r,s),(!_||$&1&&f!==(f=p[1]))&&b(t,"id",f)},i(p){_||(d(a.$$.fragment,p),_=!0)},o(p){h(a.$$.fragment,p),_=!1},d(p){p&&c(e),D(a)}}}function pe(o){let e=o[1]+"",a;return{c(){a=C(e)},l(l){a=N(l,e)},m(l,t){g(l,a,t)},p(l,t){t&1&&e!==(e=l[1]+"")&&G(a,e)},d(l){l&&c(a)}}}function y(o){let e,a,l=o[1]!=="name"&&o[1]!=="email"&&Z(o);return{c(){l&&l.c(),e=A()},l(t){l&&l.l(t),e=A()},m(t,s){l&&l.m(t,s),g(t,e,s),a=!0},p(t,s){t[1]!=="name"&&t[1]!=="email"?l?(l.p(t,s),s&1&&d(l,1)):(l=Z(t),l.c(),d(l,1),l.m(e.parentNode,e)):l&&(J(),h(l,1,1,()=>{l=null}),K())},i(t){a||(d(l),a=!0)},o(t){h(l),a=!1},d(t){t&&c(e),l&&l.d(t)}}}function de(o){var Q,R;let e,a,l,t,s=((Q=o[0])==null?void 0:Q.name)+"",r,f,n,_,p,$,v=((R=o[0])==null?void 0:R.email)+"",z,F,Y,q;a=new H({props:{for:"name",$$slots:{default:[me]},$$scope:{ctx:o}}}),_=new H({props:{for:"email",$$slots:{default:[_e]},$$scope:{ctx:o}}});let u=o[0]&&X(o);return{c(){e=L("div"),P(a.$$.fragment),l=w(),t=L("p"),r=C(s),f=w(),n=L("div"),P(_.$$.fragment),p=w(),$=L("p"),z=C(v),F=w(),u&&u.c(),Y=A(),this.h()},l(i){e=O(i,"DIV",{class:!0});var m=S(e);I(a.$$.fragment,m),l=E(m),t=O(m,"P",{id:!0,class:!0});var B=S(t);r=N(B,s),B.forEach(c),m.forEach(c),f=E(i),n=O(i,"DIV",{class:!0});var V=S(n);I(_.$$.fragment,V),p=E(V),$=O(V,"P",{id:!0,class:!0});var M=S($);z=N(M,v),M.forEach(c),V.forEach(c),F=E(i),u&&u.l(i),Y=A(),this.h()},h(){b(t,"id","name"),b(t,"class","text-sm"),b(e,"class","space-y-2"),b($,"id","email"),b($,"class","text-sm"),b(n,"class","space-y-2")},m(i,m){g(i,e,m),j(a,e,null),k(e,l),k(e,t),k(t,r),g(i,f,m),g(i,n,m),j(_,n,null),k(n,p),k(n,$),k($,z),g(i,F,m),u&&u.m(i,m),g(i,Y,m),q=!0},p(i,m){var M,T;const B={};m&32&&(B.$$scope={dirty:m,ctx:i}),a.$set(B),(!q||m&1)&&s!==(s=((M=i[0])==null?void 0:M.name)+"")&&G(r,s);const V={};m&32&&(V.$$scope={dirty:m,ctx:i}),_.$set(V),(!q||m&1)&&v!==(v=((T=i[0])==null?void 0:T.email)+"")&&G(z,v),i[0]?u?(u.p(i,m),m&1&&d(u,1)):(u=X(i),u.c(),d(u,1),u.m(Y.parentNode,Y)):u&&(J(),h(u,1,1,()=>{u=null}),K())},i(i){q||(d(a.$$.fragment,i),d(_.$$.fragment,i),d(u),q=!0)},o(i){h(a.$$.fragment,i),h(_.$$.fragment,i),h(u),q=!1},d(i){i&&(c(e),c(f),c(n),c(F),c(Y)),D(a),D(_),u&&u.d(i)}}}function ge(o){let e,a,l,t;return e=new oe({props:{$$slots:{default:[ue]},$$scope:{ctx:o}}}),l=new ne({props:{class:"space-y-4",$$slots:{default:[de]},$$scope:{ctx:o}}}),{c(){P(e.$$.fragment),a=w(),P(l.$$.fragment)},l(s){I(e.$$.fragment,s),a=E(s),I(l.$$.fragment,s)},m(s,r){j(e,s,r),g(s,a,r),j(l,s,r),t=!0},p(s,r){const f={};r&32&&(f.$$scope={dirty:r,ctx:s}),e.$set(f);const n={};r&33&&(n.$$scope={dirty:r,ctx:s}),l.$set(n)},i(s){t||(d(e.$$.fragment,s),d(l.$$.fragment,s),t=!0)},o(s){h(e.$$.fragment,s),h(l.$$.fragment,s),t=!1},d(s){s&&c(a),D(e,s),D(l,s)}}}function he(o){let e,a,l;return a=new re({props:{class:"mx-auto w-full",$$slots:{default:[ge]},$$scope:{ctx:o}}}),{c(){e=L("main"),P(a.$$.fragment),this.h()},l(t){e=O(t,"MAIN",{class:!0});var s=S(e);I(a.$$.fragment,s),s.forEach(c),this.h()},h(){b(e,"class","grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1")},m(t,s){g(t,e,s),j(a,e,null),l=!0},p(t,[s]){const r={};s&33&&(r.$$scope={dirty:s,ctx:t}),a.$set(r)},i(t){l||(d(a.$$.fragment,t),l=!0)},o(t){h(a.$$.fragment,t),l=!1},d(t){t&&c(e),D(a)}}}function ve(o,e,a){let l;return ee(o,se,t=>a(0,l=t)),[l]}class Pe extends le{constructor(e){super(),ae(this,e,ve,he,x,{})}}export{Pe as component};

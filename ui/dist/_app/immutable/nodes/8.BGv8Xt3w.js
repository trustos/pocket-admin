import{s as V,z as Ce,w as P,e as S,c as Z,b as F,f as u,A as W,i as d,D as ke,E as Ee,F as Le,v as D,x as ae,o as N,n as G,H as Fe,I as z,Q as q,R as H,m as C,S as T,h as Q,C as L,r as Me,a as k,g as E,t as A,d as I,j as ne,B as ze,k as J,T as Pe,P as Ae,y as fe,U as ie}from"../chunks/scheduler.CJbnQW4F.js";import{S as O,i as R,t as c,b as $,c as p,a as g,m as h,d as v,g as U,e as j,j as K,k as oe}from"../chunks/index.BMuCI7Kc.js";import{b as X,g as B,q as Y,d as ue}from"../chunks/events.BEg6mR46.js";import{z as y,l as x,d as Ie,F as ee,a as Se,C as ce,b as me,c as _e}from"../chunks/zod.CJbfytxt.js";import{C as Ze,a as Be}from"../chunks/card-content.CeBYw-PQ.js";import{C as De,a as Ne,b as qe}from"../chunks/card-title.DrzBK0s4.js";import{s as He,I as $e}from"../chunks/index.BVPhxFax.js";import{A as Te,a as Ve,b as Oe}from"../chunks/alert-title.BmPfGZIF.js";import{p as Re,f as te}from"../chunks/index.XPQK783o.js";import"../chunks/entry.BDTbVyTm.js";import{f as Ue}from"../chunks/index.DNlmB-Ct.js";function je(n){let e,t,l;const f=n[3].default,r=Ce(f,n,n[2],null);let i=[{class:t=X("flex items-center p-6 pt-0",n[0])},n[1]],s={};for(let a=0;a<i.length;a+=1)s=P(s,i[a]);return{c(){e=S("div"),r&&r.c(),this.h()},l(a){e=Z(a,"DIV",{class:!0});var o=F(e);r&&r.l(o),o.forEach(u),this.h()},h(){W(e,s)},m(a,o){d(a,e,o),r&&r.m(e,null),l=!0},p(a,[o]){r&&r.p&&(!l||o&4)&&ke(r,f,a,a[2],l?Le(f,a[2],o,null):Ee(a[2]),null),W(e,s=B(i,[(!l||o&1&&t!==(t=X("flex items-center p-6 pt-0",a[0])))&&{class:t},o&2&&a[1]]))},i(a){l||(c(r,a),l=!0)},o(a){$(r,a),l=!1},d(a){a&&u(e),r&&r.d(a)}}}function Qe(n,e,t){const l=["class"];let f=D(e,l),{$$slots:r={},$$scope:i}=e,{class:s=void 0}=e;return n.$$set=a=>{e=P(P({},e),ae(a)),t(1,f=D(e,l)),"class"in a&&t(0,s=a.class),"$$scope"in a&&t(2,i=a.$$scope)},[s,f,i,r]}class We extends O{constructor(e){super(),R(this,e,Qe,je,V,{class:0})}}function Ge(n,e,t){t!=null&&t.status&&t.status>=400&&(n.valid=!1),n.message=e;const f=(t==null?void 0:t.removeFiles)!==!1?de({form:n}):{form:n};return n.valid?f:Ue((t==null?void 0:t.status)??400,f)}const Je=Ge;function de(n){if(typeof n!="object")return n;for(const e in n){const t=n[e];t instanceof File?delete n[e]:t&&typeof t=="object"&&de(t)}return n}function Ke(n){let e,t,l=[{width:n[0]},{height:n[0]},n[5],{role:n[1]},{"aria-label":n[3]},{viewBox:"0 0 15 15"},{fill:n[2]},{xmlns:"http://www.w3.org/2000/svg"}],f={};for(let r=0;r<l.length;r+=1)f=P(f,l[r]);return{c(){e=q("svg"),t=q("path"),this.h()},l(r){e=H(r,"svg",{width:!0,height:!0,role:!0,"aria-label":!0,viewBox:!0,fill:!0,xmlns:!0});var i=F(e);t=H(i,"path",{"fill-rule":!0,"clip-rule":!0,d:!0,fill:!0}),F(t).forEach(u),i.forEach(u),this.h()},h(){C(t,"fill-rule","evenodd"),C(t,"clip-rule","evenodd"),C(t,"d","M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"),C(t,"fill","currentColor"),T(e,f)},m(r,i){d(r,e,i),Q(e,t)},p(r,i){T(e,f=B(l,[i&1&&{width:r[0]},i&1&&{height:r[0]},i&32&&r[5],i&2&&{role:r[1]},i&8&&{"aria-label":r[3]},{viewBox:"0 0 15 15"},i&4&&{fill:r[2]},{xmlns:"http://www.w3.org/2000/svg"}]))},d(r){r&&u(e)}}}function Xe(n){let e,t,l,f,r=[{width:n[0]},{height:n[0]},n[5],{role:n[1]},{"aria-label":n[3]},{viewBox:"0 0 15 15"},{fill:n[2]},{xmlns:"http://www.w3.org/2000/svg"}],i={};for(let s=0;s<r.length;s+=1)i=P(i,r[s]);return{c(){e=q("svg"),t=q("path"),this.h()},l(s){e=H(s,"svg",{width:!0,height:!0,role:!0,"aria-label":!0,viewBox:!0,fill:!0,xmlns:!0});var a=F(e);t=H(a,"path",{"fill-rule":!0,"clip-rule":!0,d:!0,fill:!0}),F(t).forEach(u),a.forEach(u),this.h()},h(){C(t,"fill-rule","evenodd"),C(t,"clip-rule","evenodd"),C(t,"d","M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"),C(t,"fill","currentColor"),T(e,i)},m(s,a){d(s,e,a),Q(e,t),l||(f=[L(e,"click",n[6]),L(e,"keydown",n[7]),L(e,"keyup",n[8]),L(e,"focus",n[9]),L(e,"blur",n[10]),L(e,"mouseenter",n[11]),L(e,"mouseleave",n[12]),L(e,"mouseover",n[13]),L(e,"mouseout",n[14])],l=!0)},p(s,a){T(e,i=B(r,[a&1&&{width:s[0]},a&1&&{height:s[0]},a&32&&s[5],a&2&&{role:s[1]},a&8&&{"aria-label":s[3]},{viewBox:"0 0 15 15"},a&4&&{fill:s[2]},{xmlns:"http://www.w3.org/2000/svg"}]))},d(s){s&&u(e),l=!1,Me(f)}}}function Ye(n){let e;function t(r,i){return r[4]?Xe:Ke}let l=t(n),f=l(n);return{c(){f.c(),e=N()},l(r){f.l(r),e=N()},m(r,i){f.m(r,i),d(r,e,i)},p(r,[i]){l===(l=t(r))&&f?f.p(r,i):(f.d(1),f=l(r),f&&(f.c(),f.m(e.parentNode,e)))},i:G,o:G,d(r){r&&u(e),f.d(r)}}}function ye(n,e,t){const l=["size","role","color","ariaLabel","withEvents"];let f=D(e,l);const r=Fe("iconCtx")??{};let{size:i=r.size||"24"}=e,{role:s=r.role||"img"}=e,{color:a=r.color||"currentColor"}=e,{ariaLabel:o="exclamation triangle,"}=e,{withEvents:m=!1}=e;function b(_){z.call(this,n,_)}function M(_){z.call(this,n,_)}function w(_){z.call(this,n,_)}function pe(_){z.call(this,n,_)}function ge(_){z.call(this,n,_)}function he(_){z.call(this,n,_)}function ve(_){z.call(this,n,_)}function we(_){z.call(this,n,_)}function be(_){z.call(this,n,_)}return n.$$set=_=>{e=P(P({},e),ae(_)),t(5,f=D(e,l)),"size"in _&&t(0,i=_.size),"role"in _&&t(1,s=_.role),"color"in _&&t(2,a=_.color),"ariaLabel"in _&&t(3,o=_.ariaLabel),"withEvents"in _&&t(4,m=_.withEvents)},[i,s,a,o,m,f,b,M,w,pe,ge,he,ve,we,be]}class xe extends O{constructor(e){super(),R(this,e,ye,Ye,V,{size:0,role:1,color:2,ariaLabel:3,withEvents:4})}}function le(n){let e,t;return e=new Ve({props:{$$slots:{default:[et]},$$scope:{ctx:n}}}),{c(){p(e.$$.fragment)},l(l){g(e.$$.fragment,l)},m(l,f){h(e,l,f),t=!0},p(l,f){const r={};f&5&&(r.$$scope={dirty:f,ctx:l}),e.$set(r)},i(l){t||(c(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){v(e,l)}}}function et(n){let e;return{c(){e=A(n[0])},l(t){e=I(t,n[0])},m(t,l){d(t,e,l)},p(t,l){l&1&&ne(e,t[0])},d(t){t&&u(e)}}}function re(n){let e,t;return e=new Oe({props:{$$slots:{default:[tt]},$$scope:{ctx:n}}}),{c(){p(e.$$.fragment)},l(l){g(e.$$.fragment,l)},m(l,f){h(e,l,f),t=!0},p(l,f){const r={};f&6&&(r.$$scope={dirty:f,ctx:l}),e.$set(r)},i(l){t||(c(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){v(e,l)}}}function tt(n){let e;return{c(){e=A(n[1])},l(t){e=I(t,n[1])},m(t,l){d(t,e,l)},p(t,l){l&2&&ne(e,t[1])},d(t){t&&u(e)}}}function lt(n){let e,t,l,f,r;e=new xe({props:{class:"h-4 w-4"}});let i=n[0]&&le(n),s=n[1]&&re(n);return{c(){p(e.$$.fragment),t=k(),i&&i.c(),l=k(),s&&s.c(),f=N()},l(a){g(e.$$.fragment,a),t=E(a),i&&i.l(a),l=E(a),s&&s.l(a),f=N()},m(a,o){h(e,a,o),d(a,t,o),i&&i.m(a,o),d(a,l,o),s&&s.m(a,o),d(a,f,o),r=!0},p(a,o){a[0]?i?(i.p(a,o),o&1&&c(i,1)):(i=le(a),i.c(),c(i,1),i.m(l.parentNode,l)):i&&(U(),$(i,1,1,()=>{i=null}),j()),a[1]?s?(s.p(a,o),o&2&&c(s,1)):(s=re(a),s.c(),c(s,1),s.m(f.parentNode,f)):s&&(U(),$(s,1,1,()=>{s=null}),j())},i(a){r||(c(e.$$.fragment,a),c(i),c(s),r=!0)},o(a){$(e.$$.fragment,a),$(i),$(s),r=!1},d(a){a&&(u(t),u(l),u(f)),v(e,a),i&&i.d(a),s&&s.d(a)}}}function rt(n){let e,t;return e=new Te({props:{variant:"destructive",$$slots:{default:[lt]},$$scope:{ctx:n}}}),{c(){p(e.$$.fragment)},l(l){g(e.$$.fragment,l)},m(l,f){h(e,l,f),t=!0},p(l,[f]){const r={};f&7&&(r.$$scope={dirty:f,ctx:l}),e.$set(r)},i(l){t||(c(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){v(e,l)}}}function st(n,e,t){let{title:l=""}=e,{description:f=""}=e;return n.$$set=r=>{"title"in r&&t(0,l=r.title),"description"in r&&t(1,f=r.description)},[l,f]}class at extends O{constructor(e){super(),R(this,e,st,rt,V,{title:0,description:1})}}function se(n){let e,t,l,f,r,i;return t=new at({props:{title:"Login failed.",description:n[0]}}),{c(){e=S("div"),p(t.$$.fragment)},l(s){e=Z(s,"DIV",{});var a=F(e);g(t.$$.fragment,a),a.forEach(u)},m(s,a){d(s,e,a),h(t,e,null),f=!0,r||(i=L(e,"introend",n[7]),r=!0)},p(s,a){const o={};a&1&&(o.description=s[0]),t.$set(o)},i(s){f||(c(t.$$.fragment,s),s&&Ae(()=>{f&&(l||(l=K(e,te,{delay:250,duration:300,x:0,y:-500,opacity:.5,easing:Y},!0)),l.run(1))}),f=!0)},o(s){$(t.$$.fragment,s),s&&(l||(l=K(e,te,{delay:250,duration:300,x:0,y:-500,opacity:.5,easing:Y},!1)),l.run(0)),f=!1},d(s){s&&u(e),v(t),s&&l&&l.end(),r=!1,i()}}}function nt(n){let e;return{c(){e=A("Login")},l(t){e=I(t,"Login")},m(t,l){d(t,e,l)},d(t){t&&u(e)}}}function ft(n){let e;return{c(){e=A("Enter your email below to login to your account.")},l(t){e=I(t,"Enter your email below to login to your account.")},m(t,l){d(t,e,l)},d(t){t&&u(e)}}}function it(n){let e,t,l,f,r,i=n[0]&&se(n);return t=new Ne({props:{class:"text-2xl",$$slots:{default:[nt]},$$scope:{ctx:n}}}),f=new qe({props:{$$slots:{default:[ft]},$$scope:{ctx:n}}}),{c(){i&&i.c(),e=k(),p(t.$$.fragment),l=k(),p(f.$$.fragment)},l(s){i&&i.l(s),e=E(s),g(t.$$.fragment,s),l=E(s),g(f.$$.fragment,s)},m(s,a){i&&i.m(s,a),d(s,e,a),h(t,s,a),d(s,l,a),h(f,s,a),r=!0},p(s,a){s[0]?i?(i.p(s,a),a&1&&c(i,1)):(i=se(s),i.c(),c(i,1),i.m(e.parentNode,e)):i&&(U(),$(i,1,1,()=>{i=null}),j());const o={};a&2048&&(o.$$scope={dirty:a,ctx:s}),t.$set(o);const m={};a&2048&&(m.$$scope={dirty:a,ctx:s}),f.$set(m)},i(s){r||(c(i),c(t.$$.fragment,s),c(f.$$.fragment,s),r=!0)},o(s){$(i),$(t.$$.fragment,s),$(f.$$.fragment,s),r=!1},d(s){s&&(u(e),u(l)),i&&i.d(s),v(t,s),v(f,s)}}}function ot(n){let e;return{c(){e=A("Email")},l(t){e=I(t,"Email")},m(t,l){d(t,e,l)},d(t){t&&u(e)}}}function ut(n){let e,t,l,f,r;e=new _e({props:{$$slots:{default:[ot]},$$scope:{ctx:n}}});const i=[n[10],{placeholder:"m@example.com"}];function s(o){n[8](o)}let a={};for(let o=0;o<i.length;o+=1)a=P(a,i[o]);return n[1].email!==void 0&&(a.value=n[1].email),l=new $e({props:a}),fe.push(()=>oe(l,"value",s)),{c(){p(e.$$.fragment),t=k(),p(l.$$.fragment)},l(o){g(e.$$.fragment,o),t=E(o),g(l.$$.fragment,o)},m(o,m){h(e,o,m),d(o,t,m),h(l,o,m),r=!0},p(o,m){const b={};m&2048&&(b.$$scope={dirty:m,ctx:o}),e.$set(b);const M=m&1024?B(i,[ue(o[10]),i[1]]):{};!f&&m&2&&(f=!0,M.value=o[1].email,ie(()=>f=!1)),l.$set(M)},i(o){r||(c(e.$$.fragment,o),c(l.$$.fragment,o),r=!0)},o(o){$(e.$$.fragment,o),$(l.$$.fragment,o),r=!1},d(o){o&&u(t),v(e,o),v(l,o)}}}function ct(n){let e,t,l,f;return e=new ce({props:{$$slots:{default:[ut,({attrs:r})=>({10:r}),({attrs:r})=>r?1024:0]},$$scope:{ctx:n}}}),l=new me({}),{c(){p(e.$$.fragment),t=k(),p(l.$$.fragment)},l(r){g(e.$$.fragment,r),t=E(r),g(l.$$.fragment,r)},m(r,i){h(e,r,i),d(r,t,i),h(l,r,i),f=!0},p(r,i){const s={};i&3074&&(s.$$scope={dirty:i,ctx:r}),e.$set(s)},i(r){f||(c(e.$$.fragment,r),c(l.$$.fragment,r),f=!0)},o(r){$(e.$$.fragment,r),$(l.$$.fragment,r),f=!1},d(r){r&&u(t),v(e,r),v(l,r)}}}function mt(n){let e;return{c(){e=A("Password")},l(t){e=I(t,"Password")},m(t,l){d(t,e,l)},d(t){t&&u(e)}}}function _t(n){let e,t,l,f,r;e=new _e({props:{$$slots:{default:[mt]},$$scope:{ctx:n}}});const i=[n[10],{type:"password"}];function s(o){n[9](o)}let a={};for(let o=0;o<i.length;o+=1)a=P(a,i[o]);return n[1].password!==void 0&&(a.value=n[1].password),l=new $e({props:a}),fe.push(()=>oe(l,"value",s)),{c(){p(e.$$.fragment),t=k(),p(l.$$.fragment)},l(o){g(e.$$.fragment,o),t=E(o),g(l.$$.fragment,o)},m(o,m){h(e,o,m),d(o,t,m),h(l,o,m),r=!0},p(o,m){const b={};m&2048&&(b.$$scope={dirty:m,ctx:o}),e.$set(b);const M=m&1024?B(i,[ue(o[10]),i[1]]):{};!f&&m&2&&(f=!0,M.value=o[1].password,ie(()=>f=!1)),l.$set(M)},i(o){r||(c(e.$$.fragment,o),c(l.$$.fragment,o),r=!0)},o(o){$(e.$$.fragment,o),$(l.$$.fragment,o),r=!1},d(o){o&&u(t),v(e,o),v(l,o)}}}function $t(n){let e,t,l,f;return e=new ce({props:{$$slots:{default:[_t,({attrs:r})=>({10:r}),({attrs:r})=>r?1024:0]},$$scope:{ctx:n}}}),l=new me({}),{c(){p(e.$$.fragment),t=k(),p(l.$$.fragment)},l(r){g(e.$$.fragment,r),t=E(r),g(l.$$.fragment,r)},m(r,i){h(e,r,i),d(r,t,i),h(l,r,i),f=!0},p(r,i){const s={};i&3074&&(s.$$scope={dirty:i,ctx:r}),e.$set(s)},i(r){f||(c(e.$$.fragment,r),c(l.$$.fragment,r),f=!0)},o(r){$(e.$$.fragment,r),$(l.$$.fragment,r),f=!1},d(r){r&&u(t),v(e,r),v(l,r)}}}function dt(n){let e,t,l,f,r,i;return t=new ee({props:{form:n[2],name:"email",$$slots:{default:[ct]},$$scope:{ctx:n}}}),r=new ee({props:{form:n[2],name:"password",$$slots:{default:[$t]},$$scope:{ctx:n}}}),{c(){e=S("div"),p(t.$$.fragment),l=k(),f=S("div"),p(r.$$.fragment),this.h()},l(s){e=Z(s,"DIV",{class:!0});var a=F(e);g(t.$$.fragment,a),a.forEach(u),l=E(s),f=Z(s,"DIV",{class:!0});var o=F(f);g(r.$$.fragment,o),o.forEach(u),this.h()},h(){C(e,"class","grid gap-2"),C(f,"class","grid gap-2")},m(s,a){d(s,e,a),h(t,e,null),d(s,l,a),d(s,f,a),h(r,f,null),i=!0},p(s,a){const o={};a&2050&&(o.$$scope={dirty:a,ctx:s}),t.$set(o);const m={};a&2050&&(m.$$scope={dirty:a,ctx:s}),r.$set(m)},i(s){i||(c(t.$$.fragment,s),c(r.$$.fragment,s),i=!0)},o(s){$(t.$$.fragment,s),$(r.$$.fragment,s),i=!1},d(s){s&&(u(e),u(l),u(f)),v(t),v(r)}}}function pt(n){let e;return{c(){e=A("Sign in")},l(t){e=I(t,"Sign in")},m(t,l){d(t,e,l)},d(t){t&&u(e)}}}function gt(n){let e,t;return e=new Se({props:{class:"w-full",$$slots:{default:[pt]},$$scope:{ctx:n}}}),{c(){p(e.$$.fragment)},l(l){g(e.$$.fragment,l)},m(l,f){h(e,l,f),t=!0},p(l,f){const r={};f&2048&&(r.$$scope={dirty:f,ctx:l}),e.$set(r)},i(l){t||(c(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){v(e,l)}}}function ht(n){let e,t,l,f,r,i;return e=new De({props:{$$slots:{default:[it]},$$scope:{ctx:n}}}),l=new Be({props:{class:"grid gap-4",$$slots:{default:[dt]},$$scope:{ctx:n}}}),r=new We({props:{$$slots:{default:[gt]},$$scope:{ctx:n}}}),{c(){p(e.$$.fragment),t=k(),p(l.$$.fragment),f=k(),p(r.$$.fragment)},l(s){g(e.$$.fragment,s),t=E(s),g(l.$$.fragment,s),f=E(s),g(r.$$.fragment,s)},m(s,a){h(e,s,a),d(s,t,a),h(l,s,a),d(s,f,a),h(r,s,a),i=!0},p(s,a){const o={};a&2049&&(o.$$scope={dirty:a,ctx:s}),e.$set(o);const m={};a&2050&&(m.$$scope={dirty:a,ctx:s}),l.$set(m);const b={};a&2048&&(b.$$scope={dirty:a,ctx:s}),r.$set(b)},i(s){i||(c(e.$$.fragment,s),c(l.$$.fragment,s),c(r.$$.fragment,s),i=!0)},o(s){$(e.$$.fragment,s),$(l.$$.fragment,s),$(r.$$.fragment,s),i=!1},d(s){s&&(u(t),u(f)),v(e,s),v(l,s),v(r,s)}}}function vt(n){let e,t,l,f,r,i;return l=new Ze({props:{class:"w-full max-w-sm",$$slots:{default:[ht]},$$scope:{ctx:n}}}),{c(){e=S("main"),t=S("form"),p(l.$$.fragment),this.h()},l(s){e=Z(s,"MAIN",{class:!0});var a=F(e);t=Z(a,"FORM",{method:!0});var o=F(t);g(l.$$.fragment,o),o.forEach(u),a.forEach(u),this.h()},h(){C(t,"method","POST"),C(e,"class","theme-zinc flex h-screen w-full items-center justify-center px-4")},m(s,a){d(s,e,a),Q(e,t),h(l,t,null),f=!0,r||(i=ze(n[5].call(null,t)),r=!0)},p(s,[a]){const o={};a&2051&&(o.$$scope={dirty:a,ctx:s}),l.$set(o)},i(s){f||(c(l.$$.fragment,s),f=!0)},o(s){$(l.$$.fragment,s),f=!1},d(s){s&&u(e),v(l),r=!1,i()}}}function wt(n,e,t){let l,f;const r=He(Ie(y(x)),{SPA:!0,validators:y(x),onUpdate:async({form:w})=>{if(w.valid)try{await Re.collection("users").authWithPassword(w.data.email,w.data.password,{expand:"role"})}catch{Je(w,"Failed to authenticate.")}}}),{form:i,message:s,enhance:a}=r;J(n,i,w=>t(1,f=w)),J(n,s,w=>t(0,l=w));const o=()=>setTimeout(()=>{Pe(s,l=void 0,l)},3e3),m=()=>o();function b(w){n.$$.not_equal(f.email,w)&&(f.email=w,i.set(f))}function M(w){n.$$.not_equal(f.password,w)&&(f.password=w,i.set(f))}return[l,f,r,i,s,a,o,m,b,M]}class St extends O{constructor(e){super(),R(this,e,wt,vt,V,{})}}export{St as component};

import{s as V,o as B,i as d,n as ee,f as u,A as P,M as Ne,r as w,B as J,C as N,T as O,U,b as E,m as k,V as j,h as Q,y as M,z as Pe,F as X,e as D,c as I,w as G,H as Y,I as y,J as x,N as te,a as L,g as F,t as S,d as Z,j as _e,G as De,k as le,a8 as Ie,S as Ve,E as de,a9 as $e}from"../chunks/scheduler.DvhgI56V.js";import{S as q,i as T,t as c,b as m,c as g,a as p,m as v,d as h,g as W,e as K,j as se,k as ge}from"../chunks/index.cJPS-mTp.js";import{g as A,a as H,D as re,z as pe}from"../chunks/events.CRn_k7UJ.js";import{s as Se,z as ae,l as ne,C as Ze,F as ie,a as Ae,b as ve,c as he,d as be}from"../chunks/zod.BL3y1ADa.js";import{C as Be,a as He}from"../chunks/card-content.BzAhehVp.js";import{C as qe,a as Te,b as Oe}from"../chunks/card-title.C3GYjrfl.js";import{I as we}from"../chunks/input.BVwSOzeE.js";import{c as Ue,p as je}from"../chunks/index.CzV2kvgO.js";import{f as fe}from"../chunks/index.DvATdlPF.js";import"../chunks/entry.DFeKHh1B.js";import{f as Ge}from"../chunks/index.Cg8y1Q2y.js";function Je(n,e,t){n&&"superFormValidationLibrary"in n&&(t=e,e=n,n=null);const s=e,i=(t==null?void 0:t.defaults)??s.defaults;return{id:(t==null?void 0:t.id)??s.id??"",valid:!1,posted:!1,errors:{},data:{...i,...n},constraints:s.constraints,shape:s.shape}}function Re(n,e,t){t!=null&&t.status&&t.status>=400&&(n.valid=!1),n.message=e;const i=(t==null?void 0:t.removeFiles)!==!1?Ce({form:n}):{form:n};return n.valid?i:Ge((t==null?void 0:t.status)??400,i)}const We=Re;function Ce(n){if(typeof n!="object")return n;for(const e in n){const t=n[e];t instanceof File?delete n[e]:t&&typeof t=="object"&&Ce(t)}return n}function Ke(n){let e,t,s=[{width:n[0]},{height:n[0]},n[5],{role:n[1]},{"aria-label":n[3]},{viewBox:"0 0 15 15"},{fill:n[2]},{xmlns:"http://www.w3.org/2000/svg"}],i={};for(let l=0;l<s.length;l+=1)i=w(i,s[l]);return{c(){e=O("svg"),t=O("path"),this.h()},l(l){e=U(l,"svg",{width:!0,height:!0,role:!0,"aria-label":!0,viewBox:!0,fill:!0,xmlns:!0});var o=E(e);t=U(o,"path",{"fill-rule":!0,"clip-rule":!0,d:!0,fill:!0}),E(t).forEach(u),o.forEach(u),this.h()},h(){k(t,"fill-rule","evenodd"),k(t,"clip-rule","evenodd"),k(t,"d","M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"),k(t,"fill","currentColor"),j(e,i)},m(l,o){d(l,e,o),Q(e,t)},p(l,o){j(e,i=A(s,[o&1&&{width:l[0]},o&1&&{height:l[0]},o&32&&l[5],o&2&&{role:l[1]},o&8&&{"aria-label":l[3]},{viewBox:"0 0 15 15"},o&4&&{fill:l[2]},{xmlns:"http://www.w3.org/2000/svg"}]))},d(l){l&&u(e)}}}function Qe(n){let e,t,s,i,l=[{width:n[0]},{height:n[0]},n[5],{role:n[1]},{"aria-label":n[3]},{viewBox:"0 0 15 15"},{fill:n[2]},{xmlns:"http://www.w3.org/2000/svg"}],o={};for(let a=0;a<l.length;a+=1)o=w(o,l[a]);return{c(){e=O("svg"),t=O("path"),this.h()},l(a){e=U(a,"svg",{width:!0,height:!0,role:!0,"aria-label":!0,viewBox:!0,fill:!0,xmlns:!0});var r=E(e);t=U(r,"path",{"fill-rule":!0,"clip-rule":!0,d:!0,fill:!0}),E(t).forEach(u),r.forEach(u),this.h()},h(){k(t,"fill-rule","evenodd"),k(t,"clip-rule","evenodd"),k(t,"d","M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"),k(t,"fill","currentColor"),j(e,o)},m(a,r){d(a,e,r),Q(e,t),s||(i=[M(e,"click",n[6]),M(e,"keydown",n[7]),M(e,"keyup",n[8]),M(e,"focus",n[9]),M(e,"blur",n[10]),M(e,"mouseenter",n[11]),M(e,"mouseleave",n[12]),M(e,"mouseover",n[13]),M(e,"mouseout",n[14])],s=!0)},p(a,r){j(e,o=A(l,[r&1&&{width:a[0]},r&1&&{height:a[0]},r&32&&a[5],r&2&&{role:a[1]},r&8&&{"aria-label":a[3]},{viewBox:"0 0 15 15"},r&4&&{fill:a[2]},{xmlns:"http://www.w3.org/2000/svg"}]))},d(a){a&&u(e),s=!1,Pe(i)}}}function Xe(n){let e;function t(l,o){return l[4]?Qe:Ke}let s=t(n),i=s(n);return{c(){i.c(),e=B()},l(l){i.l(l),e=B()},m(l,o){i.m(l,o),d(l,e,o)},p(l,[o]){s===(s=t(l))&&i?i.p(l,o):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:ee,o:ee,d(l){l&&u(e),i.d(l)}}}function Ye(n,e,t){const s=["size","role","color","ariaLabel","withEvents"];let i=P(e,s);const l=Ne("iconCtx")??{};let{size:o=l.size||"24"}=e,{role:a=l.role||"img"}=e,{color:r=l.color||"currentColor"}=e,{ariaLabel:f="exclamation triangle,"}=e,{withEvents:_=!1}=e;function C($){N.call(this,n,$)}function z($){N.call(this,n,$)}function b($){N.call(this,n,$)}function ke($){N.call(this,n,$)}function Ee($){N.call(this,n,$)}function Le($){N.call(this,n,$)}function Fe($){N.call(this,n,$)}function Me($){N.call(this,n,$)}function ze($){N.call(this,n,$)}return n.$$set=$=>{e=w(w({},e),J($)),t(5,i=P(e,s)),"size"in $&&t(0,o=$.size),"role"in $&&t(1,a=$.role),"color"in $&&t(2,r=$.color),"ariaLabel"in $&&t(3,f=$.ariaLabel),"withEvents"in $&&t(4,_=$.withEvents)},[o,a,r,f,_,i,C,z,b,ke,Ee,Le,Fe,Me,ze]}class ye extends q{constructor(e){super(),T(this,e,Ye,Xe,V,{size:0,role:1,color:2,ariaLabel:3,withEvents:4})}}function xe(n){let e,t,s;const i=n[4].default,l=X(i,n,n[3],null);let o=[{class:t=H(oe({variant:n[1]}),n[0])},n[2],{role:"alert"}],a={};for(let r=0;r<o.length;r+=1)a=w(a,o[r]);return{c(){e=D("div"),l&&l.c(),this.h()},l(r){e=I(r,"DIV",{class:!0,role:!0});var f=E(e);l&&l.l(f),f.forEach(u),this.h()},h(){G(e,a)},m(r,f){d(r,e,f),l&&l.m(e,null),s=!0},p(r,[f]){l&&l.p&&(!s||f&8)&&Y(l,i,r,r[3],s?x(i,r[3],f,null):y(r[3]),null),G(e,a=A(o,[(!s||f&3&&t!==(t=H(oe({variant:r[1]}),r[0])))&&{class:t},f&4&&r[2],{role:"alert"}]))},i(r){s||(c(l,r),s=!0)},o(r){m(l,r),s=!1},d(r){r&&u(e),l&&l.d(r)}}}function et(n,e,t){const s=["class","variant"];let i=P(e,s),{$$slots:l={},$$scope:o}=e,{class:a=void 0}=e,{variant:r="default"}=e;return n.$$set=f=>{e=w(w({},e),J(f)),t(2,i=P(e,s)),"class"in f&&t(0,a=f.class),"variant"in f&&t(1,r=f.variant),"$$scope"in f&&t(3,o=f.$$scope)},[a,r,i,o,l]}class tt extends q{constructor(e){super(),T(this,e,et,xe,V,{class:0,variant:1})}}function lt(n){let e,t,s;const i=n[3].default,l=X(i,n,n[2],null);let o=[{class:t=H("text-sm [&_p]:leading-relaxed",n[0])},n[1]],a={};for(let r=0;r<o.length;r+=1)a=w(a,o[r]);return{c(){e=D("div"),l&&l.c(),this.h()},l(r){e=I(r,"DIV",{class:!0});var f=E(e);l&&l.l(f),f.forEach(u),this.h()},h(){G(e,a)},m(r,f){d(r,e,f),l&&l.m(e,null),s=!0},p(r,[f]){l&&l.p&&(!s||f&4)&&Y(l,i,r,r[2],s?x(i,r[2],f,null):y(r[2]),null),G(e,a=A(o,[(!s||f&1&&t!==(t=H("text-sm [&_p]:leading-relaxed",r[0])))&&{class:t},f&2&&r[1]]))},i(r){s||(c(l,r),s=!0)},o(r){m(l,r),s=!1},d(r){r&&u(e),l&&l.d(r)}}}function st(n,e,t){const s=["class"];let i=P(e,s),{$$slots:l={},$$scope:o}=e,{class:a=void 0}=e;return n.$$set=r=>{e=w(w({},e),J(r)),t(1,i=P(e,s)),"class"in r&&t(0,a=r.class),"$$scope"in r&&t(2,o=r.$$scope)},[a,i,o,l]}class rt extends q{constructor(e){super(),T(this,e,st,lt,V,{class:0})}}function R(n){let e,t,s;const i=n[4].default,l=X(i,n,n[3],null);let o=[{class:t=H("mb-1 font-medium leading-none tracking-tight",n[0])},n[2]],a={};for(let r=0;r<o.length;r+=1)a=w(a,o[r]);return{c(){e=D(n[1]),l&&l.c(),this.h()},l(r){e=I(r,(n[1]||"null").toUpperCase(),{class:!0});var f=E(e);l&&l.l(f),f.forEach(u),this.h()},h(){te(n[1])(e,a)},m(r,f){d(r,e,f),l&&l.m(e,null),s=!0},p(r,f){l&&l.p&&(!s||f&8)&&Y(l,i,r,r[3],s?x(i,r[3],f,null):y(r[3]),null),te(r[1])(e,a=A(o,[(!s||f&1&&t!==(t=H("mb-1 font-medium leading-none tracking-tight",r[0])))&&{class:t},f&4&&r[2]]))},i(r){s||(c(l,r),s=!0)},o(r){m(l,r),s=!1},d(r){r&&u(e),l&&l.d(r)}}}function at(n){let e=n[1],t,s,i=n[1]&&R(n);return{c(){i&&i.c(),t=B()},l(l){i&&i.l(l),t=B()},m(l,o){i&&i.m(l,o),d(l,t,o),s=!0},p(l,[o]){l[1]?e?V(e,l[1])?(i.d(1),i=R(l),e=l[1],i.c(),i.m(t.parentNode,t)):i.p(l,o):(i=R(l),e=l[1],i.c(),i.m(t.parentNode,t)):e&&(i.d(1),i=null,e=l[1])},i(l){s||(c(i,l),s=!0)},o(l){m(i,l),s=!1},d(l){l&&u(t),i&&i.d(l)}}}function nt(n,e,t){const s=["class","level"];let i=P(e,s),{$$slots:l={},$$scope:o}=e,{class:a=void 0}=e,{level:r="h5"}=e;return n.$$set=f=>{e=w(w({},e),J(f)),t(2,i=P(e,s)),"class"in f&&t(0,a=f.class),"level"in f&&t(1,r=f.level),"$$scope"in f&&t(3,o=f.$$scope)},[a,r,i,o,l]}class it extends q{constructor(e){super(),T(this,e,nt,at,V,{class:0,level:1})}}const oe=Ue({base:"[&>svg]:text-foreground relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}});function ue(n){let e,t;return e=new it({props:{$$slots:{default:[ft]},$$scope:{ctx:n}}}),{c(){g(e.$$.fragment)},l(s){p(e.$$.fragment,s)},m(s,i){v(e,s,i),t=!0},p(s,i){const l={};i&5&&(l.$$scope={dirty:i,ctx:s}),e.$set(l)},i(s){t||(c(e.$$.fragment,s),t=!0)},o(s){m(e.$$.fragment,s),t=!1},d(s){h(e,s)}}}function ft(n){let e;return{c(){e=S(n[0])},l(t){e=Z(t,n[0])},m(t,s){d(t,e,s)},p(t,s){s&1&&_e(e,t[0])},d(t){t&&u(e)}}}function ce(n){let e,t;return e=new rt({props:{$$slots:{default:[ot]},$$scope:{ctx:n}}}),{c(){g(e.$$.fragment)},l(s){p(e.$$.fragment,s)},m(s,i){v(e,s,i),t=!0},p(s,i){const l={};i&6&&(l.$$scope={dirty:i,ctx:s}),e.$set(l)},i(s){t||(c(e.$$.fragment,s),t=!0)},o(s){m(e.$$.fragment,s),t=!1},d(s){h(e,s)}}}function ot(n){let e;return{c(){e=S(n[1])},l(t){e=Z(t,n[1])},m(t,s){d(t,e,s)},p(t,s){s&2&&_e(e,t[1])},d(t){t&&u(e)}}}function ut(n){let e,t,s,i,l;e=new ye({props:{class:"h-4 w-4"}});let o=n[0]&&ue(n),a=n[1]&&ce(n);return{c(){g(e.$$.fragment),t=L(),o&&o.c(),s=L(),a&&a.c(),i=B()},l(r){p(e.$$.fragment,r),t=F(r),o&&o.l(r),s=F(r),a&&a.l(r),i=B()},m(r,f){v(e,r,f),d(r,t,f),o&&o.m(r,f),d(r,s,f),a&&a.m(r,f),d(r,i,f),l=!0},p(r,f){r[0]?o?(o.p(r,f),f&1&&c(o,1)):(o=ue(r),o.c(),c(o,1),o.m(s.parentNode,s)):o&&(W(),m(o,1,1,()=>{o=null}),K()),r[1]?a?(a.p(r,f),f&2&&c(a,1)):(a=ce(r),a.c(),c(a,1),a.m(i.parentNode,i)):a&&(W(),m(a,1,1,()=>{a=null}),K())},i(r){l||(c(e.$$.fragment,r),c(o),c(a),l=!0)},o(r){m(e.$$.fragment,r),m(o),m(a),l=!1},d(r){r&&(u(t),u(s),u(i)),h(e,r),o&&o.d(r),a&&a.d(r)}}}function ct(n){let e,t;return e=new tt({props:{variant:"destructive",$$slots:{default:[ut]},$$scope:{ctx:n}}}),{c(){g(e.$$.fragment)},l(s){p(e.$$.fragment,s)},m(s,i){v(e,s,i),t=!0},p(s,[i]){const l={};i&7&&(l.$$scope={dirty:i,ctx:s}),e.$set(l)},i(s){t||(c(e.$$.fragment,s),t=!0)},o(s){m(e.$$.fragment,s),t=!1},d(s){h(e,s)}}}function mt(n,e,t){let{title:s=""}=e,{description:i=""}=e;return n.$$set=l=>{"title"in l&&t(0,s=l.title),"description"in l&&t(1,i=l.description)},[s,i]}class _t extends q{constructor(e){super(),T(this,e,mt,ct,V,{title:0,description:1})}}function me(n){let e,t,s,i,l,o;return t=new _t({props:{title:"Login failed.",description:n[0]}}),{c(){e=D("div"),g(t.$$.fragment)},l(a){e=I(a,"DIV",{});var r=E(e);p(t.$$.fragment,r),r.forEach(u)},m(a,r){d(a,e,r),v(t,e,null),i=!0,l||(o=M(e,"introend",n[7]),l=!0)},p(a,r){const f={};r&1&&(f.description=a[0]),t.$set(f)},i(a){i||(c(t.$$.fragment,a),a&&Ve(()=>{i&&(s||(s=se(e,fe,{delay:250,duration:300,x:0,y:-500,opacity:.5,easing:re},!0)),s.run(1))}),i=!0)},o(a){m(t.$$.fragment,a),a&&(s||(s=se(e,fe,{delay:250,duration:300,x:0,y:-500,opacity:.5,easing:re},!1)),s.run(0)),i=!1},d(a){a&&u(e),h(t),a&&s&&s.end(),l=!1,o()}}}function dt(n){let e;return{c(){e=S("Login")},l(t){e=Z(t,"Login")},m(t,s){d(t,e,s)},d(t){t&&u(e)}}}function $t(n){let e;return{c(){e=S("Enter your email below to login to your account.")},l(t){e=Z(t,"Enter your email below to login to your account.")},m(t,s){d(t,e,s)},d(t){t&&u(e)}}}function gt(n){let e,t,s,i,l,o=n[0]&&me(n);return t=new Te({props:{class:"text-2xl",$$slots:{default:[dt]},$$scope:{ctx:n}}}),i=new Oe({props:{$$slots:{default:[$t]},$$scope:{ctx:n}}}),{c(){o&&o.c(),e=L(),g(t.$$.fragment),s=L(),g(i.$$.fragment)},l(a){o&&o.l(a),e=F(a),p(t.$$.fragment,a),s=F(a),p(i.$$.fragment,a)},m(a,r){o&&o.m(a,r),d(a,e,r),v(t,a,r),d(a,s,r),v(i,a,r),l=!0},p(a,r){a[0]?o?(o.p(a,r),r&1&&c(o,1)):(o=me(a),o.c(),c(o,1),o.m(e.parentNode,e)):o&&(W(),m(o,1,1,()=>{o=null}),K());const f={};r&2048&&(f.$$scope={dirty:r,ctx:a}),t.$set(f);const _={};r&2048&&(_.$$scope={dirty:r,ctx:a}),i.$set(_)},i(a){l||(c(o),c(t.$$.fragment,a),c(i.$$.fragment,a),l=!0)},o(a){m(o),m(t.$$.fragment,a),m(i.$$.fragment,a),l=!1},d(a){a&&(u(e),u(s)),o&&o.d(a),h(t,a),h(i,a)}}}function pt(n){let e;return{c(){e=S("Email")},l(t){e=Z(t,"Email")},m(t,s){d(t,e,s)},d(t){t&&u(e)}}}function vt(n){let e,t,s,i,l;e=new be({props:{$$slots:{default:[pt]},$$scope:{ctx:n}}});const o=[n[10],{placeholder:"m@example.com"}];function a(f){n[8](f)}let r={};for(let f=0;f<o.length;f+=1)r=w(r,o[f]);return n[1].email!==void 0&&(r.value=n[1].email),s=new we({props:r}),de.push(()=>ge(s,"value",a)),{c(){g(e.$$.fragment),t=L(),g(s.$$.fragment)},l(f){p(e.$$.fragment,f),t=F(f),p(s.$$.fragment,f)},m(f,_){v(e,f,_),d(f,t,_),v(s,f,_),l=!0},p(f,_){const C={};_&2048&&(C.$$scope={dirty:_,ctx:f}),e.$set(C);const z=_&1024?A(o,[pe(f[10]),o[1]]):{};!i&&_&2&&(i=!0,z.value=f[1].email,$e(()=>i=!1)),s.$set(z)},i(f){l||(c(e.$$.fragment,f),c(s.$$.fragment,f),l=!0)},o(f){m(e.$$.fragment,f),m(s.$$.fragment,f),l=!1},d(f){f&&u(t),h(e,f),h(s,f)}}}function ht(n){let e,t,s,i;return e=new ve({props:{$$slots:{default:[vt,({attrs:l})=>({10:l}),({attrs:l})=>l?1024:0]},$$scope:{ctx:n}}}),s=new he({}),{c(){g(e.$$.fragment),t=L(),g(s.$$.fragment)},l(l){p(e.$$.fragment,l),t=F(l),p(s.$$.fragment,l)},m(l,o){v(e,l,o),d(l,t,o),v(s,l,o),i=!0},p(l,o){const a={};o&3074&&(a.$$scope={dirty:o,ctx:l}),e.$set(a)},i(l){i||(c(e.$$.fragment,l),c(s.$$.fragment,l),i=!0)},o(l){m(e.$$.fragment,l),m(s.$$.fragment,l),i=!1},d(l){l&&u(t),h(e,l),h(s,l)}}}function bt(n){let e;return{c(){e=S("Password")},l(t){e=Z(t,"Password")},m(t,s){d(t,e,s)},d(t){t&&u(e)}}}function wt(n){let e,t,s,i,l;e=new be({props:{$$slots:{default:[bt]},$$scope:{ctx:n}}});const o=[n[10],{type:"password"}];function a(f){n[9](f)}let r={};for(let f=0;f<o.length;f+=1)r=w(r,o[f]);return n[1].password!==void 0&&(r.value=n[1].password),s=new we({props:r}),de.push(()=>ge(s,"value",a)),{c(){g(e.$$.fragment),t=L(),g(s.$$.fragment)},l(f){p(e.$$.fragment,f),t=F(f),p(s.$$.fragment,f)},m(f,_){v(e,f,_),d(f,t,_),v(s,f,_),l=!0},p(f,_){const C={};_&2048&&(C.$$scope={dirty:_,ctx:f}),e.$set(C);const z=_&1024?A(o,[pe(f[10]),o[1]]):{};!i&&_&2&&(i=!0,z.value=f[1].password,$e(()=>i=!1)),s.$set(z)},i(f){l||(c(e.$$.fragment,f),c(s.$$.fragment,f),l=!0)},o(f){m(e.$$.fragment,f),m(s.$$.fragment,f),l=!1},d(f){f&&u(t),h(e,f),h(s,f)}}}function Ct(n){let e,t,s,i;return e=new ve({props:{$$slots:{default:[wt,({attrs:l})=>({10:l}),({attrs:l})=>l?1024:0]},$$scope:{ctx:n}}}),s=new he({}),{c(){g(e.$$.fragment),t=L(),g(s.$$.fragment)},l(l){p(e.$$.fragment,l),t=F(l),p(s.$$.fragment,l)},m(l,o){v(e,l,o),d(l,t,o),v(s,l,o),i=!0},p(l,o){const a={};o&3074&&(a.$$scope={dirty:o,ctx:l}),e.$set(a)},i(l){i||(c(e.$$.fragment,l),c(s.$$.fragment,l),i=!0)},o(l){m(e.$$.fragment,l),m(s.$$.fragment,l),i=!1},d(l){l&&u(t),h(e,l),h(s,l)}}}function kt(n){let e,t,s,i,l,o;return t=new ie({props:{form:n[2],name:"email",$$slots:{default:[ht]},$$scope:{ctx:n}}}),l=new ie({props:{form:n[2],name:"password",$$slots:{default:[Ct]},$$scope:{ctx:n}}}),{c(){e=D("div"),g(t.$$.fragment),s=L(),i=D("div"),g(l.$$.fragment),this.h()},l(a){e=I(a,"DIV",{class:!0});var r=E(e);p(t.$$.fragment,r),r.forEach(u),s=F(a),i=I(a,"DIV",{class:!0});var f=E(i);p(l.$$.fragment,f),f.forEach(u),this.h()},h(){k(e,"class","grid gap-2"),k(i,"class","grid gap-2")},m(a,r){d(a,e,r),v(t,e,null),d(a,s,r),d(a,i,r),v(l,i,null),o=!0},p(a,r){const f={};r&2050&&(f.$$scope={dirty:r,ctx:a}),t.$set(f);const _={};r&2050&&(_.$$scope={dirty:r,ctx:a}),l.$set(_)},i(a){o||(c(t.$$.fragment,a),c(l.$$.fragment,a),o=!0)},o(a){m(t.$$.fragment,a),m(l.$$.fragment,a),o=!1},d(a){a&&(u(e),u(s),u(i)),h(t),h(l)}}}function Et(n){let e;return{c(){e=S("Sign in")},l(t){e=Z(t,"Sign in")},m(t,s){d(t,e,s)},d(t){t&&u(e)}}}function Lt(n){let e,t;return e=new Ae({props:{class:"w-full",$$slots:{default:[Et]},$$scope:{ctx:n}}}),{c(){g(e.$$.fragment)},l(s){p(e.$$.fragment,s)},m(s,i){v(e,s,i),t=!0},p(s,i){const l={};i&2048&&(l.$$scope={dirty:i,ctx:s}),e.$set(l)},i(s){t||(c(e.$$.fragment,s),t=!0)},o(s){m(e.$$.fragment,s),t=!1},d(s){h(e,s)}}}function Ft(n){let e,t,s,i,l,o;return e=new qe({props:{$$slots:{default:[gt]},$$scope:{ctx:n}}}),s=new He({props:{class:"grid gap-4",$$slots:{default:[kt]},$$scope:{ctx:n}}}),l=new Ze({props:{$$slots:{default:[Lt]},$$scope:{ctx:n}}}),{c(){g(e.$$.fragment),t=L(),g(s.$$.fragment),i=L(),g(l.$$.fragment)},l(a){p(e.$$.fragment,a),t=F(a),p(s.$$.fragment,a),i=F(a),p(l.$$.fragment,a)},m(a,r){v(e,a,r),d(a,t,r),v(s,a,r),d(a,i,r),v(l,a,r),o=!0},p(a,r){const f={};r&2049&&(f.$$scope={dirty:r,ctx:a}),e.$set(f);const _={};r&2050&&(_.$$scope={dirty:r,ctx:a}),s.$set(_);const C={};r&2048&&(C.$$scope={dirty:r,ctx:a}),l.$set(C)},i(a){o||(c(e.$$.fragment,a),c(s.$$.fragment,a),c(l.$$.fragment,a),o=!0)},o(a){m(e.$$.fragment,a),m(s.$$.fragment,a),m(l.$$.fragment,a),o=!1},d(a){a&&(u(t),u(i)),h(e,a),h(s,a),h(l,a)}}}function Mt(n){let e,t,s,i,l,o;return s=new Be({props:{class:"w-full max-w-sm",$$slots:{default:[Ft]},$$scope:{ctx:n}}}),{c(){e=D("main"),t=D("form"),g(s.$$.fragment),this.h()},l(a){e=I(a,"MAIN",{class:!0});var r=E(e);t=I(r,"FORM",{method:!0});var f=E(t);p(s.$$.fragment,f),f.forEach(u),r.forEach(u),this.h()},h(){k(t,"method","POST"),k(e,"class","theme-zinc flex h-screen w-full items-center justify-center px-4")},m(a,r){d(a,e,r),Q(e,t),v(s,t,null),i=!0,l||(o=De(n[5].call(null,t)),l=!0)},p(a,[r]){const f={};r&2051&&(f.$$scope={dirty:r,ctx:a}),s.$set(f)},i(a){i||(c(s.$$.fragment,a),i=!0)},o(a){m(s.$$.fragment,a),i=!1},d(a){a&&u(e),h(s),l=!1,o()}}}function zt(n,e,t){let s,i;const l=Se(Je(ae(ne)),{SPA:!0,validators:ae(ne),onUpdate:async({form:b})=>{if(b.valid)try{await je.collection("users").authWithPassword(b.data.email,b.data.password)}catch{We(b,"Failed to authenticate.")}}}),{form:o,message:a,enhance:r}=l;le(n,o,b=>t(1,i=b)),le(n,a,b=>t(0,s=b));const f=()=>setTimeout(()=>{Ie(a,s=void 0,s)},3e3),_=()=>f();function C(b){n.$$.not_equal(i.email,b)&&(i.email=b,o.set(i))}function z(b){n.$$.not_equal(i.password,b)&&(i.password=b,o.set(i))}return[s,i,l,o,a,r,f,_,C,z]}class Tt extends q{constructor(e){super(),T(this,e,zt,Mt,V,{})}}export{Tt as component};
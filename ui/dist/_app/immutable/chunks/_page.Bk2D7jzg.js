import{s as P,e as v,t as _,a as j,o as p,c as y,b as g,d as h,f as r,g as E,i as f,h as m,n as d,p as O}from"./scheduler.Ch08FvRr.js";import{e as u}from"./each.BdZxddNF.js";import{S,i as q}from"./index.BhaZ9Ew-.js";function b(s,a,c){const t=s.slice();return t[3]=a[c],t}function C(s){let a,c=u(Object.keys(s[1])),t=[];for(let l=0;l<c.length;l+=1)t[l]=k(b(s,c,l));return{c(){for(let l=0;l<t.length;l+=1)t[l].c();a=p()},l(l){for(let n=0;n<t.length;n+=1)t[n].l(l);a=p()},m(l,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(l,n);f(l,a,n)},p(l,n){if(n&2){c=u(Object.keys(l[1]));let e;for(e=0;e<c.length;e+=1){const i=b(l,c,e);t[e]?t[e].p(i,n):(t[e]=k(i),t[e].c(),t[e].m(a.parentNode,a))}for(;e<t.length;e+=1)t[e].d(1);t.length=c.length}},d(l){l&&r(a),O(t,l)}}}function k(s){let a,c=s[1][s[3]].name+"",t,l,n=s[1][s[3]].type+"",e;return{c(){a=v("p"),t=_(c),l=_(": "),e=_(n)},l(i){a=y(i,"P",{});var o=g(a);t=h(o,c),l=h(o,": "),e=h(o,n),o.forEach(r)},m(i,o){f(i,a,o),m(a,t),m(a,l),m(a,e)},p:d,d(i){i&&r(a)}}}function H(s){let a,c=s[0].title+"",t,l,n,e=s[1]&&C(s);return{c(){a=v("h1"),t=_(c),l=j(),e&&e.c(),n=p()},l(i){a=y(i,"H1",{});var o=g(a);t=h(o,c),o.forEach(r),l=E(i),e&&e.l(i),n=p()},m(i,o){f(i,a,o),m(a,t),f(i,l,o),e&&e.m(i,o),f(i,n,o)},p(i,[o]){i[1]&&e.p(i,o)},i:d,o:d,d(i){i&&(r(a),r(l),r(n)),e&&e.d(i)}}}function N(s,a,c){let{data:t}=a;const{record:l,schema:n}=t;return s.$$set=e=>{"data"in e&&c(2,t=e.data)},[l,n,t]}class B extends S{constructor(a){super(),q(this,a,N,H,P,{data:2})}}export{B as P};
import{s as p,n as f,k as u}from"../chunks/scheduler.Ch08FvRr.js";import{S as d,i as g,c as _,a as C,m as b,t as $,b as h,d as k}from"../chunks/index.BhaZ9Ew-.js";import{g as w}from"../chunks/entry.R3-HADBB.js";import{D}from"../chunks/data-table-actions.Dq4QhH4G.js";import"../chunks/events.3g1COGhw.js";import"../chunks/index.CMiQGNHB.js";import{p as S}from"../chunks/stores.CSMJxhRn.js";function q(o){let a,n;return a=new D({props:{data:o[0],schema:o[1],showHeaderIcons:!1,title:"Collections",description:"All available collections",rowClickCallback:o[2]}}),{c(){_(a.$$.fragment)},l(t){C(a.$$.fragment,t)},m(t,s){b(a,t,s),n=!0},p:f,i(t){n||($(a.$$.fragment,t),n=!0)},o(t){h(a.$$.fragment,t),n=!1},d(t){k(a,t)}}}function y(o,a,n){let t;u(o,S,e=>n(4,t=e));let{data:s}=a;const{collections:i,schema:c}=s,l=(e,m)=>{var r;e.target.nodeName!=="TD"||!((r=e.target.closest("td"))!=null&&r.contains(e.target))||w(`${t.url.pathname}${m.name}`)};return o.$$set=e=>{"data"in e&&n(3,s=e.data)},[i,c,l,s]}class z extends d{constructor(a){super(),g(this,a,y,q,p,{data:3})}}export{z as component};

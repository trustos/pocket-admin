import{p as s}from"../chunks/index.CzV2kvgO.js";import{P as _}from"../chunks/_page.B2yKY9pz.js";const l=async({params:t,parent:a,fetch:r})=>{var n;const{collections:c}=await a(),e=c.find(o=>o.name===t.collectionName),i=((n=e==null?void 0:e.schema)==null?void 0:n.filter(o=>o.type==="relation").map(o=>o.name))||[];return{record:await s.collection(t.collectionName).getOne(t.recordId,{fetch:r,expand:i.join(",")}),schema:(e==null?void 0:e.schema)||[]}},p=Object.freeze(Object.defineProperty({__proto__:null,load:l},Symbol.toStringTag,{value:"Module"}));export{_ as component,p as universal};

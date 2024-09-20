import{c as C}from"./events.3g1COGhw.js";import{q as x,r as w,u as v,v as B}from"./scheduler.Ch08FvRr.js";function V(s,{delay:l=0,duration:c=400,easing:r=B}={}){const g=+getComputedStyle(s).opacity;return{delay:l,duration:c,easing:r,css:i=>`opacity: ${i*g}`}}function O(s,{delay:l=0,duration:c=400,easing:r=C,x:g=0,y:i=0,opacity:a=0}={}){const n=getComputedStyle(s),f=+n.opacity,o=n.transform==="none"?"":n.transform,t=f*(1-a),[p,u]=x(g),[y,$]=x(i);return{delay:l,duration:c,easing:r,css:(d,h)=>`
			transform: ${o} translate(${(1-d)*p}${u}, ${(1-d)*y}${$});
			opacity: ${f-t*h}`}}function b({fallback:s,...l}){const c=new Map,r=new Map;function g(a,n,f){const{delay:o=0,duration:t=e=>Math.sqrt(e)*30,easing:p=C}=w(w({},l),f),u=a.getBoundingClientRect(),y=n.getBoundingClientRect(),$=u.left-y.left,d=u.top-y.top,h=u.width/y.width,k=u.height/y.height,M=Math.sqrt($*$+d*d),m=getComputedStyle(n),q=m.transform==="none"?"":m.transform,S=+m.opacity;return{delay:o,duration:v(t)?t(M):t,easing:p,css:(e,_)=>`
				opacity: ${e*S};
				transform-origin: top left;
				transform: ${q} translate(${_*$}px,${_*d}px) scale(${e+(1-e)*h}, ${e+(1-e)*k});
			`}}function i(a,n,f){return(o,t)=>(a.set(t.key,o),()=>{if(n.has(t.key)){const p=n.get(t.key);return n.delete(t.key),g(p,o,t)}return a.delete(t.key),s&&s(o,t,f)})}return[i(r,c,!1),i(c,r,!0)]}export{O as a,b as c,V as f};

(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();async function h(i){const c=await(await fetch(i)).json(),o={floors:[]},e=[];return c.forEach(t=>{e.includes(t.om_terrain)||e.push(t.om_terrain)}),e.forEach(()=>o.floors.push([])),c.forEach(t=>{const s=e.indexOf(t.om_terrain);o.floors[s].push(t)}),o}function f(i,a,c){const o=document.createElement("div"),e=i.floors[a][c],t=e.object.rows[0].length,s=e.object.rows.length;for(let p=0;p<s;p+=1){const l=document.createElement("div");l.classList.add("row");for(let d=0;d<t;d+=1){const r=document.createElement("div");r.classList.add("tile"),r.dataset.x=d,r.dataset.y=p,r.textContent=`${e.object.rows[p][d]}`,l.append(r)}o.append(l)}return o}const n={blueprint:[],floor:0,variant:0};async function v(i){n.blueprint=await h(i);const a=document.createElement("button");a.textContent="Back to list",a.addEventListener("click",()=>{window.location.reload()});const c=document.createElement("section"),o=document.createElement("div");o.id="map-viewer";const e=document.createElement("div");return e.id="map-floors",n.blueprint.floors.reverse().forEach((t,s)=>{const p=t[0].om_terrain,l=document.createElement("div");l.classList.add("floor-btn-div"),l.style.zIndex=s*-1;const d=document.createElement("p");d.classList.add("floor-om-terrain"),d.textContent=`${typeof p=="string"?p:`[${p.toString().split(",").join("] [")}]`}`;const r=document.createElement("div");if(r.classList.add("floor-btn"),r.value=d.textContent,r.value.includes("_roof")&&r.classList.add("roof"),r.value.includes("_basement")&&r.classList.add("basement"),r.addEventListener("click",()=>{n.floor=s,n.variant=0,o.replaceChildren(f(n.blueprint,n.floor,n.variant))}),l.append(r,d),t.length>1){const u=document.createElement("div");u.classList.add("floor-btn-next"),u.textContent=">";const m=document.createElement("div");m.classList.add("floor-btn-prev"),m.textContent="<",u.addEventListener("click",()=>{n.floor!==s&&(n.variant=0),n.floor=s,n.variant+=1,t[n.variant]||(n.variant=0),o.replaceChildren(f(n.blueprint,n.floor,n.variant))}),m.addEventListener("click",()=>{n.floor=s,n.variant-=1,t[n.variant]||(n.variant=t.length-1),o.replaceChildren(f(n.blueprint,n.floor,n.variant))}),l.append(u,m)}e.append(l)}),o.append(f(n.blueprint,n.floor,n.variant)),c.append(a,o,e),c}const g=document.querySelector("#app");function E(){const i=document.createElement("main"),a=document.createElement("h1");a.textContent="BN Maps";const c=document.createElement("ul");return["./json/mapgen/house/2storymodern01.json","./json/mapgen/house/bungalow01.json","./json/mapgen/house/garden_house_1.json","./json/mapgen/house/house_garage_prepper.json","./json/mapgen/house/urban_1_house.json"].forEach(e=>{const t=document.createElement("li");t.textContent=e.split("/").at(-1).split(".json").at(0),t.addEventListener("click",async()=>{g.replaceChildren(await v(e))}),c.append(t)}),i.append(a,c),i}const b=document.querySelector("#app");b.append(E());
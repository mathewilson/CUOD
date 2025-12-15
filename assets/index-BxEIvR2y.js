(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const d="/CUOD/cu-logo.svg",f=({image:e,title:r})=>`
    <div style="background-image: url(${e})" class="bg-cover h-64 relative" >
      <div class="bg-cover h-64 w-full absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
      <div class="absolute bottom-0 left-0 h-16 m-5 flex items-center">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
          <img src="${d}" alt="Cardiff University Logo" class="h-16 w-auto" />
        </a>
        <div class="text-cardiff-light text-4xl m-5">${r}</div>
      </div>
    </div>`,m=e=>`
    <div class="mr-5">
      ${e.map(r=>`<a href="#${r.menuId}"><div class="py-1 w-64 border-y hover:bg-cardiff-light">${r.title}</div></a>`).join("")}
    </div>
  `,a=e=>new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),u=e=>{const r=[];return e.forEach(t=>{const s=r.find(i=>i.indexTitle===t.title.toLowerCase());s?s.events.push(t):r.push({indexTitle:t.title.toLowerCase(),title:t.title,events:[t]})}),r},p=({image:e,name:r,id:t,description:s,programs:i})=>{const o=u(i);return`
    <div class="bg-cardiff-light p-5 mb-5 cursor-pointer" id="${t}"} onClick="(() => document.getElementById('${t}-events')?.classList.toggle('hidden'))()"> 
      <div class="flex row">
        <img src=${e} class="w-64 min-w-64 h-32 min-h-32 object-cover" />
        <div class="flex flex-col text-left ml-5">
          <div class="text-cardiff-red text-2xl">${r}</div>
          <div class >${s}</div>
        </div>
      </div>
      <div id="${t}-events" class="text-left text-sm mt-5 hidden">
        <ul class="list-inside">
        ${o.map(n=>`
            <li class="text-cardiff-dark font-semibold">${n.title}
            <ul class="list-disc list-inside pl-5 font-normal">${n.events.map(l=>`<li>${a(l.startTime)} - ${a(l.endTime)} ${l.location?`(${l.location?.trim()})`:""}</li>`).join("")}</ul>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `};async function g(){return await(await fetch("/CUOD/api/OpenDay.json")).json()}function c(e){return e.toLowerCase().replace(/\s+/g,"_").replace(/\W/g,"")}function v(e){const r=document.querySelector("#app");if(!e.topics){r.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}r.innerHTML=`
    ${f({image:e.cover_image,title:`${e.description} (${new Date(e.start_time).toDateString()})`})}
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6 flex">
      ${m(e.topics.map(t=>{const s=t.name.trim()||"";return{title:s,menuId:c(s)}}))}
      <div class="flex flex-col">
        ${e.topics.map(t=>p({image:t.cover_image,name:t.name.trim(),id:c(t.name.trim()),description:t.description,programs:t.programs.map(s=>({title:s.title,startTime:s.start_time,endTime:s.end_time,location:s.room}))})).join("")}
  `}g().then(v);

var g=Object.defineProperty;var m=(a,e,t)=>e in a?g(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var o=(a,e,t)=>(m(a,typeof e!="symbol"?e+"":e,t),t);import{B as c,L as p,F as i}from"./index-Ii5aEt4b.js";import{d as l,p as r,h as d}from"./tagViews-DedelOwa.js";import{H as _}from"./HeaderView-B9LUBlYR.js";import"./ButtonView-lHwLKsY_.js";const h="_button_1hrlf_1",u="_primary_1hrlf_18",w="_disabled_1hrlf_25",S={button:h,primary:u,disabled:w};class f extends c{constructor(e){super({tagName:"button",className:S.button,textContent:"Start game"}),typeof e=="string"&&(this.element.dataset.navigate=e)}}const b="_h1_86pcw_1",C="_pageMain_86pcw_6",F="_page_86pcw_6",v="_description_86pcw_25",N="_greeting_86pcw_25",n={h1:b,pageMain:C,page:F,description:v,greeting:N};class M extends c{constructor(){const t=l(n.pageMain,void 0,d(n.h1,"RSS Puzzle"),r(n.description,"RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Put words in the right order to make correct sentences."),new f("game"));super({tagName:"div",className:n.page},void 0,new _,t);o(this,"mainContent");this.mainContent=t,this.showCredentialsFromLocalStorage()}showCredentialsFromLocalStorage(){const t=localStorage.getItem(p.FormData);if(t){const s=JSON.parse(t);this.mainContent.addChildrenComponents("begin",r(n.greeting,`Hello, ${s[i.FirstName]} ${s[i.Surname]}!`))}}}export{M as default};

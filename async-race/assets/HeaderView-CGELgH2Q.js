import{B as s}from"./index-O9cDETt7.js";const u=(t,e)=>new s({tagName:"h1",className:t,textContent:e}),h=(t,...e)=>new s({tagName:"div",className:t},...e),p=(t,...e)=>new s({tagName:"main",className:t},...e),_=(t,e)=>new s({tagName:"p",className:e,textContent:t}),N=(t,e)=>new s({tagName:"svg",className:e,innerHTML:t}),d="_button_idwge_1",c="_primary_idwge_18",m="_secondary_idwge_35",l={button:d,primary:c,secondary:m};class r extends s{constructor(e,a,n,o,i){super({tagName:"button",type:a,textContent:n,className:`${e} ${l.button}`,disabled:i}),o&&(this.element.dataset.navigate=o)}setParameters(e){super.setParameters(e);const{type:a,disabled:n}=e;a&&(this.element.type=a),n&&(this.element.disabled=n)}disable(){this.element.disabled=!0}enable(){this.element.disabled=!1}}const w="_header_zwwew_1",g={header:w};class y extends s{constructor(){super({tagName:"header",className:g.header},new r("","button","To garage","#"),new r("","button","Winners table","winners"))}}export{r as B,y as H,h as d,u as h,p as m,_ as p,N as s};

import{B as i,F as u,L as _}from"./index-Ii5aEt4b.js";import{B as b}from"./ButtonView-lHwLKsY_.js";import{d as m,h}from"./tagViews-DedelOwa.js";const y={},L={click(e){e.isTrusted&&e.stopPropagation()}};class v extends b{constructor(t,s){super(y.button,"submit","Login",t,s,L)}}const w="_label_1gl31_1",x={label:w};class p extends i{constructor(t){super({tagName:"label",textContent:t,className:x.label})}}const F="_input_l77g7_1",V={input:F},N="_message_vyh4y_1",T="_active_vyh4y_26",o={message:N,active:T},S={input:e=>{if(e.currentTarget instanceof HTMLInputElement){const t=e.currentTarget,s=t.nextElementSibling;s&&(t.validity.valid?(s.textContent="",s.classList.remove(o.active)):t.validity.tooShort?(s.textContent=`${t.name||"Value"} must contain at least ${t.minLength} characters, you typed ${t.value.length}.`,s.classList.add(o.active)):t.validity.patternMismatch&&(s.textContent=`${t.name||"Value"} must start with uppercase letter and contain only English letters or '-'.`,s.classList.add(o.active)))}}};class d extends i{constructor(t,s,r,a,n){super({tagName:"input",className:V.input,type:t,name:s,required:r,minLength:a,pattern:n},S)}setParameters(t){super.setParameters(t);const{type:s,name:r,required:a,minLength:n,pattern:l}=t;s&&(this.element.type=s),r&&(this.element.name=r),a&&(this.element.required=a),n&&(this.element.minLength=n),l&&(this.element.pattern=l)}}class g extends i{constructor(){super({tagName:"div",className:o.message})}}const $="_button_1ssdt_1",E="_primary_1ssdt_18",C="_disabled_1ssdt_25",k="_form_1ssdt_36",B="_inputWrapper_1ssdt_50",c={button:$,primary:E,disabled:C,form:k,inputWrapper:B},M={submit(e){if(e.preventDefault(),e.currentTarget instanceof HTMLFormElement){if(!e.currentTarget.checkValidity())return;const t=e.currentTarget.querySelectorAll("input"),s={},r=[...t].reduce((a,n)=>(a[n.name]=n.value,a),s);localStorage.setItem(_.FormData,JSON.stringify(r)),e instanceof SubmitEvent&&e.submitter&&e.submitter.click()}},change(e){if(e.currentTarget instanceof HTMLFormElement&&e.currentTarget.checkValidity()){const t=e.currentTarget.querySelector('button[type="submit"]');t instanceof HTMLButtonElement&&(t.disabled=!1)}}};class P extends i{constructor(){super({tagName:"form",className:c.form,novalidate:!0},M,m(c.inputWrapper,void 0,new p("First Name"),new d("text",u.FirstName,!0,3,"[A-Z]{1}[a-z\\-]{2,}"),new g),m(c.inputWrapper,void 0,new p("Surname"),new d("text",u.Surname,!0,4,"[A-Z]{1}[a-z\\-]{3,}"),new g),new v("#",!0))}setParameters(t){super.setParameters(t);const{novalidate:s}=t;s&&(this.element.noValidate=s)}}const W="_h1_3bb0a_1",q="_page_3bb0a_6",f={h1:W,page:q};class I extends i{constructor(){super({tagName:"div",className:f.page},void 0,h(f.h1,"RSS Puzzle"),new P)}}export{I as default};

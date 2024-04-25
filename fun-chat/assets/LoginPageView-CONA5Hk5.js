var c=Object.defineProperty;var g=(n,s,t)=>s in n?c(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;var i=(n,s,t)=>(g(n,typeof s!="symbol"?s+"":s,t),t);import{B as r,p as d,C as u,W as w,a as m,E as b,e as f}from"./index-CHDHNAJZ.js";import{I as a}from"./InputView-SSld5dbV.js";const C="_form_hlrtd_1",L={form:C},_="_label_xewfv_1",x="_errorMsg_xewfv_8",l={label:_,errorMsg:x};class p extends r{constructor(t,e){super({className:l.label,tagName:"label",textContent:t},e);i(this,"errorMsg");i(this,"inputComp");this.inputComp=e,this.errorMsg=d("",l.errorMsg),this.addChildrenComponents("end",this.errorMsg),this.initListeners()}setParameters(t){super.setParameters(t);const{htmlFor:e}=t;e&&(this.element.htmlFor=e)}initListeners(){this.element.addEventListener(u.FormInput,()=>{if(this.inputComp.checkValid())this.errorMsg.setTextContent("");else{let t="";this.inputComp.checkTooShort()&&(t+=`${this.inputComp.getName()[0].toUpperCase()+this.inputComp.getName().slice(1)||"Value"} must contain at least ${this.inputComp.getMinLength()} characters, you typed ${this.inputComp.getValue().length}.`),this.inputComp.checkPatternMismatch()&&(t+=t?"<br>":"",t+=this.inputComp.patternMessage),this.errorMsg.setInnerHTML(t)}})}}class I extends r{constructor(){super({tagName:"form",className:L.form,novalidate:!0});i(this,"loginInput");i(this,"passwordInput");i(this,"loginButton");i(this,"socket",w.getInstance());this.loginInput=new a({type:"text",name:"login",required:!0,pattern:"^[0-9A-Za-z\\-_]{3,16}$",minLength:3},"Login must contain only English letters, digits, hyphen or underscore (max 15 symbols)"),this.passwordInput=new a({type:"password",name:"password",required:!0,pattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",minLength:8},"Password must contain at least 1 uppercase and 1 lowercase English letter and a digit"),this.loginButton=new m({type:"submit",textContent:"Log in",disabled:!0}),this.addChildrenComponents("end",new p("Login",this.loginInput),new p("Password",this.passwordInput),this.loginButton),this.initListeners()}setParameters(t){super.setParameters(t);const{novalidate:e}=t;e&&(this.element.noValidate=e)}initListeners(){this.initSubmitListener(),this.initFormInputListener()}initSubmitListener(){this.element.addEventListener(b.Submit,t=>{t.preventDefault();const e=this.loginInput.getValue(),h=this.passwordInput.getValue();this.socket.sendLoginRequest(e,h)})}initFormInputListener(){this.element.addEventListener(u.FormInput,()=>{this.element.checkValidity()?this.loginButton.getElement().disabled=!1:this.loginButton.getElement().disabled=!0})}}const v="_page_6wqxl_1",M="_formWrapper_6wqxl_18",V="_aboutButton_6wqxl_23",o={page:v,formWrapper:M,aboutButton:V};class N extends r{constructor(){super({tagName:"div",className:o.page},f(o.formWrapper,new I),new m({type:"button",textContent:"About the app",className:o.aboutButton},"about"))}}export{N as default};

(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[96,41,108,110,148,165,168,220],{143:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n);t.default=function(e){var t=e.error,a=(e.type,e.messages);return t?r.a.createElement("span",{className:"text-danger fs-14"},a[t.type]?a[t.type]:"Error in field"):null}},347:function(e,t,a){"use strict";a.r(t),a.d(t,"NormalButton",(function(){return u}));var n=a(106),r=a(107),l=a(239),i=a(238),c=a(1),o=a.n(c),s=a(786),u=(a(633),function(e){Object(l.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.className,a=void 0===t?"":t,n=e.label,r=void 0===n?"":n,l=e.onClick,i=e.id,c=e.addBnt,u=e.profileCreatNext,d=e.profileCreatNext1,m=e.profileCreatBack,f=e.uploadBrowseBtn,v=e.authButton1,p=e.type,E=void 0===p?"submit":p,g=e.disabled,b=void 0!==g&&g,A=e.authButton,h=void 0!==A&&A,N=e.loginButton,B=void 0!==N&&N,y=e.loginButton1,C=void 0!==y&&y,S=e.tableBtn,k=void 0!==S&&S,x=e.rightIcon,T=void 0===x?"":x,w=e.leftIcon,D=void 0===w?"":w,j=e.btnSecondary,q=void 0!==j&&j,L=e.profileBtn,M=void 0!==L&&L,O=e.outlineBtn,I=void 0!==O&&O,F=e.cancel,R=void 0!==F&&F,Q=e.addProductbtn,_=void 0!==Q&&Q,z=e.isLoading,H=void 0!==z&&z;return o.a.createElement("div",null,o.a.createElement("button",{id:i,type:E,className:"cursor-pointer \n                     ".concat(h?"authButton":"","\n                     ").concat(u?"profileCreatNext":"","\n                     ").concat(d?"profileCreatNext1":"","\n                     ").concat(v?"authButton1":"","\n                     ").concat(m?"profileCreatBack":"","\n                     ").concat(B?"loginButton":"","\n                     ").concat(C?"loginButton1":"","\n                     ").concat(c?"addBnt":"","\n                     ").concat(k?"tableBtn":"","\n                     ").concat(q?"btnSecondary":"","\n                     ").concat(M?"profileBtn":"","\n                     ").concat(I?"outlineBtn":"","\n                     ").concat(R?"cancelBtn ":"","\n                     ").concat(_?"addProductbtn ":"","\n                     ").concat(f?"uploadBrowseBtn ":"","\n                     ").concat(a),onClick:l,disabled:b||H},H?o.a.createElement("span",{className:"btn-loader  "}," ",o.a.createElement(o.a.Fragment,null,o.a.createElement(s.a,{color:"#ffffff",height:20,width:20})),o.a.createElement(o.a.Fragment,null,o.a.createElement("span",{className:"m-3"},"Loading")," ")):o.a.createElement(o.a.Fragment,null,""!==D?o.a.createElement("span",{className:"btn-left-icon ".concat(D)}):null,r,""!==T?o.a.createElement("span",{className:"btn-right-icon ".concat(T)}):null)))}}]),a}(c.Component));t.default=u},348:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(770);a(635);t.default=function(e){var t=e.placeholder,a=void 0===t?"":t,n=e.register,i=void 0===n?{}:n,c=e.value,o=void 0===c?"":c,s=e.type,u=void 0===s?"text":s,d=e.onChange,m=e.name,f=void 0===m?"":m,v=(e.maxlength,e.icons,e.GB,e.onWheel,e.grayedBox),p=void 0!==v&&v,E=e.Iconic,g=void 0!==E&&E,b=e.disabled,A=void 0!==b&&b,h=e.maxLength,N=e.Search,B=void 0!==N&&N;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input_head"},r.a.createElement("input",{disabled:A,name:f,placeholder:a,className:p?"inputBoxGrayed":g?"inputBoxStyle1":"inputBoxStyle",ref:i,defaultValue:o,type:u,maxLength:h,onWheel:function(e){return e.currentTarget.blur()},onChange:function(e){var t={target:{name:e.target.name,value:e.target.value}};d&&d(t)},autoComplete:"off"}),g&&B?r.a.createElement("i",{className:"search_icon"},r.a.createElement(l.b,{size:18,style:{color:"#7E7E7E"}})):""))}},367:function(e,t,a){"use strict";a.r(t);var n=a(767),r=a(1),l=a.n(r),i=(a(653),a(770)),c=a(23),o=a(347),s=a(660),u=a.n(s),d=a(766),m=a(143),f=a(348);t.default=function(e){var t=e.setCourse,a=e.forms,r=e.setForms,s=Object(d.b)({mode:"onChange"}),v=s.register,p=s.handleSubmit,E=s.errors;s.control,s.setValue,s.reset;console.log("formskdsbcksdbh :>> ",a);var g=function(e,t,l,i){var c=Object(n.a)(a);c[e].subSections[t][l]=i,r(c)},b=function(){console.log("Form Data:",a)};return l.a.createElement("div",{className:"px-5 py-3 Add_knowledge"},l.a.createElement("div",{className:"row align-items-center justify-content-between mb-4"},l.a.createElement("div",{className:" col-4 d-flex my-3 align-items-center"},l.a.createElement("i",{className:"pr-3"},l.a.createElement(i.a,{size:28,onClick:function(){return c.history.goBack()},style:{cursor:"pointer"}})),l.a.createElement("p",{className:"m-0"},"Course Modules")),l.a.createElement("div",{className:"col-2"},l.a.createElement(o.default,{className:"authButton1",label:"Add Title",onClick:function(){r([].concat(Object(n.a)(a),[{mainTitle:"",subSections:[{title:"",durationHr:"",durationMin:"",link:""}]}]))}}))),l.a.createElement("form",{onSubmit:function(){p(b),t(!1)}},l.a.createElement("div",{className:"course-form p-5 mt-2"},a.map((function(e,t){return l.a.createElement("div",{key:t},l.a.createElement("div",{className:"row align-items-center mb-5"},l.a.createElement("div",{className:"col-9"},l.a.createElement("label",null,"Title"),l.a.createElement(f.default,{className:"add_staff",type:"text",placeholder:"Enter Title",value:e.mainTitle,onChange:function(e){return function(e,t){var l=Object(n.a)(a);l[e].mainTitle=t,r(l)}(t,e.target.value)},ref:v({required:"Title is Required",pattern:{value:/^(?!\s*$).+/,message:"Title is Invalid"}})}),l.a.createElement(m.default,{error:E["forms[".concat(t,"].mainTitle")]})),l.a.createElement("div",{className:"col-3"},l.a.createElement(o.default,{className:"loginButton",label:"Add Sub section",onClick:function(){return function(e){var t=Object(n.a)(a);t[e].subSections.push({title:"",durationHr:"",durationMin:"",link:""}),r(t)}(t)}}))),e.subSections.map((function(e,a){return l.a.createElement("div",{key:a,className:"sub-section p-3 mb-3"},l.a.createElement("div",{className:"col-10"},l.a.createElement("label",null,"Sub Section Title"),l.a.createElement(f.default,{className:"add_staff",type:"text",placeholder:"Enter Sub Section Title",value:e.title,onChange:function(e){return g(t,a,"title",e.target.value)},ref:v({required:"Sub Section Title is Required",pattern:{value:/^(?!\s*$).+/,message:"Sub Section Title is Invalid"}})}),l.a.createElement(m.default,{error:E["forms[".concat(t,"].subSections[").concat(a,"].title")]})),l.a.createElement("div",{className:"row mt-2 p-3"},l.a.createElement("div",{className:"col-2"},l.a.createElement("label",null,"Duration (in hr)"),l.a.createElement(f.default,{className:"add_staff",type:"text",placeholder:"(in hr)",name:"durationHrs",onChange:function(e){return g(t,a,"durationHr",e.target.value)},errors:E,register:v({required:!0,pattern:/^(?!\s*$).+/})}),l.a.createElement(m.default,{error:E.durationHrs,messages:{required:"Duration is Required",pattern:"Duration is Invalid"}})),l.a.createElement("div",{className:"col-2"},l.a.createElement("label",null,"Duration ( in min)"),l.a.createElement(f.default,{className:"add_staff",type:"text",placeholder:"( in min)",name:"durationMins",onChange:function(e){return g(t,a,"durationMin",e.target.value)},errors:E,register:v({required:!0,pattern:/^(?!\s*$).+/})}),l.a.createElement(m.default,{error:E.durationMins,messages:{required:"Duration is Required",pattern:"Duration is Invalid"}})),l.a.createElement("div",{className:"col-6"},l.a.createElement("label",null,"Link"),l.a.createElement(f.default,{className:"add_staff",type:"text",placeholder:"Enter Link",name:"link",onChange:function(e){return g(t,a,"link",e.target.value)},errors:E,register:v({required:!0,pattern:/^(?!\s*$).+/})}),l.a.createElement(m.default,{error:E.link,messages:{required:"Link is Required",pattern:"Link is Invalid"}}))),l.a.createElement("div",{className:"sub-section-overlay"},l.a.createElement("img",{src:u.a,alt:"Close"})))})))})),l.a.createElement("div",{className:"cource-form-overlay"},l.a.createElement("img",{src:u.a,alt:"Close"}))),l.a.createElement("div",null,l.a.createElement(o.default,{className:"loginButton",label:"Submit",type:"submit"}))))}},633:function(e,t,a){},635:function(e,t,a){},653:function(e,t,a){},660:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACISURBVHgB7ZZRDoAgDEMbLyQ34ig7OhKDPySidMBi3Ev4XFsCjAGO4zyzg0dTexLzSnkJ+pFSG0GyF4FEhJCqNoBEiBBMzTDB4eY9wtPM3xhMN28ZLTO/C7HUvBWCMt/wQUyPwPQSmj5D00Zk2opNP6OgEKpD0INJBL+LK0SEEs1YRQ8ijvMfDp3reWgb8yhDAAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=96.29e99f60.chunk.js.map
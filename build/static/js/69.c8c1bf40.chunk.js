/*! For license information please see 69.c8c1bf40.chunk.js.LICENSE.txt */
(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[69,22,92,93,94,137,141,145,149,152,179,182,183],{153:function(e,t,n){"use strict";n.r(t);var a=n(44),r=n(81),o=n(0),c=n.n(o),i=n(339),l=n(231),s=n.n(l),u=n(337),m=n(745),d=n(336),p=(n(650),n(28)),f=n(740),h=n(338);function v(){v=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,a=Object.defineProperty||function(e,t,n){e[t]=n.value},r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",c=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(L){l=function(e,t,n){return e[t]=n}}function s(e,t,n,r){var o=t&&t.prototype instanceof d?t:d,c=Object.create(o.prototype),i=new C(r||[]);return a(c,"_invoke",{value:N(e,n,i)}),c}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(L){return{type:"throw",arg:L}}}e.wrap=s;var m={};function d(){}function p(){}function f(){}var h={};l(h,o,(function(){return this}));var g=Object.getPrototypeOf,y=g&&g(g(O([])));y&&y!==t&&n.call(y,o)&&(h=y);var E=f.prototype=d.prototype=Object.create(h);function b(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function x(e,t){var r;a(this,"_invoke",{value:function(a,o){function c(){return new t((function(r,c){!function a(r,o,c,i){var l=u(e[r],e,o);if("throw"!==l.type){var s=l.arg,m=s.value;return m&&"object"==typeof m&&n.call(m,"__await")?t.resolve(m.__await).then((function(e){a("next",e,c,i)}),(function(e){a("throw",e,c,i)})):t.resolve(m).then((function(e){s.value=e,c(s)}),(function(e){return a("throw",e,c,i)}))}i(l.arg)}(a,o,r,c)}))}return r=r?r.then(c,c):c()}})}function N(e,t,n){var a="suspendedStart";return function(r,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw o;return j()}for(n.method=r,n.arg=o;;){var c=n.delegate;if(c){var i=w(c,n);if(i){if(i===m)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var l=u(e,t,n);if("normal"===l.type){if(a=n.done?"completed":"suspendedYield",l.arg===m)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a="completed",n.method="throw",n.arg=l.arg)}}}function w(e,t){var n=t.method,a=e.iterator[n];if(void 0===a)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,w(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var r=u(a,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,m;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,m):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function B(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function C(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function O(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,r=function t(){for(;++a<e.length;)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:j}}function j(){return{value:void 0,done:!0}}return p.prototype=f,a(E,"constructor",{value:f,configurable:!0}),a(f,"constructor",{value:p,configurable:!0}),p.displayName=l(f,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,f):(e.__proto__=f,l(e,i,"GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},b(x.prototype),l(x.prototype,c,(function(){return this})),e.AsyncIterator=x,e.async=function(t,n,a,r,o){void 0===o&&(o=Promise);var c=new x(s(t,n,a,r),o);return e.isGeneratorFunction(n)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},b(E),l(E,i,"Generator"),l(E,o,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var a in t)n.push(a);return n.reverse(),function e(){for(;n.length;){var a=n.pop();if(a in t)return e.value=a,e.done=!1,e}return e.done=!0,e}},e.values=O,C.prototype={constructor:C,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(B),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(n,a){return c.type="throw",c.arg=e,t.next=n,a&&(t.method="next",t.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],c=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),B(n),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var a=n.completion;if("throw"===a.type){var r=a.arg;B(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:O(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),m}},e}t.default=function(){var e=Object(m.b)({mode:"onChange"}),t=(e.register,e.handleSubmit,e.errors),n=(e.reset,e.setError,Object(o.useState)(1)),l=Object(r.a)(n,2),g=l[0],y=(l[1],Object(o.useState)(1)),E=Object(r.a)(y,2),b=(E[0],E[1]),x=Object(o.useState)([{templateId:"51322",status:"inactive",messagetype:"Template Message",messagetitle:"open source",messageDescription:"Nemo dolorem eum aliquam non."},{templateId:"51322",status:"active",messagetype:"Template Message",messagetitle:"source",messageDescription:"Nemo dolorem eum aliquam non."},{templateId:"51322",status:"active",messagetype:"Template Message",messagetitle:"open source",messageDescription:"Nemo dolorem eum aliquam non."},{templateId:"51322",status:"active",messagetype:"Template Message",messagetitle:" edge",messageDescription:"Nemo dolorem eum aliquam non."},{templateId:"51322",status:"active",messagetype:"Template Message",messagetitle:"source",messageDescription:"Nemo dolorem eum aliquam non."}]),N=Object(r.a)(x,2),w=N[0],k=(N[1],Object(o.useState)("")),B=Object(r.a)(k,2),C=B[0];B[1];return Object(o.useEffect)((function(){(function(){var e=Object(a.a)(v().mark((function e(){return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("https://jsonplaceholder.typicode.com/posts");case 3:e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}})()()}),[]),c.a.createElement(o.Fragment,null,c.a.createElement("div",{className:"staff_table px-5 pt-2"},c.a.createElement("p",{className:"staff_title m-0"},"Template Management"),c.a.createElement("div",{className:"row align-items-center px-3"},c.a.createElement("div",{className:"col-md-10 col-12"},c.a.createElement("div",{className:"row align-items-center"},c.a.createElement("div",{className:"col-md-4 p-0 my-4 staff_Search"},c.a.createElement(u.default,{className:"login_input",type:"text",placeholder:"Search by Template Id, Message Title",errors:t,name:"search",Iconic:!0,value:C}),c.a.createElement("i",{className:"search_iconic"},c.a.createElement(f.b,{size:18,style:{color:"#7E7E7E"}}))),c.a.createElement("div",{className:"col-md-3"},c.a.createElement(h.default,{placeholder:"Filter by Message Type"})))),c.a.createElement("div",{className:"col-md-2 col-12 p-0 m-0"},c.a.createElement(d.default,{className:"loginButton",label:"Add Template ",onClick:function(){return p.history.push("/admin/template-management/add-template")}}))),c.a.createElement("div",{className:""},w.length>0?c.a.createElement(i.default,{data:w,isCheck:!0,EditAction:!0,DeleteAction:!0,includedKeys:[{label:"Template Id",value:"templateId"},{label:"Status",value:"status"},{label:"Message Type",value:"messagetype"},{label:"Message Title",value:"messagetitle"},{label:"Message Description",value:"messageDescription"}],pageCount:g,onPageChange:function(e){b(e)},setCurrentPage:b,editRouteName:"/admin/template-management/add-template"}):c.a.createElement("p",{className:"text-center mt-5 fs-15"},"No Data Available")),console.log(w,"kkhkk")))}},336:function(e,t,n){"use strict";n.r(t),n.d(t,"NormalButton",(function(){return s}));var a=n(100),r=n(101),o=n(230),c=n(229),i=n(0),l=n.n(i),s=(n(609),function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var e=this.props,t=e.className,n=void 0===t?"":t,a=e.label,r=void 0===a?"":a,o=e.onClick,c=e.id,i=e.addBnt,s=e.profileCreatNext,u=e.profileCreatNext1,m=e.profileCreatBack,d=e.authButton1,p=e.type,f=void 0===p?"submit":p,h=e.disabled,v=void 0!==h&&h,g=e.authButton,y=void 0!==g&&g,E=e.loginButton,b=void 0!==E&&E,x=e.tableBtn,N=void 0!==x&&x,w=e.rightIcon,k=void 0===w?"":w,B=e.leftIcon,C=void 0===B?"":B,O=e.btnSecondary,j=void 0!==O&&O,L=e.profileBtn,_=void 0!==L&&L,S=e.outlineBtn,I=void 0!==S&&S,T=e.cancel,A=void 0!==T&&T,F=e.addProductbtn,P=void 0!==F&&F;return l.a.createElement("div",null,l.a.createElement("button",{id:c,type:f,className:"cursor-pointer \n                     ".concat(y?"authButton":"","\n                     ").concat(s?"profileCreatNext":"","\n                     ").concat(u?"profileCreatNext1":"","\n                     ").concat(d?"authButton1":"","\n                     ").concat(m?"profileCreatBack":"","\n                     ").concat(b?"loginButton":"","\n                     ").concat(i?"addBnt":"","\n                     ").concat(N?"tableBtn":"","\n                     ").concat(j?"btnSecondary":"","\n                     ").concat(_?"profileBtn":"","\n                     ").concat(I?"outlineBtn":"","\n                     ").concat(A?"cancelBtn ":"","\n                     ").concat(P?"addProductbtn ":"","\n                   \n                     ").concat(n),onClick:o,disabled:v},""!==C?l.a.createElement("span",{className:"btn-left-icon ".concat(C)}):null,r,""!==k?l.a.createElement("span",{className:"btn-right-icon ".concat(k)}):null))}}]),n}(i.Component));t.default=s},337:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(740);n(610);t.default=function(e){var t=e.placeholder,n=void 0===t?"":t,a=e.register,c=void 0===a?{}:a,i=e.value,l=void 0===i?"":i,s=e.type,u=void 0===s?"text":s,m=e.onChange,d=e.name,p=void 0===d?"":d,f=(e.maxlength,e.icons,e.GB,e.onWheel,e.grayedBox),h=void 0!==f&&f,v=e.Iconic,g=void 0!==v&&v,y=e.disabled,E=void 0!==y&&y,b=e.maxLength,x=e.Search,N=void 0!==x&&x;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input_head"},r.a.createElement("input",{disabled:E,name:p,placeholder:n,className:h?"inputBoxGrayed":g?"inputBoxStyle1":"inputBoxStyle",ref:c,defaultValue:l,type:u,maxLength:b,onWheel:function(e){return e.currentTarget.blur()},onChange:function(e){var t={target:{name:e.target.name,value:e.target.value}};m&&m(t)},autoComplete:"off"}),g&&N?r.a.createElement("i",{className:"search_icon"},r.a.createElement(o.b,{size:18,style:{color:"#7E7E7E"}})):""))}},338:function(e,t,n){"use strict";n.r(t);var a=n(45),r=n(0),o=n.n(r),c=n(756);n(611);t.default=function(e){var t=e.value,n=e.onChange,r=e.options,i=e.placeholder,l=e.isMulti,s={dropdownIndicator:function(e){return Object(a.a)(Object(a.a)({},e),{},{color:"#000000"})}};return o.a.createElement(c.a,{isMulti:l,value:t,onChange:n,options:r,isClearable:!1,components:{IndicatorSeparator:function(){return null}},styles:s,placeholder:i})}},339:function(e,t,n){"use strict";n.r(t);var a=n(81),r=n(0),o=n.n(r),c=n(843),i=n.n(c),l=(n(615),n(909)),s=n(57),u=(n(102),n(614)),m=n.n(u),d=n(613),p=n.n(d),f=n(612),h=n.n(f),v=n(28);t.default=function(e){var t=e.data,n=e.isCheck,c=e.EditAction,u=e.DeleteAction,d=e.ReadAction,f=e.includedKeys,g=e.pageCount,y=e.onPageChange,E=e.editRouteName,b=e.setCurrentPage,x=e.handleOpenModal;console.log("data :>> ",t);var N=Object(r.useState)(!1),w=Object(a.a)(N,2),k=w[0],B=w[1];console.log("includedKeys :>> ",f);var C={active:"#27AE60",inactive:"#EB5757",open:"#EB5757",accepted:"#2F80ED",inprogress:"#F2C94C",closed:"#27AE60",failed:"#EB5757",success:"#27AE60"};return Object(r.useEffect)((function(){t&&t.length>0?B(!1):B(!0)}),[t]),o.a.createElement("div",{className:"table-container"},k&&o.a.createElement(s.default,{loading:k,className:"d-flex align-items-center justify-content-center"}),!k&&o.a.createElement(o.a.Fragment,null,0===t.length?o.a.createElement("p",null,"No data available"):o.a.createElement(o.a.Fragment,null,o.a.createElement("table",{className:"data-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,n?o.a.createElement("th",{className:"checkBox_place"},o.a.createElement("input",{type:"checkbox",className:"mt-2 check_box"})):o.a.createElement(o.a.Fragment,null),f.map((function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("th",{className:"absorbing-column",key:e},e.label))})),u||c?u?o.a.createElement(o.a.Fragment,null,o.a.createElement("th",{className:"checkBox_place"},"Actions"),o.a.createElement("th",{className:"checkBox_place"})):o.a.createElement("th",{className:"checkBox_place"}):null)),o.a.createElement("tbody",null,t.map((function(e){return o.a.createElement("tr",{key:e.id},n&&o.a.createElement("td",{className:"checkBox_place"},o.a.createElement("input",{type:"checkbox",className:"mt-2 check_box"})),f.map((function(t){var n=t.value;if(e.hasOwnProperty(n)){var a=e[n],r=(t.label,n.toLowerCase());if(r.includes("status")){var c=a.toLowerCase(),i=C[c]||"black";return o.a.createElement("td",{key:n},o.a.createElement("span",{style:{color:i}},a.charAt(0).toUpperCase()+a.slice(1)))}return r.includes("date")?o.a.createElement("td",{key:n},a):o.a.createElement("td",{key:n},"boolean"===typeof a?a?o.a.createElement("span",{style:{color:"#1D9E00"}},"Active"):o.a.createElement("span",{style:{color:"#DD2025"}},"InActive"):a)}return null})),c&&o.a.createElement("td",null,o.a.createElement("img",{src:m.a,alt:"Edit",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){return v.history.push("".concat(E,"?Editid=").concat(e._id))}})),d&&o.a.createElement("td",null,o.a.createElement("img",{src:h.a,alt:"read",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){return v.history.push("".concat(E,"?Editid=").concat(e._id))}})),u&&o.a.createElement("td",{onClick:function(){return x(e._id)}},o.a.createElement("img",{src:p.a,alt:"delete",style:{color:"#B4B4B4",cursor:"pointer"}})))})))),t.length>0&&o.a.createElement("div",{className:"my-4"},o.a.createElement(i.a,{previousLabel:o.a.createElement(l.a,null),nextLabel:o.a.createElement(l.b,null),pageCount:g,onPageChange:function(e){b(e.selected),y(e.selected+1)},containerClassName:"pagination",previousClassName:"pagination-previous",nextClassName:"pagination-next",pageClassName:"pagination-item",breakClassName:"pagination-item",activeClassName:"active_page"})))))}},405:function(e,t,n){"use strict";n.r(t);var a=n(153),r=n(0),o=n.n(r);t.default=function(){return o.a.createElement("div",null,o.a.createElement(a.default,null))}},609:function(e,t,n){},610:function(e,t,n){},611:function(e,t,n){},612:function(e,t,n){e.exports=n.p+"static/media/ReadImg.96474dd0.svg"},613:function(e,t,n){e.exports=n.p+"static/media/deleteIcon.b8b189cc.svg"},614:function(e,t,n){e.exports=n.p+"static/media/editIcon.d54ed3bb.svg"},615:function(e,t,n){},650:function(e,t,n){}}]);
//# sourceMappingURL=69.c8c1bf40.chunk.js.map
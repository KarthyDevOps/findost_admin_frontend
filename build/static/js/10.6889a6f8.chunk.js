/*! For license information please see 10.6889a6f8.chunk.js.LICENSE.txt */
(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[10,38,93,94,123,145,149,152,179,182,183],{139:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a);t.default=function(e){var t=e.error,n=(e.type,e.messages);return t?r.a.createElement("span",{className:"text-danger fs-13"},n[t.type]?n[t.type]:"Error in field"):null}},154:function(e,t,n){"use strict";n.r(t);var a=n(44),r=n(81),o=n(0),c=n.n(o),i=n(339),l=n(231),u=n.n(l),s=(n(139),n(745));n(337),n(336),n(658);function d(){d=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,a=Object.defineProperty||function(e,t,n){e[t]=n.value},r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",c=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(L){l=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var o=t&&t.prototype instanceof p?t:p,c=Object.create(o.prototype),i=new O(r||[]);return a(c,"_invoke",{value:w(e,n,i)}),c}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(L){return{type:"throw",arg:L}}}e.wrap=u;var f={};function p(){}function m(){}function h(){}var v={};l(v,o,(function(){return this}));var g=Object.getPrototypeOf,y=g&&g(g(j([])));y&&y!==t&&n.call(y,o)&&(v=y);var b=h.prototype=p.prototype=Object.create(v);function E(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function x(e,t){var r;a(this,"_invoke",{value:function(a,o){function c(){return new t((function(r,c){!function a(r,o,c,i){var l=s(e[r],e,o);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){a("next",e,c,i)}),(function(e){a("throw",e,c,i)})):t.resolve(d).then((function(e){u.value=e,c(u)}),(function(e){return a("throw",e,c,i)}))}i(l.arg)}(a,o,r,c)}))}return r=r?r.then(c,c):c()}})}function w(e,t,n){var a="suspendedStart";return function(r,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw o;return C()}for(n.method=r,n.arg=o;;){var c=n.delegate;if(c){var i=N(c,n);if(i){if(i===f)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var l=s(e,t,n);if("normal"===l.type){if(a=n.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a="completed",n.method="throw",n.arg=l.arg)}}}function N(e,t){var n=t.method,a=e.iterator[n];if(void 0===a)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,N(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var r=s(a,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,f;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function B(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(B,this),this.reset(!0)}function j(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,r=function t(){for(;++a<e.length;)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:C}}function C(){return{value:void 0,done:!0}}return m.prototype=h,a(b,"constructor",{value:h,configurable:!0}),a(h,"constructor",{value:m,configurable:!0}),m.displayName=l(h,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,l(e,i,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},E(x.prototype),l(x.prototype,c,(function(){return this})),e.AsyncIterator=x,e.async=function(t,n,a,r,o){void 0===o&&(o=Promise);var c=new x(u(t,n,a,r),o);return e.isGeneratorFunction(n)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},E(b),l(b,i,"Generator"),l(b,o,(function(){return this})),l(b,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var a in t)n.push(a);return n.reverse(),function e(){for(;n.length;){var a=n.pop();if(a in t)return e.value=a,e.done=!1,e}return e.done=!0,e}},e.values=j,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(n,a){return c.type="throw",c.arg=e,t.next=n,a&&(t.method="next",t.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],c=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),k(n),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var a=n.completion;if("throw"===a.type){var r=a.arg;k(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:j(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},e}t.default=function(){var e=Object(s.b)({mode:"onChange"}),t=(e.register,e.handleSubmit,e.errors,e.reset,e.setError,Object(o.useState)("")),n=Object(r.a)(t,2),l=(n[0],n[1],Object(o.useState)("")),f=Object(r.a)(l,2),p=(f[0],f[1],Object(o.useState)("")),m=Object(r.a)(p,2),h=(m[0],m[1],Object(o.useState)(1)),v=Object(r.a)(h,2),g=v[0],y=(v[1],Object(o.useState)(1)),b=Object(r.a)(y,2),E=(b[0],b[1]),x=Object(o.useState)([{pagesId:"51322",status:"Inactive",dateandTime:"2023-05-04T16:06:03.636Z",pagetitle:"privacy policy",feedbackDescription:"Nemo dolorem eum aliquam non."},{pagesId:"51322",status:"active",dateandTime:"2023-05-04T16:06:03.636Z",pagetitle:"terms and condition",feedbackDescription:"Nemo dolorem eum aliquam non."},{pagesId:"51322",status:"active",dateandTime:"2023-05-04T16:06:03.636Z",pagetitle:"Benefits and Process",feedbackDescription:"Nemo dolorem eum aliquam non."}]),w=Object(r.a)(x,2),N=w[0];w[1];return Object(o.useEffect)((function(){(function(){var e=Object(a.a)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.get("https://jsonplaceholder.typicode.com/posts");case 3:e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}})()()}),[]),c.a.createElement(o.Fragment,null,c.a.createElement("div",{className:"staff_table px-5 pt-4"},c.a.createElement("p",{className:"staff_title m-0"},"Content Management"),c.a.createElement("div",{className:""},N.length>0?c.a.createElement(i.default,{data:N,EditAction:!0,DeleteAction:!0,includedKeys:[{label:"Pages Id",value:"pagesId"},{label:"Page Status",value:"status"},{label:"Page Title",value:"pagetitle"}],pageCount:g,onPageChange:function(e){E(e)},setCurrentPage:E,editRouteName:"/admin/content-management/editcontent-Management"}):c.a.createElement("p",{className:"text-center mt-5 fs-15"},"No Data Available"))))}},336:function(e,t,n){"use strict";n.r(t),n.d(t,"NormalButton",(function(){return u}));var a=n(100),r=n(101),o=n(230),c=n(229),i=n(0),l=n.n(i),u=(n(609),function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var e=this.props,t=e.className,n=void 0===t?"":t,a=e.label,r=void 0===a?"":a,o=e.onClick,c=e.id,i=e.addBnt,u=e.profileCreatNext,s=e.profileCreatNext1,d=e.profileCreatBack,f=e.authButton1,p=e.type,m=void 0===p?"submit":p,h=e.disabled,v=void 0!==h&&h,g=e.authButton,y=void 0!==g&&g,b=e.loginButton,E=void 0!==b&&b,x=e.tableBtn,w=void 0!==x&&x,N=e.rightIcon,B=void 0===N?"":N,k=e.leftIcon,O=void 0===k?"":k,j=e.btnSecondary,C=void 0!==j&&j,L=e.profileBtn,_=void 0!==L&&L,S=e.outlineBtn,P=void 0!==S&&S,I=e.cancel,A=void 0!==I&&I,F=e.addProductbtn,T=void 0!==F&&F;return l.a.createElement("div",null,l.a.createElement("button",{id:c,type:m,className:"cursor-pointer \n                     ".concat(y?"authButton":"","\n                     ").concat(u?"profileCreatNext":"","\n                     ").concat(s?"profileCreatNext1":"","\n                     ").concat(f?"authButton1":"","\n                     ").concat(d?"profileCreatBack":"","\n                     ").concat(E?"loginButton":"","\n                     ").concat(i?"addBnt":"","\n                     ").concat(w?"tableBtn":"","\n                     ").concat(C?"btnSecondary":"","\n                     ").concat(_?"profileBtn":"","\n                     ").concat(P?"outlineBtn":"","\n                     ").concat(A?"cancelBtn ":"","\n                     ").concat(T?"addProductbtn ":"","\n                   \n                     ").concat(n),onClick:o,disabled:v},""!==O?l.a.createElement("span",{className:"btn-left-icon ".concat(O)}):null,r,""!==B?l.a.createElement("span",{className:"btn-right-icon ".concat(B)}):null))}}]),n}(i.Component));t.default=u},337:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(740);n(610);t.default=function(e){var t=e.placeholder,n=void 0===t?"":t,a=e.register,c=void 0===a?{}:a,i=e.value,l=void 0===i?"":i,u=e.type,s=void 0===u?"text":u,d=e.onChange,f=e.name,p=void 0===f?"":f,m=(e.maxlength,e.icons,e.GB,e.onWheel,e.grayedBox),h=void 0!==m&&m,v=e.Iconic,g=void 0!==v&&v,y=e.disabled,b=void 0!==y&&y,E=e.maxLength,x=e.Search,w=void 0!==x&&x;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input_head"},r.a.createElement("input",{disabled:b,name:p,placeholder:n,className:h?"inputBoxGrayed":g?"inputBoxStyle1":"inputBoxStyle",ref:c,defaultValue:l,type:s,maxLength:E,onWheel:function(e){return e.currentTarget.blur()},onChange:function(e){var t={target:{name:e.target.name,value:e.target.value}};d&&d(t)},autoComplete:"off"}),g&&w?r.a.createElement("i",{className:"search_icon"},r.a.createElement(o.b,{size:18,style:{color:"#7E7E7E"}})):""))}},339:function(e,t,n){"use strict";n.r(t);var a=n(81),r=n(0),o=n.n(r),c=n(843),i=n.n(c),l=(n(615),n(909)),u=n(57),s=(n(102),n(614)),d=n.n(s),f=n(613),p=n.n(f),m=n(612),h=n.n(m),v=n(28);t.default=function(e){var t=e.data,n=e.isCheck,c=e.EditAction,s=e.DeleteAction,f=e.ReadAction,m=e.includedKeys,g=e.pageCount,y=e.onPageChange,b=e.editRouteName,E=e.setCurrentPage,x=e.handleOpenModal;console.log("data :>> ",t);var w=Object(r.useState)(!1),N=Object(a.a)(w,2),B=N[0],k=N[1];console.log("includedKeys :>> ",m);var O={active:"#27AE60",inactive:"#EB5757",open:"#EB5757",accepted:"#2F80ED",inprogress:"#F2C94C",closed:"#27AE60",failed:"#EB5757",success:"#27AE60"};return Object(r.useEffect)((function(){t&&t.length>0?k(!1):k(!0)}),[t]),o.a.createElement("div",{className:"table-container"},B&&o.a.createElement(u.default,{loading:B,className:"d-flex align-items-center justify-content-center"}),!B&&o.a.createElement(o.a.Fragment,null,0===t.length?o.a.createElement("p",null,"No data available"):o.a.createElement(o.a.Fragment,null,o.a.createElement("table",{className:"data-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,n?o.a.createElement("th",{className:"checkBox_place"},o.a.createElement("input",{type:"checkbox",className:"mt-2 check_box"})):o.a.createElement(o.a.Fragment,null),m.map((function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("th",{className:"absorbing-column",key:e},e.label))})),s||c?s?o.a.createElement(o.a.Fragment,null,o.a.createElement("th",{className:"checkBox_place"},"Actions"),o.a.createElement("th",{className:"checkBox_place"})):o.a.createElement("th",{className:"checkBox_place"}):null)),o.a.createElement("tbody",null,t.map((function(e){return o.a.createElement("tr",{key:e.id},n&&o.a.createElement("td",{className:"checkBox_place"},o.a.createElement("input",{type:"checkbox",className:"mt-2 check_box"})),m.map((function(t){var n=t.value;if(e.hasOwnProperty(n)){var a=e[n],r=(t.label,n.toLowerCase());if(r.includes("status")){var c=a.toLowerCase(),i=O[c]||"black";return o.a.createElement("td",{key:n},o.a.createElement("span",{style:{color:i}},a.charAt(0).toUpperCase()+a.slice(1)))}return r.includes("date")?o.a.createElement("td",{key:n},a):o.a.createElement("td",{key:n},"boolean"===typeof a?a?o.a.createElement("span",{style:{color:"#1D9E00"}},"Active"):o.a.createElement("span",{style:{color:"#DD2025"}},"InActive"):a)}return null})),c&&o.a.createElement("td",null,o.a.createElement("img",{src:d.a,alt:"Edit",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){return v.history.push("".concat(b,"?Editid=").concat(e._id))}})),f&&o.a.createElement("td",null,o.a.createElement("img",{src:h.a,alt:"read",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){return v.history.push("".concat(b,"?Editid=").concat(e._id))}})),s&&o.a.createElement("td",{onClick:function(){return x(e._id)}},o.a.createElement("img",{src:p.a,alt:"delete",style:{color:"#B4B4B4",cursor:"pointer"}})))})))),t.length>0&&o.a.createElement("div",{className:"my-4"},o.a.createElement(i.a,{previousLabel:o.a.createElement(l.a,null),nextLabel:o.a.createElement(l.b,null),pageCount:g,onPageChange:function(e){E(e.selected),y(e.selected+1)},containerClassName:"pagination",previousClassName:"pagination-previous",nextClassName:"pagination-next",pageClassName:"pagination-item",breakClassName:"pagination-item",activeClassName:"active_page"})))))}},609:function(e,t,n){},610:function(e,t,n){},612:function(e,t,n){e.exports=n.p+"static/media/ReadImg.96474dd0.svg"},613:function(e,t,n){e.exports=n.p+"static/media/deleteIcon.b8b189cc.svg"},614:function(e,t,n){e.exports=n.p+"static/media/editIcon.d54ed3bb.svg"},615:function(e,t,n){},658:function(e,t,n){}}]);
//# sourceMappingURL=10.6889a6f8.chunk.js.map
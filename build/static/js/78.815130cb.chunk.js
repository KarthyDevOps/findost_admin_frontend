/*! For license information please see 78.815130cb.chunk.js.LICENSE.txt */
(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[78,80,81,93,94,95,121,140,145,149,152,177,179,181,183,184],{338:function(e,t,n){"use strict";n.r(t),n.d(t,"NormalButton",(function(){return u}));var a=n(106),r=n(107),o=n(233),c=n(232),i=n(0),l=n.n(i),u=(n(611),function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var e=this.props,t=e.className,n=void 0===t?"":t,a=e.label,r=void 0===a?"":a,o=e.onClick,c=e.id,i=e.addBnt,u=e.profileCreatNext,s=e.profileCreatNext1,d=e.profileCreatBack,f=e.uploadBrowseBtn,m=e.authButton1,p=e.type,h=void 0===p?"submit":p,v=e.disabled,g=void 0!==v&&v,y=e.authButton,b=void 0!==y&&y,E=e.loginButton,w=void 0!==E&&E,x=e.tableBtn,N=void 0!==x&&x,O=e.rightIcon,j=void 0===O?"":O,k=e.leftIcon,C=void 0===k?"":k,B=e.btnSecondary,S=void 0!==B&&B,_=e.profileBtn,L=void 0!==_&&_,I=e.outlineBtn,A=void 0!==I&&I,D=e.cancel,P=void 0!==D&&D,F=e.addProductbtn,M=void 0!==F&&F;return l.a.createElement("div",null,l.a.createElement("button",{id:c,type:h,className:"cursor-pointer \n                     ".concat(b?"authButton":"","\n                     ").concat(u?"profileCreatNext":"","\n                     ").concat(s?"profileCreatNext1":"","\n                     ").concat(m?"authButton1":"","\n                     ").concat(d?"profileCreatBack":"","\n                     ").concat(w?"loginButton":"","\n                     ").concat(i?"addBnt":"","\n                     ").concat(N?"tableBtn":"","\n                     ").concat(S?"btnSecondary":"","\n                     ").concat(L?"profileBtn":"","\n                     ").concat(A?"outlineBtn":"","\n                     ").concat(P?"cancelBtn ":"","\n                     ").concat(M?"addProductbtn ":"","\n                     ").concat(f?"uploadBrowseBtn ":"","\n                     ").concat(n),onClick:o,disabled:g},""!==C?l.a.createElement("span",{className:"btn-left-icon ".concat(C)}):null,r,""!==j?l.a.createElement("span",{className:"btn-right-icon ".concat(j)}):null))}}]),n}(i.Component));t.default=u},341:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(751);n(614);t.default=function(e){var t=e.placeholder,n=void 0===t?"":t,a=e.register,c=void 0===a?{}:a,i=e.value,l=void 0===i?"":i,u=e.type,s=void 0===u?"text":u,d=e.onChange,f=e.name,m=void 0===f?"":f,p=(e.maxlength,e.icons,e.GB,e.onWheel,e.grayedBox),h=void 0!==p&&p,v=e.Iconic,g=void 0!==v&&v,y=e.disabled,b=void 0!==y&&y,E=e.maxLength,w=e.Search,x=void 0!==w&&w;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input_head"},r.a.createElement("input",{disabled:b,name:m,placeholder:n,className:h?"inputBoxGrayed":g?"inputBoxStyle1":"inputBoxStyle",ref:c,defaultValue:l,type:s,maxLength:E,onWheel:function(e){return e.currentTarget.blur()},onChange:function(e){var t={target:{name:e.target.name,value:e.target.value}};d&&d(t)},autoComplete:"off"}),g&&x?r.a.createElement("i",{className:"search_icon"},r.a.createElement(o.b,{size:18,style:{color:"#7E7E7E"}})):""))}},345:function(e,t,n){"use strict";n.r(t);var a=n(48),r=n(773),o=n(42),c=n(0),i=n.n(c),l=(n(615),n(619)),u=n.n(l),s=n(618),d=n.n(s),f=n(617),m=n.n(f),p=n(848),h=n.n(p),v=n(850),g=n(109),y=n.n(g),b=n(25);t.default=function(e){var t=e.data,n=e.EditAction,l=e.DeleteAction,s=e.ReadAction,f=e.includedKeys,p=e.pageCount,g=e.onPageChange,E=e.editRouteName,w=e.setCurrentPage,x=e.handleOpenModal,N=e.currentPage,O=e.onRowsSelect,j=Object(c.useState)([]),k=Object(o.a)(j,2),C=k[0],B=k[1],S={active:"#27AE60",inactive:"#EB5757",open:"#EB5757",accepted:"#2F80ED",inprogress:"#F2C94C",closed:"#27AE60",failed:"#EB5757",success:"#27AE60"};return i.a.createElement("div",{className:"table-container"},i.a.createElement("table",{className:"data-table"},i.a.createElement("thead",null,i.a.createElement("tr",null,l&&i.a.createElement("th",{className:"checkBox_place"},i.a.createElement("input",{type:"checkbox",onChange:function(){var e;C.length===t.length?e=[]:e=t.map((function(e){return e._id}));B(e),O(e)},checked:C.length===t.length,className:"check_box cursor-pointer"})),f.map((function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("th",{className:"",key:e,style:Object(a.a)({},(null===e||void 0===e?void 0:e.width)?{width:null===e||void 0===e?void 0:e.width}:{})},e.label))})),(l||s||n)&&i.a.createElement("th",{className:"action_place"}," Actions"))),i.a.createElement("tbody",null,t.map((function(e){return i.a.createElement("tr",{key:e.id},l&&i.a.createElement("td",{className:"checkBox_place"},i.a.createElement("input",{type:"checkbox",onChange:function(){return function(e){var t;t=C.includes(e)?C.filter((function(t){return t!==e})):[].concat(Object(r.a)(C),[e]),B(t),O(t)}(e._id)},checked:C.includes(e._id),className:"check_box cursor-pointer"})),f.map((function(t){var n=t.value;if(e.hasOwnProperty(n)){var a=e[n],r=(t.label,n.toLowerCase());if(r.includes("status")){var o=a.toLowerCase(),c=S[o]||"black";return i.a.createElement("td",{key:n},i.a.createElement("span",{style:{color:c}},a.charAt(0).toUpperCase()+a.slice(1)))}if(r.includes("id"))return i.a.createElement("td",{key:n},a);if(r.includes("producticons3"))return i.a.createElement("td",{key:n},i.a.createElement("a",{href:a,target:"_blank"},i.a.createElement("img",{src:a,alt:a,className:"img"})," "));if(y()(a,"YYYY-MM-DDTHH:mm:ss.SSSZ",!0).isValid())return i.a.createElement("td",{key:n},y()(a).format("MMM DD YYYY hh:mm a"));if("string"===typeof a&&/<[a-z][\s\S]*>/i.test(a)){var l=a.replace(/<[^>]+>/g,"");return i.a.createElement("td",{key:n},l)}return i.a.createElement("td",{key:n},"boolean"===typeof a?a?i.a.createElement("span",{style:{color:"#1D9E00"}},"Active"):i.a.createElement("span",{style:{color:"#DD2025"}},"Inactive"):a)}return null})),(l||s||n)&&i.a.createElement("td",null,i.a.createElement("span",{className:"actions"},n&&i.a.createElement("img",{src:u.a,alt:"Edit",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){localStorage.removeItem("editId"),localStorage.setItem("editId",e._id),b.history.push("".concat(E))}}),s&&i.a.createElement("img",{src:m.a,alt:"read",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){localStorage.removeItem("editId"),localStorage.setItem("editId",e._id),b.history.push("".concat(E))}}),l&&i.a.createElement("img",{onClick:function(){return x(e._id)},src:d.a,alt:"delete",style:{color:"#B4B4B4",cursor:"pointer"}}))))})))),i.a.createElement("div",{className:"my-4"},i.a.createElement(h.a,{previousLabel:i.a.createElement(v.a,null),nextLabel:i.a.createElement(v.b,null),pageCount:p,onPageChange:function(e){w(e.selected+1),g(e.selected+1)},forcePage:N-1,containerClassName:"pagination",previousClassName:"pagination-previous",nextClassName:"pagination-next",pageClassName:"pagination-item",breakClassName:"pagination-item",activeClassName:"active_page"})))}},346:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(1242),c=(n(613),n(616)),i=n.n(c),l=(n(612),n(338));t.default=function(e){var t=e.DeleteMessage,n=e.modalOpen,a=e.closeModal,c=e.handleDelete;return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{open:n,centered:!0,closable:!1},r.a.createElement("div",{className:"p-5"},t&&r.a.createElement("p",{className:"delete_text m-0"},t),t&&r.a.createElement("div",{className:"delete_Img"},r.a.createElement("img",{src:i.a,alt:""})),t&&r.a.createElement("div",{className:"d-flex align-items-center "},r.a.createElement("div",{className:"col-6 d-flex justify-content-end"},r.a.createElement(l.default,{className:"DeleteNoBtn",label:"No",onClick:a})),r.a.createElement("div",{className:"col-6 d-flex  justify-content-start"},r.a.createElement(l.default,{className:"DeleteYesBtn",label:"Yes",onClick:c}))))))}},347:function(e,t,n){"use strict";n.r(t);var a=n(48),r=n(0),o=n.n(r);n(615);t.default=function(e){var t=e.EditAction,n=e.DeleteAction,r=e.ReadAction,c=e.includedKeys;return o.a.createElement("div",{className:"table-container"},o.a.createElement("table",{className:"data-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,n&&o.a.createElement("th",{className:"checkBox_place"},o.a.createElement("input",{type:"checkbox",className:"check_box cursor-pointer"})),c.map((function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("th",{className:"",key:e,style:Object(a.a)({},(null===e||void 0===e?void 0:e.width)?{width:null===e||void 0===e?void 0:e.width}:{})},e.label))})),(n||r||t)&&o.a.createElement("th",{className:"action_place"}," Actions")))))}},354:function(e,t,n){"use strict";n.r(t);var a=n(773),r=n(13),o=n(42),c=n(0),i=n.n(c),l=(n(628),n(341)),u=n(345),s=n(63),d=n(346),f=n(338),m=n(347),p=n(87),h=n(29),v=n(25);function g(){g=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,a=Object.defineProperty||function(e,t,n){e[t]=n.value},r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",c=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(S){l=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var o=t&&t.prototype instanceof f?t:f,c=Object.create(o.prototype),i=new k(r||[]);return a(c,"_invoke",{value:x(e,n,i)}),c}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(S){return{type:"throw",arg:S}}}e.wrap=u;var d={};function f(){}function m(){}function p(){}var h={};l(h,o,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(C([])));y&&y!==t&&n.call(y,o)&&(h=y);var b=p.prototype=f.prototype=Object.create(h);function E(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){var r;a(this,"_invoke",{value:function(a,o){function c(){return new t((function(r,c){!function a(r,o,c,i){var l=s(e[r],e,o);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){a("next",e,c,i)}),(function(e){a("throw",e,c,i)})):t.resolve(d).then((function(e){u.value=e,c(u)}),(function(e){return a("throw",e,c,i)}))}i(l.arg)}(a,o,r,c)}))}return r=r?r.then(c,c):c()}})}function x(e,t,n){var a="suspendedStart";return function(r,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw o;return B()}for(n.method=r,n.arg=o;;){var c=n.delegate;if(c){var i=N(c,n);if(i){if(i===d)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var l=s(e,t,n);if("normal"===l.type){if(a=n.done?"completed":"suspendedYield",l.arg===d)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a="completed",n.method="throw",n.arg=l.arg)}}}function N(e,t){var n=t.method,a=e.iterator[n];if(void 0===a)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,N(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var r=s(a,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,d;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function C(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,r=function t(){for(;++a<e.length;)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:B}}function B(){return{value:void 0,done:!0}}return m.prototype=p,a(b,"constructor",{value:p,configurable:!0}),a(p,"constructor",{value:m,configurable:!0}),m.displayName=l(p,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,l(e,i,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},E(w.prototype),l(w.prototype,c,(function(){return this})),e.AsyncIterator=w,e.async=function(t,n,a,r,o){void 0===o&&(o=Promise);var c=new w(u(t,n,a,r),o);return e.isGeneratorFunction(n)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},E(b),l(b,i,"Generator"),l(b,o,(function(){return this})),l(b,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var a in t)n.push(a);return n.reverse(),function e(){for(;n.length;){var a=n.pop();if(a in t)return e.value=a,e.done=!1,e}return e.done=!0,e}},e.values=C,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(n,a){return c.type="throw",c.arg=e,t.next=n,a&&(t.method="next",t.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],c=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),j(n),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var a=n.completion;if("throw"===a.type){var r=a.arg;j(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:C(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},e}t.default=function(e){e.create,e.view;var t=e.edit,n=e.remove,y=Object(c.useState)(1),b=Object(o.a)(y,2),E=b[0],w=b[1],x=Object(c.useState)(1),N=Object(o.a)(x,2),O=N[0],j=N[1],k=Object(c.useState)([]),C=Object(o.a)(k,2),B=C[0],S=C[1],_=Object(c.useState)(!1),L=Object(o.a)(_,2),I=L[0],A=L[1],D=Object(c.useState)(""),P=Object(o.a)(D,2),F=P[0],M=P[1],Y=Object(c.useState)(""),G=Object(o.a)(Y,2),R=G[0],T=(G[1],Object(c.useState)("")),K=Object(o.a)(T,2),V=K[0],W=(K[1],Object(c.useState)(!1)),z=Object(o.a)(W,2),H=z[0],J=z[1],U=Object(c.useState)([]),Z=Object(o.a)(U,2),q=Z[0],Q=(Z[1],Object(c.useState)({id:null,show:!1})),X=Object(o.a)(Q,2),$=X[0],ee=X[1],te=[{label:"Client Id",value:"clientId"},{label:"Client Name",value:"clientName"},{label:"Email Id",value:"email"},{label:"Date of Birth",value:"dateOfBirth"},{label:"Relative Name",value:"relativeName"},{label:"Relationship",value:"relationShip"}],ne=function(){var e=Object(r.a)(g().mark((function e(t){var n,a,r,o,c,i,l,u,s,d,f,m,h;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,A(!0),J(!1),r={page:t,limit:10,search:F},e.next=6,Object(p.getClientList)(r);case 6:200===(o=e.sent).status&&(null===o||void 0===o||null===(n=o.data)||void 0===n||null===(a=n.data)||void 0===a?void 0:a.list)?(console.log("response",null===o||void 0===o||null===(c=o.data)||void 0===c?void 0:c.data),S(null===o||void 0===o||null===(i=o.data)||void 0===i||null===(l=i.data)||void 0===l?void 0:l.list),w(null===o||void 0===o||null===(u=o.data)||void 0===u||null===(s=u.data)||void 0===s||null===(d=s.pageMeta)||void 0===d?void 0:d.pageCount),j(null===o||void 0===o||null===(f=o.data)||void 0===f||null===(m=f.data)||void 0===m||null===(h=m.pageMeta)||void 0===h?void 0:h.currentPage)):S([]),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("err",e.t0);case 13:return e.prev=13,A(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[0,10,13,16]])})));return function(t){return e.apply(this,arguments)}}(),ae=function(e){ee({id:e,show:!0})},re=function(){var e=Object(r.a)(g().mark((function e(){var t,n;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!$.show||!$.id){e.next=6;break}return t={id:$.id},e.next=4,Object(p.deleteClient)(t);case 4:200===(n=e.sent).status&&(Object(h.Toast)({type:"success",message:n.data.message}),ne(O));case 6:ee({show:!1,id:null});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),oe=Object(c.useCallback)(Object(v.debounceFunction)((function(e){M(e)}),500),[]),ce=function(){var e=Object(r.a)(g().mark((function e(t){return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.length>0?(J(!0),q.length=0,q.push.apply(q,Object(a.a)(Object.values(t)))):J(!1);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(){var e=Object(r.a)(g().mark((function e(){var t,n;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(q.length>0)){e.next=6;break}return t={ids:q},e.next=4,Object(p.bulkDeleteClient)(t);case 4:200===(n=e.sent).status&&(Object(h.Toast)({type:"success",message:n.data.message}),q.length=0,ne(O));case 6:ee({show:!1,id:null});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){ne(O)}),[F,R,V]),i.a.createElement("div",{className:"px-5 py-3 clients_family"},i.a.createElement("h6",null,"Client\u2019s Family"),i.a.createElement("div",{className:"flex justify-content-between align-items-center my-4"},i.a.createElement("div",{className:"cursor-pointer",style:{width:"300px"}},i.a.createElement(l.default,{className:"login_input Notification_input",type:"text",value:F,onChange:function(e){return oe(e.target.value)},placeholder:"Search by Id, Name, Email",name:"search",Iconic:!0,Search:!0})),i.a.createElement("div",{className:"cursor-pointer",style:{minWidth:"150px"}},H&&i.a.createElement(f.default,{className:"authButton1",label:"Delete",onClick:ae}))),i.a.createElement("div",{className:"row align-items-center"},I?i.a.createElement(s.default,{loading:I,className:"d-flex align-items-center justify-content-center mx-auto mt-5 pt-5"}):B.length>0?i.a.createElement("div",{className:"mt-4 px-3"},i.a.createElement(u.default,{data:B,EditAction:t,includedKeys:te,pageCount:E,currentPage:O,setBulkDelete:J,handleOpenModal:ae,onRowsSelect:ce,onPageChange:function(e){j(e.selected),ne(e)},setCurrentPage:j,editRouteName:"/admin/clients-family/edit-client"})):i.a.createElement("div",{className:""},i.a.createElement(m.default,{EditAction:t,DeleteAction:n,includedKeys:te}),i.a.createElement("p",{className:"d-flex align-items-center justify-content-center mt-5 pt-5"},"No Data Available"))),i.a.createElement("div",null,i.a.createElement(d.default,{modalOpen:$.show,closeModal:function(){return ee({id:null,show:!1})},handleDelete:q.length>0?ie:re,DeleteMessage:"Are you sure you want to delete Staff?"})))}},385:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(61),c=n(354),i=n(25),l=n(62);t.default=function(e){var t=e.privilegesData,n=void 0===t?{}:t,u=Object(o.c)(),s=(n||{}).clientFamilyManagement,d=void 0===s?{}:s;return Object(a.useEffect)((function(){Object(l.getadminPrivileges)(u)}),[]),Object(a.useEffect)((function(){var e=Object(i.checkAndReturnViewableComponent)(n,d);if(e)return i.history.push(null===e||void 0===e?void 0:e.to)}),[n]),r.a.createElement("div",null,r.a.createElement(c.default,d))}},611:function(e,t,n){},612:function(e,t,n){e.exports=n.p+"static/media/SuccessImg.4b68588c.svg"},613:function(e,t,n){},614:function(e,t,n){},615:function(e,t,n){},616:function(e,t,n){e.exports=n.p+"static/media/ErrorImg.b30f2c03.svg"},617:function(e,t,n){e.exports=n.p+"static/media/ReadImg.96474dd0.svg"},618:function(e,t,n){e.exports=n.p+"static/media/deleteIcon.b8b189cc.svg"},619:function(e,t,n){e.exports=n.p+"static/media/editIcon.d54ed3bb.svg"},628:function(e,t,n){},773:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(148);var r=n(235);function o(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=78.815130cb.chunk.js.map
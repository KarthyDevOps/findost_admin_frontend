/*! For license information please see 92.9e006631.chunk.js.LICENSE.txt */
(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[92,6,99,100,110,112,113,144,165,170,173,176,204,207,209,211,212],{348:function(e,t,a){"use strict";a.r(t),a.d(t,"NormalButton",(function(){return u}));var n=a(107),r=a(108),o=a(239),i=a(238),l=a(1),c=a.n(l),s=a(791),u=(a(637),function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.className,a=void 0===t?"":t,n=e.label,r=void 0===n?"":n,o=e.onClick,i=e.id,l=e.addBnt,u=e.profileCreatNext,d=e.profileCreatNext1,p=e.profileCreatBack,f=e.uploadBrowseBtn,m=e.authButton1,v=e.type,h=void 0===v?"submit":v,g=e.disabled,b=void 0!==g&&g,y=e.authButton,E=void 0!==y&&y,C=e.loginButton,N=void 0!==C&&C,x=e.loginButton1,k=void 0!==x&&x,w=e.tableBtn,O=void 0!==w&&w,L=e.rightIcon,P=void 0===L?"":L,j=e.leftIcon,B=void 0===j?"":j,S=e.btnSecondary,_=void 0!==S&&S,D=e.profileBtn,A=void 0!==D&&D,I=e.outlineBtn,R=void 0!==I&&I,T=e.cancel,M=void 0!==T&&T,F=e.addProductbtn,Y=void 0!==F&&F,q=e.isLoading,G=void 0!==q&&q;return c.a.createElement("div",null,c.a.createElement("button",{id:i,type:h,className:"cursor-pointer \n                     ".concat(E?"authButton":"","\n                     ").concat(u?"profileCreatNext":"","\n                     ").concat(d?"profileCreatNext1":"","\n                     ").concat(m?"authButton1":"","\n                     ").concat(p?"profileCreatBack":"","\n                     ").concat(N?"loginButton":"","\n                     ").concat(k?"loginButton1":"","\n                     ").concat(l?"addBnt":"","\n                     ").concat(O?"tableBtn":"","\n                     ").concat(_?"btnSecondary":"","\n                     ").concat(A?"profileBtn":"","\n                     ").concat(R?"outlineBtn":"","\n                     ").concat(M?"cancelBtn ":"","\n                     ").concat(Y?"addProductbtn ":"","\n                     ").concat(f?"uploadBrowseBtn ":"","\n                     ").concat(a),onClick:o,disabled:b||G},G?c.a.createElement("span",{className:"btn-loader  "}," ",c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{color:"#ffffff",height:20,width:20})),c.a.createElement(c.a.Fragment,null,c.a.createElement("span",{className:"m-3"},"Loading")," ")):c.a.createElement(c.a.Fragment,null,""!==B?c.a.createElement("span",{className:"btn-left-icon ".concat(B)}):null,r,""!==P?c.a.createElement("span",{className:"btn-right-icon ".concat(P)}):null)))}}]),a}(l.Component));t.default=u},349:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(776);a(639);t.default=function(e){var t=e.placeholder,a=void 0===t?"":t,n=e.register,i=void 0===n?{}:n,l=e.value,c=void 0===l?"":l,s=e.type,u=void 0===s?"text":s,d=e.onChange,p=e.name,f=void 0===p?"":p,m=(e.maxlength,e.icons,e.GB,e.onWheel,e.grayedBox),v=void 0!==m&&m,h=e.Iconic,g=void 0!==h&&h,b=e.disabled,y=void 0!==b&&b,E=e.maxLength,C=e.Search,N=void 0!==C&&C;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input_head"},r.a.createElement("input",{disabled:y,name:f,placeholder:a,className:y||v?"inputBoxGrayed":g?"inputBoxStyle1":"inputBoxStyle",ref:i,defaultValue:c,type:u,maxLength:E,onWheel:function(e){return e.currentTarget.blur()},onChange:function(e){var t={target:{name:e.target.name,value:e.target.value}};d&&d(t)},autoComplete:"off"}),g&&N?r.a.createElement("i",{className:"search_icon"},r.a.createElement(o.b,{size:18,style:{color:"#7E7E7E"}})):""))}},354:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(1303),i=(a(638),a(642)),l=a.n(i),c=(a(644),a(348));t.default=function(e){var t=e.DeleteMessage,a=e.modalOpen,n=e.closeModal,i=e.handleDelete;return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{open:a,centered:!0,closable:!1,className:"success-modal"},r.a.createElement("div",{className:"p-5"},t&&r.a.createElement("p",{className:"delete_text m-0"},t),t&&r.a.createElement("div",{className:"delete_Img"},r.a.createElement("img",{src:l.a,alt:""})),t&&r.a.createElement("div",{className:"d-flex align-items-center "},r.a.createElement("div",{className:"col-6 d-flex justify-content-end"},r.a.createElement(c.default,{className:"DeleteNoBtn",label:"No",onClick:n})),r.a.createElement("div",{className:"col-6 d-flex  justify-content-start"},r.a.createElement(c.default,{className:"DeleteYesBtn",label:"Yes",onClick:i}))))))}},355:function(e,t,a){"use strict";a.r(t);var n=a(44),r=a(1),o=a.n(r);a(640);t.default=function(e){var t=e.EditAction,a=e.DeleteAction,r=e.ReadAction,i=e.includedKeys;return o.a.createElement("div",{className:"table-container"},o.a.createElement("table",{className:"data-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,a&&o.a.createElement("th",{className:"checkBox_place"},o.a.createElement("input",{type:"checkbox",className:"check_box cursor-pointer"})),i.map((function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("th",{className:"",key:e,style:Object(n.a)({},(null===e||void 0===e?void 0:e.width)?{width:null===e||void 0===e?void 0:e.width}:{})},e.label))})),(a||r||t)&&o.a.createElement("th",{className:"action_place"}," Actions")))))}},356:function(e,t,a){"use strict";a.r(t);var n=a(44),r=a(773),o=a(772),i=a(43),l=a(1),c=a.n(l),s=(a(640),a(646)),u=a.n(s),d=a(645),p=a.n(d),f=a(643),m=a.n(f),v=a(803),h=a.n(v),g=a(814),b=a(111),y=a.n(b),E=a(22);t.default=function(e){var t=e.data,a=e.EditAction,s=e.DeleteAction,d=e.ReadAction,f=e.includedKeys,v=e.pageCount,b=e.onPageChange,C=e.editRouteName,N=e.setCurrentPage,x=e.handleOpenModal,k=e.currentPage,w=e.onRowsSelect,O=e.management,L=void 0!==O&&O,P=Object(l.useState)([]),j=Object(i.a)(P,2),B=j[0],S=j[1],_={active:"#27AE60",inactive:"#EB5757",open:"#EB5757",accepted:"#2F80ED",inprogress:"#F2C94C",closed:"#27AE60",failed:"#EB5757",success:"#27AE60",PENDING:"#EB5757",COMPLETED:"#27AE60"};return c.a.createElement("div",{className:"table-container"},c.a.createElement("table",{className:"data-table"},c.a.createElement("thead",null,c.a.createElement("tr",null,s&&c.a.createElement("th",{className:"checkBox_place"},c.a.createElement("input",{type:"checkbox",onChange:function(){var e;B.length===t.length?e=[]:e=t.map((function(e){return e._id}));S(e),w(e)},checked:B.length===t.length,className:"check_box cursor-pointer"})),f.map((function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("th",{className:"",key:e,style:Object(n.a)({},(null===e||void 0===e?void 0:e.width)?{width:null===e||void 0===e?void 0:e.width}:{})},e.label))})),(s||d||a)&&c.a.createElement("th",{className:"action_place"}," Actions"))),c.a.createElement("tbody",null,t.map((function(e){return c.a.createElement("tr",{key:e.id},s&&c.a.createElement("td",{className:"checkBox_place"},c.a.createElement("input",{type:"checkbox",onChange:function(){return function(e){var t;t=B.includes(e)?B.filter((function(t){return t!==e})):[].concat(Object(o.a)(B),[e]),S(t),w(t)}(e._id)},checked:B.includes(e._id),className:"check_box cursor-pointer"})),f.map((function(t){var a=t.value,n=function(e,t){var a,n=e.split("."),o=t,i=Object(r.a)(n);try{for(i.s();!(a=i.n()).done;){var l=a.value;if(!o.hasOwnProperty(l))return o="-";o=o[l]}}catch(c){i.e(c)}finally{i.f()}return o}(a,e);if(e.hasOwnProperty(a)){var o=e[a],i=t.label;console.log("label :>> ",i);var l=a.toLowerCase();if(l.includes("status")){var s=o.toLowerCase(),u=_[s]||"black";return c.a.createElement("td",{key:a},c.a.createElement("span",{style:{color:u}},o.charAt(0).toUpperCase()+o.slice(1)))}if(l.includes("id"))return c.a.createElement("td",{key:a},o);if(L&&l.includes("description"))return c.a.createElement("td",{key:a},c.a.createElement("a",{href:o,target:"_blank"},o));if(l.includes("type"))return c.a.createElement("td",{key:a},o.charAt(0).toUpperCase()+o.slice(1));if(l.includes("producticons3"))return c.a.createElement("td",{key:a},c.a.createElement("a",{href:o,target:"_blank"},c.a.createElement("img",{src:o,alt:o,className:"img"})," "));if(l.includes("imageurls3"))return c.a.createElement("td",{key:a},c.a.createElement("a",{href:o,target:"_blank"},c.a.createElement("img",{src:o,alt:o,className:"img"})," "));if("date"===l)return c.a.createElement("td",{key:a},y()(o).format("MMM DD YYYY"));if(y()(o,"YYYY-MM-DDTHH:mm:ss.SSSZ",!0).isValid())return c.a.createElement("td",{key:a},y()(o).format("MMM DD YYYY hh:mm a"));if("string"===typeof o&&/<[a-z][\s\S]*>/i.test(o)){var d=o.replace(/<[^>]+>/g,"");return c.a.createElement("td",{key:a},d)}return c.a.createElement("td",{key:a},"boolean"===typeof o?o?c.a.createElement("span",{style:{color:"#1D9E00"}},"Active"):c.a.createElement("span",{style:{color:"#DD2025"}},"Inactive"):o)}return c.a.createElement("td",{key:a},n)})),(s||d||a)&&c.a.createElement("td",null,c.a.createElement("span",{className:"actions"},a&&c.a.createElement("img",{src:u.a,alt:"Edit",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){localStorage.removeItem("editId"),localStorage.setItem("editId",e._id),localStorage.removeItem("editPage"),localStorage.setItem("editPage",k),E.history.push("".concat(C))}}),d&&c.a.createElement("img",{src:m.a,alt:"read",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){localStorage.removeItem("editId"),localStorage.setItem("editId",e._id),E.history.push("".concat(C))}}),s&&c.a.createElement("img",{onClick:function(){return x(e._id)},src:p.a,alt:"delete",style:{color:"#B4B4B4",cursor:"pointer"}}))))})))),c.a.createElement("div",{className:"my-4"},c.a.createElement(h.a,{previousLabel:c.a.createElement(g.a,null),nextLabel:c.a.createElement(g.b,null),pageCount:v,onPageChange:function(e){N(e.selected+1),b(e.selected+1)},forcePage:k-1,containerClassName:"pagination",previousClassName:"pagination-previous",nextClassName:"pagination-next",pageClassName:"pagination-item",breakClassName:"pagination-item",activeClassName:"active_page"})))}},371:function(e,t,a){"use strict";a.r(t);var n=a(772),r=a(9),o=a(43),i=a(1),l=a.n(i),c=(a(661),a(349)),s=a(356),u=a(63),d=a(354),p=a(348),f=a(355),m=a(89),v=a(31),h=a(22);function g(){g=function(){return e};var e={},t=Object.prototype,a=t.hasOwnProperty,n=Object.defineProperty||function(e,t,a){e[t]=a.value},r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",l=r.toStringTag||"@@toStringTag";function c(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(j){c=function(e,t,a){return e[t]=a}}function s(e,t,a,r){var o=t&&t.prototype instanceof p?t:p,i=Object.create(o.prototype),l=new O(r||[]);return n(i,"_invoke",{value:N(e,a,l)}),i}function u(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(j){return{type:"throw",arg:j}}}e.wrap=s;var d={};function p(){}function f(){}function m(){}var v={};c(v,o,(function(){return this}));var h=Object.getPrototypeOf,b=h&&h(h(L([])));b&&b!==t&&a.call(b,o)&&(v=b);var y=m.prototype=p.prototype=Object.create(v);function E(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function C(e,t){var r;n(this,"_invoke",{value:function(n,o){function i(){return new t((function(r,i){!function n(r,o,i,l){var c=u(e[r],e,o);if("throw"!==c.type){var s=c.arg,d=s.value;return d&&"object"==typeof d&&a.call(d,"__await")?t.resolve(d.__await).then((function(e){n("next",e,i,l)}),(function(e){n("throw",e,i,l)})):t.resolve(d).then((function(e){s.value=e,i(s)}),(function(e){return n("throw",e,i,l)}))}l(c.arg)}(n,o,r,i)}))}return r=r?r.then(i,i):i()}})}function N(e,t,a){var n="suspendedStart";return function(r,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===r)throw o;return P()}for(a.method=r,a.arg=o;;){var i=a.delegate;if(i){var l=x(i,a);if(l){if(l===d)continue;return l}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===n)throw n="completed",a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);n="executing";var c=u(e,t,a);if("normal"===c.type){if(n=a.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:a.done}}"throw"===c.type&&(n="completed",a.method="throw",a.arg=c.arg)}}}function x(e,t){var a=t.method,n=e.iterator[a];if(void 0===n)return t.delegate=null,"throw"===a&&e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method)||"return"!==a&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+a+"' method")),d;var r=u(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,d;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function L(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:P}}function P(){return{value:void 0,done:!0}}return f.prototype=m,n(y,"constructor",{value:m,configurable:!0}),n(m,"constructor",{value:f,configurable:!0}),f.displayName=c(m,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,c(e,l,"GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},E(C.prototype),c(C.prototype,i,(function(){return this})),e.AsyncIterator=C,e.async=function(t,a,n,r,o){void 0===o&&(o=Promise);var i=new C(s(t,a,n,r),o);return e.isGeneratorFunction(a)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},E(y),c(y,l,"Generator"),c(y,o,(function(){return this})),c(y,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),a=[];for(var n in t)a.push(n);return a.reverse(),function e(){for(;a.length;){var n=a.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=L,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(a,n){return i.type="throw",i.arg=e,t.next=a,n&&(t.method="next",t.arg=void 0),!!n}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var l=a.call(o,"catchLoc"),c=a.call(o,"finallyLoc");if(l&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),w(a),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var n=a.completion;if("throw"===n.type){var r=n.arg;w(a)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,a){return this.delegate={iterator:L(e),resultName:t,nextLoc:a},"next"===this.method&&(this.arg=void 0),d}},e}t.default=function(e){e.create,e.view;var t=e.edit,a=e.remove,b=Object(i.useState)(1),y=Object(o.a)(b,2),E=y[0],C=y[1],N=Object(i.useState)(1),x=Object(o.a)(N,2),k=x[0],w=x[1],O=Object(i.useState)([]),L=Object(o.a)(O,2),P=L[0],j=L[1],B=Object(i.useState)(!1),S=Object(o.a)(B,2),_=S[0],D=S[1],A=Object(i.useState)(""),I=Object(o.a)(A,2),R=I[0],T=I[1],M=Object(i.useState)(""),F=Object(o.a)(M,2),Y=F[0],q=(F[1],Object(i.useState)("")),G=Object(o.a)(q,2),H=G[0],K=(G[1],Object(i.useState)(!1)),V=Object(o.a)(K,2),J=V[0],U=V[1],W=Object(i.useState)([]),z=Object(o.a)(W,2),Z=z[0],Q=(z[1],Object(i.useState)({id:null,show:!1})),X=Object(o.a)(Q,2),$=X[0],ee=X[1],te=[{label:"Client Id",value:"clientId",width:"50%"},{label:"Client Name",value:"clientName"},{label:"Email Id",value:"email"},{label:"Date of Birth",value:"dateOfBirth"},{label:"Relative Name",value:"relativeName"},{label:"Relationship",value:"relationShip",width:"50%"}],ae=function(){var e=Object(r.a)(g().mark((function e(t){var a,n,r,o,i,l,c,s,u,d,p,f;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,D(!0),U(!1),r={page:t||1,limit:10,search:R},e.next=6,Object(m.getClientList)(r);case 6:200===(o=e.sent).status&&(null===o||void 0===o||null===(a=o.data)||void 0===a||null===(n=a.data)||void 0===n?void 0:n.list.length)>0?(j(null===o||void 0===o||null===(i=o.data)||void 0===i||null===(l=i.data)||void 0===l?void 0:l.list),C(null===o||void 0===o||null===(c=o.data)||void 0===c||null===(s=c.data)||void 0===s||null===(u=s.pageMeta)||void 0===u?void 0:u.pageCount),w(null===o||void 0===o||null===(d=o.data)||void 0===d||null===(p=d.data)||void 0===p||null===(f=p.pageMeta)||void 0===f?void 0:f.currentPage)):j([]),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("err",e.t0);case 13:return e.prev=13,D(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[0,10,13,16]])})));return function(t){return e.apply(this,arguments)}}(),ne=function(e){ee({id:e,show:!0})},re=function(){var e=Object(r.a)(g().mark((function e(){var t,a;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!$.show||!$.id){e.next=6;break}return t={id:$.id},e.next=4,Object(m.deleteClient)(t);case 4:200===(a=e.sent).status&&(Object(v.Toast)({type:"success",message:a.data.message}),ae(k));case 6:ee({show:!1,id:null});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),oe=Object(i.useCallback)(Object(h.debounceFunction)((function(e){T(e)}),500),[]),ie=function(){var e=Object(r.a)(g().mark((function e(t){return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.length>0?(U(!0),Z.length=0,Z.push.apply(Z,Object(n.a)(Object.values(t)))):U(!1);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),le=function(){var e=Object(r.a)(g().mark((function e(){var t,a;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(Z.length>0)){e.next=6;break}return t={ids:Z},e.next=4,Object(m.bulkDeleteClient)(t);case 4:200===(a=e.sent).status&&(Object(v.Toast)({type:"success",message:a.data.message}),ae(k),Z.length=0);case 6:ee({show:!1,id:null});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){localStorage.getItem("editPage")?(ae(localStorage.getItem("editPage")),localStorage.removeItem("editPage")):ae(k)}),[R,Y,H]),l.a.createElement("div",{className:"px-5 py-3 clients_family"},l.a.createElement("h6",null,"Client\u2019s Family"),l.a.createElement("div",{className:"flex justify-content-between align-items-center my-4"},l.a.createElement("div",{className:"cursor-pointer",style:{width:"300px"}},l.a.createElement(c.default,{className:"login_input Notification_input",type:"text",value:R,onChange:function(e){return oe(e.target.value)},placeholder:"Search by Id, Name, Email",name:"search",Iconic:!0,Search:!0})),l.a.createElement("div",{className:"cursor-pointer",style:{minWidth:"150px"}},J&&l.a.createElement(p.default,{className:"authButton1",label:"Delete",onClick:ne}))),l.a.createElement("div",{className:"row align-items-center"},_?l.a.createElement(u.default,{loading:_,className:"d-flex align-items-center justify-content-center mx-auto mt-5 pt-5"}):P.length>0?l.a.createElement("div",{className:" px-3"},l.a.createElement(s.default,{data:P,EditAction:t,includedKeys:te,pageCount:E,currentPage:k,setBulkDelete:U,handleOpenModal:ne,onRowsSelect:ie,onPageChange:function(e){w(e.selected),ae(e)},setCurrentPage:w,editRouteName:"/admin/clients-family/edit-client"})):l.a.createElement("div",{className:""},l.a.createElement(f.default,{EditAction:t,DeleteAction:a,includedKeys:te}),l.a.createElement("p",{className:"d-flex align-items-center justify-content-center mt-5 pt-5"},"No Data Available"))),l.a.createElement("div",null,l.a.createElement(d.default,{modalOpen:$.show,closeModal:function(){return ee({id:null,show:!1})},handleDelete:Z.length>0?le:re,DeleteMessage:"Are you sure you want to delete Staff?"})))}},637:function(e,t,a){},638:function(e,t,a){},639:function(e,t,a){},640:function(e,t,a){},642:function(e,t,a){e.exports=a.p+"static/media/ErrorImg.b30f2c03.svg"},643:function(e,t,a){e.exports=a.p+"static/media/ReadImg.96474dd0.svg"},644:function(e,t,a){e.exports=a.p+"static/media/SuccessImg.4b68588c.svg"},645:function(e,t,a){e.exports=a.p+"static/media/deleteIcon.b8b189cc.svg"},646:function(e,t,a){e.exports=a.p+"static/media/editIcon.d54ed3bb.svg"},661:function(e,t,a){},772:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(148);var r=a(237);function o(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},773:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(237);function r(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(n.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,i=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw o}}}}},803:function(e,t,a){var n;e.exports=(n=a(1),function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t,a){e.exports=a(2)()},function(e,t){e.exports=n},function(e,t,a){"use strict";var n=a(3);function r(){}function o(){}o.resetWarningCache=r,e.exports=function(){function e(e,t,a,r,o,i){if(i!==n){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:r};return a.PropTypes=a,a}},function(e,t,a){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(0),i=a.n(o);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var c=function(e){var t=e.pageClassName,a=e.pageLinkClassName,n=e.page,o=e.selected,i=e.activeClassName,c=e.activeLinkClassName,s=e.getEventListener,u=e.pageSelectedHandler,d=e.href,p=e.extraAriaContext,f=e.pageLabelBuilder,m=e.ariaLabel||"Page "+n+(p?" "+p:""),v=null;return o&&(v="page",m=e.ariaLabel||"Page "+n+" is your current page",t=void 0!==t?t+" "+i:i,void 0!==a?void 0!==c&&(a=a+" "+c):a=c),r.a.createElement("li",{className:t},r.a.createElement("a",l({role:"button",className:a,href:d,tabIndex:"0","aria-label":m,"aria-current":v,onKeyPress:u},s(u)),f(n)))};c.propTypes={pageSelectedHandler:i.a.func.isRequired,selected:i.a.bool.isRequired,pageClassName:i.a.string,pageLinkClassName:i.a.string,activeClassName:i.a.string,activeLinkClassName:i.a.string,extraAriaContext:i.a.string,href:i.a.string,ariaLabel:i.a.string,page:i.a.number.isRequired,getEventListener:i.a.func.isRequired,pageLabelBuilder:i.a.func.isRequired};var s=c;function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var d=function(e){var t=e.breakLabel,a=e.breakClassName,n=e.breakLinkClassName,o=e.breakHandler,i=e.getEventListener,l=a||"break";return r.a.createElement("li",{className:l},r.a.createElement("a",u({className:n,role:"button",tabIndex:"0",onKeyPress:o},i(o)),t))};d.propTypes={breakLabel:i.a.oneOfType([i.a.string,i.a.node]),breakClassName:i.a.string,breakLinkClassName:i.a.string,breakHandler:i.a.func.isRequired,getEventListener:i.a.func.isRequired};var p=d;function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function v(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return b(e)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(o,e);var t,a,n=function(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=y(e);if(t){var r=y(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return g(this,a)}}(o);function o(e){var t,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),E(b(t=n.call(this,e)),"handlePreviousPage",(function(e){var a=t.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,a>0&&t.handlePageSelected(a-1,e)})),E(b(t),"handleNextPage",(function(e){var a=t.state.selected,n=t.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,a<n-1&&t.handlePageSelected(a+1,e)})),E(b(t),"handlePageSelected",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1,t.state.selected!==e?(t.setState({selected:e}),t.callCallback(e)):t.callActiveCallback(e)})),E(b(t),"getEventListener",(function(e){return E({},t.props.eventListener,e)})),E(b(t),"handleBreakClick",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1;var n=t.state.selected;t.handlePageSelected(n<e?t.getForwardJump():t.getBackwardJump(),a)})),E(b(t),"callCallback",(function(e){void 0!==t.props.onPageChange&&"function"==typeof t.props.onPageChange&&t.props.onPageChange({selected:e})})),E(b(t),"callActiveCallback",(function(e){void 0!==t.props.onPageActive&&"function"==typeof t.props.onPageActive&&t.props.onPageActive({selected:e})})),E(b(t),"pagination",(function(){var e=[],a=t.props,n=a.pageRangeDisplayed,o=a.pageCount,i=a.marginPagesDisplayed,l=a.breakLabel,c=a.breakClassName,s=a.breakLinkClassName,u=t.state.selected;if(o<=n)for(var d=0;d<o;d++)e.push(t.getPageElement(d));else{var f,m,v,h=n/2,g=n-h;u>o-n/2?h=n-(g=o-u):u<n/2&&(g=n-(h=u));var b=function(e){return t.getPageElement(e)};for(f=0;f<o;f++)(m=f+1)<=i||m>o-i||f>=u-h&&f<=u+g?e.push(b(f)):l&&e[e.length-1]!==v&&(v=r.a.createElement(p,{key:f,breakLabel:l,breakClassName:c,breakLinkClassName:s,breakHandler:t.handleBreakClick.bind(null,f),getEventListener:t.getEventListener}),e.push(v))}return e})),void 0!==e.initialPage&&void 0!==e.forcePage&&console.warn("(react-paginate): Both initialPage (".concat(e.initialPage,") and forcePage (").concat(e.forcePage,") props are provided, which is discouraged.")+" Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components"),a=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,t.state={selected:a},t}return t=o,(a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,n=e.extraAriaContext,r=e.pageCount;void 0===t||a||this.callCallback(t),n&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."),Number.isInteger(r)||console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage}),Number.isInteger(e.pageCount)&&!Number.isInteger(this.props.pageCount)&&console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,n=e+t.pageRangeDisplayed;return n>=a?a-1:n}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var t=this.props,a=t.hrefBuilder,n=t.pageCount;if(a&&e!==this.state.selected&&e>=0&&e<n)return a(e+1)}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var t=this.state.selected,a=this.props,n=a.pageClassName,o=a.pageLinkClassName,i=a.activeClassName,l=a.activeLinkClassName,c=a.extraAriaContext,u=a.pageLabelBuilder;return r.a.createElement(s,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:t===e,pageClassName:n,pageLinkClassName:o,activeClassName:i,activeLinkClassName:l,extraAriaContext:c,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,pageLabelBuilder:u,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props.renderOnZeroPageCount;if(0===this.props.pageCount&&void 0!==e)return e?e(this.props):e;var t=this.props,a=t.disabledClassName,n=t.pageCount,o=t.className,i=t.containerClassName,l=t.previousLabel,c=t.previousClassName,s=t.previousLinkClassName,u=t.previousAriaLabel,d=t.prevRel,p=t.nextLabel,f=t.nextClassName,v=t.nextLinkClassName,h=t.nextAriaLabel,g=t.nextRel,b=this.state.selected,y=c+(0===b?" ".concat(a):""),E=f+(b===n-1?" ".concat(a):""),C=0===b?"true":"false",N=b===n-1?"true":"false";return r.a.createElement("ul",{className:o||i},r.a.createElement("li",{className:y},r.a.createElement("a",m({className:s,href:this.hrefBuilder(b-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":C,"aria-label":u,rel:d},this.getEventListener(this.handlePreviousPage)),l)),this.pagination(),r.a.createElement("li",{className:E},r.a.createElement("a",m({className:v,href:this.hrefBuilder(b+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":N,"aria-label":h,rel:g},this.getEventListener(this.handleNextPage)),p)))}}])&&v(t.prototype,a),o}(n.Component);E(C,"propTypes",{pageCount:i.a.number.isRequired,pageRangeDisplayed:i.a.number.isRequired,marginPagesDisplayed:i.a.number.isRequired,previousLabel:i.a.node,previousAriaLabel:i.a.string,prevRel:i.a.string,nextLabel:i.a.node,nextAriaLabel:i.a.string,nextRel:i.a.string,breakLabel:i.a.oneOfType([i.a.string,i.a.node]),hrefBuilder:i.a.func,onPageChange:i.a.func,onPageActive:i.a.func,initialPage:i.a.number,forcePage:i.a.number,disableInitialCallback:i.a.bool,containerClassName:i.a.string,className:i.a.string,pageClassName:i.a.string,pageLinkClassName:i.a.string,pageLabelBuilder:i.a.func,activeClassName:i.a.string,activeLinkClassName:i.a.string,previousClassName:i.a.string,nextClassName:i.a.string,previousLinkClassName:i.a.string,nextLinkClassName:i.a.string,disabledClassName:i.a.string,breakClassName:i.a.string,breakLinkClassName:i.a.string,extraAriaContext:i.a.string,ariaLabelBuilder:i.a.func,eventListener:i.a.string,renderOnZeroPageCount:i.a.func}),E(C,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextRel:"next",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,pageLabelBuilder:function(e){return e},eventListener:"onClick",renderOnZeroPageCount:void 0}),t.default=C}]))},814:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return o}));var n=a(0);function r(e){return Object(n.a)({tag:"svg",attr:{viewBox:"0 0 192 512"},child:[{tag:"path",attr:{d:"M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"}}]})(e)}function o(e){return Object(n.a)({tag:"svg",attr:{viewBox:"0 0 192 512"},child:[{tag:"path",attr:{d:"M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"}}]})(e)}}}]);
//# sourceMappingURL=92.9e006631.chunk.js.map
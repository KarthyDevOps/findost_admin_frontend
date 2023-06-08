/*! For license information please see 20.14e39eef.chunk.js.LICENSE.txt */
(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[20,84,92,101,121,141,145,152,179,183,184],{340:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(751);n(614);t.default=function(e){var t=e.placeholder,n=void 0===t?"":t,r=e.register,i=void 0===r?{}:r,c=e.value,l=void 0===c?"":c,u=e.type,s=void 0===u?"text":u,d=e.onChange,f=e.name,h=void 0===f?"":f,m=(e.maxlength,e.icons,e.GB,e.onWheel,e.grayedBox),p=void 0!==m&&m,v=e.Iconic,y=void 0!==v&&v,g=e.disabled,b=void 0!==g&&g,E=e.maxLength,w=e.Search,x=void 0!==w&&w;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"input_head"},a.a.createElement("input",{disabled:b,name:h,placeholder:n,className:p?"inputBoxGrayed":y?"inputBoxStyle1":"inputBoxStyle",ref:i,defaultValue:l,type:s,maxLength:E,onWheel:function(e){return e.currentTarget.blur()},onChange:function(e){var t={target:{name:e.target.name,value:e.target.value}};d&&d(t)},autoComplete:"off"}),y&&x?a.a.createElement("i",{className:"search_icon"},a.a.createElement(o.b,{size:18,style:{color:"#7E7E7E"}})):""))}},343:function(e,t,n){"use strict";n.r(t);var r=n(48),a=n(0),o=n.n(a),i=n(753);n(615);t.default=function(e){var t=e.value,n=e.onChange,a=e.options,c=e.placeholder,l=e.isMulti,u=e.controlShouldRenderValue,s={dropdownIndicator:function(e){return Object(r.a)(Object(r.a)({},e),{},{color:"#000000"})}};return o.a.createElement(i.a,{isMulti:l,value:t,onChange:n,options:a,isClearable:!1,controlShouldRenderValue:u,components:{IndicatorSeparator:function(){return null}},styles:s,placeholder:c})}},347:function(e,t,n){"use strict";n.r(t);var r=n(778),a=n(44),o=n(0),i=n.n(o),c=n(854),l=n.n(c),u=(n(620),n(869)),s=n(105),d=n.n(s),f=n(619),h=n.n(f),m=n(618),p=n.n(m),v=n(617),y=n.n(v),g=n(19);t.default=function(e){var t=e.data,n=e.isCheck,c=e.EditAction,s=e.DeleteAction,f=e.ReadAction,m=e.includedKeys,v=e.pageCount,b=e.onPageChange,E=e.editRouteName,w=e.setCurrentPage,x=e.handleOpenModal,N=e.currentPage,O=e.onRowsSelect;console.log("data :>> ",t);var C=Object(o.useState)([]),j=Object(a.a)(C,2),k=j[0],L=j[1],S={active:"#27AE60",inactive:"#EB5757",open:"#EB5757",accepted:"#2F80ED",inprogress:"#F2C94C",closed:"#27AE60",failed:"#EB5757",success:"#27AE60"};return i.a.createElement("div",{className:"table-container"},i.a.createElement("table",{className:"data-table"},i.a.createElement("thead",null,i.a.createElement("tr",null,n?i.a.createElement("th",{className:"checkBox_place"},i.a.createElement("input",{type:"checkbox",onChange:function(){var e;k.length===t.length?e=[]:e=t.map((function(e){return e._id}));L(e),O(e)},checked:k.length===t.length,className:"mt-2 check_box"})):i.a.createElement(i.a.Fragment,null),m.map((function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("th",{className:"absorbing-column",key:e},e.label))})),s||c?s?i.a.createElement(i.a.Fragment,null,i.a.createElement("th",{className:"checkBox_place"},"Actions"),i.a.createElement("th",{className:"checkBox_place"})):i.a.createElement("th",{className:"checkBox_place"}):null)),i.a.createElement("tbody",null,t.map((function(e){return i.a.createElement("tr",{key:e.id},n&&i.a.createElement("td",{className:"checkBox_place"},i.a.createElement("input",{type:"checkbox",onChange:function(){return function(e){var t;t=k.includes(e)?k.filter((function(t){return t!==e})):[].concat(Object(r.a)(k),[e]),L(t),O(t)}(e._id)},checked:k.includes(e._id),className:"mt-2 check_box"})),m.map((function(t){var n=t.value;if(e.hasOwnProperty(n)){var r=e[n],a=(t.label,n.toLowerCase());if(a.includes("status")){var o=r.toLowerCase(),c=S[o]||"black";return i.a.createElement("td",{key:n},i.a.createElement("span",{style:{color:c}},r.charAt(0).toUpperCase()+r.slice(1)))}if(a.includes("id"))return i.a.createElement("td",{key:n},r);if(d()(r,"YYYY-MM-DDTHH:mm:ss.SSSZ",!0).isValid())return i.a.createElement("td",{key:n},d()(r).format("MMM DD YYYY hh:mm a"));if("string"===typeof r&&/<[a-z][\s\S]*>/i.test(r)){var l=r.replace(/<[^>]+>/g,"");return i.a.createElement("td",{key:n},l)}return i.a.createElement("td",{key:n},"boolean"===typeof r?r?i.a.createElement("span",{style:{color:"#1D9E00"}},"Active"):i.a.createElement("span",{style:{color:"#DD2025"}},"Inactive"):r)}return null})),c&&i.a.createElement("td",null,i.a.createElement("img",{src:h.a,alt:"Edit",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){localStorage.removeItem("editId"),localStorage.setItem("editId",e._id),g.history.push("".concat(E))}})),f&&i.a.createElement("td",null,i.a.createElement("img",{src:y.a,alt:"read",style:{color:"#B4B4B4",cursor:"pointer"},onClick:function(){localStorage.removeItem("editId"),localStorage.setItem("editId",e._id),g.history.push("".concat(E))}})),s&&i.a.createElement("td",{onClick:function(){return x(e._id)}},i.a.createElement("img",{src:p.a,alt:"delete",style:{color:"#B4B4B4",cursor:"pointer"}})))})))),i.a.createElement("div",{className:"my-4"},i.a.createElement(l.a,{previousLabel:i.a.createElement(u.a,null),nextLabel:i.a.createElement(u.b,null),pageCount:v,onPageChange:function(e){w(e.selected+1),b(e.selected+1)},forcePage:N-1,containerClassName:"pagination",previousClassName:"pagination-previous",nextClassName:"pagination-next",pageClassName:"pagination-item",breakClassName:"pagination-item",activeClassName:"active_page"})))}},349:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"debounceFunction",(function(){return a}));var a=function(e,t){clearTimeout(r),r=setTimeout(e,t)}},371:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n(44),o=n(0),i=n.n(o),c=(n(632),n(106)),l=n(340),u=n(343),s=n(347),d=n(349);function f(){f=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r=Object.defineProperty||function(e,t,n){e[t]=n.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(S){l=function(e,t,n){return e[t]=n}}function u(e,t,n,a){var o=t&&t.prototype instanceof h?t:h,i=Object.create(o.prototype),c=new j(a||[]);return r(i,"_invoke",{value:x(e,n,c)}),i}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(S){return{type:"throw",arg:S}}}e.wrap=u;var d={};function h(){}function m(){}function p(){}var v={};l(v,o,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(k([])));g&&g!==t&&n.call(g,o)&&(v=g);var b=p.prototype=h.prototype=Object.create(v);function E(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){var a;r(this,"_invoke",{value:function(r,o){function i(){return new t((function(a,i){!function r(a,o,i,c){var l=s(e[a],e,o);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(d).then((function(e){u.value=e,i(u)}),(function(e){return r("throw",e,i,c)}))}c(l.arg)}(r,o,a,i)}))}return a=a?a.then(i,i):i()}})}function x(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return L()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=N(i,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=s(e,t,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===d)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}function N(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,N(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var a=s(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,d;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function j(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function k(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,a=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:L}}function L(){return{value:void 0,done:!0}}return m.prototype=p,r(b,"constructor",{value:p,configurable:!0}),r(p,"constructor",{value:m,configurable:!0}),m.displayName=l(p,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,l(e,c,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},E(w.prototype),l(w.prototype,i,(function(){return this})),e.AsyncIterator=w,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new w(u(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},E(b),l(b,c,"Generator"),l(b,o,(function(){return this})),l(b,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=k,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),C(n),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;C(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:k(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},e}t.default=function(e){e.create,e.view;var t=e.edit,n=e.remove,h=Object(o.useState)(1),m=Object(a.a)(h,2),p=m[0],v=m[1],y=Object(o.useState)(1),g=Object(a.a)(y,2),b=g[0],E=g[1],w=Object(o.useState)([]),x=Object(a.a)(w,2),N=x[0],O=x[1],C=Object(o.useState)(""),j=Object(a.a)(C,2),k=j[0],L=j[1],S=function(){var e=Object(r.a)(f().mark((function e(t){var n,r,a,o,i,l,u,s,d,h,m;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={page:b,limit:10,search:t},e.next=4,Object(c.getClientList)(n);case 4:200===(r=e.sent).status&&(console.log("response",null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.data),O(null===r||void 0===r||null===(o=r.data)||void 0===o||null===(i=o.data)||void 0===i?void 0:i.list),v(null===r||void 0===r||null===(l=r.data)||void 0===l||null===(u=l.data)||void 0===u||null===(s=u.pageMeta)||void 0===s?void 0:s.pageCount),E(null===r||void 0===r||null===(d=r.data)||void 0===d||null===(h=d.data)||void 0===h||null===(m=h.pageMeta)||void 0===m?void 0:m.currentPage)),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}();Object(o.useEffect)((function(){S()}),[]);return i.a.createElement("div",{className:"px-5 py-3 clients_family"},i.a.createElement("h6",null,"Client\u2019s Family"),i.a.createElement("div",{className:"row align-items-center"},i.a.createElement("div",{className:"col-4"},i.a.createElement(l.default,{className:"login_input Notification_input",type:"text",value:k,onChange:function(e){!function(e){L(e.target.value),Object(d.debounceFunction)((function(){return S(e.target.value)}),1200)}(e)},placeholder:"Search by Id, Username, Email",name:"search",Iconic:!0,Search:!0})),i.a.createElement("div",{className:"col-2"},i.a.createElement(u.default,{placeholder:"Filter by Role"})),i.a.createElement("div",{className:"col-2"},i.a.createElement(u.default,{placeholder:"Filter by Status"}))),i.a.createElement("div",{className:" mt-4 p-3"},i.a.createElement(s.default,{data:N,isCheck:!0,EditAction:t,DeleteAction:n,includedKeys:[{label:"Client Id",value:"clientId"},{label:"Client Name",value:"clientName"},{label:"Email Id",value:"email"},{label:"Date of Birth",value:"dateOfBirth"},{label:"Relative Name",value:"relativeName"},{label:"Relationship",value:"relationShip"}],pageCount:p,onPageChange:function(e){E(e)},setCurrentPage:E,editRouteName:"/admin/clients-family/edit-client"})))}},614:function(e,t,n){},615:function(e,t,n){},617:function(e,t,n){e.exports=n.p+"static/media/ReadImg.96474dd0.svg"},618:function(e,t,n){e.exports=n.p+"static/media/deleteIcon.b8b189cc.svg"},619:function(e,t,n){e.exports=n.p+"static/media/editIcon.d54ed3bb.svg"},620:function(e,t,n){},632:function(e,t,n){},737:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(236);function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Object(r.a)(e,t)}},778:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(149);var a=n(234);function o(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=20.14e39eef.chunk.js.map
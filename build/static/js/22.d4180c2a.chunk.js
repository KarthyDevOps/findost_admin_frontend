(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[22,94,141,148,188],{147:function(t,e,n){"use strict";n.r(e);var a=n(44),r=n(0),o=n.n(r),c=n(901),l=(n(623),n(857)),i=n(622),s=n.n(i),u=n(338);e.default=function(t){var e=t.onFileDrop,n=Object(r.useState)(),i=Object(a.a)(n,2),d=i[0],p=i[1],m=Object(c.a)({onDrop:function(t){var n=t[0],a=new FileReader;a.onload=function(){p(a.result),e(a.result)},a.readAsDataURL(n)}}),f=m.getRootProps,v=m.getInputProps;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",f({className:"dropzone"}),o.a.createElement("span",{className:"cloud_icon"},o.a.createElement("img",{src:s.a,alt:"icon"})),o.a.createElement("input",v()),d?o.a.createElement(o.a.Fragment,null,o.a.createElement("img",{src:d,alt:"Dropped",className:"preview_image"})):o.a.createElement("div",{className:"drag_text"},o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,"Drag your files here to start uploading or"),o.a.createElement("div",{className:" drag_btn "},o.a.createElement(u.default,{addProductbtn:!0,label:"Browse"})))),d&&o.a.createElement("span",{style:{position:"absolute",top:"0",right:"0",cursor:"pointer"},onClick:function(t){t.stopPropagation(),p(null)}},o.a.createElement(l.b,{size:24,style:{color:"red"}}))))}},338:function(t,e,n){"use strict";n.r(e),n.d(e,"NormalButton",(function(){return s}));var a=n(102),r=n(103),o=n(233),c=n(232),l=n(0),i=n.n(l),s=(n(610),function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var t=this.props,e=t.className,n=void 0===e?"":e,a=t.label,r=void 0===a?"":a,o=t.onClick,c=t.id,l=t.addBnt,s=t.profileCreatNext,u=t.profileCreatNext1,d=t.profileCreatBack,p=t.authButton1,m=t.type,f=void 0===m?"submit":m,v=t.disabled,b=void 0!==v&&v,g=t.authButton,h=void 0!==g&&g,y=t.loginButton,E=void 0!==y&&y,N=t.tableBtn,B=void 0!==N&&N,O=t.rightIcon,C=void 0===O?"":O,w=t.leftIcon,j=void 0===w?"":w,k=t.btnSecondary,x=void 0!==k&&k,P=t.profileBtn,z=void 0!==P&&P,D=t.outlineBtn,F=void 0!==D&&D,S=t.cancel,I=void 0!==S&&S,_=t.addProductbtn,R=void 0!==_&&_;return i.a.createElement("div",null,i.a.createElement("button",{id:c,type:f,className:"cursor-pointer \n                     ".concat(h?"authButton":"","\n                     ").concat(s?"profileCreatNext":"","\n                     ").concat(u?"profileCreatNext1":"","\n                     ").concat(p?"authButton1":"","\n                     ").concat(d?"profileCreatBack":"","\n                     ").concat(E?"loginButton":"","\n                     ").concat(l?"addBnt":"","\n                     ").concat(B?"tableBtn":"","\n                     ").concat(x?"btnSecondary":"","\n                     ").concat(z?"profileBtn":"","\n                     ").concat(F?"outlineBtn":"","\n                     ").concat(I?"cancelBtn ":"","\n                     ").concat(R?"addProductbtn ":"","\n                   \n                     ").concat(n),onClick:o,disabled:b},""!==j?i.a.createElement("span",{className:"btn-left-icon ".concat(j)}):null,r,""!==C?i.a.createElement("span",{className:"btn-right-icon ".concat(C)}):null))}}]),n}(l.Component));e.default=s},610:function(t,e,n){},622:function(t,e,n){t.exports=n.p+"static/media/uploadcloud.015f6b10.svg"},623:function(t,e,n){},853:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var a=n(0),r=n.n(a),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},c=r.a.createContext&&r.a.createContext(o),l=function(){return(l=Object.assign||function(t){for(var e,n=1,a=arguments.length;n<a;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},i=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(t);r<a.length;r++)e.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(t,a[r])&&(n[a[r]]=t[a[r]])}return n};function s(t){return function(e){return r.a.createElement(u,l({attr:l({},t.attr)},e),function t(e){return e&&e.map((function(e,n){return r.a.createElement(e.tag,l({key:n},e.attr),t(e.child))}))}(t.child))}}function u(t){var e=function(e){var n,a=t.attr,o=t.size,c=t.title,s=i(t,["attr","size","title"]),u=o||e.size||"1em";return e.className&&(n=e.className),t.className&&(n=(n?n+" ":"")+t.className),r.a.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,a,s,{className:n,style:l(l({color:t.color||e.color},e.style),t.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&r.a.createElement("title",null,c),t.children)};return void 0!==c?r.a.createElement(c.Consumer,null,(function(t){return e(t)})):e(o)}}}]);
//# sourceMappingURL=22.d4180c2a.chunk.js.map
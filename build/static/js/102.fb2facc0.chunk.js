(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[102],{407:function(e,t,a){"use strict";a.r(t);var n=a(31),l=a(81),r=a(0),o=a.n(r),i=a(11),c=a(1),d=a(3),s=(a(318),a(7)),p=a(9),m=r.forwardRef((function(e,t){var a=e.active,n=void 0!==a&&a,l=e.alternativeLabel,o=e.children,i=e.classes,p=e.className,m=e.completed,b=void 0!==m&&m,v=e.connector,u=e.disabled,f=void 0!==u&&u,h=e.expanded,x=void 0!==h&&h,y=e.index,j=e.last,g=e.orientation,O=Object(d.a)(e,["active","alternativeLabel","children","classes","className","completed","connector","disabled","expanded","index","last","orientation"]),E=v?r.cloneElement(v,{orientation:g,alternativeLabel:l,index:y,active:n,completed:b,disabled:f}):null,L=r.createElement("div",Object(c.a)({className:Object(s.a)(i.root,i[g],p,l&&i.alternativeLabel,b&&i.completed),ref:t},O),E&&l&&0!==y?E:null,r.Children.map(o,(function(e){return r.isValidElement(e)?r.cloneElement(e,Object(c.a)({active:n,alternativeLabel:l,completed:b,disabled:f,expanded:x,last:j,icon:y+1,orientation:g},e.props)):null})));return E&&!l&&0!==y?r.createElement(r.Fragment,null,E,L):L})),b=Object(p.a)({root:{},horizontal:{paddingLeft:8,paddingRight:8},vertical:{},alternativeLabel:{flex:1,position:"relative"},completed:{}},{name:"MuiStep"})(m),v=a(601),u=r.forwardRef((function(e,t){var a=e.active,n=e.alternativeLabel,l=void 0!==n&&n,o=e.classes,i=e.className,p=e.completed,m=e.disabled,b=(e.index,e.orientation),v=void 0===b?"horizontal":b,u=Object(d.a)(e,["active","alternativeLabel","classes","className","completed","disabled","index","orientation"]);return r.createElement("div",Object(c.a)({className:Object(s.a)(o.root,o[v],i,l&&o.alternativeLabel,a&&o.active,p&&o.completed,m&&o.disabled),ref:t},u),r.createElement("span",{className:Object(s.a)(o.line,{horizontal:o.lineHorizontal,vertical:o.lineVertical}[v])}))})),f=Object(p.a)((function(e){return{root:{flex:"1 1 auto"},horizontal:{},vertical:{marginLeft:12,padding:"0 0 8px"},alternativeLabel:{position:"absolute",top:12,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"},active:{},completed:{},disabled:{},line:{display:"block",borderColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},lineHorizontal:{borderTopStyle:"solid",borderTopWidth:1},lineVertical:{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24}}}),{name:"MuiStepConnector"})(u),h=r.createElement(f,null),x=r.forwardRef((function(e,t){var a=e.activeStep,n=void 0===a?0:a,l=e.alternativeLabel,o=void 0!==l&&l,i=e.children,p=e.classes,m=e.className,b=e.connector,u=void 0===b?h:b,f=e.nonLinear,x=void 0!==f&&f,y=e.orientation,j=void 0===y?"horizontal":y,g=Object(d.a)(e,["activeStep","alternativeLabel","children","classes","className","connector","nonLinear","orientation"]),O=r.isValidElement(u)?r.cloneElement(u,{orientation:j}):null,E=r.Children.toArray(i),L=E.map((function(e,t){var a={index:t,active:!1,completed:!1,disabled:!1};return n===t?a.active=!0:!x&&n>t?a.completed=!0:!x&&n<t&&(a.disabled=!0),r.cloneElement(e,Object(c.a)({alternativeLabel:o,connector:O,last:t+1===E.length,orientation:j},a,e.props))}));return r.createElement(v.a,Object(c.a)({square:!0,elevation:0,className:Object(s.a)(p.root,p[j],m,o&&p.alternativeLabel),ref:t},g),L)})),y=Object(p.a)({root:{display:"flex",padding:24},horizontal:{flexDirection:"row",alignItems:"center"},vertical:{flexDirection:"column"},alternativeLabel:{alignItems:"flex-start"}},{name:"MuiStepper"})(x),j=a(136),g=a(237),O=Object(g.a)(r.createElement("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"}),"CheckCircle"),E=Object(g.a)(r.createElement("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning"),L=a(331),N=r.createElement("circle",{cx:"12",cy:"12",r:"12"}),S=r.forwardRef((function(e,t){var a=e.completed,n=void 0!==a&&a,l=e.icon,o=e.active,i=void 0!==o&&o,c=e.error,d=void 0!==c&&c,p=e.classes;if("number"===typeof l||"string"===typeof l){var m=Object(s.a)(p.root,i&&p.active,d&&p.error,n&&p.completed);return d?r.createElement(E,{className:m,ref:t}):n?r.createElement(O,{className:m,ref:t}):r.createElement(L.a,{className:m,ref:t},N,r.createElement("text",{className:p.text,x:"12",y:"16",textAnchor:"middle"},l))}return l})),z=Object(p.a)((function(e){return{root:{display:"block",color:e.palette.text.disabled,"&$completed":{color:e.palette.primary.main},"&$active":{color:e.palette.primary.main},"&$error":{color:e.palette.error.main}},text:{fill:e.palette.primary.contrastText,fontSize:e.typography.caption.fontSize,fontFamily:e.typography.fontFamily},active:{},completed:{},error:{}}}),{name:"MuiStepIcon"})(S),C=r.forwardRef((function(e,t){var a=e.active,n=void 0!==a&&a,l=e.alternativeLabel,o=void 0!==l&&l,i=e.children,p=e.classes,m=e.className,b=e.completed,v=void 0!==b&&b,u=e.disabled,f=void 0!==u&&u,h=e.error,x=void 0!==h&&h,y=(e.expanded,e.icon),g=(e.last,e.optional),O=e.orientation,E=void 0===O?"horizontal":O,L=e.StepIconComponent,N=e.StepIconProps,S=Object(d.a)(e,["active","alternativeLabel","children","classes","className","completed","disabled","error","expanded","icon","last","optional","orientation","StepIconComponent","StepIconProps"]),C=L;return y&&!C&&(C=z),r.createElement("span",Object(c.a)({className:Object(s.a)(p.root,p[E],m,f&&p.disabled,o&&p.alternativeLabel,x&&p.error),ref:t},S),y||C?r.createElement("span",{className:Object(s.a)(p.iconContainer,o&&p.alternativeLabel)},r.createElement(C,Object(c.a)({completed:v,active:n,error:x,icon:y},N))):null,r.createElement("span",{className:p.labelContainer},i?r.createElement(j.a,{variant:"body2",component:"span",display:"block",className:Object(s.a)(p.label,o&&p.alternativeLabel,v&&p.completed,n&&p.active,x&&p.error)},i):null,g))}));C.muiName="StepLabel";var w=Object(p.a)((function(e){return{root:{display:"flex",alignItems:"center","&$alternativeLabel":{flexDirection:"column"},"&$disabled":{cursor:"default"}},horizontal:{},vertical:{},label:{color:e.palette.text.secondary,"&$active":{color:e.palette.text.primary,fontWeight:500},"&$completed":{color:e.palette.text.primary,fontWeight:500},"&$alternativeLabel":{textAlign:"center",marginTop:16},"&$error":{color:e.palette.error.main}},active:{},completed:{},error:{},disabled:{},iconContainer:{flexShrink:0,display:"flex",paddingRight:8,"&$alternativeLabel":{paddingRight:0}},alternativeLabel:{},labelContainer:{width:"100%"}}}),{name:"MuiStepLabel"})(C),k=a(332),$=a(106),F=Object(k.a)((function(e){return{}}));t.default=Object($.b)((function(e){var t;return{DoctorTypeSet:null===e||void 0===e||null===(t=e.home)||void 0===t?void 0:t.selectedDoctorType}}),null)((function(e){var t,a,c,d,s=e.DoctorTypeSet,p=Object(i.useParams)().id,m=Object(i.useHistory)(),v=F(),u=o.a.useState(),f=Object(l.a)(u,2),h=f[0],x=f[1],j=(t={"/doctor/create-basic-details":0},Object(n.a)(t,"/doctor/create-education-details/".concat(p),1),Object(n.a)(t,"/doctor/create-appointment/".concat(p),2),Object(n.a)(t,"/doctor/create-payment-details/".concat(p),3),t),g=(a={"/doctor/create-basic-details":0},Object(n.a)(a,"/doctor/create-education-details/".concat(p),1),Object(n.a)(a,"/doctor/create-payment-details/".concat(p),2),a),O=j[null===(c=m.location)||void 0===c?void 0:c.pathname],E=g[null===(d=m.location)||void 0===d?void 0:d.pathname],L="GP"==s?["Basic","Education","Payment"]:["Basic","Education","Appointment","Payment"];return Object(r.useEffect)((function(){x("GP"==s?E:O)}),[]),o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",{className:v.root},o.a.createElement(y,{activeStep:Number(h),orientation:"horizontal",style:{background:"none"}},L.map((function(e,t){return o.a.createElement(b,{key:t},o.a.createElement(w,{icon:o.a.createElement("span",{style:{color:O==t||O>t?"#FFFFFF":"#545454",background:O==t||O>t?"#0E69C2":"transparent",height:"23px",width:"23px",borderRadius:"50%",border:O==t||O>t?"transparent":"1.5px solid black",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"13px",fontWeight:700}},t+1)},e,t+1==L.length?null:o.a.createElement("img",{src:"rightArrow",style:{width:"20px",margin:"0px 10px"}})))}))))))}))}}]);
//# sourceMappingURL=102.fb2facc0.chunk.js.map
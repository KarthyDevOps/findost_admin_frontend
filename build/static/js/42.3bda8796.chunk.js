(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[42],{166:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=(n(10),n(1033)),i=n(1214),s=n(1215),d=n.n(s);n(1216);function p(e){return new Promise((function(t,n){var a=new XMLHttpRequest;a.open("POST","https://api.imgur.com/3/image"),a.setRequestHeader("Authorization","Client-ID XXXXX");var r=new FormData;r.append("image",e),a.send(r),a.addEventListener("load",(function(){var e=JSON.parse(a.responseText);t(e)})),a.addEventListener("error",(function(){var e=JSON.parse(a.responseText);n(e)}))}))}t.default=function(e){var t=e.editorState,n=e.setEditorState,a=(e.initialState,e.value,e.placeholder),s=void 0===a?"Type your broadcast message":a;return r.a.createElement("div",{className:"editor"},r.a.createElement(i.Editor,{editorState:t,onEditorStateChange:function(e){d()(Object(o.convertToRaw)(e.getCurrentContent()));n(e)},placeholder:s,toolbar:{inline:{inDropdown:!0},list:{inDropdown:!0},textAlign:{inDropdown:!0},link:{inDropdown:!0},history:{inDropdown:!0},image:{uploadCallback:p,alt:{present:!0,mandatory:!0}}}}))}}}]);
//# sourceMappingURL=42.3bda8796.chunk.js.map
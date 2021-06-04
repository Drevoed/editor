var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,c=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,s=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&c(e,n,t[n]);if(r)for(var n of r(t))i.call(t,n)&&c(e,n,t[n]);return e},a=(e,r)=>t(e,n(r));import{R as l,E as u,a as f,P as d,b as g,T as m,r as p,c as h,w as y,d as b,_ as k,e as v,t as x,f as E,S as w,g as O}from"./vendor.804028a5.js";const P=()=>({type:"paragraph",children:[{text:""}]}),S={paragraph:({attributes:e,children:t})=>l.createElement("p",s({},e),t)};function D(e){const t=S[e.element.type];return l.createElement(t,s({},e))}function T(e,t){const n=t,{type:c}=n,l=((e,t)=>{var n={};for(var c in e)o.call(e,c)&&t.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&r)for(var c of r(e))t.indexOf(c)<0&&i.call(e,c)&&(n[c]=e[c]);return n})(n,["type"]);if("leaf"===c){if(!e.selection)return;return u.leaf(e,e.selection)}return u.above(e,a(s({},l),{match:t=>u.isBlock(e,t)}))}function A(e){return f.isRange(e)?e.anchor:d.isPoint(e)?e:g.isPath(e)?{path:e,offset:0}:void 0}function B(e,t){if(!e.selection)return;const n=T(e,{type:"leaf"});if(!n)return;const[,r]=n,o=A(r);if(!o)return;const i=A(t.at||e.selection);if(!i)return;const c="string"==typeof t.matchString?[t.matchString]:t.matchString;e:for(const s of c){let n=s.split(""),r=i,c=i,a=i;for(;n.length>0;){const i=n.pop();if(!i)continue e;const l=u.before(e,r);if(!l)continue e;if(u.string(e,{anchor:l,focus:r})!==i){if(t.failOnInvalid)continue e;n=s.split("")}if(c=l,n.length+1===s.length&&(a=r),r=l,n.length>0&&d.equals(r,o))continue e}return"start"===t.edge?c:a}}const M=["bold","italic","underlined","inlineCode"];const R={getAbove:T,getPointFromLocation:A,getPointBefore:B,getRangeBefore:function(e,t){if(!e.selection)return;const n=B(e,a(s({},t),{edge:"start"}));if(!n)return;const r=A(e.selection);return r?{anchor:n,focus:r}:void 0},getRangeFromBlockStart:function(e){if(!e.selection)return;const t=T(e,{type:"block"});if(!t)return;const[,n]=t,r=u.start(e,n),o=A(e.selection);return o?{anchor:r,focus:o}:void 0},hasSelection:function(e){return!!e.selection&&f.isExpanded(e.selection)},leafHasModifications:function(e,t=M){return t.some((t=>e[t]))},leafModifications:function(e,t=M){return t.filter((t=>e[t]))}};const C={bold:"b",italic:"em",underlined:"u",inlineCode:"code"};const N=e=>function({leaf:e,children:t,attributes:n}){if(!R.leafHasModifications(e))return l.createElement("span",s({},n),t);const r=R.leafModifications(e);return r.reduce(((e,t,o)=>{const i=C[t],c=o===r.length-1?n:{};return l.createElement(i,c,e)}),t)}(e);function _(e){return l.createElement(N,s({},e))}var L="_editor-container_1yaf4_1",j="_editor_1yaf4_1";const K=(e,t)=>{if(!e.selection)return;if(f.isExpanded(e.selection))return;const n=R.getAbove(e,{type:"block",mode:"lowest"});if(!n)return;const r=R.getAbove(e,{type:"leaf",mode:"lowest"});if(!r)return;const[,o]=n,[i]=r,c=u.end(e,o),a=f.start(e.selection);if(!d.equals(a,c))return;R.leafHasModifications(i)&&(t.preventDefault(),m.insertNodes(e,function(e,t={}){return s({text:e},t)}(" "),{select:!0}))},q=new KeyboardEvent("noop");function F({editor:e,entry:t}){if(t.onlyOnBlockStart)return function({editor:e,entry:t}){const n=R.getRangeFromBlockStart(e);if(!n)return{match:!1};const r=u.string(e,n);if(!r)return{match:!1};if(!t.markup.includes(r))return{match:!1};return{match:!0,range:n}}({editor:e,entry:t});if(!e.selection)return{match:!1};const n=R.getRangeBefore(e,{matchString:t.markup});return n?{match:!0,range:n}:{match:!1}}function I({editor:e,entry:t,range:n,insertText:r,block:o,leaf:i}){const{trigger:c=" ",keepTrigger:s=!0}=t,a=function({editor:e,entry:t,range:n}){const r=u.string(e,n);if(!r)return;if("after"===t.markupType)return"";const[o,i]=t.markup;return r.slice(o.length,-i.length)}({editor:e,entry:t,range:n});if(!a)return;const l="block"===t.transformType?function({editor:e,entry:t,range:n,text:r,block:o,leaf:i}){const c=t.transform({text:r,block:o,leaf:i});m.delete(e,{at:n}),m.setNodes(e,c,{match:t=>u.isBlock(e,t)})}({editor:e,entry:t,range:n,text:a,block:o,leaf:i}):function({editor:e,entry:t,range:n,text:r,block:o,leaf:i}){const c=t.transform({text:r,block:o,leaf:i});m.delete(e,{at:n}),m.insertNodes(e,c,{at:n.anchor,select:!0})}({editor:e,entry:t,range:n,text:a,block:o,leaf:i});return s&&("leaf"===t.transformType?K(e,q):r(c)),l}function H({text:e,editor:t,entry:n,insertText:r}){const{trigger:o=" ",skip:i=(()=>!1)}=n;if(e!==o)return{match:!1};const c=R.getAbove(t,{type:"block"}),s=R.getAbove(t,{type:"leaf"});if(!c)return{match:!1};if(!s)return{match:!1};const[a]=c,[l]=s;if(i({block:a,leaf:l}))return{match:!1};let f;return f="after"===n.markupType?F({editor:t,entry:n}):function({editor:e,entry:t}){const[n,r]=t.markup,o=R.getPointBefore(e,{edge:"end",matchString:r,failOnInvalid:!0});if(!o)return{match:!1};const i=u.before(e,o);if(!i)return{match:!1};const c=R.getPointBefore(e,{at:i,edge:"start",matchString:n});return c?{match:!0,range:{anchor:c,focus:o}}:{match:!1}}({editor:t,entry:n}),f.match&&I({editor:t,entry:n,range:f.range,block:a,leaf:l,insertText:r}),f}const z={format:function(e){return t=>function(e,t){const{insertText:n}=e;return e.insertText=r=>{if(R.hasSelection(e))return n(r);let o=0;for(const i of t){const{match:t}=H({text:r,editor:e,entry:i,insertText:n});t&&(o+=1)}o||n(r)},e}(t,e)}};const J=[y,b];function G(e,t){const n=u.marks(e);n&&(n[t]?e.removeMark(t):e.addMark(t,!0))}const Q=function(){const e=new Map,t=(t,n,r)=>{const o=e.get(t);o&&o(n,r)};return{register:(t,n)=>{e.set(t,n)},execute:t,curryExecute:e=>(n,r)=>{t(e,n,r)}}}();Q.register("insert-soft-break",((e,t)=>{const{selection:n}=e;n&&(t.preventDefault(),e.insertText("\n"))})),Q.register("insert-exit-break",((e,t)=>{if(!e.selection)return;t.preventDefault(),f.isExpanded(e.selection)&&m.delete(e,{at:e.selection});const n=R.getAbove(e,{type:"block",mode:"highest"});if(!n)return;const[,r]=n,[o,i]=u.edges(e,r),c=R.getPointFromLocation(e.selection);c&&(d.equals(c,i)?m.insertNodes(e,P(),{select:!0}):d.equals(c,o)?m.insertNodes(e,P(),{select:!1}):m.splitNodes(e,{mode:"highest"}))})),Q.register("get-out-the-leaf",K),Q.register("make-bold",((e,t)=>{t.preventDefault(),G(e,"bold")})),Q.register("make-italic",((e,t)=>{t.preventDefault(),G(e,"italic")})),Q.register("make-underlined",((e,t)=>{t.preventDefault(),G(e,"underlined")})),Q.register("make-inline-code",((e,t)=>{t.preventDefault(),G(e,"inlineCode")}));const U={};const V=function({scope:e="global",stopAllEvents:t=!0}={}){U[e]||(U[e]=[]);const n=U[e];return{register:(e,t)=>{n.push({keybind:e,callback:t,is:k(e,{byKey:!0})})},unregister:e=>{const t=n.findIndex((t=>t.keybind===e));-1!==t&&n.splice(t,1)},unregisterAll:()=>{n.splice(0,n.length)},keyDown:(e,r)=>{const o=e instanceof Event?e:e.nativeEvent;t&&o.stopPropagation();for(const i of n){if(i.is(o)){t||o.stopPropagation(),i.callback(r,o);break}}}}}({scope:"slate-editor"}),W={"insert-soft-break":"shift+enter","insert-exit-break":["enter","mod+enter"],"get-out-the-leaf":"arrowright","make-bold":"mod+b","make-italic":"mod+i","make-underlined":"mod+u","make-inline-code":["mod+e","mod+`"]};var X="_toolbar-container_1hulz_16";const Y=({editor:e,children:t})=>{const n=function(e){const t=p.exports.useRef(null);return p.exports.useLayoutEffect((()=>{const n=v.toDOMNode(e,e);t.current=n}),[e]),t}(e),r=function(){const e=p.exports.useMemo((()=>{const e=document.createElement("div");return e.classList.add(X),e}),[]);return p.exports.useEffect((()=>{const t=e=>e.preventDefault();return e.addEventListener("mousedown",t),()=>e.removeEventListener("mousedown",t)}),[e]),e}();return p.exports.useEffect((()=>{if(!n.current)return;const e=x(n.current,{theme:"editor-light",content:r,placement:"top",trigger:"manual",interactive:!0,arrow:!1,offset:[0,10],moveTransition:"transform 0.1s ease-out"}),t=()=>{if(!n.current)return;if(document.activeElement!==n.current)return e.hide();const t=window.getSelection();if(!t||t.isCollapsed)return e.hide();e.setProps({getReferenceClientRect:()=>t.getRangeAt(0).getBoundingClientRect()}),e.show()};return document.addEventListener("selectionchange",t),()=>{e.destroy(),document.removeEventListener("selectionchange",t)}}),[r,n]),E.createPortal(t,r)};const Z=({value:e,onChange:t,customKeybinds:n={},customExtensions:r=[]})=>{const o=function(e){return p.exports.useMemo((()=>{const t=[...J,...e];return function(e,t){return t.reduce(((e,t)=>t(e)),e)}(h(),t)}),[z])}(r),{handleKeyDown:i}=function(e,t){return p.exports.useEffect((()=>{const e=s(s({},W),t);V.unregisterAll(),Object.entries(e).forEach((([e,t])=>{if(!t)return;const n="string"==typeof t?[t]:t;for(const r of n)V.register(r,Q.curryExecute(e))}))}),[t]),{handleKeyDown:p.exports.useCallback((t=>{V.keyDown(t,e)}),[e])}}(o,n);return l.createElement("div",{className:L},l.createElement(w,{editor:o,value:e,onChange:t},l.createElement(O,{className:j,renderElement:D,renderLeaf:_,onKeyDown:i,autoFocus:!0})),l.createElement(Y,{editor:o},"Toolbar"))};const $=()=>{const[e,t]=function(){const[e,t]=p.exports.useState([{type:"paragraph",children:[{text:"A line of text in a paragraph."}]}]);return p.exports.useEffect((()=>{console.log(JSON.stringify(e,null,2))}),[e]),[e,t]}();return l.createElement(Z,{value:e,onChange:t})};E.render(l.createElement($,null),document.querySelector("#root"));

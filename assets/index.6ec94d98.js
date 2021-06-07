var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,c=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,a=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&c(e,n,t[n]);if(r)for(var n of r(t))i.call(t,n)&&c(e,n,t[n]);return e},s=(e,r)=>t(e,n(r)),l=(e,t)=>{var n={};for(var c in e)o.call(e,c)&&t.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&r)for(var c of r(e))t.indexOf(c)<0&&i.call(e,c)&&(n[c]=e[c]);return n};import{R as u,E as f,a as d,P as m,b as g,T as p,r as h,c as v,w as y,d as b,_ as k,e as x,t as E,f as w,g as S,j as O,i as B,S as M,h as C}from"./vendor.a64931de.js";var T="_heading_10tov_1";const _=["bold","italic","underlined","inlineCode"];var D="_paragraph_3qk71_1";Array.from(_);const P=(e="")=>({type:"paragraph",children:[{text:e}]}),R={paragraph:({attributes:e,children:t})=>u.createElement("p",a({className:D},e),t),"heading-1":({attributes:e,children:t})=>u.createElement("h1",a({className:T},e),t)};function A(e){const t=R[e.element.type];return u.createElement(t,a({},e))}function L(e,t){const n=t,{type:r}=n,o=l(n,["type"]);if("leaf"===r){if(!e.selection)return;return f.leaf(e,e.selection)}return f.above(e,s(a({},o),{match:t=>f.isBlock(e,t)}))}function N(e){return d.isRange(e)?e.anchor:m.isPoint(e)?e:g.isPath(e)?{path:e,offset:0}:void 0}function j(e,t){if(!e.selection)return;const n=L(e,{type:"leaf"});if(!n)return;const[,r]=n,o=N(r);if(!o)return;const i=N(t.at||e.selection);if(!i)return;const c="string"==typeof t.matchString?[t.matchString]:t.matchString;e:for(const a of c){let n=a.split(""),r=i,c=i,s=i;for(;n.length>0;){const i=n.pop();if(!i)continue e;const l=f.before(e,r);if(!l)continue e;if(f.string(e,{anchor:l,focus:r})!==i){if(t.failOnInvalid)continue e;n=a.split("")}if(c=l,n.length+1===a.length&&(s=r),r=l,n.length>0&&m.equals(r,o))continue e}return"start"===t.edge?c:s}}const I={getAbove:L,getPointFromLocation:N,getPointBefore:j,getRangeBefore:function(e,t){if(!e.selection)return;const n=j(e,s(a({},t),{edge:"start"}));if(!n)return;const r=N(e.selection);return r?{anchor:n,focus:r}:void 0},getRangeFromBlockStart:function(e){if(!e.selection)return;const t=L(e,{type:"block"});if(!t)return;const[,n]=t,r=f.start(e,n),o=N(e.selection);return o?{anchor:r,focus:o}:void 0},hasSelection:function(e){return!!e.selection&&d.isExpanded(e.selection)},leafHasModifications:function(e,t=_){return t.some((t=>e[t]))},leafModifications:function(e,t=_){return t.filter((t=>e[t]))}};const q={bold:"b",italic:"em",underlined:"u",inlineCode:"code"};const F=e=>function({leaf:e,children:t,attributes:n}){const r=I.leafModifications(e);let o=t;for(const i of r){const e=q[i];o=u.createElement(e,null,o)}return e.href&&(o=u.createElement("a",{href:e.href,target:"_blank"},o)),o===t&&(o=u.createElement("span",null,o)),u.cloneElement(o,n)}(e);function K(e){return u.createElement(F,a({},e))}var H="_editor_ikoit_1";const U={toggleModification:function(e,t){const n=f.marks(e);n&&(n[t]?e.removeMark(t):e.addMark(t,!0))},setHref:function(e,t){if(!f.marks(e))return;e.addMark("href",t)},clearHref:function(e){if(!f.marks(e))return;e.removeMark("href")},getOutTheLeaf:function(e){if(!e.selection)return{success:!1};if(d.isExpanded(e.selection))return{success:!1};const t=I.getAbove(e,{type:"block",mode:"lowest"});if(!t)return{success:!1};const n=I.getAbove(e,{type:"leaf",mode:"lowest"});if(!n)return{success:!1};const[,r]=t,[o]=n,i=f.end(e,r),c=d.start(e.selection);return m.equals(c,i)&&I.leafHasModifications(o)?(p.insertNodes(e,function({text:e,href:t,modifications:n=[]}){return n.reduce(((e,t)=>(e[t]=!0,e)),{text:e,href:t})}({text:" "}),{select:!0}),{success:!0}):{success:!1}},insertExitBreak:function(e){if(!e.selection)return;d.isExpanded(e.selection)&&p.delete(e,{at:e.selection});const t=I.getAbove(e,{type:"block",mode:"highest"});if(!t)return;const[,n]=t,[r,o]=f.edges(e,n),i=I.getPointFromLocation(e.selection);if(i){if(!m.equals(i,o))return m.equals(i,r)?(p.insertNodes(e,P(),{select:!1}),void p.select(e,{path:g.next(n).concat(0),offset:0})):void p.splitNodes(e,{mode:"highest"});p.insertNodes(e,P(),{select:!0})}},insertSoftBreak:e=>{e.selection&&e.insertText("\n")}};function W({editor:e,entry:t}){if(t.onlyOnBlockStart)return function({editor:e,entry:t}){const n=I.getRangeFromBlockStart(e);if(!n)return{match:!1};const r=f.string(e,n);if(!r)return{match:!1};if(!t.markup.includes(r))return{match:!1};return{match:!0,range:n}}({editor:e,entry:t});if(!e.selection)return{match:!1};const n=I.getRangeBefore(e,{matchString:t.markup});return n?{match:!0,range:n}:{match:!1}}function z({editor:e,entry:t,range:n,insertText:r,block:o,leaf:i}){const{trigger:c=" ",keepTrigger:a=!0}=t,s=function({editor:e,entry:t,range:n}){const r=f.string(e,n);if(!r)return;if("after"===t.markupType)return"";const[o,i]=t.markup;return r.slice(o.length,-i.length)}({editor:e,entry:t,range:n});if(!s)return;const l="block"===t.transformType?function({editor:e,entry:t,range:n,text:r,block:o,leaf:i}){const c=t.transform({text:r,block:o,leaf:i});p.delete(e,{at:n}),p.setNodes(e,c,{match:t=>f.isBlock(e,t)})}({editor:e,entry:t,range:n,text:s,block:o,leaf:i}):function({editor:e,entry:t,range:n,text:r,block:o,leaf:i}){const c=t.transform({text:r,block:o,leaf:i});p.delete(e,{at:n}),p.insertNodes(e,c,{at:n.anchor,select:!0})}({editor:e,entry:t,range:n,text:s,block:o,leaf:i});return a&&("leaf"===t.transformType?U.getOutTheLeaf(e):r(c)),l}function J({text:e,editor:t,entry:n,insertText:r}){const{trigger:o=" ",skip:i=(()=>!1)}=n;if(e!==o)return{match:!1};const c=I.getAbove(t,{type:"block"}),a=I.getAbove(t,{type:"leaf"});if(!c)return{match:!1};if(!a)return{match:!1};const[s]=c,[l]=a;if(i({block:s,leaf:l}))return{match:!1};let u;return u="after"===n.markupType?W({editor:t,entry:n}):function({editor:e,entry:t}){const[n,r]=t.markup,o=I.getPointBefore(e,{edge:"end",matchString:r,failOnInvalid:!0});if(!o)return{match:!1};const i=f.before(e,o);if(!i)return{match:!1};const c=I.getPointBefore(e,{at:i,edge:"start",matchString:n});return c?{match:!0,range:{anchor:c,focus:o}}:{match:!1}}({editor:t,entry:n}),u.match&&z({editor:t,entry:n,range:u.range,block:s,leaf:l,insertText:r}),u}const G={format:function(e){return t=>function(e,t){const{insertText:n}=e;return e.insertText=r=>{if(I.hasSelection(e))return n(r);let o=0;for(const i of t){const{match:t}=J({text:r,editor:e,entry:i,insertText:n});t&&(o+=1)}o||n(r)},e}(t,e)}};const Q=[y,b];const V=function(){const e=new Map,t=(t,n)=>{const r=e.get(t);r&&r(n)};return{register:(t,n)=>{e.set(t,n)},execute:t,curryExecute:e=>n=>{t(e,n)}}}();V.register("insert-soft-break",(({editor:e,event:t})=>{t.preventDefault(),U.insertSoftBreak(e)})),V.register("insert-exit-break",(({editor:e,event:t})=>{t.preventDefault(),U.insertExitBreak(e)})),V.register("get-out-the-leaf",(({editor:e,event:t})=>{const{success:n}=U.getOutTheLeaf(e);n&&t.preventDefault()})),V.register("make-bold",(({editor:e,event:t})=>{t.preventDefault(),U.toggleModification(e,"bold")})),V.register("make-italic",(({editor:e,event:t})=>{t.preventDefault(),U.toggleModification(e,"italic")})),V.register("make-underlined",(({editor:e,event:t})=>{t.preventDefault(),U.toggleModification(e,"underlined")})),V.register("make-inline-code",(({editor:e,event:t})=>{t.preventDefault(),U.toggleModification(e,"inlineCode")}));const X={};const Y=function({scope:e="global",stopAllEvents:t=!0}={}){X[e]||(X[e]=[]);const n=X[e];return{register:(e,t)=>{n.push({keybind:e,callback:t,is:k(e,{byKey:!0})})},unregister:e=>{const t=n.findIndex((t=>t.keybind===e));-1!==t&&n.splice(t,1)},unregisterAll:()=>{n.splice(0,n.length)},keyDown:(e,r)=>{const o=e instanceof Event?e:e.nativeEvent;t&&o.stopPropagation();for(const i of n){if(i.is(o)){t||o.stopPropagation(),i.callback(r,o);break}}}}}({scope:"slate-editor"}),Z={"insert-soft-break":"shift+enter","insert-exit-break":["enter","mod+enter"],"get-out-the-leaf":"arrowright","make-bold":"mod+b","make-italic":"mod+i","make-underlined":"mod+u","make-inline-code":["mod+e","mod+`"]};const $=h.exports.createContext({});function ee(){return h.exports.useContext($)}const te="editor-default editor-toolbar",ne="editor-default editor-keybind";var re="_toolbar-container_1ij7b_1";const oe=h.exports.createContext({instance:{current:null},lastSelectedText:{current:""}});const ie=({renderButtons:e})=>{const t=function(){const e=ee(),t=h.exports.useRef(null);return h.exports.useLayoutEffect((()=>{const n=x.toDOMNode(e,e);t.current=n}),[e]),t}(),n=function(){const e=h.exports.useMemo((()=>{const e=document.createElement("div");return e.classList.add(re),e}),[]);return h.exports.useEffect((()=>{const t=e=>e.preventDefault();return e.addEventListener("mousedown",t),()=>e.removeEventListener("mousedown",t)}),[e]),e}(),{instance:r,lastSelectedText:o}=h.exports.useContext(oe),i=(c=function(){const[,e]=h.exports.useReducer((e=>e+1),0);return e}(),a=300,h.exports.useMemo((()=>E(c,a)),[c,a]));var c,a;return h.exports.useEffect((()=>{if(!t.current)return;r.current=w(t.current,{theme:te,content:n,placement:"top",trigger:"manual",interactive:!0,offset:[0,15],moveTransition:"transform 0.1s ease-out",getReferenceClientRect:()=>{const e=window.getSelection();if(!e)return new DOMRect;return e.getRangeAt(0).getBoundingClientRect()}});const e=O((()=>{r.current&&(i(),r.current.show())}),300),c=()=>{if(!t.current)return;if(!r.current)return;if(document.activeElement!==t.current)return r.current.hide();const n=window.getSelection();if(!n)return r.current.hide();if(n.isCollapsed)return o.current="",r.current.hide();const c=n.getRangeAt(0).toString();if(c===o.current)return i();r.current.hide(),e(),o.current=c};return document.addEventListener("selectionchange",c),()=>{var e;null==(e=r.current)||e.destroy(),document.removeEventListener("selectionchange",c)}}),[n,t]),S.createPortal(e(),n)};const ce=new KeyboardEvent("noop");var ae="_container_17abf_1",se="_icon_17abf_15";const le=e=>{var t=e,{icon:n,isActive:r,tooltip:o,style:i}=t,c=l(t,["icon","isActive","tooltip","style"]);const s=u.createElement("button",a({className:ae,"data-active":r},c),u.createElement("span",{className:se,style:i},n));return o?u.createElement(B,{theme:ne,content:o,offset:[0,20],hideOnClick:!1},s):s};const ue=({modification:e,icon:t,action:n,tooltip:r,style:o={}})=>{const i=ee(),c=function(e,t){const n=f.marks(e);return!!n&&Boolean(n[t])}(i,e);return u.createElement(le,{icon:t,isActive:c,tooltip:r,onClick:e=>{e.preventDefault(),V.execute(n,{editor:i,event:ce})},style:o})},fe=({value:e,onChange:t,readOnly:n=!1,customKeybinds:r={},customExtensions:o=[]})=>{const i=function(e){return h.exports.useMemo((()=>{const t=[...Q,...e];return function(e,t){return t.reduce(((e,t)=>t(e)),e)}(v(),t)}),[G])}(o),{handleKeyDown:c}=function(e,t){return h.exports.useEffect((()=>{const e=a(a({},Z),t);Y.unregisterAll(),Object.entries(e).forEach((([e,t])=>{if(!t)return;const n="string"==typeof t?[t]:t;for(const r of n)Y.register(r,((t,n)=>{V.execute(e,{editor:t,event:n})}))}))}),[t]),{handleKeyDown:h.exports.useCallback((t=>{Y.keyDown(t,e)}),[e])}}(i,r),s={instance:h.exports.useRef(null),lastSelectedText:h.exports.useRef("")};return u.createElement($.Provider,{value:i},u.createElement(oe.Provider,{value:s},u.createElement(M,{editor:i,value:e,onChange:t},u.createElement(C,{className:H,renderElement:A,renderLeaf:K,onKeyDown:c,readOnly:n,autoFocus:!0})),u.createElement(ie,{editor:i,renderButtons:de})))};function de(){return u.createElement(u.Fragment,null,u.createElement(ue,{modification:"bold",icon:"B",action:"make-bold",tooltip:"Bold (⌘B)",style:{fontWeight:"bold"}}),u.createElement(ue,{modification:"italic",icon:"I",action:"make-italic",tooltip:"Italic (⌘I)",style:{fontStyle:"italic"}}),u.createElement(ue,{modification:"underlined",icon:"U",action:"make-underlined",tooltip:"Underlined (⌘U)",style:{textDecoration:"underline"}}),u.createElement(ue,{modification:"inlineCode",icon:u.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-code",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},u.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),u.createElement("polyline",{points:"7 8 3 12 7 16"}),u.createElement("polyline",{points:"17 8 21 12 17 16"}),u.createElement("line",{x1:"14",y1:"4",x2:"10",y2:"20"})),action:"make-inline-code",tooltip:"Inline-code (⌘E)",style:{width:18,height:18,paddingLeft:4}}))}const me=()=>{const[e,t]=function(){const[e,t]=h.exports.useState([{type:"heading-1",children:[{text:"Manage map or Set in effector store"}]},{type:"paragraph",children:[{text:"Sometimes we need to save Set in "},{text:"effector",italic:!0},{text:" store.\nSimple "},{text:"createStore(new Set())",inlineCode:!0},{text:" "},{text:"will not",bold:!0},{text:" trigger updates on "},{text:".add(item)",inlineCode:!0}]}]);return h.exports.useEffect((()=>{console.log(JSON.stringify(e,null,2))}),[e]),[e,t]}();return u.createElement(fe,{value:e,onChange:t})};S.render(u.createElement(me,null),document.querySelector("#root"));

var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,i=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,a=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&i(e,n,t[n]);if(r)for(var n of r(t))s.call(t,n)&&i(e,n,t[n]);return e};import{R as c,c as l,a as u,E as d,r as f,w as p,b,d as m,T as g,P as y,_ as v,S as h,e as k,f as x}from"./vendor.b1e3b472.js";const E=()=>({type:"paragraph",children:[{text:""}]}),w={paragraph:({attributes:e,children:t})=>c.createElement("p",a({},e),t)};function _(e){const t=w[e.element.type];return c.createElement(t,a({},e))}var O="_bold_1lpba_1",D="_italic_1lpba_5",j="_underlined_1lpba_9",A="_inline-code_1lpba_13";const C=["bold","italic","underlined","inlineCode"];const N=({attributes:e,children:t,leaf:n})=>{const{bold:r=!1,italic:o=!1,underlined:s=!1,inlineCode:i=!1}=n,u=l({[O]:r,[D]:o,[j]:s,[A]:i});return i?c.createElement("code",a({className:u},e),t):c.createElement("span",a({className:u},e),t)};function P(e){return c.createElement(N,a({},e))}var S="_editor_jylcw_1";const K={hasSelection:function(e){return!!e.selection&&u.isExpanded(e.selection)},getAbove:function(e,i){const c=i,{type:l}=c,u=((e,t)=>{var n={};for(var i in e)o.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&r)for(var i of r(e))t.indexOf(i)<0&&s.call(e,i)&&(n[i]=e[i]);return n})(c,["type"]);if("leaf"===l){if(!e.selection)return;return d.leaf(e,e.selection)}return d.above(e,(f=a({},u),t(f,n({match:t=>d.isBlock(e,t)}))));var f}};const q={format:function(e){return e=>function(e,t){const{insertText:n}=e;return e.insertText=t=>{if(K.hasSelection(e))return n(t);n(t)},e}(e)}};const M=[p,b,q.format([{type:"inline",between:["`","`"],to:"inlineCode"}])];function T(e,t){const n=d.marks(e);n&&(n[t]?e.removeMark(t):e.addMark(t,!0))}const B=function(){const e=new Map,t=(t,n,r)=>{const o=e.get(t);o&&o(n,r)};return{register:(t,n)=>{e.set(t,n)},execute:t,curryExecute:e=>(n,r)=>{t(e,n,r)}}}();B.register("insert-soft-break",((e,t)=>{const{selection:n}=e;n&&(t.preventDefault(),e.insertText("\n"))})),B.register("insert-exit-break",((e,t)=>{if(!e.selection)return;t.preventDefault(),u.isExpanded(e.selection)&&g.delete(e,{at:e.selection});const n=K.getAbove(e,{type:"block",mode:"highest"});if(!n)return;const[,r]=n,[o,s]=d.edges(e,r),i=u.start(e.selection);y.equals(i,s)?g.insertNodes(e,E(),{select:!0}):y.equals(i,o)?g.insertNodes(e,E(),{select:!1}):g.splitNodes(e,{mode:"highest"})})),B.register("get-out-the-leaf",((e,t)=>{if(!e.selection)return;if(u.isExpanded(e.selection))return;const n=K.getAbove(e,{type:"block",mode:"lowest"});if(!n)return;const r=K.getAbove(e,{type:"leaf",mode:"lowest"});if(!r)return;const[,o]=n,[s]=r,i=d.end(e,o),c=u.start(e.selection);if(!y.equals(c,i))return;C.some((e=>Boolean(s[e])))&&g.insertNodes(e,function(e,t={}){return a({text:e},t)}(" "),{select:!0})})),B.register("make-bold",((e,t)=>{t.preventDefault(),T(e,"bold")})),B.register("make-italic",((e,t)=>{t.preventDefault(),T(e,"italic")})),B.register("make-underlined",((e,t)=>{t.preventDefault(),T(e,"underlined")})),B.register("make-inline-code",((e,t)=>{t.preventDefault(),T(e,"inlineCode")}));const I={};const F=function({scope:e="global",stopAllEvents:t=!0}={}){I[e]||(I[e]=[]);const n=I[e];return{register:(e,t)=>{n.push({keybind:e,callback:t,is:v(e,{byKey:!0})})},unregister:e=>{const t=n.findIndex((t=>t.keybind===e));-1!==t&&n.splice(t,1)},unregisterAll:()=>{n.splice(0,n.length)},keyDown:(e,r)=>{const o=e instanceof Event?e:e.nativeEvent;t&&o.stopPropagation();for(const s of n){if(s.is(o)){t||o.stopPropagation(),s.callback(r,o);break}}}}}({scope:"slate-editor"}),J={"insert-soft-break":"shift+enter","insert-exit-break":["enter","mod+enter"],"get-out-the-leaf":"arrowright","make-bold":"mod+b","make-italic":"mod+i","make-underlined":"mod+u","make-inline-code":["mod+e","mod+`"]};const L=({value:e,onChange:t,customKeybinds:n={},customExtensions:r=[]})=>{const o=function(e){return f.exports.useMemo((()=>{const t=[...M,...e];return function(e,t){return t.reduce(((e,t)=>t(e)),e)}(m(),t)}),[q])}(r),{handleKeyDown:s}=function(e,t){return f.exports.useEffect((()=>{const e=a(a({},J),t);F.unregisterAll(),Object.entries(e).forEach((([e,t])=>{if(!t)return;const n="string"==typeof t?[t]:t;for(const r of n)F.register(r,B.curryExecute(e))}))}),[t]),{handleKeyDown:f.exports.useCallback((t=>{F.keyDown(t,e)}),[e])}}(o,n);return c.createElement(h,{editor:o,value:e,onChange:t},c.createElement(k,{className:S,renderElement:_,renderLeaf:P,onKeyDown:s,autoFocus:!0}))};const R=()=>{const[e,t]=function(){const[e,t]=f.exports.useState([{type:"paragraph",children:[{text:"A line of text in a paragraph."}]}]);return f.exports.useEffect((()=>{console.log(JSON.stringify(e,null,2))}),[e]),[e,t]}();return c.createElement(L,{value:e,onChange:t})};x.render(c.createElement(R,null),document.querySelector("#root"));

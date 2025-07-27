/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/lit-html@1.0.0/lib/shady-render.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,n=null)=>{let s=t;for(;s!==n;){const t=s.nextSibling;e.removeChild(s),s=t}},n=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${n}--\x3e`,i=new RegExp(`${n}|${s}`),o="$lit$";class r{constructor(e,t){this.parts=[],this.element=t;let s=-1,r=0;const l=[],c=t=>{const h=t.content,u=document.createTreeWalker(h,133,null,!1);let p=0;for(;u.nextNode();){s++;const t=u.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const l=t.attributes;let a=0;for(let e=0;e<l.length;e++)l[e].value.indexOf(n)>=0&&a++;for(;a-- >0;){const n=e.strings[r],l=d.exec(n)[2],a=l.toLowerCase()+o,c=t.getAttribute(a).split(i);this.parts.push({type:"attribute",index:s,name:l,strings:c}),t.removeAttribute(a),r+=c.length-1}}"TEMPLATE"===t.tagName&&c(t)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(n)>=0){const n=t.parentNode,o=e.split(i),d=o.length-1;for(let e=0;e<d;e++)n.insertBefore(""===o[e]?a():document.createTextNode(o[e]),t),this.parts.push({type:"node",index:++s});""===o[d]?(n.insertBefore(a(),t),l.push(t)):t.data=o[d],r+=d}}else if(8===t.nodeType)if(t.data===n){const e=t.parentNode;null!==t.previousSibling&&s!==p||(s++,e.insertBefore(a(),t)),p=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(l.push(t),s--),r++}else{let e=-1;for(;-1!==(e=t.data.indexOf(n,e+1));)this.parts.push({type:"node",index:-1})}}};c(t);for(const e of l)e.parentNode.removeChild(e)}}const l=e=>-1!==e.index,a=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(e,t){const{element:{content:n},parts:s}=e,i=document.createTreeWalker(n,133,null,!1);let o=u(s),r=s[o],l=-1,a=0;const d=[];let c=null;for(;i.nextNode();){l++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&a++;void 0!==r&&r.index===l;)r.index=null!==c?-1:r.index-a,o=u(s,o),r=s[o]}d.forEach((e=>e.parentNode.removeChild(e)))}const h=e=>{let t=11===e.nodeType?0:1;const n=document.createTreeWalker(e,133,null,!1);for(;n.nextNode();)t++;return t},u=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){const t=e[n];if(l(t))return n}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,m=e=>"function"==typeof e&&p.has(e),g={},f={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class v{constructor(e,t,n){this._parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this._parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=this.template.parts;let s=0,i=0;const o=e=>{const t=document.createTreeWalker(e,133,null,!1);let r=t.nextNode();for(;s<n.length&&null!==r;){const e=n[s];if(l(e))if(i===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(r.previousSibling),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(r,e.name,e.strings,this.options));s++}else i++,"TEMPLATE"===r.nodeName&&o(r.content),r=t.nextNode();else this._parts.push(void 0),s++}};return o(t),e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class x{constructor(e,t,n,s){this.strings=e,this.values=t,this.type=n,this.processor=s}getHTML(){const e=this.strings.length-1;let t="";for(let i=0;i<e;i++){const e=this.strings[i],r=d.exec(e);t+=r?e.substr(0,r.index)+r[1]+r[2]+o+r[3]+n:e+s}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}class y extends x{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),((e,t,n=null,s=null)=>{let i=t;for(;i!==n;){const t=i.nextSibling;e.insertBefore(i,s),i=t}})(t,n.firstChild),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w=e=>null===e||!("object"==typeof e||"function"==typeof e);class _{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let s=0;s<t;s++){n+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)n+="string"==typeof t?t:String(t);else n+="string"==typeof e?e:String(e)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||w(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(a()),this.endNode=e.appendChild(a())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=a()),e._insert(this.endNode=a())}insertAfterPart(e){e._insert(this.startNode=a()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;m(this._pendingValue);){const e=this._pendingValue;this._pendingValue=g,e(this)}const e=this._pendingValue;e!==g&&(w(e)?e!==this.value&&this._commitText(e):e instanceof x?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):e===f?(this.value=f,this.clear()):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const n=new v(t,e.processor,this.options),s=n._clone();n.update(e.values),this._commitNode(s),this.value=n}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,s=0;for(const i of e)n=t[s],void 0===n&&(n=new N(this.options),t.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(i),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class b{constructor(e,t,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this._pendingValue=e}commit(){for(;m(this._pendingValue);){const e=this._pendingValue;this._pendingValue=g,e(this)}if(this._pendingValue===g)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=g}}class T extends _{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new V(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class V extends S{}let E=!1;try{const e={get capture(){return E=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class C{constructor(e,t,n){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this._boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this._pendingValue=e}commit(){for(;m(this._pendingValue);){const e=this._pendingValue;this._pendingValue=g,e(this)}if(this._pendingValue===g)return;const e=this._pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),s&&(this._options=A(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(E?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function k(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const i=e.strings.join(n);return s=t.keyString.get(i),void 0===s&&(s=new r(e,e.getTemplateElement()),t.keyString.set(i,s)),t.stringsArray.set(e.strings,s),s}const M=new Map,L=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const H=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,n,s){const i=t[0];if("."===i){return new T(e,t.slice(1),n).parts}if("@"===i)return[new C(e,t.slice(1),s.eventContext)];if("?"===i)return[new b(e,t.slice(1),n)];return new _(e,t,n).parts}handleTextExpression(e){return new N(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const P=(e,...t)=>new x(e,t,"html",H),W=(e,...t)=>new y(e,t,"svg",H)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,$=(e,t)=>`${e}--${t}`;let B=!0;void 0===window.ShadyCSS?B=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),B=!1);const F=e=>t=>{const s=$(t.type,e);let i=M.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},M.set(s,i));let o=i.stringsArray.get(t.strings);if(void 0!==o)return o;const l=t.strings.join(n);if(o=i.keyString.get(l),void 0===o){const n=t.getTemplateElement();B&&window.ShadyCSS.prepareTemplateDom(n,e),o=new r(t,n),i.keyString.set(l,o)}return i.stringsArray.set(t.strings,o),o},I=["html","svg"],j=new Set,O=(e,t,n)=>{j.add(n);const s=e.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,n);const i=document.createElement("style");for(let e=0;e<s.length;e++){const t=s[e];t.parentNode.removeChild(t),i.textContent+=t.textContent}if((e=>{I.forEach((t=>{const n=M.get($(t,e));void 0!==n&&n.keyString.forEach((e=>{const{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{n.add(e)})),c(e,n)}))}))})(n),function(e,t,n=null){const{element:{content:s},parts:i}=e;if(null==n)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let r=u(i),l=0,a=-1;for(;o.nextNode();)for(a++,o.currentNode===n&&(l=h(t),n.parentNode.insertBefore(t,n));-1!==r&&i[r].index===a;){if(l>0){for(;-1!==r;)i[r].index+=l,r=u(i,r);return}r=u(i,r)}}(t,i,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,n),window.ShadyCSS.nativeShadow){const n=t.element.content.querySelector("style");e.insertBefore(n.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(i,t.element.content.firstChild);const e=new Set;e.add(i),c(t,e)}},R=(e,n,s)=>{const i=s.scopeName,o=L.has(n),r=n instanceof ShadowRoot&&B&&e instanceof x,l=r&&!j.has(i),a=l?document.createDocumentFragment():n;if(((e,n,s)=>{let i=L.get(n);void 0===i&&(t(n,n.firstChild),L.set(n,i=new N(Object.assign({templateFactory:k},s))),i.appendInto(n)),i.setValue(e),i.commit()})(e,a,Object.assign({templateFactory:F(i)},s)),l){const e=L.get(a);L.delete(a),e.value instanceof v&&O(a,e.value.template,i),t(n,n.firstChild),n.appendChild(a),L.set(n,e)}!o&&r&&window.ShadyCSS.styleElement(n.host)};export{x as TemplateResult,P as html,R as render,W as svg};export default null;
//# sourceMappingURL=/sm/98bece309f95df2068233128b14b53cab290423a3d2336f27c1f1fc9d3575898.map
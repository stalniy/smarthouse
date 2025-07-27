/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/lit-html@1.0.0/lit-html.js
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
const t=new WeakMap,e=e=>(...s)=>{const n=e(...s);return t.set(n,!0),n},s=e=>"function"==typeof e&&t.has(e),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null,n=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.insertBefore(i,n),i=e}},o=(t,e,s=null)=>{let n=e;for(;n!==s;){const e=n.nextSibling;t.removeChild(n),n=e}},r={},a={},l=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${l}--\x3e`,d=new RegExp(`${l}|${h}`),c="$lit$";class u{constructor(t,e){this.parts=[],this.element=e;let s=-1,n=0;const i=[],o=e=>{const r=e.content,a=document.createTreeWalker(r,133,null,!1);let h=0;for(;a.nextNode();){s++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const i=e.attributes;let o=0;for(let t=0;t<i.length;t++)i[t].value.indexOf(l)>=0&&o++;for(;o-- >0;){const i=t.strings[n],o=g.exec(i)[2],r=o.toLowerCase()+c,a=e.getAttribute(r).split(d);this.parts.push({type:"attribute",index:s,name:o,strings:a}),e.removeAttribute(r),n+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(l)>=0){const o=e.parentNode,r=t.split(d),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?m():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++s});""===r[a]?(o.insertBefore(m(),e),i.push(e)):e.data=r[a],n+=a}}else if(8===e.nodeType)if(e.data===l){const t=e.parentNode;null!==e.previousSibling&&s!==h||(s++,t.insertBefore(m(),e)),h=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(i.push(e),s--),n++}else{let t=-1;for(;-1!==(t=e.data.indexOf(l,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of i)t.parentNode.removeChild(t)}}const p=t=>-1!==t.index,m=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class v{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let s=0,i=0;const o=t=>{const n=document.createTreeWalker(t,133,null,!1);let r=n.nextNode();for(;s<e.length&&null!==r;){const t=e[s];if(p(t))if(i===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));s++}else i++,"TEMPLATE"===r.nodeName&&o(r.content),r=n.nextNode();else this._parts.push(void 0),s++}};return o(t),n&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */class f{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],n=g.exec(t);e+=n?t.substr(0,n.index)+n[1]+n[2]+c+n[3]+l:t+h}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}class x extends f{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,s=e.firstChild;return e.removeChild(s),i(e,s.firstChild),t}}
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
 */const _=t=>null===t||!("object"==typeof t||"function"==typeof t);class y{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||_(t)&&t===this.value||(this.value=t,s(t)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class V{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=m()),t._insert(this.endNode=m())}insertAfterPart(t){t._insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}const t=this._pendingValue;t!==r&&(_(t)?t!==this.value&&this._commitText(t):t instanceof f?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===a?(this.value=a,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const s=new v(e,t.processor,this.options),n=s._clone();s.update(t.values),this._commitNode(n),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const i of t)s=e[n],void 0===s&&(s=new V(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(i),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class w{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}if(this._pendingValue===r)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=r}}class b extends y{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends N{}let T=!1;try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class A{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=r,t(this)}if(this._pendingValue===r)return;const t=this._pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),i&&(this._options=S(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const S=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;class C{handleAttributeExpressions(t,e,s,n){const i=e[0];if("."===i){return new b(t,e.slice(1),s).parts}if("@"===i)return[new A(t,e.slice(1),n.eventContext)];if("?"===i)return[new w(t,e.slice(1),s)];return new y(t,e,s).parts}handleTextExpression(t){return new V(t)}}const M=new C;
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
 */function L(t){let e=H.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},H.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(l);return s=e.keyString.get(n),void 0===s&&(s=new u(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const H=new Map,k=new WeakMap,P=(t,e,s)=>{let n=k.get(e);void 0===n&&(o(e,e.firstChild),k.set(e,n=new V(Object.assign({templateFactory:L},s))),n.appendInto(e)),n.setValue(t),n.commit()};
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
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const $=(t,...e)=>new f(t,e,"html",M),B=(t,...e)=>new x(t,e,"svg",M);export{y as AttributeCommitter,N as AttributePart,w as BooleanAttributePart,C as DefaultTemplateProcessor,A as EventPart,V as NodePart,b as PropertyCommitter,E as PropertyPart,x as SVGTemplateResult,u as Template,v as TemplateInstance,f as TemplateResult,m as createMarker,M as defaultTemplateProcessor,e as directive,$ as html,s as isDirective,_ as isPrimitive,p as isTemplatePartActive,r as noChange,a as nothing,k as parts,o as removeNodes,P as render,i as reparentNodes,B as svg,H as templateCaches,L as templateFactory};export default null;
//# sourceMappingURL=/sm/c3afbd6ff177aaf9b760b979996df949c6e68534c7ce5a2108acfb0a5f4f0240.map
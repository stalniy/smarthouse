/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/lit-element@2.0.1/lit-element.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{TemplateResult as t}from"./lit-html.js";
import{render as e}from"./shady-render.js";
export{SVGTemplateResult,TemplateResult,html,svg} from"./lit-html.js";
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
 */window.JSCompiler_renameProperty=(t,e)=>t;const s={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},r=(t,e)=>e!==t&&(e==e||t==t),i={attribute:!0,type:String,converter:s,reflect:!1,hasChanged:r},o=Promise.resolve(!0);class n extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=o,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const r=this._attributeNameForProperty(s,e);void 0!==r&&(this._attributeToPropertyMap.set(r,s),t.push(r))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=i){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const r=this[t];this[s]=e,this.requestUpdate(t,r)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=r){return s(t,e)}static _propertyValueFromAttribute(t,e){const r=e.type,i=e.converter||s,o="function"==typeof i?i:i.fromAttribute;return o?o(t,r):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const r=e.type,i=e.converter;return(i&&i.toAttribute||s.toAttribute)(t,r)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this._updateState=32|this._updateState,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=i){const r=this.constructor,o=r._attributeNameForProperty(t,s);if(void 0!==o){const t=r._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,r=s._attributeToPropertyMap.get(t);if(void 0!==r){const t=s._classProperties.get(r)||i;this._updateState=16|this._updateState,this[r]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdate(t,e){let s=!0;if(void 0!==t&&!this._changedProperties.has(t)){const r=this.constructor,o=r._classProperties.get(t)||i;r._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.set(t,e),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):s=!1}return!this._hasRequestedUpdate&&s&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let t;this._updateState=4|this._updateState;const e=this._updatePromise;this._updatePromise=new Promise((e=>t=e)),await e,this._hasConnected||await new Promise((t=>this._hasConnectedResolver=t));const s=this.performUpdate();null!=s&&"function"==typeof s.then&&await s,t(!this._hasRequestedUpdate)}get _hasConnected(){return 32&this._updateState}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}n.finalized=!0;
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
const a=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:r}=e;return{kind:s,elements:r,finisher(e){window.customElements.define(t,e)}}})(t,e),h=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign({},e,{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function p(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):h(t,e)}const c=_(((t,e)=>t.querySelector(e))),d=_(((t,e)=>t.querySelectorAll(e))),l=(t,e,s)=>{Object.defineProperty(e,s,t)},u=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});function _(t){return e=>(s,r)=>{const i={get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0};return void 0!==r?l(i,s,r):u(i,s)}}const y=t=>(e,s)=>void 0!==s?((t,e,s)=>{Object.assign(e[s],t)})(t,e,s):((t,e)=>Object.assign({},e,{finisher(s){Object.assign(s.prototype[e.key],t)}}))(t,e)
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,S="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,f=Symbol();class m{constructor(t,e){if(e!==f)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(S?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const P=t=>new m(String(t),f),b=(t,...e)=>{const s=e.reduce(((e,s,r)=>e+(t=>{if(t instanceof m)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[r+1]),t[0]);return new m(s,f)};function w(t,e=[]){for(let s=0,r=t.length;s<r;s++){const r=t[s];Array.isArray(r)?w(r,e):e.push(r)}return e}
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const g=t=>t.flat?t.flat(1/0):w(t);class v extends n{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){g(t).reduceRight(((t,e)=>(t.add(e),t)),new Set).forEach((t=>e.unshift(t)))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?S?this.renderRoot.adoptedStyleSheets=t.map((t=>t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const s=this.render();s instanceof t&&this.constructor.render(s,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){}}v.finalized=!0,v.render=e;export{m as CSSResult,v as LitElement,n as UpdatingElement,b as css,a as customElement,s as defaultConverter,y as eventOptions,r as notEqual,p as property,c as query,d as queryAll,S as supportsAdoptingStyleSheets,P as unsafeCSS};export default null;
//# sourceMappingURL=/sm/8f93ea0fb5ee9a0f6aecde972598e8340379d4db7b8cb11652d8aa064937748a.map
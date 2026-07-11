import './lib/dahua.js';

// not any size can be used
const PREVIEW_SIZE = [640, 360];
const styles = `
  .card {
    position: relative;
    overflow: hidden;
    min-width: 320px;
    min-height: 180px;
  }
`;
let callbackId = 0;

class DahuaCameraPreviewCard extends HTMLElement {
  #config;
  #hass;
  #isInitialized = false;
  #fetchConfigPromise = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #render(config) {
    const card = document.createElement(this.#config.title ? 'ha-card' : 'div');
    const style = document.createElement("style");
    style.textContent = styles;
    this.shadowRoot.appendChild(style);
    
    card.header = this.#config.title || '';
    const wsUrl = location.protocol === 'https:' 
      ? `wss://${location.hostname}/nvrws/rtspoverwebsocket` 
      : "";
    card.innerHTML = `
      <div class="card">
        <dahua-player 
          camera-ip="${config.address}"
          ws-url="${wsUrl}"
          channel="${config.channel}"
          subtype="${this.#subtype}"
          ${this.#config.autoplay ? 'autoplay' : ''}
          ${this.#config.enableIvs ? 'enable-ivs' : ''}
          preview-image="${this.#config.autoplay ? "" : this.#playerPreviewImage}"
        ></dahua-player>
      </div>
    `;
    this.#setupListeners(card);
    this.shadowRoot.appendChild(card);
  }

  #setupListeners(card) {
    const player = card.querySelector('dahua-player');
    player.addEventListener('authenticate', (event) => {
      this.#hass.connection.sendMessagePromise({
        type: 'dahua/camera_authenticate',
        entity_id: this.#config.entity,
        details: event.detail.authDetails,
      }).then(event.detail.resolve, event.detail.reject)
    });
  }

  set hass(hass) {
    this.#hass = hass;
  }

  /**
   * @param {*} config 
   *            - entity (Required)
   *            - title (Optional)
   *            - autoplay (Optional, default: false)
   */
  setConfig(config) {
    this.#config = config;
  }

  get #playerPreviewImage() {
    return `${this.#hass.states[this.#config.entity].attributes.entity_picture}&width=${PREVIEW_SIZE[0]}&height=${PREVIEW_SIZE[1]}`;
  }

  get #subtype() {
    return this.#config.entity.includes('main') 
      ? 0
      : this.#config.entity.includes('sub2')
        ? 2
        : 1;
  }

  connectedCallback() {
    if (this.#isInitialized) return;
    this.#isInitialized = true;
    this.#fetchConfigPromise ??= this.#hass.connection.sendMessagePromise({ 
      type: 'dahua/get_camera_config', 
      entity_id: this.#config.entity 
    }).then((config) => {
      if (this.#isInitialized) {
        this.#render(config);
      }
    }).finally(() => {
      this.#fetchConfigPromise = null;
    });
  }

  disconnectedCallback() {
    const playerEl = this.shadowRoot?.querySelector('dahua-player');
    if (this.shadowRoot) {
      this.shadowRoot.querySelector('dahua-player')?.remove();
      this.shadowRoot.innerHTML = '';
    }
    this.#isInitialized = false;
  }
}

customElements.define("dahua-camera-preview", DahuaCameraPreviewCard);  
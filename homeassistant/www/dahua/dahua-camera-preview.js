import { PlayerControl } from './dahua.mjs';

// not any size can be used
const PREVIEW_SIZE = [640, 360];
const styles = `
  .card {
    position: relative;
    overflow: hidden;
    min-width: 320px;
    min-height: 180px;
  }

  .video {
    width: 100%;
  }

  img {
    max-height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 300ms;
  }

  img.loaded {
    opacity: 1;
  }

  .card:hover .button.paused {
    display: block;
  }

  .button {
    position: absolute;
    left: calc(50% - 18px);
    top: calc(50% - 34px);
    border: 0;
    background: transparent;
    box-sizing: border-box;
    width: 0;
    height: 74px;
    border-radius: 0;
    
    border-color: transparent transparent transparent #202020;
    transition: 100ms all ease;
    cursor: pointer;
    
    border-style: solid;
    border-width: 37px 0 37px 60px;
  }

  .button:hover {
    border-left-color: #404040;
  }

  .button.paused {
    display: none;
    border-style: double;
    border-width: 0px 0 0px 60px;
  }

  .button.loading {
    display: block;
    border-radius: 100%;
    border-width: 5px;
    border-left: 5px solid #202020;
    width: 50px;
    height: 50px;
  }

  .loading {
    animation: spin 1s linear infinite;
  }

  @keyframes spin { 
    100% { 
      transform: rotate(360deg); 
    } 
  }
`

class DahuaCameraPreviewCard extends HTMLElement {
  #config;
  /** @type PlayerControl */
  #player;
  #isRendered = false;
  #hass;

  render() {
    // Create a shadow root
    const shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
    const card = document.createElement('ha-card');
    const style = document.createElement("style");
    style.textContent = styles;
    shadow.appendChild(style);
    
    card.header = this.#config.title || '';
    card.innerHTML = `
      <div class="card">
        <canvas class="video" hidden></canvas>
        <video class="video" hidden></video>
        <img name="previewImage" width="${PREVIEW_SIZE[0]}" height="${PREVIEW_SIZE[1]}">
        <button class="button" name="play"></button>
      </div>
    `;
    shadow.appendChild(card);

    const image = shadow.querySelector('[name="previewImage"]');
    image.src = `${this.#hass.states[this.#config.entity].attributes.entity_picture}&width=${PREVIEW_SIZE[0]}&height=${PREVIEW_SIZE[1]}`;
    image.onload = () => image.classList.add('loaded');
    this.attachPlayer();
  }

  set hass(hass) {
    this.#hass = hass;
  }

  setConfig(config) {
    this.#config = config;
  }

  attachPlayer() {
    if (this.#player) return;

    const canvas = this.shadowRoot.querySelector('canvas');
    const video = this.shadowRoot.querySelector('video');
    const previewImage = this.shadowRoot.querySelector('[name="previewImage"]');
    const button = this.shadowRoot.querySelector('[name="play"]');

    let isConnected = false;
    let isPlaying = false;
    let isLoading = false;

    const cameraState = this.#hass.states[this.#config.entity];
    const channel = Number(cameraState.attributes.id) + 1;
    const subtype = this.#config.entity.includes('main') 
      ? 0
      : this.#config.entity.includes('sub2')
        ? 2
        : 1;

    this.#player = new PlayerControl({
      wsURL:"ws://192.168.90.253/rtspoverwebsocket",
      rtspURL:`rtsp://192.168.90.253/cam/realmonitor?channel=${channel}&subtype=${subtype}`,
      username:"hass",
      password:"Pm7YPa8+3Oroj56AFVws3A=="
    });
    this.#player.on('PlayStart', () => {
      const isVideoTagUsed = video.getAttribute('src');
      canvas.hidden = isVideoTagUsed;
      video.hidden = !isVideoTagUsed;

      if (!previewImage.hidden) {
        previewImage.hidden = true;
        button.classList.remove('loading');
        isLoading = false;
      }
    });

    button.addEventListener('click', () => {
      if (isLoading) return;

      if (isPlaying) {
        isPlaying = false;
        this.#player.pause();
        button.classList.remove('paused');
        return;
      }

      if (isConnected) {
        this.#player.play();
      } else {
        isConnected = true;
        this.#player.init(canvas, video);
        if (typeof MediaSource === 'undefined') {
          // iOS Safari on iPhone doesn't support MediaSource
          // that's why we can't use <video>
          this.#player.setPlayMode('canvas');
        }
        this.#player.connect();
        isLoading = true;
        button.classList.add('loading');
      }
      button.classList.add('paused');
      isPlaying = true;
    }, false);
  }
  
  connectedCallback() {
    if (!this.#isRendered) {
      this.#isRendered = true;
      this.render();
    }
  }

  disconnectedCallback() {
    if (this.#player) {
      this.#player.stop();
      this.#player.close();
      this.#player = null;
      this.shadowRoot.innerHTML = '';
      this.#isRendered = false;
    }
  }
}

customElements.define("dahua-camera-preview", DahuaCameraPreviewCard);
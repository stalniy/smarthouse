const styles = css`
  .test {
    
  }
`

class GarageDoorCard extends HTMLElement {
  #config;
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

function css(strings, ...interpolations) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i] + (interpolations[i] || '')
  }

  return result
}

customElements.define("dahua-camera-preview", DahuaCameraPreviewCard);
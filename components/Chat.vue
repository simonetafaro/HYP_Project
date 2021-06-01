<template>
  <div class="chat">
    <div v-if="isOpen" class="chat-container">
      <div class="header-chat-container">
        <div class="bot-logo-container">
          <div class="bot-logo">
            <svg
              width="69"
              height="69"
              viewBox="0 0 69 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M29.37 39.497C30.8497 40.4482 32.6104 41 34.5 41C39.7601 41 44.0345 36.696 43.9998 31.436C43.9655 26.2452 39.7683 22.0428 34.5795 22.0003C29.3331 21.9574 25.0238 26.2098 25.0001 31.4564C24.9918 33.3281 25.5253 35.0745 26.4519 36.5486L25.4435 39.638C25.2611 40.1967 25.7958 40.7234 26.3517 40.5327L29.37 39.497Z"
                  fill="#63639F"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="69"
                  height="69"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="12.5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.803922 0 0 0 0 0.788235 0 0 0 0 1 0 0 0 0.3 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div class="bot-info">
            <div class="bot-name">HexBot</div>
            <div class="bot-online">online</div>
          </div>
        </div>
        <div class="close-chat-container">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L8.41534 8.40743L2 14.8149"
              stroke="#424272"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.8646 14.8149L8.44929 8.40751L14.8646 2.00008"
              stroke="#424272"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div id="chat-window" class="chat-window">
        <div
          v-for="(message, messageIndex) of chatList"
          :key="`message-${messageIndex}`"
          class="message"
          :class="{ sender: message.sender }"
        >
          <div class="message-content" :class="{ sender: message.sender }">
            {{ message.content }}
          </div>
        </div>
      </div>
      <div class="footer-chat-container">
        <div class="chat-input-container">
          <input
            v-model="messageToSend"
            type="text"
            @keypress.enter="sendMessage"
            placeholder="Write here ..."
          />
        </div>
      </div>
    </div>
    <div class="button" @click="isOpen = !isOpen">
      <img src="https://img.icons8.com/ios-filled/452/chat--v1.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      messageToSend: '',
      isOpen: false,
    }
  },
  methods: {
    sendMessage() {
      const { WebSocketEventBus } = require('mmcc/WebSocketEventBus')
      this.$store.commit('addMessage', {
        sender: false,
        content: this.messageToSend,
      })
      const packet = {
        message: { type: 'data', payload: { data: this.messageToSend } },
        configurationId: process.env.configurationId,
      }
      WebSocketEventBus.$emit('send', packet)
      this.messageToSend = ''
    },
  },
}
</script>

<style>
.button {
  height: 60px;
  width: 60px;
  border: 1px solid black;
  border-radius: 100%;
  padding: 10px;
  float: right;
  position: fixed;
  bottom: 50px;
  right: 42px;
  z-index: 99;
}
.button img {
  width: 100%;
}
.chat-container {
  width: 300px;
  height: 400px;
  position: fixed;
  bottom: 120px;
  right: 22px;
  background: #fbfbff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 25px;
  border: 1px solid #cdc9ff;
}
.header-chat-container {
  width: 100%;
  height: 57px;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(205, 201, 255, 0.2);
  border-radius: 25px 25px 0px 0px;
}
.footer-chat-container {
  width: 100%;
  height: 57px;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 0px 0px 25px 25px;
}
.chat-input-container > input {
  outline: none;
  background: #ffffff;
  border: 1px solid #f3f2ff;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  height: 38px;
  font-family: 'Barlow';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #e6e3ff;
  padding-left: 20px;
}

.bot-logo-container {
  display: flex;
  margin-right: auto;
  margin-left: 26px;
  align-items: center;
}
.bot-logo {
  background: rgba(255, 255, 255, 0.75);
  border: 0.5px solid #f3f2ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bot-logo > svg {
  width: 100%;
  height: 100%;
  margin: auto;
}
.bot-name {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.75px;
  color: #424272;
}
.bot-online {
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 18px;
  letter-spacing: 0.75px;
  color: #e6e3ff;
}
.close-chat-container {
  margin-left: auto;
  margin-right: 26px;
  align-items: center;
  display: flex;
}

.chat-window {
  padding-top: 34px;
  overflow-y: scroll;
  height: calc(100% - 114px);
}

.chat-window::-webkit-scrollbar {
  display: none;
}
.message {
  width: calc(100% - 8px);
  display: flex;
  justify-content: flex-end;
}
.message.sender {
  justify-content: flex-start;
}
.message-content {
  padding: 5px 10px;
  margin: 4px;
  width: auto;
  background: var(--cc-base3);
  color: black;
  border: 1px solid black;
  border-radius: 4px;
}
.message-content.sender {
  background: var(--cc-base1);
  color: white;
  border: 1px solid var(--cc-base1);
}
input {
  width: 100%;
  position: absolute;
  z-index: 20;
}
</style>

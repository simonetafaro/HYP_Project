<template>
  <div class="chat">
    <div v-if="isOpen" class="chat-container">
      <div class="header-chat-container">
        <div class="bot-logo-container">
          <div class="bot-logo">
            <img
              src="https://i.ibb.co/LQgDNqb/bot-profile.png"
              alt="Chat bot logo. White circle shape with purple message icon in the middile"
            />
          </div>
          <div class="bot-info">
            <div class="bot-name">HexBot</div>
            <div class="bot-online">online</div>
          </div>
        </div>
        <div class="close-chat-container" @click="isOpen = !isOpen">
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
          <div class="send-message-button">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              @click="sendMessage"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9785 22.9401C14.6339 22.9401 14.3141 22.7507 14.1527 22.4403L9.4588 13.4777L0.499388 8.78383C0.167213 8.60998 -0.0252628 8.25607 0.00267718 7.88354C0.0306171 7.51101 0.282077 7.19125 0.635983 7.07328L21.7089 0.0479373C22.0442 -0.0638225 22.4136 0.023102 22.662 0.274562C22.9103 0.522917 22.9973 0.892345 22.8855 1.22762L15.8633 22.3037C15.7453 22.6576 15.4255 22.909 15.0561 22.937C15.0282 22.9401 15.0033 22.9401 14.9785 22.9401ZM3.3027 8.15052L10.5826 11.9628C10.7502 12.0497 10.8868 12.1863 10.9769 12.357L14.7891 19.6369L20.5323 2.40731L3.3027 8.15052Z"
                fill="#424272"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="chatBot-button" @click="isOpen = !isOpen">
      <img
        src="https://i.ibb.co/Yj5P5bb/logo-chatbot.png"
        alt="Chat bot button. Multiple messages icon."
      />
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
      if (this.messageToSend !== '') {
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
      }
    },
  },
  updated() {
    if (document.getElementById('chat-window') != null)
      document.getElementById(
        'chat-window'
      ).scrollTop = document.getElementById('chat-window').scrollHeight
  },
}
</script>

<style scoped>
.chatBot-button {
  height: 95px;
  width: 95px;
  float: right;
  position: fixed;
  bottom: 50px;
  right: 42px;
  z-index: 99;
}
.chatBot-button img {
  width: 100%;
}
.chat-container {
  width: 300px;
  height: 400px;
  position: fixed;
  z-index: 99;
  bottom: 140px;
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
  position: relative;
  background: #ffffff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 0px 0px 25px 25px;
}
.chat-input-container {
  outline: none;
  background: #ffffff;
  border: 1px solid #f3f2ff;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  height: 38px;
}
.chat-input-container > input {
  outline: none;
  background: #ffffff;
  border: none;
  height: 36px;
  font-family: 'Barlow';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #e6e3ff;
  padding-left: 20px;
}

.send-message-button {
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  position: absolute;
  right: 20px;
}

.send-message-button > svg {
  cursor: pointer;
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
.bot-logo > img {
  width: 100%;
  height: 100%;
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
  cursor: pointer;
}

.chat-window {
  padding-left: 5px;
  padding-top: 24px;
  overflow-y: scroll;
  height: calc(100% - 114px);
}

.chat-window::-webkit-scrollbar {
  display: none;
}

.message {
  width: calc(100% - 8px);
  max-width: calc(100% - 8px);
  display: flex;
  justify-content: flex-end;
}
.message.sender {
  justify-content: flex-start;
  width: calc(100% - 40px);
}

.message.sender::before {
  display: inline-table;
  content: '';
  background-image: url('https://i.ibb.co/LQgDNqb/bot-profile.png');
  background-size: 28px 28px;
  height: 28px;
  width: 28px;
}

.message:not(.sender)::after {
  display: block;
  content: '';
  background-image: url('https://i.ibb.co/CBKWhfF/user-profile.png');
  background-size: 28px 28px;
  height: 28px;
  width: 28px;
}
.message-content {
  padding: 12px 20px;
  margin: 4px;
  width: auto;
  background: #e6e3ff;
  border-radius: 24px 0px 24px 24px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #424272;
  max-width: calc(100% - 64px);
  overflow-wrap: anywhere;
}
.message-content.sender {
  background: #f3f2ff;
  border-radius: 0px 24px 24px 24px;
}
input {
  width: calc(100% - 50px);
  position: absolute;
  z-index: 20;
}
</style>

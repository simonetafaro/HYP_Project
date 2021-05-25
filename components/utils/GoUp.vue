<template>
  <button v-on:click="goToTopFunction()" class="go-up-button" id="goUpButton">
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5L5 1L9 5"
        stroke="#4D41C9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  mixins: [GoToMixins],
  props: {
    buttonLabel: { type: String, default: () => '' },
    path: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.go-up-button {
  display: none;
}
@media screen and (max-width: 1200px) {
  .go-up-button {
    width: 64px;
    height: 64px;
    position: fixed;
    bottom: 50px;
    right: 42px;
    z-index: 99;
    background: #ffffff;
    border: 2.5px solid #4d41c9;
    box-sizing: border-box;
    box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
    border-radius: 40px;
    padding-bottom: 5px;
  }

  .go-up-button > svg {
    height: 12px;
    width: 20px;
  }

  #go-up-button:hover {
    background-color: #555;
  }
}

@media screen and (max-width: 768px) {
  .go-up-button {
    width: 32px;
    height: 32px;
    position: fixed;
    bottom: 50px;
    right: 16px;
    z-index: 99;
    background: #ffffff;
    border: 1.5px solid #4d41c9;
    box-sizing: border-box;
    box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
    border-radius: 40px;
    padding-bottom: 9px;
  }
  .go-up-button > svg {
    height: 6px;
    width: 10px;
  }

  #go-up-button:hover {
    background-color: #555;
  }
}
</style>

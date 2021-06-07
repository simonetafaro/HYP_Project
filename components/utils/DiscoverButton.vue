<template>
  <div class="full-width-row">
    <button v-on:click="goTo(path)" class="discover_button">
      {{ buttonLabel }}
    </button>
  </div>
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
.full-width-row {
  width: 100%;
  padding-top: 91px;
}
.discover_button {
  background: #e8e6ff;
  border-radius: 35px;
  box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
  color: var(--cc-base2);
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  padding: 10px 32px;
}

.discover_button:hover {
  background: var(--cc-base1);
  color: var(--cc-base6);
  box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
}

@media screen and (max-width: 768px) {
  .discover_button {
    font-size: 12px;
    line-height: 14px;
  }
  .full-width-row {
    padding-top: 39px;
  }
}
</style>

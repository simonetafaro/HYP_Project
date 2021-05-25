<template>
  <div>
    <the-header></the-header>
    <Nuxt />
    <go-up></go-up>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import GoUp from '~/components/utils/GoUp.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  components: {
    TheHeader,
    TheFooter,
    GoUp,
  },
  mixins: [GoToMixins],
  mounted() {
    window.addEventListener('scroll', this.showGoUpButton)
  },
}
</script>

<style>
html {
  /**font-family: 'Roboto', sans-serif;*/
  font-family: 'Barlow', sans-serif;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  margin: 40px auto;
  max-width: 1110px;
  text-align: center;
}
</style>

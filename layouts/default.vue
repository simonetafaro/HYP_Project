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
  methods: {
    scrollFunction() {
      const footer = document
        .getElementById('footer-element')
        .getBoundingClientRect()

      const footerVisible =
        footer.top <
        (window.innerHeight || document.documentElement.clientHeight)
      if (
        (document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50) &&
        !footerVisible
      ) {
        document.getElementById('goUpButton').style.display = 'block'
      } else {
        document.getElementById('goUpButton').style.display = 'none'
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollFunction)
  },
}
</script>

<style>
html {
  /**font-family: 'Roboto', sans-serif;*/
  font-family: 'Barlow', sans-serif;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  padding: 10px;
  margin: 40px auto;
  max-width: 1110px;
  text-align: center;
}
a {
  color: white;
}
img {
  width: 100%;
}
</style>

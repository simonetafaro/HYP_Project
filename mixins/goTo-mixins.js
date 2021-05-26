export default {
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
    goToTopFunction() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    showGoUpButton() {
      const footer = document
        .getElementById('footer-element')
        .getBoundingClientRect()

      const footerVisible =
        footer.top <
        (window.innerHeight || document.documentElement.clientHeight)
      const mobileMenuOpen =
        document.getElementById('mobile-menu-box').style.display === 'block'
      if (
        (document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50) &&
        !footerVisible &&
        !mobileMenuOpen
      ) {
        document.getElementById('goUpButton').style.display = 'block'
      } else {
        document.getElementById('goUpButton').style.display = 'none'
      }
    },
    resizeServiceCard() {
      //  resize service img height
      Array.from(document.getElementsByClassName('service_img')).forEach(
        function (img) {
          img.style.height = img.width + 'px'
        }
      )
      //  check highest title
      let serviceCardTitleMaxHeight = 0
      Array.from(document.getElementsByClassName('service_title')).forEach(
        function (card) {
          if (card.clientHeight > serviceCardTitleMaxHeight)
            serviceCardTitleMaxHeight = card.clientHeight
        }
      )
      //  set the same height to all the title
      Array.from(document.getElementsByClassName('service_title')).forEach(
        function (card) {
          if (card.clientHeight < serviceCardTitleMaxHeight) {
            card.style.height = serviceCardTitleMaxHeight + 'px'
            card.style.display = 'grid'
            card.style.alignContent = 'center'
          }
        }
      )
    },
  },
}

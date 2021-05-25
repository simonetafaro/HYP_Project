export default {
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },

    closeMobileMenu() {
      //  close area dropdown if open
      const mobileMenuAreas = document.getElementById('mobile-menu-area-box')
      if (mobileMenuAreas.style.display === 'block') {
        mobileMenuAreas.style.display = 'none'
        document.getElementById('close-area-list').hidden = true
        document.getElementById('open-area-list').hidden = false
      }
      //  close menu mobile if open
      const mobileMenu = document.getElementById('mobile-menu-box')
      if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none'
      }
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
  },
}

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
  },
}

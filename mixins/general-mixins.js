export default {
  methods: {
    goTo(path) {
      this.$router.push({ path })
      if (document.getElementById('menu-list').classList.contains('show')) {
        document.getElementById('menu-list').classList.toggle('show')
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
      const mobileMenuOpen = document
        .getElementById('menu-list')
        .classList.contains('show')
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
          card.style.height = ''
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
    resizeCaseCard() {
      //  resize case img height
      Array.from(document.getElementsByClassName('casestudycontainer')).forEach(
        function (caseCard) {
          caseCard.style.height = caseCard.clientWidth + 'px'
        }
      )
      let caseCardTitleMaxHeight = 0
      Array.from(document.getElementsByClassName('casestudytitle')).forEach(
        function (card) {
          card.style.height = ''
          if (card.clientHeight > caseCardTitleMaxHeight)
            caseCardTitleMaxHeight = card.clientHeight
        }
      )

      Array.from(document.getElementsByClassName('casestudycontent')).forEach(
        function (card) {
          card.style.height = ''
          if (window.innerWidth < 768) {
            card.style.height = caseCardTitleMaxHeight + 20 + 'px'
          }
        }
      )
    },
  },
}

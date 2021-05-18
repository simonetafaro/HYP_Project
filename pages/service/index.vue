<template>
  <main class="container">
    <header>
      <div class="service-l1">WHY CHOOSING US</div>
      <div class="service-l2">
        DISCOVER OUR <br />
        <span class="service-l2-light">SERVICES SELECTION</span>
      </div>
      <div class="service-l3">
        Nulla ante risus, condimentum eu consectetur vel, facilisis ac nulla.
        Sed blandit nulla diam, in mattis nibh porta quis. Donec accumsan, erat
        in suscipit viverra, massa purus dignissim sapien, interdum convallis
        leo magna vel quam. In massa felis, gravida in eros in, ultricies
        vehicula ex. Praesent luctus non metus ac iaculis. Fusce quis rutrum
        diam.
      </div>
    </header>
    <br />

    <div
      v-for="(area, areaIndex) of areas"
      :key="'area-' + areaIndex"
      class="row"
      :id="'service-box-' + area.id"
      v-bind:class="isOddRow(areaIndex)"
    >
      <div class="carousel-wrapper">
        <div
          v-if="getServiceByArea(area.id).length > 3"
          class="button-wrapper-prev"
        >
          <svg
            class="carousel-arrow"
            @click="scrollLeft(area.id)"
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.332 45.666L4.99902 24.333L26.332 2.99999"
              stroke="#424272"
              stroke-width="7"
            />
          </svg>
        </div>
        <div class="service-list-wrapper">
          <div class="service-section-title">{{ area.title }}</div>
          <ul
            v-bind:id="area.id"
            class="service-carousel"
            data-target="carousel"
          >
            <div
              v-for="(service, serviceIndex) of getServiceByArea(area.id)"
              :key="'service-' + serviceIndex"
              class="service"
            >
              <li class="service-card" data-target="card">
                <service-mini
                  :title="service.title"
                  :image="service.banner"
                  :path="service.id"
                ></service-mini>
              </li>
            </div>
          </ul>
        </div>

        <div
          v-if="getServiceByArea(area.id).length > 3"
          class="button-wrapper-next"
        >
          <svg
            class="carousel-arrow"
            @click="scrollRight(area.id)"
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.332 3L42.665 24.333L21.332 45.666"
              stroke="#424272"
              stroke-width="7"
            />
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import axios from 'axios'
import ServiceMini from '~/components/service/ServiceMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  data() {
    return {
      carouselList: [],
    }
  },
  components: {
    ServiceMini,
  },
  async asyncData({ $axios }) {
    const areasData = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/services`)
    const services = data
    const areas = areasData.data
    return {
      services,
      areas,
    }
  },
  mounted() {
    if (this.$router.history.current.hash !== '') {
      setTimeout(() => {
        const elem = document.getElementById(
          'service-box-' + this.$router.history.current.hash.substring(1)
        )
        console.log(elem)
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }, 0)
    }

    const _this = this

    Array.from(document.querySelectorAll("[data-target='carousel']")).forEach(
      function (carousel) {
        const carouselWidth = carousel.offsetWidth
        const cardMarginRight = 30
        const cardCount = carousel.querySelectorAll("[data-target='card']")
          .length
        const maxX = -(
          cardCount * carouselWidth +
          cardMarginRight * cardCount -
          carouselWidth -
          cardMarginRight -
          (carouselWidth + cardMarginRight) * 2
        )
        _this.carouselList.push({
          areaID: carousel.id,
          offset: 0,
          carouselWidth,
          cardMarginRight,
          maxX,
        })
      }
    )

    //  resize service img height
    Array.from(document.getElementsByClassName('service_img')).forEach(
      function (img) {
        img.style.height = img.width + 'px'
      }
    )
    //  check highest card
    let serviceCardMaxHeight = 0
    Array.from(document.getElementsByClassName('service_card')).forEach(
      function (card) {
        if (card.clientHeight > serviceCardMaxHeight)
          serviceCardMaxHeight = card.clientHeight
      }
    )
    //  set the same height to all the cards
    Array.from(document.getElementsByClassName('service_card')).forEach(
      function (card) {
        if (card.clientHeight < serviceCardMaxHeight)
          card.style.height = serviceCardMaxHeight + 'px'
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
        if (card.clientHeight < serviceCardTitleMaxHeight)
          card.style.lineHeight = serviceCardTitleMaxHeight + 'px'
      }
    )
  },
  mixins: [GoToMixins],
  methods: {
    getServiceByArea(areaID) {
      return this.services.filter((service) => {
        return service.areaID === areaID
      })
    },
    isOddRow(areaIndex) {
      return areaIndex % 2 === 0 ? '' : 'grey-row'
    },
    scrollRight(areaID) {
      this.carouselList.forEach((carousel) => {
        if (carousel.areaID.localeCompare(areaID) === 0) {
          if (carousel.offset > carousel.maxX) {
            carousel.offset -= carousel.carouselWidth + carousel.cardMarginRight
            document.getElementById(areaID).style.transform = `translateX(${
              carousel.offset / 3
            }px)`
          }
        }
      })
    },
    scrollLeft(areaID) {
      this.carouselList.forEach((carousel) => {
        if (carousel.areaID.localeCompare(areaID) === 0) {
          if (carousel.offset !== 0) {
            carousel.offset += carousel.carouselWidth + carousel.cardMarginRight
            document.getElementById(areaID).style.transform = `translateX(${
              carousel.offset / 3
            }px)`
          }
        }
      })
    },
  },
}
</script>

<style scoped>
.service-l1 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #464a52;
  margin-bottom: 54px;
}

.service-l2 {
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-align: center;
  color: #424272;
  margin-bottom: 70px;
}
.service-l2-light {
  color: var(--cc-base3);
}

.service-l3 {
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
  max-width: 750px;
  margin: auto;
}
.carousel-arrow {
  cursor: pointer;
}
.container {
  min-width: 100%;
}
h2 {
  margin-bottom: 30px;
}
.service-grid {
  max-width: 1110px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.ad img {
  width: 100%;
  height: 200px;
}
.row {
  width: 100%;
}
.inner-row {
  margin-left: auto;
  margin-right: auto;
  max-width: 1110px;
  padding-top: 46px;
  padding-bottom: 46px;
}
.grey-row {
  background: #f9f9ff;
}
.service-section-title {
  font-family: Barlow;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  text-transform: uppercase;
  text-align: left;
  color: var(--cc-base1);
  margin: 46px auto 46px 0;
}

.service-list-wrapper {
  height: 650px;
  width: 1110px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  min-width: 1110px;
}
.service-carousel {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  transition: all 1s ease;
}
.service-card {
  min-width: 350px;
  display: inline-block;
}

.service {
  margin-right: 15px;
  margin-left: 15px;
}
.service-carousel div:first-child {
  margin-left: 0px;
}
.button-wrapper-prev {
  margin-right: 15px;
}
.button-wrapper-next {
  margin-left: 15px;
}
.carousel-wrapper {
  max-width: max-content;
  display: flex;
  align-items: center;
  margin: auto;
}
</style>

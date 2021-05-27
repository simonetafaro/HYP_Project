<template>
  <main class="container">
    <header class="services-header">
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
            :id="'carousel-arrow-prev-' + area.id"
            class="carousel-arrow disabled-arrow"
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
            :id="'carousel-arrow-next-' + area.id"
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
  mixins: [GoToMixins],
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

    this.fillCarouselData()

    this.resizeServiceCard()
    window.addEventListener('resize', this.resizeServiceCard)
    window.addEventListener('resize', this.resetCarouselOffset)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeServiceCard)
    window.removeEventListener('resize', this.resetCarouselOffset)
  },
  methods: {
    getServiceByArea(areaID) {
      return this.services.filter((service) => {
        return service.areaID === areaID
      })
    },
    isOddRow(areaIndex) {
      return areaIndex % 2 === 0 ? '' : 'grey-row'
    },
    fillCarouselData() {
      const _this = this
      Array.from(document.querySelectorAll("[data-target='carousel']")).forEach(
        function (carousel) {
          const carouselWidth = carousel.offsetWidth
          const cardMarginRight = carousel.querySelectorAll(
            "[data-target='card']"
          )[0].parentNode.style.marginRight
          const cardCount = carousel.querySelectorAll("[data-target='card']")
            .length
          const maxX = -(cardCount - 3) * carouselWidth

          _this.carouselList.push({
            areaID: carousel.id,
            offset: 0,
            carouselWidth,
            cardMarginRight,
            maxX,
          })
        }
      )
    },
    scrollRight(areaID) {
      this.carouselList.forEach((carousel) => {
        if (carousel.areaID.localeCompare(areaID) === 0) {
          if (carousel.offset > carousel.maxX) {
            // if is the first scroll activate left arrow
            if (carousel.offset === 0) {
              document
                .getElementById('carousel-arrow-prev-' + areaID)
                .classList.remove('disabled-arrow')
            }
            carousel.offset -= carousel.carouselWidth
            document.getElementById(areaID).style.transform = `translateX(${
              carousel.offset / 3
            }px)`
          }

          // check if we are at the end of carousel
          if (
            carousel.offset <= carousel.maxX &&
            !document
              .getElementById('carousel-arrow-next-' + areaID)
              .classList.contains('disabled-arrow')
          ) {
            document
              .getElementById('carousel-arrow-next-' + areaID)
              .classList.add('disabled-arrow')

            document
              .getElementById('carousel-arrow-prev-' + areaID)
              .firstChild.classList.add('arrow-pulsation')

            setTimeout(() => {
              document
                .getElementById('carousel-arrow-prev-' + areaID)
                .firstChild.classList.remove('arrow-pulsation')
            }, 3000)
          }
        }
      })
    },

    scrollLeft(areaID) {
      this.carouselList.forEach((carousel) => {
        if (carousel.areaID.localeCompare(areaID) === 0) {
          if (carousel.offset !== 0) {
            carousel.offset += carousel.carouselWidth
            document.getElementById(areaID).style.transform = `translateX(${
              carousel.offset / 3
            }px)`
            if (
              document
                .getElementById('carousel-arrow-next-' + areaID)
                .classList.contains('disabled-arrow')
            ) {
              // reset opacity to one
              document
                .getElementById('carousel-arrow-next-' + areaID)
                .classList.remove('disabled-arrow')
            }
          }
          // if we are back at beginning
          if (
            carousel.offset === 0 &&
            !document
              .getElementById('carousel-arrow-prev-' + areaID)
              .classList.contains('disabled-arrow')
          ) {
            document
              .getElementById('carousel-arrow-prev-' + areaID)
              .classList.add('disabled-arrow')

            document
              .getElementById('carousel-arrow-next-' + areaID)
              .firstChild.classList.add('arrow-pulsation')

            setTimeout(() => {
              document
                .getElementById('carousel-arrow-next-' + areaID)
                .firstChild.classList.remove('arrow-pulsation')
            }, 3000)
          }
        }
      })
    },
    resetCarouselOffset() {
      this.fillCarouselData()
      this.carouselList.forEach((carousel) => {
        carousel.offset = 0
        document.getElementById(
          carousel.areaID
        ).style.transform = `translateX(0px)`
      })
    },
  },
}
</script>

<style scoped>
.container {
  padding: 0;
  min-width: 100%;
}
.service-l1 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: var(--c-grey1);
  margin-bottom: 54px;
}

.service-l2 {
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-align: center;
  color: var(--cc-base1);
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
  overflow: visible;
}

.disabled-arrow {
  opacity: 0.5;
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
  width: 1020px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
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
  min-width: 310px;
  display: inline-block;
}

.service {
  margin-right: 15px;
  margin-left: 15px;
}
/* .service-carousel div:first-child {
  margin-left: 0px;
} */
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
.arrow-pulsation {
  animation: pulse-me 2s linear;
}

@keyframes pulse-me {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  10% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  20% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  30% {
    transform: scale(1.3);
    opacity: 0.4;
  }

  40% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  60% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  80% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  90% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@media screen and (max-width: 1200px) {
  .services-header {
    padding-bottom: 31px;
    border-bottom: 1px solid var(--ccc-base3);
  }

  .service-l1 {
    margin-bottom: 20px;
  }

  .service-l2 {
    font-size: 36px;
    line-height: 43px;
    margin-bottom: 41px;
  }

  .service-l3 {
    font-size: 18px;
    line-height: 22px;
    max-width: 550px;
  }

  .button-wrapper-prev {
    margin-right: 8px;
  }
  .button-wrapper-next {
    margin-left: 8px;
  }
  .service-list-wrapper {
    height: 348px;
    width: 672px;
    min-width: 672px;
  }
  .service-section-title {
    font-size: 24px;
    line-height: 29px;
    margin: 33px auto 32px 0;
  }
  .service {
    margin-right: 12px;
    margin-left: 12px;
  }
  .service-card {
    min-width: 200px;
  }
  .carousel-arrow {
    width: 21px;
    height: 21px;
  }
}

@media screen and (max-width: 768px) {
  .service-l1 {
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 17px;
  }

  .service-l2 {
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 17px;
  }

  .service-l3 {
    font-size: 12px;
    line-height: 14px;
    max-width: 270px;
  }
  .button-wrapper-prev,
  .button-wrapper-next {
    display: none;
  }
  .service-carousel {
    overflow: scroll;
    padding: 15px 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .service-carousel::-webkit-scrollbar {
    display: none;
  }

  .service-list-wrapper {
    height: 253px;
    width: 100%;
    min-width: 100%;
  }
  .service-section-title {
    font-size: 14px;
    line-height: 17px;
    margin: 16px auto 21px 20px;
  }
  .service {
    margin-right: 5px;
    margin-left: 5px;
  }
  .service:first-child {
    margin-left: 20px !important;
  }
  .service:last-child {
    margin-right: 20px !important;
  }
  .service-card {
    min-width: 146px;
  }
  .carousel-arrow {
    width: 0;
    height: 0;
  }
  .carousel-wrapper {
    width: 100%;
    max-width: 100%;
  }
}
</style>

<style>
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .service-left {
    margin-right: 0px !important;
  }
  .service-right {
    margin-left: 0px !important;
  }
  .service_card {
    max-width: 200px !important;
  }
}
@media screen and (max-width: 768px) {
  .service_card {
    max-width: 146px !important;
  }
}
</style>

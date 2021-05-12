<template>
  <main class="container">
    <header>
      <h1>Services of the company</h1>
    </header>
    <br />
    <div
      v-for="(area, areaIndex) of areas"
      :key="'area-' + areaIndex"
      class="row"
      v-bind:class="isOddRow(areaIndex)"
    >
      <div class="button-wrapper">
        <button data-action="slideLeft">prev</button>
      </div>
      <div class="service-list-wrapper">
        <h2 class="service-section-title">{{ area.title }}</h2>
        <ul class="service-carousel" data-target="carousel">
          <div
            v-for="(service, serviceIndex) of getServiceByArea(area.id)"
            :key="'service-' + serviceIndex"
            class="service"
          >
            <li class="service-card service" data-target="card">
              <service-mini
                :title="service.title"
                :image="service.banner"
                :path="service.id"
              ></service-mini>
            </li>
          </div>
        </ul>
      </div>
      <div class="button-wrapper">
        <button data-action="slideRight">Next</button>
      </div>
      <!--comment<div class="inner-row">
        <h2 class="service-section-title">{{ area.title }}</h2>
        <section class="service-grid">
          <div
            v-for="(service, serviceIndex) of getServiceByArea(area.id)"
            :key="'service-' + serviceIndex"
            class="service"
          >
            <service-mini
              :title="service.title"
              :image="service.banner"
              :path="service.id"
            ></service-mini>
          </div>
        </section>
        <br />
      </div>
        <comment-->
    </div>
  </main>
</template>

<script>
// import axios from 'axios'
import ServiceMini from '~/components/service/ServiceMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  head() {
    return {
      script: [
        {
          src: 'assets/js/carousel.js',
          body: true,
        },
      ],
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
  },
  mixins: [GoToMixins],
  methods: {
    getServiceByArea(areaID) {
      return this.services.filter((service) => {
        return service.areaID === areaID
      })
    },
    isOddRow(areaIndex) {
      return areaIndex % 2 === 0 ? 'grey-row' : ''
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 100%;
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
  background: #f8f8f8;
}
.service-section-title {
  width: fit-content;
  margin-left: 10px;
}
@media screen and (max-width: 600px) {
  .ad img {
    width: 100%;
    height: 100px;
  }
  .service-grid {
    display: block;
    margin: 40px 20px;
  }
}

.service-list-wrapper {
  height: 650px;
  width: 1110px;
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
  min-width: 350px;
  margin-right: 15px;
  margin-left: 15px;
  display: inline-block;
}
</style>

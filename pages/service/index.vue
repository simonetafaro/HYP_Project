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
      <div class="inner-row">
        <h2 class="service-section-title">{{ area.title }}</h2>
        <section class="service-grid">
          <div
            v-for="(service, serviceIndex) of getServiceByArea(area.id)"
            :key="'service-' + serviceIndex"
            class="service"
            @click="goTo(`/service/${service.id}`)"
          >
            <service-mini
              :title="service.title"
              :summary="service.subTitle"
              :image="service.banner"
            ></service-mini>
          </div>
        </section>
        <br />
      </div>
    </div>
  </main>
</template>

<script>
// import axios from 'axios'
import ServiceMini from '~/components/service/ServiceMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
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
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 46px;
}
.service {
  cursor: pointer;
  margin-bottom: 20px;
  margin: 10px;
  min-width: 33.33%;
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
  max-width: 800px;
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
</style>

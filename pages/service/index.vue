<template>
  <main class="container">
    <header>
      <h1>Services of the company</h1>
      <h4>All services</h4>
    </header>
    <section class="service-grid">
      <div
        v-for="(service, serviceIndex) of services"
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
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/services`)
    const services = data
    return {
      services,
    }
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.service-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.service {
  cursor: pointer;
  margin-bottom: 20px;
}
.ad img {
  width: 100%;
  height: 200px;
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

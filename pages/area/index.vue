<template>
  <main class="container">
    <header>
      <h1>Areas of the company</h1>
      <h4>All areas</h4>
    </header>
    <section class="area-grid">
      <div
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        class="area"
        @click="goTo(`/area/${area.id}`)"
      >
        <area-mini
          :title="area.title"
          :summary="area.subTitle"
          :image="area.banner"
        ></area-mini>
      </div>
    </section>
  </main>
</template>

<script>
// import axios from 'axios'
import AreaMini from '~/components/area/AreaMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  components: {
    AreaMini,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = data
    return {
      areas,
    }
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.area-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.area {
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
  .area-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>

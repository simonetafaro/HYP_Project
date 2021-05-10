<template>
  <main class="container">
    <header>
      <h1>Case studies of the company</h1>
      <h4>All case studies</h4>
    </header>
    <div class="filter-bar">
      <div class="filter active-filter" @click="findAllCaseStudy($event)">
        All
      </div>
      <div
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        class="filter"
        @click="filterCaseStudyByArea($event, area.id)"
      >
        {{ area.title }}
      </div>
    </div>
    <section class="casestudies-grid">
      <div
        v-for="(casestudy, casestudyIndex) of casestudies"
        :key="'casestudy-' + casestudyIndex"
        class="casestudy"
        @click="goTo(`/casestudy/${casestudy.id}`)"
      >
        <case-study-mini
          :title="casestudy.title"
          :summary="casestudy.subTitle"
          :image="casestudy.banner"
          :area="casestudy.area"
        ></case-study-mini>
      </div>
    </section>
  </main>
</template>

<script>
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  components: {
    CaseStudyMini,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/casestudies`)
    const casestudies = data
    const areasData = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = areasData.data
    return {
      casestudies,
      areas,
    }
  },
  mixins: [GoToMixins],
  methods: {
    async filterCaseStudyByArea(e, areaID) {
      this.casestudies = await this.$axios.$get(
        `${process.env.BASE_URL}/api/casestudiesbyarea/${areaID}`
      )
      const filters = e.target.parentNode.children
      filters.forEach((filter) => {
        filter.classList.remove('active-filter')
      })
      const element = e.target
      element.classList.add('active-filter')
    },
    async findAllCaseStudy(e) {
      this.casestudies = await this.$axios.$get(
        `${process.env.BASE_URL}/api/casestudies`
      )
      const filters = e.target.parentNode.children
      filters.forEach((filter) => {
        filter.classList.remove('active-filter')
      })
      const element = e.target
      element.classList.add('active-filter')
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.casestudies-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.casestudy {
  cursor: pointer;
  margin-bottom: 20px;
  overflow: hidden;
}
.ad img {
  width: 100%;
  height: 200px;
}
.filter-bar {
  display: inline-flex;
  width: 100%;
  margin-top: 15px;
}
.filter {
  margin-right: 15px;
  font-size: 12px;
  border: 1px solid black;
  padding: 5px;
  cursor: pointer;
}
.active-filter {
  background: black;
  color: white;
}
@media screen and (max-width: 600px) {
  .ad img {
    width: 100%;
    height: 100px;
  }
  .casestudies-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>

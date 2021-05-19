<template>
  <main class="container">
    <header>
      <h3 class="intro-text">WE PUT IT IN PRACTICE</h3>
      <h1 class="title_case">
        OUR CASE
        <br />
        <span class="title-purple">STUDIES</span>
      </h1>

      <div class="container_description">
        <h4 class="description">
          Nulla ante risus, condimentum eu consectetur vel, facilisis ac nulla.
          Sed blandit nulla diam, in mattis nibh porta quis. Donec accumsan,
          erat in suscipit viverra, massa purus dignissim sapien, interdum
          convallis leo magna vel quam. In massa felis, gravida in eros in,
          ultricies vehicula ex. Praesent luctus non metus ac iaculis. Fusce
          quis rutrum diam.
        </h4>
      </div>
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
      >
        <case-study-mini
          :title="casestudy.title"
          :description="casestudy.subTitle"
          :image="casestudy.banner"
          :area="casestudy.area.title"
          :path="casestudy.id"
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
    getCaseStudyByArea(areaID) {
      return this.casestudies.filter((casestudy) => {
        return casestudy.areaID === areaID
      })
    },
  },
}
</script>

<style scoped>
.casestudies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 40px;
}

.intro-text {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  text-transform: uppercase;

  color: #424272;
  text-align: left;
}
.casestudy {
  margin-bottom: 20px;
  overflow: hidden;
}
.ad img {
  width: 100%;
  height: 200px;
}
.filter-bar {
  display: flex;
  margin-top: 15px;
  align-content: left;
  text-align: left;
}
.filter {
  margin-right: 30px;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;

  color: #424272;
}
.active-filter {
  color: #ff4266;
}
.title_case {
  font-style: normal;
  font-weight: 700;
  font-size: 70px;
  line-height: 84px;
  text-transform: uppercase;
  text-align: left;
  color: #424272;
  margin: 0;
}
.title-purple {
  color: #cdc9ff;
}
.description {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  /* or 160% */

  color: #464a52;
  text-align: left;
  mix-blend-mode: normal;
  opacity: 0.6;
}
.container_description {
  max-width: 600px;
  padding-bottom: 60px;
  padding-top: 30px;
}
</style>

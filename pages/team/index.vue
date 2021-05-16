<template>
  <main class="container">
    <header>
      <p class="pre_title">Who we are</p>
      <p class="title">Our team members</p>
      <h3 class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </h3>
    </header>
    <div class="filter-bar">
      <div class="filter active-filter" @click="findAllTeamMembers($event)">
        All
      </div>
      <div
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        class="filter"
        @click="filterTeamMemberByArea($event, area.id)"
      >
        {{ area.title }}
      </div>
    </div>
    <section class="member-grid">
      <div
        v-for="(person, personIndex) of people"
        :key="'person-' + personIndex"
        class="person"
        @click="goTo(`/team/${person.id}`)"
      >
        <member-mini
          :personName="person.personName"
          :summary="person.personalQuote"
          :image="person.personPhoto"
        ></member-mini>
      </div>
    </section>
  </main>
</template>

<script>
// import axios from 'axios'
import MemberMini from '~/components/team/MemberMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  components: {
    MemberMini,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/teammembers`)
    const people = data
    const areasData = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = areasData.data
    return {
      people,
      areas,
    }
  },
  mixins: [GoToMixins],
  methods: {
    async filterTeamMemberByArea(e, areaID) {
      this.people = await this.$axios.$get(
        `${process.env.BASE_URL}/api/teammembersbyarea/${areaID}`
      )
      const filters = e.target.parentNode.children
      filters.forEach((filter) => {
        filter.classList.remove('active-filter')
      })
      const element = e.target
      element.classList.add('active-filter')
    },
    async findAllTeamMembers(e) {
      this.casestudies = await this.$axios.$get(
        `${process.env.BASE_URL}/api/teammembers`
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
.pre_title {
  text-align: left;
  font-size: 25px;
}

h3 {
  text-align: left;
}

.title {
  text-align: left;
  font-size: 60px;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.filter-bar {
  display: inline-flex;
  margin-top: 15px;
}
.filter {
  margin-right: 30px;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 24px;
  text-transform: uppercase;

  color: #424272;
}
.active-filter {
  color: #ff4266;
}
.member {
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
  .member-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>

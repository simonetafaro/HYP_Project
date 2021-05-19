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
        @click="showOverlay(person.id)"
      >
        <member-mini
          :personName="person.personName"
          :summary="person.workField"
          :image="person.personPhoto"
          @click="overlay = false"
          :index="personIndex"
        ></member-mini>
      </div>
    </section>
    <div v-if="overlay">
      <section class="overlay-container">
        <div class="overlay-tab">
          <button class="close-button" @click="overlay = false">X</button>
          <button class="right-arrow" @click="scrollRight(member.id)">-</button>
          <button
            v-if="member.id != 1"
            class="left-arrow"
            @click="scrollLeft(member.id)"
          >
            -
          </button>
          <img
            :src="member.personPhoto"
            :alt="member.memberNameAndOccupation"
            class="overlay-photo"
          />
          <h1>{{ member.personName }}</h1>
          <h4>{{ member.workField }}</h4>

          <h3>Discover his projects</h3>
          <section class="casestudies-grid">
            <h4 v-if="relCasestudies === 0">
              There are no related Case Studies
            </h4>
            <div
              v-for="(casestudy, casestudyIndex) of relCasestudies"
              :key="'casestudy-' + casestudyIndex"
              class="casestudy"
              @click="findCS(id)"
            >
              <case-study-mini
                :title="casestudy.title"
                :description="casestudy.subTitle"
                :image="casestudy.banner"
              ></case-study-mini>
            </div>
          </section>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
// import axios from 'axios'
import MemberMini from '~/components/team/MemberMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'

export default {
  components: {
    MemberMini,
    CaseStudyMini,
  },

  mixins: [GoToMixins],
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
  data() {
    return {
      overlay: false,
      member: {},
      relCasestudies: {},
      carouselList: [],
    }
  },
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
      this.people = await this.$axios.$get(
        `${process.env.BASE_URL}/api/teammembers`
      )
      const filters = e.target.parentNode.children
      filters.forEach((filter) => {
        filter.classList.remove('active-filter')
      })
      const element = e.target
      element.classList.add('active-filter')
    },
    async showOverlay(id) {
      let member = await this.$axios.get(
        `${process.env.BASE_URL}/api/teammembers/${id}`
      )

      member = member.data

      let relCasestudies = await this.$axios.get(
        `${process.env.BASE_URL}/api/casestudiesbyteammember/${id}`
      )
      relCasestudies = relCasestudies.data

      this.overlay = true
      console.log('accessing' + `${process.env.BASE_URL}/api/teammembers/${id}`)
      console.log(id)
      console.log(this.overlay)
      console.log(member)

      this.member = member
      this.relCasestudies = relCasestudies
    },

    scrollRight(memberID) {
      this.showOverlay(memberID + 1)
    },

    scrollLeft(memberID) {
      this.showOverlay(memberID - 1)
    },
  },
}
</script>

<style scoped>
.overlay-container {
  display: block;
  width: 100%;
  position: absolute;
  top: 55%;
  left: 0%;
  background: rgba(113, 126, 238, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(8px);

  padding: 50px;
}

.casestudies-grid {
  display: grid;
  grid-template-columns: repeat(2, calc(100% / 2));
  grid-gap: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-right: 20px;
}
.casestudy {
  cursor: pointer;
  margin-bottom: 20px;
}

.right-arrow {
  position: absolute;
  left: 800px;
  top: 200px;
}

.left-arrow {
  position: absolute;
  left: -150px;
  top: 200px;
}

.overlay-tab {
  background: #f9f9ff;
  width: 50%;
  border-radius: 10px;
  position: relative;
  left: 25%;
  padding: 25px;
}

.overlay-photo {
  width: auto;
  float: center;
  position: relative;
  height: 200px;
  border-radius: 10px;
}
.overlay-text {
  width: 50%;
  left: 100%;
  opacity: 60%;
  left: 60%;
  position: relative;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
}

.close-button {
  position: absolute;
  z-index: 10;
  left: 600px;
  padding: 10px;
}

h2 {
  margin-bottom: 30px;
}
.pre_title {
  text-align: left;
  font-size: 25px;
}

h3 {
  text-align: left;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-top: 60px;
  text-align: center;
  text-transform: uppercase;

  color: #424272;
}

h4 {
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #464a52;
  mix-blend-mode: normal;
  opacity: 0.6;
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

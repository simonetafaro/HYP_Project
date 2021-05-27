<template>
  <main class="container">
    <svg
      class="header-image"
      width="1254"
      height="746"
      viewBox="0 0 1254 746"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1146.86 705.15C842.723 859.13 27.2295 551.169 1.14682 141.51C-24.9359 -268.15 744.401 -752.061 1115.61 -579.67C1486.83 -407.28 1451.01 551.169 1146.86 705.15Z"
        fill="#FCFCFF"
      />
    </svg>
    <header class="upper-section">
      <p class="pre_title">Who we are</p>
      <p class="title">Meet our</p>
      <span class="title-people"> people </span>
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
      <div
        id="Null"
        class="filter active-filter"
        @click="findAllTeamMembers($event)"
      >
        All
      </div>
      <div
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        v-bind:id="area.id"
        class="filter"
        @click="filterTeamMemberByArea($event, area.id)"
      >
        {{ area.title }}
      </div>
    </div>
    <div class="lower-section">
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
          <div class="right-arrow" @click="scrollRight(member.id)">
            <svg
              width="31"
              height="49"
              viewBox="0 0 31 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33203 3L24.665 24.333L3.33203 45.666"
                stroke="#424272"
                stroke-width="8"
              />
            </svg>
          </div>
          <div class="left-arrow" @click="scrollLeft(member.id)">
            <svg
              width="31"
              height="49"
              viewBox="0 0 31 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.332 45.666L5.99902 24.333L27.332 2.99999"
                stroke="#424272"
                stroke-width="8"
              />
            </svg>
          </div>
          <div class="overlay-tab">
            <div class="close-button" @click="overlay = false">
              <svg
                width="71"
                height="41"
                viewBox="0 0 71 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 3L35 20.5L17.5 38"
                  stroke="#424272"
                  stroke-width="7"
                />
                <path
                  d="M52.7715 3L35.2715 20.5L52.7715 38"
                  stroke="#424272"
                  stroke-width="7"
                />
              </svg>
            </div>
            <div class="image-and-texts">
              <img
                :src="member.personPhoto"
                :alt="member.memberNameAndOccupation"
                class="overlay-photo"
              />
              <div class="overlay-texts">
                <span class="overlay-name">{{ member.personName }}</span>
                <span class="overlay-workfield">{{ member.workField }}</span>
                <span class="overlay-discover">Discover his projects</span>
              </div>
            </div>
            <div class="casestudies-container">
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
                    :path="casestudy.id"
                  ></case-study-mini>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
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
      let area = document.getElementsByClassName('filter active-filter')[0]
      area = area.id
      if (area === 'Null') {
        let member = await this.$axios.get(
          `${process.env.BASE_URL}/api/teammembers/${id}`
        )

        member = member.data
        if (member === null) {
          return
        }
        let relCasestudies = await this.$axios.get(
          `${process.env.BASE_URL}/api/casestudiesbyteammember/${id}`
        )
        relCasestudies = relCasestudies.data

        this.overlay = true
        this.member = member
        this.relCasestudies = relCasestudies
      } else {
        this.people = await this.$axios.$get(
          `${process.env.BASE_URL}/api/teammembersbyarea/${area}`
        )

        for (let i = 0; i < this.people.length; i++) {
          if (this.people[i].id === id) {
            const member = this.people[i]
            console.log(member)
            id = member.id
            let relCasestudies = await this.$axios.get(
              `${process.env.BASE_URL}/api/casestudiesbyteammember/${id}`
            )
            relCasestudies = relCasestudies.data

            this.overlay = true
            this.member = member
            this.relCasestudies = relCasestudies
            return
          }
        }
      }
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
  height: 100%;
  max-height: max-content;
  position: fixed;
  overflow: scroll;
  top: 70px;
  background: rgba(113, 126, 238, 0.3);
  backdrop-filter: blur(8px);
  padding: 50px;
}

.overlay-tab {
  background: #f9f9ff;
  width: 90%;
  display: flex;
  height: max-content;
  border-radius: 10px;
  position: relative;
  margin: auto;
  padding: 25px;
}

.right-arrow {
  position: absolute;
  top: 200px;
  right: 5%;
  cursor: pointer;
}

.right-arrow:hover {
  transform: scale(1.1);
}

.left-arrow {
  position: absolute;
  left: 5%;
  top: 200px;
  cursor: pointer;
}

.left-arrow:hover {
  transform: scale(1.1);
}

.image-and-texts {
  position: relative;
  left: 0;
  margin-top: 20px;
  top: 0;
  width: 300px;
}

.overlay-photo {
  height: auto;
  width: 300px;
  border-radius: 10px;
}

.overlay-texts {
  left: 2%;
}

.overlay-name {
  display: block;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  color: #424272;
  padding: 20px;
}

.overlay-workfield {
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  padding: 17px;

  /* identical to box height, or 100% */
  text-align: center;

  color: #464a52;

  mix-blend-mode: normal;
  opacity: 0.6;
}

.overlay-discover {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  text-align: center;
  text-transform: uppercase;
  color: #424272;
}

.casestudies-container {
  position: relative;
  right: 0;
  top: 0;
  margin-top: 20px;
  margin: auto;
  width: 750px;
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
  width: 30px !important;
}

.close-button {
  position: absolute;
  right: 0%;
  top: 3%;
  transform: scale(0.5);
}

.close-button:hover {
  cursor: pointer;
  transform: scale(0.6);
}

.container {
  max-width: 100%;
  padding: 0px;
}

.lower-section {
  position: relative;
}

.upper-section {
  position: relative;
  width: 1110px;
  margin: auto;
  margin-top: 133px;
}

h2 {
  margin-bottom: 30px;
}
.pre_title {
  text-align: left;
  font-size: 25px;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-top: 60px;
  text-transform: uppercase;
  color: var(--cc-base1);
}

.description {
  text-transform: none;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: left;
  height: 337px;
  width: 730px;
  margin-top: 22px;
  color: #464a52;
}
h4 {
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: var();
  mix-blend-mode: normal;
  opacity: 0.6;
}

.title {
  text-align: left;
  font-size: 60px;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-transform: uppercase;

  color: #424272;
}

.title-people {
  text-align: left;
  font-size: 60px;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-transform: uppercase;
  position: relative;
  left: -38.5%;

  color: #cdc9ff;
}

.member-grid {
  display: grid;
  position: relative;
  width: 1110px;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin: auto;
  margin-top: 50px;
}

.filter-bar {
  display: inline-flex;
  margin-top: 30px;
  width: 1110px;
  z-index: 10;
}
.filter {
  margin-right: 30px;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 24px;
  text-transform: uppercase;

  color: var(--cc-base1);
}
.active-filter {
  color: var(--cc-red);
}

.header-image {
  position: absolute;
  top: 0;
  right: 0;
}

.member {
  cursor: pointer;
  margin-bottom: 20px;
}

.member-mini {
  margin-bottom: 50px;
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

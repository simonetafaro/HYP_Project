<template>
  <section class="container">
    <header>
      <h1>{{ area.title }}</h1>
      <h4>{{ area.subTitle }}</h4>
      <img :src="area.banner" :alt="area.title" />
    </header>
    <article>
      <h4>
        {{ area.description }}
      </h4>
    </article>
    <p class="text-start">Why Choosing Us</p>
    <div class="text-intro">
      our Services
      <p class="text-fucsia">success business</p>
    </div>
    <section class="service-grid">
      <h4 v-if="area.services.length === 0">There are no services</h4>
      <div
        v-for="(service, serviceIndex) of area.services"
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
    <div>
      <button class="button">DISCOVER ALL SERVICES</button>
    </div>
    <br />
    <svg
      width="101"
      height="101"
      viewBox="0 0 101 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M100.705 50.4995C86.841 64.3631 64.3636 64.3631 50.5 50.4995C64.3636 36.6359 86.841 36.6359 100.705 50.4995ZM0.295419 50.4995C14.159 36.6359 36.6364 36.6359 50.5 50.4995C36.6364 64.3631 14.159 64.3631 0.295419 50.4995ZM50.5 50.4995C36.6364 36.6359 36.6364 14.1585 50.5 0.294922C64.3636 14.1585 64.3636 36.6359 50.5 50.4995ZM50.5 50.4995C64.3636 64.3631 64.3636 86.8405 50.5 100.704C36.6364 86.8405 36.6364 64.3631 50.5 50.4995Z"
        fill="#E8E7FF"
      />
    </svg>
    <br />
    <p class="text-start">WHAT WE DO</p>
    <div class="text-intro">
      DISCOVER OUR
      <p class="text-fucsia">clients Case Studies</p>
    </div>

    <section class="casestudies-grid">
      <h4 v-if="area.casestudies === 0">There are no cs</h4>
      <div
        v-for="(casestudy, casestudyIndex) of area.casestudies"
        :key="'casestudy-' + casestudyIndex"
        class="casestudy"
      >
        <case-study-mini
          :title="casestudy.title"
          :description="casestudy.subTitle"
          :image="casestudy.banner"
          :path="casestudy.id"
        ></case-study-mini>
      </div>
    </section>
    <div>
      <button class="button">DISCOVER ALL CASES</button>
    </div>
    <p class="text-start">the people</p>
    <div class="text-intro">
      MEET OUR
      <p class="text-fucsia">PROFESSIONAL TEAM</p>
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
  </section>
</template>
<script>
import ServiceMini from '~/components/service/ServiceMini.vue'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import MemberMini from '~/components/team/MemberMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  components: {
    ServiceMini,
    CaseStudyMini,
    MemberMini,
  },
  mixins: [GoToMixins],
  async asyncData({ $axios, route }) {
    const { id } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area/${id}`)
    const area = data
    const teammembers = await $axios.get(
      `${process.env.BASE_URL}/api/teammembersbyarea/${id}`
    )
    const people = teammembers.data
    return {
      area,
      people,
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

    //  check highest title
    let serviceCardTitleMaxHeight = 0
    Array.from(document.getElementsByClassName('service_title')).forEach(
      function (card) {
        if (card.clientHeight > serviceCardTitleMaxHeight)
          serviceCardTitleMaxHeight = card.clientHeight
      }
    )
    //  set the same height to all the title
    Array.from(document.getElementsByClassName('service_title')).forEach(
      function (card) {
        if (card.clientHeight < serviceCardTitleMaxHeight)
          card.style.lineHeight = serviceCardTitleMaxHeight + 'px'
      }
    )
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.casestudies-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}

img {
  max-width: 600px;
}
.member-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.person {
  cursor: pointer;
  margin-bottom: 20px;
}

.button {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  padding: 15px 25px 15px 25px;
  color: var(--cc-base2);
  background: #e8e6ff;
  border-radius: 35px;
  max-width: 30%;
  margin: auto;
  border: none;
}
.text-intro {
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-align: center;
  text-transform: uppercase;
  color: var(--c-grey1);
}
.text-fucsia {
  color: var(--cc-red);
}
.text-start {
  padding-top: 44px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 44px;
  text-align: center;
  text-transform: uppercase;
  color: var(--c-grey1);
}
</style>

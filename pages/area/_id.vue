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
    <p class="casestart">Why Choosing Us</p>
    <p
      class="caseintro"
      :style="{
        color: 'var(--c-grey1)',
      }"
    >
      our Services
    </p>
    <p
      class="caseintro"
      :style="{
        color: 'var(--cc-red) ',
      }"
    >
      success business
    </p>
    <section class="service-grid">
      <h4 v-if="area.services.length === 0">There are no services</h4>
      <div
        v-for="(service, serviceIndex) of area.services"
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
    <div class="discover">
      <p class="discover-text">DISCOVER ALL SERVICES</p>
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
    <p class="casestart">WHAT WE DO</p>
    <p
      class="caseintro"
      :style="{
        color: 'var(--c-grey1) ',
      }"
    >
      DISCOVER OUR
    </p>
    <p
      class="caseintro"
      :style="{
        color: 'var(--cc-red) ',
      }"
    >
      clients Case Studies
    </p>
    <section class="casestudies-grid">
      <h4 v-if="area.casestudies === 0">There are no cs</h4>
      <div
        v-for="(casestudy, casestudyIndex) of area.casestudies"
        :key="'casestudy-' + casestudyIndex"
        class="casestudy"
        @click="goTo(`/casestudy/${casestudy.id}`)"
      >
        <case-study-mini
          :title="casestudy.title"
          :description="casestudy.subTitle"
          :image="casestudy.banner"
        ></case-study-mini>
      </div>
    </section>
    <div class="discover">
      <p class="discover-text">DISCOVER ALL CASES</p>
    </div>

    <p class="casestart">the people</p>

    <p
      class="caseintro"
      :style="{
        color: 'var(--c-grey1)',
      }"
    >
      MEET OUR
    </p>
    <p
      class="caseintro"
      :style="{
        color: 'var(--cc-red)',
      }"
    >
      PROFESSIONAL TEAM
    </p>
    <section class="member-grid">
      <div
        v-for="(person, personIndex) of people"
        :key="'person-' + personIndex"
        class="person"
        @click="goTo(`/team/${person.id}`)"
      >
        <member-mini
          :title="person.memberNameAndOccupation"
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
  mixins: [GoToMixins],
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
.casestudy {
  cursor: pointer;
  margin-bottom: 20px;
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
.discover {
  background: #e8e6ff;
  border-radius: 35px;
  max-width: 30%;
  margin: auto;
}
.discover-text {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  padding: 15px 25px 15px 25px;
  color: var(--cc-base2);
}
.caseintro {
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-align: center;
  text-transform: uppercase;
}
.casestart {
  padding-top: 44px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  padding-bottom: 44px;
  text-align: center;
  text-transform: uppercase;
  color: var(--c-grey1);
}
</style>

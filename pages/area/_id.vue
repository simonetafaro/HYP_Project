<template>
  <section class="container">
    <header>
      <h1>{{ area.title }}</h1>
      <h4>{{ area.subTitle }}</h4>
      <img :src="area.banner" :alt="area.title" />
    </header>
    <article>
      <p>
        {{ area.description }}
      </p>
    </article>

    <br />
    <h3>Services</h3>
    <br />
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

      <br />
    </section>
    <br />
    <h3>Case Studies</h3>
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
        ></case-study-mini>
      </div>
    </section>

    <h3>Team Members</h3>
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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
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
</style>

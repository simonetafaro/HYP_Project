<template>
  <section class="container">
    <header>
      <h1>{{ casestudy.title }}</h1>
      <h4>{{ casestudy.subTitle }}</h4>
      <img :src="casestudy.banner" :alt="casestudy.title" />
      <p>
        {{ casestudy.description }}
      </p>
      <br />
    </header>
    <h3>Services related to this project</h3>
    <section class="service-grid">
      <h4 v-if="relServices === 0">There are no related Services</h4>
      <div
        v-for="(service, serviceIndex) of relServices"
        :key="'service-' + serviceIndex"
        class="service"
        @click="goTo(`/service/${service.id}`)"
      >
        <service-mini
          :title="service.title"
          :image="service.banner"
          :path="service.id"
        ></service-mini>
      </div>
    </section>

    <h3>Team Members</h3>
    <section class="member-grid">
      <div
        v-for="(person, personIndex) of casestudy.teammembers"
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
import GoToMixins from '~/mixins/goTo-mixins.js'
import ServiceMini from '~/components/service/ServiceMini.vue'
import MemberMini from '~/components/team/MemberMini.vue'
export default {
  components: {
    ServiceMini,
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
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/casestudy/${id}`
    )
    const casestudy = data
    let relServices = await $axios.get(
      `${process.env.BASE_URL}/api/casestudyservices/${id}`
    )
    relServices = relServices.data
    console.log(casestudy)
    return {
      casestudy,
      relServices,
    }
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
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
@media screen and (max-width: 600px) {
  .casestudies-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>

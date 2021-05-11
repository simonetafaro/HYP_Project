<template>
  <section class="container">
    <header>
      <h1>{{ casestudy.title }}</h1>
      <h4>{{ casestudy.subTitle }}</h4>
      <img :src="casestudy.banner" :alt="casestudy.title" />
      <p>
        {{ casestudy.descriptiveText }}
      </p>
      <h3>CHALLENGE</h3>
      <h2>{{ casestudy.challengeTitle }}</h2>

      <p>{{ casestudy.challengeDescription }}</p>
      <br />
      <h3>SOLUTION</h3>
      <h2>{{ casestudy.solutionTitle }}</h2>
      <p>{{ casestudy.solutionDescription }}</p>
      <br />
    </header>

    <h3>SERVICES RELATED TO THIS PROJECT</h3>
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
          :summary="service.subTitle"
          :image="service.banner"
        ></service-mini>
      </div>
    </section>
    <h3>TEAM WORKING ON THIS PROJECT</h3>
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
import GoToMixins from '~/mixins/goTo-mixins.js'
import ServiceMini from '~/components/service/ServiceMini.vue'
export default {
  components: {
    ServiceMini,
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
p {
  text-align: left;
  margin-top: 40px;
}
@media screen and (max-width: 600px) {
  .casestudies-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>

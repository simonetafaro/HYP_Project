<template>
  <section class="container">
    <header>
      <h1>{{ service.title }}</h1>
      <h4>{{ service.subTitle }}</h4>
      <img :src="service.banner" :alt="service.title" />
      <p>
        {{ service.description }}
      </p>
      <br />
    </header>
    <h3 v-if="service.casestudies != 0">All Case Studies</h3>
    <section class="casestudies-grid">
      <h4 v-if="service.casestudies === 0">There are no cs</h4>
      <div
        v-for="(casestudy, casestudyIndex) of service.casestudies"
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
    <h3>Related Services</h3>
    <section class="service-grid">
      <h4 v-if="relServices === 0">There are no related Services</h4>
      <div
        v-for="(service, serviceIndex) of relServices"
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
    <!--TODO: Add team member of this area-->
  </section>
</template>
<script>
import GoToMixins from '~/mixins/goTo-mixins.js'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import ServiceMini from '~/components/service/ServiceMini.vue'
export default {
  components: {
    CaseStudyMini,
    ServiceMini,
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
  mixins: [GoToMixins],
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/service/${id}`
    )
    const service = data
    let relServices = await $axios.get(
      `${process.env.BASE_URL}/api/relatedServices/${data.areaID}/${id}`
    )
    relServices = relServices.data
    return {
      service,
      relServices,
    }
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
.casestudy {
  cursor: pointer;
  margin-bottom: 20px;
}
.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
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

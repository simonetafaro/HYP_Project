<template>
  <section class="container">
    <header>
      <h1>{{ service.title }}</h1>
      <h4>{{ service.subTitle }}</h4>
      <img :src="service.banner" :alt="service.title" />
      <p>
        {{ service.description }}
      </p>
    </header>
    <h3>All Case Studies</h3>
    <section class="casestudies-grid">
      <h4 v-if="service.casestudies === 0">There are no cs</h4>
      <div
        v-for="(casestudy, casestudyIndex) of service.casestudies"
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
    <h3>Related Services</h3>
    <section class="service-grid">
      <h4 v-if="relatedServices === 0">There are no related Services</h4>
      <div
        v-for="(service, serviceIndex) of relatedServices"
        :key="'service-' + serviceIndex"
        class="service"
      >
        <service-mini
          :title="service.title"
          :summary="service.subTitle"
          :image="service.banner"
        ></service-mini>
      </div>
    </section>
    <!--TODO: Add team member of this area-->
  </section>
</template>
<script>
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import ServiceMini from '~/components/service/ServiceMini.vue'

export default {
  components: {
    CaseStudyMini,
    ServiceMini,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/service/${id}`
    )
    const relServices = await $axios.get(
      `${process.env.BASE_URL}/api/relatedServices/${data.areaID}`
    )
    const service = data
    const relatedServices = relServices.data
    return {
      service,
      relatedServices,
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

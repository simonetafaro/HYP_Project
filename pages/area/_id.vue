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
    <h3>Services</h3>
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
    <!--TODO: Add team of this area-->
  </section>
</template>
<script>
import ServiceMini from '~/components/service/ServiceMini.vue'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  components: {
    ServiceMini,
    CaseStudyMini,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area/${id}`)
    const area = data
    return {
      area,
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
p {
  text-align: left;
  margin-top: 40px;
}
</style>

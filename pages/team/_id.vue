<template>
  <section class="container">
    <header>
      <h1>{{ person.personName }}</h1>
      <h4>{{ person.workField }}</h4>
      <img :src="person.personPhoto" :alt="person.memberNameAndOccupation" />
    </header>
    <article>
      <p>
        {{ person.personalDescription }}
      </p>
    </article>
    <h3>Related Case Studies</h3>
    <section class="casestudies-grid">
      <h4 v-if="relCasestudies === 0">There are no related Case Studies</h4>
      <div
        v-for="(casestudy, casestudyIndex) of relCasestudies"
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
  </section>
</template>
<script>
import MemberMini from '~/components/team/MemberMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MemberMini,
    CaseStudyMini,
  },

  mixins: [GoToMixins],

  async asyncData({ $axios, route }) {
    const { id } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/teammembers/${id}`
    )
    const person = data

    let relCasestudies = await $axios.get(
      `${process.env.BASE_URL}/api/casestudiesbyteammember/${data.teamsTitle}`
    )
    relCasestudies = relCasestudies.data
    return {
      person,
      relCasestudies,
    }
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}

h3 {
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
  max-width: 300px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>

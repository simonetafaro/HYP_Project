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

    <!--TODO: Add team of this area-->
  </section>
</template>
<script>
import MemberMini from '~/components/team/MemberMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MemberMini,
  },

  mixins: [GoToMixins],

  async asyncData({ $axios, route }) {
    const { id } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/teammembers/${id}`
    )
    const person = data
    return {
      person,
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
  max-width: 300px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>

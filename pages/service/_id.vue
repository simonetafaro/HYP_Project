<template>
  <section class="container">
    <header>
      <h1>{{ service.title }}</h1>
      <h4>{{ service.subTitle }}</h4>
      <img :src="service.banner" :alt="service.title" />
    </header>
    <article>
      <p>
        {{ service.title }}
      </p>
    </article>
    <section class="casestudies">
      <h3>Case Study</h3>
      <h4 v-if="service.casestudies === 0">There are no cs</h4>
      <div
        v-for="(casestudy, casestudyIndex) of service.casestudies"
        :key="'casestudy-' + casestudyIndex"
        class="casestudy"
      >
        <div class="content">
          {{ casestudy.title }}
        </div>
        <div class="content">
          {{ casestudy.subTitle }}
        </div>
      </div>
    </section>
    <!--TODO: Add team member of this area-->
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/service/${id}`
    )
    const service = data
    return {
      service,
    }
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.casestudies {
  margin-top: 60px;
  text-align: left;
}
.casestudy {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>

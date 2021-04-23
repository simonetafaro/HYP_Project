<template>
  <section class="container">
    <header>
      <h1>{{ area.title }}</h1>
      <h4>{{ area.subTitle }}</h4>
      <img :src="area.image" :alt="area.title" />
    </header>
    <article>
      <p>
        {{ area.title }}
      </p>
    </article>
    <section class="services">
      <h3>Services</h3>
      <h4 v-if="area.services.length === 0">There are no services</h4>
      <div
        v-for="(service, serviceIndex) of area.services"
        :key="'service-' + serviceIndex"
        class="service"
        @click="goToService(`/service/${service.id}`)"
      >
        <div class="content">
          {{ service.title }}
        </div>
        <div class="content">
          {{ service.subTitle }}
        </div>
      </div>
    </section>
    <!--TODO: Add case studies of this area-->
    <!--TODO: Add team of this area-->
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area/${id}`)
    const area = data
    return {
      area,
    }
  },
  methods: {
    goToService(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.services {
  margin-top: 60px;
  text-align: left;
}
.service {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
  cursor: pointer;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>

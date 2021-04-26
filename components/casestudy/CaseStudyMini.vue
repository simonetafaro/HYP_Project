<template>
  <div class="casestudy-mini">
    <div class="card">
      <h3>{{ title }}</h3>
      <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.card {
  padding: 20px 10px;
  border: 1px solid grey;
  border-radius: 4px;
}
h3 {
  height: 60px;
  margin-bottom: 10px;
}
p {
  height: 60px;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 200px;
  max-width: 600px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 40px;
}
</style>

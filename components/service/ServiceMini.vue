<template>
  <div class="article-mini">
    <div class="card">
      <h3>{{ title }}</h3>
      <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
      <p>{{ summary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    summary: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.card {
  background: #fff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 20px;
}

h3 {
  font-size: 18px;
  height: 60px;
  padding: 20px;
  text-transform: uppercase;
  display: inline-block;
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

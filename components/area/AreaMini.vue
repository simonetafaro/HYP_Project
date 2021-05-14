<template>
  <div class="article-mini">
    <div class="card">
      <h3>{{ title }}</h3>
      <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
      <p>{{ summary }}</p>
      <button class="more_button">learn more</button>
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
  padding: 20px 20px;
  background: #fff;
  border-radius: 20px;
  /* border: 1px solid #e8e7ff; */
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
}

h3 {
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  color: #63639f;
}

p {
  height: 60px;
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

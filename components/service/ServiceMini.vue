<template>
  <div class="article-mini">
    <div class="card">
      <h3>{{ title }}</h3>
      <div class="img-container">
        <img class="img" :src="'https://i.ibb.co/pWxK61N/da-scaricare.png'" />
      </div>
      <button class="cc-learnMoreButton">LEARN MORE</button>
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
  padding-top: 32px;
  padding-bottom: 24px;
  background: #ffffff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 50px;
}
h3 {
  height: 60px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
}
p {
  height: 60px;
  overflow: hidden;
}
.img-container {
  margin: 35px 80px 35px 80px;
}

.img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  max-height: 100px;
  object-fit: contain;
}

.cc-learnMoreButton {
  box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
  border-radius: 35px;
  background: var(--cc-base1);
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  padding: 13px 25px 13px 25px;
}
</style>

<template>
  <div
    :class="{
      'area-home-mini': isEven(index),
      'area-home-mini reverse-view': !isEven(index),
    }"
  >
    <div class="area-description-column">
      <div class="area-description-text">{{ summary }}</div>
      <button class="more_button">learn more</button>
    </div>
    <div class="area-image-column">
      <img class="service_img" src="https://i.ibb.co/pZ83v4z/iot-main.png" />
      <div class="area-title-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: {
      type: String,
      default: () => '',
    },
    summary: { type: String, default: () => '' },
    index: { type: Number, default: () => 0 },
  },
  methods: {
    isEven(index) {
      return (index + 1) % 2
    },
  },
}
</script>

<style scoped>
.area-home-mini {
  display: inline-flex;
  width: 100%;
  margin: auto;
  margin-bottom: 27px;
  margin-top: 147px;
}
.reverse-view {
  flex-direction: row-reverse;
}
.area-image-column {
  width: max-content;
  max-width: 428px;
  width: 50%;
  position: relative;
}

.service_img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  width: 100%;
  object-fit: cover;
}
.area-description-column {
  width: 50%;
  margin: auto;
  max-width: 350px;
  text-align: left;
}

.area-description-text {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  color: #464a52;
  mix-blend-mode: normal;
  opacity: 0.6;
  margin-bottom: 22px;
}

.area-title-text {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #424272;
  text-transform: uppercase;
  position: absolute;
  bottom: 25px;
  right: 0;
  left: 0;
}
.more_button {
  background: #e8e6ff;
  box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
  border-radius: 35px;
  color: #63639f;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  padding: 10px 32px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
}

.more_button:hover {
  background: #424272;
  color: white;
  box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
}

.more_button:active {
  background: #4d41c9;
  box-shadow: inset 0px 4px 6px rgba(66, 66, 114, 0.16);
}
</style>

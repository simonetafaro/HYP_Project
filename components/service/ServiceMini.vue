<template>
  <div class="service_mini">
    <div
      :class="
        serviceIndex % 2 === 0
          ? 'service-right service_card'
          : 'service-left service_card'
      "
    >
      <div class="service_title">{{ title }}</div>
      <div class="service_img_container">
        <img class="service_img" :src="image" />
      </div>
      <button v-on:click="goTo('/service/' + path)" class="more_button">
        LEARN MORE
      </button>
    </div>
  </div>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  MobileORTablet: false,
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    path: { type: Number, default: () => 0 },
    serviceIndex: { type: Number, default: () => 0 },
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
.service_card {
  padding: 32px 10px 24px 10px;
  background: #ffffff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 50px;
  width: 350px;
}
.service_title {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  color: var(--cc-base2);
}

.service_img_container {
  margin: 35px 50px 35px 50px;
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

@media screen and (max-width: 1200px) {
  .service_card {
    width: 90%;
    max-width: 350px;
    border-radius: 25px;
    margin: auto;
  }
  .service-left {
    margin-right: 0;
  }
  .service-right {
    margin-left: 0;
  }
  .service_title {
    font-size: 14px;
    line-height: 17px;
  }
  .more_button {
    display: none;
  }
  .service_img {
    border-radius: 10px;
  }
}

@media screen and (max-width: 768px) {
  .service_card {
    width: 100%;
    padding-top: 10px;
  }
  .service-left {
    margin-right: 0;
  }
  .service-right {
    margin-left: 0;
  }
  .service_title {
    font-size: 14px;
    line-height: 17px;
  }
  .more_button {
    display: none;
  }
  .service_img_container {
    margin: 10px 30px 0px 30px;
  }
  .service_img {
    border-radius: 10px;
  }
}
</style>

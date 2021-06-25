<template>
  <div class="service_mini">
    <div
      :class="
        serviceIndex % 2 === 0
          ? carouselCard
            ? 'service_card service_card_carousel'
            : 'service-right service_card'
          : carouselCard
          ? 'service_card service_card_carousel'
          : 'service-left service_card'
      "
      @click="clickOnCardOnlyTabletAndMobile(path)"
    >
      <h2 class="service_title">{{ title }}</h2>
      <div class="service_img_container">
        <img class="service_img" :src="image" :alt="altBanner" />
      </div>
      <button v-on:click="goTo('/service/' + path)" class="more_button">
        LEARN MORE
      </button>
    </div>
  </div>
</template>

<script>
import GeneralMixins from '~/mixins/general-mixins.js'

export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    path: { type: Number, default: () => 0 },
    serviceIndex: { type: Number, default: () => 0 },
    altBanner: { type: String, default: () => '' },
    carouselCard: { type: Boolean, default: () => false },
  },
  mixins: [GeneralMixins],
  methods: {
    clickOnCardOnlyTabletAndMobile(path) {
      if (window.innerWidth < 1200) {
        return this.goTo('/service/' + path)
      }
    },
  },
}
</script>

<style scoped>
.service_card {
  padding: 24px 10px;
  background: #ffffff;
  box-shadow: 0px 3px 25px rgba(205, 201, 255, 0.3);
  border-radius: 50px;
  max-width: 350px;
}
.service_card_carousel {
  max-width: 310px;
}
.service_title {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  color: var(--cc-base2);
}

.service_img_container {
  margin: 25px 50px 15px 50px;
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
    padding: 15px 10px 20px 10px;
    border-radius: 25px;
    margin: auto;
    max-width: 350px;
  }
  .service_card_carousel {
    max-width: 200px;
  }
  .service-left {
    margin-right: 12px;
  }
  .service-right {
    margin-left: 12px;
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
  .service_img_container {
    margin: 15px 35px 10px 35px;
  }
}

@media screen and (max-width: 768px) {
  .service_card {
    width: 100%;
    max-width: 270px;
    padding-top: 10px;
  }
  .service_card_carousel {
    max-width: 220px;
  }
  .service-left {
    margin-right: 0px;
  }
  .service-right {
    margin-left: 0px;
  }
  .service_title {
    font-size: 14px;
    line-height: 14px;
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

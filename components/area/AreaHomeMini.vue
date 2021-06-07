<template>
  <div
    :class="{
      'area-home-mini': isEven(index),
      'area-home-mini reverse-view': !isEven(index),
    }"
  >
    <div class="area-image-column">
      <img class="service_img" :src="image" :alt="altEvocativeImage" />
    </div>
    <div class="area-description-column">
      <div class="area-description-text">{{ summary }}</div>
      <button class="more_button" @click="goTo(`/area/${path}`)">
        learn more
      </button>
    </div>
  </div>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  props: {
    image: {
      type: String,
      default: () => '',
    },
    summary: { type: String, default: () => '' },
    index: { type: Number, default: () => 0 },
    altEvocativeImage: { type: String, default: () => '' },
    path: { type: Number, default: () => 0 },
  },
  methods: {
    isEven(index) {
      return (index + 1) % 2
    },
  },
  mixins: [GoToMixins],
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
  color: var(--c-grey1);
  mix-blend-mode: normal;
  opacity: 0.8;
  margin-bottom: 22px;
}

.area-title-text {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: var(--cc-base1);
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
  color: var(--cc-base2);
  font-style: normal;
  font-weight: 700;
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
  background: var(--cc-base1);
  color: white;
  box-shadow: 0px 4px 6px rgba(66, 66, 114, 0.16);
}

.more_button:active {
  background: #4d41c9;
  box-shadow: inset 0px 4px 6px rgba(66, 66, 114, 0.16);
}

@media screen and (max-width: 1200px) {
  .area-home-mini {
    margin-bottom: 0px;
    margin-top: 0px;
  }
  .area-image-column {
    margin-bottom: 0px;
    max-width: 50%;
  }
  .reverse-view {
    flex-direction: unset;
  }
  .area-description-column {
    margin-left: 25px;
  }
  .area-description-text {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 18px;
  }

  .area-title-text {
    font-size: 18px;
    line-height: 32px;
  }
}

@media screen and (max-width: 768px) {
  .area-home-mini {
    display: block;
    margin-bottom: 0px;
    margin-top: 14px;
  }
  .reverse-view {
    flex-direction: unset;
  }
  .area-image-column {
    width: 100%;
    max-width: 100%;
    margin-bottom: 26px;
  }
  .area-description-column {
    width: 100%;
    margin: 0;
    margin-bottom: 26px;
    max-width: 100%;
    text-align: center;
  }
}
</style>

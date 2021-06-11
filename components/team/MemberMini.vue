<template>
  <div class="member-mini">
    <div :class="(index + 1) % 2 === 0 ? 'card-right card' : 'card-left card'">
      <div class="person-image-container">
        <svg
          class="personPhoto"
          width="234"
          height="216"
          viewBox="0 0 254 236"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              xmlns="http://www.w3.org/2000/svg"
              :id="'team-' + index"
              patternUnits="userSpaceOnUse"
              width="450"
              height="250"
            >
              <image
                xmlns:xlink="http://www.w3.org/1999/xlink"
                :xlink:href="image"
                x="-60"
                y="-10"
                width="400"
                height="280"
              />
            </pattern>
          </defs>
          <path
            clip-rule="evenodd"
            d="M244.424 212.428C209.071 256.341 27.3303 234.819 3.38754 181.475C-20.5553 128.131 88.1562 -7.51591 149.225 0.326202C210.294 8.16832 279.778 168.515 244.424 212.428Z"
            :fill="`url(#team-${index})`"
          />
        </svg>
      </div>
      <p class="occupation">{{ occupation }}</p>
      <h3 class="personName" @click="goTo(`/team/${id}`)">{{ personName }}</h3>
    </div>
  </div>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  props: {
    personName: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    occupation: { type: String, default: () => '' },
    index: { type: Number, default: () => 0 },
    id: { type: Number, default: () => 0 },
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
.person-image-container {
  position: relative;
}
.card {
  display: table;
  margin: 0 auto;
}
.occupation {
  padding-top: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.8;
}
.personName {
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  text-align: center;
  color: var(--cc-base1);
  cursor: pointer;
}

.personPhoto {
  margin-bottom: 10px;
}

@media screen and (max-width: 1200px) {
  .card {
    width: 200px;
  }
  .occupation {
    font-weight: normal;
    font-size: 11px;
    line-height: 24px;
  }
  .personName {
    font-size: 18px;
    line-height: 22px;
  }

  .personPhoto {
    height: 200px;
    width: auto;
  }

  .card-left {
    margin-right: 25px;
  }
  .card-right {
    margin-left: 25px;
  }
}

@media screen and (max-width: 768px) {
  .card {
    width: 100px;
  }
  .occupation {
    font-weight: normal;
    font-size: 11px;
    line-height: 24px;
  }
  .personName {
    font-size: 18px;
    line-height: 22px;
  }

  .personPhoto {
    height: 110px;
    width: auto;
  }
  .card-left {
    margin-right: 10px;
  }
  .card-right {
    margin-left: 10px;
  }
}
</style>

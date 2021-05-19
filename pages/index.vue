<template>
  <main class="container">
    <div class="area-header">HEX<span class="title-purple">TECH.</span></div>

    <section class="areas-container">
      <div class="text1">WHAT WE DO</div>
      <div class="section-title">
        OUR WORKING<br /><span class="section-title-2">BUSINESS FIELDS</span>
      </div>
      <div class="section-description">
        Nulla ante risus, condimentum eu consectetur vel, facilisis ac nulla.
        Sed blandit nulla diam, in mattis nibh porta quis. Mauris consectetur
        sodales volutpat. Suspendisse potenti. Sed dapibus est ut magna egestas
        tincidunt.
      </div>
      <div class="button-container">
        <div class="scroll-text-compare">WHAT WE DO</div>
        <div class="button-inner-container">
          <button
            v-for="(area, areaIndex) of areas"
            :key="'area-' + areaIndex"
            class="go-to-area-button"
            :id="'button-area-' + area.id"
            @click="moveTo(`area-box-` + area.id)"
          >
            {{ area.title }}
          </button>
        </div>
      </div>
      <div class="areas-inner-container">
        <div
          v-for="(area, areaIndex) of areas"
          :key="'area-' + areaIndex"
          class="single-area-section"
          :id="'area-box-' + area.id"
          @click="goTo(`/area/${area.id}`)"
        >
          <area-home-mini
            :title="area.title"
            :summary="area.subTitle"
            :image="area.banner"
            :index="areaIndex + 1"
          ></area-home-mini>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AreaHomeMini from '~/components/area/AreaHomeMini.vue'
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  data() {
    return {
      isPositionFixed: false,
      areas: [],
    }
  },
  components: {
    AreaHomeMini,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = data
    return {
      areas,
    }
  },
  mixins: [GoToMixins],
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    moveTo(path) {
      const elem = document.getElementById(path)
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
    },
    handleScroll() {
      const buttonBar = document.getElementsByClassName('button-container')[0]
      const hiddenText = document.getElementsByClassName(
        'scroll-text-compare'
      )[0]
      this.areas.forEach(function (area) {
        if (
          document.getElementById('area-box-' + area.id).getBoundingClientRect()
            .top < 180 &&
          document.getElementById('area-box-' + area.id).getBoundingClientRect()
            .top > 0
        ) {
          document
            .getElementById('button-area-' + area.id)
            .classList.add('area-visibile-button')
        } else {
          document
            .getElementById('button-area-' + area.id)
            .classList.remove('area-visibile-button')
        }
      })
      if (buttonBar.getBoundingClientRect().top < 90 && !this.isPositionFixed) {
        hiddenText.style.display = 'block'
        buttonBar.style.position = 'sticky'
        buttonBar.style.top = '90px'
        this.isPositionFixed = true
      }
      if (buttonBar.getBoundingClientRect().top > 90 && this.isPositionFixed) {
        hiddenText.style.display = 'none'
        buttonBar.style.position = 'static'
        buttonBar.style.top = 0
        this.isPositionFixed = false
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 100%;
  padding-top: 0px;
  margin-top: 0px;
  padding: 0;
}
.area-header {
  height: 300px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 96px;
  line-height: 144px;
  text-transform: uppercase;
  color: #000000;
  margin: auto;
  line-height: 300px;
}
.title-purple {
  color: #4d41c9;
}

.text1 {
  font-family: 'Barlow';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: #424272;
  margin-bottom: 44px;
  padding-top: 152px;
}
.scroll-text-compare {
  font-family: 'Barlow';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: #424272;
  display: none;
  margin: auto;
  padding: 25px 15px;
}

.section-title {
  font-family: 'Barlow';
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-align: center;
  text-transform: uppercase;
  color: #424272;
}
.section-title-2 {
  color: #e8e6ff;
}
.section-description {
  font-family: 'Barlow';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #464a52;
  mix-blend-mode: normal;
  opacity: 0.6;
  max-width: 769px;
  margin: auto;
  margin-top: 86px;
  margin-bottom: 162px;
}

.button-container {
  width: 100%;
  margin: auto;
  background: #fff;
  z-index: 1;
  padding: 15px 0;
  background: #fbfbff 79.17%;
}
.button-inner-container {
  display: inline-flex;
  max-width: 1110px;
  margin: auto;
  width: 100%;
  padding-bottom: 15px;
}
.go-to-area-button {
  background: #f9f9ff;
  border: 2px solid #63639f;
  border-radius: 35px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  margin: auto;
  padding: 10px;
  color: #63639f;
  cursor: pointer;
}

.go-to-area-button:hover {
  background: #424272;
  color: white;
  cursor: pointer;
  opacity: 1;
}
.area-visibile-button {
  background: #424272;
  color: white;
  cursor: pointer;
  opacity: 0.7;
}
.areas-container {
  background: linear-gradient(
    180deg,
    #fbfbff 79.17%,
    rgba(251, 251, 255, 0) 100%
  );
}
.areas-inner-container {
  max-width: 1110px;
  margin: auto;
}
.single-area-section {
  display: table;
  margin: auto;
}
</style>

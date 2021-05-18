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
        <button
          v-for="(area, areaIndex) of areas"
          :key="'area-' + areaIndex"
          class="go-to-area-button"
          @click="goTo(`/home#` + area.id)"
        >
          {{ area.title }}
        </button>
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
    if (this.$router.history.current.hash !== '') {
      setTimeout(() => {
        const elem = document.getElementById(
          'area-box-' + this.$router.history.current.hash.substring(1)
        )
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }, 0)
    }
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
}

.button-container {
  display: inline-flex;
  width: 100%;
  max-width: 1110px;
  margin: auto;
  padding-top: 162px;
  margin-bottom: 197px;
}
.go-to-area-button {
  background: #f9f9ff;
  border: 2px solid #63639f;
  border-radius: 35px;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  margin: auto;
  padding: 15px;
  color: #63639f;
  cursor: pointer;
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

<template>
  <section class="container">
    <div class="area-header">
      <div class="header-content-top">
        <div class="header-inner-content">
          <h1 class="area-title">
            {{ area.title }}
          </h1>
        </div>
      </div>

      <div class="header-background">
        <img :src="area.banner" :alt="area.altBanner" />
      </div>
      <div class="header-content-bottom">
        <div class="header-inner-content">
          <h2 class="area-subtitle">{{ area.subTitle }}</h2>
          <div class="area-description-text">
            {{ area.description }}
          </div>
        </div>
      </div>
      <div class="mobile-show">
        <space-divider></space-divider>
      </div>
    </div>

    <div class="services-container">
      <div class="inner-container">
        <div class="section-title">{{ area.title }}</div>
        <double-color-title
          :textp1="'OUR SERVICES'"
          :textp2="'SUCCESS BUSINESS'"
        ></double-color-title>
        <h3 class="section-intro-text">
          {{ area.servicesDescription }}
        </h3>

        <div class="service-grid">
          <h4 v-if="area.services.length === 0">There are no services</h4>
          <div
            v-for="(service, serviceIndex) of area.services"
            :key="'service-' + serviceIndex"
          >
            <service-mini
              :title="service.title"
              :image="service.banner"
              :path="service.id"
              :serviceIndex="serviceIndex + 1"
              :altBanner="service.altBanner"
            ></service-mini>
          </div>
        </div>
        <div class="mobile-hide">
          <space-divider />
        </div>
      </div>
    </div>

    <div class="case-studies-container">
      <div class="inner-container">
        <div class="section-title">{{ area.title }}</div>
        <double-color-title
          :textp1="'DISCOVER OUR'"
          :textp2="'CASE STUDIES'"
        ></double-color-title>
        <h3 class="section-intro-text">
          {{ area.caseStudyDescription }}
        </h3>

        <section class="casestudies-grid">
          <h4 v-if="area.casestudies === 0">There are no cases studies</h4>
          <div
            v-for="(casestudy, casestudyIndex) of area.casestudies.slice(0, 6)"
            :key="'casestudy-' + casestudyIndex"
            class="casestudy"
          >
            <case-study-mini
              :title="casestudy.title"
              :description="casestudy.subTitle"
              :image="casestudy.banner"
              :path="casestudy.id"
              :area="area.title"
              :caseIndex="casestudyIndex + 1"
            ></case-study-mini>
          </div>
        </section>
        <discover-button
          :buttonLabel="'DISCOVER ALL CASE STUDIES'"
          :path="'/casestudy'"
        ></discover-button>
        <space-divider />
      </div>
    </div>

    <div class="teams-container">
      <div class="inner-container">
        <div class="section-title">{{ area.title }}</div>
        <double-color-title
          :textp1="'MEET OUR'"
          :textp2="'PROFESSIONAL TEAM'"
        ></double-color-title>
        <h3 class="section-intro-text">
          {{ area.teamDescription }}
        </h3>

        <div class="member-grid">
          <div
            v-for="(person, personIndex) of people.slice(0, 6)"
            :key="'person-' + personIndex"
            class="person"
          >
            <member-mini
              :personName="person.personName"
              :occupation="person.occupation"
              :image="person.personPhoto"
              :index="personIndex"
              :id="person.id"
            ></member-mini>
          </div>
        </div>
        <discover-button
          :buttonLabel="'MEET THE TEAM'"
          :path="'/team'"
        ></discover-button>
      </div>
    </div>
  </section>
</template>
<script>
import ServiceMini from '~/components/service/ServiceMini.vue'
import MemberMini from '~/components/team/MemberMini.vue'
import SpaceDivider from '~/components/utils/SpaceDivider.vue'
import DoubleColorTitle from '~/components/utils/DoubleColorTitle.vue'
import DiscoverButton from '~/components/utils/DiscoverButton.vue'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import GeneralMixins from '~/mixins/general-mixins.js'
export default {
  components: {
    ServiceMini,
    SpaceDivider,
    DoubleColorTitle,
    DiscoverButton,
    CaseStudyMini,
    MemberMini,
  },
  mixins: [GeneralMixins],
  async asyncData({ error, $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area/${id}`)
    const area = data
    if (area == null) {
      return error({ statusCode: 404, message: 'Area not found!' })
    }
    const teammembers = await $axios.get(
      `${process.env.BASE_URL}/api/teammembersbyarea/${id}`
    )
    const people = teammembers.data
    return {
      area,
      people,
    }
  },
  mounted() {
    this.resizeServiceCard()
    window.addEventListener('resize', this.resizeServiceCard)
    this.resizeCaseCard()
    window.addEventListener('resize', this.resizeCaseCard)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeServiceCard)
    window.removeEventListener('resize', this.resizeCaseCard)
  },
}
</script>

<style scoped>
.container {
  max-width: 100%;
  padding-top: 0px;
  margin-top: 0px;
  padding: 0;
  margin-bottom: 0px;
}
.area-header {
  height: 916px;
  position: relative;
  overflow-x: clip;
}
.header-content-bottom {
  max-width: 1100px;
  margin: auto;
  display: block;
  text-align: left;
  padding-top: 0;
  padding-bottom: 94px;
}
.header-content-top {
  max-width: 1100px;
  margin: auto;
  display: block;
  text-align: left;
  padding-top: 124px;
  padding-bottom: 0;
}
.header-inner-content {
  max-width: 780px;
}
.area-title {
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  text-transform: uppercase;
  color: var(--cc-base1);
  margin-bottom: 46px;
  position: relative;
}
.area-subtitle {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: var(--cc-base1);
  margin-top: 2px;
  margin-bottom: 42px;
}
.area-description-text {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: left;
  color: var(--c-grey1);
  mix-blend-mode: normal;
  opacity: 0.8;
  column-count: 2;
  column-gap: 30px;
}
.header-background {
  text-align: end;
  position: absolute;
  bottom: 0;
  right: -0;
  width: 50%;
}
.header-background > img {
  width: 100%;
}
.services-container {
  padding-top: 151px;
  background: linear-gradient(
    180deg,
    #fbfbff 79.17%,
    rgba(251, 251, 255, 0) 100%
  );
}

.inner-container {
  max-width: 1110px;
  margin: auto;
}

.section-intro-text {
  margin: auto;
  margin-bottom: 54px;
  max-width: 769px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: var(--c-grey1);
  mix-blend-mode: normal;
  opacity: 0.8;
}

.section-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: var(--cc-base1);
  margin-bottom: 0;
  text-transform: uppercase;
}

.service-grid,
.casestudies-grid,
.member-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}

.teams-container {
  background: linear-gradient(
    360deg,
    #fcfcff 72.4%,
    rgba(252, 252, 255, 0) 100%
  );
  padding-bottom: 40px;
}

.person {
  margin-bottom: 20px;
}
.mobile-show {
  display: none;
}

.mobile-hide {
  display: block;
}
@media screen and (max-width: 1200px) {
  .header-background {
    bottom: 0;
  }
  .header-content-top {
    padding-top: 49px;
    margin-right: 59px;
  }
  .header-content-bottom {
    margin-right: 59px;
  }
  .area-title {
    font-size: 36px;
    line-height: 43px;
    margin-bottom: 36px;
  }
  .section-intro-text {
    margin-bottom: 27px;
    font-size: 18px;
    line-height: 22px;
  }
  .inner-container {
    max-width: 100%;
    margin-right: 92px;
    margin-left: 92px;
  }
  .service-grid,
  .casestudies-grid,
  .member-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 44px;
  }
  .service-grid {
    margin-right: 58px;
    margin-left: 58px;
  }
  .area-subtitle {
    font-size: 20px;
    line-height: 24px;
    margin-top: 0;
    margin-bottom: 42px;
  }
  .area-description-text {
    font-size: 18px;
    line-height: 22px;
    column-gap: 20px;
  }
  .case-studies-container {
    padding-top: 68px;
    background: linear-gradient(
      180deg,
      #f9f9ff 91.15%,
      rgba(251, 251, 255, 0) 100%
    );
  }
  .area-header {
    background: linear-gradient(
      180deg,
      #f9f9ff 91.15%,
      rgba(251, 251, 255, 0) 100%
    );
    padding-left: 59px;
    margin-right: 0px;
    height: 750px;
  }
  .services-container {
    padding-top: 0;
    background: #ffffff;
  }
}

@media screen and (max-width: 768px) {
  .mobile-hide {
    display: none;
  }
  .area-title {
    margin-bottom: 15px;
    font-size: 24px;
    line-height: 29px;
  }
  .area-header {
    margin: 0;
    padding-left: 35px;
    padding-right: 35px;
    text-align: center;
    height: max-content;
  }

  .header-content-top {
    text-align: center;
    margin: auto;
  }
  .header-content-bottom {
    margin: auto;
    margin-top: 30px;
    text-align: center;
    padding-bottom: 0;
  }
  .area-subtitle {
    font-size: 18px;
    line-height: 20px;
  }
  .area-description-text {
    font-size: 16px;
    line-height: 18px;
    column-gap: 20px;
    column-count: 1;
    column-gap: 0;
    text-align: center;
  }
  .header-background {
    text-align: center;
    margin: auto;
    position: relative;
    bottom: 30px;
    right: 0;
    left: 0;
    width: 85%;
    top: 0;
  }
  .inner-container {
    max-width: 100%;
    margin-right: 35px;
    margin-left: 35px;
  }
  .service-grid,
  .casestudies-grid,
  .member-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 13px;
  }

  .service-grid {
    margin-right: 0px;
    margin-left: 0px;
  }
  .mobile-show {
    display: block;
  }
  .section-title {
    font-size: 24px;
    line-height: 29px;
  }
  .section-intro-text {
    font-size: 16px;
    line-height: 18px;
  }
  .services-container {
    padding-bottom: 65px;
  }
  .mobile-show > .full-width-row {
    padding-top: 45px;
    padding-bottom: 45px;
  }
}
</style>

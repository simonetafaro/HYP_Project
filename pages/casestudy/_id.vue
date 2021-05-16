<template>
  <section class="case-container">
    <header>
      <h4 class="area-title">Area{{ casestudy.area }}</h4>
      <h1 class="title-case">{{ casestudy.title }}</h1>
      <h5 class="description">
        {{ casestudy.author }}Author's name | April 2, 2020 | 2 Comments
      </h5>
      <br />
      <div class="column">
        <div class="single-column">
          <img :src="casestudy.banner" :alt="casestudy.title" />
          <p class="description">
            {{ casestudy.descriptiveText }}
          </p>
          <br />
          <a class="partner" href="#">PARTNER WEBSITE</a>
          <br /><br /><br /><br />
          <h3>CHALLENGE</h3>
          <br />
          <h2 class="title-challenge">{{ casestudy.challengeTitle }}</h2>

          <p class="description">{{ casestudy.challengeDescription }}</p>
          <br /><br /><br />
          <h3>SOLUTION</h3>
          <br />
          <h2 class="title-challenge">{{ casestudy.solutionTitle }}</h2>
          <p class="description">{{ casestudy.solutionDescription }}</p>
        </div>
        <div class="cases-column">
          <h3>Other Case Studies</h3>
          <br />
          <div
            v-for="(casestudy, caseStudyIndex) of relCases"
            :key="'casestudy-' + caseStudyIndex"
            class="case-component"
            @click="goTo(`/casestudy/${casestudy.id}`)"
          >
            <div>
              <img :src="casestudy.banner" class="related-case-study-image" />
            </div>
            <div class="related-case-study-info">
              <h4 class="related-case-study-title">{{ casestudy.title }}</h4>
              <h5 class="related-case-study-date">April 2, 2020</h5>
            </div>
            <br />
          </div>
        </div>
      </div>

      <br />

      <!-- <h4>{{ casestudy.subTitle }}</h4> -->
    </header>
    <br /><br /><br />
    <h3 class="pre-section">TEAM WORKING ON THIS PROJECT</h3>
    <br /><br /><br /><br /><br />
    <section class="member-grid">
      <div
        v-for="(person, personIndex) of casestudy.teammembers"
        :key="'person-' + personIndex"
        class="person"
        @click="goTo(`/team/${person.id}`)"
      >
        <member-mini
          :personName="person.personName"
          :summary="person.personalQuote"
          :image="person.personPhoto"
        ></member-mini>
      </div>
    </section>
    <br /><br /><br />
    <div class="pre-section">
      <svg
        width="71"
        height="71"
        viewBox="0 0 101 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M100.705 50.2046C86.841 64.0682 64.3636 64.0682 50.5 50.2046C64.3636 36.341 86.841 36.341 100.705 50.2046ZM0.295419 50.2046C14.159 36.341 36.6364 36.341 50.5 50.2046C36.6364 64.0682 14.159 64.0682 0.295419 50.2046ZM50.5 50.2046C36.6364 36.341 36.6364 13.8636 50.5 0C64.3636 13.8636 64.3636 36.341 50.5 50.2046ZM50.5 50.2046C64.3636 64.0682 64.3636 86.5455 50.5 100.409C36.6364 86.5455 36.6364 64.0682 50.5 50.2046Z"
          fill="#E8E7FF"
        />
      </svg>
    </div>
    <br /><br /><br /><br /><br />
    <h3 class="pre-section">YOU MAY BE INTERESTED IN</h3>
    <h3 class="pre-section">OUR RELATED SERVICES</h3>
    <br /><br /><br /><br /><br />
    <section class="service-grid">
      <h4 v-if="relServices === 0">There are no related Services</h4>
      <div
        v-for="(service, serviceIndex) of relServices"
        :key="'service-' + serviceIndex"
        class="service"
      >
        <service-mini
          :title="service.title"
          :image="service.banner"
          :path="service.id"
        ></service-mini>
      </div>
    </section>
  </section>
</template>
<script>
import GoToMixins from '~/mixins/goTo-mixins.js'
import ServiceMini from '~/components/service/ServiceMini.vue'
import MemberMini from '~/components/team/MemberMini.vue'
export default {
  components: {
    ServiceMini,
    MemberMini,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/casestudy/${id}`
    )
    const casestudy = data
    let relServices = await $axios.get(
      `${process.env.BASE_URL}/api/casestudyservices/${id}`
    )
    relServices = relServices.data
    let relCases = await $axios.get(
      `${process.env.BASE_URL}/api/relatedCaseStudies/${data.areaID}/${id}`
    )

    relCases = relCases.data
    return {
      casestudy,
      relServices,
      relCases,
    }
  },
  mounted() {
    //  resize service img height
    Array.from(document.getElementsByClassName('service_img')).forEach(
      function (img) {
        img.style.height = img.width + 'px'
      }
    )
    //  check highest card
    let serviceCardMaxHeight = 0
    Array.from(document.getElementsByClassName('service_card')).forEach(
      function (card) {
        if (card.clientHeight > serviceCardMaxHeight)
          serviceCardMaxHeight = card.clientHeight
      }
    )
    //  set the same height to all the cards
    Array.from(document.getElementsByClassName('service_card')).forEach(
      function (card) {
        if (card.clientHeight < serviceCardMaxHeight)
          card.style.height = serviceCardMaxHeight + 'px'
      }
    )
    //  check highest title
    let serviceCardTitleMaxHeight = 0
    Array.from(document.getElementsByClassName('service_title')).forEach(
      function (card) {
        if (card.clientHeight > serviceCardTitleMaxHeight)
          serviceCardTitleMaxHeight = card.clientHeight
      }
    )
    //  set the same height to all the title
    Array.from(document.getElementsByClassName('service_title')).forEach(
      function (card) {
        if (card.clientHeight < serviceCardTitleMaxHeight)
          card.style.lineHeight = serviceCardTitleMaxHeight + 'px'
      }
    )
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
h4 {
  margin-bottom: 10px;
  text-align: left;
}
h1 {
  text-align: left;
}
.pre-section {
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  text-transform: uppercase;

  color: #424272;
}
.casestudy {
  cursor: pointer;
  margin-bottom: 20px;
}

.service-grid {
  max-width: 1110px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  text-align: center;
}
.description {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  /* or 145% */

  color: #464a52;

  mix-blend-mode: normal;
  opacity: 0.6;
}
img {
  align-content: left;
  width: 90%;
}
p {
  text-align: left;
  margin-top: 40px;
  width: 90%;
}
.partner {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  text-decoration-line: underline;
  text-transform: uppercase;

  color: #cdc9ff;
}
@media screen and (max-width: 600px) {
  .casestudies-grid {
    display: block;
    margin: 40px 20px;
  }
}
.member-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
  align-content: center;
  margin: auto;
}
.column {
  display: flex;
  justify-content: space-between;
}
.case-container {
  text-align: left;

  margin: 40px 13%;
}
.single-column {
  max-width: 70%;
  width: 90%;
}

.person {
  cursor: pointer;
  margin-bottom: 20px;
  align-content: center;
}
.case-component {
  display: inline-flex;
  cursor: pointer;
  padding: 10px 0;
}
.cases-column {
  max-width: 30%;
}
.title-challenge {
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  color: #63639f;
}
.title-case {
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 60px;
  color: #424272;
}
.area-title {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: #424272;
}

.related-case-study-info {
  margin: auto;
  margin-left: 20px;
}
.related-case-study-image {
  border-radius: 50%;
  width: 95px;
  height: 95px;
  object-fit: cover;
}
.related-case-study-title {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: var(--cc-base1);
}
.related-case-study-date {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: var(--cc-base1);
  mix-blend-mode: normal;
  opacity: 0.6;
}
</style>

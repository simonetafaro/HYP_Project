<template>
  <section class="container">
    <div class="service-header">
      <div class="header-content">
        <div class="header-inner-content">
          <h1 class="go-to-area-title" @click="goTo('/area/' + areaData.id)">
            {{ areaData.title }}
          </h1>
          <h2 class="service-title">
            {{ service.title }}
          </h2>
          <div class="service-image-responsive">
            <img :src="service.banner" :alt="service.altBanner" />
          </div>
          <h3 class="service-subtitle">{{ service.subTitle }}</h3>
          <div class="service-description-text">
            {{ service.description }}
          </div>
        </div>
        <div class="service-image">
          <img :src="service.banner" :alt="service.altBanner" />
        </div>
      </div>

      <div class="header-background">
        <svg
          width="1254"
          height="1036"
          viewBox="0 0 1254 1036"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1146.86 705.15C842.723 859.13 27.2295 551.169 1.14682 141.51C-24.9359 -268.15 744.401 -752.061 1115.61 -579.67C1486.83 -407.28 1451.01 551.169 1146.86 705.15Z"
            fill="#FCFCFF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M587.055 801.024H648V922.167H587.055C553.396 922.167 526.109 895.048 526.109 861.596C526.109 828.143 553.396 801.024 587.055 801.024Z"
            fill="#E8E7FF"
          />
          <path d="M891 801.024H769.109V922.167H891V801.024Z" fill="#E8E7FF" />
          <path d="M891 922.171H769.109V1044.09H891V922.171Z" fill="#F9F9FF" />
          <path
            d="M1134 801.024H1012.11V922.167H1134V801.024Z"
            fill="#F9F9FF"
          />
          <path
            d="M1012.11 801.024H891V922.167H1012.11V801.024Z"
            fill="#F9F9FF"
          />
          <path
            d="M769.11 801.024H648V922.167H769.11V801.024Z"
            fill="#E8E7FF"
          />
          <path d="M891 679.102H769.109V801.025H891V679.102Z" fill="#F2F0FF" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M891 801.024H951.555C984.998 801.024 1012.11 828.143 1012.11 861.596C1012.11 895.048 984.998 922.167 951.555 922.167H891V801.024Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M830.055 557.964C863.714 557.964 891 585.082 891 618.535V679.106H769.109V618.535C769.109 585.082 796.396 557.964 830.055 557.964Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1194.55 679.102C1228 679.102 1255.11 706.395 1255.11 740.063V801.025H1134V740.063C1134 706.395 1161.11 679.102 1194.55 679.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M951.555 679.102C984.998 679.102 1012.11 706.395 1012.11 740.063V801.025H891V740.063C891 706.395 918.111 679.102 951.555 679.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M708.555 679.102C741.998 679.102 769.11 706.395 769.11 740.063V801.025H708.555C675.111 801.025 648 773.732 648 740.063C648 706.395 675.111 679.102 708.555 679.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M769.109 801.024H891C891 834.693 863.714 861.986 830.055 861.986C796.396 861.986 769.109 834.693 769.109 801.024Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1134 740.067H1255.11C1255.11 773.736 1228 801.029 1194.55 801.029C1161.11 801.029 1134 773.736 1134 740.067Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M951.555 922.171C984.998 922.171 1012.11 949.464 1012.11 983.133C1012.11 1016.8 984.998 1044.09 951.555 1044.09H891V983.133C891 949.464 918.111 922.171 951.555 922.171Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M587.055 922.171H648V983.133C648 1016.8 620.714 1044.09 587.055 1044.09C553.396 1044.09 526.109 1016.8 526.109 983.133C526.109 949.464 553.396 922.171 587.055 922.171Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M891 1044.09H769.109C769.109 1010.42 796.396 983.131 830.055 983.131C863.714 983.131 891 1010.42 891 1044.09Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M769.11 922.168H648C648 888.931 675.111 861.987 708.555 861.987C741.998 861.987 769.11 888.931 769.11 922.168Z"
            fill="#F9F9FF"
          />
          <path
            d="M769.11 922.171H648V1044.09H769.11V922.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M891 497C891 530.668 863.714 557.962 830.055 557.962C830.055 524.294 857.341 497 891 497ZM769.109 618.924C769.109 585.255 796.396 557.962 830.055 557.962C830.055 591.63 802.769 618.924 769.109 618.924ZM830.055 557.962C796.396 557.962 769.109 530.668 769.109 497C802.769 497 830.055 524.294 830.055 557.962ZM830.055 557.962C863.714 557.962 891 585.255 891 618.924C857.341 618.924 830.055 591.63 830.055 557.962Z"
            fill="#F9F9FF"
          />
          <path
            d="M1255.11 801.024H1134V922.167H1255.11V801.024Z"
            fill="#F9F9FF"
          />
          <path
            d="M526.11 922.171H405V1044.09H526.11V922.171Z"
            fill="#F9F9FF"
          />
          <path
            d="M1255.11 922.171H1134V1044.09H1255.11V922.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1134 922.171H1194.55C1228 922.171 1255.11 949.464 1255.11 983.133C1255.11 1016.8 1228 1044.09 1194.55 1044.09C1161.11 1044.09 1134 1016.8 1134 983.133V922.171Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1134 922.171C1100.34 922.171 1073.06 895.052 1073.06 861.599C1073.06 828.147 1100.34 801.028 1134 801.028V922.171Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1134 922.167V801.024C1167.66 801.024 1194.95 828.143 1194.95 861.596C1194.95 895.048 1167.66 922.167 1134 922.167Z"
            fill="#F2F0FF"
          />
          <path
            d="M526.11 801.024H405V922.167H526.11V801.024Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1073.05 922.171H1134V1044.09H1073.05C1039.4 1044.09 1012.11 1016.8 1012.11 983.133C1012.11 949.464 1039.4 922.171 1073.05 922.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M526.109 801.024H648C648 834.693 620.714 861.986 587.055 861.986C553.396 861.986 526.109 834.693 526.109 801.024Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M891 801.024H1012.11C1012.11 834.693 984.998 861.986 951.555 861.986C918.111 861.986 891 834.693 891 801.024Z"
            fill="#F9F9FF"
          />
          <path d="M648 679.102H526.109V801.025H648V679.102Z" fill="#F9F9FF" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M648 679.103H526.109C526.109 645.866 553.396 618.923 587.055 618.923C620.714 618.923 648 645.866 648 679.103Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M647.996 557.964C647.996 591.632 620.71 618.926 587.051 618.926C587.051 585.257 614.337 557.964 647.996 557.964Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M526.109 679.103C526.109 645.866 553.396 618.923 587.055 618.923C587.055 652.159 559.769 679.103 526.109 679.103Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M617.524 792.431C599.307 781.979 587.051 762.442 587.051 740.067C587.051 717.691 599.307 698.155 617.524 687.702C635.74 698.155 647.996 717.691 647.996 740.067C647.996 762.442 635.74 781.979 617.524 792.431Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M891.004 679.102C891.004 712.77 863.718 740.063 830.059 740.063C830.059 706.395 857.345 679.102 891.004 679.102Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1012.11 801.024C1045.77 801.024 1073.05 828.318 1073.05 861.986C1039.4 861.986 1012.11 834.693 1012.11 801.024Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1255.11 922.171C1255.11 955.839 1228.17 983.133 1194.95 983.133C1194.95 949.464 1221.88 922.171 1255.11 922.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M526.105 679.102C526.105 712.77 499.169 740.063 465.941 740.063C465.941 706.395 492.878 679.102 526.105 679.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M526.109 1044.09V922.171C559.769 922.171 587.055 949.464 587.055 983.133C587.055 1016.8 559.769 1044.09 526.109 1044.09Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M405 1044.09C405 1010.42 432.286 983.131 465.945 983.131C465.945 1016.8 438.659 1044.09 405 1044.09Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M405 801.029C405 767.361 432.286 740.067 465.945 740.067C465.945 773.736 438.659 801.029 405 801.029Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M769.109 922.168C769.109 888.931 796.396 861.987 830.055 861.987C830.055 895.224 802.769 922.168 769.109 922.168Z"
            fill="white"
          />
          <path
            d="M708.942 983.131H587.051V1105.05H708.942V983.131Z"
            fill="white"
          />
          <path
            d="M769.11 922.171H648V1044.09H769.11V922.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M708.945 831.508C725.775 831.508 739.418 844.98 739.418 861.598C739.418 878.216 725.775 891.688 708.945 891.688C692.116 891.688 678.473 878.216 678.473 861.598C678.473 844.98 692.116 831.508 708.945 831.508Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M465.945 831.508C482.775 831.508 496.418 844.98 496.418 861.598C496.418 878.216 482.775 891.688 465.945 891.688C449.116 891.688 435.473 878.216 435.473 861.598C435.473 844.98 449.116 831.508 465.945 831.508Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M951.942 952.648C968.771 952.648 982.414 966.295 982.414 983.129C982.414 999.963 968.771 1013.61 951.942 1013.61C935.112 1013.61 921.469 999.963 921.469 983.129C921.469 966.295 935.112 952.648 951.942 952.648Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1073.05 952.648C1089.88 952.648 1103.53 966.295 1103.53 983.129C1103.53 999.963 1089.88 1013.61 1073.05 1013.61C1056.23 1013.61 1042.58 999.963 1042.58 983.129C1042.58 966.295 1056.23 952.648 1073.05 952.648Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M951.942 709.584C968.771 709.584 982.414 723.231 982.414 740.065C982.414 756.899 968.771 770.546 951.942 770.546C935.112 770.546 921.469 756.899 921.469 740.065C921.469 723.231 935.112 709.584 951.942 709.584Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M587.051 952.648C603.88 952.648 617.524 966.295 617.524 983.129C617.524 999.963 603.88 1013.61 587.051 1013.61C570.221 1013.61 556.578 999.963 556.578 983.129C556.578 966.295 570.221 952.648 587.051 952.648Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M830.051 770.547C846.88 770.547 860.524 784.194 860.524 801.028C860.524 817.862 846.88 831.509 830.051 831.509C813.221 831.509 799.578 817.862 799.578 801.028C799.578 784.194 813.221 770.547 830.051 770.547Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1255.11 618.923C1255.11 652.375 1228 679.494 1194.55 679.494C1194.55 646.041 1221.67 618.923 1255.11 618.923ZM1134 740.065C1134 706.612 1161.11 679.494 1194.55 679.494C1194.55 712.946 1167.44 740.065 1134 740.065ZM1194.55 679.494C1161.11 679.494 1134 652.375 1134 618.923C1167.44 618.923 1194.55 646.041 1194.55 679.494ZM1194.55 679.494C1228 679.494 1255.11 706.612 1255.11 740.065C1221.67 740.065 1194.55 712.946 1194.55 679.494Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M951.945 983.131C951.945 1016.8 924.659 1044.09 891 1044.09C891 1010.42 918.286 983.131 951.945 983.131Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M769.11 983.131C769.11 1016.8 741.998 1044.09 708.555 1044.09C708.555 1010.42 735.666 983.131 769.11 983.131ZM648 1105.05C648 1071.39 675.111 1044.09 708.555 1044.09C708.555 1077.76 681.443 1105.05 648 1105.05ZM708.555 1044.09C675.111 1044.09 648 1016.8 648 983.131C681.443 983.131 708.555 1010.42 708.555 1044.09ZM708.555 1044.09C741.998 1044.09 769.11 1071.39 769.11 1105.05C735.666 1105.05 708.555 1077.76 708.555 1044.09Z"
            fill="#F2F0FF"
          />
        </svg>
      </div>
    </div>

    <div class="solution-container">
      <div class="inner-container">
        <div class="section-title">ALL THE DETAILS</div>
        <double-color-title
          :textp1="service.title"
          :textp2="'SOLUTIONS'"
        ></double-color-title>
        <h3 class="section-intro-text">
          {{ service.serviceDescription }}
        </h3>
        <section class="solution-section">
          <div class="solution">
            <img
              :src="service.s1Logo"
              class="solution-img"
              :alt="
                'Placeholder image for our ' + service.s1Name + ' solution.'
              "
            />
            <div class="solution-name">
              {{ service.s1Name }}
            </div>
            <div class="solution-description">
              {{ service.s1Description }}
            </div>
          </div>
          <div class="solution">
            <img
              :src="service.s2Logo"
              class="solution-img"
              :alt="
                'Placeholder image for our ' + service.s2Name + ' solution.'
              "
            />
            <div class="solution-name">
              {{ service.s2Name }}
            </div>
            <div class="solution-description">
              {{ service.s2Description }}
            </div>
          </div>
          <div class="solution">
            <img
              :src="service.s3Logo"
              class="solution-img"
              :alt="
                'Placeholder image for our ' + service.s3Name + ' solution.'
              "
            />
            <div class="solution-name">
              {{ service.s3Name }}
            </div>
            <div class="solution-description">
              {{ service.s3Description }}
            </div>
          </div>
        </section>
        <space-divider />
      </div>
    </div>

    <div class="inner-container">
      <double-color-title
        :textp1="'ALLIANCES'"
        :textp2="'AND PARTNERS'"
      ></double-color-title>
      <div class="section-intro-text">
        Partner description{{ service.partnerDescription }}
      </div>
      <section class="partner-section">
        <div class="partner">
          <img :src="service.p1Logo" class="partner-img" :alt="service.altP1" />
          <div class="partner-name">
            {{ service.p1Name }}
          </div>
        </div>
        <div class="partner">
          <img :src="service.p2Logo" class="partner-img" :alt="service.altP2" />
          <div class="partner-name">
            {{ service.p2Name }}
          </div>
        </div>
        <div class="partner">
          <img :src="service.p3Logo" class="partner-img" :alt="service.altP3" />
          <div class="partner-name">
            {{ service.p3Name }}
          </div>
        </div>
      </section>
      <discover-button
        :buttonLabel="'DISCOVER MORE'"
        :path="'/about/#partners'"
      ></discover-button>
      <space-divider />
    </div>

    <div v-if="service.casestudies !== 0" class="case-study-container">
      <div class="inner-container">
        <div class="section-title">
          {{ service.title }}
        </div>
        <double-color-title
          :textp1="'DISCOVER OUR'"
          :textp2="'CASE STUDIES'"
        ></double-color-title>
        <div class="section-intro-text"></div>
        <section class="casestudies-grid">
          <h4 v-if="service.casestudies === 0">There are no cs</h4>
          <div
            v-for="(casestudy, casestudyIndex) in service.casestudies.slice(
              0,
              3
            )"
            :key="'casestudy-' + casestudyIndex"
            class="casestudy"
          >
            <case-study-mini
              :title="casestudy.title"
              :description="casestudy.subTitle"
              :image="casestudy.banner"
              :area="casestudy.area.title"
              :path="casestudy.id"
              :caseIndex="casestudyIndex + 1"
            ></case-study-mini>
          </div>
        </section>
        <space-divider />
      </div>
    </div>

    <section>
      <div class="section-title related-services-title">
        YOU MAY BE INTERESTED IN <span>OUR RELATED SERVICES </span>
      </div>
      <div class="carousel-wrapper">
        <div class="button-wrapper-prev">
          <svg
            id="carousel-arrow-prev"
            class="carousel-arrow disabled-arrow"
            @click="scrollLeft()"
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.332 45.666L4.99902 24.333L26.332 2.99999"
              stroke="#424272"
              stroke-width="7"
            />
          </svg>
        </div>
        <div class="service-list-wrapper">
          <ul
            id="relServicesCarousel"
            class="service-carousel"
            data-target="carousel"
          >
            <div
              v-for="(service, serviceIndex) of relServices"
              :key="'service-' + serviceIndex"
              class="service"
            >
              <li class="service-card" data-target="card">
                <service-mini
                  :title="service.title"
                  :image="service.banner"
                  :altBanner="service.altBanner"
                  :path="service.id"
                  :carouselCard="true"
                ></service-mini>
              </li>
            </div>
          </ul>
        </div>
        <div class="button-wrapper-next">
          <svg
            id="carousel-arrow-next"
            class="carousel-arrow"
            @click="scrollRight()"
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.332 3L42.665 24.333L21.332 45.666"
              stroke="#424272"
              stroke-width="7"
            />
          </svg>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import GeneralMixins from '~/mixins/general-mixins.js'
import CaseStudyMini from '~/components/casestudy/CaseStudyMini.vue'
import ServiceMini from '~/components/service/ServiceMini.vue'
import SpaceDivider from '~/components/utils/SpaceDivider.vue'
import DoubleColorTitle from '~/components/utils/DoubleColorTitle.vue'
import DiscoverButton from '~/components/utils/DiscoverButton.vue'
export default {
  components: {
    CaseStudyMini,
    ServiceMini,
    SpaceDivider,
    DoubleColorTitle,
    DiscoverButton,
  },
  data() {
    return {
      carousel: {},
    }
  },
  mounted() {
    this.resizeServiceCard()
    window.addEventListener('resize', this.resizeServiceCard)
    this.resizeCaseCard()
    window.addEventListener('resize', this.resizeCaseCard)
    this.fillCarouselData()
    window.addEventListener('resize', this.resetCarouselOffset)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeServiceCard)
    window.removeEventListener('resize', this.resizeCaseCard)
    window.removeEventListener('resize', this.resetCarouselOffset)
  },
  mixins: [GeneralMixins],
  async asyncData({ error, $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/service/${id}`
    )
    if (data === null) {
      return error({
        statusCode: 404,
        message: 'Service not found!',
      })
    }
    let areaData = await $axios.get(
      `${process.env.BASE_URL}/api/area/${data.areaID}`
    )
    areaData = areaData.data
    const service = data
    let relServices = await $axios.get(
      `${process.env.BASE_URL}/api/relatedServices/${data.areaID}/${id}`
    )
    relServices = relServices.data
    return {
      service,
      relServices,
      areaData,
    }
  },
  methods: {
    fillCarouselData() {
      const _this = this
      Array.from(document.querySelectorAll("[data-target='carousel']")).forEach(
        function (CurrentCarousel) {
          const carouselWidth = CurrentCarousel.offsetWidth
          const cardMarginRight = CurrentCarousel.querySelectorAll(
            "[data-target='card']"
          )[0].parentNode.style.marginRight
          const cardCount = CurrentCarousel.querySelectorAll(
            "[data-target='card']"
          ).length
          const maxX = -(cardCount - 3) * carouselWidth
          _this.carousel = {
            offset: 0,
            carouselWidth,
            cardMarginRight,
            maxX,
          }
        }
      )
    },
    scrollRight() {
      if (this.carousel.offset > this.carousel.maxX) {
        // if is the first scroll activate left arrow
        if (this.carousel.offset === 0) {
          document
            .getElementById('carousel-arrow-prev')
            .classList.remove('disabled-arrow')
        }
        this.carousel.offset -= this.carousel.carouselWidth
        document.getElementById(
          'relServicesCarousel'
        ).style.transform = `translateX(${this.carousel.offset / 3}px)`
      }
      // check if we are at the end of carousel
      if (
        this.carousel.offset <= this.carousel.maxX &&
        !document
          .getElementById('carousel-arrow-next')
          .classList.contains('disabled-arrow')
      ) {
        document
          .getElementById('carousel-arrow-next')
          .classList.add('disabled-arrow')

        document
          .getElementById('carousel-arrow-prev')
          .firstChild.classList.add('arrow-pulsation')

        setTimeout(() => {
          document
            .getElementById('carousel-arrow-prev')
            .firstChild.classList.remove('arrow-pulsation')
        }, 3000)
      }
    },

    scrollLeft() {
      if (this.carousel.offset !== 0) {
        this.carousel.offset += this.carousel.carouselWidth
        document.getElementById(
          'relServicesCarousel'
        ).style.transform = `translateX(${this.carousel.offset / 3}px)`
        if (
          document
            .getElementById('carousel-arrow-next')
            .classList.contains('disabled-arrow')
        ) {
          // reset opacity to one
          document
            .getElementById('carousel-arrow-next')
            .classList.remove('disabled-arrow')
        }
      }
      // if we are back at beginning
      if (
        this.carousel.offset === 0 &&
        !document
          .getElementById('carousel-arrow-prev')
          .classList.contains('disabled-arrow')
      ) {
        document
          .getElementById('carousel-arrow-prev')
          .classList.add('disabled-arrow')

        document
          .getElementById('carousel-arrow-next')
          .firstChild.classList.add('arrow-pulsation')

        setTimeout(() => {
          document
            .getElementById('carousel-arrow-next')
            .firstChild.classList.remove('arrow-pulsation')
        }, 3000)
      }
    },
    resetCarouselOffset() {
      this.fillCarouselData()
      this.carousel.offset = 0
      document.getElementById(
        'relServicesCarousel'
      ).style.transform = `translateX(0px)`
      document
        .getElementById('carousel-arrow-next')
        .classList.remove('disabled-arrow')
      document
        .getElementById('carousel-arrow-prev')
        .classList.remove('disabled-arrow')
      document
        .getElementById('carousel-arrow-prev')
        .classList.add('disabled-arrow')
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 100%;
  padding-top: 0px;
  margin-top: 0px;
  padding-bottom: 40px;
}
.service-header {
  height: 916px;
  overflow: hidden;
  position: relative;
}
.header-content {
  max-width: 1100px;
  margin: auto;
  display: inline-flex;
  text-align: left;
  padding-top: 124px;
  padding-bottom: 94px;
}
.header-inner-content {
  max-width: 780px;
}
.go-to-area-title {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: var(--cc-base1);
  margin-bottom: 24px;
  width: max-content;
  border-bottom: 2px solid transparent;
}
.go-to-area-title:hover {
  border-bottom: 2px solid var(--cc-base1);
  cursor: pointer;
}
.service-title {
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  text-transform: uppercase;
  color: var(--cc-base1);
  margin-bottom: 46px;
  position: relative;
}
.service-subtitle {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: var(--cc-base1);
  margin-top: 2px;
  margin-bottom: 42px;
}
.service-description-text {
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

.service-image {
  overflow: hidden;
  margin-left: 50px;
  margin-top: 50px;
  width: 100%;
}
.service-image-responsive {
  display: none;
}
.service-image > img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 30px;
}
.header-background {
  text-align: end;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
}
.solution-container {
  padding-top: 151px;
  background: linear-gradient(
    180deg,
    #fbfbff 79.17%,
    rgba(251, 251, 255, 0) 100%
  );
}

.case-study-container {
  background: linear-gradient(
    180deg,
    rgba(251, 251, 255, 0) 8.33%,
    #f9f9ff 27.6%,
    #fbfbff 81.77%,
    rgba(251, 251, 255, 0) 100%
  );
}
.inner-container {
  max-width: 1110px;
  margin: auto;
}

.partner-section,
.solution-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.partner-img,
.solution-img {
  border-radius: 50%;
  width: 162px;
  height: 162px;
  object-fit: contain;
  margin-bottom: 30px;
}
.solution-description {
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: var(--c-grey1);
  margin-top: 11px;
}
.partner-name {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  color: var(--cc-base1);
  text-transform: uppercase;
}

.solution-name {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  color: var(--cc-base1);
}

.casestudies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
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
.related-services-title {
  margin-bottom: 25px;
}

.button-wrapper-prev {
  margin-right: 15px;
}
.button-wrapper-next {
  margin-left: 15px;
}

.carousel-arrow {
  cursor: pointer;
  overflow: visible;
}

.disabled-arrow {
  opacity: 0.5;
}

.carousel-wrapper {
  max-width: max-content;
  display: flex;
  align-items: center;
  margin: auto;
}
.arrow-pulsation {
  animation: pulse-me 2s linear;
}

.service-list-wrapper {
  height: 450px;
  width: 1020px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 40px;
}

.service-carousel {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  transition: all 1s ease;
}
.service-card {
  min-width: 310px;
  display: inline-block;
}

.service {
  margin-right: 15px;
  margin-left: 15px;
}

@keyframes pulse-me {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  10% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  20% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  30% {
    transform: scale(1.3);
    opacity: 0.4;
  }

  40% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  60% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  80% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  90% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media screen and (max-width: 1200px) {
  .service-header {
    height: auto;
  }
  .header-content {
    max-width: 100%;
    text-align: center;
    padding-top: 46px;
    padding-bottom: 80px;
  }
  .header-inner-content {
    max-width: 60%;
    margin: auto;
  }
  .go-to-area-title {
    margin-right: auto;
    margin-left: auto;
    border-bottom: 2px solid var(--cc-base1);
  }
  .service-image {
    display: none;
  }

  .service-image-responsive {
    display: block;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    margin-bottom: 36px;
  }

  .service-image-responsive > img {
    width: 100%;
    height: auto;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
  }
  .service-title {
    font-size: 36px;
    line-height: 43px;
    margin-bottom: 36px;
  }
  .service-description-text {
    line-height: 24px;
    column-count: 1;
    column-gap: 0px;
    text-align: center;
  }
  .header-background {
    display: none;
  }
  .solution-container {
    padding-top: 90px;
    position: relative;
    z-index: 0;
  }
  .section-intro-text {
    font-size: 18px;
    line-height: 22px;
    max-width: 100%;
  }
  .solution-section {
    display: inline-table;
    width: 100%;
    padding-bottom: 50px;
  }
  .solution {
    display: table-cell;
    margin: auto;
    width: 50%;
  }
  .solution:first-child {
    min-width: 100%;
    display: table-caption;
    margin-bottom: 60px;
  }
  .solution-description {
    display: none;
  }
  .solution-name {
    font-size: 18px;
    line-height: 22px;
  }
  .inner-container {
    margin-right: 92px;
    margin-left: 92px;
  }
  .casestudies-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 44px;
    margin: auto;
  }
  .casestudies-grid {
    margin-right: 58px;
    margin-left: 58px;
  }
  .casestudy {
    width: 100%;
  }
  .casestudy:nth-child(2n + 1) {
    margin-left: auto;
  }
  .casestudy:nth-child(2n + 2) {
    margin-right: auto;
  }
  .button-wrapper-prev {
    margin-right: 8px;
  }
  .button-wrapper-next {
    margin-left: 8px;
  }

  .related-services-title {
    margin-right: 92px;
    margin-left: 92px;
  }
  .service-list-wrapper {
    height: 270px;
    width: 672px;
    min-width: 672px;
  }
  .service {
    margin-right: 12px;
    margin-left: 12px;
  }
  .service-card {
    min-width: 200px;
  }
  .carousel-arrow {
    width: 21px;
    height: 21px;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding-bottom: 0px;
  }
  .service-header {
    height: auto;
  }
  .header-content {
    padding-bottom: 25px;
  }
  .header-inner-content {
    max-width: 100%;
    margin-right: 52px;
    margin-left: 52px;
  }
  .go-to-area-title {
    font-size: 12px;
    line-height: 14px;
  }
  .service-image-responsive {
    margin-bottom: 25px;
  }
  .service-title {
    font-size: 24px;
    line-height: 20px;
    margin-bottom: 25px;
  }
  .service-subtitle {
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 25px;
  }
  .service-description-text {
    font-size: 16px;
    line-height: 18px;
  }
  .header-background {
    display: none;
  }
  .inner-container {
    margin-left: 35px;
    margin-right: 35px;
  }
  .solution-section {
    padding-bottom: 0px;
  }
  .solution-container {
    padding-top: 90px;
    position: relative;
    z-index: 0;
  }
  .solution-img {
    width: 58px;
    height: 58px;
    margin-bottom: 10px;
  }
  .section-intro-text {
    font-size: 16px;
    line-height: 18px;
  }
  .solution:first-child {
    margin-bottom: 25px;
  }
  .solution-name {
    font-size: 12px;
    line-height: 14px;
  }
  .casestudies-grid {
    grid-gap: 13px;
    margin: 0;
  }
  .related-services-title {
    margin-bottom: 0px;
    margin-right: 35px;
    margin-left: 35px;
  }
  .casestudy {
    width: 100%;
  }
  .partner-section {
    width: 100%;
    margin: auto;
  }
  .partner-img {
    width: 58px;
    height: 58px;
    margin-bottom: 0px;
  }
  .partner-name {
    display: none;
  }

  .button-wrapper-prev,
  .button-wrapper-next {
    display: none;
  }
  .service-carousel {
    overflow: scroll;
    padding: 25px 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .service-carousel::-webkit-scrollbar {
    display: none;
  }

  .service-list-wrapper {
    height: 300px;
    width: 100%;
    min-width: 100%;
  }
  .service {
    margin-right: 5px;
    margin-left: 5px;
  }
  .service:first-child {
    margin-left: 20px !important;
  }
  .service:last-child {
    margin-right: 20px !important;
  }
  .service-card {
    min-width: 220px;
  }
  .carousel-arrow {
    width: 0;
    height: 0;
  }
  .carousel-wrapper {
    width: 100%;
    max-width: 100%;
  }
}
</style>

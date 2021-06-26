<template>
  <div class="casestudy-mini">
    <div
      :class="
        caseIndex % 2 === 0
          ? 'case-right casestudycontainer'
          : 'case-left casestudycontainer'
      "
      @click="clickOnCardOnlyTabletAndMobile(path)"
      :style="{
        'background-image': `url(${image})`,
      }"
    >
      <div class="casestudycontent">
        <p class="referenceArea">{{ area }}</p>
        <div class="case-info">
          <h2 class="casestudytitle" v-on:click="goTo('/casestudy/' + path)">
            {{ title }}
          </h2>
          <p class="casestudydescription">{{ description }}</p>
        </div>

        <button class="case-button" v-on:click="goTo('/casestudy/' + path)">
          FIND OUT MORE >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralMixins from '~/mixins/general-mixins.js'

export default {
  mixins: [GeneralMixins],
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
    area: { type: String, default: () => '' },
    path: { type: Number, default: () => 0 },
    caseIndex: { type: Number, default: () => 0 },
  },
  methods: {
    clickOnCardOnlyTabletAndMobile(path) {
      if (window.innerWidth < 1200) {
        return this.goTo('/casestudy/' + path)
      }
    },
  },
}
</script>

<style scoped>
.casestudycontainer {
  position: relative;
  border: 2px solid #cdc9ff; /* manca il colore nella palette*/
  border-radius: 30px;
  text-align: left;
  max-width: 350px;
  margin: auto;
  height: 350px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.casestudycontent {
  text-align: left;
  position: absolute;
  background: #ffffff;
  height: 75%;
  bottom: 0;
  width: 100%;
  border-radius: 0 0 27px 27px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 15px 0 #dedede;
  padding: 25px;
  opacity: 0.87;
}
.casestudytitle {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: var(--cc-base1);
  padding-bottom: 11px;
  cursor: pointer;
}

.referenceArea {
  padding-bottom: 6px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: var(--c-grey2);
}

.casestudydescription {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: var(--c-grey2);
}

.case-button {
  position: absolute;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: var(--cc-base1);
  bottom: 20px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  padding-left: 0;
}
.case-button:hover {
  text-decoration: underline;
}
.case-info {
  max-height: 68%;
  overflow: hidden;
}

@media screen and (max-width: 1200px) {
  .casestudycontainer {
    max-width: 350px;
  }
  .case-button {
    display: none;
  }
  .case-info {
    max-height: 80%;
  }
  .case-left {
    margin-right: 12px;
  }
  .case-right {
    margin-left: 12px;
  }
}
@media screen and (max-width: 768px) {
  .casestudycontainer {
    max-width: 270px;
  }
  .case-button {
    display: none;
  }
  .referenceArea {
    font-size: 10px;
    line-height: 14px;
    padding: 0;
    display: none;
  }
  .casestudytitle {
    font-size: 14px;
    line-height: 17px;
  }
  .casestudycontent {
    padding: 13px;
  }
  .casestudydescription {
    font-size: 12px;
    line-height: 14px;
    display: none;
  }
  .case-info {
    max-height: 88%;
  }
  .case-left {
    margin-right: 0px;
  }
  .case-right {
    margin-left: 0px;
  }
}
</style>

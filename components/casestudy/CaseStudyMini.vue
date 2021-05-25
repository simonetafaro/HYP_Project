<template>
  <div class="casestudy-mini">
    <div
      class="casestudycontainer"
      v-on:click="goTo('/casestudy/' + path)"
      :style="{
        'background-image': `url(${image})`,
      }"
    >
      <div class="casestudycontent">
        <p class="referenceArea">{{ area }}</p>
        <div class="case-info">
          <p class="casestudytitle">{{ title }}</p>
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
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  mixins: [GoToMixins],
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
    area: { type: String, default: () => '' },
    path: { type: Number, default: () => 0 },
  },
}
</script>

<style scoped>
.casestudycontainer {
  position: relative;
  border: 2px solid #cdc9ff; /* manca il colore nella palette*/
  border-radius: 30px;
  width: 100%;
  min-height: 350px;
  text-align: left;
  width: 350px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.casestudycontent {
  text-align: left;
  position: absolute;
  background: #ffffff;
  height: 75%;
  bottom: 0;
  width: 100%;
  border-radius: 27px;
  padding: 30px;
  opacity: 0.87;
}
.casestudytitle {
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: var(--cc-base1);
  padding-bottom: 11px;
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
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: var(--cc-base1);
  bottom: 30px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
}
.case-button:hover {
  text-decoration: underline;
}
.case-info {
  max-height: 68%;
  overflow: hidden;
}

@media screen and (max-width: 1200px) {
  .case-button {
    display: none;
  }
  .case-info {
    max-height: 80%;
  }
}
@media screen and (max-width: 768px) {
  .casestudycontainer {
    width: 80%;

    cursor: pointer;
  }
  .case-button {
    display: none;
  }
  .referenceArea {
    font-size: 10px;
    line-height: 14px;
    padding: 0;
  }
  .casestudytitle {
    font-size: 14px;
    line-height: 17px;
    padding: 0;
  }
  .casestudycontent {
    padding: 13px;
  }
  .casestudydescription {
    display: none;
  }
  .case-info {
    max-height: 83%;
  }
}
</style>

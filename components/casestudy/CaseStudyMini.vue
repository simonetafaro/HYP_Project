<template>
  <div class="casestudy-mini">
    <div
      class="casestudycontainer"
      :style="{
        'background-image': `url(${image})`,
      }"
    >
      <div class="casestudycontent">
        <p class="referenceArea">Area{{ area }}</p>
        <p class="casestudytitle">{{ title }}</p>
        <p class="casestudydescription">{{ description }}</p>
        <button class="case-button" @:click="goTo('/casestudy/' + path)">
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
  height: 550px;
  border: 1px solid #979797; /* manca il colore nella palette*/
  border-radius: 30px;
  width: 100%;
  text-align: left;
  max-width: 600px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.casestudycontent {
  text-align: left;
  position: absolute;
  background: #ffffff;
  height: 400px;
  bottom: 0;
  width: 100%;
  border-radius: 29px;
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
  color: white;
  background-color: #4d41c9;
  border-radius: 29px;
}
</style>

<template>
  <div class="full-width-row title">
    {{ textp1 }} <br /><span class="title-color">{{ textp2 }}</span>
  </div>
</template>

<script>
export default {
  props: {
    textp1: { type: String, default: () => '' },
    textp2: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.full-width-row {
  width: 100%;
  padding-top: 44px;
  padding-bottom: 44px;
  display: block;
}

.title {
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 84px;
  text-align: center;
  text-transform: uppercase;
  color: var(--cc-base1);
}

.title-color {
  color: var(--cc-red);
}
@media screen and (max-width: 1200px) {
  .title {
    font-size: 36px;
    line-height: 43px;
  }
}
@media screen and (max-width: 768px) {
  .full-width-row {
    padding-top: 27px;
    padding-bottom: 27px;
  }
  .title {
    font-size: 18px;
    line-height: 22px;
  }
}
</style>

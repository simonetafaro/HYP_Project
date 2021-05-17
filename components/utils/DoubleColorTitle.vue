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
/** width: 100%;
  padding-top: 44px;
  padding-bottom: 44px;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  text-transform: uppercase;
  display: block;
  color: var(--cc-base1); */
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
</style>

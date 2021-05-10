<template>
  <div class="casestudy-mini">
    <div
      class="casestudycontainer"
      :style="{
        'background-image': `url(${image})`,
      }"
    >
      <div class="casestudycontent">
        <div class="referenceArea">{{ area }}</div>
        <p class="casestudytitle">{{ title }}</p>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
    area: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.casestudycontainer {
  position: relative;
  height: 350px;
  border: 1px solid #979797;
  border-radius: 30px;
  width: 100%;
  background-repeat: no-repeat;
}

.casestudycontent {
  position: absolute;
  background: #ffffff;
  height: 260px;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 29px;
  padding: 30px;
}
p.casestudytitle {
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  padding-bottom: 5px;
}
p {
  height: 60px;
  margin: 5px;
}
.referenceArea {
  margin-block: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  padding: 5px;
  text-align: left;
  color: #979797;
}

.img {
  width: 100%;
  height: 200px;
  max-width: 600px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 40px;
}
</style>

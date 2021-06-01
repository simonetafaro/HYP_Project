<template>
  <div class="error-external-container">
    <div class="error-container">
      <div class="error-left-side">
        <img src="https://i.ibb.co/X8SRRXp/404.png" />
      </div>
      <div class="error-right-side">
        <h1 class="error-title">Sorry!</h1>
        <h2 class="error-subtitle">
          Either you aren't cool enought to visit this page or it doesn't
          exists....
          <span class="error-subtitle-text">like your social life.</span>
        </h2>
        <h3 class="error-message">P.S. {{ error.message }}</h3>
        <button @click="goTo('/home')" class="more_button">
          You can go now!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'
export default {
  props: ['error'],
  mixins: [GoToMixins],
}
</script>

<style>
.error-external-container {
  max-width: 1110px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
.error-container {
  display: inline-flex;
  max-width: 100%;
}
.error-left-side,
.error-right-side {
  width: 50%;
}
.error-left-side > img {
  width: 100%;
}
.error-right-side {
  padding-top: 150px;
  padding-left: 35px;
}
.error-title {
  font-size: 52px;
  font-family: cursive;
  margin-bottom: 16px;
}
.error-subtitle {
  font-size: 24px;
  margin-bottom: 16px;
}
.error-subtitle-text {
  color: red;
}
.error-message {
  font-size: 12px;
  margin-bottom: 8px;
}

@media screen and (max-width: 1200px) {
  .error-external-container {
    max-width: 100%;
    margin-right: 52px;
    margin-left: 52px;
  }
  .error-right-side {
    padding-top: 50px;
    padding-left: 25px;
  }
}
@media screen and (max-width: 768px) {
  .error-external-container {
    margin-right: 35px;
    margin-left: 35px;
  }
  .error-container {
    display: block;
  }
  .error-left-side,
  .error-right-side {
    width: 100%;
  }
  .error-right-side {
    text-align: center;
  }
  .error-title {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .error-subtitle {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .error-message {
    font-size: 8px;
    margin-bottom: 8px;
  }
}
</style>

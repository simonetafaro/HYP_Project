<template>
  <div class="full-width-row">
    <svg
      width="101"
      height="101"
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
</template>

<script>
export default {}
</script>

<style scoped>
.full-width-row {
  width: 100%;
  padding-top: 149px;
  padding-bottom: 141px;
}

@media screen and (max-width: 1200px) {
  .full-width-row {
    padding-top: 55px;
    padding-bottom: 33px;
  }
  svg {
    width: 50px;
    height: 50px;
  }
}

@media screen and (max-width: 768px) {
  .full-width-row {
    padding-top: 56px;
  }
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>

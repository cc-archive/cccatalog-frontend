<template>
  <div class="collection-logos">
    <div class="scroll-left" />
  </div>
</template>

<script>
export default {
  name: 'collection-logos-section',
};
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/_all.sass";

.collection-logos {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding-top: 4rem;
}
.collection-logos:after {
  content: '';
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}

.scroll-left {
  will-change: transform;
  animation: scroll-left 80s linear infinite;
  background-image: url("../assets/collection-logos.png");
  background-repeat: repeat-x;
  height: 260px;
  width: 3000px;
  margin-bottom: -3rem;

  @include mobile {
    width: 1000px;
    background-size: 90%;
  }
}

@keyframes scroll-left {
  0% {
    transform: translateX(0px);
  }
  100% {
      transform: translateX(-50%);
  }
}
</style>

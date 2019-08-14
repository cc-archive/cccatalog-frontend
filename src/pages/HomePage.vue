<template>
<div class="home-page">
  <!-- Also contains <header-section> -->
  <hero-section></hero-section>

  <footer-section></footer-section>
</div>
</template>

<script>
import HeroSection from '@/components/HeroSection';
import FooterSection from '@/components/FooterSection';

const HomePage = {
  name: 'home-page',
  components: {
    HeroSection,
    FooterSection,
  },
};

export default HomePage;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;

  height: 100%;

  .header,
  .footer {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .hero {
    flex-grow: 1;
    flex-shrink: 0;
  }
}
</style>

<i18n src="../locales/pages/HomePage.json">
</i18n>

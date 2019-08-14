<template>
  <Footer>
    <div class="panel">
      <div>
        <Heading :level="6">{{ $t('panel.credits' )}}</Heading>
        <i18n path="panel.iconsby" tag="span">
          <a href="https://creativecommons.org/website-icons">
            {{ $t('panel.thenounproject') }}</a>
          <a href="https://fontawesome.com/">
            {{ $t('panel.fontawesome') }}</a>
        </i18n>
        <br/>
        <i18n path="panel.websiteby" tag="span">
          <a href="https://creativecommons.org/">
            {{ $t('panel.creativecommons') }}</a>
        </i18n>
        <br/>
        <i18n path="panel.poweredby" tag="span">
          <a href="https://creativecommons.github.io/cc-vocabulary">
            {{ $t('panel.vocabulary') }}</a>
        </i18n>
      </div>
      <Locale/>
    </div>
  </Footer>
</template>

<script>
import {
  BrandImagery,
  Footer,
  Heading,
  Locale,
} from '@creativecommons/vocabulary';

export default {
  name: 'footer-section',
  components: {
    BrandImagery,
    Footer,
    Heading,
    Locale,
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .vocab.footer {
    .panel {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      height: 100%;
    }
  }
</style>

<i18n src="../locales/components/FooterSection.json">
</i18n>

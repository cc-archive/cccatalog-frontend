<template>
  <div class="reuse-survey">
    <header>
      <h3>{{ $t('how') }}</h3>
    </header>

    <span>Let us know how you use this image in</span>
    <a :href="formLink">
      this quick survey
    </a>.
  </div>
</template>

<script>
export default {
  name: 'reuse-survey',
  data: () => ({
    // for SSR, initiates it as an empty value
    location: '',
  }),
  computed: {
    formLink() {
      const location = this.location;
      return `https://docs.google.com/forms/d/e/1FAIpQLSeSApxNMup8Ujt-8Vjv53ngltzhJeaHspMykHCD8VKQ39yXAA/viewform?usp=pp_url&entry.1690035721=${location}`;
    },
  },
  mounted() {
    // for SSR, sets the value with window.location, which is only available on client
    this.location = window.location.href;
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .reuse-survey {
    margin-bottom: $space-normal;

    a {
      color: $color-blue-dark;

      &:hover {
        color: $color-blue-darker;
      }
    }
  }
</style>

<i18n src="../locales/components/ReuseSurvey.json">
</i18n>

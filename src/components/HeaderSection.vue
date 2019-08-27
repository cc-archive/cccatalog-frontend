<template>
  <div>
    <Header color="blue"
            shade="dark"
            :title="$t('search')">
      <!-- Remove this template to revert to the i18n-compatible site title -->
      <template #branding>
        <img class="logo"
             :alt="`CC ${$t('search')}`"
             :title="`CC ${$t('search')}`"
             src="../assets/cc-search-logo-white.png">
      </template>

      <nav-section :showNavSearch="showNavSearch"/>
    </Header>
    <!-- @slot Content goes here -->
    <slot/>
  </div>
</template>

<script>
import {
  Header,
} from '@creativecommons/vocabulary';

import NavSection from '@/components/NavSection';

export default {
  name: 'header-section',
  components: {
    Header,

    NavSection,
  },
  props: {
    showNavSearch: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .logo {
    height: 2rem;
  }
</style>

<i18n src="../locales/components/HeaderSection.json">
</i18n>

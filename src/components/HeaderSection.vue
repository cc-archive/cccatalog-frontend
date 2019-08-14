<template>
  <div>
    <Header color="blue"
            shade="dark"
            :title="$t('search')">
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

<i18n src="../locales/components/HeaderSection.json">
</i18n>

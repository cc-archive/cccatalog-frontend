<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@creativecommons/vocabulary/root.css';
import '@creativecommons/vocabulary/vocabulary.css';

import { FETCH_IMAGE_PROVIDERS } from '@/store/action-types';

export default {
  name: 'App',
  methods: {
    fetchProviders() {
      return this.$store.dispatch(FETCH_IMAGE_PROVIDERS);
    },
  },
  beforeMount() {
    if (!this.$store.state.imageProviders || !this.$store.state.imageProviders.length) {
      this.fetchProviders();
    }
  },
  serverPrefetch() {
    return this.fetchProviders();
  },
};
</script>

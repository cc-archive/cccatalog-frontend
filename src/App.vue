<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueHead from 'vue-head';
import openSearchDescription from '@/xml/open_search_description.xml';

Vue.use(VueHead);

export default {
  name: 'App',
  head: {
    link: [
      {
        rel: 'search',
        type: 'application/opensearchdescription+xml',
        href: openSearchDescription,
      },
    ],
  },
};
</script>

<style lang="scss">
@import './styles/app';

body {
  margin: 0;
}

#app {
  font-family: source sans pro,sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

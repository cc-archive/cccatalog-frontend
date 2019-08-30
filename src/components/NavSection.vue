<template>
  <div class="header-content">
    <Navigation is-inverted>
      <NavigationLink link="/about">{{ $t('links.about') }}</NavigationLink>
      <NavigationLink link="/collections">{{ $t('links.browse') }}</NavigationLink>
      <NavigationLink link="/search-help">{{ $t('links.guide' )}}</NavigationLink>
      <NavigationLink link="/feedback">{{ $t('links.feedback') }}</NavigationLink>
    </Navigation>
    <form v-if="showNavSearch"
          class="navform"
          role="search"
          method="post"
          @submit.prevent="onSubmit">
      <InputField v-model.lazy="form.searchTerm"
                  class="query-field"
                  color="blue"
                  shade="dark"
                  join-side="right"
                  is-ghost
                  is-infused
                  type="search"
                  :placeholder="$t('search.placeholder')"/>
      <Button class="submit-button"
              color="blue"
              icon="search"/>
    </form>
  </div>
</template>

<script>
import {
  Button,
  InputField,
  Navigation,
  NavigationLink,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { SET_QUERY } from '@/store/mutation-types';

library.add(faSearch);

export default {
  name: 'nav-section',
  components: {
    Button,
    InputField,
    Navigation,
    NavigationLink,
  },
  props: {
    showNavSearch: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: {
      searchTerm: '',
    },
  }),
  methods: {
    onSubmit() {
      this.$store.commit(SET_QUERY, { query: { q: this.form.searchTerm }, shouldNavigate: true });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .header-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    align-items: center;

    .navform {
      display: flex;
      flex-direction: row;
      align-items: center;

      .query-field {
        width: 15em;
      }
    }

    @media (max-width: 899px) {
      justify-content: center;

      .navform {
        margin-top: $space-normal;
      }

      .navigation {
        width: 100%;
        margin-top: $space-normal;
      }
    };
  }
</style>

<i18n src="../locales/components/NavSection.json">
</i18n>

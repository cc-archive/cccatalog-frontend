<template>
  <div class="header-form">
    <Container>
      <form class="form"
            role="search"
            method="post"
            @submit.prevent="onSubmit">
        <InputField v-model="searchTermsModel"
                    class="query-field"
                    color="blue"
                    size="large"
                    type="text"
                    :placeholder="searchBoxPlaceholder"
                    is-ghost
                    autofocus="autofocus"
                    autocapitalize="none"
                    @keyup.enter="onSubmit"/>
        <Button class="search-button"
                type="submit"
                color="blue"
                size="large"
                icon="search"
                is-ghost
                title="Search"
                @click="onSubmit"/>
        <Button class="filter-button"
                type="button"
                color="blue"
                size="large"
                icon="filter"
                title="Filter"
                :is-ghost="!isFilterApplied"
                @click="onToggleSearchGridFilter">
        </Button>
      </form>
      <search-grid-filter :showProvidersFilter="showProvidersFilter"
                          @onSearchFilterChanged="onSearchFilterChanged"/>
    </Container>
  </div>
</template>

<script>
import {
  Button,
  Container,
  InputField,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import SearchGridFilter from '@/components/SearchGridFilter';

import { SET_FILTER_IS_VISIBLE } from '@/store/mutation-types';

library.add(faFilter);

export default {
  name: 'search-grid-form',
  props: {
    showProvidersFilter: {
      type: Boolean,
      default: false,
    },
    searchBoxPlaceholder: {
      type: String,
      default: 'Search all images',
    },
  },
  data: () => ({ searchTermsModel: null }),
  components: {
    Button,
    Container,
    InputField,

    SearchGridFilter,
  },
  computed: {
    searchTerms() {
      return this.$store.state.query.q;
    },
    isFilterVisible() {
      return this.$store.state.isFilterVisible;
    },
    isFilterApplied() {
      return this.$store.state.isFilterApplied;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.searchTermsModel) {
        this.$emit('onSearchFormSubmit', { query: { q: this.searchTermsModel }, shouldNavigate: true });
      }
    },
    onToggleSearchGridFilter() {
      this.$store.commit(
        SET_FILTER_IS_VISIBLE,
        { isFilterVisible: !this.isFilterVisible },
      );
    },
    onSearchFilterChanged(query) {
      this.$emit('onSearchFormSubmit', query);
    },
    addScrollEvent() {
      this.removeScrollEvent = this.removeScrollEvent.bind(this);
      window.addEventListener('scroll', this.removeScrollEvent);
    },
    removeScrollEvent() {
      this.$store.commit(SET_FILTER_IS_VISIBLE, { isFilterVisible: false });
      window.removeEventListener('scroll', this.removeScrollEvent);
    },
    setFormInput() {
      this.searchTermsModel = this.searchTerms;
    },
  },
  watch: {
    isFilterVisible: function handler(isFilterVisible) {
      if (isFilterVisible) this.addScrollEvent();
    },
    searchTerms: function handler() {
      this.setFormInput();
    },
  },
  mounted: function handler() {
    this.setFormInput();
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .header-form {
    .form {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .query-field {
        flex-grow: 1;
        flex-shrink: 0;

        width: unset;

        margin-left: -#{$space-normal};
      }

      .search-button,
      .filter-button {
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }
</style>

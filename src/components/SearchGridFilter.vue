<template>
  <div class="search-filters" :class="searchFiltersClasses">
    <div class="filter-group">
      <div class="filter-option search-filters_license-types">
        <multiselect
          v-model="filter.lt"
          @input="onUpdateFilter"
          :disabled="filter.li.length > 0"
          tag-placeholder="Add this as new tag"
          placeholder="I want something that I can"
          label="name"
          track-by="code"
          :options="licenseTypes"
          :multiple="true"
          :searchable="false"
          :closeOnSelect="false"
          :showLabels="false">
        </multiselect>
      </div>
      <div class="filter-option search-filters_licenses">
        <multiselect
          v-model="filter.li"
          @input="onUpdateFilter"
          :disabled="filter.lt.length > 0"
          tag-placeholder="Add this as new tag"
          placeholder="All Licenses"
          label="name"
          track-by="code"
          :options="licenses"
          :multiple="true"
          :searchable="false"
          :closeOnSelect="false"
          :showLabels="false">
        </multiselect>
      </div>
      <div v-if="showProvidersFilter" class="filter-option search-filters_providers">
        <multiselect
          v-model="filter.provider"
          @input="onUpdateFilter"
          tag-placeholder="Add this as new tag"
          placeholder="All Providers"
          label="name"
          track-by="code"
          :options="providers"
          :multiple="true"
          :searchable="true"
          :closeOnSelect="false"
          :showLabels="false">
        </multiselect>
      </div>
    </div>
    <div class="filter-group">
      <div class="filter-option search-filters_search-by">
        <SwitchField :value="this.filter.searchBy.includes('creator')"
                     :key="this.filter.searchBy.includes('creator')"
                     id="creator-chk"
                     color="blue"
                     shade="dark"
                     size="small"
                     @click.native="toggleSearchByCreator"/>
        <label for="creator-chk">Search by creator</label>
      </div>
      <div class="filter-option search-filters_clear"
           v-if="isFilterApplied">
        <Button icon="times"
                is-ghost
                indication="negative"
                @click="onClearFilters">
          Clear filters
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  SwitchField,
} from '@creativecommons/vocabulary';

import Multiselect from 'vue-multiselect';

export default {
  name: 'search-grid-filter',
  props: ['showProvidersFilter'],
  components: {
    Button,
    SwitchField,

    Multiselect,
  },
  mounted() {
    this.parseQueryFilters();
  },
  computed: {
    searchFiltersClasses() {
      return [
        {
          'search-filters__visible': this.isFilterVisible,
        },
      ];
    },
    isFilterApplied() {
      return this.$store.state.isFilterApplied;
    },
    isFilterVisible() {
      return this.$store.state.isFilterVisible;
    },
    query() {
      return this.$store.state.query;
    },
    providers() {
      const providers = this.$store.state.imageProviders.map(provider => ({
        code: provider.provider_name,
        name: provider.display_name,
      }));

      return providers;
    },
  },
  methods: {
    parseQueryFilters() {
      const filterLookup = {
        provider: 'providers',
        li: 'licenses',
        lt: 'licenseTypes',
      };

      if (this.query) {
        Object.keys(filterLookup).forEach((key) => {
          if (this.query[key]) {
            const codes = this.query[key].split(',');
            if (codes.length) {
              codes.forEach((code) => {
                const filter = this[filterLookup[key]]
                  .find(filterItem => filterItem.code === code);
                if (filter) {
                  this.filter[key].push(filter);
                }
              });
            }
          }
        });
        if (this.query.searchBy) {
          // searchBy query string term can be "creator" for example
          const searchByKey = this.query.searchBy;
          this.filter.searchBy.push(searchByKey);
        }
      }
    },
    transformFilterValue(filter, key) {
      if (key === 'searchBy') {
        return filter[key].join(',');
      }
      if (Array.isArray(filter[key])) {
        return filter[key].map(filterItem => filterItem.code)
          .join(',');
      }
      return null;
    },
    onUpdateFilter() {
      const filter = Object.assign({}, this.filter);
      Object.keys(this.filter).forEach((key) => {
        filter[key] = this.transformFilterValue(filter, key);
      });
      this.$emit('onSearchFilterChanged', { query: filter, shouldNavigate: true });
    },
    toggleSearchByCreator() {
      if (!this.filter.searchBy.includes('creator')) {
        this.filter.searchBy.push('creator');
      }
      else {
        this.filter.searchBy = this.filter.searchBy.filter(val => val !== 'creator');
      }
      this.onUpdateFilter();
    },
    onClearFilters() {
      Object.keys(this.filter).forEach((key) => {
        this.filter[key] = [];
      });
      this.onUpdateFilter();
    },
  },
  data: () => ({
    licenses: [
      { code: 'cc0', name: 'CC0' },
      { code: 'pdm', name: 'Public Domain Mark' },
      { code: 'by', name: 'BY' },
      { code: 'by-sa', name: 'BY-SA' },
      { code: 'by-nc', name: 'BY-NC' },
      { code: 'by-nd', name: 'BY-ND' },
      { code: 'by-nc-sa', name: 'BY-NC-SA' },
      { code: 'by-nc-nd', name: 'BY-NC-ND' },
    ],
    licenseTypes: [
      { code: 'commercial', name: 'Use for commercial purposes' },
      { code: 'modification', name: 'Modify or adapt' },
    ],
    filter: {
      provider: [],
      li: [],
      lt: [],
      searchBy: [],
    },
    isSearchByCreator: false,
  }),
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .search-filters {
    display: none;

    width: 100%;
    margin-bottom: $space-normal;

    .filter-group {
      display: flex;
      flex-wrap: wrap;

      @media (max-width: 900px) {
        flex-direction: row;
      }

      @media (max-width: 899px) {
        flex-direction: column;
      }

      .filter-option {
        flex-grow: 1;
        flex-shrink: 0;

        margin: $space-normal $space-normal $space-zero;

        min-width: 15em;
        min-height: 2.5em;

        &.search-filters_search-by {
          display: flex;
          flex-direction: row;
          align-items: center;

          .switch-field {
            margin-right: $space-normal;
          }
        }

        &.search-filters_clear {
          text-align: right;
        }
      }
    }

    &__visible {
      border-top: 1px solid #e8e8e8;
      display: block;
    }
  }
</style>

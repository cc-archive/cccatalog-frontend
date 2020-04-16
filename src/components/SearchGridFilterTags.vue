<template>
    <div class="level columns margin-top-small">
      <div class="column">
        <b class="margin-right-small">Filter by</b>
        <span
        v-for="(filter,index) in appliedFilters"
        :key="index">
            <button class="button tag margin-right-small"
            v-on:click.prevent="onTagClicked(filter.code , filter.type)">
                <!-- #10005 is the utf-8 unicode for `x` mark -->
                {{ filter.name }}&nbsp; &#10005;
            </button>
        </span>

        <button class="button tag" v-on:click.prevent="onClearFilters">Clear filters</button>
      </div>
    </div>
</template>
<script>
import { TOGGLE_FILTER } from '@/store/action-types';
import { CLEAR_FILTERS } from '@/store/mutation-types';

export default {
  name: 'search-grid-filter-tags',
  computed: {
    appliedFilters() {
      const appliedFilters = [];
      const filters = this.$store.state.filters;
      Object.keys(filters).forEach((key) => {
        if (filters[key].creator === undefined) {
          filters[key].forEach((element) => {
            if (element.checked) {
              // eslint-disable-next-line no-param-reassign
              element.type = key;
              appliedFilters.push(element);
            }
          });
        }
        else {
          // eslint-disable-next-line no-lonely-if
          if (filters[key].creator) {
            appliedFilters.push({ name: 'Search by Creator', type: 'searchBy' });
          }
        }
      });
      return appliedFilters;
    },
  },
  methods: {
    onTagClicked(code, filterType) {
      this.$store.dispatch(TOGGLE_FILTER, {
        code,
        filterType,
        shouldNavigate: true,
      });
    },
    onClearFilters() {
      this.$store.commit(CLEAR_FILTERS, {
        shouldNavigate: true,
      });
    },
  },
};
</script>

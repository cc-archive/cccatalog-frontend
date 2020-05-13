<template>
<div>
  <h4 class="padding-top-big padding-left-big padding-right-normal is-inline-block">
    Filter results by
  </h4>

  <button type="button"
          class="button is-text tiny is-paddingless margin-top-big
                  margin-right-small report is-shadowless is-pulled-right"
          @click="onToggleSearchGridFilter()">
    <span class="has-color-tomato is-hidden-touch">Hide filters</span>
    <span class="margin-right-normal is-size-5 is-hidden-desktop">
      <i class="icon cross" />
    </span>
  </button>
  <form class="filters-form" role="filter">
    <filter-check-list :options="filters.licenseTypes"
                      :disabled="licenseTypesDisabled"
                      title="Use"
                      filterType="licenseTypes"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.licenses"
                      :disabled="licensesDisabled"
                      title="Licenses"
                      filterType="licenses"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list v-if="renderProvidersFilter"
                      :options="filters.providers"
                      title="Collections"
                      filterType="providers"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.categories"
                      title="Image Type"
                      filterType="categories"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.extensions"
                      title="File Type"
                      filterType="extensions"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.aspectRatios"
                      title="Aspect Ratio"
                      filterType="aspectRatios"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.sizes"
                      title="Image Size"
                      filterType="sizes"
                      @filterChanged="onUpdateFilter" />

    <div class="filters padding-vertical-big padding-left-big padding-right-normal">
      <input type="checkbox" id="creator-chk"
              :checked="filters.searchBy.creator"
              @change="onUpdateSearchByCreator">
      <label for="creator-chk">Search by Creator</label>
    </div>
    <div class="filters padding-vertical-big padding-left-big padding-right-normal">
      <input type="checkbox" id="mature"
             :checked="filters.mature"
             @change="onUpdateShowMatureContent">
      <label for="mature">Show Mature Content</label>
      <i class="icon flag has-text-grey-light margin-left-small"/>
    </div>
  </form>

  <div class="margin-big padding-bottom-normal clear-filters is-hidden-touch"
        v-if="isFilterApplied">
    <button class="button tiny"
            @click="onClearFilters">
      Clear filters
    </button>
  </div>

  <div v-if="isFilterApplied"
       class="has-background-white padding-big is-hidden-desktop has-text-centered">
    <button class="button tiny margin-right-normal" @click="onClearFilters">
      Clear filters
    </button>
    <button class="button is-primary tiny"
            @click="onToggleSearchGridFilter()">
      Show results
    </button>
  </div>
</div>
</template>

<script>
import FilterCheckList from './FilterChecklist';

export default {
  name: 'filters-list',
  props: ['filters', 'isFilterApplied', 'licenseTypesDisabled', 'licensesDisabled', 'renderProvidersFilter'],
  components: {
    FilterCheckList,
  },
  methods: {
    onUpdateFilter({ code, filterType }) {
      this.$emit('onUpdateFilter', { code, filterType });
    },
    onUpdateSearchByCreator() {
      this.$emit('onUpdateSearchByCreator');
    },
    onUpdateShowMatureContent() {
      this.$emit('onUpdateShowMatureContent');
    },
    onToggleSearchGridFilter() {
      this.$emit('onToggleSearchGridFilter');
    },
    onClearFilters() {
      this.$emit('onClearFilters');
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  border-bottom: 2px solid rgb(245, 245, 245);
}

</style>

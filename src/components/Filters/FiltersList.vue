<template>
<div>
  <div class="filterlist-header">
    <h4 class="padding-top-big padding-left-big padding-right-normal is-inline-block">
      {{ $t('filter-list.filter-by') }}
    </h4>

    <button type="button"
            class="button is-text tiny is-paddingless margin-top-big
                    margin-right-small report is-shadowless is-pulled-right"
            @click="onToggleSearchGridFilter()">
      <span class="has-color-tomato is-hidden-touch">{{ $t('filter-list.hide') }}</span>
      <span class="margin-right-normal is-size-5 is-hidden-desktop">
        <i class="icon cross" />
      </span>
    </button>
  </div>

  <form class="filters-form" role="filter">
    <filter-check-list :options="filters.licenseTypes"
                      :disabled="licenseTypesDisabled"
                      :title="$t('filters.license-types.title')"
                      filterType="licenseTypes"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.licenses"
                      :disabled="licensesDisabled"
                      :title="$t('filters.licenses.title')"
                      filterType="licenses"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list v-if="renderProvidersFilter"
                      :options="filters.providers"
                      :title="$t('filters.providers.title')"
                      filterType="providers"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.categories"
                      :title="$t('filters.categories.title')"
                      filterType="categories"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.extensions"
                      :title="$t('filters.extensions.title')"
                      filterType="extensions"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.aspectRatios"
                      :title="$t('filters.aspect-ratios.title')"
                      filterType="aspectRatios"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :options="filters.sizes"
                      :title="$t('filters.sizes.title')"
                      filterType="sizes"
                      @filterChanged="onUpdateFilter" />
    <filter-check-list :title="$t('filters.mature.title')"
                      filterType="mature"
                      :checked="filters.mature"
                      @filterChanged="onUpdateFilter" />

    <div class="margin-normal filter-option small-filter margin-bottom-normal">
      <input type="checkbox" id="creator-chk"
              :checked="filters.searchBy.creator"
              @change="onUpdateSearchByCreator">
      <label for="creator-chk">{{ $t('filters.creator.title') }}</label>
    </div>
  </form>

  <div class="margin-big padding-bottom-normal clear-filters is-hidden-touch"
        v-if="isFilterApplied">
    <button class="button tiny"
            @click="onClearFilters">
      {{ $t('filter-list.clear') }}
    </button>
  </div>

  <div v-if="isFilterApplied"
       class="has-background-white padding-big is-hidden-desktop has-text-centered">
    <button class="button tiny margin-right-normal" @click="onClearFilters">
      {{ $t('filter-list.clear') }}
    </button>
    <button class="button is-primary tiny"
            @click="onToggleSearchGridFilter()">
      {{ $t('filter-list.show') }}
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
    onToggleSearchGridFilter() {
      this.$emit('onToggleSearchGridFilter');
    },
    onClearFilters() {
      this.$emit('onClearFilters');
    },
  },
};
</script>

<style>
.filterlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

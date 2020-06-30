<template>
  <div>
    <div class="is-hidden-desktop">
      <div class="overlay">
        <div class="modal">
          <div :class="{ 'search-filters': true,
                         'search-filters__visible': isFilterVisible, }">
            <filters-list :filters="filters"
                          :isFilterApplied="isFilterApplied"
                          :licenseTypesDisabled="licenseTypesDisabled"
                          :licensesDisabled="licensesDisabled"
                          :renderProvidersFilter="licensesDisabled"
                          @onUpdateFilter="onUpdateFilter"
                          @onUpdateSearchByCreator="onUpdateSearchByCreator"
                          @onToggleSearchGridFilter="onToggleSearchGridFilter"
                          @onClearFilters="onClearFilters" />
          </div>
        </div>
      </div>
    </div>
    <div class="is-hidden-touch">
      <div :class="{ 'search-filters': true,
                     'search-filters__visible': isFilterVisible, }">
        <filters-list :filters="filters"
                      :isFilterApplied="isFilterApplied"
                      :licenseTypesDisabled="licenseTypesDisabled"
                      :licensesDisabled="licensesDisabled"
                      :renderProvidersFilter="renderProvidersFilter"
                      @onUpdateFilter="onUpdateFilter"
                      @onUpdateSearchByCreator="onUpdateSearchByCreator"
                      @onToggleSearchGridFilter="onToggleSearchGridFilter"
                      @onClearFilters="onClearFilters" />
      </div>
    </div>
  </div>
</template>

<script>
import { SET_FILTER_IS_VISIBLE, CLEAR_FILTERS } from '@/store/mutation-types';
import { TOGGLE_FILTER } from '@/store/action-types';
import FiltersList from './FiltersList';
import FiltersListVideo from './FiltersListVideo';

export default {
  name: 'search-grid-filter',
  props: ['isCollectionsPage', 'provider'],
  components: {
    FiltersList,
    FiltersListVideo,
  },
  computed: {
    isFilterApplied() {
      return this.$store.state.isFilterApplied;
    },
    isFilterVisible() {
      return this.$store.state.isFilterVisible;
    },
    filters() {
      return this.$store.state.filters;
    },
    renderProvidersFilter() {
      return !this.$props.isCollectionsPage;
    },
    licensesDisabled() {
      return this.$store.state.filters.licenseTypes.some(li => li.checked);
    },
    licenseTypesDisabled() {
      return this.$store.state.filters.licenses.some(li => li.checked);
    },
  },
  methods: {
    onUpdateFilter({ code, filterType }) {
      this.$store.dispatch(TOGGLE_FILTER, {
        code,
        filterType,
        isCollectionsPage: this.$props.isCollectionsPage,
        provider: this.$props.provider,
        shouldNavigate: true,
      });
    },
    onClearFilters() {
      this.$store.commit(CLEAR_FILTERS, {
        isCollectionsPage: this.$props.isCollectionsPage,
        provider: this.$props.provider,
        shouldNavigate: true,
      });
    },
    onUpdateSearchByCreator() {
      this.$store.dispatch(TOGGLE_FILTER, {
        filterType: 'searchBy',
        isCollectionsPage: this.$props.isCollectionsPage,
        provider: this.$props.provider,
        shouldNavigate: true,
      });
    },
    onToggleSearchGridFilter() {
      this.$store.commit(
        SET_FILTER_IS_VISIBLE,
        { isFilterVisible: !this.isFilterVisible },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 21.875rem;
  max-height: 37rem;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  overflow-y: scroll;
  box-shadow: 0 2px 8px 3px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #00000094;
}

.search-filters {
  display: none;
  height: auto;
  label {
    color: #333333;
  }
  &__visible {
    border-top: 1px solid #e8e8e8;
    display: block;
  }
}

</style>

<style>

/* Content Type Selection */
#content_type_select {
  display:inline-flex;
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
}

input.tgl-radio-tab-child {
  position: absolute;
  left: -99999em;
  top: -99999em;
  opacity: 1;
  z-index: 1;
}

input.tgl-radio-tab-child+label {
  cursor: pointer;
  float: left;
  margin-right: -1px;
  padding: .5em 1em;
  position: relative;
  font-weight: bold;
  font-size: 1.6em;
  padding-top: 24px;
}

input.tgl-radio-tab-child+label:hover {
  border-bottom: 4px solid #333;
}

input.tgl-radio-tab-child+label:checked+label {
  border-bottom: 1px solid #333;
}

[type=radio]:checked+label {
  border-bottom: 4px solid #333;
  z-index: 1;
}

</style>

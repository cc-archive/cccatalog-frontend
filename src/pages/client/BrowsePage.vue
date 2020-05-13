<template>
  <div class="browse-page">
    <header-section />
    <div class="search columns">
      <div class="column is-narrow grid-sidebar is-paddingless" v-if="isFilterVisible">
        <search-grid-filter-video @onSearchFilterChanged="onSearchFormSubmit"
          v-if="query.content_type == 'video' || query.content_type == 'audio'"/>
        <search-grid-filter @onSearchFilterChanged="onSearchFormSubmit"
          v-else/>
      </div>
      <div class="column search-grid-ctr">
        <search-grid-form @onSearchFormSubmit="onSearchFormSubmit" />
        <filter-display :query="query" />
        <search-grid v-if="query.q"
                     :query="query"
                     searchTerm=""
                     @onLoadMoreImages="onLoadMoreImages" />
      </div>
    </div>
    <footer-section></footer-section>
  </div>
</template>
<script>
import FooterSection from '@/components/FooterSection';
import HeaderSection from '@/components/HeaderSection';
import SearchGrid from '@/components/SearchGrid';
import SearchGridForm from '@/components/SearchGridForm';
import SearchGridFilter from '@/components/Filters/SearchGridFilter';
import SearchGridFilterVideo from '@/components/Filters/SearchGridFilterVideo';
import FilterDisplay from '@/components/Filters/FilterDisplay';
import BrowsePageMixin from '@/pages/mixins/BrowsePageMixin';

const BrowsePage = {
  components: {
    HeaderSection,
    SearchGridForm,
    FilterDisplay,
    SearchGridFilter,
    SearchGridFilterVideo,
    SearchGrid,
    FooterSection,
  },
  mixins: [BrowsePageMixin],
};

export default BrowsePage;
</script>

<style lang="scss" scoped>
@import "../../styles/results-page.scss";
</style>

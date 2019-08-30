<template>
  <div class="browse-page">
    <header-section>
      <search-grid-form :showProvidersFilter="true"
                        @onSearchFormSubmit="onSearchFormSubmit" />
    </header-section>

    <div class="search">
      <div class="search-grid-ctr">
        <search-grid v-if="query.q"
                     :query="query"
                     searchTerm=""
                     @onLoadMoreImages="onLoadMoreImages"/>
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
import BrowsePageMixin from '@/pages/mixins/BrowsePageMixin';

const BrowsePage = {
  components: {
    HeaderSection,
    SearchGridForm,
    SearchGrid,
    FooterSection,
  },
  mixins: [BrowsePageMixin],
};

export default BrowsePage;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  @import "~@creativecommons/vocabulary/tokens";

  .search {
    background: $color-tone-near-white;

    padding-top: $space-large;
    padding-bottom: $space-large;

    .search-grid-ctr {
      min-height: 600px;
      transition: margin .7s ease-in-out;
    }
  }
</style>

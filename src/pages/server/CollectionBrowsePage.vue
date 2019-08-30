<template>
  <div class="browse-page">
    <header-section :showNavSearch="true">
      <search-grid-form @onSearchFormSubmit="onSearchFormSubmit"
                        searchBoxPlaceholder="Search this collection" />
    </header-section>

    <div class="search">
      <div class="search-grid-ctr">
      </div>
    </div>

    <footer-section></footer-section>
  </div>
</template>

<script>
import FooterSection from '@/components/FooterSection';
import HeaderSection from '@/components/HeaderSection';
import SearchGridForm from '@/components/SearchGridForm';
import CollectionBrowseMixin from '@/pages/mixins/CollectionBrowseMixin';

const CollectionBrowsePage = {
  components: {
    HeaderSection,
    SearchGridForm,
    FooterSection,
  },
  mixins: [CollectionBrowseMixin],
};

export default CollectionBrowsePage;
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

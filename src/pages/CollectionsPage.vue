<template>
  <div>
    <header-section></header-section>
    <div class="collections-page grid-container full">
      <h1>Browse collections</h1>
      <h2>Museum Collections</h2>
      <div class="sources-list grid-x">
        <collection-item class="card source-card cell small"
                        v-for="(source, index) in museumSources"
                        :key="index"
                        :source="source" />
      </div>
      <hr />
      <h2>Other Collections</h2>
      <div class="sources-list grid-x">
        <collection-item class="card source-card cell small"
                          v-for="(source, index) in otherSources"
                          :key="index"
                          :source="source" />
      </div>
    </div>
    <footer-section></footer-section>
  </div>
</template>

<script>
import CollectionItem from '@/components/CollectionItem';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

const MUSEUM_SOURCES = [
  'brooklynmuseum', 'clevelandmuseum', 'digitaltmuseum', 'met', 'museumsvictoria',
  'nhl', 'rijksmuseum', 'sciencemuseum', 'thorvaldsensmuseum',
];

const CollectionsPage = {
  name: 'collections-page',
  components: {
    HeaderSection,
    FooterSection,
    CollectionItem,
  },
  computed: {
    museumSources() {
      if (this.sources) {
        return this.sources.filter(
          source => MUSEUM_SOURCES.indexOf(source.source_name) >= 0,
        );
      }
      return [];
    },
    otherSources() {
      if (this.sources) {
        return this.sources.filter(
          source => MUSEUM_SOURCES.indexOf(source.source_name) === -1,
        );
      }
      return [];
    },
    sources() {
      return this.$store.state.imageSources;
    },
  },
};

export default CollectionsPage;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1 {
    margin-bottom: .44117647em;
    letter-spacing: initial;
    line-height: 1.25;
    text-transform: initial;
  }

  .collections-page {
    margin: 45px !important;
  }
</style>

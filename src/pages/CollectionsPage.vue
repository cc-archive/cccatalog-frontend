<template>
  <div class="collections page">
    <header-section></header-section>

    <div class="content">
      <Container>
        <h1>{{ $t('browse') }}</h1>
        <h2>{{ $t('museum') }}</h2>
        <Grid density="sparse">
          <GridCell :span-set="[12, 6, 6, 3, 2]"
                    v-for="(provider, index) in museumProviders"
                    :key="index">
            <collection-item class="card provider-card cell small"
                             :provider="provider"/>
          </GridCell>
        </Grid>
        <h2>{{ $t('other') }}</h2>
        <Grid density="sparse">
          <GridCell :span-set="[12, 6, 6, 3, 2]"
                    v-for="(provider, index) in otherProviders"
                    :key="index">
            <collection-item class="card provider-card cell small"
                             :provider="provider"/>
          </GridCell>
        </Grid>
      </Container>
    </div>

    <footer-section></footer-section>
  </div>
</template>

<script>
import {
  Container,
  Grid,
  GridCell,
} from '@creativecommons/vocabulary';

import CollectionItem from '@/components/CollectionItem';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

const MUSEUM_PROVIDERS = [
  'brooklynmuseum', 'clevelandmuseum', 'digitaltmuseum', 'met', 'museumsvictoria',
  'nhl', 'rijksmuseum', 'sciencemuseum', 'thorvaldsensmuseum',
];

const CollectionsPage = {
  name: 'collections-page',
  components: {
    Container,
    Grid,
    GridCell,
    HeaderSection,
    FooterSection,
    CollectionItem,
  },
  computed: {
    museumProviders() {
      if (this.providers) {
        return this.providers.filter(
          provider => MUSEUM_PROVIDERS.indexOf(provider.provider_name) >= 0,
        );
      }
      return [];
    },
    otherProviders() {
      if (this.providers) {
        return this.providers.filter(
          provider => MUSEUM_PROVIDERS.indexOf(provider.provider_name) === -1,
        );
      }
      return [];
    },
    providers() {
      return this.$store.state.imageProviders;
    },
  },
};

export default CollectionsPage;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";
  @import '../styles/text-only-page.scss';

  .collections.page {
    .content {
      margin-bottom: $space-large;
    }
  }
</style>

<i18n src="../locales/pages/CollectionsPage.json">
</i18n>

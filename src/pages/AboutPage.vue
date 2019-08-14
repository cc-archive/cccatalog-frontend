<template>
  <div class="about page">
    <header-section :showNavSearch="true"></header-section>

    <div class="content">
      <Container>
        <h1>{{ $t('about') }}</h1>

        <Grid class="stats">
          <GridCell :span-set="[12, 4, 4, 4, 4]">
            <Statistic
              color="blue"
              shade="dark"
              :label="$t('works')"
              value="1.4B+"/>
          </GridCell>
          <GridCell :span-set="[12, 4, 4, 4, 4]">
            <Statistic
              color="blue"
              shade="dark"
              :icon-set="['', 'image']"
              :label="$t('images')"
              value="300M+"/>
          </GridCell>
          <GridCell :span-set="[12, 4, 4, 4, 4]">
            <Statistic
              color="blue"
              shade="dark"
              :label="$tc('provider', imageProviders.length)"
              :value="imageProviders.length.toString()"/>
          </GridCell>
        </Grid>

        <p class="page_lead-paragraph">
          CC Search is a tool that allows openly
          licensed and public domain works to be discovered and used by everyone.
          Creative Commons, the nonprofit behind CC Search, is the maker of the
          <a href="https://creativecommons.org/share-your-work/licensing-types-examples/">
            CC licenses
          </a>,
          used over 1.4 billion times to help creators share
          knowledge and creativity online.
        </p>

        <p>
          CC Search searches across more than 300 million images from open
          APIs and the
          <a href="http://commoncrawl.org/">
            Common Crawl
          </a>
          dataset.
          It goes beyond simple search to aggregate results across multiple public
          repositories into a single catalog, and facilitates reuse through
          features like machine-generated tags and one-click attribution.
        </p>

        <p>
          Currently CC Search only searches images, but we plan to add
          additional media types such as open texts and audio, with the ultimate
          goal of providing access to all 1.4 billion CC licensed and public
          domain works on the web. Learn more about CC’s
          <a href="https://creativecommons.org/2019/03/19/cc-search/">
            2019 vision, strategy
          </a>
          and
          <a href="https://docs.google.com/document/d/19yH2V5K4nzWgEXaZhkzD1egzrRayyDdxlzxZOTCm_pc/edit#heading=h.jih78emira0r">
            roadmap
          </a>
          for CC Search and see what
          <a href="https://github.com/orgs/creativecommons/projects/7">
            we’re currently working on
          </a>.
          All of our code is open source
          (<a href="https://github.com/creativecommons/cccatalog-frontend/">
            CC Search
          </a>,
          <a href="https://github.com/creativecommons/cccatalog-api/">
            CC Catalog API
          </a>,
          <a href="https://github.com/creativecommons/cccatalog/">
            CC Catalog
          </a>)
          and we
          <a href="https://creativecommons.github.io/contributing-code/">
            welcome community contribution
          </a>.
        </p>

        <p>
          Please note that CC does not verify whether the images are properly
          CC licensed, or whether the attribution and other licensing information
          we have aggregated is accurate or complete. Please independently verify
          the licensing status and attribution information before reusing the
          content. For more details, read the <a
          href="https://creativecommons.org/terms/">CC Terms of Use</a>.
        </p>

        <p>
          <FontAwesomeIcon :icon="['fas', 'history']"/>
          Looking for the old CC Search portal? Go <a href="https://oldsearch.creativecommons.org/">here</a>.
        </p>

        <h2>{{ $tc('provider', 2) }}</h2>

        <div class="sorting">
          <strong>{{ $tc('provider', 1) }}</strong>
          &emsp;
          <SwitchField v-model="sortByCount"
                       :icon-set="['sort-alpha-down', 'sort-numeric-down-alt']"
                       color="blue"
                       shade="dark"
                       is-labelled/>
          &emsp;
          <strong>#{{ $t('works') }}</strong>
        </div>
        <Table color="blue"
               shade="dark"
               :caption="$t('caption')"
               is-fixed
               is-striped>
          <template #head>
            <tr>
              <TableCell is-heading>{{ $tc('provider', 1) }}</TableCell>
              <TableCell is-heading>{{ $t('domain') }}</TableCell>
              <TableCell is-heading>#{{ $t('works') }}</TableCell>
            </tr>
          </template>

          <template #default>
            <tr v-for="(provider, index) in imageProviders"
                :key="index">
              <TableCell is-heading>
                {{ provider.display_name }}
              </TableCell>
              <TableCell is-actionable
                         @click.native="goToProvider(provider.provider_url)">
                {{ provider.provider_url }}
              </TableCell>
              <TableCell>
                {{ getProviderImageCount(provider.image_count) }}
              </TableCell>
            </tr>
          </template>
        </Table>
      </Container>
    </div>

    <footer-section></footer-section>
  </div>
</template>

<script>
import {
  Button,
  Container,
  Grid,
  GridCell,
  Statistic,
  SwitchField,
  Table,
  TableCell,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage, faSortAlphaDown, faSortNumericDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

library.add(faImage, faSortAlphaDown, faSortNumericDownAlt);

const AboutPage = {
  name: 'about-page',
  components: {
    Button,
    Container,
    Grid,
    GridCell,
    Statistic,
    SwitchField,
    Table,
    TableCell,
    FontAwesomeIcon,
    HeaderSection,
    FooterSection,
  },
  data: () => ({
    sortByCount: false,
  }),
  computed: {
    imageProviders() {
      const providers = this.$store.state.imageProviders.slice();
      if (this.sortByCount) {
        providers.sort((a, b) => b.image_count - a.image_count);
      }
      return providers;
    },
  },
  methods: {
    getProviderImageCount(imageCount) {
      return (imageCount).toLocaleString('en');
    },
    goToProvider(url) {
      window.open(url, '_blank');
    },
  },
};

export default AboutPage;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/text-only-page.scss';

  .about.page {
    .stats {
      text-align: center;
    }

    .sorting {
      text-align: right;
      margin-bottom: $space-normal;
    }
  }
</style>

<i18n src="../locales/pages/AboutPage.json">
</i18n>

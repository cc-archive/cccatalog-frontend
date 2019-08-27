<template>
  <div class="hero">
    <header-section></header-section>
    <Container>

      <BrandImagery color="black"
                    size="normal"/>

      <form class="search-form"
            role="search"
            method="post"
            @submit.prevent="onSubmit">
        <div class="search-field">
          <InputField v-model.lazy="form.searchTerm"
                      class="query-field"
                      color="blue"
                      shade="dark"
                      size="large"
                      join-side="right"
                      is-basic
                      type="search"
                      :placeholder="$t('search')"
                      autofocus="autofocus"
                      autocapitalize="none"/>
          <Button class="search-button"
                  color="blue"
                  shade="dark"
                  icon="search"
                  size="large"
                  type="submit"
                  title="Search"
                  @click="onSubmit"/>
        </div>
        <home-license-filter/>
      </form>

      <div class="description">
        {{ $t('description') }}
      </div>

      <Grid class="links">
        <GridCell class="info"
                  :span-set="[12, 12, 4, 4, 4]">
          <FontAwesomeIcon :icon="['fas', 'info-circle']"/>
          <i18n path="links.learn" tag="span">
            <a href="https://creativecommons.org/share-your-work/licensing-types-examples/"
               target="_blank"
               rel="noopener">{{ $t('links.here') }}</a>.
          </i18n>
        </GridCell>
        <GridCell class="history"
                  :span-set="[12, 6, 4, 4, 4]">
          <FontAwesomeIcon :icon="['fas', 'history']"/>
          <i18n path="links.old" tag="span">
            <a href="https://oldsearch.creativecommons.org/"
               target="_blank">{{ $t('links.here') }}</a>.
          </i18n>
        </GridCell>
        <GridCell class="question"
                  :span-set="[12, 6, 4, 4, 4]">
          <FontAwesomeIcon :icon="['fas', 'question-circle']"/>
          <i18n path="links.guide" tag="span">
            <a href="/search-help">{{ $t('links.here') }}</a>.
          </i18n>
        </GridCell>
      </Grid>
    </Container>
  </div>
</template>

<script>
import {
  BrandImagery,
  Button,
  Container,
  Grid,
  GridCell,
  InputField,
} from '@creativecommons/vocabulary';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHistory,
  faQuestionCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { SET_QUERY } from '@/store/mutation-types';
import HeaderSection from '@/components/HeaderSection';
import HomeLicenseFilter from './HomeLicenseFilter';

library.add(faHistory, faQuestionCircle, faInfoCircle);

export default {
  name: 'hero-section',
  components: {
    HeaderSection,
    HomeLicenseFilter,
    BrandImagery,
    Button,
    Container,
    Grid,
    GridCell,
    InputField,
    FontAwesomeIcon,
  },
  data: () => ({ form: { searchTerm: '' } }),
  methods: {
    onSubmit() {
      this.$store.commit(SET_QUERY, { query: { q: this.form.searchTerm }, shouldNavigate: true });
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '~@creativecommons/vocabulary/tokens.scss';

  $hero-height: 100vh;

  .hero {
    display: flex;
    flex-direction: column;

    background-color: #e9ebee;

    min-height: $hero-height;

    a {
      color: $color-blue-dark;

      &:hover {
        color: $color-blue-darker;
      }
    }

    .header {
      flex-grow: 0;
      flex-shrink: 0;
    }

    .container {
      flex-grow: 1;
      flex-shrink: 0;

      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-align: center;

      .search-form {
        margin-top: $space-larger;
        margin-bottom: $space-larger;

        .search-field {
          display: flex;
          flex-direction: row;
          justify-content: center;

          max-width: 100%;

          .query-field {
            flex-grow: 1;
            flex-shrink: 0;

            width: unset;
          }

          .search-button {
            flex-grow: 0;
            flex-shrink: 0;
          }
        }
      }

      .description {
        font-style: italic;
      }

      .links {
        position: absolute;
        bottom: 0;

        width: 100%;

        padding-bottom: $space-normal;

        @media (max-width: 599px) {
          .info,
          .history,
          .question {
            text-align: left;
          }
        }
        @media (min-width: 600px) {
          .info {
            text-align: left;
          }

          .history {
            text-align: center;
          }

          .question {
            text-align: right;
          }
        }
      }
    }
  }
</style>

<i18n src="../locales/components/HeroSection.json">
</i18n>

<template>
  <Container>
    <section class="search-grid"
             :class="sectionClasses"
             ref="searchGrid">
      <div class="search-grid_ctr" ref="gridItems">
        <div v-show="showGrid && includeAnalytics"
             class="search-grid_analytics">
          <span>
            <strong>{{ _imagesCount }}</strong> photos
          </span>
        </div>
        <div class="masonry-layout"
             v-masonry
             transition-duration="0s"
             item-selector=".item"
             :fit-width="true"
             :gutter="20">
          <masonry-search-grid-cell v-for="(image) in _images"
                                    v-masonry-tile class="item"
                                    :key="image.id"
                                    :image="image"
                                    :shouldContainImage="shouldContainImages"/>
        </div>
        <infinite-loading
          @infinite="onInfiniteHandler"
          ref="infiniteLoader"
          v-if="useInfiniteScroll && isDataInitialized">
        </infinite-loading>
        <div class="search-grid_notification callout alert" v-if="isFetchingImagesError">
          <h5>Error fetching images</h5>
        </div>
      </div>
    </section>
  </Container>
</template>

<script>
import Vue from 'vue';

import {
  Container,
} from '@creativecommons/vocabulary';

import { VueMasonryPlugin } from 'vue-masonry';

import InfiniteLoading from 'vue-infinite-loading';

import MasonrySearchGridCell from '@/components/MasonrySearchGridCell';
import SearchGridFilter from '@/components/SearchGridFilter';

import { SET_IMAGES } from '@/store/mutation-types';

Vue.use(VueMasonryPlugin);

const DEFAULT_PAGE_SIZE = 20;

export default {
  name: 'search-grid-infinite-load',
  components: {
    Container,

    InfiniteLoading,
    SearchGridFilter,
    MasonrySearchGridCell,
  },
  data: () => ({
    isDataInitialized: false,
    shouldContainImages: false,
    currentPage: 1,
    showGrid: false,
  }),
  props: {
    imagesCount: 0,
    images: {
      default: () => ([]),
    },
    query: {},
    useInfiniteScroll: {
      default: true,
    },
    includeAnalytics: {
      default: true,
    },
    includeAddToList: {
      default: true,
    },
    searchTerm: {
      default: '',
    },
  },
  computed: {
    sectionClasses() {
      return [
        {
          'search-grid__contain-images': this.shouldContainImages,
        },
      ];
    },
    imagePage() {
      return this.$store.state.imagePage;
    },
    isFetchingImagesError() {
      return this.$store.state.isFetchingImagesError;
    },
    isFetchingImages() {
      return this.$store.state.isFetchingImages;
    },
    _images() {
      return this.useInfiniteScroll ? this.$store.state.images : this.images;
    },
    _imagesCount() {
      const count = this.useInfiniteScroll ? this.$store.state.imagesCount : this.imagesCount;
      return count.toLocaleString('en');
    },
    _query() {
      return this.$props.query;
    },
  },
  watch: {
    isFetchingImages: function handler(isFetchingImages) {
      this.showGrid = !isFetchingImages;
    },
    _images: {
      handler() {
        if (this.$state) {
          this.$state.loaded();

          if (this._imagesCount < this.currentPage * DEFAULT_PAGE_SIZE) {
            this.$state.complete();
          }
        }

        this.isDataInitialized = true;
      },
    },
    _query: {
      handler() {
        this.searchChanged();
      },
      deep: true,
    },
  },
  methods: {
    handleScalingChange() {
      setTimeout(() => {
        this.$redrawVueMasonry(); // Some elements end up taking less space
      }, 100); // One-tenth of a second should be sufficient to calculate new height
    },
    searchChanged() {
      this.showGrid = false;
      this.$store.commit(SET_IMAGES, { images: [] });
      this.currentPage = 0;
      this.$nextTick(() => {
        this.$refs.infiniteLoader.$emit('$InfiniteLoading:reset');
      });
    },
    onInfiniteHandler($state) {
      this.$state = $state;

      if (this.isFetchingImages === false) {
        this.currentPage = this.currentPage + 1;
        const searchParams = Object.assign(
          { page: this.currentPage, shouldPersistImages: true },
          this._query,
        );

        this.$nextTick(() => {
          this.$emit('onLoadMoreImages', searchParams);
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "~@creativecommons/vocabulary/tokens";

  .search-grid_ctr {
    .search-grid_analytics {
      margin-bottom: $space-normal;
    }

    .masonry-layout {
      margin: auto;
    }
  }

  .search-grid:after {
    content: '';
    display: block;
    clear: both;
  }

  .search-grid_notification {
    text-align: center;

    font-weight: $weight-bold;

    width: 50%;

    margin: auto;
  }
</style>

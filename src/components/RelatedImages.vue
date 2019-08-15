<template>
  <div class="photo_related-images grid-x full" v-if="relatedImages && relatedImages.length > 0">
    <header>
      <h2>{{ $t('relatedimages') }}</h2>
    </header>

    <search-grid
      :imagesCount="imagesCount"
      :images="relatedImages"
      :query="query"
      :filter="filter"
      :includeAnalytics="false"
      :useInfiniteScroll="false"
      :includeAddToList="false"
      v-if="isPrimaryImageLoaded===true">
    </search-grid>
  </div>
</template>

<script>
import SearchGrid from '@/components/SearchGridManualLoad';

export default {
  name: 'related-images',
  props: ['relatedImages', 'imagesCount', 'query', 'filter', 'isPrimaryImageLoaded'],
  components: {
    SearchGrid,
  },
};
</script>

<i18n src="../locales/components/RelatedImages.json">
</i18n>

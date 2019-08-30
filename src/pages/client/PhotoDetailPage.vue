<template>
  <div class="photo-detail page">
    <header-section :showNavSearch="true"/>

    <Container>
      <photo-details :image="image"
                    :breadCrumbURL="breadCrumbURL"
                    :shouldShowBreadcrumb="shouldShowBreadcrumb"
                    :query="query"
                    :imageWidth="imageWidth"
                    :imageHeight="imageHeight"
                    :watermarkEnabled="watermarkEnabled"
                    :socialSharingEnabled="socialSharingEnabled"
                    @onImageLoaded="onImageLoaded" />

      <!-- Choose whether to show the # icon with the tags -->
      <photo-tags :tags="tags" :show-icon="false"/>

      <related-images :relatedImages="relatedImages"
                      :imagesCount="imagesCount"
                      :query="query"
                      :filter="filter"
                      :isPrimaryImageLoaded="isPrimaryImageLoaded" />
    </Container>

    <footer-section></footer-section>
  </div>
</template>

<script>
import {
  Container,
} from '@creativecommons/vocabulary';

import PhotoDetails from '@/components/PhotoDetails';
import PhotoTags from '@/components/PhotoTags';
import RelatedImages from '@/components/RelatedImages';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import PhotoDetailMixin from '@/pages/mixins/PhotoDetailMixin';

const PhotoDetailPage = {
  components: {
    Container,

    HeaderSection,
    RelatedImages,
    FooterSection,
    PhotoDetails,
    PhotoTags,
  },
  mixins: [PhotoDetailMixin],
};

export default PhotoDetailPage;
</script>

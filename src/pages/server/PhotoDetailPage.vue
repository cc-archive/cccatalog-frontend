<template>
  <div class="photo-detail-page">
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
                     @onImageLoaded="onImageLoaded"/>

      <!-- Choose whether to show the # icon with the tags -->
      <photo-tags :tags="tags" :show-icon="false"/>
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
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import PhotoDetailMixin from '@/pages/mixins/PhotoDetailMixin';

const PhotoDetailPage = {
  components: {
    Container,

    HeaderSection,
    FooterSection,
    PhotoDetails,
    PhotoTags,
  },
  mixins: [PhotoDetailMixin],
};

export default PhotoDetailPage;
</script>

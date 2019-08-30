<template>
  <div class="cell">
    <a class="link"
       :href="'/photos/' + image.id"
       @click="onGotoDetailPage($event, image)">
      <ImageView :source="imageUrl"
                 :alternate-text="image.title"
                 primary-dimension="width"
                 is-hoverable
                 @error="onImageLoadError($event, image)">
        <template #topAddons>
          <LicenseIcons :image="image"/>
        </template>
        <template #bottomAddons>
          <a class="search-grid_overlay-provider"
             :title="image.title"
             :href="foreignUrl"
             @click.stop="() => false"
             target="new">
            <img class="search-grid_overlay-provider-logo"
                 :src="providerLogo"
                 :alt="image.provider"/>
            {{ croppedTitle }}
          </a>
        </template>
      </ImageView>
    </a>
  </div>
</template>

<script>
import {
  ImageView,
} from '@creativecommons/vocabulary';

import LicenseIcons from '@/components/LicenseIcons';

import getProviderLogo from '@/utils/getProviderLogo';

const errorImage = require('@/assets/image_not_available_placeholder.png');

const toAbsolutePath = (url, prefix = 'https://') => {
  if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
    return url;
  }
  return `${prefix}${url}`;
};

export default {
  name: 'masonry-search-grid-cell',
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  components: {
    ImageView,
    LicenseIcons,
  },
  computed: {
    croppedTitle() {
      return this.image.title;
    },
    imageUrl() {
      const url = this.image.thumbnail || this.image.url;
      return toAbsolutePath(url);
    },
    foreignUrl() {
      return toAbsolutePath(this.image.foreign_landing_url);
    },
    providerLogo() {
      return getProviderLogo(this.image.provider);
    },
  },
  methods: {
    onGotoDetailPage(event, image) {
      // doesn't use router to redirect to photo details page in case the user
      // has the Command (Mac) or Ctrl Key (Windows) pressed, so that they can
      // open the page on a new tab with either of those keys pressed.
      if (!event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        this.$router.push(`/photos/${image.id}`);
      }
    },
    onImageLoadError(event, image) {
      const element = event.target;
      if (element.src !== image.url) {
        element.src = image.url;
      }
      else {
        element.src = errorImage;
      }
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .cell {
    margin-bottom: $space-large;

    .link {
      display: block;

      .image-view {
        --image-view-width: 256px;

        @media (max-width: 599px) {
          --image-view-width: 320px;
        }

        a {
          color: inherit;

          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .search-grid_overlay-provider {
          display: block;
          max-width: 100%;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .search-grid_overlay-provider-logo {
            vertical-align: middle;

            height: 1.5em;
          }
        }
      }
    }
  }
</style>

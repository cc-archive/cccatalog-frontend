<template>
  <Card class="individual"
        :heading="provider.display_name"
        is-decked
        is-raised
        @click.native="goToProvider(provider.provider_name)">
    <template #feature>
      <div class="featured-content">
        <img class="provider-logo"
             :alt="provider.display_name"
             :src="getProviderLogo(provider.provider_name)">
      </div>
    </template>
    <template #default>
      <div class="body-content">&nbsp;</div>
    </template>
    <template #foot>
      {{ $t('count') }}: {{ getProviderImageCount(provider.image_count) }} {{ $t('images') }}
    </template>
  </Card>
</template>

<script>
import { Card } from '@creativecommons/vocabulary';

import ImageProviderService from '@/api/ImageProviderService';

const CollectionItem = {
  name: 'collection-item',
  components: {
    Card,
  },
  props: ['provider'],
  methods: {
    getProviderImageCount(imageCount) {
      return (imageCount).toLocaleString('en');
    },
    getProviderLogo(providerName) {
      const provider = ImageProviderService.getProviderInfo(providerName);
      if (provider) {
        const logo = provider.logo;
        return require(`@/assets/${logo}`); // eslint-disable-line global-require, import/no-dynamic-require
      }

      return '';
    },
    goToProvider(url) {
      window.location.href = `/collections/${url}`;
    },
  },
};

export default CollectionItem;
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .individual {
    cursor: pointer;

    --card-foot-background-color: var(--card-body-background-color);
  }

  .featured-content {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 6em;

    padding: 1em;

    .provider-logo {
      max-width: 100%;
      max-height: 6em;

      a {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      img {
        max-width: 100%;
      }
    }
  }

  .body-content {
    height: 0;
    overflow: hidden;
  }
</style>

<i18n src="../locales/components/CollectionItem.json">
</i18n>

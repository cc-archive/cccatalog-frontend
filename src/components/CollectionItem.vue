<template>
  <div class="card source-card cell small">
    <div class="card-divider">
      <span class="source-name">{{ source.display_name }}</span>
    </div>
    <div class="source-logo">
      <a :href="'/collections/'+source.source_name">
        <img :alt="source.display_name"
            :src="getSourceLogo(source.source_name)">
      </a>
    </div>
    <div class="card-section">
      <span>Collection size: {{ getSourceImageCount(source.image_count) }} images</span>
    </div>
  </div>
</template>

<script>
import ImageSourceService from '@/api/ImageSourceService';

export default {
  name: 'collection-item',
  props: ['source'],
  methods: {
    getSourceImageCount(imageCount) {
      return (imageCount).toLocaleString('en');
    },
    getSourceLogo(sourceName) {
      const source = ImageSourceService.getSourceInfo(sourceName);
      if (source) {
        const logo = source.logo;
        const logoUrl = require(`@/assets/${logo}`); // eslint-disable-line global-require, import/no-dynamic-require

        return logoUrl;
      }

      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .source-card {
    width: 18em;
    background-color: #dedede;
    margin: 0.5em;
  }

  .source-name {
    font-weight: 800;
  }

  .source-logo {
    height: 10em;
    line-height: 10em;
    white-space: nowrap;
    position: relative;

    a {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    img {
      width: 100%;
    }
  }
</style>

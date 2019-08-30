<template>
  <div class="tags" v-if="tags.length !== 0">
    <header>
      <h2>{{ $t('tags') }}</h2>
    </header>

    <Section v-for="(tag, index) in validTags"
            :key="index"
            class="tag"
            :icon="showIcon ? 'hashtag' : null"
            is-compact
            @click.native="searchByTagName(tag.name)">
      <span class="text">
        {{ tag.name }}
      </span>
    </Section>
  </div>
</template>

<script>
import {
  Section,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import { SET_QUERY } from '@/store/mutation-types';

library.add(faHashtag);

export default {
  name: 'photo-tags',
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Section,
  },
  computed: {
    hasClarifaiTags() {
      return this.tags.some(tag => tag.provider === 'clarifai');
    },
    validTags() {
      return this.tags.filter(tag => !!tag.name);
    },
  },
  methods: {
    searchByTagName(query) {
      this.$store.commit(
        SET_QUERY,
        {
          query: {
            q: query,
          },
          shouldNavigate: true,
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .tags {
    .tag {
      color: $color-tone-grey-dark;

      cursor: pointer;

      border-radius: $radius-normal;

      transition-property: color, border-color;
      transition-duration: $duration-shortest;

      &:hover {
        color: $color-tone-black;

        border-color: $color-tone-black;
      }

      &:not(:last-of-type) {
        margin-right: $space-normal;
      }
      margin-bottom: $space-normal;
    }
  }
</style>

<i18n src="../locales/components/PhotoTags.json">
</i18n>

<template>
  <div class="tags" v-if="tags.length !== 0">
    <header>
      <h2>{{ $t('tags') }}</h2>
    </header>

    <Button v-for="(tag, index) in validTags"
            :key="index"
            class="tag"
            color="blue"
            shade="dark"
            :icon="showIcon ? 'hashtag' : null"
            is-basic
            @click="searchByTagName(tag.name)">
      <span class="text">
        {{ tag.name }}
      </span>
    </Button>
  </div>
</template>

<script>
import {
  Button,
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
    Button,
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

<i18n src="../locales/components/PhotoTags.json">
</i18n>

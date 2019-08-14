<template>
  <Button class="attribution-copy-button"
          :id="id"
          color="blue"
          shade="dark"
          :icon="success ? 'check': 'copy'"
          type="button"
          :data-clipboard-target="el">
    <slot v-if="!success" default/>
    <template v-else>
      {{ $t('copied') }}!
    </template>
  </Button>
</template>

<script>
import {
  Button,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import Clipboard from 'clipboard';

library.add(faCopy);

export default {
  components: {
    Button,
  },
  props: {
    el: {
      required: true,
    },
    id: {
      required: true,
    },
  },
  data: () => ({
    success: false,
    clipboard: null,
  }),
  methods: {
    onCopySuccess(e) {
      this.success = true;
      this.$emit('copied', { content: e.text });

      setTimeout(() => {
        this.success = false;
      }, 2000);

      e.clearSelection();
    },
    onCopyError(e) {
      this.$emit('copyFailed');
      e.clearSelection();
    },
  },
  mounted() {
    this.clipboard = new Clipboard(`#${this.$props.id}`);
    this.clipboard.on('success', this.onCopySuccess);
    this.clipboard.on('error', this.onCopyError);
  },
  destroyed() {
    this.clipboard.destroy();
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .attribution-copy-button {
    display: flex;

    min-width: 12em;

    margin: $space-normal $space-zero;
  }
</style>

<i18n src="../locales/components/CopyButton.json">
</i18n>

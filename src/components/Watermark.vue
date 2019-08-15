<template>
  <div class="watermark">
    <header>
      <h3>{{ $t('downloadimage' )}}</h3>
    </header>
    <div>
      <ChoiceField v-model="customisations"
                   id="watermark"
                   color="blue"
                   shade="dark"
                   is-basic
                   value="watermark"/>
      <label for="watermark">
        {{ $t('labels.include') }}
      </label>
      <help-tooltip :tooltip="$t('help.watermark')"/>
    </div>

    <div>
      <ChoiceField v-model="customisations"
                   id="embedMetadata"
                   color="blue"
                   shade="dark"
                   is-basic
                   value="embedMetadata"/>
      <label for="embedMetadata">
        {{ $t('labels.embed') }}
      </label>
      <help-tooltip :tooltip="$t('help.metadata')"/>
    </div>

    <Button class="download"
            color="blue"
            shade="dark"
            icon="download"
            data-type="text"
            @click="onDownloadWatermark(image, $event)">
      {{ $t('download') }}
    </Button>
  </div>
</template>

<script>
import {
  Button,
  ChoiceField,
} from '@creativecommons/vocabulary';

import HelpTooltip from '@/components/HelpTooltip';

import { DOWNLOAD_WATERMARK } from '@/store/action-types';

export default {
  name: 'watermark',
  components: {
    Button,
    ChoiceField,

    HelpTooltip,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    customisations: [],
  }),
  computed: {
    shouldEmbedMetadata() {
      return this.customisations.includes('embedMetadata');
    },
    shouldWatermark() {
      return this.customisations.includes('watermark');
    },
    watermarkUrl() {
      const queryParams = [];
      queryParams.push(`embed_metadata=${this.shouldEmbedMetadata}`);
      queryParams.push(`watermark=${this.shouldWatermark}`);

      return `${process.env.API_URL}/watermark/${this.image.id}?${queryParams.join('&')}`;
    },
  },
  methods: {
    onDownloadWatermark(image) {
      const shouldEmbedMetadata = this.shouldEmbedMetadata;
      const shouldWatermark = this.shouldWatermark;

      this.$store.dispatch(DOWNLOAD_WATERMARK, {
        imageId: image.id,
        shouldWatermark,
        shouldEmbedMetadata,
      });

      window.location = this.watermarkUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .watermark {
    .download {
      min-width: 12em;

      margin: $space-normal $space-zero;
    }
  }
</style>

<i18n src="../locales/components/Watermark.json">
</i18n>

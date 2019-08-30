<template>
  <div class="disclaimer">
    <header>
      <i18n path="verifyat" tag="h3">
        {{ $t('source') }}
      </i18n>
    </header>

    <Button class="verify"
            color="blue"
            shade="dark"
            icon="certificate"
            @click="redirectToSource">
      <i18n path="verifyat" tag="span">
        {{ source }}
      </i18n>
    </Button>

    <Section indication="probably" color-side="left">
      CC Search aggregates data from publicly available repositories of open
      content. CC does not host the content and does not verify that the
      content is properly CC-licensed or that the attribution information is
      accurate or complete. Please follow the link to the source of the
      content to independently verify before reuse.
    </Section>
  </div>
</template>

<script>
import {
  Button,
  Heading,
  Section,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '@/components/Tooltip';

library.add(faCertificate);

export default {
  name: 'legal-disclaimer',
  props: {
    source: {
      type: String,
      required: true,
    },
    sourceURL: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
    Heading,
    Section,

    Tooltip,
  },
  methods: {
    redirectToSource() {
      window.location.href = this.sourceURL;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .disclaimer {
    .button {
      display: flex;

      min-width: 12em;

      margin: $space-normal $space-zero;
    }

    .section {
      font-size: $size-small;
    }
  }
</style>

<i18n src="../locales/components/LegalDisclaimer.json">
</i18n>

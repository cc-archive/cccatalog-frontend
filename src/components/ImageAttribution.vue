<template>
  <div class="attribution">
    <header>
      <h3>{{ $t('imageattribution') }}</h3>
    </header>

    <div class="photo-attribution">
      <Section color="blue" shade="light" color-side="left" is-basic>
        <span id="attribution" class="photo_usage-attribution" ref="photoAttribution">
          <a :href="image.foreign_landing_url">"{{ image.title }}"</a>
          <span v-if="image.creator">
            by
            <a v-if="image.creator_url" :href="image.creator_url">{{ image.creator }}</a>
            <span v-else>
              {{ image.creator }}
            </span>
          </span>
          is licensed under
          <a class="photo_license" :href="licenseURL">{{ fullLicenseName.toUpperCase() }}</a>
          <license-icons :image="image"></license-icons>
        </span>
      </Section>
      <CopyButton id="copy-attribution-btn"
                  el="#attribution"
                  title="RTF to embed attribution in blog or document"
                  @copied="onCopyAttribution">
        {{ $t('copy.richtext') }}
      </CopyButton>
    </div>

    <div class="embed-attribution">
      <span>
        Copy the HTML below to embed the attribution with license icons in your web page:
      </span>
      <textarea class="attribution-code"
                id="attribution-html"
                :value="attributionHtml"
                readonly="readonly">
      </textarea>
      <CopyButton id="embed-attribution-btn"
                  el="#attribution-html"
                  title="HTML to embed attribution on web page"
                  @copied="onEmbedAttribution">
        {{ $t('copy.html') }}
      </CopyButton>
    </div>

    <reuse-survey/>

    <legal-disclaimer :source="image.provider"
                      :sourceURL="image.foreign_landing_url"/>
  </div>
</template>

<script>
import {
  Section,
} from '@creativecommons/vocabulary';

import LicenseIcons from '@/components/LicenseIcons';
import CopyButton from '@/components/CopyButton';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import ReuseSurvey from '@/components/ReuseSurvey';

import { COPY_ATTRIBUTION, EMBED_ATTRIBUTION } from '@/store/action-types';

export default {
  name: 'image-attribution',
  props: ['id', 'image', 'ccLicenseURL', 'fullLicenseName', 'attributionHtml'],
  components: {
    Section,

    LicenseIcons,
    CopyButton,
    LegalDisclaimer,
    ReuseSurvey,
  },
  computed: {
    licenseURL() {
      return `${this.ccLicenseURL}&atype=rich`;
    },
  },
  methods: {
    onCopyAttribution(e) {
      this.$store.dispatch(COPY_ATTRIBUTION, {
        content: e.content,
      });
    },
    onEmbedAttribution() {
      this.$store.dispatch(EMBED_ATTRIBUTION);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@creativecommons/vocabulary/tokens';

  .attribution {
    a {
      color: $color-blue-dark;

      &:hover {
        color: $color-blue-darker;
      }
    }

    .photo-attribution {
      .quote {
        .blockquote {
          .icon {
            display: none;
          }
        }
      }
    }

    .attribution-code {
      display: block;

      font-family: monospace;
      font-size: 14px;
      line-height: 1.5;

      background-color: scale_color($color-tone-near-white, $lightness: 50%);

      padding: $space-normal;

      border: 1px solid $color-tone-grey-lighter;

      margin: $space-normal $space-zero;

      width: calc(100% - 17px);
      height: 5em;

      transition: box-shadow $duration-short;

      &:focus {
        box-shadow: unquote($shadow-normal) $color-tone-grey-lighter;

        outline: none;
      }
    }
  }
</style>

<i18n src="../locales/components/ImageAttribution.json">
</i18n>

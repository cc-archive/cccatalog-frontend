<template>
  <div class="details">
    <Section class="image-viewer"
             color="blue"
             shade="dark">
      <Trail v-if="shouldShowBreadcrumb"
             class="trail"
             color="blue"
             shade="dark">
        <TrailCrumb class="back-link"
                    icon="search"
                    :link="breadCrumbURL"
                    @click.native.prevent="onGoBackToSearchResults">
          Search results
        </TrailCrumb>
        <TrailCrumb>
          {{ image.title }}
        </TrailCrumb>
      </Trail>
      <div class="image-wrapper">
        <img @load="onImageLoad"
             class="image-demo"
             :src="image.url"
             :alt="image.title">
      </div>
    </Section>

    <header>
      <h2>{{ $t('details') }}</h2>
    </header>

    <Tabbed class="tabs"
            color="blue"
            shade="dark">
      <TabbedPane>
        <template #tab>
          <LicenseIconography :icon-list="['by']"/>
          {{ $t('tabs.attribution') }}
        </template>
        <template #default>
          <image-attribution :image="image"
                             :ccLicenseURL="ccLicenseURL"
                             :fullLicenseName="fullLicenseName"
                             :attributionHtml="processedAttributionHtml"/>
        </template>
      </TabbedPane>
      <TabbedPane>
        <template #tab>
          <FontAwesomeIcon :icon="['fas', 'info-circle']"/>
          {{ $t('tabs.information') }}
        </template>
        <template #default>
          <image-info :image="image"
                      :ccLicenseURL="ccLicenseURL"
                      :fullLicenseName="fullLicenseName"
                      :imageWidth="imageWidth"
                      :imageHeight="imageHeight"/>
        </template>
      </TabbedPane>
      <TabbedPane v-if="watermarkEnabled">
        <template #tab>
          <FontAwesomeIcon :icon="['fas', 'download']"/>
          {{ $t('tabs.download') }}
        </template>
        <template #default>
          <watermark :image="image"/>
        </template>
      </TabbedPane>
      <TabbedPane v-if="socialSharingEnabled">
        <template #tab>
          <FontAwesomeIcon :icon="['fas', 'share-square']"/>
          {{ $t('tabs.share') }}
        </template>
        <template #default>
          <image-social-share :image="image"/>
        </template>
      </TabbedPane>
    </Tabbed>
  </div>
</template>

<script>
import {
  LicenseIconography,
  Section,
  Tabbed,
  TabbedPane,
  Trail,
  TrailCrumb,
} from '@creativecommons/vocabulary';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDownload,
  faInfoCircle,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ImageInfo from '@/components/ImageInfo';
import Watermark from '@/components/Watermark';
import ImageAttribution from '@/components/ImageAttribution';
import ImageSocialShare from '@/components/ImageSocialShare';

import attributionHtml from '@/utils/attributionHtml';

library.add(faDownload, faInfoCircle, faShareSquare);

export default {
  name: 'photo-details',
  props: ['image', 'breadCrumbURL', 'shouldShowBreadcrumb', 'query', 'imageWidth', 'imageHeight', 'watermarkEnabled', 'socialSharingEnabled'],
  components: {
    LicenseIconography,
    Section,
    Tabbed,
    TabbedPane,
    Trail,
    TrailCrumb,
    FontAwesomeIcon,

    ImageInfo,
    Watermark,
    ImageAttribution,
    ImageSocialShare,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    fullLicenseName() {
      const license = this.image.license;
      const version = this.image.license_version;

      if (license) {
        return license.toLowerCase() === 'cc0' ? `${license} ${version}` : `CC ${license} ${version}`;
      }
      return '';
    },
    ccLicenseURL() {
      return `${this.image.license_url}?ref=ccsearch`;
    },
    processedAttributionHtml() {
      const licenseURL = `${this.ccLicenseURL}&atype=html`;
      return attributionHtml(this.image, licenseURL, this.fullLicenseName);
    },
  },
  methods: {
    onGoBackToSearchResults() {
      this.$router.push({ name: 'browse-page', query: this.query });
    },
    onImageLoad(event) {
      this.$emit('onImageLoaded', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .details {
    margin-top: $space-large;

    width: 100%;

    .trail {
      margin: $space-normal $space-zero $space-large;
    }

    .image-viewer {
      .image-wrapper {
        text-align: center;

        .image-demo {
          margin: $space-normal $space-zero $space-zero;
          max-width: 100%;
        }
      }
    }
  }
</style>

<i18n src="../locales/components/PhotoDetails.json">
</i18n>


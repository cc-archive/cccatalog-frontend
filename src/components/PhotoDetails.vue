<template>
    <div class="photo grid-x">
      <div class="photo_image-ctr cell medium-12 large-8">
        <a class="photo_breadcrumb"
           :href="breadCrumbURL"
           @click.prevent="onGoBackToSearchResults"
           v-if="shouldShowBreadcrumb">&#171; Back to search results</a>
        <img @load="onImageLoad"
             class="photo_image"
             :src="image.url"
             :alt="image.title">
      </div>
      <section class="photo_info-ctr cell medium-12 large-4">
        <header class="photo_info-header">
          <h2>
            PHOTO INFO
          </h2>
        </header>
        <ul>
          <li>
            <h3>Title</h3>
            <span>{{ image.title }}</span>
          </li>
          <li>
            <h3>Creator</h3>
            <span v-if="image.creator">
              <a :href="image.creator_url">{{ image.creator }}</a>
            </span>
            <span v-else>
              Not Available
            </span>
          </li>
          <li>
            <h3>License</h3>
            <a class="photo_license" :href="ccLicenseURL">
            {{ fullLicenseName }}
            </a>
            <license-icons :image="image"></license-icons>
          </li>
          <li>
            <h3>Source</h3>
            <a class="photo_provider"
               :href="image.foreign_landing_url"
               target="blank"
               rel="noopener noreferrer">{{ image.provider }}</a>
          </li>
          <li>
            <h3>Dimensions</h3>
            <span> {{ imageWidth }} <span> X </span> {{ imageHeight }} pixels</span>
          </li>
        </ul>
        <section class="photo_usage">
          <header class="photo_info-header">
            <h2>
              Photo Attribution
            </h2>
          </header>
          <p class="photo_usage-attribution" ref="photoAttribution">
            <a :href="image.foreign_landing_url">"{{ image.title }}"</a>
            <span v-if="image.creator">
              by
              <a :href="image.creator_url">{{ image.creator }}</a>
            </span>
            is licensed under
            <a class="photo_license" :href="ccLicenseURL">
            {{ fullLicenseName }}
            </a>
          </p>
          <CopyButton :toCopy="HTMLAttribution" contentType="html">Copy to HTML</CopyButton>
          <CopyButton :toCopy="textAttribution" contentType="text">Copy to Text</CopyButton>
        </section>
        <section class="photo_usage">
          <header class="photo_info-header">
            <h2>
              Actions
            </h2>
          </header>
          <a class="add-to-list"
             @click.stop="onAddToImageList(image, $event)">
             Add to list
          </a>
        </section>
        <section class="photo_usage">
          <header class="photo_info-header">
            <h2>
              Share
            </h2>
          </header>
          <div :class="{ 'social-share': true, 'social-share__medium': isMedium }">
            <div class="share-list_social-items cell medium-6 large-4">
              <a class="social-button facebook"
                 target="_blank"
                 :href="`https://www.facebook.com/sharer/sharer.php?u=${getShareListURL}
                  &t==${shareText}&href=${getShareListURL}`"></a>
              <a class="social-button twitter"
                 target="_blank"
                 :href="`https://twitter.com/intent/tweet?text=${getShareText}`"
              ></a>
              <a class="social-button pinterest"
                 target="_blank"
                 :href="`https://www.pinterest.com/pin/create/bookmarklet/?media=${shareImageURL}&description=${getShareText}`"></a>
            </div>
          </div>
        </section>
      </section>
    </div>
</template>

<script>
import CopyButton from '@/components/CopyButton';
import LicenseIcons from '@/components/LicenseIcons';
import { SELECT_IMAGE_FOR_LIST } from '@/store/mutation-types';

export default {
name: 'social-share-list',
props: {
  isMedium: '',
  shareURL: '',
  shareText: '',
  imageURL: '',
},

  name: 'photo-details',
  props: ['image', 'breadCrumbURL', 'shouldShowBreadcrumb', 'query', 'imageWidth', 'imageHeight'],
  components: {
    CopyButton,
    LicenseIcons,
  },
  computed: {

  shareImageURL() {
    return this.imageURL;
  },
  getShareText() {
    return encodeURI(`I created an image list @creativecommons: ${this.shareURL}`);
  },
  getShareListURL() {
    return this.shareURL;
  },

    ccLicenseURL() {
      if (!this.image) {
        return '';
      }

      const image = this.image;
      const BASE_URL = 'https://creativecommons.org';
      let url = `${BASE_URL}/licenses/${image.license}/${image.license_version}`;
      let license = '';

      if (image.license) {
        license = image.license;
      }

      if (license === 'cc0') {
        url = `${BASE_URL}/publicdomain/zero/1.0/`;
      }
      else if (image.license === 'pdm') {
        url = `${BASE_URL}/publicdomain/mark/1.0/`;
      }

      return url;
    },
    fullLicenseName() {
      const license = this.image.license;
      const version = this.image.license_version;

      return license === 'cc0' ? `${license} ${version}` : `CC ${license} ${version}`;
    },
    textAttribution() {
      return () => {
        const image = this.image;
        const licenseURL = this.ccLicenseURL;
        const byCreator = image.creator ? `by ${image.creator}` : ' ';

        return `"${image.title}" ${byCreator}
                is licensed under ${this.fullLicenseName.toUpperCase()}. To view a copy of this license, visit: ${licenseURL}`;
      };
    },
    HTMLAttribution() {
      return () => {
        const image = this.image;
        const byCreator = image.creator ? `by <a href="${image.creator_url}">${image.creator}</a>` : ' ';

        return `<a href="${image.foreign_landing_url}">"${image.title}"</a>
                ${byCreator}
                is licensed under
                <a href="${this.ccLicenseURL}">
                  ${this.fullLicenseName.toUpperCase()}
                </a>`;
      };
    },
  },
  methods: {
    onGoBackToSearchResults() {
      this.$router.push({ name: 'browse-page', query: this.query });
    },
    onImageLoad(event) {
      this.$emit('onImageLoaded', event);
    },
    onAddToImageList(image, event) {
      const imageWithDimensions = image || {};
      imageWithDimensions.pageX = event.pageX;
      imageWithDimensions.pageY = event.pageY;

      this.$store.commit(SELECT_IMAGE_FOR_LIST, { image: imageWithDimensions });
    },
  },
};
</script>



<style lang="scss" scoped>
  @import '../styles/photodetails.scss';
  @import '../../node_modules/foundation-sites/scss/foundation';

  $social-button-size: 3.125rem;
  $social-button-border-width: 0.125rem;
  $social-button-font-size: 1.5625rem;
  $social-button-line-height: 2em;
  $social-button-border-radius: 1.6875rem;
  $social-button-transition: all 0.5s ease;
  $social-button-margin: 0.25rem;

  $social-brand-facebook: #3b5998;
  $social-brand-twitter: #55acee;
  $social-brand-pinterest: #c32aa3;

  @mixin social-button($brand-color, $brand-icon) {
    background: $brand-color;

    &:before {
      background: url( '../assets/#{$brand-icon}');
      content: '';
      width: 24px;
      height: 24px;
      display: inline-block;
    }
  }

  .social-share{
    &__medium .social-button {
      width: $social-button-size / 1.5 !important;
      height: $social-button-size / 1.5 !important;
      font-size: $social-button-font-size / 2 !important;
      &:before {
        width: 12px;
        height: 12px;
      }
    }
  }

  .share-list_social-items {
    .social-button {
      display: inline-block;
      position: relative;
      cursor: pointer;
      width: $social-button-size;
      height: $social-button-size;
      border: $social-button-border-width solid transparent;
      padding: 0;
      text-decoration: none;
      text-align: center;
      color: $white;
      font-size: $social-button-font-size;
      font-weight: normal;
      line-height: $social-button-line-height;
      border-radius: $social-button-border-radius;
      transition: $social-button-transition;
      margin-right: $social-button-margin;
      margin-bottom: $social-button-margin;

      &.facebook {
        @include social-button($social-brand-facebook, 'facebook-logo_white.svg')
      }

      &.twitter {
        @include social-button($social-brand-twitter, 'twitter-logo_white.svg')
      }

      &.pinterest {
        @include social-button($social-brand-pinterest, 'pinterest-logo_white.svg')
      }
    }
  }

  .add-to-list {
    &:before {
      height: 13px;
      width: 13px;
      content: '';
      background: url('../assets/plus-icon-black.svg') no-repeat;
      opacity: .5;
      display: inline-block;
    }
  }
</style>

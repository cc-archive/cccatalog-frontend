<template>
  <div class="social-sharing">
    <header>
      <h3>{{ $t('shareimage') }}</h3>
    </header>

    <social-share-buttons
      :shareURL="shareURL"
      :imageURL="imageURL"
      :shareText="shareText">
    </social-share-buttons>
  </div>
</template>

<script>
import SocialShareButtons from '@/components/SocialShareButtons';

export default {
  name: 'image-social-share',
  props: ['image'],
  components: {
    SocialShareButtons,
  },
  data: () => ({
    // for SSR, initiates it as an empty value
    shareURL: '',
  }),
  computed: {
    imageURL() {
      return this.image.foreign_landing_url;
    },
    shareText() {
      return encodeURI(`I found an image through CC search @creativecommons: ${this.imageURL}`);
    },
  },
  mounted() {
    // for SSR, sets the value with window.location, which is only available on client
    this.shareURL = window.location.href;
  },
};
</script>

<i18n src="../locales/components/ImageSocialShare.json">
</i18n>

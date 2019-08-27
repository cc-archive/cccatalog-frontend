<template>
  <a :href="licenseUrl"
     class="photo-license-icons"
     target="_blank"
     rel="noopener noreferrer"
     @click.stop="() => false">
    <LicenseIconography :icon-list="licenseIcons"/>
  </a>
</template>

<script>
import {
  LicenseIconography,
} from '@creativecommons/vocabulary';

const LicenseIcons = {
  name: 'license-icons',
  components: {
    LicenseIconography,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    licenseUrl() {
      const image = this.image;
      if (!image) {
        return '';
      }

      let license = image.license;
      if (!license) {
        return '';
      }
      let licenseVersion = image.license_version;
      let category = 'licenses';

      if (license.toLowerCase() === 'cc0') {
        license = 'zero';
        licenseVersion = '1.0';
        category = 'publicdomain';
      }
      else if (license.toLowerCase() === 'pdm') {
        license = 'mark';
        licenseVersion = '1.0';
        category = 'publicdomain';
      }

      const baseUrl = 'https://creativecommons.org';
      return `${baseUrl}/${category}/${license}/${licenseVersion}`;
    },
    licenseIcons() {
      const license = this.image.license;
      if (license.toLowerCase() === 'cc0') {
        return ['', 'zero'];
      }
      if (license.toLowerCase() === 'pdm') {
        return ['pd'];
      }
      return [
        '',
        ...license.split('-').map(attribute => attribute.toLowerCase()),
      ];
    },
  },
};

export default LicenseIcons;
</script>

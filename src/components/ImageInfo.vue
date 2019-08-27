<template>
  <div class="information">
    <header>
      <h3>{{ $t('imageinformation') }}</h3>
    </header>

    <Table class="info"
           color="blue"
           shade="dark"
           is-striped>
      <template #head>
        <tr>
          <TableCell is-heading>{{ $t('table.attribute') }}</TableCell>
          <TableCell is-heading>{{ $t('table.value') }}</TableCell>
        </tr>
      </template>

      <template #default>
        <tr>
          <TableCell is-heading>{{ $t('table.title') }}</TableCell>
          <TableCell>{{ image.title }}</TableCell>
        </tr>

        <tr>
          <TableCell is-heading>{{ $t('table.creator') }}</TableCell>
          <TableCell>
            <span v-if="image.creator">
          <a v-if="image.creator_url" :href="image.creator_url">{{ image.creator }}</a>
          <span v-else>{{ image.creator }}</span>
        </span>
            <span v-else>
          Not Available
        </span>
          </TableCell>
        </tr>

        <tr>
          <TableCell is-heading>{{ $t('table.license') }}</TableCell>
          <TableCell>
            <a class="photo_license" :href="ccLicenseURL">
              {{ fullLicenseName.toUpperCase() }}
            </a>
            <license-icons :image="image"></license-icons>
          </TableCell>
        </tr>

        <tr>
          <TableCell is-heading>{{ $t('table.source') }}</TableCell>
          <TableCell>
            <a class="photo_provider"
               :href="image.foreign_landing_url"
               target="blank"
               rel="noopener noreferrer">
              <ImageView :alternate-text="image.provider"
                         :source="providerLogo"
                         size="small"
                         is-centered/>
              {{ image.provider }}
            </a>
          </TableCell>
        </tr>

        <tr>
          <TableCell is-heading>{{ $t('table.dimensions') }}</TableCell>
          <TableCell>
            {{ imageWidth }} &times; {{ imageHeight }} {{ $t('table.pixels') }}
          </TableCell>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script>
import {
  ImageView,
  Table,
  TableCell,
} from '@creativecommons/vocabulary';

import LicenseIcons from '@/components/LicenseIcons';
import getProviderLogo from '@/utils/getProviderLogo';

export default {
  name: 'image-info',
  props: ['image', 'ccLicenseURL', 'fullLicenseName', 'imageWidth', 'imageHeight'],
  components: {
    ImageView,
    Table,
    TableCell,

    LicenseIcons,
  },
  computed: {
    providerLogo() {
      return getProviderLogo(this.image.provider_code);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@creativecommons/vocabulary/tokens';

  .information {
    a {
      color: $color-blue-dark;

      &:hover {
        color: $color-blue-darker;
      }
    }
  }
</style>

<i18n src="../locales/components/ImageInfo.json">
</i18n>

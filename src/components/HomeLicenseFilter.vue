<template>
  <div class="home-license-filter">
    <span class="intro">{{ $t('want') }}:</span>

    <div v-for="(licenseType, index) in licenseTypes"
         :key="index"
         class="license-filters">
      <ChoiceField v-model="licenses"
                   :id="licenseType.code"
                   :value="licenseType.code"
                   color="blue"
                   shade="dark"
                   is-basic/>
      <label :for="licenseType.code">
        {{ $t(licenseType.code) }}
      </label>
    </div>
  </div>
</template>

<script>
import {
  ChoiceField,
} from '@creativecommons/vocabulary';

import { SET_QUERY } from '@/store/mutation-types';

export default {
  name: 'license-filter',
  components: {
    ChoiceField,
  },
  data() {
    return {
      licenseTypes: [
        {
          code: 'commercial',
          checked: false,
        },
        {
          code: 'modification',
          checked: false,
        },
      ],
      licenses: [],
    };
  },
  watch: {
    licenses(val) {
      const filter = val.join(',');
      this.$store.commit(SET_QUERY, {
        query: {
          lt: filter,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@creativecommons/vocabulary/tokens";

  .home-license-filter {
    display: inline-block;

    text-align: left;

    margin-top: $space-normal;

    .intro {
      display: block;
    }

    .license-filters {
      display: inline-block;

      margin: $space-zero $space-normal;

      .choice-field {
        margin-left: $space-zero;
        margin-right: $space-zero;
      }
    }
  }
</style>

<i18n src="../locales/components/HomeLicenseFilter.json">
</i18n>

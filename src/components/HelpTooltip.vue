<template>
  <tooltip :tooltip="tooltip" tooltipPosition="top">
    <span title="tooltip">
      <FontAwesomeIcon :icon="['fas', 'question-circle']"/>
    </span>
  </tooltip>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Tooltip from '@/components/Tooltip';

library.add(faQuestionCircle);

export default {
  name: 'help-tooltip',
  props: {
    tooltip: {
      type: String,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,

    Tooltip,
  },
};
</script>

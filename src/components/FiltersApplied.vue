<template>
  <section class="padding-normal">
    <span class="caption">Filter by</span>
    <filter-tag v-for="({label, type }, index) in tags"
                :key= index
                filterType = "type"
    >
    {{ label }}
    </filter-tag>
  </section>
</template>

<script>
import FilterTag from './FilterTagButton';

export default {
  name: 'filters-applied',
  components: {
    FilterTag,
  },
  computed: {
    tags() {
      return this.$store.state.filterTags;
    },
  },
};
</script>

<style lang="scss" scoped>
.caption {
  display: inline-block;
  margin-right: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
}
</style>

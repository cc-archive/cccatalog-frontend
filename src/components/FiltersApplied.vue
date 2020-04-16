<template>
  <div class="filter-btns">
      <span>Filter by</span>
      <button v-for="({label, type, display}, index) in tags" :key = index >{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: 'filters-applied',
  computed: {
    tags() {
      return this.$store.state.filterTags;
    },
  },
};
</script>

<style>
</style>

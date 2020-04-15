<template>
  <div class="filters padding-vertical-big padding-left-big padding-right-normal">
    <div class="filters-title" @click.prevent="toggleFilterVisibility">
      <span>{{ title }}</span>
      <button class="filter-visibility-toggle is-white padding-vertical-small">
        <i v-if="filtersVisible"
           class="icon angle-up rotImg is-size-5 has-text-grey-light"
           title="toggle filters visibility" />
        <i v-else
           class="icon angle-down is-size-5 has-text-grey-light"
           title="toggle filters visibility" />
      </button>
    </div>
    <template v-if="filtersVisible">
    <div v-for="(item, index) in options" :key="index" class="margin-top-small">
      <label class="checkbox" :for="item.code">
        <div class="is-flex">
        <input type="checkbox"
             class="filter-checkbox margin-top-smaller"
             :id="item.code"
             :key="index"
             :checked="item.checked"
             :disabled="disabled"
             @change="onValueChange" />
        <div v-if="filterType === 'licenses'" class="margin-top-smaller margin-left-small icons">
        <i v-if="item.code === 'cc0' || 'pdm' || 'by' || 'by-sa' ||
                                 'by-nc' || 'by-nd' || 'by-nc-sa' || 'by-nc-nd'"
                                 :class="item.icon1" />
        <i v-if="item.code === 'by-sa' || 'by-nc' || 'by-nd'
                                 || 'by-nc-sa' || 'by-nc-nd'"
                                 :class="item.icon2" />
        <i v-show="item.code === 'by-nc-sa' || 'by-nc-nd'"
                                 :class="item.icon3" />
        </div>
        <div v-if="filterType === 'licenses'" class="margin-top-smaller margin-left-bigger name">
        {{ item.name }}
        </div>
        <div v-else class="margin-left-small other-filters" >
        {{ item.name }}
        </div>
        </div>
        </label>
        <img v-if="filterType === 'licenses'" class="question-mark" :src="item.img" />
        <img v-if="item.code == 'tall'"
                                 class="margin-right-small"
                                 :src="item.img" />
        <img v-if="item.code == 'wide'"
                                 class="margin-right-smaller"
                                 :src="item.img" />
        <img v-if="item.code == 'square'"
                                 class="margin-right-small"
                                 :src="item.img" />
    </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'filter-check-list',
  props: ['options', 'title', 'filterType', 'disabled'],
  data() {
    return { filtersVisible: false };
  },
  methods: {
    onValueChange(e) {
      console.log(e.target);
      this.$emit('filterChanged', { code: e.target.id, filterType: this.$props.filterType });
    },
    toggleFilterVisibility() {
      this.filtersVisible = !this.filtersVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  border-bottom: 2px solid rgb(245, 245, 245);
}
.filters-title {
  font-size: 1.250em;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  cursor: pointer;
}
.filter-visibility-toggle {
  float: right;
  cursor: pointer;
  background: none;
  border: none;
}
label {
  color: #333333;
}
img {
 float: right;
}
i.icon {
  margin-left: 3px;
  font-weight: 500;
}
.icons {
  width:65px;
}
.question-mark {
  width: 25px;
}
.name {
  width: 155px;
}
</style>

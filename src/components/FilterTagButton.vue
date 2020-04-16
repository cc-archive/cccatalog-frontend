<template>
  <button>
    <span class="tag-label">
      <slot></slot>
    </span>
    <img class="cross-icon"
         src="../assets/cross-icon.svg"
    >
  </button>
</template>

<script>
export default {
  name: 'filter-tag',
};
</script>

<style lang="scss" scoped>
button {
  width: auto;
  height: 29px;
  background: #FFFFFF;
  border: 2px solid #D8D8D8;
  box-sizing: border-box;
  border-radius: 300px;
  text-align: center;
  color: #787878;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  margin: 8px;
  vertical-align: middle;
}

.tag-label {
  padding: 5px 6px 5px 14px;
}

img{
  width: 10.31px;
  height: 10.31px;
}
</style>

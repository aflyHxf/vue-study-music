<template>
  <div class="loading-container">
    <div class="loading">
      <img width="24" height="24" src="./loading.gif" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  .loading {
    width: 100%;
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>

<template>
  <div class="slider" ref="slide">
    <div class="slider-group">
      <div v-for="item of recommends" class="slider-item" :key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="" />
        </a>
      </div>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="num in nums"
        :key="num"
        :class="{ active: currentPageIndex === num - 1 }"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
BScroll.use(Slide);

export default {
  props: {
    recommends: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      nums: 0,
      currentPageIndex: 0,
    };
  },
  beforeDestroy() {
    this.slide.destroy();
  },
  methods: {
    init() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        slide: true,
        momentum: false,
        bounce: false,
        probeType: 3,
      });
      this.slide.on("slideWillChange", (page) => {
        this.currentPageIndex = page.pageX;
      });
      this.nums = this.recommends.length;
    },
  },
  watch: {
    recommends(newValue) {
      if (newValue.length) {
        setTimeout(() => {
          this.init();
        }, 20);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>

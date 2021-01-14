<template>
  <scroll
    class="listview"
    :list="singers"
    :probe-type="3"
    :listen-scroll="true"
    @scroll="scroll"
    ref="listView"
  >
    <ul>
      <li
        v-for="(group, index) of singers"
        class="list-group"
        :key="index"
        ref="listGroup"
      >
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item of group.items"
            class="list-group-item"
            :key="item.id"
          >
            <img class="avatar" v-lazy="item.avatar" alt="" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop
    >
      <ul>
        <li
          class="item"
          :class="{ current: currentIndex === index }"
          v-for="(item, index) of shortcutList"
          :data-index="index"
          :key="index"
        >
          {{ index === 0 ? item.slice(0, 1) : item }}
        </li>
      </ul>
    </div>

    <div class="list-fixed" ref="listFixed" v-show="fixedTitle">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
    <loading v-if="!singers.length"></loading>
  </scroll>
</template>
<script>
import Scroll from "../scroll/Scroll";
import { getData } from "../../common/js/dom";
import Loading from '../loading/Loading.vue';
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;

export default {
  props: {
    singers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1,
    };
  },
  created() {
    // 定义触摸容器
    this.touche = {};
  },
  computed: {
    shortcutList() {
      return this.singers.map((item) => item.title);
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.shortcutList[this.currentIndex];
    },
  },
  methods: {
    onShortcutTouchStart(e) {
      // 获取touch开始位置的index
      const anchorIndex = parseInt(getData(e.target, "index"));
      // 获取触摸 touchstart 的y值和索引
      this.touche.startY = e.touches[0].pageY;
      this.touche.anchorIndex = anchorIndex;
      // 滚动到对应的列表
      this._scrollTo(anchorIndex);
    },

    onShortcutTouchMove(e) {
      // 获取触摸移动的y值
      this.touche.moveY = e.touches[0].pageY;
      // 获取开始到结束的移动li元素的个数
      const delta = parseInt(
        (this.touche.moveY - this.touche.startY) / ANCHOR_HEIGHT
      );
      const anchorIndex = this.touche.anchorIndex + delta;
      // 进行移动到对应的li
      this._scrollTo(anchorIndex);
    },

    scroll(y) {
      this.scrollY = y;
    },

    _scrollTo(index) {
      if (!index && index !== 0) return;
      // 规定index范围 ，最小为0 最大为 this.$refs.listGroup.length - 1;
      if (index < 0) {
        index = 0;
      } else if (index > this.$refs.listGroup.length - 1) {
        index = this.$refs.listGroup.length - 1;
      }
      this.scrollY = this.listHeight[index];
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);
    },

    // 当scroll的数据 更新时 重新计算 listGroup的高度
    _calculateHeight() {
      // 获取 listGroup DOM节点
      const list = this.$refs.listGroup;
      // 声明装载所有li高度数值的容器 this.listHeight 和初始高度 0
      this.listHeight = [];
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0, l = list.length; i < l; i++) {
        const item = list[i];
        // 高度累加
        height += item.clientHeight;
        // push
        this.listHeight.push(height);
      }
    },
  },
  watch: {
    singers() {
      setTimeout(() => {
        this._calculateHeight();
      }, 30);
    },
    scrollY(newY) {
      const list = this.listHeight;
      // 滚动到头部向上
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 滚动到中间的时候
      for (let i = 0; i < list.length - 1; i++) {
        const heightTop = list[i];
        const heightBottom = list[i + 1];
        if (-newY >= heightTop && -newY < heightBottom) {
          this.currentIndex = i;
          this.diff = heightBottom + newY;
          return;
        }
      }
      // 最尾  由热(0) ---> Y(length-2) list.length - 2;
      this.currentIndex = list.length - 2;
    },
    diff(newVal) {
      const fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (fixedTop === this.fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.listFixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    },
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
</style>

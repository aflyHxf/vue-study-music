<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper">
        <div class="play" v-show="songs.length" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :probe-type="3"
      :listen-scroll="true"
      @scroll="scroll"
      :list="songs"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
    <loading v-if="!songs.length"></loading>
  </div>
</template>

<script>
import Loading from "../../base/loading/Loading.vue";
import Scroll from "../../base/scroll/Scroll.vue";
import SongList from "../../base/song-list/SongList.vue";
import { prefixStyle } from "../../common/js/dom";

const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");

const RESERVED_HEIGHT = 40;

export default {
  props: {
    bgImage: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    songs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scrollY: -1,
    };
  },
  computed: {
    bgStyle() {
      return `background-image: url('${this.bgImage}')`;
    },
  },
  methods: {
    scroll(y) {
      this.scrollY = y;
    },
    back() {
      this.$router.back();
    },
  },
  mounted() {
    // 将scroll的top 等于 图片高
    this.bgImageClientHeight = this.$refs.bgImage.clientHeight;
    this.minTranslateY = -this.bgImageClientHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.bgImageClientHeight}px`;
  },
  watch: {
    scrollY(newY) {
      // 取大小
      const minTranslateY = Math.max(newY, this.minTranslateY);
      const _style = this.$refs.bgImage.style;

      // 上面的情况会将头部的歌手名和返回按钮盖住，所以需要调整图片的zIndex和高度为RESERVED_HEIGHT;
      this.$refs.layer.style[
        transform
      ] = `translate3d(0,${minTranslateY}px, 0)`;
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      const precent = Math.abs(newY / this.bgImageClientHeight);
      if (newY > 0) {
        zIndex = 10;
        scale = 1 + precent;
      } else {
        blur = Math.min(precent * 20, 20);
      }

      this.$refs.filter.style[backdrop] = `blur(${blur})`;

      if (newY < minTranslateY) {
        zIndex = 10;
        _style.paddingTop = 0;
        _style.height = RESERVED_HEIGHT + "px";
        this.$refs.playBtn.style.display = "none";
      } else {
        _style.paddingTop = "70%";
        _style.height = 0;
        this.$refs.playBtn.style.display = "";
      }
      _style.zIndex = zIndex;
      _style[transform] = `scale(${scale})`;
    },
  },
  components: { Scroll, SongList, Loading },
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixin.scss";

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
  }
}
</style>

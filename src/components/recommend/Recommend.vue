<template>
  <div class="recommend">
    <div class="recommend-content">
      <Scroll :list="discList">
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider :recommends="recommends" />
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item of discList" class="item" :key="item.dissid">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="" />
              </div>
              <div class="text">
                <p class="name" v-html="item.creator.name"></p>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
    <Loading v-if="!discList.length" />
  </div>
</template>

<script>
import Scroll from "../../base/scroll/Scroll";
import Slider from "../../base/slider/Slider";
import Loading from "../../base/loading/Loading";
import { ERR_OK } from "../../api/config";
import { getRecommend, getDiscList } from "../../api/recommend";
export default {
  data() {
    return {
      recommends: [],
      discList: [],
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
  },
  components: {
    Slider,
    Scroll,
    Loading,
  },
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .recommend-list {
    .list-title {
      height: 65px;
      line-height: 65px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-theme;
    }
    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0 20px 20px 20px;
      .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: $font-size-medium;
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .desc {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>

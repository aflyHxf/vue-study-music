<template>
  <transition appear name="slide">
    <div class="singer-detail">这是歌手详情页</div>
  </transition>
</template>

<script>
import { getSingerDetail } from "../../api/singer";
import { mapGetters } from "vuex";
import { ERR_OK } from "../../api/config";

export default {
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    ...mapGetters(["singer"]),
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      // 判断是否存在singer.id
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

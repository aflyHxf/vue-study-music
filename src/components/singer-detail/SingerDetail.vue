<template>
  <transition appear name="slide">
    <div class="singer-detail">
      <music-list
        :bg-image="bgImage"
        :title="title"
        :songs="songs"
      ></music-list>
    </div>
  </transition>
</template>

<script>
import { getSingerDetail } from "../../api/singer";
import { mapGetters } from "vuex";
import { ERR_OK } from "../../api/config";
import {
  createSong,
  isValidMusic,
  processSongsUrl,
} from "../../common/js/Song";
import MusicList from "../music-list/MusicList.vue";

export default {
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    bgImage() {
      return this.singer.avatar;
    },
    title() {
      return this.singer.name;
    },
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
          processSongsUrl(this._normalizeSong(res.data.list)).then((songs) => {
            this.songs = songs;
          });
        }
      });
    },
    _normalizeSong(list) {
      let ret = [];
      list.forEach((item) => {
        const { musicData } = item;
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },
  components: {
    MusicList,
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

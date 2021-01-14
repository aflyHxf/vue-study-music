<template>
  <div class="singer">
    <list-view :singers="singers"></list-view>
  </div>
</template>

<script>
import ListView from "../../base/listview/ListView";
import { ERR_OK } from "../../api/config";
import { getSingerList } from "../../api/singer";
import Singer from "../../common/js/Singer";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
  data() {
    return {
      singers: [],
      isShow: false,
    };
  },

  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: [], // 热门的歌手列表
        },
      };
      // 遍历list
      list.forEach((item, index) => {
        // 小于10为热门
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
            })
          );
        }

        const key = item.Findex; // z zjl
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [], // key的歌手列表
          };
        }

        // 添加key的歌手
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          })
        );
      });

      // 因为对象是无序的，所以转为有序的数组进行遍历
      let hot = [];
      let ret = [];
      for (let i in map) {
        if (map[i].title.match(/[A-Za-z]/)) {
          ret.push(map[i]);
        } else if (map[i].title === HOT_NAME) {
          hot.push(map[i]);
        }
      }

      ret = ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return [...hot, ...ret];
    },
  },
  components: {
    ListView,
  },
};
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>

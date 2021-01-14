<template>
  <div class="scroll-wrapper" ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },

    probeType: {
      type: Number,
      defalut: 0
    },

    listenScroll: {
      type: Boolean,
      defalut: false
    }
  },
  mounted() {
    setTimeout(()=>{
      this.init()
    },20)
  },
  beforeDestroy() {
    this.scroll && this.scroll.destroy()
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType
      })
      if(this.listenScroll) {
        this.scroll.on('scroll', ({ y }) => {
          this.$emit('scroll',parseInt(y))
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    list() {
      setTimeout(()=> {
        this.refresh()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>

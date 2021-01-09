<template>
  <div class="scroll-wrapper" ref="scroll">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
export default {
  props: {
    list: {
      type:Array,
      default: ()=>[],
      required: true
    }
  },
  beforeDestroy() {
    this.bs.destroy()
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true
      })
      // this.bs.on('scrollStart', () => {
      //   console.log('scrollStart-')
      // })
      // this.bs.on('scroll', ({ y }) => {
      //   console.log('scrolling-' + y)
      // })
      // this.bs.on('scrollEnd', (pos) => {
      //   console.log(pos)
      // })
    }
  },
  watch: {
    list(newValue) {
      if(newValue.length) {
        setTimeout(()=>{
          this.init()
        }, 20)
      }
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

<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
export default {
  props: {
    list: {
      type:Array,
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
      if(!this.$refs.scroll) return;
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
        this.init()
      }, 30)
    }
  }
}
</script>

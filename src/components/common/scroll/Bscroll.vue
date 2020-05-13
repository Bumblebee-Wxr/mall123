<template>

  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Bscroll",
  data () {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted () {

    // 创建 BetterScroll 对象
    this.scroll = new BScroll( this.$refs.wrapper, {
      pullUpLoad: this.pullUpLoad, //上拉加载更多
      probeType: this.probeType,  //监听滚动距离
      click: true  //内部点击事件是否可用
    })
 
    // 监听滚动事件
    if (this.probeType == 3){
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('position', position)
      })
    }

    // 监听上拉加载
    if (this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        finishPullUp()
      })
    }
    
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)  // scrollTop方法：前两个参数是移动到的位置，第三个参数是移动时长
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
  }
}
</script>

<style scoped>
</style>
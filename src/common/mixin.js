import { debounce } from '@/common/utils'

export const goodsItemMixin = {
  data() {
    return {
      goodsItemListener: null
    }
  },
  mounted () {
    // console.log('mixin')
    // 监听首页商品图片加载完成
    const refresh = debounce(this.$refs.Bscroll.refresh, 500)
    this.goodsItemListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.goodsItemListener)
  }
}


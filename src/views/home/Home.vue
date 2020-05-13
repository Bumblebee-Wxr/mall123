<template>
  <div id="home"> 
    <nav-bar class="home-navbar">
      <div slot="center"> 首页 </div>
    </nav-bar>

    <tab-contral class="tab-contral" 
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabContral2"
      v-show="isTabShow"
      ></tab-contral>

    <bscroll class="content" ref="Bscroll" :probe-type="3" :pull-up-load="true" @position="scrollEvent" @pullingUp="pullingUp">
      <home-swiper class="home-swiper" :banners="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommends="recommend"></home-recommend>
      <featrue-view></featrue-view>
      <tab-contral class="tab-contral" 
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabContral1"
        ></tab-contral>
      <goods-list refs="goodsWrapper" :goods="showGoods"></goods-list>
    </bscroll>

    <back-top @click.native="topClick" v-show="isTop"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childView/HomeSwiper'
import HomeRecommend from './childView/HomeRecommend'
import FeatrueView from './childView/FeatrueView'

import NavBar from "@/components/common/navbar/NavBar"
import TabContral from '@/components/common/tabcontral/TabContral'
import GoodsList from '@/components/content/goods/GoodsList'
import Bscroll from '@/components/common/scroll/Bscroll'
import BackTop from '@/components/content/backtop/BackTop'

import { getHomeMultidata,getHomeGoods } from '@/network/home'
import { debounce } from '@/common/utils'
import { goodsItemMixin,banckTop } from '@/common/mixin'



export default {
  name: "Home",
  data () {
    return {
      banner: null,
      recommend: null,
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      BScroll: '',
      isTop: false,
      tabTop: 0,
      isTabShow: false,
      recodeScrollTop: 0
    };
  },
  mixins: [goodsItemMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatrueView,
    TabContral,
    GoodsList,
    Bscroll,
    BackTop
  },
  
  created() {
    // 请求首页数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
  },
  activated () {
    // 激活 Home 时，让页面滚动到上次浏览的位置
    this.$refs.Bscroll.scrollTo(0, this.recodeScrollTop)  
    this.$refs.Bscroll.refresh()
  },
  deactivated () {
    // 离开 Home 时，记录滚动距离
    this.recodeScrollTop = this.$refs.Bscroll.scroll.y
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageLoad)
  },
  methods: {
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.Bscroll.finishPullUp()
      })
    },

    /**
     * 事件监听
     */
    tabClick(index) {
      switch( index ) {
        case 0: 
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2: 
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabContral1.currentIndex = index;
      this.$refs.tabContral2.currentIndex = index;

    },
    
    scrollEvent(position) {
      // 判断 置顶 是否显示
      this.isTop = position.y < -1000
      
      // 判断tabbar的高度
      this.isTabShow = (-position.y) > this.tabTop

    },
    swiperImgLoad() {
      this.tabTop = this.$refs.tabContral1.$el.offsetTop
    },

    // 上拉加载更多
    pullingUp() {
      this.getHomeGoods(this.currentType)
      this.$refs.Bscroll.finishPullUp()
      this.$refs.Bscroll.refresh()
    },
    
    topClick() {
      // 这里 scrollTo 是 Bscroll 组件里重新封装的scrollTo方法
      this.$refs.Bscroll.scrollTo(0, 0)  
    },
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-navbar{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99; */
  }

  .tab-contral{
    position: relative;
    z-index: 99;
  }

  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
  }

</style>
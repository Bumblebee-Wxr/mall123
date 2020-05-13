<template>
  <div id="details">
    <details-nav-bar ref="navbar" class="detail-nav" :newIndex="newIndex" @clickTitle="clickTitle"></details-nav-bar>
    
    <bscroll class="content" ref="Bscroll" :probe-type="3" :pull-up-load="true" @position="scrollEvent">
      <details-swiper :topImages="topImages"></details-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </bscroll>

    <detail-tab-bar @addToCart="addToCart"></detail-tab-bar>
    <back-top @click.native="topClick" v-show="isTop"></back-top>

  </div>
</template>

<script>
import DetailsNavBar from './childViews/DetailsNavBar'
import DetailsSwiper from './childViews/DetailsSwiper'
import DetailBaseInfo from './childViews/DetailBaseInfo'
import DetailShopInfo from './childViews/DetailShopInfo'
import DetailGoodsInfo from './childViews/DetailGoodsInfo'
import DetailParamInfo from './childViews/DetailParamInfo'
import DetailCommentInfo from './childViews/DetailCommentInfo'
import DetailRecommendInfo from './childViews/DetailRecommendInfo'
import DetailTabBar from './childViews/DetailTabBar'

import Bscroll from '@/components/common/scroll/Bscroll'
import BackTop from '@/components/content/backtop/BackTop'

import { getDetails,getRecommend,Goods,Shop,GoodsParam } from 'network/details'
import { debounce } from '@/common/utils'
import { goodsItemMixin,backTop } from '@/common/mixin'


export default {
  name: "Details",
  data () {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      navBarTop: [],
      getNavbarTop: null,
      newIndex: 1,
      isTop: false,
      tabTop: 0,
      isTabShow: false,
    };
  },
  mixins: [goodsItemMixin],
  components: {
    DetailsNavBar,
    DetailsSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Bscroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailTabBar,
    BackTop
  },
  created () {
    // this.iid = this.$route.query.iid
    this.iid = this.$route.params.iid
    console.log(this.iid)

    this.getDetails(this.iid)
    this.getRecommend()

    this.getNavbarTop = debounce(() => {
      this.navBarTop = []
      this.navBarTop.push(0)
      this.navBarTop.push(this.$refs.param.$el.offsetTop)
      this.navBarTop.push(this.$refs.comment.$el.offsetTop)
      this.navBarTop.push(this.$refs.recommend.$el.offsetTop)
      this.navBarTop.push(Number.MAX_VALUE)
    }, 500)
  },
  mounted () {
  },
  destroyed () {
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageLoad)
  },
  methods: {
    getDetails(iid) {
      getDetails(iid).then(res => {
        const data = res.result
        // console.log(data)
        // 获取轮播图
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages)
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 获取商品展示信息
        this.detailInfo = data.detailInfo
        // 保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        
      })
    },
    imgLoad() { 
      this.$refs.Bscroll.refresh()
      this.getNavbarTop()
    },
    getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    clickTitle(index) {
      this.$refs.Bscroll.scrollTo(0, -this.navBarTop[index], 300)
    },
    scrollEvent(position) {
      const positionY = -position.y

      // 普通做法
      // if ( positionY > 0 && positionY < this.navBarTop[1] ) {
      //   this.newIndex = 0
      // } else if( positionY > this.navBarTop[1] && positionY < this.navBarTop[2] ){
      //   this.newIndex = 1
      // } else if ( positionY > this.navBarTop[2] && positionY < this.navBarTop[3] ){
      //   this.newIndex = 2
      // } else if ( positionY > this.navBarTop[3] ) {
      //   this.newIndex = 3
      // }
      // this.$refs.navbar.currentIndex = this.newIndex

      //技巧做法
      let length = this.navBarTop.length
      for (let i = 0; i < length-1 ; i++) {
        if (this.newIndex !== i && positionY >= this.navBarTop[i] && positionY < this.navBarTop[i+1]) {
          this.newIndex = i;
          this.$refs.navbar.currentIndex = this.newIndex          
        }
      }

      // bancktop组件
      this.isTop = position.y < -1000
      this.isTabShow = (-position.y) > this.tabTop
    },
    topClick() {
      // 这里 scrollTo 是 Bscroll 组件里重新封装的scrollTo方法
      this.$refs.Bscroll.scrollTo(0, 0)  
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 修改 stroe 中的值，要通过 mutications 修改
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res)
      })


    }
  }
}
</script>

<style scoped>
  #details{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
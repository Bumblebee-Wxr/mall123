<template>
  <div class="item-box">
    <div class="item-selector">
      <check-button @click.native="checkedChange" :value="itemInfo.checked"></check-button>
    </div>
    <div class="goods-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="goods-info">
      <div class="goods-title">{{itemInfo.title}}}</div>
      <div class="goods-desc">商品介绍：{{itemInfo.desc}}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">数量：{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name: "CartGoodsList",
  props: {
    itemInfo: Object
  },
  components: {
    CheckButton
  },
  created () {
    console.log(this.itemInfo)
  },
  methods: {
    checkedChange: function () {
      // console.log(this.itemInfo.checked)
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
}
</script>

<style scoped>
  .item-box{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector{
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-box .goods-img{
    padding: 5px;
  }
  .item-box .goods-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .goods-title, .goods-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .goods-info .goods-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
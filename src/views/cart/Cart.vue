<template>
  <div id="cart">
    <cart-navbar class="cart-navbar"></cart-navbar>

    <bscroll class="content" ref="Bscroll" :probe-type="3" :pull-up-load="true">
      <cart-list :cart-list="cartList"></cart-list>
    </bscroll>

    <bottom-bar></bottom-bar>

  </div>
</template>

<script>
import CartNavbar from './childViews/CartNavbar'
import CartList from './childViews/CartList'
import BottomBar from './childViews/BottomBar'

import Bscroll from '@/components/common/scroll/Bscroll'


export default {
  name: "Cart",
  data () {
    return {
    }
  },
  components: {
    CartNavbar,
    CartList,
    BottomBar,
    Bscroll
  },
  computed: {
    cartList() {
      return this.$store.getters.cartList
    }
  },
  activated () {
    this.$refs.Bscroll.refresh
  }
  
}
</script>

<style scoped>
  #cart{
    position: relative;
    height: 100vh;
  }
  .cart-navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 133px);
    overflow: hidden;
  }
</style>
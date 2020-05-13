<template>
  <div id="cart-navbar">
    <nav-bar class="home-navbar">
      <div slot="center"> 购物车({{count}}) </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import {mapGetters} from 'vuex'

export default {
  name: "CartNavbar",
  data () {
    return {
    };
  },
  components: {
    NavBar
  },
  computed: {
    // 两种写法
    // ...mapGetters(['cartCount']),
    ...mapGetters({
      count: 'cartCount'
    })
  }
}
</script>

<style scoped>
  #cart-navbar{
    background-color: var(--color-tint);
    color: white;
  }
</style>
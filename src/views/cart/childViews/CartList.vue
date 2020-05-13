<template>
  <div>
    <cart-goods-list v-for="item in cartList" :key="item.iid" :item-info="item"></cart-goods-list>
  </div>
</template>

<script>
import CartGoodsList from './CartGoodsList'

export default {
  name: "CartList",
  data () {
    return {
    };
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    CartGoodsList
  },
}
</script>

<style scoped>
</style>
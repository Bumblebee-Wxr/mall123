<template>
    <tab-bar>
      <tab-bar-item path="/home" itemColor="#e8989a">
        <img slot="tab-item-img" src="@/assets/img/tabbar/home.svg" alt="">
        <img slot="tab-item-img-active" src="@/assets/img/tabbar/home-active.svg" alt="">
        <div slot="tab-item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" itemColor="#e8989a">
        <img slot="tab-item-img" src="@/assets/img/tabbar/category.svg" alt="">
        <img slot="tab-item-img-active" src="@/assets/img/tabbar/category-active.svg" alt="">
        <div slot="tab-item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" itemColor="#e8989a">
        <img slot="tab-item-img" src="@/assets/img/tabbar/shoppingcar.svg" alt="">
        <img slot="tab-item-img-active" src="@/assets/img/tabbar/shoppingcar-active.svg" alt="">
        <div slot="tab-item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" itemColor="#e8989a">
        <img slot="tab-item-img" src="@/assets/img/tabbar/profile.svg" alt="">
        <img slot="tab-item-img-active" src="@/assets/img/tabbar/profile-active.svg" alt="">
        <div slot="tab-item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<template>
  <div id="details-navbar">
    <nav-bar>
      <div slot="left" class="navbar-left" @click="goBack">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="details-title">
        <div v-for="(item,index) in titles" class="title" :class="{active: index == currentIndex}"
          @click="clickTitle(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"

export default {
  name: "DetailsNavBar",
  data () {
    return {
      titles: ['商品', '参数', '评价', '推荐'],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    clickTitle(index) {
      this.currentIndex = index
      this.$emit('clickTitle', index)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.details-title{
  display: flex;
  font-size: var(--font-size);
}
.title{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}

.navbar-left img{
  margin-top: 11px;
}
</style>
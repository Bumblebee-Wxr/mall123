<template>
<div>
    <swiper class="details-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</div>


</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper/index'

export default {
  name: "DetailsSwiper",
  data () {
    return {
    };
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
  
}
</script>

<style scoped>
  .details-swiper{
    height: 300px;
  }
</style>
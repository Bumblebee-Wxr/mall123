<template>
  <div class="tab-contral">
    <div v-for="item,index in titles" 
        class="tab-contral-item"
        :class="{active: index == currentIndex}"
        @click="tabClick(index)"
        >
      <span >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContral",
  data () {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-contral{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: white;
    z-index: 999;
  }
  .tab-contral-item{
    flex: 1;
  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 2px solid;
    padding: 0 3px 4px 3px;
    border-bottom-color: var(--color-high-text);
  }
</style>
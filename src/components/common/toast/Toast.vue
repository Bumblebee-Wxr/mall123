<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data () {
    return {
      isShow: false,
      message: ''
    };
  },
  // props: {
  //   message: {
  //     typs: String,
  //     default() {
  //       return ''
  //     }
  //   }
  // },
  methods: {
    show(message, duration) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 10px;
    border-radius: 3px;
    text-align: center;
  }
</style>
import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue) {
  console.log('执行了toast')

  const toastConstrustor = Vue.extend(Toast) // 创建组件构造器
  const toast = new toastConstrustor()  // 根据组件构造器，创建一个组件对象
  toast.$mount(document.createElement('div')) // 将组件手动挂载到斗个元素上
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj

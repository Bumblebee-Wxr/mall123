import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {
  addCart(context, payload) {
    new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(function(item){
        console.log(payload)
        return item.iid === payload.iid
      })
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADD_TO_CART, oldProduct)
        resolve('添加新商品')
      }
    })

    
  }
}
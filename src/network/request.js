import axios from 'axios'

export function request(config) {
  // 创建请求实例
  const instance1 = axios.create({
    
    timeout: 5000
  })

  // 拦截器
  // 请求拦截
  instance1.interceptors.request.use(aaa => {
    // console.log(aaa)
    return aaa // 必须 return 一个结果
  }, err => {
    // console.log(err)

  })
  // 响应拦截
  instance1.interceptors.response.use(res => {
    // console.log(res)
    return res.data // 必须 return 一个结果
  }, err => {
    // console.log(err)
  })


  return instance1(config)
}
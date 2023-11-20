// 添加拦截器
// request请求
// uploadfile请求

import { useMemberStore } from '@/stores'

// TODO:
//  1.非http开头补全请求路径
//  2.设置超时时间
//  3.添加小程序请求头标识
//  4.添加token请求标识

// 基础请求地址
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    //  1.非http开头补全请求路径
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    //  2.设置超时时间
    options.timeout = 10000

    //  3.添加小程序请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    //  4.添加token请求标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

module.exports = {
  plugins: {
    autoprefixer:{},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗宽度，对应设计稿的宽度
      viewportHeight: 667,  //视窗高度 可以不配置这个
      unitPrecision: 5, //指定px转换后的小数位数
      viewportUnit: 'vw', //指定转单的单位，建议vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, //小于或等于该值不转换
      mediaQuery: false //允许再媒体查询中转换px
    }
  }
}
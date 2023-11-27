const cdn = {
  css: [
    'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/nprogress/0.2.0/nprogress.css',
    'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vxe-table/3.3.15/style.css',
    'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vxe-table-plugin-element/1.11.2/style.min.css',
    'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/element-ui/0.0.18/index.min.css',
  ],
  js: [
    process.env.SHT_APP_TYPE === 'production'
      ? 'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vue/2.6.14/vue.min.js'
      : 'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vue/2.6.14/vue.js'
  ].concat([
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/better-scroll/2.4.2/core.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/better-scroll/2.4.2/mouse-wheel.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vue-router/3.5.1/vue-router.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vuex/3.6.2/vuex.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/axios/0.21.1/axios.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/echarts/5.2.1/echarts.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/xe-utils/3.3.3/xe-utils.umd.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vxe-table/3.3.15/index.umd.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vxe-table-plugin-element/1.11.2/index.umd.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/nprogress/0.2.0/nprogress.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/element-ui/0.0.18/index.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/hotkeys-js/3.8.7/hotkeys.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/dayjs/1.10.5/dayjs.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/vue-clipboard2/0.3.3/vue-clipboard.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/crypto-js/4.1.1/crypto-js.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/lodash/4.17.21/lodash.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/popperjs-core/2.10.1/popper.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/sortable/1.15.0/sortable.min.js',
      'https://bomman-web-cdn.oss-cn-shenzhen.aliyuncs.com/js/tinymce/5.0.16/tinymce.min.js',
    ]
  )
}

const externals = [
  {
    vue: 'Vue',
    lodash: '_',
    vuex: 'Vuex',
    axios: 'axios',
    dayjs: 'dayjs',
    echarts: 'echarts',
    'hotkeys-js': 'hotkeys',
    'nprogress': 'NProgress',
    'element-ui': 'ELEMENT',
    '@better-scroll/core': 'BScroll',
    '@better-scroll/mouse-wheel': 'MouseWheel',
    'xe-utils': 'XEUtils',
    'vue-router': 'VueRouter',
    'vxe-table': 'VXETable',
    'vxe-table-plugin-element': 'VXETablePluginElement',
    'vue-clipboard2': 'VueClipboard',
    'crypto-js': 'CryptoJS',
    'sortablejs': 'Sortable',
    '@popperjs/core': 'Popper',
  },
]

module.exports = {
  cdn,
  externals,
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
    devServer: {
    https: !process.env.npm_lifecycle_event.includes('ios'),
  },

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
})

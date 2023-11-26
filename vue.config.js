const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    devtool: false,
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 240000,
      }
    }
  }
})

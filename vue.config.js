const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http:127.0.0.1:8019',
        ws: false,
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  },
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync(path.resolve(__dirname, './src/common/style/index.scss'), 'utf-8')
      }
    }
  }
})

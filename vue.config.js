// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        src: path.resolve('src'),
        common: path.resolve('src/common'),
        components: path.resolve('src/components'),
        api: path.resolve('src/api'),
        base: path.resolve('src/base'),
        static: path.resolve('src/static')
      } // 别名配置
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'tslint-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {
        plugins: [
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('postcss-px2rem')({
            // 以设计稿750为例， 750 / 10 = 75
            // 180/16 = 11.25
            remUnit: 16
          })
        ]
      } // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0', // 允许外部ip访问
    port: 8080, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }
    // }, // 错误、警告在页面弹出
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true, // 允许websockets跨域
    //     // ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // } // 代理转发配置，用于调试环境
  },
  // 第三方插件配置
  pluginOptions: {}
}

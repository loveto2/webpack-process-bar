const path = require('path')
const {
  name
} = require('./package');
const theme = require('./theme');
const {
  getPaths,
  edit,
  appendWebpackPlugin
} = require('@rescripts/utilities')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)

const webpackConfig = {

  webpack: config => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    config.output.publicPath = process.env.NODE_ENV === 'production' ? '/micros/demo/' : '/',
    config.output.path = resolve('../../dist/micro/demo');

    config.resolve.extensions = ['.js', '.jsx']

    config.resolve.alias = {
      '@components': resolve('src/components'),
      '@config': resolve('src/config'),
      '@hooks': resolve('src/hooks'),
      '@redux': resolve('src/redux'),
      '@services': resolve('src/services'),
      // '@static': resolve('src/static'),
      '@utils': resolve('src/utils'),
      '@views': resolve('src/views'),
      '@shared': resolve('src/shared'),
    }

    return config;
  },

  devServer: _ => {
    const config = _;
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;
    // 配置代理服务
    config.proxy = {
      '/customization': {
        target: 'https://cmp-cj.nntest.cn',
        changeOrigin: true,
        secure: false,
      },
    }
    return config;
  },
};

const lessConfig = config => {
  const lessRegex = /\.less$/
  const styleLoaders = getPaths(
    // Styleloaders are in config.module.rules inside an object only containing the "oneOf" prop
    (inQuestion) => inQuestion && !!inQuestion.oneOf,
    config
  )
  edit(
    (section) => {
      const loaders = section.oneOf
      // New style loaders should be added near the end of loaders, but before file-loader
      const fileLoaderIndex = loaders.findIndex(section => section.loader && section.loader.includes('file-loader'))
      const lessLoader = {
        test: lessRegex,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[contenthash:base64:5]'
              },
            }
          },
          {
            loader: 'less-loader',
            options: {
              // sourceMap: NODE_ENV === 'production' && GENERATE_SOURCEMAP !== 'false',
              modules: true,
              javascriptEnabled: true,
              modifyVars: {
                ...theme
              }
            },
          }
        ]
      }
      const lessAntdLoader = {
        test: lessRegex,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              // sourceMap: NODE_ENV === 'production' && GENERATE_SOURCEMAP !== 'false',
              javascriptEnabled: true,
              modifyVars: {
                ...theme
              }
            },
          }
        ]
      }
      loaders.splice(fileLoaderIndex, 0, lessAntdLoader)
      loaders.splice(fileLoaderIndex, 0, lessLoader)
      return section
    },
    styleLoaders,
    config
  )

  return config
}

const processBarConfig = config => {
  const edited = appendWebpackPlugin(
    new ProgressBarPlugin(),
    config
    )
    return appendWebpackPlugin(
      new SpeedMeasurePlugin(),
      edited
    )
}

module.exports = [
  lessConfig,
  webpackConfig,
  processBarConfig
]
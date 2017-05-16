module.exports = {
  entry: './app/main',
  output: {
    filename: './app/build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
}

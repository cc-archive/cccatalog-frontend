const merge = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack-base-conf.js');

module.exports = merge(baseConfig, {
  // Point entry to your app's server entry file
  entry: {
    app: './src/serverEntry.js'
  },

  // For bundle renderer source map support
  devtool: 'source-map',

  // This tells the server bundle to use Node-style exports
  output: {
    libraryTarget: 'commonjs2'
  },
  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin({
      filename: 'server-bundle.json'
    })
  ]
});

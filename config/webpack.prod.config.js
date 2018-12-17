const merge = require('webpack-merge');
// eslint-disable-next-line
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'production',

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'static/[name].[chunkhash].js',
    chunkFilename: 'static/[name].[chunkhash].chunk.js',
  },

  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});

module.exports = {
  entry: {
    background: ['src/background.ts'],
    'content-scripts/host': 'src/content-scripts/host.ts',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]((?!(browser-polyfill)).*)[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
}

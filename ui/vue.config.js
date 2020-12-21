module.exports = {
  outputDir: '/Users/seraphim/code/kafkabox/api/public',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3030',
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};

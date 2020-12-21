module.exports = {
  outputDir: '/Users/seraphim/code/kafkabox/.build/sandbox/kafkabox/api/public',
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

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');
  var webpackConfig = require('./webpack.config.js');

  grunt.initConfig({
    webpack: {
      options: webpackConfig
    },
    'webpack-dev-server': {
      options: {
        webpack: webpackConfig,
        publicPath: webpackConfig.output.publicPath
      },
      start: {
        keepAlive: true,
        webpack: {
          devtool: 'eval-source-map',
          debug: true
        }
      }
    },
    watch: {
      app: {
        files: ['js/**/*.jsx'],
        tasks: ['webpack']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['webpack-dev-server:start', 'watch']);
};

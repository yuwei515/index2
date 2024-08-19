const postcssPresetEnv = require("postcss-preset-env");

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [postcssPresetEnv()],
  publicPath: './'
};

module.exports = config;

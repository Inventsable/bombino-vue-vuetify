module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "./",
  configureWebpack: {
    target: "node-webkit",
    node: false,
  },
  lintOnSave: false,
};

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/mastercarsrrz/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'mastercarsrrz'
      return args
    })
  }
}

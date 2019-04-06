module.exports = {
  plugins: [
    require('autoprefixer')({
      // browsers: ['last 5 versions']
      browsers: [ 'iOS >= 8',
        'Firefox >= 30',
        'Android >= 4.4']
    })
  ]
}

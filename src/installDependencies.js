
var npm = require('npm')
var Promise = require('bluebird')

var installAllDeps = function() {
  var install = Promise.promisify(npm.commands.install)
  return install()
}

module.exports = function(answers) {
  console.log('Installing dependencies...')
  var load = Promise.promisify(npm.load)
  return load()
    .then(installAllDeps)
    .then(function () {
      console.log('Dependencies installed!')
      return answers
    })
}

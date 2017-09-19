
var rimraf = require('rimraf')
var Promise = require('bluebird')

var rmdir = Promise.promisify(rimraf)

module.exports = function (answers) {
  return rmdir('.git')
    .then(function () {
      return answers
    })
}

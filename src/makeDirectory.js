
var fs = require('fs')
var Promise = require('bluebird')

var mkidr = Promise.promisify(fs.mkdir)

module.exports = function (answers) {
  return mkidr(answers.dirName)
    .then(function() {
      return answers
    })
}

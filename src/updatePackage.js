
var path = require('path')
var fs = require('fs')
var Promise = require('bluebird')

var readFile = Promise.promisify(fs.readFile)
var writeFile = Promise.promisify(fs.writeFile)

var packageFile = 'package.json'

function standardizeGitUri (git) {
  if (git.protocol === 'ssh') {
    return 'ssh://' + git.user + '@' + git.host + ':' + git.repo + '.git'
  } else if (git.protocol === 'https') {
    return 'https://' + git.host + '/' + git.repo
  } else {
    return ''
  }
}

function parsePackage(jsonBuffer) {
  return JSON.parse(jsonBuffer.toString())
}

function updatePackage (answers) {
  return function (package) {
    delete package.authors

    package.name = answers.dirName
    package.appName = answers.appName
    package.description = answers.description
    package.author = answers.author
    package.lisence = answers.lisence

    if (answers.git) {
      var git = answers.git
      var httpsUri = 'https://' + git.host + '/' + git.repo
      var standardizedUri = standardizeGitUri(git)
      package.repository = {
        type: 'git',
        url: 'git+' + standardizedUri
      }
      package.bugs = {
        url: httpsUri + '/issues'
      }
      package.homepage = httpsUri + '#readme'
    }

    return package
  }
}

function writePackage(package) {
  var json = JSON.stringify(package)
  return writeFile(packageFile, json)
}

module.exports = function (answers) {
  console.log('Updating package.json...')
  return readFile(packageFile)
    .then(parsePackage)
    .then(updatePackage(answers))
    .then(writePackage)
    .then(function() {
      console.log('package.json updated!')
      return answers
    })
}

module.exports.standardizeGitUri = standardizeGitUri
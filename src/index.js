
var getAnswers = require('./getAnswers')
var makeDirectory = require('./makeDirectory')
var cloneBase = require('./cloneBase')
var updatePackage = require('./updatePackage')
var generateReadme = require('./generateReadme')
var installDependencies = require('./installDependencies')
var deleteGitDir = require('./deleteGitDir')
var done = require('./done')
var error = require('./error')

var dirName = 'dirName'

function changeDirectory (answers) {
  process.chdir(answers.dirName)
  return answers
}

module.exports = function() {
  var returnAnswers
  return getAnswers()
    .then(makeDirectory)
    .then(cloneBase)
    .then(changeDirectory)
    .then(updatePackage)
    .then(generateReadme)
    .then(installDependencies)
    .then(deleteGitDir)
    .then(done)
    .catch(error)
}

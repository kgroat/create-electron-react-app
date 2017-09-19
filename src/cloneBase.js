
var spawn = require('./spawnHelper')

var gitUrl = 'https://github.com/kgroat/electron-react-starter'

module.exports = function (answers) {
  return spawn('git', ['clone', gitUrl, answers.dirName])
    .then(function() {
      console.log('Starter cloned!')
      return answers
    })
}

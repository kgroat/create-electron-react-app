
var spawn = require('child_process').spawn
var Promise = require('bluebird')

module.exports = function (command, args) {
  return new Promise(function(resolve, reject) {
    function onExit (code, signal) {
      if (code !== null && code !== undefined && code !== 0) {
        reject(code)
      } else if (signal !== null && signal !== undefined && signal !== 'SIGINT' && signal !== 'SIGTERM') {
        reject(signal)
      } else {
        resolve(0)
      }
    }

    var child = spawn(command, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', onExit)
    child.on('close', onExit)
  })
}


import * as npm from 'npm'
import * as Bluebird from 'bluebird'
import { Answers } from './getAnswers'

function installAllDeps () {
  const install = Bluebird.promisify(npm.commands.install)
  return install([])
}

export default function (answers: Answers) {
  const load = Bluebird.promisify(npm.load)
  console.log('Installing dependencies...')
  return load()
    .then(installAllDeps)
    .then(function () {
      console.log('Dependencies installed!')
      return answers
    })
}

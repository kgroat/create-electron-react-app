
import * as rimraf from 'rimraf'
import * as Bluebird from 'bluebird'
import { Answers } from './getAnswers'

const rmdir = Bluebird.promisify(rimraf)

export default function (answers: Answers) {
  return rmdir('.git')
    .then(function () {
      return answers
    })
}

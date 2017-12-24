
import * as fs from 'fs'
import * as Bluebird from 'bluebird'
import { Answers } from './getAnswers'

const mkidr = Bluebird.promisify(fs.mkdir)

export default function (answers: Answers) {
  return mkidr(answers.dirName)
    .then(function () {
      return answers
    })
}

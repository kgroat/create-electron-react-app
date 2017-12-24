
import spawn from './spawnHelper'
import { Answers } from './getAnswers'

const gitUrl = 'https://github.com/kgroat/electron-react-starter'

export default function (answers: Answers) {
  return spawn('git', ['clone', gitUrl, answers.dirName])
    .then(function () {
      console.log('Starter cloned!')
      return answers
    })
}

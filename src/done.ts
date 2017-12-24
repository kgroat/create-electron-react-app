
import * as colors from 'colors/safe'
import { Answers } from './getAnswers'

const commands = [
  ['npm start', 'Run the app in development mode'],
  ['npm test', 'Run the unit tests'],
  ['npm run lint', 'Run the linter'],
  ['npm run build', 'Build the application for publishing'],
]

export default function (answers: Answers) {
  console.log()
  console.log(colors.green('Done!'))
  console.log(colors.green('To get to your project run ') + colors.blue('`cd ' + answers.dirName + '`'))
  console.log(colors.green('From there, you can issue the following commands:'))
  commands.forEach(function (command) {
    console.log('  * ' + colors.cyan(command[0]) + ' -- ' + colors.magenta(command[1]))
  })
  console.log()
  console.log('For more information, see:')
  console.log(colors.blue('https://github.com/kgroat/electron-react-starter#readme'))
  console.log()
}

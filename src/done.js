
var chalk = require('chalk')

var commands = [
  ['npm start', 'Run the app in development mode'],
  ['npm test', 'Run the unit tests'],
  ['npm run lint', 'Run the linter'],
  ['npm run build', 'Build the application for publishing'],
]

module.exports = function(answers) {
  console.log()
  console.log(chalk.green('Done!'))
  console.log(chalk.green('To get to your project run ') + chalk.blue('`cd ' + answers.dirName + '`'))
  console.log(chalk.green('From there, you can issue the following commands:'))
  commands.forEach(function (command) {
    console.log('  * ' + chalk.cyan(command[0]) + ' -- ' + chalk.magenta(command[1]))
  })
  console.log()
  console.log('For more information, see:')
  console.log(chalk.blue('https://github.com/kgroat/electron-react-starter#readme'))
  console.log()
}

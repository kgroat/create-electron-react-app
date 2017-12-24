
import getAnswers, { Answers } from './getAnswers'
import makeDirectory from './makeDirectory'
import cloneBase from './cloneBase'
import updatePackage from './updatePackage'
import generateReadme from './generateReadme'
import installDependencies from './installDependencies'
import deleteGitDir from './deleteGitDir'
import done from './done'
import error from './error'

const dirName = 'dirName'

function changeDirectory (answers: Answers) {
  process.chdir(answers.dirName)
  return answers
}

export default function () {
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

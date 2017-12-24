
import * as path from 'path'
import * as fs from 'fs'
import * as Bluebird from 'bluebird'
import { Answers, GitAnswer } from './getAnswers'

const readFile = Bluebird.promisify(fs.readFile)
const writeFile = Bluebird.promisify(fs.writeFile)
const packageFile = 'package.json'

export function standardizeGitUri (git: GitAnswer): string {
  if (git.protocol === 'ssh') {
    return 'ssh://' + git.user + '@' + git.host + ':' + git.repo + '.git'
  } else if (git.protocol === 'https') {
    return 'https://' + git.host + '/' + git.repo
  } else {
    return ''
  }
}

function parsePackage (jsonBuffer: Buffer) {
  return JSON.parse(jsonBuffer.toString())
}

function updatePackage (answers: Answers) {
  return function (pkg: any) {
    delete pkg.authors

    pkg.name = answers.dirName
    pkg.appName = answers.appName
    pkg.identifier = answers.identifier
    pkg.description = answers.description
    pkg.author = answers.author
    pkg.lisence = answers.lisence

    if (answers.git) {
      const git = answers.git
      const httpsUri = 'https://' + git.host + '/' + git.repo
      const standardizedUri = standardizeGitUri(git)
      pkg.repository = {
        type: 'git',
        url: 'git+' + standardizedUri,
      }
      pkg.bugs = {
        url: httpsUri + '/issues',
      }
      pkg.homepage = httpsUri + '#readme'
    }

    return pkg
  }
}

function writePackage (pkg: any) {
  const json = JSON.stringify(pkg)
  return writeFile(packageFile, json)
}

export default function (answers: Answers) {
  console.log('Updating package.json...')
  return readFile(packageFile)
    .then(parsePackage)
    .then(updatePackage(answers))
    .then(writePackage)
    .then(function () {
      console.log('package.json updated!')
      return answers
    })
}

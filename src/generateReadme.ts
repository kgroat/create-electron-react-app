
import * as ejs from 'ejs'
import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'
import * as Bluebird from 'bluebird'
import { Answers } from './getAnswers'

const rm = Bluebird.promisify(rimraf)
const readFile = Bluebird.promisify(fs.readFile)
const writeFile = Bluebird.promisify(fs.writeFile)

const templateFile = 'README_TEMPLATE.md.ejs'
const writeTo = 'README.md'

function replaceReadme (templatePath: string, outputPath: string, answers: Answers) {
  return readFile(templatePath)
    .then(function (buffer) {
      return buffer.toString()
    })
    .then(ejs.compile)
    .then(function (template) {
      return template(answers)
    })
    .then(function (output) {
      return writeFile(outputPath, output)
    })
    .then(function () {
      return rm(templatePath)
    })
}

function exists (path: string) {
  return new Promise(function (resolve, reject) {
    fs.exists(path, resolve)
  })
}

export default function (answers: Answers) {
  console.log('Checking README.md')
  const templatePath = path.join(process.cwd(), templateFile)
  const outputPath = path.join(process.cwd(), writeTo)
  return exists(templatePath)
    .then(function (fileExists) {
      if (fileExists) {
        console.log('Generating README.md...')
        return replaceReadme(templatePath, outputPath, answers)
          .then(function () {
            console.log('README.md generated!')
          })
      } else {
        console.log('Keeping README.md')
      }
    })
    .then(function () {
      return answers
    })
}

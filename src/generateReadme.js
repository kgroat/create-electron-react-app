
var ejs = require('ejs')
var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var Promise = require('bluebird')

var rm = Promise.promisify(rimraf)
//var exists = Promise.promisify(fs.exists)
var readFile = Promise.promisify(fs.readFile)
var writeFile = Promise.promisify(fs.writeFile)

const templateFile = 'README_TEMPLATE.md.ejs'
const writeTo = 'README.md'

function replaceReadme(templatePath, outputPath, answers) {
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

function exists (path) {
  return new Promise(function (resolve, reject) {
    fs.exists(path, resolve)
  })
}

module.exports = function (answers) {
  console.log('Checking README.md')
  const templatePath = path.join(process.cwd(), templateFile)
  const outputPath = path.join(process.cwd(), writeTo)
  return exists(templatePath)
    .then(function (fileExists) {
      if(fileExists) {
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

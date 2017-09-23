
var ejs = require('ejs')
var fs = require('fs')
var rimraf = require('rimraf')
var Promise = require('bluebird')

var rm = Promise.promisify(rimraf)
var exists = Promise.promisify(fs.exists)
var readFile = Promise.promisify(fs.readFile)
var writeFile = Promise.promisify(fs.writeFile)

const templateFile = 'README_TEMPLATE.md.ejs'
const writeTo = 'README.md'

function replaceReadme(answers) {
  return readFile(templateFile)
    .then(ejs.compile)
    .then(function (template) {
      return template(answers)
    })
    .then(function (output) {
      return writeFile(writeTo, output)
    })
    .then(function () {
      return rm(templateFile)
    })
}

module.exports = function (answers) {
  return exists(templateFile)
    .then(function (fileExists) {
      if(fileExists) {
        return replaceReadme(answers)
      }
    })
    .then(function () {
      return answers
    })
}

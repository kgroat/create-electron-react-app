
var inquirer = require('inquirer')
var fs = require('fs')
var { standardizeGitUri } = require('./updatePackage')

function validateDirName (value) {
  var dirNameRgx =  /^[a-z0-9\-_]*$/
  if (!dirNameRgx.test(value)) {
    return 'Your directory name can only contain lowercase letters, numbers, dashes, and underscores.'
  } else if (fs.existsSync(value)) {
    return 'File or directory ' + value + ' already exists.'
  } else {
    return true
  }
}

function validateNotEmpty (value) {
  if (value && value.length > 0) {
    return true
  } else {
    return 'Please enter a value.'
  }
}

function defaultDirName (values) {
  var appName = values.appName
  var dirName = appName.toLowerCase().replace(/[ _]/g, '-').replace(/[^a-z0-9\-]/g, '')
  return dirName
}

function defaultIdentifier (values) {
  var dirName = values.dirName
  var identifier = 'com.github.' + dirName.replace(/-/g, '')
  return identifier
}

var sshRgx = /^(?:ssh:\/\/)?([^@]+)@([^:]+):(?:\/)?((?:(?!\.git).)+)(?:\.git)?$/i
var httpRgx = /^(?:https?:\/\/)?([^/]+)\/((?:(?!\.git).)+)(?:\.git)?$/i

function validateGit (value) {
  var noValue = !value
  var isRepo = typeof value === 'object'
  if (noValue || isRepo) {
    return true
  } else {
    return 'Not a known git repository; use an ssh or https endpoint.'
  }
}

function filterGit (value) {
  if (!value) {
    return undefined
  }

  var matches, protocol, user, host, repo
  if (sshRgx.test(value)) {
    var matches = sshRgx.exec(value)
    protocol = 'ssh'
    user = matches[1]
    host = matches[2]
    repo = matches[3]
  } else if (httpRgx.test(value)) {
    var matches = httpRgx.exec(value)
    protocol = 'https'
    user = null
    host = matches[1]
    repo = matches[2]
  } else {
    return 'fail'
  }

  const output = {
    protocol: protocol,
    user: user,
    host: host,
    repo: repo,
    toString: () => standardizeGitUri(output)
  }

  return output
}

module.exports = function() {
  return inquirer.prompt([
    {
      name: 'appName',
      message: 'app name (the name of the .exe or .app file)',
      validate: validateNotEmpty
    },
    {
      name: 'dirName',
      message: 'directory name',
      validate: validateDirName,
      default: defaultDirName
    },
    {
      name: 'identifier',
      message: 'app identifier',
      validate: validateNotEmpty,
      default: defaultIdentifier
    },
    {
      name: 'description',
      message: 'description'
    },
    {
      name: 'git',
      message: 'git repository',
      validate: validateGit,
      filter: filterGit
    },
    {
      name: 'author',
      message: 'author'
    },
    {
      name: 'lisence',
      message: 'lisence',
      default: 'ISC'
    }
  ])
}

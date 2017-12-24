
import { prompt, Question } from 'inquirer'
import * as fs from 'fs'
import { standardizeGitUri } from './updatePackage'
import { dirname } from 'path';

function validateDirName (value: string) {
  var dirNameRgx =  /^[a-z0-9\-_]*$/
  if (!dirNameRgx.test(value)) {
    return 'Your directory name can only contain lowercase letters, numbers, dashes, and underscores.'
  } else if (fs.existsSync(value)) {
    return 'File or directory ' + value + ' already exists.'
  } else {
    return true
  }
}

function validateNotEmpty (value: string) {
  if (value && value.length > 0) {
    return true
  } else {
    return 'Please enter a value.'
  }
}

function defaultDirName (values: Answers) {
  var appName = values.appName
  var dirName = appName.toLowerCase().replace(/[ _]/g, '-').replace(/[^a-z0-9\-]/g, '')
  return dirName
}

function defaultIdentifier (values: Answers) {
  var dirName = values.dirName
  var identifier = 'com.github.' + dirName.replace(/-/g, '')
  return identifier
}

export interface GitAnswer {
  protocol: string
  user: string | null
  host: string
  repo: string
}

var sshRgx = /^(?:ssh:\/\/)?([^@]+)@([^:]+):(?:\/)?((?:(?!\.git).)+)(?:\.git)?$/i
var httpRgx = /^(?:https?:\/\/)?([^/]+)\/((?:(?!\.git).)+)(?:\.git)?$/i

function validateGit (value: GitAnswer | string | undefined) {
  var noValue = !value
  var isRepo = typeof value === 'object'
  if (noValue || isRepo) {
    return true
  } else {
    return 'Not a known git repository; use an ssh or https endpoint.'
  }
}

function filterGit (value: string): GitAnswer | string | undefined {
  if (!value) {
    return undefined
  }

  let protocol, user, host, repo
  if (sshRgx.test(value)) {
    const matches = sshRgx.exec(value)
    protocol = 'ssh'
    user = matches && matches[1]
    host = matches && matches[2]
    repo = matches && matches[3]
  } else if (httpRgx.test(value)) {
    const matches = httpRgx.exec(value)
    protocol = 'https'
    user = null
    host = matches && matches[1]
    repo = matches && matches[2]
  } else {
    return 'fail'
  }

  const output = {
    protocol: protocol,
    user: user,
    host: host,
    repo: repo,
    toString: (): string => standardizeGitUri(output)
  } as GitAnswer

  return output
}

export interface Answers {
  appName: string
  dirName: string
  identifier: string
  description: string
  git: GitAnswer
  author: string
  lisence: string
}

export default function(): Promise<Answers> {
  return prompt([
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
  ] as Question[]) as Promise<Answers>
}

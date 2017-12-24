
import { spawn } from 'child_process'

export default function (command: string, args: string[]) {
  return new Promise(function (resolve, reject) {
    function onExit (code: number, signal: string) {
      if (code !== null && code !== undefined && code !== 0) {
        reject(code)
      } else if (signal !== null && signal !== undefined && signal !== 'SIGINT' && signal !== 'SIGTERM') {
        reject(signal)
      } else {
        resolve(0)
      }
    }

    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', onExit)
    child.on('close', onExit)
  })
}

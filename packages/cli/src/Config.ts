import * as path from 'path'
import { Options } from './Creator'
import { DEFAULT_CONFIG_FILE } from './utils/constant'

export type CmdOptions = {
  packageName: string
  configPath: string
  src: string
  dest: string
}

export default class Config {
  config: Options
  questions: any[]
  constructor(cmdOptions: CmdOptions) {
    const { config, questions } = this.getConfig(cmdOptions)
    this.config = config
    this.questions = questions
  }
  getConfig(cmdOptions: CmdOptions) {
    let { configPath, packageName, src, dest } = cmdOptions
    configPath = path.join(process.cwd(), configPath || DEFAULT_CONFIG_FILE)
    const config = require(configPath) || {}
    const questions = config.questions
    src = src || config.src
    src = src && path.join(process.cwd(), src)
    dest = path.join(process.cwd(), dest || config.dest || '', packageName)
    const compileFiles = (config.compileFiles || []).map((p: string) => path.join(dest, p))
    
    return {
      config: {
        src,
        dest,
        packageName,
        commands: config.commands || [],
        compileFiles,
        copyOptions: config.copyOptions || {}
      },
      questions: questions
    }
  }
}

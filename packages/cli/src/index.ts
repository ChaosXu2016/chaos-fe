import Config, { CmdOptions } from './Config'
import Creator from './Creator'
import ask from './ask'
import init from './init'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'

const create = async (cmdOptions: CmdOptions) => {
  const config = new Config(cmdOptions)
  const { dest, packageName } = config.config
  if(fs.existsSync(dest)) {
    console.log(chalk.red(`包${packageName}已存在！`))
    return Promise.resolve()
  }
  const view = await ask(config.questions)
  const create = new Creator(config.config, view)
  create.create()
}

export {
  init,
  create
}
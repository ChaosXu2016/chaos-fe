import Config, { CmdOptions } from './Config'
import Creator from './Creator'
import ask from './ask'
import init from './init'
import fetch from './utils/fetch'
import { DEFAULT_TEMPLATE_REPOSITORY, DEFAULT_TEMPLATE_DIR } from './utils/constant'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import * as ora from 'ora'
import * as inquirer from 'inquirer'
import * as path from 'path'
import { getDirs } from './utils'

const getChoices = (message: string, choices: string[]) => ({
  type: 'list',
  name: 'template',
  message,
  choices
})

const create = async (cmdOptions: CmdOptions) => {
  const { config, questions } = new Config(cmdOptions)
  const { src, dest, packageName } = config
  if(fs.existsSync(dest)) {
    console.log(chalk.red(`包${packageName}已存在！`))
    return Promise.resolve()
  }
  if(!src) {
    config.src = DEFAULT_TEMPLATE_DIR
    const fetchSpinner = ora(`正在拉取远程模板：${DEFAULT_TEMPLATE_REPOSITORY}, 需要一会儿...`).start()
    const fetchRes = await fetch(DEFAULT_TEMPLATE_REPOSITORY, config.src)
    if(!fetchRes.success) {
      fetchSpinner.fail(chalk.red(fetchRes.message))
      fetchRes.data && console.log(fetchRes.data)
      return
    }
    fetchSpinner.succeed(fetchRes.message)
  }
  const templateDir = await getDirs(config.src)
  // 如果有多类型，questions加上
  // 选择模板
  const templateRes = await inquirer.prompt([getChoices('请选择模板(.表示拷贝所有模板)：', [...templateDir, '.'])])
  const templateName = (templateRes.template || '') as string
  config.src = path.join(config.src, templateName)
  const view = await ask(questions)
  const create = new Creator(config, view)
  return create.create()
}

export {
  init,
  create
}
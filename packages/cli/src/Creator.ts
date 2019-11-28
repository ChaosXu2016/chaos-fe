import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import * as Mustache from 'mustache'
import * as ora from 'ora'
import { exec } from 'child_process'
import write, { copyFilter } from './utils/write'

export type Command = {
  command: string
  options: any
}

export type Options = {
  src: string
  dest: string
  packageName: string
  commands: Command[]
}

const asyncExec = (command: string, options: any) => new Promise((resolve, reject) => {
  exec(command, options, (error, stdout, stderr) => {
    if (error) {
      reject({ error, stdout, stderr })
    } else {
      resolve({ error, stdout, stderr })
    }
  })
})

export default class Creator {
  private options: Options
  private view: any
  constructor(options: Options, view: any) {
    this.options = options
    this.view = view
  }
  filter: copyFilter = (fileName, fileContent) => {
    const { } = this.options
    const content = Mustache.render(fileContent, this.view)
    return {
      fileName: fileName.replace(/\.mustache$/g, ''),
      fileContent: content
    }
  }
  async renderFile(filePath: string): Promise<any> {
    if(fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath)
      const reCompFileStr = Mustache.render(file.toString('utf-8'), this.view)
      await fs.writeFile(filePath, reCompFileStr, { encoding: 'utf-8' })
    }
  }
  async exeCommand() {
    const { commands, dest } = this.options
    while(commands.length) {
      const { command, options } = commands.shift() || { command: '', options: {} }
      const commandSpinner = ora(`正在执行 ${chalk.cyan.bold(command)}, 需要一会儿...`).start()
      try {
        const { stdout, stderr } = await asyncExec(command, {
          cwd: dest,
          ...options
        }) as any
        commandSpinner.color = 'green'
        commandSpinner.succeed('安装成功')
        console.log(`${stderr}${stdout}`)
      } catch (error) {
        commandSpinner.color = 'red'
        commandSpinner.fail(chalk.red(`命令 ${chalk.cyan.bold(command)} 执行失败，请到项目目录执行`))
        error && console.log(error.error || error)
        throw error
      }
    }
  }
  async create() {
    const { src, dest } = this.options
    const copyRes = await write(src, dest, this.filter)
    if(!copyRes.success) {
      console.log(chalk.red(copyRes.message))
      copyRes.data && console.log(copyRes.data)
      return copyRes
    }
    console.log(chalk.green(copyRes.message))
    await this.exeCommand()
    console.log(chalk.green(`创建成功！`))
    console.log(chalk.green(`开始工作吧！😝`))
  }
}

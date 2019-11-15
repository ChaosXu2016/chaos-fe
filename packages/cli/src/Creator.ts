import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import * as Mustache from 'mustache'
import * as ora from 'ora'
import { exec } from 'child_process'

export type Command = {
  command: string
  options: any
}

export type Options = {
  src: string
  dest: string
  packageName: string
  commands: Command[]
  compileFiles: string[]
  copyOptions: fs.CopyOptions
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
    console.log(JSON.stringify(options))
    console.log(JSON.stringify(view))
    this.options = options
    this.view = view
  }
  async copy(): Promise<any> {
    const { src, dest, copyOptions } = this.options
    const copySpinner = ora(`正在复制模板...`).start()
    return fs.copy(src, dest, copyOptions).then(() => {
      copySpinner.color = 'green'
      console.log(`${chalk.green('temlate：')}${chalk.gray(src)}`)
      console.log(`${chalk.green('target：')}${chalk.gray(dest)}`)
      copySpinner.succeed(chalk.green('模板拷贝成功！'))
    }).catch(error => {
      copySpinner.color = 'red'
      copySpinner.fail(chalk.red('模板拷贝失败！'))
      console.log(error)
      return Promise.reject(error)
    })
  }
  async compile(): Promise<any> {
    const { compileFiles } = this.options
    const compileSpinner = ora(`正在注入参数...`).start()
    return Promise.all(compileFiles.map(this.renderFile.bind(this))).then(() => {
      compileSpinner.color = 'green'
      compileSpinner.succeed(chalk.green('编译成功！'))
    }).catch(error => {
      compileSpinner.color = 'red'
      compileSpinner.fail(chalk.red('编译失败！'))
      console.log(error)
      return Promise.reject(error)
    })
  }
  async renderFile(filePath: string): Promise<any> {
    if(fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath)
      const reCompFileStr = Mustache.render(file.toString('utf-8'), this.view)
      await fs.writeFile(filePath, reCompFileStr, { encoding: 'utf-8' })
    }
  }
  async exeCommand() {
    const { commands } = this.options
    while(commands.length) {
      const { command, options } = commands.shift() || { command: '', options: {} }
      const commandSpinner = ora(`正在执行 ${chalk.cyan.bold(command)}, 需要一会儿...`).start()
      try {
        const { stdout, stderr } = await asyncExec(command, options) as any
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
    await this.copy()
    await this.compile()
    await this.exeCommand()
    console.log(chalk.green(`创建成功！`))
    console.log(chalk.green(`开始工作吧！😝`))
  }
}

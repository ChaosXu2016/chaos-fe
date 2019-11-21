import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'

export type copyFilter = (fileName: string, fileContent: string) => ({
  fileName: string, fileContent: string
})

interface CopyResult {
  success: boolean
  target: string
  type: number
  err?: any
}

export const copyFile = async (source: string, target: string, filter?: copyFilter): Promise<CopyResult> => {
  await fs.ensureDir(target)
  const file = await fs.readFile(source)
  const sourceFileName = path.basename(source)
  let fileStr = file.toString('utf-8')
  let targetFilePath = path.join(target, sourceFileName || '')
  if( filter ) {
    const filterRes = filter(sourceFileName, fileStr)
    fileStr = filterRes.fileContent
    targetFilePath = path.join(target, filterRes.fileName || '')
  }
  return fs.writeFile(targetFilePath, fileStr, { encoding: 'utf-8' }).then(() => ({
    success: true,
    type: 1,
    target: targetFilePath
  })).catch((err) => Promise.resolve({
    success: false,
    type: 1,
    target: targetFilePath,
    err
  }))
}

export const mkdir = async (target: string): Promise<CopyResult> => {
  return fs.ensureDir(target).then(() => ({
    success: true,
    type: 2,
    target,
  })).catch(err => Promise.resolve({
    success: false,
    type: 2,
    target,
    err
  }))
}

const logResult = (resArr: CopyResult[]) => {
  resArr.forEach(res => {
    const { success, target, err, type } = res
    if( success ) {
      console.log(`${chalk.green('✔ ')}${chalk.grey(`创建${type === 1 ? '文件' : '目录'}: ${target} 成功`)}`)
    } else {
      console.log(`${chalk.red('✘ ')}${chalk.grey(`创建${type === 1 ? '文件' : '目录'}: ${target} 失败`)}`)
      console.error(err)
    }
  })
}

const copy = async (source: string, target: string, filter?: copyFilter): Promise<any> => {
  // 读取目录
  const copyPaths = [{ source, target }]
  let validPath = [source]
  while(copyPaths.length) {
    const copyPath = copyPaths.shift()
    if(!copyPath) {
      break
    }
    const { source: s, target: t } = copyPath
    const children = await fs.readdir(s)
    const promises: Promise<any>[] = []
    children.forEach(fileName => {
      const p = path.join(s, fileName || '')
      const stat = fs.lstatSync(p)
      if(stat.isFile()) {
        // 复制文件
        promises.push(copyFile(p, t, filter))
      } else if(stat.isDirectory()) {
        // 如果是目录，且没有拷贝过，放到拷贝目录尾部
        const tp = path.join(t, fileName || '')
        promises.push(mkdir(tp))
        if(validPath.indexOf(p) !== -1) {
          copyPaths.push({ source: p, target: tp })
        }
      }
    })
    const copyResArr = await Promise.all(promises)
    logResult(copyResArr)
  }
  validPath = []
  return true
}

const defaultCopyFilter: copyFilter = (fileName, fileContent) => {
  return {
    fileContent,
    fileName: fileName.replace(/\.temp$/, '')
  }
}

const createPackages = async (source: string, target: string, filter: copyFilter = defaultCopyFilter): Promise<any> => {
  // 检查source是否存在
  if(!fs.existsSync(source)) {
    return Promise.reject(chalk.red(`目录：${source} 不存在`))
  }
  // 检查source是否是目录
  const stat = await fs.lstat(source)
  if(!stat.isDirectory()) {
    return Promise.reject(chalk.red(`目录：${source} 不是一个目录`))
  }
  // 检查target是否存在
  if(fs.existsSync(target)) {
    return Promise.reject(chalk.red(`包已存在！`))
  }
  // copy
  return copy(source, target, filter)
}

export {
  createPackages
}

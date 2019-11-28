import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import { success, fail, IResult } from './result'

export type copyFilter = (fileName: string, fileContent: string) => ({
  fileName: string, fileContent: string
})

const copyFile = async (source: string, target: string, filter?: copyFilter): Promise<IResult> => {
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
  return fs.writeFile(targetFilePath, fileStr, { encoding: 'utf-8' })
  .then(() => success(null, `创建文件: ${targetFilePath} 成功`))
  .catch((err) => Promise.resolve(fail(err, `创建文件: ${targetFilePath} 失败`)))
}

const mkdir = async (target: string): Promise<IResult> => {
  return fs.ensureDir(target)
  .then(() => success(null, `创建目录: ${target} 成功`))
  .catch(err => Promise.resolve(fail(err, `创建目录: ${target} 失败`)))
}

const logResult = (resArr: IResult[]) => {
  resArr.forEach(res => {
    const { success, data, message } = res
    if( success ) {
      console.log(`${chalk.green('✔ ')}${chalk.grey(message)}`)
    } else {
      console.log(`${chalk.red('✘ ')}${chalk.grey(message)}`)
      console.error(data)
    }
  })
}

const copy = async (source: string, target: string, filter?: copyFilter): Promise<IResult> => {
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
    const promises: Promise<IResult>[] = []
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
        if(validPath.indexOf(p) === -1) {
          validPath.push(p)
          copyPaths.push({ source: p, target: tp })
        }
      }
    })
    const copyResArr = await Promise.all(promises)
    logResult(copyResArr)
  }
  validPath = []
  return success(null, `创建成功`)
}

const defaultCopyFilter: copyFilter = (fileName, fileContent) => {
  return {
    fileContent,
    fileName: fileName.replace(/\.mustache$/, '')
  }
}

const write = async (
  source: string,
  target: string,
  filter: copyFilter = defaultCopyFilter
): Promise<IResult> => {
  // 检查source是否存在
  if(!fs.existsSync(source)) {
    return Promise.resolve(fail(null, `目录：${source} 不存在`))
  }
  // 检查source是否是目录
  const stat = await fs.lstat(source)
  if(!stat.isDirectory()) {
    return Promise.resolve(fail(null, `目录：${source} 不是一个目录`))
  }
  // copy
  return copy(source, target, filter)
}

export default write

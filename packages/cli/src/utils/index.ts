import * as path from 'path'
import * as fs from 'fs-extra'

export const getRootPath = () => path.resolve(__dirname, '../../')

export const getPackageJson = () => require(path.join(getRootPath(), 'package.json'))

export const getVersion = () => getPackageJson().version

export const printVersion = () => {
  const version = getVersion()
  console.log(`@chaos/cli v${version}`)
  console.log('')
}

export const getDirs = async (p: string): Promise<string[]> => {
  const children = await fs.readdir(p)
  const statPromises = children.map(name => {
    const cp = path.join(p, name)
    return fs.lstat(cp).then(stat => ({
      isDir: stat.isDirectory(),
      name,
      path: cp
    }))
  })
  const stats = await Promise.all(statPromises) 
  return stats.filter(stat => stat.isDir).map(stat => stat.name)
}

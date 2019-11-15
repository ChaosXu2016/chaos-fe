import * as path from 'path'

export const getRootPath = () => path.resolve(__dirname, '../../')

export const getPackageJson = () => require(path.join(getRootPath(), 'package.json'))

export const getVersion = () => getPackageJson().version

export const printVersion = () => {
  const version = getVersion()
  console.log(`@chaos/cli v${version}`)
  console.log('')
}

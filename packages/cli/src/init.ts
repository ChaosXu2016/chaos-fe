import * as fs from 'fs-extra'
import * as path from 'path'
import Config from './Config'

const DEFAULT_CONFIG = (
`{
  "src": "template",
  "dest": "packages",
  "commands": [{
    "command": "lerna link"
  }, {
    "command": "lerna bootstrap"
  }],
  "questions": [{
    "name": "packageName",
    "message": "package name"
  }, {
    "name": "description",
    "message": "description"
  }, {
    "name": "author",
    "message": "author"
  }]
}`
)

export default (projectPath: string ) => fs.writeFile(
  path.join(process.cwd(), projectPath, Config.DEFAULT_CONFIG_PATH),
  DEFAULT_CONFIG,
  { encoding: 'utf-8' }
)

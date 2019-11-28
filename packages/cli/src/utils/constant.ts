import { getRootPath } from './index'
import * as path from 'path'
// 默认远程模板路径
export const DEFAULT_TEMPLATE_REPOSITORY = 'github:ChaosXu2016/template'
// 默认配置路径
export const DEFAULT_CONFIG_FILE = 'chaos-cli.json'
// 默认模板路径
export const DEFAULT_TEMPLATE_DIR = path.join(getRootPath(), 'template')
// 默认配置
export const DEFAULT_CONFIG = (
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

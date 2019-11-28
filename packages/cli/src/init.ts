import * as fs from 'fs-extra'
import * as path from 'path'
import { DEFAULT_CONFIG_FILE, DEFAULT_CONFIG } from './utils/constant'

export default (projectPath: string ) => fs.writeFile(
  path.join(process.cwd(), projectPath, DEFAULT_CONFIG_FILE),
  DEFAULT_CONFIG,
  { encoding: 'utf-8' }
)

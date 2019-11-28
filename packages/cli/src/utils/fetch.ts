import * as download from 'download-git-repo'
import { success, fail, IResult } from './result'

export default (src: string, target: string): Promise<IResult> => {
  return new Promise(resolve => {
    download(
      src,
      target,
      { clone: false },
      err => {
        if(err) {
          resolve(fail(err, `拉取模板：${src} 失败`))
        } else {
          resolve(success(null, `拉取模板：${src} 成功`))
        }
      }
    )
  })
}

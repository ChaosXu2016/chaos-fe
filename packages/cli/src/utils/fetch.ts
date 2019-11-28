const download = require('download-git-repo')

export default (src: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    download(
      src,
      'template/',
      { clone: false },
      err => {
        if(err) {
          reject(false)
        } else {
          resolve(true)
        }
      }
    )
  })
}

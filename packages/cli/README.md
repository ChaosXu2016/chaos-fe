# `cli`

> 脚手架练习

## 实现功能

### init

初始化一些配置

```bash  
chaos init [options]

Options:
  --project-path [projectPath]  project path
  -h, --help                    output usage information
```

### create  

可以根据自定义的模板生成包代码

```bash
chaos create <packageName> [options]

Options:
  --package-name [packageName]  package name
  --config-path [configPath]    config path
  --src [src]                   template dir
  --dest [dest]                 target package dir
  -h, --help                    output usage information
```  

## chaos-cli.json

```json
{
  // 模板路径（相对命令行的当前目录）
  "src": "template",
  // 输出路径（相对命令行的当前目录）
  "dest": "packages",
  // 输出之后执行的命令 { command: string, option: child_process.cwd的option，具体参照文档说明 }
  "commands": [{
    "command": "lerna link"
  }, {
    "command": "lerna bootstrap"
  }],
  // 会被重新编译的文件，编译遵循mustache规范，参数输入在questions里面配置，由提示命令输入
  "compileFiles": [ "package.json" ],
  // copy规则：fs-extra.CopyOptions 详细的见文档
  "copyOptions": {
    "overwrite": false
  },
  // 交互命令配置，配置规则见：inquirer.prompt 文档
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
}
```

## 相关文档

+ [mustache](https://github.com/janl/mustache.js)    
+ [inquirer](https://github.com/SBoudrias/Inquirer.js)
+ [nodejs](https://nodejs.org/docs/latest-v10.x/api/child_process.html)
+ [fs-extra](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md)
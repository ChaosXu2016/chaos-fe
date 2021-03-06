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
}
``` 
+ src  

  模板路径（相对命令行的当前目录）

+ dest

  输出目录（相对命令行的当前目录）

+ copyOptions

  copy规则：fs-extra.CopyOptions 详细的见文档

+ questions

  交互命令配置，遵循inquirer.prompt的配置，目前仅仅实现了所有非函数的配置。

  不同的是`type`扩展了`multiple`类型，支持输入多个值，输出的是一个数组，输入空（不输入直接按回车键）退出输入。

## 模板  

模板后缀名统一为`mustache`，他会通过[mustache](https://github.com/janl/mustache.js)编译，注入`questions`里面的`answers`。

## 相关文档

+ [mustache](https://github.com/janl/mustache.js)    
+ [inquirer](https://github.com/SBoudrias/Inquirer.js)
+ [nodejs](https://nodejs.org/docs/latest-v10.x/api/child_process.html)
+ [fs-extra](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md)
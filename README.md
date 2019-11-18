# chaos-fe

使用lerna整理自己的学习代码，顺便学习lerna

## lerna学习总结

### 命令

#### lerna publish  

  > Publish packages in the current project

  `lerna`的包使用的是[scope packages](https://docs.npmjs.com/misc/scope.html)  
  
  `scope`名并不是随便起的，他和包名不一样，必须要是一个用户民或者一个组织名（Each npm user/organization has their own scope, and only you can add packages in your scope）  

  `lerna`不会发布在`package.json`中配置`private: true`的包

  其他的选项可以参考[文档](https://github.com/lerna/lerna/tree/master/commands/publish#readme)

#### lerna version  

  查看版本信息

#### lerna bootstrap

`link`所有的本地包和安装其它依赖包：  
当执行`lerna bootstrap`，主要发生下面的操作：  
1. `npm install` 安装所有外部依赖
2. 给所有的`lerna`包建立链接
3. 

+ lerna list  

  列出所有的packages

+ lerna changed
+ lerna diff
+ lerna exec  

  > Execute an arbitrary command in each package

+ lerna run  

  相当于所有子包执行`npm run <command>`

+ lerna init  

  初始化`lerna`，创建目录和`config`文件

+ lerna add  

  添加依赖（除了远程的，还可以以软链的形式添加本地包）

+ lerna clean  

  清除所有子包的`node_modules`依赖

+ lerna import
+ lerna link

  建立本地链接

+ lerna create

  创建一个新的`packages`

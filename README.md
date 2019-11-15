# chaos-fe

使用lerna整理自己的学习代码，顺便学习lerna

## lerna学习总结

### 命令

+ lerna publish  
+ lerna version  

  查看版本信息

+ lerna bootstrap

  安装依赖

+ lerna list  

  列出所有的packages

+ lerna changed
+ lerna diff
+ lerna exec
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

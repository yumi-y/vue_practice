### Vue CLI（脚手架）

- 开发大型项目时，我们需要使用Vue CLI
- 使用前提，安装node和NPM
- Vue CLI工具使用了webpack模版，全局安装webpack

```js
//安装Vue脚手架
npm install -g @vue/cli
//拉取安装旧版本Vue CLI2
npm install -g@vue/cli-init
//初始化Vue CLI2项目
vue init webpack my-project
//初始化Vue CLI3项目
vue create my-project
```

### Runtime-Compiler和Runtime-Only的区别

- Runtime-Compiler 运行时+编译器版本
- Runtime-Only 只含有运行时版本
- 如果在之后的开发中，你依然使用template，就需要选择Runtime-Compiler
- 如果你之后的开发中，使用的是.vue文件夹开发，那么可以选择Runtime-only

### Vue CLI3

- Vue CLI3设计原则是0配置，移除的配置文件根目录下的build和config等目录
- Vue CLI3提供了vue ui命令，提供了可视化配置，更加人性化
- 移除了static文件夹，新增了public文件夹，并且index.html移动到public中


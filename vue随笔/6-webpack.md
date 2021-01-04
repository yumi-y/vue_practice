### 模块与打包

- webpack 其中一个核心就是让我们可能进行模块化开发，并且帮助我们处理模块化之间的依赖关系
- 打包就是将 webpack 中的各种资源模块进行打包合并成一个或多个包，并且在打包的过程中，可以对资源进行处理
- webpack 会自动处理文件中的依赖文件，一同处理
- package.json 通过 npm init 生成，npm 包管理的文件
- -save dev 表示开发时依赖
- package.json 中的 scripts 的脚本在执行时，会按照一定顺序寻找命令对应位置

  - 在“scripts“添加代码 ”build“：”webpack“
  - 首先寻找本地的 node_modules/.bin 路径对应的命令
  - 如果没有找到，会去全局的环境变量中寻找

  ### Vue 的终极使用方法

  ```js
  //可以将Vue实例中的模版数据方法等全部放到组件中，在引入组件
  new Vue({
    el: "#app",
    template: "<App/>",
    components: {
      App,
    },
  });
  ```

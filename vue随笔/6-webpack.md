### 模块与打包

- webpack 其中一个核心就是让我们可能进行模块化开发，并且帮助我们处理模块化之间的依赖关系
- 打包就是将 webpack 中的各种资源模块进行打包合并成一个或多个包，并且在打包的过程中，可以对资源进行处理
- webpack 会自动处理文件中的依赖文件，一同处理
- package.json 通过 npm init 生成，npm 包管理的文件
- --save-dev 表示开发时依赖，项目打包后不需要继续使用的
- package.json 中的 scripts 的脚本在执行时，会按照一定顺序去寻找命令对应位置

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

### webpack起步

- dist文件夹用于存放打包之后的文件
- src文件夹用于存放我们写的源文件
- index.html浏览器打开展示的首页html
- Package.json通过npm init 生成

### webpack配置

- 入口和出口

```js
module.exports={
//入口只有一个
entry:'',
//出口：通常是一个对象，里面至少包含两个重要属性，path和filename
output:{
  path:path.resolve(__dirname,'dist'),//path通常是一个绝对路径
  filename:'bundle.js'
}
}
```

- 局部安装weboack（通常一个项目，都有自己局部的webpack）
- Package.json中定义启动（可以用npm run build来执行我们的build指令）

### css-loader

- loader的使用
  - 步骤一：通过npm安装需要使用的loader
  - 步骤二：在webpack.config.js中的modules关键字下进行配置
- css-loader只负责加载css文件，style-loader负责将css具体样式嵌入到文档中
- webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的

```js
modules:{
  rules:[
    {
      test:/\.css$/,
      use:['style-loader','css-loader']
    }
  ]
}
```

### less文件处理

- 当用less文件来写样式时，需要安装less对应的loader-->less-loader

### 图片文件处理

- 处理8kb以下图片需要安装-->url-loader，进而配置文件
- 处理8kb以上图片使用-->file-loader进行处理

```js
{
  test:/\.(png/jpg/gif/jpeg)$/,
  use:[
    {
      loader:'url-loader',
      options:{
        limit:8192，  //limit属性起限制作用，当图片小于8kb时，对图片进行base64编码
        name:'img/[name].[hash:8].[ext]'  //修改文件名称
      }
    }
  ]
}
```

- 图片文件--修改文件名称
  - Img：文件要打包到的文件夹
  - name：获取图片原来的名字，放在该位置
  - hash:8 ：为了防止图片名称冲突，依然使用hash，但是只保留8位
  - ext：使用图片原有的扩展名

### babel的使用

- 下载使用babel对应的loader，可以将ES6语法转化为ES5语法

### webpack配置Vue

- 先安装后引入Vue    

```js
import Vue from 'vue'
```

- el属性用于和index.html中的#app进行绑定
- 在Vue实例中同时指定了el和template，那么template模版的内容会替换掉挂载的对应el的模板
- 安装vue-loader和vue-template-comoiler可以对vue文件进行封装处理

### plugin

- webpack中的插件就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等
- loader和plugin区别
  - loader主要用于转换某些类型的模块，它是一个转换器
  - plugin是插件，它是对webpack本身的扩展，是一个扩展器
- plugin的使用过程：
  - 步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)
  - 步骤二：在webpack.config.js中的plugins中配置插件
- HtmlWebpackPlugin插件用于将HTML文件打包到dist文件夹中
  - 自动生成一个index.html文件（可以指定模版来生成）
  - 将打包到js文件，自动通过script标签插入到body中

### 搭建本地服务器

- 这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。
- 安装  webpack-dev-server


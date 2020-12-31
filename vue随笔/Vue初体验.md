# Vue初体验

## Vue.js 安装

- 直接 CDN 引入

```js
  //开发环境版本，包含了有帮助的命令行警告
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  //生产环境版本，优化了尺寸和速度
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

- 下载和引入

```js
//开发环境
https://vusjs.org/js/vue.js
//生产环境
https://vusjs.org/js/vue.min.js
```

- NPM 安装

## Vue 初体验

- 在创建 Vue 对象的时候，传入一些 options
  - {}中包含了 el 属性：该属性决定了这个 Vue 对象挂载到哪一个元素上，以下例子挂载到 id 为 app 的元素上
    - el:
      - 类型：string/HTMLElement
      - 作用：决定之后 Vue 实例会管理哪一个 DOM
  - {}中包含了 data 属性：该属性通常存储一些数据
    - data:
      - 类型：Object/Function（组件当中 data 必须是一个函数）
      - 作用：Vue 实例对应的数据对象
  - {}中 methods 属性，可以在对象中添加方法
    - methods：
      - 类型：{[key:string]:Function}
      - 作用：定义属于 Vue 的一些方法，可以在其他方法中调用，也可以在指令中使用

```js
//在html中定义对象
<div id="app">{{message}}</div>
<script>
    //编程范式：声明式编程
    const app = new Vue({
        el: '#app', //用于挂载要管理的元素
        data: { //定义数据
            message: '你好啊！',
            name: 'code'
        }
    })
    </script>
//页面中输出message的属性值‘你好啊’
```

### Vue 列表显示

- 使用 v-for 指令来遍历数组
- 该列表是响应式的，当我们数组中的数据发生改变时，界面会随之改变
- @为 v-on 的语法糖

## Vue 的生命周期

```js
//回调函数
beforeCreate:function(){

}
```

## 
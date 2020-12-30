# Vue.js

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

## v-bind 动态绑定

- 动态绑定比如图片的链接 src、网站的链接 href、动态绑定一些类，样式等
- 绑定方式：对象
  - 用法一：直接通过{}绑定一个类
  ```js
  <h2 :class="{'active':isActive}">Hello World</h2>
  ```
  - 用法二：也可以通过判断，传入其他值
  ```js
  <h2 :class="'active':isActive,'line':isLine">Hello World</h2>
  ```
  - 用法三：和普通的类同时存在，并不冲突
    如果 isActive 和 isLine 都为 true，那么会有 title/active/line 三个类
  ```js
  <h2 class="title" :class="'active':isActive,'line':isLine">Hello World</h2>
  ```
  - 用法四：如果过于复杂，可以放在一个 methods 或者 computed，classes 是一个计算属性
  ```js
  <h2 class="title" :class="classes">Hello World</h2>
  ```
- 绑定方式：数组
  ```js
  <h2 class="title" :class="[active,line]">{{message}}</h2>
  ```

## 一、计算属性

### 1.1、计算属性的本质

- fullName:{set{},get{}}

### 1.2、计算属性和 methods 对比

- 计算属性在多次使用时，只会调用一次
- 它是缓存的

## 二、事件监听

### 2.1 事件监听的基本使用

### 2.2 参数问题

- btnClick
- btnClick(event)
- btnClick(abc,event)->$event

### 2.3 修饰符

- stop
- prevent
- .enter
- .once
- .native

## 三、条件判断

### 3.1 v-if/v-else-if/v-else

### 3.2 登陆小案例

### 3.3v-show

- v-show 和 v-if 区别

## 循环遍历

### 4.1 遍历数组

### 4.2 遍历对象

- value
- value，key
- value key index

### 4.3 数组哪些方法是响应式的

## 五、书籍案例

## 六、v-model 的使用

## 6.1 v-model 的基本使用

- v-model=>v-bind:value v-on:input

## 6.2v-model radio/checkbox/select

## 6.3 修饰符

- lazy
- number
- trim

## 七、组件化开发

## 7.1 认识组件化

## 7.2 组件的基本使用

## 7.3 全局组件和局部组件

## 7.4 父组件和子组件

## 7.5 注册的语法糖

## 7.6 模板的分类写法

- script
- template

## 7.7 数据的存放

- 子组件不能直接访问父组件
- 子组件中有自己的 data，而且必须是一个函数
- 为什么必须是一个函数

## 7.8 父子组件的通信

- 父传子：props
- 子传父：$emit

## 7.9 项目

- npm install
- npm

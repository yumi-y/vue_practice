路由内容概括

- vue-router基本使用
- vue-router嵌套路由
- vue-router参数传递
- vue-router导航守卫
- keep-alive



### 认识路由

- **路由**（**routing**）就是通过互联的网络把信息从源地址传输到目的地址的活动
- 路由器提供了两种机制：路由和转送
  - 路由决定数据包从来源到目的地的路径
  - 转送将输入端的数据转移到合适的输出端
- 路由中有一个非常重要的概念叫路由表
  - 路由表本质上就是一个映射表, 决定了数据包的指向

- 后端路由阶段
  - 早期的网站开发整个HTML页面是由服务器来渲染的，服务器直接生产渲染好对应的HTML页面, 返回给客户端进行展示
  - 当我们页面中需要请求不同的**路径**内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户顿
  - 这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示, 这样也有利于SEO的优化
  - 缺点：不易编写和维护，代码和数据以及对应的逻辑会混淆
- 前端路由阶段
  - 随着Ajax的出现, 有了前后端分离的开发模式
  - 后端只提供API来返回数据, 前端通过Ajax获取数据, 并且可以通过JavaScript将数据渲染到页面中
  - 这样做最大的优点就是前后端责任的清晰, 后端专注于数据上, 前端专注于交互和可视化上
  - 前端路由的核心：改变URL，但是页面不进行整体的刷新
- 前端路由的规则
  - URL的hash：可以通过直接赋值location.hash来改变href, 但是页面不发生刷新
  - history.pushState()：改变href，页面不刷新
  - history.replaceState()：用代替的方式改变href，页面不刷新
  - history.go()：可以进行浏览器的前进后退

### vue-router基础

- vue-router是基于路由和组件的
  - 路由用于设定访问路径, 将路径和组件映射起来
  - 在vue-router的单页面应用中, 页面的路径的改变就是组件的切换

### 安装和使用在vue-router

- 步骤一：安装vue-router
- 步骤二: 在模块化工程中使用它(因为是一个插件, 所以可以通过Vue.use()来安装路由功能)
  - 第一步：导入路由对象，并且调用 Vue.use(VueRouter)
  - 第二步：创建路由实例，并且传入路由映射配置
  - 第三步：在Vue实例中挂载创建的路由实例

```js
//在router中的index.js文件中
//导入路由对象
import Vue from 'vue'
import Vuerouter from 'vue-router'
//注入插件，调用Vue.use(VueRouter)
Vue.use(VueRouter)
//定义路由
const routes = []
//创建路由实例
const router = new VueRouter({
  routes
})
//导出router实例

//在main.js文件中
//Vue实例中挂载创建的路由实例
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
  el:'#app',
  router,
  render: h => h(App)
})
```

- 使用vue-router的步骤

  - 第一步: 创建路由组件(在components中创建vue文件)

  ```js
  <template>
    <div>
       <h2>标题</h2>
       <p></p>
    </div>
  </template>
  
  <script>
    export default{
      name:"about"
    }
  </script>
  
  <style scoped></style>
  ```

  - 第二步: 配置路由映射: 组件和路径映射关系

  ```js
  //引入
  import About from '../components/about'
  Vue.use(VueRouter)
  const routes = [
    {
      path:'/about',
      component:About
    },
  ]
  ```

  - 第三步: 使用路由: 通过<router-link>和<router-view>

  ```js
  //在App.vue文件中使用
  <router-link to="/about">首页</router-link>
  <router-view></router-view>
  //<router-link>: 该标签是一个vue-router中已经内置的组件, 它会被渲染成一个<a>标签
//<router-view>: 该标签会根据当前的路径, 动态渲染出不同的组件
  //在路由切换时, 切换的是<router-view>挂载的组件, 其他内容不会发生改变
  ```
  
- 路由的默认路径

  - 只需多配置一个映射

```js
const routes=[
  //path配置的是根路径: /
  path:'/',
  //redirect是重定向, 也就是我们将根路径重定向到/home的路径下, 这样就可以得到我们想要的结果了
  redirect:'/home'
]
```

- HTML5的History模式
  - 默认情况下，路径的改变使用的URL的hash

```js
//若希望使用HTML5的history模式，进行如下配置
const router = new VueRouter({
  routers,
  mode:'history'
})
```

- router-link补充

  - tag：tag可以指定<router-link>渲染成什么组件, 比如上面的代码会被渲染成一个<li>元素, 而不是<a>

    <router-link to='/home' tag='li'>

  - replace：replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中

  - active-class：p当<router-link>对应的路由匹配成功时, 会自动给当前元素设置一个router-link-active的class, 设置active-class可以修改默认的名称

- 修改linkActiveClass
  - 在实例中输入  linkActiveClass：'active'
- 路由代码跳转
  - 我们可以在模版template中设置button按钮，监听点击事件，在添加对应方法

```js
<template>
  <div>
     <button @click="linkToHome">首页</button>
     <router-view></router-view>
  </div>
</template>
<script>
  export default{
    name:'APP',
    methods:{
      linkToHome(){
        this.$router.push('./home')
      }
    }
}
</script>
```

- 动态路由
  - 在某些情况下，一个页面的path路径可能是不确定的，比如进入用户界面时，我们希望除了有前面的/user之外，后面还能跟上用户的ID

```js
//在routes配置
{
  path:'/user/:id',
  component:User
}
//在模版中配置
<div>
  <h2>{{$route.params.id}}</h2>
</div>
//使用路由
<router-link to="/user/123">用户</router-link>
```

### 路由懒加载

- 将不同路由对应的组件打包成一个个多js代码块，当路由被访问时才加载对应组件

```js
//引用后直接使用,
component:() => import('../components/Home')
//也可以使用ES6中
component Home = () => import('../components/Home')
```

### 认识嵌套路由

- 一个路径映射一个组件，在同一个路径页面中，访问内部的两个路径也会渲染出两个组件
- 实现嵌套路由有两个步骤
  - 创建对应子组件，并且在路由映射中配置对应的子路由
  - 在组件内部使用<router-view>标签
- 嵌套路由可以设置默认的路径

```js
{
  path:'',
  redirect:'message'
}
```

### 传递参数

- 准备工作
  - 第一步：创建新的组件Profile.vue
  - 第二步：配置路由映射
  - 第三步：添加跳转的<router-link>

- 传递参数的方式
  - params类型
    - 配置路由格式：/router/：id
    - 传递的方式：在path后面跟上对应的值
    - 传递后形成路径：/router/123， /router/abc
  - query类型
    - 配置路由格式：/router，也就是普通配置
    - 传递的方式：对象中使用query的key作为传递方式
    - 传递后形成路径：/router？id=123， /router？ id=abc
- 使用方式
  - <router-link>to的方式
  - JavaScript代码方式

```js
//<router-link>to的方式
<router-link :to="{path:'/profile/'+123,  query:{name:'why',age:18}}"></router-link>

//JavaScript代码方式
export default{
  name:'App',
  methods:{
    toProfile(){
      this.$router.push({
        path:'/profile/'+123,
        query:{name:'why',age:18}}
      })
    }
  }
}
```

- 获取参数
  - 获取参数通过$route对象获取
- $route和$router区别
  - $route为VueRoute实例，想要导航到不同的URL，则使用$route.push方法
  - $route为当前router跳转对象里面获取name、path、query、params等

### 导航守卫

- vue-router提供的导航守卫主要用来监听监听路由的进入和离开的
- vue-router提供了beforeEach和afterEach的钩子函数, 它们会在路由即将改变前和改变后触发
- 我们可以利用beforeEach来完成标题的修改
  - 首先, 我们可以在钩子当中定义一些标题, 可以利用meta来定义
  - 其次, 利用导航守卫,修改我们的标题

```js
//to:即将要进入的目标的路由对象
//from：当前导航即将要离开的路由对象
//next：调用该方法时，才能进入下一个钩子
router.beforeEach((to,from,next) =>{
  window.document.title = to.meta.title
  next()
})
//如果是后置钩子afterEach，不需要主动调用next()函数
```

### keep-alive

- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染
  - include - 字符串或正则表达，只有匹配的组件会被缓存
  - exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存
  - router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存：


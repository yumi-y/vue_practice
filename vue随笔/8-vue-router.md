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


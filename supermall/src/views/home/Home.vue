<template>
  <div id="home">
    <!-- 在插件中在定义一个class，用于进行单独的样式设置 -->
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" />
    <good-list :goods="goods['pop'].list />"
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

//首页请求数据  单独对首页进行封装，更为合理
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    //插入组件
    NavBar,
    TabControl,
    GoodList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      //取出数据
      banners: [],
      recommends: [],
      goods: {
        pop: { pages: 0, list: [] },
        new: { pages: 0, list: [] },
        sell: { pages: 0, list: [] },
      },
    };
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata();

    //2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    //函数调用->押入函数栈(保存函数调用过程中的所有变量)
    //函数调用结束->弹出函数栈(释放函数所有的变量)
    //即函数调用结束之后res会消失，被内存回收
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //需要对res的数据进行保存
        //此处this指向的是created的this，created的this又代表的是上一层的组件
        //this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //垃圾回收是指系统查询到某个对象没有引用指向他时，就会将这个对象回收

    getHomeGoods(type) {
      //设置向已加载页面再加载一页，用于复用
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //...表示可以传入多个参数
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style>
.home-nav {
  background-color: rgb(243, 155, 169);
  color: #fff;
  font-size: 14px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
}
.tab-control {
  /* 未达到所需位置之前，浏览器会默认为sticky属性，当达到所需位置之后，浏览器会自动更改为flex属性 */
  position: sticky;
  top: 44px;
}
</style>

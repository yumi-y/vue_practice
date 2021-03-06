import Vue from "vue";
import App from "./App";
import axios from "axios";
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
});
axios({
  url: "http://123.207.32.32:8000/home/multidata"
}).then(res => {
  console.log(res);
});
axios({
  url: "http://123.207.32.32:8000/home/data",
  //专门针对get请求的参数拼接
  params: {
    type: "pop",
    page: 1
  }
}).then(res => {
  console.log(res);
});

//2、axios发送并发请求
axios.all([axios(), axios()]).then(result => {});

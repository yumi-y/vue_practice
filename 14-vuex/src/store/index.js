import Vue from "vue";
import Vuex from "vuex";

//1、安装插件
Vue.use(Vuex);

//2、创建对象
const moduleA = {
  state: {
    name: "james"
  },
  mutations: {
    updateName(state, payload) {
      state.name.payload;
    }
  },
  actions: {
    aUpdateName(context) {
      setTimeout(() => {
        context.commit("updateName", "wangwu");
      }, 1000);
    }
  },
  getters: {
    fullName(state) {
      return state.name + "111";
    },
    //以下括号中的getters就是调用了外部这个getter
    fullName2(state, getters) {
      return getters.fullName + "222";
    },
    //root表示根的状态
    fullName3(state, getters, rootState) {
      return getters.fullName2 + rootState.counter;
    }
  }
};

const store = new Vuex.Store({
  state: {
    counter: 1000,
    students: [
      { id: 110, name: "why", age: 2 },
      { id: 111, name: "curry", age: 3 },
      { id: 112, name: "james", age: 4 },
      { id: 113, name: "kobe", age: 5 }
    ],
    //这些属性都会被加入到响应式系统中，响应式系统会监听属性的变化，
    //当属性发生变化时，会通知所有页面中用到该属性的地方，让界面发生刷新
    info: {
      name: "kobe",
      age: 40,
      height: 1.98
    }
  },
  mutations: {
    //方法
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    incrementCount(state, count) {
      state.counter += count;
    },
    addStudent(state, stu) {
      state.students.push(stu);
    },
    updateInfo(state) {
      state.info.name = "coderwhy";
      //以下方法可以添加属性，但不会让界面刷新
      //state.info['address']='洛杉矶'
      //Vue.set(state.info, "address", "洛杉矶");
      //删除属性
      //Vue.delete(state.info, "age");
    }
  },
  actions: {
    //context：上下文
    //aUpdateInfo(context, payload) {
    //  setTimeout(() => {
    //    context.commit("updateInfo");
    //    console.log(payload.message);
    //    payload.success();
    //  }, 1000);
    //}

    aUpdateInfo(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit("updateInfo");
          console.log(payload);
          resolve("11");
        }, 1000);
      });
    }
  },
  getters: {
    powerCounter(state) {
      return state.counter * state.counter;
    },
    more2stu(state) {
      return state.students.filter(s => s.age > 3);
    },
    more2stuLength(state, getters) {
      return getters.more2stu.length;
    },
    moreAgeStu(state) {
      return function(age) {
        return state.students.filter(s => s.age > age);
      };
    }
  },
  modules: {
    a: moduleA
  }
});
//导出store独享
export default store;

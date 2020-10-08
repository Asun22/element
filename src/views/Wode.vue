<template>
  <div class="sdbox">
    <div class="sdheader">
      <div class="header">
        <ul>
          <li @click="go">《</li>
          <li>我的</li>
          <li></li>
        </ul>
      </div>
      <div class="sdyh">
        <!--v-for="(item,index) in user" :key="index"  -->
        <div class="sdyh1">
          <img class="sdimg" src="//elm.cangdu.org/img/default.jpg" alt />
        </div>
        <div class="sdyh2">
          <p>{{user.username}}</p>
          <p>暂无绑定手机号</p>
        </div>
      </div>
    </div>
    <div>
      <ul class="sdul">
        <li>
          <span class="sdfs">0.00</span>
          <span>元</span>

          <p>我的余额</p>
        </li>
        <li>
          <span class="sdfss">3</span>
          <span>个</span>

          <p>我的余额</p>
        </li>
        <li>
          <span class="sdfsss">0</span>
          <span>分</span>

          <p>我的积分</p>
        </li>
      </ul>
    </div>
    <div class="sdlbui">
      <ul>
        <li>
          <p>
            <router-link to="Dingdan">我的订单</router-link>
          </p>
          <p>></p>
        </li>
        <li>
          <p>积分商城</p>
          <p>></p>
        </li>
        <li>
          <p>饿了么会员卡</p>
          <p>></p>
        </li>
      </ul>
    </div>
    <div class="sdlbui">
      <ul>
        <li>
          <p>服务中心</p>
          <p>></p>
        </li>
        <li>
          <p>下载饿了么APP</p>
          <p>></p>
        </li>
      </ul>
    </div>
    <!-- {{user}} -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">
        <router-link to="Weimai">外卖</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="search">
        <router-link to="Sousuo">搜索</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        <router-link to="Dingdan">订单</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        <router-link to="Wode">我的</router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import axios from "axios";
import { ajaxWode } from "../utils/api";

export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      user: JSON.parse(localStorage.getItem("s")) || [],
      // user:[],
      active: ""
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    go() {
      this.$router.go(-1);
    },

    async ajaxUser() {
      let { data } = await ajaxWode("Null");
      console.log(data);
      this.user = data;
      localStorage.setItem("s", JSON.stringify(this.user));
    }
  },
  // 以下是生命周期钩子 注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
    this.ajaxUser();

    // export function ajaxWode(data) {
    //     return posts(`/v1/user`,data)
    // }
  },
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {}
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
.sdul {
  display: flex;
  background: #fff;
}
.sdul > li {
  width: 33.3%;
  text-align: center;
  padding: 10px;
  border-right: 1px solid #ddd;
}
.sdul > li > .sdfs {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: orange;
}
.sdul > li > .sdfss {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: red;
}
.sdul > li > .sdfsss {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: green;
}
.sdyh {
  display: flex;
}
.sdyh1 {
  margin-top: 40px;
  margin-left: 20px;
}
.sdyh2 {
  font-size: 20px;
  color: #fff;
  margin-top: 40px;
  margin-left: 20px;
}
.sdimg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.sdheader {
  width: 100%;
  height: 200px;
  background: #3190e8;
}
.header {
  width: 100%;
  height: 64px;
  background: #3190e8;
  line-height: 40px;
}
.header > ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
.header > ul > li {
  font-size: 20px;
  color: #fff;
  padding: 10px;
}
.sdbox {
  background: #ddd;
}
.sdlbui {
  margin-top: 10px;
  width: 100%;
  background: #fff;
}
.sdlbui > ul {
  width: 100%;
}
.sdlbui > ul > li {
  margin-left: 40px;
  border-bottom: 1px solid #ddd;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
</style>

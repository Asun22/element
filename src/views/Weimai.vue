<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <ul>
        <li>
          <router-link to="Sousuo">
            <van-icon name="search" />
          </router-link>
        </li>
        <li>长宁区北新泾明基商...</li>
        <li>
          <router-link to="Wode">
            <van-icon name="manager-o" />
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 内容 -->
    <div class="sdlb">
      <van-swipe class="my-swipe" :autoplay="8000" indicator-color="white">
        <van-swipe-item>
          <ul>
            <li v-for="(item,index) in geohash" :key="index" v-if="(index>=8)">
              <img :src="pic+item.image_url" alt />
              <p>{{item.title}}</p>
            </li>
          </ul>
        </van-swipe-item>
        <van-swipe-item>
          <ul>
            <li v-for="(item,index) in geohash" :key="index" v-if="(index<8)">
              <img :src="pic+item.image_url" alt />
              <p>{{item.title}}</p>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <p>附近商家</p>
      <div>
<van-card v-for="(i,k) in restaurant_id" :key="k"
  :price="i.float_minimum_order_amount+'起送/配送费约￥' +i.float_delivery_fee"
  :desc="'月售'+i.recent_order_num+'单'"
  :title="i.name"
  :thumb="pics+i.image_path"
/>




        <!-- <dl v-for="(i,k) in restaurant_id" :key="k">
          <dt>
            <van-card :thumb="pics+i.image_path" />
          </dt>
          <dd>
            <div>
              <p class="sdp1">{{ i.name }}</p>
              <p class="sdp2">月售{{ i.recent_order_num}}单</p>
              <p class="sdp3">￥{{i.float_minimum_order_amount}}起送/配送费约￥{{ i.float_delivery_fee}}</p>
            </div>
            <div></div>
          </dd>
        </dl> -->
      </div>

      <!-- {{restaurant_id}} -->
    </div>
    <!-- 尾 -->
    <div>
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
  </div>
</template>

<script>
import { ajaxWm } from "../utils/api";
// import { ajaxSj } from "../utils/api";
import axios from "axios";

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
      active: "",
      geohash: [],
      restaurant_id: []
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    getCtiry() {
      let ctiry = JSON.parse(window.localStorage.getItem("Ctiry"));
      this.Ctiry = this.$router.query == undefind ? ctiry : this.$route.query;
    },
    async ajaxWm() {
      let { data } = await ajaxWm("type");
      console.log(data);
      this.geohash = data;
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
    this.ajaxWm();
    // this.ajaxSj();
    // this.getCtiry()
    this.pic = "https://fuss10.elemecdn.com";
    this.pics = "//elm.cangdu.org/img/";

    axios
      .get(
        "http://elm.cangdu.org/shopping/restaurants?latitude='${this.Ctiry.latitude}'+&longitude=+'${this.Ctiry.longitude}'+&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`"
      )
      .then(res => {
        console.log(res);
        this.restaurant_id = res.data;
      });
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
.my-swipe .van-swipe-item[data-v-11746458] {
  background: #fff !important ;
  color: #000;
}
.van-multi-ellipsis--l2  {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  /* padding: 4px; */
}
.van-card__content {
  padding: 8px;
  margin-top: 4px;
  font-size: 12px;
  color: rgb(151, 140, 140);
}
.van-card {
  font-size: 18px;
  color: rgb(151, 140, 140);
}
dl {
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #ddd;
}
dl > dd > div > p {
  margin: 0;
  padding: 0;
  list-style: none;
}
dl > dt > img {
  width: 70px;
  height: 70px;
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
  font-size: 30px;
  color: #fff;
  padding: 10px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.sdlb {
  width: 100%;
}
.sdlb ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.sdlb ul > li {
  width: 25%;
  box-sizing: border-box;
  text-align: center;
  flex-wrap: wrap;
}
.sdlb ul > li > img {
  width: 70px;
  height: 70px;
}
</style>



<template>
  <div>
    <van-sticky :offset-top="0">
      <div class="header">
        <ul>
          <li>
            <h2>ele.me</h2>
          </li>
          <li>
            <div v-show="!flag" ></div>
            <div v-show="flag" @click="toJump('zd')" >置顶</div>
          </li>
          <li>
                  <div  @click="jump('/Logo')">登录|注册</div>

            <!-- <router-link to="/Logo">登录|注册</router-link> -->
          </li>
        </ul>
      </div>
      <!-- <van-button type="info">吸顶距离</van-button> -->
    </van-sticky>

    <!-- 当前城市 -->
    <div class="dq">
      <p>当前定位城市</p>
      <p>定位不准时，请在城市列表中选择</p>
    </div>
    <!-- 定位 -->
    <div class="dw">
      <h3 class="blue">{{ guess.name }}</h3>
    </div>
    <!-- 热门 -->
    <div class="sdhot">
      <ul>
        <li v-for="(i,k) in hot" :key="k">{{i.name}}</li>
      </ul>
    </div>
    <!-- 右侧定位 -->
    <div class="cityPosition">
      <div v-for="(item,index) in zlist" :key="index">
        <span @click="toJump(item)">{{ item }}</span>
      </div>
    </div>
    <!-- 索引 -->
    <div v-for="(item,index) in zlist" :key="index" >
      <p class="sdzm" :id="item" :ref="item">{{ item }}</p>
      <ul class="hot">
        <li @click="jumpCity(item.id,item.name)" v-for="(t,i) in group[item]" :key="i">{{ t.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ajaxCity } from "../utils/api";

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
      guess: {},
      hot: [],
      group: {},
      zlist: [],
      flag: false
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
     jumpCity(id,name) {
        console.log(id)
        this.$router.push({
            path:"/Sousuo",
            query:{
                cityId:id,
                cityName:name
            }
        })
    },
    async ajaxGuess() {
      // 请求当前城市
      let { data } = await ajaxCity("guess");
      console.log(data);
      this.guess = data;

      // 请求热门城市
      let { data: res } = await ajaxCity("hot");
      console.log(res);
      this.hot = res;

      // 请求字母排序
      let { data: resgroup } = await ajaxCity("group");
      console.log(resgroup);

      // 写法1
      // Object.keys(resgroup).sort().map((item)=>{
      //   this.$set(this.group,item,resgroup[item])
      //   // this.group[item] = resgroup[item]
      // })
      // this.group = resgroup
      // console.log(this)
      // this.$set(this.group,1,1)
      // console.log(this.group)

      // 写法2
      this.group = resgroup;
      this.zlist = Object.keys(resgroup).sort();
    },
    // 跳转到指定位置
    toJump(z) {
      if (z != "zd") {
        // 点击的是字母
        document.body.scrollTop = document.documentElement.scrollTop =
          this.$refs[z][0].offsetTop - 65;
      } else {
        // 吸顶
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
      // console.log(this.$refs[z][0].offsetTop - 50)  // 获取元素距离顶部的高度 减去50
    },
    handleScrollx() {
      // console.log("滚动高度", window.pageYOffset);
      if (window.pageYOffset > 50) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      // console.log(this.flag);
    },
    // 跳转方法
    jump(path, data) {
      this.$router.push({
        path,
        query: {
          data
        }
      });
    }
  },
  mounted() {
    this.ajaxGuess();
    window.addEventListener("scroll", this.handleScrollx, true);

    // this.$axios.get("http://elm.cangdu.org/v1/cities?type=guess").then(res => {
    //   // console.log(res)
    //   this.guess = res.data;
    // });
    // this.$axios.get("http://elm.cangdu.org/v1/cities?type=hot").then(res => {
    //   // console.log(res)
    //   this.hot = res.data;
    // });
    // this.$axios.get("http://elm.cangdu.org/v1/cities?type=group").then(res => {
    //   // console.log(res);
    //   this.group = res.data;
    //   // console.log(Object.keys(this.group));
    // });
  }
};
</script> 


<style scoped>
.sdzm{
 padding: 10px;
}
* {
  margin: 0;
  padding: 0;
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
.dq {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #000;
  padding: 20px;
  border-bottom: 1px solid #000;
  color: #ddd;
}
.dw {
  padding: 20px;
  border-bottom: 1px solid #000;
}
.sdhot > ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.blue {
  color: #3190e8;
}
.sdhot > ul > li {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
  width: 25%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3190e8;
}
.sda {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* padding: 10px; */
}
.sda > li {
  width: 25%;
  padding: 12px;
  box-sizing: border-box;
  /* height: 20px; */
  text-align: center;
  border: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hot {
  display: flex;
  /* justify-content: ; */
  flex-wrap: wrap;
  text-align: center;
}
.hot > li {
  width: 25%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cityPosition {
  position: fixed;
  right: 0;
  top: 20%;
  z-index: 1000;
  background: #fff;
  font-size: 16px;
}
</style>

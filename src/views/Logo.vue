<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <ul>
        <li @click="prev">《</li>

        <li>密码登录</li>
        <li></li>
      </ul>
    </div>
    <!-- 正则验证 -->
    <div>
      <input type="text" class="sdin" v-model="username" placeholder="用户名" />
      <input type="text" class="sdin" v-model="password" placeholder="密码" />
      <div class="code">
        <input type="text" class="sdins" v-model="captcha_code" placeholder="验证码" />
        <img :src="cap" alt />
      </div>
    </div>
    <p class="red">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="red">注册过的用户可凭账号密码登录</p>
    <br />
    <button @click="submit">登录</button>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true; //配置为true
// import { ajaxCode,ajaxLogin } from '../utils/api'
export default {
  data() {
    return {
      cap: "", // 验证码
      username: "",
      password: "",
      captcha_code: ""
    };
  },
  components: {},
  created() {},
  mounted() {
    this.ajaxCodeFn();
  },
  methods: {
       prev() {
      this.$router.go(-1);
        },
    setCookie(key, value, t) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
    },
    // 获取验证码
    async ajaxCodeFn() {
      let { data: res } = await axios.post("/api/v1/captchas");
      console.log(res)
      this.cap = res.code;
    },
    // 登录
    async submit() {
      this.setCookie("cap", this.captcha_code, 2);
      this.setCookie("SID", 100, 2);
      // let { data:res } = await ajaxLogin({
      //     username:this.username,
      //     password:this.password,
      //     captcha_code:this.captcha_code
      // })

      let { data: res } = await axios.post("/api/v2/login", {
        username: this.username,
        password: this.password,
        captcha_code: this.captcha_code,
         
      },
     
      );
      console.log(res);
     localStorage.setItem('username','password','captcha_code')
      // if( "username" ==this.username||"password" == this.password || "captcha_code"== this.captcha_code){
this.$router.replace({
                path:"/Wode"
            })
        // }
      
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
.code {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red {
  color: red;
  padding: 5px 20px;
  font-size: 14px;
}
.sdkg {
  background-color: #ddd !important;
}

.sdmima {
  position: relative;
}
.sdkg {
  /* margin-top: 25px; */
  position: absolute;
  right: 10px;
  top: 10px;
}
.sdimg {
  width: 100px;
  height: 80px;
}
.imgDiv {
  display: flex;
}
.sdins {
  margin-top: 20px;
  width: 60%;
  height: 50px;
  border: none;
  border-bottom: 1px solid #000;
}
.sdinds {
  width: 85%;
  height: 50px;

  border: none;
  border-bottom: 1px solid #000;
}
.sdin {
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid #000;
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
h2 {
  padding: 0;
  margin: 0;
}
button {
  width: 100%;
  height: 50px;
  background: rgb(166, 241, 166);
  border: none;
  margin-top: 20px;
}
</style>

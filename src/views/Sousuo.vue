<template>
    <div>
        <!-- <div class="header">
            <div @click="back"><i style="font-size:26px;" class="el-icon-back"></i></div>
            <div>{{ $route.query.cityName }}</div>
            <div @click="back">切换城市</div>
        </div> -->
        <div class="header">
            <div slot="left"><div @click="back"><i style="font-size:26px;" class="el-icon-back"></i></div></div>
            <div slot="title">{{ $route.query.cityName }}</div>
            <div slot="right"><div @click="back">切换城市</div></div>
        </div>
        <div class="search">
            <input v-model="inputText" type="search" placeholder="请输入学校，地址，商务楼">
        </div>
        <div @click="submit" class="btn">
           提交
        </div>
        <ul v-if="list.length>0">
            <li @click="storage(item)" v-for="(item,index) in list" :key='index'>
                <p>{{ item.name }}</p>
                <p>
                    {{ item.address }}
                </p>
            </li>
        </ul>
        <div v-else>
            <h4>搜索历史</h4>
            <ul>
                <li v-for="(item,index) in historyList" :key="index">
                    <p>{{ item.name }}</p>
                    <p>
                        {{ item.address }}
                    </p>
                </li>
            </ul>
            <button @click="clearFn">清空历史记录</button>
        </div>
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
// import appHeader from '@/components/Header'
import axios from 'axios'
export default {
    data() {
        return {
            cityId:"",
            inputText:"",    // input 输入框中的值
            list:[],         // 点击提交按钮时，搜索出来的内容
            historyList:[],   // 历史记录的数据
      active:""  
        };
    },
    components:{
        // appHeader
    },
    created() {
        // console.log(this.$route)
        this.cityId = this.$route.query.cityId
        // alert(this.$route.query.cityId)

        // 取到历史记录数据
        let his = window.localStorage.getItem("history")
        // 如果有数据，证明之前存储过
        if(his) {
            this.historyList = JSON.parse(his)
        }
    },
    mounted() {

    },
    methods: {
        // 点击提交时，触发的方法
        submit() {
            axios.get(`http://elm.cangdu.org/v1/pois?type=search&city_id=${this.cityId}&keyword=${this.inputText}`).then((res)=>{
                console.log(res)
                this.list = res.data
            })
        },
        // 点击一个地址，可以把该信息进行本地存储
        storage(item) {
            console.log(item)
            console.log(item.latitude)
            console.log(item.longitude)
            this.$store.commit("changeLatitude",item.latitude)  // 向vuex中存精度
            this.$store.commit("changeLongitude",item.longitude) // 存纬度

            let his = window.localStorage.getItem("history")

            let arr = [] // 创建一个空数组
            if(his) {
                arr = JSON.parse(his)
                //加判断：
                // 1.如果你是重复的数据，那么不添加，不重复才添加
                // 2.最多四条，，如果是已经有四条历史记录了，添加新点击的数据，第一条删掉
                let index = arr.findIndex((v)=>{
                    return v.latitude == item.latitude
                })
                // 正在添加重复数据
                if(index != -1) {
                    // alert("已经添加过历史")
                } else {
                    // 已经判断好了，不是重复数据
                    if(arr.length >= 4) {
                        arr.shift()
                        // arr.splice(0,1)
                    }
                    arr.push(item)
                    
                }
                
            } else {
                arr.push(item)
            }
            window.localStorage.setItem("history",JSON.stringify(arr))

            this.$router.push({
                path:"/Msite",
                query:{
                    cityId:this.cityId,
                    cityName:this.$route.query.cityName
                }
            })
        },
        clearFn() {
            console.log("清空")
            this.historyList = []
            window.localStorage.removeItem("history")
        },
        // 返回城市列表的事件
        back() {
            this.$router.replace({
                path:"/Ctiry"
            })
        }
    }
};
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    background: #3190e8;
    height: 50px;
    line-height: 50px;
    padding: 0 10px; 
    color:#fff;
}
.header>div:nth-child(2n-1){
    width:70px;
    text-align: center;
    display: flex;
    align-items: center;
    /* justify-content: center; */
}
.search{
    width:90%;
    margin: 30px auto;
}
.search>input{
    width:100%;
    height:40px;
}
.btn{
    width:90%;
    margin: 0 auto;
    background: #3190e8;
    color:#fff;
    text-align: center;
    height:40px;
    line-height: 40px;
}
ul{
    margin-top:20px;
}
ul>li{
    border: 1px solid #ddd;
    padding: 20px;
}
ul>li>p:first-child{
    font-size: 18px;

}
ul>li>p:last-child{
    font-size: 14px;
    color:#ddd;
    margin-top:15px;
}

</style>

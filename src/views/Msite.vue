<template>
    <div>
        <div class="header">
            <div slot="left" style="margin:0 auto"><i class="el-icon-search"></i></div>
            <div slot="title">{{ title }}</div>
            <div slot="right" style="margin:0 auto"><i class="el-icon-s-custom"></i></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from "axios";

// import appHeader from '@/components/Header'
export default {
    data() {
        return {
            title:""
        };
    },
    // 计算属性
    computed:{
        ...mapState(["latitude","longitude"])
    },
    components:{
        // appHeader
    },
    created() {
//  axios
//       .post(
//         "http://elm.cangdu.org/v1/user?user_id=null"
//       )
//       .then(res => {
//         console.log(res);
//         this.user = res.data;
//       });
    },
    mounted() {
        axios.get(`http://elm.cangdu.org/v2/pois/${this.latitude},${this.longitude}`).then((res)=>{
            console.log(res)
            this.title = res.data.name
        })
    },
    methods: {

    }
};
</script>

<style scoped>

</style>

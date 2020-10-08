import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    count:100,
    arr:[1,2,3,4],
    latitude:"",  // 经度
    longitude:"", // 维度
    isLoading:false
},
mutations:{
  // 改变loading组件的隐藏显示
  changeLoading(state,bool) {
      state.isLoading = bool
  },
  // 改变经度
  changeLatitude(state,lat){
      state.latitude = lat
  },
  // 改变维度
  changeLongitude(state,long) {
      state.longitude = long
  }
},
  actions: {
  },
  modules: {
  }
})

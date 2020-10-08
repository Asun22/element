import Vue from 'vue'
import VueRouter from 'vue-router'
import Ctiry from '../views/Ctiry.vue'
import Logo from '../views/Logo.vue'
import Sousuo from '../views/Sousuo.vue'
import Msite from '../views/Msite.vue'
import Wode from '../views/Wode.vue'
import Weimai from '../views/Weimai.vue'
import Dingdan from '../views/Dingdan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'Ctiry'
  },
  {
    path: '/Weimai',
    name: 'Weimai',
    component: Weimai
  },

  {
    path: '/Dingdan',
    name: 'Dingdan',
    component: Dingdan
  },
  {
    path: '/Wode',
    name: 'Wode',
    component: Wode,
    children:[
    ]
  },
  {
    path: '/Ctiry',
    name: 'Ctiry',
    component: Ctiry
  },
  {
    path: '/Logo',
    name: 'Logo',
    component: Logo
  },

{
    path: '/Sousuo',
    name: 'Sousuo',
    component: Sousuo
  },
  {
    path: '/Msite',
    name: 'Msite',
    component: Msite
  },
 

 
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Goodlist from '@/views/Goodlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goodlist',
      component: Goodlist
    }
  ]
})
   
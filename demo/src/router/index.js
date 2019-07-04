import Vue from 'vue'
import Router from 'vue-router'
import Goodlist from '@/views/Goodlist'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goodlist',
      component: Goodlist
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess/:id',
      name: 'OrderSuccess',
      component: OrderSuccess
    }

  ]
})
    
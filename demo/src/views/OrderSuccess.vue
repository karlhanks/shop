<template>
 <div class="orderSuccess">
     <div>
  <div class="container">
    <div class="page-title-normal">
      <!-- <h2 class="page-title-h2"><span>检查</span></h2> -->
    </div>
    <!-- 进度条 -->
    <div class="check-step">
        <ul>
          <li><span>确认</span> 地址</li>
          <li><span>确定</span> 订单</li>
          <li class="cur"><span>查看</span> 订单</li>
        </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>祝贺你! <br>你的订单创建成功!</h3>
        <p>
          <span>{{orderinfo.order_no}}</span>
          <span>{{orderinfo.total_price}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <a href="javascript:;" class="btn btn--m">返回购物车</a>
          </div>
          <div class="btn-r-wrap">
            <a href="javascript:;" class="btn btn--m">订单列表</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 </div>
</template>
 
<script>
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'
import axios from 'axios'
export default {
  data(){
    return {
      userId:'',
      orderinfo:{}
    }
  },
  methods:{
    initData(){
      let orderid=this.$route.params.id
      this.userId=localStorage.getItem('userId')
      axios({
        url:'http://49.234.95.82:8091/index.php/api/order/detail',
        data:`userId=${this.userId}&orderId=${orderid}`,
        method:'post'
      }).then(res=>{
        console.log(res)
        this.orderinfo=res.data.data
      })
    }
  },
  created(){
    this.initData()
  }
}
</script>
 
<style scoped >
 
</style>
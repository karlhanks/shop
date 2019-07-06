<template>
  <div class="Goodlist">
    <NavHeader></NavHeader>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <NavBread>
          <a href="/">首页</a>
          <span>商品列表</span>
        </NavBread>
      </div>
    </div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a
            href="javascript:void(0)"
            class="price"
            @click="goodsOrder"
            v-bind:class="{'sort-up':order}"
          >
            价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">过滤规则</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':maxprice=='all'}"
                  @click="goodsWhere('all','all')"
                >All</a>
              </dd>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':maxprice==100}"
                  @click="goodsWhere(0,100)"
                >0 - 100</a>
              </dd>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':maxprice==500}"
                  @click="goodsWhere(100,500)"
                >100 - 500</a>
              </dd>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':maxprice==1000}"
                  @click="goodsWhere(500,1000)"
                >500 - 1000</a>
              </dd>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':maxprice==2000}"
                  @click="goodsWhere(1000,2000)"
                >1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul class="content">
                <li v-for="(good,index) in goodlist" :key="index">
                  <div class="pic">
                    <a href="#">
                      <img :src="good.img2" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{good.title}}</div>
                    <div class="price">{{good.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(good.id)">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li ref='more' class="more" >查看更多</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
<!-- 未登录状态显示的弹框 -->
    <modal v-bind:isMdShow="isCartErrorShowFlag" @close="isCartErrorShowFlag = false">
      <div slot="message">请先登录，否则无法加入到购物车中!</div>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="isCartErrorShowFlag = false">关闭</a>
      </div>
    </modal>

<!-- 已登录状态显示的成功加入购物车弹框 -->
    <modal v-bind:isMdShow="isCartOkShowFlag" @close="isCartOkShowFlag = false">
      <div slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok" />
        </svg>
        <span>加入购物车成!</span>!
      </div>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="isCartOkShowFlag = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <!-- <Modal :isMdShow='testMdShow' @close='closeModal'></Modal> -->
    <NavFooter></NavFooter>
  </div>
</template>
<script src="https://unpkg.com/better-scroll/dist/bscroll.min.js"></script>
<script>
//导入CSS
import "@/assets/css/base.css";
import "@/assets/css/product.css";

import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import NavBread from "@/components/NavBread";
import Modal from "@/components/Modal";
import axios from "axios";
import BScroll from 'better-scroll'
export default {
  //声明模型数据
  data() {
    return {
      // testMdShow: true,
      isCartErrorShowFlag: false,
      isCartOkShowFlag: false,
      goodlist: [],
      order: false,
      minprice: "all",
      maxprice: "all",
      pagenum:1,
    };
  },
  //声明组件
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  //声明普通方法
  methods: {
    closeModal() {
      this.testMdShow = false;
    },
    goodsOrder() {
      //排序
      this.order = !this.order;
      this.initData();
    },
    goodsWhere(minprice, maxprice) {
      //根据价格筛选
      this.minprice = minprice;
      this.maxprice = maxprice;
      this.initData();
    },
    addCart(goodid) {
      //加入购物车
      let useid = localStorage.getItem('userId');
      if(!useid){
        this.isCartErrorShowFlag=true
        return
      }
      axios({
        method:'post',
        url:'http://118.31.9.103/api/cart/create',
        data:`userId=${useid}&goodsId=${goodid}`
      }).then(res=>{
        if(res.data.meta.state==201){
                this.isCartOkShowFlag = true;
        }else{
          alert(res.data.meta.msg)
        }
      }
      ).catch(error=>{
        console.log(error)
      })
      ;
    },
    //初始化数据
    initData(scroll) {
      let order = this.order ? "asc" : "desc";
      axios({
        url: `http://118.31.9.103/api/goods/index?order=${order}&minprice=${this.minprice}&maxprice=${this.maxprice}&pagesize=8&pagenum=${this.pagenum}`,
        method: "get"
      })
        .then(res => {
          if(scroll){
            scroll.finishPullUp()
            let tmp = this.goodlist.concat(res.data.data)
            this.goodlist=tmp
            this.$$refs.more.innerHTML='查看更多'
          }else{
            this.goodlist= res.data.data
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.initData();
  },
  mounted(){
    this.$nextTick(()=>{
      let wrapper=document.querySelector('.accessory-list')
      let scroll= new BScroll(wrapper,{
        pullUpLoad:{
          threshold:50
        }
    })
    scroll.on('pullingUp',()=>{
      this.$refs.more.innerHTML='加载中。。。'
      this.pagenum+=1
      this.initData(scroll)
    })
    })
}
};
</script>
 
<style scoped >
.more{
  width: 100%;height: 30px;text-align: center;background: #ccc
}
.accessory-list{
  height:564px;
  overflow: hidden;
}
</style>
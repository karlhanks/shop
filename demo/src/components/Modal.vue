<template>
    <div class="Modal">
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':isMdShow}">
        <div class="md-modal-inner">
          <!-- 弹框关闭 -->
          <div class="md-top">
            <slot name="title"></slot>
            <button class="md-close" @click="closeModal">Close</button>
          </div>
          <!-- 弹框内数据 -->
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
                <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <!-- 
      灰色遮罩
      知识点： v-if 控制DOM（HTML代码不显示）  v-show 控制样式（通过display不显示）
      -->
      <div class="md-overlay" v-if="isMdShow" @click="closeModal"></div>
    </div>
</template>
<script>
export default{
  props:['isMdShow'],
  //模型数据（M）
  data(){
    return {
      //是否显示遮罩:true-是，false-否
      // isMdShow: true
    }
  },
  methods:{
    closeModal(){
      this.$emit('close')
    }
  }
}
</script>
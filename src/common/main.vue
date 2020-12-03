<template>
  <div class="main-page">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
      <my-footer></my-footer>
    </el-container>
  </div>
</template>

<script>
    import MyHeader from './header'
    import MyFooter from '@/common/footer'
    
    export default {
      components:{
        MyHeader, MyFooter
      },
      name: "",
      created(){

      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    line-height: 60px;
    padding: 0px!important;
  }
  .el-main {
    min-height: 600px;
  }

</style>

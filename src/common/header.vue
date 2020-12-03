<template>
    <div class="page-header">
      <el-menu
        :default-active="$route.path"　
        class="el-menu-demo"
        mode="horizontal"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect">
        <!-- <el-menu-item index="/main" router>首页</el-menu-item> -->
        
        <el-submenu index="user-mgmt">
          <template slot="title">系统管理</template>
          <!--<el-menu-item index="/main/user">用户管理</el-menu-item>-->
          <!--<el-menu-item index="/main/role">角色管理</el-menu-item>-->
          <el-menu-item index="/admin/users">用户管理</el-menu-item>
          <el-menu-item index="/admin/roles">角色管理</el-menu-item>
        </el-submenu>
        
        <el-submenu index="user-info" style="float: right">
          <template slot="title"><span class="el-icon-user user-info" title="个人中心"></span>测试用户</template>
          <el-menu-item index="/profile">修改密码</el-menu-item>
          
          <el-menu-item index="/profile">个人中心</el-menu-item>
          
          <el-menu-item index="/">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
    export default {
      name: "",
      data(){
        return{
          activeIndex: '/forum',
        }
      },
      methods:{
        handleSelect(key, keyPath) {
            if("/logoff" == key){
                location.href = "#/"
                //logoff
            }
            console.log(key, keyPath);
        }
      },
      created(){
      }
    }
</script>

<style scoped>
  .page-header{
    width: 100%;
  }
  .user-info{
    font-size:20px
  }

</style>

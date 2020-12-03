<template>
  <div id="login">
    <div class="login_block">
      <p>部门信息化平台</p>
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="60px" class="demo-loginForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="passWord" v-model="loginForm.passWord" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:40px;">
          <el-button class="login-button" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  var res = {}
  export default {
    name: "login",
    data(){
      var checkName = (rule,value,callback) => {
        if(!value){
          return callback(new Error('用户名不能为空'));
        }else{
          //查询用户是否存在
          this.ajaxGET("/department/store/v2.1/bmgl/sys_user",{
            query:JSON.stringify({
              userName:value,
            }),
          }).then((response) =>{
            res = response
            if(response.pager.total == 0){
              return callback(new Error('用户名不存在'));
            }else{
              callback();
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      };

      var checkPass = (rulr,value,callback) => {
        setTimeout(function () {
          if(!value){
            return callback(new Error('密码不能为空'))
            //如果用户没有修改过密码,则旧密码为初始密码'12345678'
          }else if(!res[0].passWord){
            if(value == 12345678){
              callback();
            }else{
              return callback(new Error('密码错误'))
            }
          }else if(res[0].passWord){
            if(value == res[0].passWord){
              callback();
            }else{
              return callback(new Error('密码错误'))
            }
          }
        },100)
      }
      return {
        login_obj:'登录',
        loginForm:{
          userName:'',
          passWord:'',
        },
        loginRules: {
          userName: [
            { validator: checkName, trigger: 'blur' }
          ],
          passWord: [
            { validator: checkPass, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$cookieStore.setCookie( 'id' ,res[0]._id, 2678400);//存入用户名，设置有效时间一个月
            this.$router.push('/main')
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
  el-input{
    width: 200px;
  }
  #login{
    background: url("../assets/image/loginba.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  .login_block{
    position: absolute;
    width:380px;
    height:200px;
    right: 20%;
    top: 50%;
    /*margin-left: -190px;*/
    margin-top: -130px;
    text-align: center;
    padding: 30px;
    padding-top: 40px;
    border-radius: 5px;
    text-align: center;
    background-color: #ffffff;
  p{
    text-align:center;
    white-space: nowrap;
    position: absolute;
    left: 90px;
    top:-80px;
    font-size:32px;
    font-weight: 600;
    letter-spacing:5px;
    color: #ffffff;
  }
  .login-button{
    padding: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #00619B;
    color: #ffffff;
  }
  }
  }
</style>

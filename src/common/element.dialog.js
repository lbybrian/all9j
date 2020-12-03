import ElementUI, {Message} from 'element-ui'
/**
 * 公共js
 */

/**
 * 开启loading
 * @returns {*} 返回loading
 */
export function openLoadingCommon(notice,id){
  let loading = null;
  if(id == null || id == ""){
    loading = this.$loading({
      lock: true,
      text: notice,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)'
    });
  }else{
    loading = this.$loading({
      lock: true,
      text: notice,
      target:document.getElementById(id),
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)'
    });
  }
  return loading;
}
/**
 * 关闭指定loading
 * @param loading
 */
export function closeLoadingCommon(loading){
  loading.close();
}



/**
 * 提示.
 */
export function notice(doc,message,type){
    this.$message({
      showClose: true,
      message: '警告哦，'+message,
      type: type
    });
  }

/**
 * alert 弹出框  alert_type
 * @param $this
 */
/**
 *
 * @param $this vue
 * @param message 消息类型
 * @param alert_type success  成功 warning 警告   error 错误   空是 默认消息
 */
export  function alert_util($this,message,alert_type) {
    // 修改成弹框
    /*$this.$message({
      showClose: true,
      message: message,
      type: alert_type
    });*/
    let title = "提示"
  $this.$confirm(message, title, {
    showCancelButton: false, // 是否显示取消按钮
    showConfirmButton: true, // 是否显示确定按钮
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: alert_type
  }).then(() => {
    /*this.$message({
      type: 'success',
      message: '删除成功!'
    });*/
  }).catch(() => {
    /*this.$message({
      type: 'info',
      message: '已取消删除'
    });*/
  });
    /*setTimeout(function(){
      // 关闭弹框
      $(".el-icon-close").last().trigger("click")
    },2000)*/
  }

/**
 *
 * @param $this vue
 * @param title 提示
 * @param message 消息
 * @param is_duration 0 手动关闭，1 自动关闭
 * @param type 类型   success  成功 warning 警告   error 错误   空是 默认消息
 */
export function alertNotice ($this,title,message,is_duration,type,is_position) {
  //  position: 'bottom-right'

  if(is_position== "" || is_position =="右上"){
    is_position = "";
  }else if(is_position =="右下"){
    is_position = "bottom-right";
  }else if(is_position =="左上"){
    is_position = "top-left";
  }else if(is_position =="左下"){
    is_position = "bottom-left";
  }else{
    is_position = "";
  }
  if(type == "error"){
    $this.$notify.error({
      title: title,
      message: message,
      duration: is_duration,
      position:is_position
    });
  }else if(type == ""){
    debugger
    $this.$notify.info({
      title: title,
      message: message,
      duration: is_duration,
      position:is_position
    });
  }else{
    $this.$notify({
      title: title,
      message: message,
      duration: is_duration,
      type: type,
      position:is_position
    });
  }

}

/**
 *  弹框提示
 * @param $this vue
 * @param title 提示
 * @param message 消息内容
 * @param type 类型
 */
export function openView($this,title,message,type){
    $this.$confirm(message, title, {
      showCancelButton: false, // 是否显示取消按钮
      showConfirmButton: false, // 是否显示确定按钮
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    }).then(() => {
      /*this.$message({
        type: 'success',
        message: '删除成功!'
      });*/
    }).catch(() => {
      /*this.$message({
        type: 'info',
        message: '已取消删除'
      });*/
    });
  }




<template>
  <div class="main-page">
    <el-container>
      <el-aside width="230px" id="menuClass">
        <el-menu  :unique-opened="true" :default-active="'1'" :default-openeds="['1']" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true" @select="selectHandle" background-color="rgba(8,58,74,0.7)" text-color="#47AFAE" active-text-color="#02feff">
          <el-menu-item index="/" class="logomenu">
            <template>
              <i><img src="../assets/image/logo.png" width="30"/></i>
              <span style="color: #47AFAE; font-size: 16px">安全审计系统</span>
            </template>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">安全审计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/log">日志管理</el-menu-item>
              <el-menu-item index="/audit">审计分析</el-menu-item>
              <el-menu-item index="/rule">规则管理</el-menu-item>
              <el-menu-item index="/alarm">告警管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="1">
              <div @click="isShowMenu">
                <i class="el-icon-s-fold" style="color: #47AFAE; font-size: 20px;"></i>
              </div>
            </el-col>
            <el-col :span="1" :offset="20">
              <div class="grid-content bg-purple">
                <div>
                  <el-button @click='look'>
	                  <i class="el-icon-message-solid"></i>
  	                <i class="" style="color: red;" v-if="alarmListNum===0"></i>
  	                <i class="" style="color: red;" v-if="alarmListNum>0&&alarmListNum<100">{{alarmListNum}}</i>
  	                <i class="" style="color: red;" v-if="alarmListNum>=100">99+</i>
                  </el-button>
                </div>
              </div>
            </el-col>
            <!--<el-col :span="2">
              <div class="grid-content bg-purple">
                <div>
                  <i class="el-icon-user"></i>
                  <span>用户名</span>
                </div>
              </div>
            </el-col>-->
          </el-row>
        </el-header>
        <el-main style="overflow-x: hidden">
        	
          <transition>
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { formatDate } from '../assets/time'
import store from '../store/store'
const API = '/api'
export default {
  name: 'Index',
  components: {
  },
  data () {
    return {
      isCollapse: false,
      hearderInput: '',
      time: '',
      alarmListNum:'',
      status:false,
//    (this.alarmListNum/1)==?'99+':this.alarmListNum/1
      params:{
      	"pageNum":1,
		    "pageSize":100,
		    "status":"0",
      },
//    dict:{}
    }
  },
watch:{
//			alarmListNum: {
//				handler(newValue, oldValue) {
////					this.alarmListNum = newValue
////					this.getList(1,100,this.params)
//					console.log(this.alarmListNum)
//				},
//				//      status,
////				deep: true,
////				immediate: true,
//			},
		},
  created () {
    this.getDict()
    	this.getList(this.params)
    setInterval(()=>{
    	this.getList(this.params)
    },5000)
  },
  mounted () {
//  this.getDict()
//  console.log('vuex字典',this.$store.state.dict)
//  console.log('本地缓存字典',JSON.parse(localStorage.getItem('dict')))
  	
  },
  methods: {
  	look(){
  		this.$router.push({
  			path:'/alarmxx',
  			query:{status:'0'}
  		})
  	},
  	// 查看告警未处理条数
      getList(params) {
        params=this.params
        let url = '/abnormalAlarm/getAbnormalList'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.list.length >= 0) { // 有数据
//        console.log('',res)
           this.alarmListNum=res.list.length
          } 
        }).catch(e => { // 请求出错
          this.loading = false
          this.$message({
            message: '请求列表失败：' + e,
            type: 'warning'
          })
        })
      },
    // 获取字典表
    getDict() {
      this.$axios.get(API + '/abnormalAlarm/getDictInfoList').then(r => {
//      this.$store.state.dict = r.data.data
        localStorage.setItem('dict', JSON.stringify(r.data.data))
//      this.dict=JSON.parse(localStorage.getItem('dict'))
//      console.log(this.dict)
        // 日志相关
        this.setLog(r.data.data)
        // 告警相关
        this.setAlarm(r.data.data)
        // 规则相关
        this.setRule(r.data.data)
      }).catch(e => {
        this.$message({
          message: '请求字典表失败index：' + e,
          type: 'warning'
        })
      })
    },
    // 日志相关
    setLog(dict) {
      // 软件名称与模块名称
      let options = dict['004']['dataValue']
      let softName = {}
      let blockName = {}
      options.forEach(d => {
        softName[d.value] = d.label
        d.children.forEach(dd => {
          blockName[dd.value] = dd.label
        })
      })
      localStorage.setItem('softName', JSON.stringify(softName))
      localStorage.setItem('blockName', JSON.stringify(blockName))
      this.$store.state.log.softName = softName
      this.$store.state.log.blockName = blockName
      // 日志类型
      let logType = {}
      let operationType = {}
      dict['001']['dataValue'].forEach(d => {
        logType[d.value] = d.label
      })
      // 操作类型
      dict['002']['dataValue'].forEach(d => {
        operationType[d.value] = d.label
      })
      localStorage.setItem('logType', JSON.stringify(logType))
      localStorage.setItem('operationType', JSON.stringify(operationType))
      this.$store.state.log.logType = logType
      this.$store.state.log.operationType = operationType
      // 系统标识
      let systemSign = {}
      dict['003']['dataValue'].forEach(d => {
        systemSign[d.value] = d.label
      })
      localStorage.setItem('systemSign', JSON.stringify(systemSign))
      this.$store.state.log.systemSign = systemSign
    },
    // 告警相关
    setAlarm(dict) {
      // 告警级别
      let alarmRank = {}
      dict['006']['dataValue'].forEach(d => {
        alarmRank[d.value] = d.label
      })
      localStorage.setItem('alarmRank', JSON.stringify(alarmRank))
      this.$store.state.alarm.alarmRank = alarmRank
      // 告警状态
      let alarmStatus = {}
      dict['007']['dataValue'].forEach(d => {
        alarmStatus[d.value] = d.label
      })
      localStorage.setItem('alarmStatus', JSON.stringify(alarmStatus))
      this.$store.state.alarm.alarmStatus = alarmStatus
    },
    // 规则相关
    setRule(dict) {
      // 规则类型
      let ruleType = {}
      dict['005']['dataValue'].forEach(d => {
        ruleType[d.value] = d.label
      })
      localStorage.setItem('ruleType', JSON.stringify(ruleType))
      this.$store.state.rule.ruleType = ruleType
      // 统计类型
      let cycleSign = {}
      dict['008']['dataValue'].forEach(d => {
        cycleSign[d.value] = d.label
      })
      localStorage.setItem('cycleSign', JSON.stringify(cycleSign))
      this.$store.state.rule.cycleSign = cycleSign
      // 规则状态
      let ruleStatus = {}
      dict['009']['dataValue'].forEach(d => {
        ruleStatus[d.value] = d.label
      })
      localStorage.setItem('ruleStatus', JSON.stringify(ruleStatus))
      this.$store.state.rule.ruleStatus = ruleStatus
      // 新增规则 时间范围下拉
      let timeRangeSign = {}
      dict['015']['dataValue'].forEach(d => {
        timeRangeSign[d.value] = d.label
      })
      localStorage.setItem('timeRangeSign', JSON.stringify(timeRangeSign))
      this.$store.state.rule.timeRangeSign = timeRangeSign
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },

    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    selectHandle() {
    },

    isShowMenu () {
      this.isCollapse = !this.isCollapse
      let menuWidth = document.getElementById('menuClass')
      if (!this.isCollapse) {
        menuWidth.style.width = '230px'
      } else {
        menuWidth.style.width = '64px'
      }
    }
  }
}

</script>

<style scoped>
		/*background-color: rgba(14,238,252, 0.1);*/
    /*background-image: url("./assets/image/bg.png");
    background-size: 100% 100%;
    background-repeat: round;*/
  .main-page {
    height: 100%;
  }
  .el-container{
    height: 100%;
  }
  .el-aside{
    border: 1px solid #244a81;
    background: linear-gradient(#082031, rgba(8,58,74,0.7));
    box-shadow: 0 0 20px rgba(9,169,191,0.5);
    overflow: hidden;
  }
  .el-menu{
    border: none;
  }
  .logomenu{
    height: 56px;
    background: rgba(8,58,74,0.7);
    color: #47AFAE;
  }
  .logomenu:hover{
    height: 56px;
    background: rgba(8,58,74,0.7)!important;
    color: #02feff;
  }
  .el-submenu__title i{
    color: #47AFAE;
  }
  .el-header{
    height: 55px;
    line-height: 55px;
    color: #47AFAE;
    border: 1px solid #244a81;
    background: linear-gradient(#082031, rgba(8,58,74,0.7));
    box-shadow: 0 0 20px rgba(9,169,191,0.5);
  }
  .el-main{
    padding: 1px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .center{
    text-align: center;
  }
</style>

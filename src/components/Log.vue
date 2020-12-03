<template>
  <div class="log">
    <el-form :model="ruleForm" ref="ruleForm" size="small" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="操作用户" prop="operationUserId">
              <el-input v-model="ruleForm.operationUserId" placeholder="请输入操作用户"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="关联选择" prop="softBlockName">
              <el-cascader v-model="ruleForm.softBlockName" style="min-width: 400px" :props="{ checkStrictly: true }" :options="options" collapse-tags clearable placeholder="请选择软件名称与模块名称"></el-cascader>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="日志类型"  prop="logType">
              <el-select v-model="ruleForm.logType" placeholder="请选择日志类型">
                <el-option v-for="item in dict['001']['dataValue']" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="日志内容" prop="logCont">
              <el-input v-model="ruleForm.logCont" placeholder="请输入日志内容"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="时间范围" prop="time">
              <el-date-picker v-model="ruleForm.showTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="操作类型"  prop="operationType">
              <el-select v-model="ruleForm.operationType" placeholder="请选择操作类型">
                <el-option v-for="item in dict['002']['dataValue']" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" class="center">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
              <el-button type="default" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    <log-list ref="list" :obj="params"></log-list>
    </el-form>

  </div>
</template>

<script>
const API = '/api'
	import LogList from "@/components/LogList";
  export default {
		name: "Log",
    components: {LogList},
    data() {
		  return {
        ruleForm: {
          // 日志内容
          logCont: '',
          // 软件和模块名称
          softBlockName: [],
          softwareSign: null,
          moduleSign: null,
          // 操作用户
          operationUserId: '',
          // 日期
          showTime: [],
          startTime: '',
          endTime: '',
          // 日志类型
          logType: null,
          // 操作类型
          operationType: null,
        },
        params: {},
        // 数据字典
        dict: {},
        // 软件名称模块名下拉框联动选项
        options: {},
        softName: JSON.parse(localStorage.getItem('softName')),
        blockName: JSON.parse(localStorage.getItem('blockName')),
        // 日期快捷键
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
//  	if(this.dict==null&&this.options==null){
	    	this.getDict()
					this.dict=JSON.parse(localStorage.getItem('dict'))
					this.options=JSON.parse(localStorage.getItem('dict'))['004']['dataValue']
//  	}
			
			
//  	if(JSON.parse(localStorage.getItem('dict'))&&JSON.parse(localStorage.getItem('dict'))['004']['dataValue']){
//  		this.dict=JSON.parse(localStorage.getItem('dict'))
//				this.options=JSON.parse(localStorage.getItem('dict'))['004']['dataValue']
////	      this.getList(1, 10, this.obj)
//  	}else{
//  		this.getDict()
//	    	this.dict=JSON.parse(localStorage.getItem('dict'))
//				this.options=JSON.parse(localStorage.getItem('dict'))['004']['dataValue']
////	      this.getList(1, 10, this.obj)
//  	}
    
    },
    mounted(){
//  	if(this.dict===null){
//        this.$router.push({
//          path: '/log'
//        })
//    }
//this.getDict()
    },
    methods: {
    	// 获取字典表
    getDict() {
     this.$axios.get(API + '/abnormalAlarm/getDictInfoList').then(r => {
//      this.$store.state.dict = r.data.data
        localStorage.setItem('dict', JSON.stringify(r.data.data))
        this.dict=JSON.parse(localStorage.getItem('dict'))
//      console.log(this.dict)
        // 日志相关
        this.setLog(r.data.data)
        // 告警相关
        this.setAlarm(r.data.data)
        // 规则相关
        this.setRule(r.data.data)
      }).catch(e => {
        this.$message({
          message: '请求字典表失败log：' + e,
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
    
    
		  // 查询
      submitForm(formName) {
        this.params = {}
        if (this.ruleForm.showTime.length > 0) {
          this.ruleForm.startTime = this.moment(this.ruleForm.showTime[0]).format("YYYY-MM-DD HH:mm:ss")
          this.ruleForm.endTime = this.moment(this.ruleForm.showTime[1]).format("YYYY-MM-DD HH:mm:ss")
        }
        this.ruleForm.softwareSign = this.ruleForm.softBlockName[0] ? this.ruleForm.softBlockName[0] : null
        this.ruleForm.moduleSign = this.ruleForm.softBlockName[1] ? this.ruleForm.softBlockName[1] : null
        for(let key in this.ruleForm) {
          this.params[key] = this.ruleForm[key]
        }
        this.$refs.list.getList(1, 10, this.params)
      },
      // 重置搜索框
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.ruleForm = {
          logCont: '',
          softBlockName: [],
          softwareSign: null,
          moduleSign: null,
          operationUserId: '',
          showTime: [],
          startTime: '',
          endTime: '',
          logType: null,
          operationType: null
        }
        for(let key in this.ruleForm) {
          this.params[key] = this.ruleForm[key]
        }
        this.$refs.list.getList(1, 10, this.params)
      },
    }
  }
</script>

<style scoped>
.log{
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
.log::-webkit-scrollbar {display: none;}
.log { -ms-overflow-style: none; }
.log { overflow: -moz-scrollbars-none; }
.center{
  text-align: center;
}
</style>

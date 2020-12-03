<template>
  <div>
    <!--列表-->
    <div class="list">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="softwareSign" label="软件名称" width="340" showOverflowTooltip>
          <template slot-scope="scope">
            <div class="tableTitle ellipsis">{{softName[scope.row.softwareSign]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="moduleSign" label="模块名称" showOverflowTooltip>
          <template slot-scope="scope">{{blockName[scope.row.moduleSign]}}</template>
        </el-table-column>
        <el-table-column prop="log" label="操作类型" width="120">
          <template slot-scope="scope">{{operationType[scope.row.operationType]}}</template>
        </el-table-column>
        <el-table-column prop="log" label="日志类型" width="120">
          <template slot-scope="scope">{{logType[scope.row.logType]}}</template>
        </el-table-column>
        <el-table-column prop="user" label="操作用户" width="120">
          <template slot-scope="scope">
            <div>{{scope.row.operationUserId}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="date" sortable label="日期" width="200">
          <template slot-scope="scope">{{scope.row.operationTime}}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="checkLog(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page center" v-if="total>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--详情弹框-->
    <el-dialog v-if="checkVisible" :visible.sync="checkVisible" top="2vh" width="80%">
      <span slot="title">
        <div class="center">
          <i v-show="verifyFlag === 'success'" class="el-icon-circle-check" style="color: #67C23A"></i>
          <i v-show="verifyFlag === 'fail'" class="el-icon-circle-close" style="color: #F56C6C"></i>
          {{verifyTitle}}
          <el-button v-show="verifyFlag === 'fail'" @click="goBack(currentId)" type="text">回退</el-button>
        </div>
      </span>
      <log-detail :detail="logDetail"></log-detail>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import LogDetail from "@/components/LogDetail";
  const API = '/api'
  export default {
    name: "LogList",
    components: {LogDetail},
    props: ['obj'],
    data() {
      return {
        loading: true,
        // 数据列表
        tableData: [],
        // 分页相关
        currentPage: 1,
        pageSize: 10,
        total: 0,
        // 当前查看的id
        currentId: '',
        // 查看详情
        checkVisible: false,
        // 传给日志详情子组件的参数
        logDetail: {},
        // 校验标识
        verifyFlag: '',
        // 校验弹框标题
        verifyTitle: '校验成功',
        // 数据字典
//      dict: JSON.parse(localStorage.getItem('dict')),
        dict:{},
        // 软件名称模块名下拉框联动选项
//      options: JSON.parse(localStorage.getItem('dict'))['004']['dataValue'],
        options:{},
        softName: JSON.parse(localStorage.getItem('softName')),
        blockName: JSON.parse(localStorage.getItem('blockName')),
        logType: JSON.parse(localStorage.getItem('logType')),
        operationType: JSON.parse(localStorage.getItem('operationType')),
      }
    },
    created() {
    	console.log('日志接收的值',this.obj)
    	if(this.obj&&JSON.parse(localStorage.getItem('dict'))&&JSON.parse(localStorage.getItem('dict'))['004']['dataValue']){
    		this.dict=JSON.parse(localStorage.getItem('dict'))
				this.options=JSON.parse(localStorage.getItem('dict'))['004']['dataValue']
//	      this.getList(1, 10, this.obj)
	      this.getList(1, 10, {})
    	}else{
    		this.getDict()
	    	this.dict=JSON.parse(localStorage.getItem('dict'))
				this.options=JSON.parse(localStorage.getItem('dict'))['004']['dataValue']
//	      this.getList(1, 10, this.obj)
	      this.getList(1, 10, {})
    	}
    },
    watch: {
      // obj: {
      //   handler(newValue, oldValue) {
      //     this.getList(this.currentPage, this.pageSize, newValue)
      //   },
      //   deep: true
      // }
    },
    methods: {
// 获取字典表
    getDict() {
      this.$axios.get(API + '/abnormalAlarm/getDictInfoList').then(r => {
        this.$store.state.dict = r.data.data
        localStorage.setItem('dict', JSON.stringify(r.data.data))
        this.dict=JSON.parse(localStorage.getItem('dict'))
        console.log(typeof this.dict)
        // 日志相关
        this.setLog(r.data.data)
        // 告警相关
        this.setAlarm(r.data.data)
        // 规则相关
        this.setRule(r.data.data)
      }).catch(e => {
        this.$message({
          message: '请求字典表失败logList：' + e,
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
    
    
      // 自定义表格序号
      indexMethod(index) {
        return this.pageSize*(this.currentPage - 1) + index + 1
      },

      // 根据筛选条件查询列表
      getList(page, pageSize, params) {
        this.loading = true
        this.tableData = []
        params.pageNum = page
        params.pageSize = pageSize
        this.currentPage = page
        this.pageSize = pageSize
        let url = '/logQuery/search/list'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.list.length > 0) { // 有数据
          console.log(55555555555555,res)
            this.tableData = res.list
            this.total = res.total
          } else { // 无数据
            this.tableData = []
            this.total = 0
          }
          this.loading = false
        })
        .catch(e => { // 请求出错
          this.loading = false
          this.$message({
            message: '请求列表失败：' + e,
            type: 'warning'
          })
        })
      },

      // 每页几条
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        this.getList(this.currentPage, this.pageSize, this.obj)
      },

      // 当前第几页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(this.currentPage, this.pageSize, this.obj)
      },

      // 查看日志
      checkLog(row) {
        this.loading = true
        this.currentId = row.id
        this.$axios.post(API + '/logQuery/getLogDataById', {
          id: row.id
          // id: 'drjjVnQBCUEUMczdTsmL'
        }).then(r => {
          let res = r.data.data
          if (res.result === 'ignore') { // 忽略
            this.verifyFlag = 'ignore'
            this.verifyTitle = '日志详情'
          } else if (res.result === 'success') { // 校验成功
            this.verifyFlag = 'success'
            this.verifyTitle = '日志校验成功！'
          } else { // 校验失败
            this.verifyFlag = 'fail'
            this.verifyTitle = '日志校验失败！'
          }
          this.loading = false
          this.logDetail = res
          this.checkVisible = true
        }).catch(e => {
          this.loading = false
          this.$message({
            message: '查看详情失败：' + e,
            type: 'warning'
          })
        })
      },

      // 回退操作
      goBack(id) {
      	this.$confirm('确定回退吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	        this.$axios.post(API + '/api/logOperate/flashBackLog', {
	          id: id
	        }).then(r => {
	          let res = r.data.data
	          this.verifyFlag = 'ignore'
	          this.verifyTitle = '日志回退成功！'
	          this.logDetail = res
	        }).catch(e => {
	          this.$message({
	            message: '回退失败：' + e,
	            type: 'warning'
	          })
	        })
        }).catch(e=>{
        	
        })
      },
    }
  }
</script>

<style scoped>
.center {
  text-align: center;
}
</style>

<template>
  <div>
    <el-row>
      <el-col :offset="6" :span="12" class="center">
        <el-form>
          <el-form-item label="告警名称：">
            {{detail.name}}
          </el-form-item>
          <!--<el-form-item label="告警名称：" v-else>
            {{detail.name}}
          </el-form-item>-->
          <el-form-item label="告警内容：">
            {{detail.alarmCont.split(',')[0]}}
            <el-button v-if="detail.name==='日志信息被篡改--异常告警'" type="text" size="small" @click="checkLog(detail)">查看</el-button>
            {{detail.alarmCont.split(',')[1]}}
          </el-form-item>
          <el-form-item label="告警级别：">
            {{alarmRank[detail.alarmRank]}}
          </el-form-item>
          <el-form-item label="告警状态：">
            {{alarmStatus[detail.status]}}
            <el-button v-if="detail.status!=='1'&&detail.status!=='2'" type="text" size="small" @click="handleAlarm(detail)">处理</el-button>
            <el-button v-if="detail.status!=='1'&&detail.status!=='2'" type="text" size="small" @click="ignoreAlarm(detail)">忽略</el-button>
          </el-form-item>
          <el-form-item label="告警时间：">
            {{detail.alarmTime}}
          </el-form-item>
          <el-form-item label="结果名：">
            {{detail.resultFiledName}}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    
       <!--详情弹框-->
    <el-dialog v-if="checkVisible" :visible.sync="checkVisible" top="2vh" width="80%">
      <span slot="title">
        <div class="center">
          <i v-show="verifyFlag === 'success'" class="el-icon-circle-check" style="color: #67C23A"></i>
          <i v-show="verifyFlag === 'fail'" class="el-icon-circle-close" style="color: #F56C6C"></i>
          {{verifyTitle}}
          <el-button v-show="verifyFlag === 'fail'" @click="goBack(detail)" type="text">回退</el-button>
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
		name: "AlarmDetail",
    components: {LogDetail},
    props: ["detail"],
    data() {
		  return {
		  	currentId:'',
        checkVisible: false,
        logDetail: {},
        // 数据字典
        dict: JSON.parse(localStorage.getItem('dict')),
        // 告警级别
        alarmRank: JSON.parse(localStorage.getItem('alarmRank')),
        // 告警状态
        alarmStatus: JSON.parse(localStorage.getItem('alarmStatus')),
      }
    },
    created() {
//  	console.log('查看都有啥',this.detail)
    },
    watch: {
      detail: {
        handler(newValue, oldValue) {
        },
        deep: true
      }
    },
    methods: {
    	// 查看日志
      checkLog(row) {
        this.loading = true
        this.currentId = row.id
        this.$axios.post(API + '/logQuery/getLogDataById', {
          id: row.resultValue
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
      goBack(row) {
      	this.$confirm('确定回退吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	        this.$axios.post(API + '/api/logOperate/flashBackLog', {
	          id: row.resultValue
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
      // 处理
      handleAlarm(row) {
        this.$confirm('此操作将该告警设置为已处理，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(API + '/abnormalAlarm/updateAbnormalStatusById', {
            id: row.id,
            status: 1
          }).then(r => {
            if (r.data.code === 200) {
              this.$message({
                type: 'success',
                message: '已处理!'
              });
              this.$emit('handleChange', true)
            } else {
              this.$message({
                type: 'info',
                message: '处理失败!'
              });
            }
          }).catch(e => {
            this.$message({
              type: 'error',
              message: '处理报错：' + e
            });
          })
        }).catch(() => {
        });
      },
      // 忽略
      ignoreAlarm(row) {
        this.$confirm('此操作将忽略该告警，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(API + '/abnormalAlarm/updateAbnormalStatusById', {
            id: row.id,
            status: 2
          }).then(r => {
            if (r.data.code === 200) {
              this.$message({
                type: 'success',
                message: '已忽略!'
              });
              this.$emit('handleChange', true)
            } else {
              this.$message({
                type: 'info',
                message: '忽略失败!'
              });
            }
          }).catch(e => {
            this.$message({
              type: 'error',
              message: '忽略报错：' + e
            });
          })
        }).catch(() => {
        });
      },
    }
	}
</script>

<style scoped>
  .center{
    text-align: center;
  }
</style>

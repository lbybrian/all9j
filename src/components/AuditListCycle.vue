<template>
  <div>
    <el-row>
    	<el-col v-if="this.tableData.length==0"><div style="margin-top: 30px;">暂无数据</div></el-col>
      <el-col :span="6" v-for="(item, index) in tableData" :key="item.id">
        <el-card class="center" :body-style="{padding: '5px'}">
          <div style="padding: 14px;">
            <p>编号：{{(currentPage-1)*pageSize + index + 1}}</p>
            <p class="p">统计时间：{{item.createTime}}</p>
            <el-button type="text" class="button" @click="check(item)">查看结果</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--分页-->
    <div class="page center" v-if="total>0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[16]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--详情弹框-->
    <el-dialog v-if="checkVisible" :visible.sync="checkVisible" width="80%">
      <span slot="title">统计详情</span>
      <instant-audit v-if="obj.id!==''" :obj="obj" ></instant-audit>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InstantAudit from "@/components/InstantAudit";
  const API = '/api'
	export default {
		name: "AuditListCycle",
    components: {InstantAudit},
    props: ['cycleId','objres'],
    data() {
		  return {
        currentDate: new Date(),
        // 数据列表
        tableData: [],
        // 分页相关
        currentPage: 1,
        pageSize: 16,
        total: 0,
        checkVisible: false,
        params: {},
        obj: {},
      }
    },
    watch: {
      cycleId: {
        handler(newValue, oldValue) {
          // this.cycleId = newValue
          this.params.ruleId = newValue
          this.getList(this.currentPage, this.pageSize, this.params)
        },
        deep: true
      }
    },
    destroyed(){
    	console.log('cycle-destory')
    },
    created() {
    	console.log(this.cycleId,this.objres)
    	if(this.objres){
    		this.params.ruleId = this.objres.id;
      	this.getList(1, 16, this.params)
    	}else{
			  this.params.ruleId = this.cycleId
	      this.getList(1, 16, this.params)
    	}
    },
    mounted() {},
    methods: {
      getList(page, pageSize, params) {
        this.loading = true
        this.tableData = []
        params.pageNum = page
        params.pageSize = this.pageSize
        this.currentPage = page
        this.pageSize = pageSize
        let url = '/analyzeRule/getAnalyzeResultRecordPageList'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res === null) { return false }
          if (res.list!==null&&res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.total = res.total
          } else { // 无数据
            this.tableData = []
            this.total = 0
          }
          this.loading = false
        }).catch(e => { // 请求出错
          this.loading = false
          this.$message({
            message: '请求列表失败：' + e,
            type: 'warning'
          })
        })
      },
      // 当前第几页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(this.currentPage, this.pageSize, {ruleId: this.cycleId})
      },
      // 查看详情
      check(item) {
        this.obj.id = item.id
//      this.obj.url = '/analyzeRule/getAnalyzeResultRecordDataDetail'
        this.checkVisible = true
      }
    }
	}
</script>

<style scoped>
  .center{
    text-align: center;
    color: #47AFAE;
	  /*background: -webkit-linear-gradient(#082031, rgba(8,58,74,0.7));
	  background: -moz-linear-gradient(#082031, rgba(8,58,74,0.7));
	  background: -o-linear-gradient(#082031, rgba(8,58,74,0.7));
	  background: -webkit-gradient(linear, 0 0, 0 100%, from(#082031), to(rgba(8,58,74,0.7)));
	  background: linear-gradient(#082031, rgba(8,58,74,0.7));*/
  }
</style>
<!--<style>
  .center{
    text-align: center;
  }
div .el-row-cycle{
	background: not specified!important;
}
div .el-row-cycle .el-col-cycle{
  	color: #47AFAE!important;
    margin-bottom: 5px!important;
    border-radius: 4px!important;
    background: linear-gradient(rgba(8,58,74,0))!important;
    overflow: hidden!important;
    cursor: pointer!important;
  }
</style>-->

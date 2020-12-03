<template>
  <div class="audit">
  	<el-form class="center audit">
	 			<el-button class="elbutton" type="primary" size="small" @click="modelList">新增规则</el-button>
		    <el-tabs v-model="activeName" @tab-click="handleClick" >
		      <el-tab-pane label="即时审计" name="1" v-show="activeName==='1'">
		        <el-row class="center ruleList" >
		          <el-col :span="2" >
		            <i class="el-icon-arrow-left" @click="handleCurrentChange(currentPage, 'pre')" ></i>
		          </el-col>
		          <el-col :span="4" v-for="(item,index) in tableData" :key="item.id" :class="showColor?'konc':'zc'" >
		            	<!--<template slot-scope="scope">-->
			            	<el-tooltip :content="item.name" placement="top">
					  					<div class="showColor" @click="checkRule(item,index)" :class="isActive==item.id?'active':''"  :title="item.modelName">
						            	<p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis!important;">{{item.name}}</p>
					  					</div>          	
			            	</el-tooltip>
		            	<!--</template>-->
		          </el-col>
		          <el-col :span="2">
		            <i class="el-icon-arrow-right" @click="handleCurrentChange(currentPage, 'next')"></i>
		          </el-col>
		        </el-row>
		        <audit-list-execu v-if="activeName==='1'" :jsId="jsId"></audit-list-execu>
		      </el-tab-pane>
		
		      <el-tab-pane label="周期审计" name="2" v-show="activeName==='2'">
		        <el-row class="center ruleList" >
		          <el-col :span="2">
		            <i class="el-icon-arrow-left" @click="handleCurrentChange2(currentPage3, 'pre')"></i>
		          </el-col>
		          <el-col :span="4" v-for="(item,index) in tableData2" :key="item.id" >
		          	<el-tooltip :content="item.name" placement="top" >
			            <div class="showColor" @click="checkRule2(item,index)" :class="isActive==item.id?'active':''">
			            	<p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis!important;">{{item.name}}</p>
				  					</div>          	
		            	</el-tooltip>
		          </el-col>
		          <el-col :span="2">
		            <i class="el-icon-arrow-right" @click="handleCurrentChange2(currentPage3, 'next')"></i>
		          </el-col>
		        </el-row>
		        <audit-list-cycle v-if="activeName==='2'" :cycleId="cycleId"></audit-list-cycle>
		      </el-tab-pane>
		    
		    </el-tabs>
  	</el-form>
    <el-dialog v-if="addRuleVisible" title="新增规则 —— 依规则模板简易配置" :visible.sync="addRuleVisible" top="2vh" width="80%" @close="handleClose">
      <rule-model-list :addRuleVisible="addRuleVisible" @closeAuditRule="closeAuditRule"></rule-model-list>
    </el-dialog>
  </div>
</template>

<script>

  import AuditListCycle from "@/components/AuditListCycle";
  import AuditListExecu from "@/components/AuditListExecu";
  import RuleModelList from "@/components/RuleModelList";
  const API = '/api'
  export default {
    name: "Audit",
    components: {AuditListCycle,AuditListExecu,RuleModelList},
    data() {
      return {
      	showColor:true,
        activeName: '1',
        isActive:211,
        // 数据列表
        tableData: [],
        tableData2: [],
//      ruleModelList:{},
        // 分页相关,头部分页
        currentPage: 1,
        pageSize: 5,
        totalPage: 0,
        currentPage3: 1,
        pageSize3: 5,
        totalPage3: 0,
        // 新增规则弹框
        addRuleVisible: false,
        // 即时id
        jsId: '',
        // 周期id
        cycleId: '',
      }
    },
    watch: {
//  	jsId: {
//      handler(newValue, oldValue) {
//        if (newValue.length > 0) {
//          this.checkRule(newValue[0])
//        }
//      },
//      deep: true,
//      immediate:true,
//    },
      tableData: {
        handler(newValue, oldValue) {
          if (newValue.length > 0) {
            this.checkRule(newValue[0])
          }
        },
        deep: true
      },
      tableData2: {
        handler(newValue, oldValue) {
          if (newValue.length > 0) {
            this.checkRule2(newValue[0])
          }
        },
        deep: true
      },
      activeName: {
        handler(newValue, oldValue) {
          if (newValue === '1') {
            if (this.tableData.length > 0) {
              this.checkRule(this.tableData[0])
            }
          }
        },
        deep: true
      }
    },
    created() {
    	
    	
    	
    	
//  	if(this.dict===null){
//  		this.dict=this.$store.state.dict
//  	}
//  	if(tableData.length<0){
//				let params = {
//	          pageNum: 1,
//	          pageSize: 5,
//	          type: '1',
//	          cycleSign: '2',
//	          status: '1'
//	        }
//  		this.getList(1,5,params)
//  	}
//  console.log('Audit本地缓存字典',JSON.parse(localStorage.getItem('dict')))
    },
    mounted() {
//  	setTimeout(()=>{
//  		this.$router.go(0)
//  	},1000)

//  	function handleClick(tab) {
//      let params = {
//        pageNum: 1,
//        pageSize: 5,
//        type: '1',
//        cycleSign: '2',
//        status: '1'
//      }
//      if (tab.name === '1') { // 即时
//        params.cycleSign = '2'
//        this.getList(1, 5, params)
//      } else if(tab.name === '2'){ // 周期
//        params.cycleSign = '1'
//        this.getList2(1, 5, params)
//      }
//    }
//  	let tabz={name:'1'}
//  	handleClick(tabz)
    	
    	let params = {
	          pageNum: 1,
	          pageSize: 5,
	          type: '1',
	          cycleSign: '2',
	          status: '1'
	        }
    		this.getList(1,5,params)



    },
    methods: {
      // 获取即时规则列表
      getList(page, pageSize, params) {
        this.tableData = []
        params.pageNum = page
        params.pageSize = pageSize
        this.currentPage = page
        this.pageSize = pageSize
        params.type = '1'
        params.cycleSign = '2'
        params.status = '1'
        let url = '/analyzeRule/getAnalyzePageList'
//      let url = '/analyzeRule/executeAnalyzeRuleById'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.totalPage = res.totalPage
          } else { // 无数据
            this.tableData = []
          }
        }).catch(e => { // 请求出错
        	this.crrColor=true;
        })
      },
      // 获取周期规则列表
      getList2(page, pageSize, params) {
        this.tableData2 = []
        params.pageNum = page
        params.pageSize = pageSize
        this.currentPage3 = page
        this.pageSize3 = pageSize
        params.type = '1'
        params.cycleSign = '1'
        params.status = '1'
        let url = '/analyzeRule/getAnalyzePageList'
//      let url = '/analyzeRule/getAnalyzeResultRecordDataDetail'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.list.length > 0) { // 有数据
            this.tableData2 = res.list
            this.totalPage3 = res.totalPage
          } else { // 无数据
            this.tableData2 = []
          }
        }).catch(e => { // 请求出错
        	this.crrColor=true;
        })
      },
      // 翻页
      handleCurrentChange(page, flag) {
        if (flag === 'pre') { // 前一页
          if (page <= 1) {
            page = 1
            this.$message({
              message: '当前已经是最新数据！',
              type: 'warning'
            })
            return false
          } else {
            page--
          }
        } else { // 后一页
          if (page >= this.totalPage) {
            page = this.totalPage
            this.$message({
              message: '当前已经是最早数据！',
              type: 'warning'
            })
            return false
          } else {
            page++
          }
        }
        this.getList(page, this.pageSize, {})
      },
      // 翻页
      handleCurrentChange2(page, flag) {
        if (flag === 'pre') { // 前一页
          if (page <= 1) {
            page = 1
            this.$message({
              message: '当前已经是最新数据！',
              type: 'warning'
            })
            return false
          } else {
            page--
          }
        } else { // 后一页
          if (page >= this.totalPage3) {
            page = this.totalPage3
            this.$message({
              message: '当前已经是最早数据！',
              type: 'warning'
            })
            return false
          } else {
            page++
          }
        }
        this.getList2(page, this.pageSize3, {})
      },
      // 点击某一个即时性规则
      checkRule(row,index) {
//    	console.log(row.id)
        this.jsId = row.id
        this.isActive=row.id
        this.showColor=false
//      this.errColor=true
      },
      // 点击某一个周期性规则
      checkRule2(row,index) {
        this.cycleId = row.id
        this.isActive=row.id
        
//      this.isActive=index
        
      },
      handleClick(tab, event) {
        let params = {
          pageNum: 1,
          pageSize: 5,
          type: '1',
          cycleSign: '',
          status: '1'
        }
        if (tab.name === '1') { // 即时
          params.cycleSign = '2'
          this.getList(1, 5, params)
        } else if(tab.name === '2'){ // 周期
          params.cycleSign = '1'
          this.getList2(1, 5, params)
        }
      },
      //查看模板列表
      modelList(){
//	          this.$router.push({
//	            path: '/ruleModelList',
//	          });
	          
	          this.addRuleVisible=true;
	          
//    	 this.$axios.get(API + '/tempalte/getTemplateList').then(r => {
//        let res = r.data.data
//        if (res) { // 有数据
//        	this.$store.state.modelLists=res;
//        	this.addRuleVisible=true;
//        	console.log('this.$store.state.modelLists父调模板列表:',this.$store.state.modelLists)
//        } else { // 无数据
//        	console.log('暂无模板数据')
//        }
//      }).catch(e => { // 请求出错
//      })
      },
      
      // 右上角关闭弹框
      handleClose() {
        // 调用子组件的方法：清空输入域 + 关闭弹框
//      this.$refs.addRule.resetForm('ruleForm')
      },
      // 子组件传值控制关闭弹框
      closeAuditRule(val) {
        this.addRuleVisible = val
        let params = {
          pageNum: 1,
          pageSize: 5,
          type: '1',
          cycleSign: '',
          status: '1'
        }
        if (this.activeName === '1') {
          params.cycleSign = '2'
          this.getList(1, 5, params)
        } else {
          params.cycleSign = '1'
          this.getList2(1, 5, params)
        }
      },
    }
  }
</script>
<style>
	/*.el-col.active{
  	color: #02feff!important;
}*/
.el-tabs__content .el-tab-pane .el-row .el-col-4 div:active{
	/*color: red!important;*/
}
.showColor{
 	/*background-color: blue;*/
 	/*color: #02feff*/
 	overflow: hidden;
 	text-overflow: ellipsis;
 	white-space: nowrap;
 	/*-webkit-line-clamp: 2;*/
 	display: -webkit-box;
 	-webkit-box-orient: vertical;
 }
</style>
<style scoped>
.active{
	/*color: red;*/
	color:#02feff;
}
.zc{
	overflow: hidden;white-space: nowrap;text-overflow: ellipsis!important;
}
.konc div:first-child{
	/*color:#02feff;*/
}
.elbutton{
		/*float: right;*/
  	z-index: 999!important;
  	position: absolute;
  	right: 3%;
  	top:3%
}
  	
  .audit{
  	position: relative;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }
  .audit::-webkit-scrollbar {display: none;}
  .audit { -ms-overflow-style: none; }
  .audit { overflow: -moz-scrollbars-none; }
  .center{
    text-align: center;
  }
  .ruleList{
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
    border: 1px solid #244a81;
    border-radius: 4px;
    /*background: linear-gradient(#082031, rgba(8,58,74,0.7));*/
    /*background: linear-gradient(#082031, rgba(8,58,74,0.7));*/
    /*box-shadow: 0 0 20px rgba(9,169,191,0.5);*/
    overflow: hidden;
    cursor: pointer;
  }
  .showColor:hover{
  	
  }

</style>

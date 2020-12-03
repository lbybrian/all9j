<template>
  <div >
  	<div class="header">
  		<!--<span>依据模板配置规则</span>-->
	 			<el-button type="primary" size="small" @click="addRule" class="elbutton">高级配置</el-button>
    		<!--<el-page-header @back="goBack" class="title" content="依据模板配置规则	"></el-page-header>-->
  	</div>
  	
  	<el-form >
  		<el-tabs v-model="activeName" @tab-click="handleClick" class="pages">
		      <el-tab-pane label="审计分析模板" name="1" >
		        <el-tabs @tab-click="handleClick" v-model="activeN" class="card">
		        	<el-tab-pane label="即时统计" name="3"  >
				        
			        	<el-table :data="tableDatajs" tooltip-effect="dark" style="width: 100%" height="400" @cell-dblclick="showModelDetail">
					        <el-table-column type="index"  label="模板ID" width="80">
        				<template slot-scope="scope" >
        					<el-button class="noButton" @click="showModelDetail(scope.row)">{{scope.row.id}}</el-button>
        				</template>
        			</el-table-column>
					        <el-table-column prop="ruleName" label="模板规则名称" width="280">
					          <template slot-scope="scope">{{scope.row.ruleName}}</template>
			            	<!--<el-button @click="resultRule(scope.row)" type="text" size="small">查看详情</el-button>-->
					        </el-table-column>
					        <el-table-column prop="ruleDesc" label="模板规则描述">
					          <template slot-scope="scope">{{scope.row.ruleDesc}}</template>
					        </el-table-column>
					        <el-table-column prop="createTime" label="模板创建时间" width="280">
					          <template slot-scope="scope">{{scope.row.createTime}}</template>
					        </el-table-column>
					        <el-table-column label="操作" width="240">
					          <template slot-scope="scope">
					            <!--<el-button @click="showModelDetail(scope.row)" type="text" size="small">查看详情</el-button>-->
			            <!--<el-button @click="deleteModel(scope.row)" type="text" size="small">删除</el-button>-->
					            
					            <el-button v-if="" @click="addModel(scope.row.id)" type="text" size="small">配置</el-button>
					          </template>
					        </el-table-column>
					      </el-table>
			        
			        </el-tab-pane>
		        	
		        	<el-tab-pane label="周期统计" name="4" >
			        	<el-table :data="tableDatazq" tooltip-effect="dark" style="width: 100%" height="400" @cell-dblclick="showModelDetail">
					        <el-table-column type="index"  label="模板ID" width="80" >
        				<template slot-scope="scope" >
        					<el-button class="noButton" @click="showModelDetail(scope.row)">{{scope.row.id}}</el-button>
        				</template>
        			</el-table-column>
					        <el-table-column prop="ruleName" label="模板规则名称" width="280">
					          <template slot-scope="scope">{{scope.row.ruleName}}</template>
					        </el-table-column>
					        <el-table-column prop="ruleDesc" label="模板规则描述">
					          <template slot-scope="scope">{{scope.row.ruleDesc}}</template>
					        </el-table-column>
					        <el-table-column prop="createTime" label="模板创建时间" width="280">
					          <template slot-scope="scope">{{scope.row.createTime}}</template>
					        </el-table-column>
					        <el-table-column label="操作" width="240">
					          <template slot-scope="scope">
					            <!--<el-button @click="resultRule(scope.row)" type="text" size="small">查看详情</el-button>-->
			            <!--<el-button @click="deleteModel(scope.row)" type="text" size="small">删除</el-button>-->
					            
					            <el-button  @click="addModel(scope.row.id)" type="text" size="small">配置</el-button>
					          </template>
					        </el-table-column>
					      </el-table>
			        </el-tab-pane>
		        </el-tabs>
      
    <!--</div>-->
		      </el-tab-pane>
		
		      <el-tab-pane label="告警模板" name="2" >
		        <!--<el-row class="center ruleList" v-show="activeName==='2'">
		          <el-col :span="4" v-for="item in tableData2" >
		            <div @click="checkRule2(item)">{{item.name}}</div>
		          </el-col>
		        </el-row>-->
		        <el-table :data="tableData2" tooltip-effect="dark" style="width: 100%" height="400" @cell-dblclick="showModelDetail">
        			<el-table-column type="index"  label="模板ID" width="80">
        				<template slot-scope="scope" @click="showModelDetail(scope.row)">
        					<el-button class="noButton" @click="showModelDetail(scope.row)">{{scope.row.id}}</el-button>
        				</template>
        			</el-table-column>
			        <el-table-column prop="ruleName" label="模板规则名称" width="280">
			          <template slot-scope="scope">{{scope.row.ruleName}}</template>
			        </el-table-column>
			        <el-table-column prop="ruleDesc" label="模板规则描述">
			          <template slot-scope="scope">{{scope.row.ruleDesc}}</template>
			        </el-table-column>
			        <el-table-column prop="createTime" label="模板创建时间" width="280">
			          <template slot-scope="scope">{{scope.row.createTime}}</template>
			        </el-table-column>
			        <el-table-column label="操作" width="240">
			          <template slot-scope="scope">
			            <!--<el-button @click="resultRule(scope.row)" type="text" size="small">查看规则结果</el-button>-->
			            <!--<el-button @click="resultRule(scope.row)" type="text" size="small">查看详情</el-button>-->
			            <!--<el-button @click="deleteModel(scope.row)" type="text" size="small">删除</el-button>-->
			            <el-button v-if="" @click="addModel(scope.row.id)" type="text" size="small">配置</el-button>
			          </template>
			        </el-table-column>
			      </el-table>
		      </el-tab-pane>
		      
  	</el-tabs>
  	</el-form>
  	
					      <h3>（提示：第一步、选择模板类型 。第二步、双击某条模板或单击模板ID可查看详情。第三步、点击右侧配置按钮使用该条规则）</h3>
  	
    <!--详情弹框-->
    <el-dialog v-if="addRuleVisibleZ" title="高级配置" :visible.sync="addRuleVisibleZ" top="2vh" width="80%" @close="handleClose">
      <add-rule ref="addRule" v-bind="$props" @closeAuditRule="closeAuditRule"></add-rule>
    </el-dialog>
    <el-dialog v-if="modelDetail" title="模板详情" :visible.sync="modelDetail" top="2vh" width="80%" @close="handleClose">
      <!--<div>模板详情33333333333333333333333333-->
      <rule-model-detail  :detail="detail" :deleteModel="deleteModel" :alarmRank="alarmRank" :dict="dict" :ruleType="ruleType" :cycleSign="cycleSign"></rule-model-detail>
      	<!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
  const API = '/api'
  import AddRule from "@/components/AddRule";
  import RuleModelDetail from "@/components/RuleModelDetail";
	export default {
		name: "RuleModelList",
    components: {AddRule,RuleModelDetail},
    props:['obj','submitFormCX'],
    data() {
		  return {
//		  	formData:{
//		  		tableData:[],
//		  		tableData2:[],
//		  	},
				rowId:'',
				deleteVisible:false,
		  	addRuleVisibleZ:false,
		  	modelDetail:false,
		  	activeName:'1',
		  	activeN:'3',
        loading: true,
        // 数据列表
        allDatas:[],//详情数据
        tableData: [],//审计分析列表
        tableDatazq: [],//周期统计列表
        tableDatajs: [],//及时统计列表
        tableData2:[],//告警管理列表
        // 当前查看的id
        currentId: '',
        // 详情信息
        detail: {},
        // 数据字典
        dict: JSON.parse(localStorage.getItem('dict')),
        ruleType: JSON.parse(localStorage.getItem('ruleType')),
        cycleSign: JSON.parse(localStorage.getItem('cycleSign')),
        ruleStatus: JSON.parse(localStorage.getItem('ruleStatus')),
        alarmRank: JSON.parse(localStorage.getItem('alarmRank')),
      }
    },
    created() {
    	this.getList()
    },
    mounted(){
//  	this.getList()
    },
    watch: {
      del: {
        handler(newValue, oldValue) {
          this.getList()
        },
        deep: true,
//      immediate: true,
      },
			detail: {
        handler(newValue, oldValue) {
        	this.detail=newValue
//        console.log(this.detail.id)
        },
//      status,
      	deep: true,
      	immediate: true,
      },
//    rowId: {
//      handler(newValue, oldValue) {
//      	this.rowId=newValue
//        console.log(this.rowId)
//      },
////      status,
//    	deep: true,
//    	immediate: true,
//    },
    },
    methods: {
    	// 自定义表格序号
      indexMethod(index) {
        return this.pageSize*(this.currentPage - 1) + index + 1
      },
      //返回
    	goBack() {
        this.$router.go(-1)
      },
      
//  	获取模板列表
    	getList(){
			  this.allDatas=[],//详情数据
        this.tableData= [],//审计分析列表
        this.tableDatazq= [],//周期统计列表
        this.tableDatajs= [],//及时统计列表
        this.tableData2=[],//告警管理列表
    		this.$axios.get(API + '/tempalte/getTemplateList').then(r => {
          let res = r.data.data
          if (res) { // 有数据
          	let dat = this.allDatas=res;
//        	console.log(dat)
		    	for(let i=0;i< dat.length;i++){
			    	if(dat[i].type==='1'){
			    		this.tableData.push(dat[i])

//			    		console.log('审计模板',this.tableData)
			    	}else if(dat[i].type==='2'){
			    		this.tableData2.push(dat[i])
//			    		console.log('告警模板',this.tableData2)
			    	}else
			    		tableData:[]
			    		tableData2:[]
			    	}
          } else { // 无数据
          	console.log('暂无模板数据')
          }
        }).then(()=>{
        	
						this.distinct(this.tableData)
						this.distinct(this.tableData2)
        		this.getClass()
        }).catch(e => { // 请求出错
          this.$message({
            message: '请求列表失败：' + e,
            type: 'warning'
          })
        })
    	},
    	//分类
      getClass(){
      	if(this.tableData.length>0){ // 有数据
          	let dat = this.tableData;
		    	for(let i=0;i< dat.length;i++){
			    	if(dat[i].cycleSign==='1'){
			    		this.tableDatazq.push(dat[i])
			    		
//			    		console.log('周期',this.tableDatazq)
			    	}else if(dat[i].cycleSign==='2'){
			    		this.tableDatajs.push(dat[i])
//			    		console.log('及时',this.tableDatajs)
			    	}else
			    		tableDatazq:[]
			    		tableDatajs:[]
			    	}
          }else{
//        	console.log('tableData为空',this.tableData)
          }
      },
			//去重
			distinct(arr){
				return Array.from(new Set(arr))
			},
//  	查看模板详情
    	showModelDetail(row){
    		console.log(row)
//  			this.rowId=row.id
          this.$axios.get(API + '/tempalte/getTemplateById?id='+row.id, {
            id: row.id
          }).then(r => {
            if (r.data.code === 200) {
              this.detail = r.data.data.templateCont;
//          	console.log('271验证接口',this.detail)
            	this.detail.id=row.id
			    		this.modelDetail=true;
            } else {
              this.$message({
                message: '展示详情失败：',
                type: 'warning'
              })
            }
          }).catch(e => {
            this.$message({
              message: '请求详情失败：' + e,
              type: 'warning'
            })
          })

      
    	},
    	//删除模板
    	deleteModel(row){
        	console.log(row.id)
        this.$confirm('确定删除规则吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.$axios.post(API + '/tempalte/deleteTemplateById', {
            id: row.id,
          }).then(r => {
            if (r.data.code===200) {
              this.$message({
                type: 'success',
                message: '已删除!'
              });
              this.modelDetail=false
              this.getList()
//            this.allDatas=[]
//            this.del=!this.del
console.log(this.tableData)
//            this.$forceUpdate()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              });
            }
          })
//        .catch(e => {
//          this.$message({
//            type: 'error',
//            message: '删除报错：' + e
//          });
//        })
        })
      },
    	// 详情
      checkRule(row) {
      	this.activeName=row.name
      },
    
    	
//  	查看模板最终结果
//  	resultRule(row) {
//      if (row.type === '1') { // 审计
//      	console.log(row)
//        this.$router.push({
//          path: '/auditResult',
//          query: {
//            id: row.id,
//            cycleSign: row.cycleSign,
//            backSign:true
//          }
//        })
//      } else { // 告警
//      	console.log(row)
//      	
//        this.$router.push({
//          path: '/alarmResult',
//          query: {
//            id: row.id,
//            backSign:true
//          }
//        })
//      }
//    },
      //配置使用模板
      addModel(id){
      	this.$confirm('确定配置该规则吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      	this.$axios.post(API + '/tempalte/addAnalyzeRuleByTemplate', {templageId:id}).then(r => {
              console.log('验证配置',r)
              this.$message({
                message: '配置成功！',
                type: 'success'
              })
              this.$emit('closeAddRule', false)
              this.$emit('closeAuditRule', false)
            }).catch(e => {
              this.$message({
                message: '配置失败：' + e,
                type: 'warning'
              })
            }).catch(e => {
            this.$message({
              type: 'error',
              message: '配置失败!：' + e
            });
          })
        })
      },
    	// 新增规则
      addRule() {
//    	this.$store.state.formDatas={
//        // 时间范围下拉
//        timeRangeSign:'',
//        // 自定义时间范围
//        showTime: [],
//        startTime: '',
//        endTime: '',
//        // 逻辑与
//        queryANDList: [{
//          fieldName: '',
//          relationSign: '',
//          targetValue: '',
//          and: []
//        }],
//        // 逻辑或
//        queryORList: [{
//          fieldName: '',
//          relationSign: '',
//          targetValue: '',
//          or: []
//        }],
//        // 分桶
//        bucketBO: {
//          fieldName: '',
//          bucketName: '',
//          typ: '',
//          type: '',
//          dateType: '',
//          aggregationBOList: [{
//            fieldName: '',
//            aggName: '',
//            aggSign: '',
//            arr: [],
//          }]
//        },
//        // 桶外聚合
//        aggOutList: [{
//          fieldName: '',
//          aggName: '',
//          aggSign: '',
//          arr: [],
//        }],
//        obj: {},
//      }
        this.addRuleVisibleZ = true
      },
    	// 右上角关闭弹框
      handleClose() {
        // 调用子组件的方法：清空输入域 + 关闭弹框
//      this.$refs.addRule.resetForm('ruleForm')
      },
//  	handleClick(tab, event) {
//      if (tab.name === '1') { // 审计
////        params.cycleSign = '2'
//					this.activeName='1'
////        this.getList()
//      } else if(tab.name === '2') { // 告警
////        params.cycleSign = '1'
//					this.activeName='2'
////        this.getList()
//      }else {
//      	return false
//      }
//    },
      handleClick(tab){
//    	console.log(tab)
      },
      // 点击某一个周期性规则
      checkRule2(row) {
        this.cycleId = row.id
      },
      // 子组件传值控制关闭弹框
      closeAuditRule(val) {
        this.addRuleVisibleZ = val
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
          this.getList(1, 5, params)
        }
      },
    }
	}
</script>
<style scoped>
.noButton{
	border: none;
	/*color: #47AFAE;*/
	color: #66B1FF;
	font-weight: 400;
	background-color: white;
}
h3{
	color: blue;
	margin-top: 20px;
}
.header .title{
	color: deepskyblue;
}
.header{
	/*font-size: 22px;*/
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }
.elbutton{
	float: right;
}
  .center{
    text-align: center;
  }
  .pages{
  	min-height: 600px;
  }
</style>

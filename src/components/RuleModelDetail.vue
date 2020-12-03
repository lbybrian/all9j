<template>
	<div>
		<div class="boxs">
			<el-row>
				<el-col class="center">
					<el-form>
						<el-form-item label="规则名称：">
							{{detail.name}}
						<el-button @click="deleteModel(detail)" type="text" size="small" class="elbutton">删除该模板</el-button>
						</el-form-item>
						<el-form-item label="规则描述：">
							{{detail.ruleDesc?detail.ruleDesc:'无'}}
						</el-form-item>
						<el-form-item label="规则状态：">
							{{ruleStatus[detail.status]?ruleStatus[detail.status]:'暂无数据'}}

						</el-form-item>
						<el-form-item label="统计类型：">
							{{cycleSign[detail.cycleSign]}}
						</el-form-item>

						<!-- 周期统计数据 -->
						<el-card>
							<el-form-item label="周期统计数据表：" v-if="detail.cycleSign==='1'">
								<el-table :data="cycleStatTast" style="width: 100%">
									<el-table-column prop="cycleUnit" label="周期单位" width="120" key="t1">
									</el-table-column>
									<el-table-column prop="cycleNum" label="周期数" width="120" key="t2">
									</el-table-column>
									<el-table-column prop='executeNum' label="已执行次数" width="120" key="t3">
									</el-table-column>
									<el-table-column prop='startTime' label="开始时间" width="165" key="t6">
									</el-table-column>
									<el-table-column prop='endTime' label="结束时间" width="165" key="t7">
									</el-table-column>
									<!-- <el-table-column prop='executeTime' label="执行时间" width="165" key="t4">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="165" key="t5">
                </el-table-column> -->
								</el-table>
							</el-form-item>
							<!-- 及时统计数据 -->

							<!--<div slot="header" class="clearfix">
                  <span>即时统计数据</span>
                </div>-->
							<el-form-item label="时间范围标识：" v-if="detail.cycleSign==='2'">
								{{detail.queryRuleJson.timeRangeSign?timeRangeSign[detail.queryRuleJson.timeRangeSign]:'暂无数据'}}
							</el-form-item>
							<!-- <el-form-item label="结果集：">
              {{detail.queryRuleJson.resultList?detail.queryRuleJson.resultList:'暂无数据'}}
            </el-form-item> -->
							<!-- <el-form-item label="排序字段：">
              {{detail.queryRuleJson.sort?detail.queryRuleJson.sort:'暂无数据'}}
            </el-form-item>
            <el-form-item label="排序方向：">
              {{detail.queryRuleJson.direction?detail.queryRuleJson.direction:'暂无数据'}}
            </el-form-item> -->
							<!-- <el-form-item label="分页页数：">
              {{detail.queryRuleJson.page?detail.queryRuleJson.page:'暂无数据'}}
            </el-form-item>
            <el-form-item label="当前页数：">
              {{detail.queryRuleJson.size?detail.queryRuleJson.size:'暂无数据'}}
            </el-form-item>
            <el-form-item label="返回数据的数量限制：">
              {{detail.queryRuleJson.sizeLimit?detail.queryRuleJson.sizeLimit:'暂无数据'}}
            </el-form-item> -->
						</el-card>

						<!-- 分桶信息表 -->
						<el-card class="box-card" v-if="detail.queryRuleJson.bucketBO&&detail.queryRuleJson.bucketBO.aggregationBOList.length>0">
							<div slot="header" class="clearfix">
								<span>分组信息</span>
							</div>
							<el-form>
								<el-form-item label="组名称：">
									{{detail.queryRuleJson.bucketBO.bucketName}}
								</el-form-item>
								<el-form-item label="字段名：" v-for="dc in dict['011'].dataValue" v-if="detail.queryRuleJson.bucketBO.fieldName===dc.value">
									{{dc.label}}
								</el-form-item>
								<el-form-item label="组类型：" v-for="dc in dict['019'].dataValue" v-if="detail.queryRuleJson.bucketBO.type===dc.value">
									{{dc.label}}
								</el-form-item>
								<el-form-item label="时间组类型：" v-if="detail.queryRuleJson.bucketBO.type==='date'">
									{{detail.queryRuleJson.bucketBO.dateType?detail.queryRuleJson.bucketBO.dateType:"暂无数据"}}
								</el-form-item>
								<el-form-item label="时间格式：" v-if="detail.queryRuleJson.bucketBO.type==='date'">
									{{detail.queryRuleJson.bucketBO.format?detail.queryRuleJson.bucketBO.format:'暂无数据'}}
								</el-form-item>

								<el-card class="box-card" v-for="item in detail.queryRuleJson.bucketBO.aggregationBOList">
									<div slot="header" class="clearfix">
										<span>组内聚合</span>
									</div>
									<el-form>
										<el-form-item label="聚合名称：">
											{{item.aggName?item.aggName:'暂无数据'}}
										</el-form-item>
										<el-form-item label="字段名：" v-for="dc in dict['012'].dataValue" v-if="item.fieldName===dc.value">
											<!-- {{item.fieldName?item.fieldName:'暂无数据'}} -->
											{{dc.label}}
										</el-form-item>
										<el-form-item label="聚合标识：" v-for="dcx in dict['013'].dataValue" v-if="item.aggSign===dcx.value">
											<!-- {{item.aggSign?item.aggSign:'暂无数据'}} -->
											{{dcx.label}}
										</el-form-item>
									</el-form>
								</el-card>
							</el-form>
						</el-card>

						<!-- 桶外聚合信息 -->
						<el-card class="box-card" v-if="detail.queryRuleJson.aggOutList.length>=1">
							<!-- 空数据不显示 -->
							<div slot="header" class="clearfix">
								<span>组外聚合</span>
							</div>
							<el-form v-for="item in detail.queryRuleJson.aggOutList">
								<el-form-item label="聚合名称：">
									{{item.aggName?item.aggName:'暂无数据'}}
								</el-form-item>
								<el-form-item label="字段名：" v-for="dc in dict['012'].dataValue" v-if="item.fieldName===dc.value">
									<!-- {{item.fieldName?item.fieldName:'暂无数据'}} -->
									{{dc.label?dc.label:'暂无数据'}}
								</el-form-item>
								<el-form-item label="聚合标识：" v-for="dcx in dict['013'].dataValue" v-if="item.aggSign===dcx.value">
									<!-- {{item.aggSign?item.aggSign:'暂无数据'}} -->
									{{dcx.label?dcx.label:'暂无数据'}}
								</el-form-item>
								<el-form-item label="聚合别名：">
									<!-- {{item.aggSign?item.aggSign:'暂无数据'}} -->
									{{item.aggAlias?item.aggAlias:'暂无数据'}}
								</el-form-item>
							</el-form>
						</el-card>

						<!-- 逻辑列表 -->
						<!--<span style="float: left;">逻辑列表:</span><br />-->
						<el-card class="box-card" v-for="(item,index) in detail.queryRuleJson.queryANDList" v-if="item.fieldName">
							<div slot="header" class="clearfix">
								<span>逻辑与列表{{++index}}</span><br />
							</div>
							<el-form-item label="字段名：">
								{{item.fieldName}}
							</el-form-item>
							<el-form-item label="关系标识：" v-for="bs in dict['018']['dataValue']" v-if="bs.value===item.relationSign">
								{{bs.label}}
							</el-form-item>
							<el-form-item label="目标值：" v-if="item.fieldName==='systemSign'">
								{{systemSign[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else-if="item.fieldName==='logType'">
								{{logType[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else-if="item.fieldName==='moduleSign'">
								{{blockName[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else-if="item.fieldName==='softwareSign'">
								{{softName[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else>
								{{operationType[item.targetValue]}}
							</el-form-item>
							<el-form-item label="最大值：" v-if="item.relationSign==='bt'">
								{{item.maxValue}}
							</el-form-item>
							<el-form-item label="最小值：" v-if="item.relationSign==='bt'">
								{{item.minValue}}
							</el-form-item>
						</el-card>

						<el-card class="box-card" v-for="(item,index) in detail.queryRuleJson.queryORList" v-if="item.fieldName">
							<div slot="header" class="clearfix">
								<span>逻辑或列表{{++index}}</span><br />
							</div>
							<el-form-item label="字段名：">
								{{item.fieldName}}
							</el-form-item>
							<el-form-item label="关系标识：" v-for="bs in dict['018']['dataValue']" v-if="bs.value===item.relationSign">
								{{bs.label}}
							</el-form-item>
							<el-form-item label="目标值：" v-if="item.fieldName==='systemSign'">
								{{systemSign[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else-if="item.fieldName==='logType'">
								{{logType[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else-if="item.fieldName==='moduleSign'">
								{{blockName[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else-if="item.fieldName==='softwareSign'">
								{{softName[item.targetValue]}}
							</el-form-item>
							<el-form-item label="目标值：" v-else>
								{{operationType[item.targetValue]}}
							</el-form-item>
							<el-form-item label="最大值：" v-if="item.relationSign==='bt'">
								{{item.maxValue}}
							</el-form-item>
							<el-form-item label="最小值：" v-if="item.relationSign==='bt'">
								{{item.minValue}}
							</el-form-item>
						</el-card>

					</el-form>

					<!-- 异常告警规则详情 -->
					<el-card v-for="(item,index) in detail.aardList">
						<el-card  v-if="detail.aardList.length>0&&item.resultFiledName!==''">
							<div slot="header" class="clearfix">
								<span>异常告警规则详情单{{++index}}</span><br />
							</div>
							<el-form>
								<el-form-item label="规则名称：">
									{{item.ruleName?item.ruleName:'暂无数据'}}
								</el-form-item>
								<el-form-item label="规则描述：" v-if="item.ruleDesc!==null">
									{{item.ruleDesc?item.ruleDesc:'暂无数据'}}
								</el-form-item>
								<el-form-item label="桶名称：" v-if="item.bucketName">
									{{item.bucketName}}
								</el-form-item>
								<el-form-item label="结果集字段名称：">
									{{item.resultFiledName?item.resultFiledName:'暂无数据'}}
								</el-form-item>
								<el-form-item label="聚合标识：">
									{{item.aggregationSign==='1'?'聚合类型':'非聚合类型'}}
								</el-form-item>
								<el-form-item label="比较关系标识：" v-for="bj in dict['018']['dataValue']" v-if="bj.value===item.relationSign">
									{{bj.label}}
								</el-form-item>
								<el-form-item label="告警级别：">
									{{alarmRank[item.alarmRank]?alarmRank[item.alarmRank]:'暂无数据'}}
								</el-form-item>
								<el-form-item label="字符类目标值：">
									{{item.targetStrValue?item.targetStrValue:"暂无数据"}}
								</el-form-item>
								<el-form-item label="数字类目标值：" v-if="item.relationSign!=='bt'">
									{{item.targetNumValue?item.targetNumValue:'暂无数据'}}
								</el-form-item>
								<el-form-item label="最大值：" v-if="item.relationSign==='bt'">
									{{item.maxValue?item.maxValue:'暂无数据'}}
								</el-form-item>
								<el-form-item label="最小值：" v-if="item.relationSign==='bt'">
									{{item.minValue?item.minValue:'暂无数据'}}
								</el-form-item>
							</el-form>
						</el-card>
					</el-card>

					<!-- 图文模板映射列表 -->
					<el-card class="box-card "v-for="item in detail.arctList" v-if="item.chartType" >
						<el-card v-if="item.chartType!==''">
							<div slot="header" class="clearfix">
								<span>图文模板映射列表{{item.chartType}}</span>
							</div>
							<el-form >
								<el-form-item label="图类型：">
									{{item.chartType===1?'饼状图':(item.chartType===2?'柱状图':(item.chartType===3?'折线图':item.chartType))}}
									<!--{{item.chartType?(item.chartType===1?'饼状图':(item.chartType===2?'柱状图':(item.chartType===3?'折线图':item.chartType))):'暂无数据'}}-->
								</el-form-item>
								<el-form-item label="图表名称：">
									{{item.chartName?item.chartName:'暂无数据'}}
								</el-form-item>
								<el-form-item label="x轴：">
									{{item.xaxis?item.xaxis:'暂无数据'}}
								</el-form-item>
								<el-form-item label="y轴：">
									{{item.yaxisArr?item.yaxisArr:'暂无数据'}}
								</el-form-item>
							</el-form>
						</el-card>
					</el-card>

				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
//	const API = '/api'
	export default {
		name: "RuleModelDetail",
		props: ['detail', 'deleteModel', 'ruleType', 'dict', 'cycleSign', 'alarmRank','rowId'],
		data() {
			let tData = {
				myId:'',
				// 数据字典
				systemSign: JSON.parse(localStorage.getItem('systemSign')) ? JSON.parse(localStorage.getItem('systemSign')) : '暂无数据',
				operationType: JSON.parse(localStorage.getItem('operationType')) ? JSON.parse(localStorage.getItem('operationType')) : '暂无数据',
				logType: JSON.parse(localStorage.getItem('logType')) ? JSON.parse(localStorage.getItem('logType')) : '暂无数据',
				timeRangeSign: JSON.parse(localStorage.getItem('timeRangeSign')) ? JSON.parse(localStorage.getItem('timeRangeSign')) : '暂无数据',
				blockName: JSON.parse(localStorage.getItem('blockName')) ? JSON.parse(localStorage.getItem('blockName')) : '暂无数据',
				softName: JSON.parse(localStorage.getItem('softName')) ? JSON.parse(localStorage.getItem('softName')) : '暂无数据',
				ruleStatus: JSON.parse(localStorage.getItem('ruleStatus')) ? JSON.parse(localStorage.getItem('ruleStatus')) : '暂无数据',
				cycleStatTast: []
			};
			if(this.detail && this.detail.cycleStatTast) {
				tData.cycleStatTast = [{
					startTime: this.detail.cycleStatTast.startTime ? this.detail.cycleStatTast.startTime : '暂无数据',
					createTime: this.detail.cycleStatTast.createTime ? this.detail.cycleStatTast.createTime : '暂无数据',
					endTime: this.detail.cycleStatTast.endTime ? this.detail.cycleStatTast.endTime : '暂无数据',
					executeTime: this.detail.cycleStatTast.executeTime ? this.detail.cycleStatTast.executeTime : '暂无数据',
					cycleNum: this.detail.cycleStatTast.cycleNum ? this.detail.cycleStatTast.cycleNum : '暂无数据',
					executeNum: this.detail.cycleStatTast.executeNum ? this.detail.cycleStatTast.executeNum : '暂无数据',
					cycleUnit: this.detail.cycleStatTast.cycleUnit ? this.detail.cycleStatTast.cycleUnit : '暂无数据',
				}]
			}
			return tData;
		},
		//		data(){
		//			return {
		//				modelId:'',
		//				allDatas:[],
		//			},
		created() {
		},
		mounted() {
			
		},
		watch: {
			detail: {
				handler(newValue, oldValue) {
					this.detail = newValue
					console.log(this.detail.id)
				},
				//      status,
				deep: true,
				immediate: true,
			},
		},
		methods: {
			//  	getDatas(){
			//  		this.$axios.get(API + '/tempalte/getTemplateList').then(r => {
			//        let res = r.data.data
			//        	console.log('137所有数据',res)
			//        if (res) { // 有数据
			//        	let dat = this.$store.state.modelLists=res;
			//        	console.log('140所有数据',dat)
			//		    	for(let i=0;i< dat.length;i++){
			//			    	if(dat[i].id){
			////			    		this.templateCont=
			//							JSON.parse(dat[i].templateCont)
			////			    		console.log('143查看详情',dat[i].templateCont,JSON.parse(dat[i].templateCont))
			//			    		console.log('143查看详情',JSON.parse(dat[i].templateCont))
			//			    	}else { // 无数据
			//        	console.log('垃圾哦！没有id')
			//        }
			//      }
			////  		.then(()=>{
			////						this.distinct(this.tableData)
			////						this.distinct(this.tableData2)
			////      		this.getClass()
			////      }).catch(e => { // 请求出错
			////        this.$message({
			////          message: '请求列表失败：' + e,
			////          type: 'warning'
			////        })
			////      })
			//		    	}
			//		    })
			//		  },

		}
	}
</script>

<style scoped>
.elbutton{
	float: right;
}
	.boxs {
		min-height: 600px;
		padding: 0 180px;
	}
	
	.center {
		text-align: center;
	}
	
	.el-col-offset-6 {
		margin-left: 20%;
	}
	
	.box-card {
		color: #47AFAE;
		/*color: white;*/
		/*background: #082031;*/
		/*box-shadow: 0 0 20px rgba(9,169,191,0.5);*/
	}
</style>
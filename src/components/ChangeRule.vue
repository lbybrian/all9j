<template>
  <div class="addRule">
    <el-steps :active="active" align-center style="margin-bottom: 20px;" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
    </el-steps>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
      <el-row v-show="active===1">
        <el-col :span="8">
          <el-form-item label="规则名称" class="black" prop="name" >
            <el-input v-model.trim="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规则描述" class="black" prop="ruleDesc">
            <el-input v-model="ruleForm.ruleDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规则类型" class="black" prop="type">
            <el-radio-group v-model="ruleForm.type" @change="changeType">
              <el-radio label="1">审计分析规则</el-radio>
              <el-radio label="2">告警规则</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row style="position:relative" v-if="active===1&&ruleForm.type==='1'">
				<el-form-item label="设置统计标识">
        	<el-radio-group v-model="ruleForm.cycleSign" @change="changeCycle" class="fashowtime">
              <el-radio label="2" v-if="ruleForm.type!=='2'">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          <span v-if="ruleForm.cycleSign==='1'" style="margin-left: 10px;">
        	<el-form-item label="时间范围" class="showtime" style="width: 490px;position: absolute;float: left;left: 110px;top: 0px;" prop="showTime" :rules="{ required: true, message: '请选择时间范围', trigger:['blur','change'] }">
              <el-date-picker v-model="ruleForm.showTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
        	</el-form-item>
            <el-form-item label="频率" prop="" class="pinlv" style="width: 490px;position: absolute;float: left;left: 560px;top: 0px;">
							<el-input-number v-model="ruleForm.cycleStatTast.cycleNum" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          			<el-select v-model="ruleForm.cycleStatTast.cycleUnit" placeholder="请选择" style="width:100px;">
            			<el-option v-for="item in dict['016']['dataValue']" :key="item.value" :label="item.label" :value="item.value">
            			</el-option>
          			</el-select>
            </el-form-item>
        </span>
				</el-form-item>
			</el-row>
      
			<el-row style="position:relative" v-if="active===1&&ruleForm.type==='2'">
				<el-form-item label="设置统计标识">
        	<el-radio-group v-model="ruleForm.cycleSign" @change="changeCycle" class="fashowtime">
              <el-radio label="2" v-if="ruleForm.type!=='2'">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          <span v-if="ruleForm.cycleSign==='1'" style="margin-left: 10px;">
        	<el-form-item label="时间范围" class="showtime" style="width: 490px;position: absolute;float: left;left: 110px;top: 0px;" prop="showTime" :rules="rules.showTime">
              <el-date-picker v-model="ruleForm.showTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
        	</el-form-item>
            <el-form-item label="频率" prop="" class="pinlv" style="width: 490px;position: absolute;float: left;left: 560px;top: 0px;">
							<el-input-number v-model="ruleForm.cycleStatTast.cycleNum" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          			<el-select v-model="ruleForm.cycleStatTast.cycleUnit" placeholder="请选择" style="width:100px;">
            			<el-option v-for="item in dict['016']['dataValue']" :key="item.value" :label="item.label" :value="item.value">
            			</el-option>
          			</el-select>
            </el-form-item>
        </span>
				</el-form-item>
			</el-row>
      <el-form-item v-show="active===1" label="规则">
        <configuration-z @config="config" :ruleForm="ruleForm" ref="ConfigurationZ" ></configuration-z>
        <!--<configuration-z  v-bind="$props" ref="ConfigurationZ" :rules="ruleForm.formData"></configuration-z>-->
      </el-form-item>

      <div v-if="active===2&&ruleForm.type==='1'">
        <el-form-item label="已配置图表" >
          <chart-list-z v-bind="$props" :ruleForm="ruleForm" v-show="active===2&&ruleForm.type==='1'" @chartList="chartList" ></chart-list-z>
        </el-form-item>
        <el-form-item label="图文配置" >
          <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
            <el-tab-pane label="饼图" name="pie" v-show="ruleForm.type==='1'">
              <pie-z v-show="activeTab==='pie'" :obj="ruleForm.queryRuleJson.bucketBO"></pie-z>
              <!--<pie v-show="activeTab==='pie'" :obj="ruleForm.queryRuleJson.bucketBO"></pie>-->
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="histogram" v-show="ruleForm.type==='1'">
              <histogram-z v-show="activeTab==='histogram'" :obj="ruleForm.queryRuleJson.bucketBO"></histogram-z>
              <!--<histogram v-show="activeTab==='histogram'" :obj="ruleForm.queryRuleJson.bucketBO"></histogram>-->
            </el-tab-pane>
            <el-tab-pane label="折线图" name="line" v-show="ruleForm.type==='1'">
              <line-chart-z v-show="activeTab==='line'" :obj="ruleForm.queryRuleJson.bucketBO"></line-chart-z>
              <!--<line-chart v-show="activeTab==='line'" :obj="ruleForm.queryRuleJson.bucketBO"></line-chart>-->
            </el-tab-pane>
          </el-tabs>
        </el-form-item>

        <el-form-item label="表格配置" prop="showTable">
          <span>统计结果是否以列表形式显示</span>
          <el-radio-group v-model="ruleForm.showTable">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1" :disabled="ruleForm.queryRuleJson.bucketBO.aggregationBOList.length===0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item v-show="active===2&&ruleForm.type==='2'">
      	<!--<div v-if="ruleForm.type==='2'">--> 
	        <!--<add-alarm-rule-z v-bind="$props" :obj="ruleForm.queryRuleJson.bucketBO" :obj2="ruleForm.queryRuleJson.aggOutList" @alarmRule="alarmRule" ref="addAlarmRuleZ"></add-alarm-rule-z>-->
	        <add-alarm-rule-z @config="config" v-bind="$props" :aardList="ruleForm.aardList":obj="ruleForm.queryRuleJson.bucketBO" :obj2="ruleForm.queryRuleJson.aggOutList" @alarmRule="alarmRule" ref="addAlarmRuleZ"></add-alarm-rule-z>
	        
	        
      	<!--</div>-->
      </el-form-item>

      <el-form-item class="center">
        <el-button v-show="active>1" size="small" type="default" @click="preStep()">上一步</el-button>
        <el-button v-show="active<2" size="small" type="primary" @click="nextStep('ruleForm')">下一步</el-button>
        <!--<el-button v-if="active===2" size="small" type="primary" @click="submitForm('ruleForm')">修改</el-button>-->
        <el-button v-if="active===2" size="small" type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button v-if="active===2" size="small" type="primary" @click="hehe">取消</el-button>
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const API = '/api'
	import PieZ from "@/components/PieZ";
import HistogramZ from "@/components/HistogramZ";
import LineChartZ from "@/components/LineChartZ";
//import Pie from "@/components/Pie";
//import Histogram from "@/components/Histogram";
//import LineChart from "@/components/LineChart";
  import ChartListZ from "@/components/ChartListZ";
  import ConfigurationZ from "@/components/ConfigurationZ";
  import AddAlarmRuleZ from "@/components/AddAlarmRuleZ";
  
  
  
  export default {
		name: "ChangeRule",
    components: {AddAlarmRuleZ, ConfigurationZ, ChartListZ, LineChartZ, HistogramZ, PieZ},
//  components: {AddAlarmRuleZ, ConfigurationZ, ChartListZ, LineChart, Histogram, Pie},
//  props: ['detail','submitForm'],
    props: ['detail'],
    data() {
		  return {
		  	chartSign:false,
		  	changeSign:false,
		  	changeSign2:false,
		    // 步骤
        active: 1,
        ruleForm: {
          name: '',
          type: '1',
          cycleSign: '2',
          ruleDesc: '',
          showTime: [{ required: true, message: '请选择时间范围', trigger:['blur','change'] }],
//        formData:{},
          // 规则
          queryRuleJson: {
            // and逻辑
            queryANDList: [],
            // or逻辑
            queryORList: [],
            // 桶外聚合组
            aggOutList: [],
            // 时间范围
            timeRangeSign: '',
            // 分桶信息
            bucketBO: {
              aggregationBOList: [{
                fieldName: '',
                aggName: '',
                aggSign: '',
                arr: [],
              }]
            },
          },
          cycleStatTast: {
            cycleUnit: 'minute',
            cycleNum: 1,
            startTime: '',
            endTime: ''
          },
          // 是否显示表格
          showTable: 0,
          // 告警规则
          aardList: [{
            ruleName: '',
            bucketName: '',
            resultFiledName: '',
            aggregationSign: '',
            relationSign: '',
            alarmRank: 1,
            targetNumValue: 1,
            targetStrValue: '',
            maxValue: 0,
            minValue: 0
          }],
          arctList: []
        },
        // 保存时传参对象
        params: {},
        rules: {
          name: [
            { required: true, message: '规则名称不可为空！', trigger:['blur','change']},
            { min:2,max:100, message: '长度在2-100个字符内', trigger: ['blur','change']},
          ],
          showTime:[{ required: true, message: '请选择时间范围', trigger:['blur','change'] }],
//        showTime2:{  message: '请选择时间范围', trigger:['blur','change'] },
        },
//      ruleTime:{
//			  	required:true,
//			  	massage:'请选择时间范围',
//			  	trigger:['blur','change']
//			  },
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
        // 图标配置
        activeTab: 'pie',
        // 字典表
        dict: JSON.parse(localStorage.getItem('dict')),
      }
    },
    
//  	created() {
//  	this.ruleForm=this.$store.state.ruleForm
//  },
    created() {
//  	if(this.detail.id===this.$store.state.ruleForm.id){
//	    	this.ruleForm=deepClone(this.$store.state.ruleForm)
//  	}
    	this.params.id=this.detail.id
    	function deepClone(source){
//  		const obj = typeof source==='Array'?[]:{}
    		const obj =source.constructor===Array?[]:{}
    		for(let keys in source){
    			if(source.hasOwnProperty(keys)){
    				if(source[keys]&&(typeof source[keys]==='Object'||typeof source[keys]==='Array')){
//  				if(source[keys]&&(typeof source[keys]==='Object')){
    					obj[keys]=source[keys].constructor===Array?[]:{}
//  					obj[keys]=typeof source[keys]==='Array'?[]:{}
    					obj[keys]=deepClone(source[keys])
    				}else{
    					obj[keys]=source[keys]
    				}
    			}
    		}
    		return obj
    	}
//			    	console.log(this.$store.state.jk3.data)
//  	this.ruleForm=this.$store.state.jk3.data;
    	
//			this.ruleForm=this.$store.state.ruleForm;
//  	console.log(this.ruleForm.queryRuleJson.timeRangeSign)
    	//查看数据源
    	console.log(11111111,this.detail)
//  	this.ruleForm=this.deepClone(this.detail)
//  	console.log(222222222,this.ruleForm)
//  	this.ruleForm=JSON.parse(JSON.stringify(this.detail));
//  	this.ruleForm=this.detail;
//  	this.ruleForm.showTime=this.ruleForm.queryRuleJson.showTime
this.ruleForm.name = this.detail.name;
this.ruleForm.type = this.detail.type;
this.ruleForm.cycleSign = this.detail.cycleSign;
this.ruleForm.ruleDesc = this.detail.ruleDesc;
this.ruleForm.showTime = []
if(this.detail.cycleStatTastDetail && this.detail.cycleStatTastDetail.startTime && this.detail.cycleStatTastDetail.endTime) {
//	this.ruleForm.showTime.unshift(this.detail.cycleStatTastDetail.startTime)
//	this.ruleForm.showTime.unshift(this.detail.cycleStatTastDetail.endTime)
	this.ruleForm.showTime[0]=this.detail.cycleStatTastDetail.startTime
	this.ruleForm.showTime[1]=this.detail.cycleStatTastDetail.endTime
}
this.ruleForm.queryRuleJson = deepClone(this.detail.queryRuleJson)
if(this.detail.cycleStatTastDetail) {
	this.ruleForm.cycleStatTast = deepClone(this.detail.cycleStatTastDetail)
}


//图文模板
//if(this.detail.arctList.length > 0) {
//	this.ruleForm.arctList = deepClone(this.detail.arctList)
//}
for(let tada = 0; tada < this.detail.arctList.length; tada++) {
	(tada => {
		let item = {}
		setTimeout(() => {
			if(this.detail.arctList[tada].status === '1') {
				item.axisYArr = []
				item.axisX = this.detail.arctList[tada].xaxis
				item.charType = this.detail.arctList[tada].chartType
				item.chartName = this.detail.arctList[tada].chartName
				item.chartTemplateId = this.detail.arctList[tada].chartTemplateId
				item.yAxis = this.detail.arctList[tada].yaxisArr
				item.axisYArr.push(this.detail.arctList[tada].yaxisArr)
				this.ruleForm.arctList.push(item)
			}
		}, 0)
	})(tada)
}

//告警数据
			
				if(this.detail.aardList.length>0){
						this.ruleForm.aardList=deepClone(this.detail.aardList)
			}
//			for(let aggs of this.detail.aardList){
//	  			aggs.arr=[]
//				for(let z in aggs){
//	  			this.ruleForm.aardList.map(item=>{
//	  				for(let k in item){
////	  					console.log('kkkkkkkkkkk',z)
////	  					console.log('zzzzzzzzzzz',k)
////	  					if(z===k){
//	  					if(aggs[z]){
////	  						item[k]=aggs[z]
//	  						aggs.arr.push(aggs[z])
//	  					}
//	  				}
//	  			})
//					}
//	  		}

//let aa=[]
//this.detail.arctList.map(item=>{
////	return [...item]
////this.ruleForm.arctList.push(item)
//	aa.push(item)
//	
//})
//			console.log('QQQQQQQQ',this.arctList)
//			this.$refs[ConfigurationZ].formData.timeRangeSign=this.detail.queryRuleJson.timeRangeSign
			
//			this.ruleForm.showTime.push(this.$store.state.ruleForm.cycleStatTastDetail.startTime)
//			this.ruleForm.showTime.push(this.$store.state.ruleForm.cycleStatTastDetail.endTime)
			
//			this.ruleForm.showTime.unshift(this.$store.state.ruleForm.cycleStatTastDetail.startTime)
//			this.ruleForm.showTime.unshift(this.$store.state.ruleForm.cycleStatTastDetail.endTime)

//			this.ruleForm.showTime[0]=this.$store.state.ruleForm.cycleStatTastDetail.startTime
//			this.ruleForm.showTime[1]=this.$store.state.ruleForm.cycleStatTastDetail.endTime

//			this.ruleForm.showTime.push(this.$store.state.jk3.data.cycleStatTastDetail.startTime)
//			this.ruleForm.showTime.push(this.$store.state.jk3.data.cycleStatTastDetail.endTime)
    	console.log(33333333,this.ruleForm,this.detail)
    	console.log(44444444444,this.ruleForm.aardList,this.detail.aardList)
    	console.log(555555555666666,this.ruleForm.arctList,this.detail.arctList)
    },
    mounted() {
    	
    },
    watch: {
		  // 监听表单
      ruleForm: {
        handler(newValue, oldValue) {
          if (newValue.type === '2') { // 如果是告警规则
            newValue.cycleSign = '1' // 那么必须是周期性统计
            this.activeTab = '' // 告警规则仅显示表格
//       		this.ruleForm=newValue
          } else {
            this.activeTab = 'pie'
//        	this.ruleForm=newValue
          }
//        this.ruleForm=newValue
        },
        deep: true
      },
      showTime: {
        handler(newValue, oldValue) {
        	this.ruleForm.showTime=newValue
        },
        deep: true
      },
//    detail: {
//      handler(newValue, oldValue) {
//      	this.detail=newValue
//        console.log('this.detail更新llllllllllllllllllllllllll',this.detail)
//      },
//      deep: true,
////      immediate: true,
//    },
    },
    methods: {
    	deepClone(source){
    		const obj = typeof source==='Array'?[]:{}
    		for(let keys in source){
    			if(source.hasOwnProperty(keys)){
    				if(source[keys]&&(typeof source[keys]==='Object'||typeof source[keys]==='Array')){
//  					obj[keys]=source[keys].constructor===Array?[]:{}
    					obj[keys]=typeof source[keys]==='Array'?[]:{}
    					obj[keys]=deepClone(source[keys])
    				}else{
    					obj[keys]=source[keys]
    				}
    			}
    		}
    		return obj
    	},
    	changeType(val){
        if (val === '1') { // 2告警  1审计
          this.changeSign = true
//        this.$refs.showTime.rules.required=false;
//        this.$refs.showTime.rules=this.ruleTime;
					this.rules.showTime=[]
//        this.ruleForm.showTime = []
          this.ruleForm.cycleStatTast = {
            cycleUnit: 'minute',
            cycleNum: 1,
            startTime: '',
            endTime: ''
          }
        }else if(val === '2'){
        	this.changeSign = false
//      	this.rules.showTime=[{ required: true, message: '请选择时间范围', trigger:['blur','change'] }]
          this.ruleForm.showTime = []
          Object.assign(this.rules,this.showTime)
        }
      },
      // 是否周期性单选
      changeCycle(val) {
        if (val === '2') { // 2否  1是
          this.changeSign = true
//        this.$refs.showTime.rules.required=false;
//        this.$refs.showTime.rules=this.ruleTime;
					this.rules.showTime=[]
//        this.ruleForm.showTime = []
          this.ruleForm.cycleStatTast = {
            cycleUnit: 'minute',
            cycleNum: 1,
            startTime: '',
            endTime: ''
          }
        }else if(val === '1'){
        	this.changeSign = false
//      	this.rules.showTime=[{ required: true, message: '请选择时间范围', trigger:['blur','change'] }]
          this.ruleForm.showTime = []
          Object.assign(this.rules,this.showTime)
        }
      },
      // configuration组件接收的值
      config(val) {
        for(let key in val) {
          this.ruleForm.queryRuleJson[key] = val[key]
        }
      },
      // 审计图文组件接收的值
      chartList(val) {
        
//      for(let key in val) {
	        this.ruleForm.arctList = val
//        this.ruleForm.arctList[key] = val[key]
//      }
      
      },
      // 告警规则组件接收的值
      alarmRule(val) {
//    	for(let key in val) {
	        this.ruleForm.aardList = val.rows
//        this.ruleForm.aardList[key] = val[key].rows
          console.log('FFFFFFFFFFFFFFFFFF',this.ruleForm.aardList)
//      }
//  		this.ruleForm.rows=deepClone(this.$props.detail.aardList)
      },
      // 上一步
      preStep() {
//      this.$store.state.formDatas2=this.$refs.addAlarmRuleZ.ruleForm.rows;
        this.active = 1;
//      this.ruleForm.queryRuleJson.bucketBO.aggregationBOList = [{
//        fieldName: '',
//        aggName: '',
//        aggSign: '',
//        arr: [],
//      }]
      },
      hehe(){
			  this.$emit('closeChangeRule', false)
//      this.active = 1;
      },
      // 下一步
      nextStep(fm) {
    		let list=[]
    		list.push(
	      	this.checkForm(fm),
    			this.$refs.ConfigurationZ.checkForm('formData'),
    			this.$refs.ConfigurationZ.checkForm('formData.bucketBO'),
//  			this.$refs.ConfigurationZ.checkForm('formData.obj'),
    		)
    		Promise.all(list).then(()=>{
    			this.active=2;
    		}).catch(()=>{
    			this.$message.error('请按规范填写！')
    			return false
    		})
      },
      checkForm(fm){
    		return new Promise((resolve,reject)=>{
    			this.$refs[fm].validate(valid=>{
    				if(valid){
    					resolve()
    				}else{
    					reject()
    				}
    			})
    		})
//  		.then(()=>{
//  			cb()
//  		})
    	},
		  // 修改规则
//		  submitForm(fm){
//		  	this.$axios.post(API+'/analyzeRule/updateAnalyzeRule',{id:12}).then(r=>{
//		  		console.log(111111111111111,fm,r)
//		  	})
//		  },

      submitForm(fm) {
//    	if(this.arctList.length>0){
//					this.checkForm('chartList').then(()=>{
//						this.chartSign=true
//					})
//					if(this.chartSign){
					
//					this.$on('alarmRule',data=>{
//						this.ruleForm.aardList=data
//						console.log('保存前',data)
//					})
	
					if(this.ruleForm.type==='2'){
//this.$refs.addAlarmRuleZ.ruleFormZ.rows.map(item=>{
//this.ruleForm.aardList=[]
//this.ruleForm.aardList.push(item)
//})
//						this.ruleForm.aardList =this.$refs.addAlarmRuleZ.ruleForm.rolws
	    			this.$refs.addAlarmRuleZ.checkForm('ruleForm').then(()=>{
			            if (this.ruleForm.showTime.length > 0) {
			              this.ruleForm.cycleStatTast.startTime = this.moment(this.ruleForm.showTime[0]).format("YYYY-MM-DD HH:mm:ss")
			              this.ruleForm.cycleStatTast.endTime = this.moment(this.ruleForm.showTime[1]).format("YYYY-MM-DD HH:mm:ss")
			            }
			            for(let key in this.ruleForm) {
			              this.params[key] = this.ruleForm[key]
			            }
			            console.log('保存格式1111111',JSON.stringify(this.params))
//			            console.log('保存格式',this.params)
			            this.$axios.post(API + '/analyzeRule/updateAnalyzeRule', this.params).then(r => {
			              console.log(r)
			              this.$message({
			                message: '保存成功！',
			                type: 'success'
			              })
			              this.$store.state.ruleForm=r;
//			              this.$props.submitForm('ruleForm')
			              this.$emit('closeChangeRule', false)
			            }).catch(e => {
			              this.$message({
			                message: '保存失败：' + e,
			                type: 'error'
			              })
			            })
			          }).catch(()=>{
			            this.$message({
			              message: '请按规范填写111111！',
			              type: 'error'
			            })
			            return false
			          })
					}else{
	    			this.checkForm(fm).then(()=>{
			            if (this.ruleForm.showTime.length > 0) {
			              this.ruleForm.cycleStatTast.startTime = this.moment(this.ruleForm.showTime[0]).format("YYYY-MM-DD HH:mm:ss")
			              this.ruleForm.cycleStatTast.endTime = this.moment(this.ruleForm.showTime[1]).format("YYYY-MM-DD HH:mm:ss")
			            }
			            for(let key in this.ruleForm) {
			              this.params[key] = this.ruleForm[key]
			            }
			            console.log('保存格式22222222',JSON.stringify(this.params))
//			            console.log('保存格式',this.params)
			            this.$axios.post(API + '/analyzeRule/updateAnalyzeRule', this.params).then(r => {
			              console.log(r)
			              this.$message({
			                message: '保存成功！',
			                type: 'success'
			              })
			              this.$store.state.ruleForm=r;
//			              this.$props.submitForm('ruleForm')
			              this.$emit('closeChangeRule', false)
			            }).catch(e => {
			              this.$message({
			                message: '保存失败：' + e,
			                type: 'error'
			              })
			            })
			          }).catch(()=>{
			            this.$message({
			              message: '请按规范填写22222222！',
			              type: 'error'
			            })
			            return false
			          })
					}
      
//					}
//	      }else{
//	            this.$message({
//	              message: '图表数据未配置！',
//	              type: 'error'
//	            })
//	          }
      },
      //保存
      // 取消修改
//    resetForm(formName) {
//    	
//      // 关闭父组件弹框
////      this.$emit('closeAddRule', false)
//      // 恢复成第一步
//      this.active = 1
//      this.ruleForm = this.deepClone(this.detail)
//    },
      // 周期变化
      handleChange(val) {
        console.log(val)
      },
      // 切换图表tab
      changeTab() {
        console.log(this.activeTab)
      },
    }
	}
</script>
<!--<style>
  .demo-ruleForm .black{
	color: #000000!important;
}
.black{
	color: #000000!important;
}
</style>-->
<style scoped>
  .center{
    text-align: center;
  }

</style>

<template>
  <div>
    <el-table v-if="tableData.length>0" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="charType" label="类型" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.charType===1">饼图</div>
          <div v-if="scope.row.charType===2">柱状图</div>
          <div v-if="scope.row.charType===3">折线图</div>
        </template>
      </el-table-column>
      <el-table-column label="图表属性">
        <template slot-scope="scope">
          <div>
            <span>图表名称：{{scope.row.chartName}}, </span>
            <span>图例：{{scope.row.axisX}}, </span>
            <span v-if="scope.row.yAxis">数据值：{{scope.row.yAxis}}</span>
            <span v-if="!scope.row.yAxis">数据值：{{scope.row.axisYArr.join(',')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <!--<el-button @click="check(scope)" type="text" size="small">预览</el-button>-->
          <el-button @click="del(scope)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else style="color: #F56C6C; font-size: 12px;">* 请配置以下图表信息</div>

    <el-dialog title="图表预览" :modal="false" :visible.sync="chartVisible" width="40%">
      <div>图表</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chartVisible = false" type="primary" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
		name: "ChartListZ",
		props:['ruleForm'],
    data() {
		  return {
        loading: true,
        // 数据列表
//      tableData: [{
//      	axisX: '',
//      	axisYArr: [],
//      	charType: '',
//      	chartName: '',
//      	chartTemplateId: '',
//      	yAxis: '',
//      }],
				tD:[],
				tableData:[],
				// 饼图
        pie: [],
        // 柱状图
        histogram: [],
        // 折线图
        lineChart: [],
        chartVisible: false,
      }
    },
    watch:{
      tableData:{
        handler(newVal){
//      	this.tableData=[...newVal]
//      	this.$emit('chartList',newVal)
    			console.log('chartList-Table',this.tableData)
        },
        deep: true,
      },
    },
    created() {
		  this.loading = false
//		  
//		  function deepClone(source){
////  		const obj = typeof source==='Array'?[]:{}
//  		const obj =source.constructor===Array?[]:{}
//  		for(let keys in source){
//  			if(source.hasOwnProperty(keys)){
////  				if(source[keys]&&(typeof source[keys]==='Object'||typeof source[keys]==='Array')){
//  				if(source[keys]&&(typeof source[keys]==='Object')){
//  					obj[keys]=source[keys].constructor===Array?[]:{}
////  					obj[keys]=typeof source[keys]==='Array'?[]:{}
//  					obj[keys]=deepClone(source[keys])
//  				}else{
//  					obj[keys]=source[keys]
//  				}
//  			}
//  		}
//  		return obj
//  	}
//if(this.ruleForm.arctList.length > 0) {
//	this.tableData = deepClone(this.ruleForm.arctList)
//}
			





//	    		function deepClone(source){
//	//  		const obj = typeof source==='Array'?[]:{}
//	    		const obj =source.constructor===Array?[]:{}
//	    		for(let keys in source){
//	    			if(source.hasOwnProperty(keys)){
//	//  				if(source[keys]&&(typeof source[keys]==='Object'||typeof source[keys]==='Array')){
//	    				if(source[keys]&&(typeof source[keys]==='Object')){
//	    					obj[keys]=source[keys].constructor===Array?[]:{}
//	//  					obj[keys]=typeof source[keys]==='Array'?[]:{}
//	    					obj[keys]=deepClone(source[keys])
//	    				}else{
//	    					obj[keys]=source[keys]
//	    				}
//	    			}
//	    		}
//	    		return obj
//	    	}
//	    	this.tableData=deepClone(this.ruleForm.arctList)
	//		  if(this.ruleForm&&this.ruleForm.arctList.length>0){
	////		  	this.tableData=this.ruleForm.arctList
	//		  	this.tableData.axisX=this.ruleForm.arctList
	//		  	
	//		  }
//			  for(let tada of this.ruleForm.arctList){
//			  	console.log('为什么',tada)
//	  			this.tableData.map(item=>{
//	  			item.axisYArr=[]
//	  				item.axisX=tada.xaxis
//	  				item.charType=tada.chartType
//	  				item.chartName=tada.chartName
//	  				item.chartTemplateId=tada.chartTemplateId
//	  				item.yAxis=tada.yaxisArr
//	  				item.axisYArr.push(tada.yaxisArr)
//	//	  			if(item.value===tada.fieldName){
//	//	  				tada.arr.push(item.value)
//	//	  				if(item.children&&item.children.length>0){
//	//	  				for(let i of item.children){
//	//	  					if(i.value===tada.aggSign){
//	//	  						tada.arr.push(i.value)
//	//	  					}
//	//	  				}}
//	//	  			}
//	  				
//	  			})
//	  		}
//			  for(let tada in this.ruleForm.arctList){
////			  	console.log('为什么',tada)
//	  			this.tableData.map(item=>{
//	  			item.axisYArr=[]
//	  				item.axisX=this.ruleForm.arctList[tada].xaxis
//	  				item.charType=this.ruleForm.arctList[tada].chartType
//	  				item.chartName=this.ruleForm.arctList[tada].chartName
//	  				item.chartTemplateId=this.ruleForm.arctList[tada].chartTemplateId
//	  				item.yAxis=this.ruleForm.arctList[tada].yaxisArr
//	  				item.axisYArr.push(this.ruleForm.arctList[tada].yaxisArr)
//	//	  			if(item.value===tada.fieldName){
//	//	  				tada.arr.push(item.value)
//	//	  				if(item.children&&item.children.length>0){
//	//	  				for(let i of item.children){
//	//	  					if(i.value===tada.aggSign){
//	//	  						tada.arr.push(i.value)
//	//	  					}
//	//	  				}}
//	//	  			}
//	  				
//	  			})
//	  		}
//	*********************************************************?		  
//for(let aggs of this.tableData){
//			aggs.arr=[]
//			this.dict['012']['dataValue'].map(item=>{
//	  			if(item.value===aggs.fieldName){
//	  				aggs.arr.push(item.value)
//	  				if(item.children&&item.children.length>0){
//	  				for(let i of item.children){
//	  					if(i.value===aggs.aggSign){
//	  						aggs.arr.push(i.value)
//	  					}
//	  				}}
//	  			}
//				
//			})
//		}
//	*********************************************************?		  
//			  let qqq=this.ruleForm.arctList;
//			  let aaa=this.tableData
//			  for(let tada in this.ruleForm.arctList){
	
	
//			  for(let tada=0; tada<this.ruleForm.arctList.length;tada++){
//			  	(tada=>{
//					  let item={}
//						setTimeout(()=>{
//						//	  			this.tableData.map(item=>{
//						//			  		console.log('posirhdfaaaaaaaaaaaaaaah9erohv',this)
////									  	console.log('为什么2',tada)
//	if(this.ruleForm.arctList[tada].status==='1'){
//			item.axisYArr=[]
//				item.axisX=this.ruleForm.arctList[tada].xaxis
//				item.chartType=this.ruleForm.arctList[tada].chartType
//				item.chartName=this.ruleForm.arctList[tada].chartName
//				item.chartTemplateId=this.ruleForm.arctList[tada].chartTemplateId
//				item.yAxis=this.ruleForm.arctList[tada].yaxisArr
//				item.axisYArr.push(this.ruleForm.arctList[tada].yaxisArr)
////							  				item.axisYArr=this.ruleForm.arctList[tada].yaxisArr
//				
////									  	console.log('为什么344444444',item)
////			  		aaa[tada]=item
//this.tableData.push(item)
////	  				this.tableData.splice(0,tada,item)
//
////							  				return item
//		
//	}
//							  				
//							
//						},0)
//			  	})(tada)
////			  	console.log('为什么AAAAAAAAAAAAAA',aaa)
////					qqq.push(item)
//	  		}


//			  this.tableData=aaa
//	*********************************************************?		
//for(let tada = 0; tada < this.ruleForm.arctList.length; tada++) {
//	(tada => {
//		let item = {}
//		setTimeout(() => {
//				item.axisYArr = []
//				item.axisX = this.ruleForm.arctList[tada].axisX
//				item.charType = this.ruleForm.arctList[tada].charType
//				item.chartName = this.ruleForm.arctList[tada].chartName
//				item.chartTemplateId = this.ruleForm.arctList[tada].chartTemplateId
//				item.yAxis = this.ruleForm.arctList[tada].yAxis
//				item.axisYArr.push(this.ruleForm.arctList[tada].axisYArr)
//				this.tableData.push(item)
//		}, 0)
//	})(tada)
//}


					this.tableData.push(...this.ruleForm.arctList)
//			  for(let item of this.ruleForm.arctList){
//					this.tableData.push(item)
//			  }
	    	
//  	this.ruleForm.arctList.map(item=>{
//					this.tableData.push(item)
//			})
			  	console.log('QQQQQQQQQQQQ',this.tableData,this.ruleForm.arctList)
		  
    },
    mounted() {
//	    	if(this.ruleForm.arctList.length>0){}else{
	    		// 监听列表数据变化
		      this.$Bus.$on('pie', data => {
		      	console.log('饼图BBBBBBBBBBBBBB传值',data)
		        this.pie = data
//		        this.tableData = this.pie.concat(this.histogram).concat(this.lineChart)
		        this.tableData = [...this.tableData,...this.pie]
//		        this.tD = [...this.tableData,...this.pie]
//		        this.tableData= new Array.from(new Set(tD))
		        this.$emit('chartList', this.tableData)
		      })
		      this.$Bus.$on('histogram', data => {
		      	console.log('通TTTTTTTTTTTTTTTT传值',data)
		        this.histogram = data
//		        this.tableData = this.pie.concat(this.histogram).concat(this.lineChart)
		        this.tableData = [...this.tableData,...this.histogram]
//		        this.tableData= new Array.from(new Set(this.tD))
		        this.$emit('chartList', this.tableData)
		      })
		      this.$Bus.$on('lineChart', data => {
		      	console.log('线XXXXXXXXXXXXXXXXXX传值',data)
		        this.lineChart = data
//		        this.tableData = this.pie.concat(this.histogram).concat(this.lineChart)
		        this.tableData = [...this.tableData,...this.lineChart]
//		        this.tableData= new Array.from(new Set(this.tD))
		        this.$emit('chartList', this.tableData)
		      })
//	    	}
    	
    	
      
    	console.log('chartList-Table',this.tableData)
    },
    methods: {
      // 预览
      check(scope) {
        this.chartVisible = true
      },
      // 删除
      del(scope) {
        this.tableData.splice(scope.$index, 1)
        this.$emit('chartList', this.tableData)
        console.log('删除后',this.tableData)
      },
    }
	}
</script>

<style scoped>

</style>

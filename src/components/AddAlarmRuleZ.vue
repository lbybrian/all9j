<template>
	<div>
		<el-form :model="ruleForm" ref="ruleForm" :rules="rules" :inline="true" label-width="100px" class="demo-ruleForm" size="small">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>告警规则</span>
				</div>
				<div v-for="(row, index) in ruleForm.rows">
					<el-form-item :prop="'rows.'+index+'.ruleName'" :rules="{ required: true, message: '请输入规则名称', trigger:['blur','change'] }">
						<el-input v-model="row.ruleName" placeholder="规则名称"></el-input>
					</el-form-item>

					<el-form-item :prop="'rows.'+index+'.arr'" :rules="{required: true, message: '所选内容为空', trigger:['blur','change'] }">
						<el-cascader style="min-width: 200px" v-model="row.arr" @change="selectInner(row, index)" :options="countArr" collapse-tags clearable placeholder="选择字段与关系"></el-cascader>
					</el-form-item>

					<el-form-item v-if="row.aggregationSign!=='1'" :prop="'rows.'+index+'.targetStrValue'" :rules="{required: true, message: '所填内容为空', trigger:['blur','change'] }">
						<el-input v-model="row.targetStrValue" placeholder="请输入值"></el-input>
					</el-form-item>
					<el-form-item v-if="(row.aggregationSign==='1')&&(row.arr[1]!=='bt')">
						<el-input-number v-model="row.targetNumValue" controls-position="right" :step="1" placeholder="请输入值"></el-input-number>
					</el-form-item>

					<span v-if="(row.aggregationSign==='1')&&(row.arr[1]==='bt')">
            <el-form-item>
              <el-input-number v-model="row.minValue" controls-position="right" :step="1" placeholder="最小值"></el-input-number>
            </el-form-item>

            <el-form-item>
              <el-input-number v-model="row.maxValue" controls-position="right" :step="1" placeholder="最大值"></el-input-number>
            </el-form-item>
          </span>

					<el-form-item style="width: 120px">
						<el-select v-model="row.alarmRank" placeholder="告警等级">
							<el-option v-for="item in dict['006']['dataValue']" clearable :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<i style="font-size: 32px;color:#C0C4CC;" v-if="index===0" @click="addRow(row)" class="el-icon-circle-plus-outline"></i>
						<i style="font-size: 32px;color:#C0C4CC;" v-if="index>0" @click="delRow(row)" class="el-icon-remove-outline"></i>
					</el-form-item>
				</div>
			</el-card>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "AddAlarmRuleZ",
		props: ['aardList','obj', 'obj2'], // 桶内行 桶外行
		data() {
			return {
				// 字典表
				dict: JSON.parse(localStorage.getItem('dict')),
				staticLen: JSON.parse(localStorage.getItem('dict'))['017']['dataValue'].length,
				objArr: [],
				obj2Arr: [],
				countArr: [],
				ruleForm: {
					rows: [],
				},
				rules:{}
			}
		},
		watch: {
			obj: {
				handler(newValue, oldValue) {
					this.obj=newValue
					console.log('1',this.obj)
				},
				deep: true,
        		immediate: true,
			},
			obj2: {
				handler(newValue, oldValue) {
					this.obj2=newValue
					console.log('2',this.obj2)
				},
				deep: true,
        		immediate: true,
			},
			countArr:{
				handler(newValue, oldValue) {
					console.log('数组',this.countArr)
					this.countArr=newValue
				},
				deep: true,
        		immediate: true,
			},
			ruleForm: {
				handler(newValue, oldValue) {
					this.$emit('alarmRule', newValue)
				},
        		immediate: true,
				deep: true
			},
		},
		created() {
			function deepClone(source){
//  		const obj = typeof source==='Array'?[]:{}
    		const obj =source.constructor===Array?[]:{}
    		for(let keys in source){
    			if(source.hasOwnProperty(keys)){
//  				if(source[keys]&&(typeof source[keys]==='Object'||typeof source[keys]==='Array')){
    				if(source[keys]&&(typeof source[keys]==='Object')){
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
			
this.aardList.map(item=>{
	if(item.status=='1'){
//		console.log('sdfssadgfdsgqqqqqqqqqqqqqqqqqqqq',item)
		this.ruleForm.rows.push(item)
//  	this.ruleForm.rows=deepClone(item)
	}
})

			
			console.log('poooooooo',this.aardList)
				console.log('1',this.obj,'2',this.obj2)
				if(this.obj.aggregationBOList[0].arr.length >0) { // 分桶有行信息数据
					this.objArr = this.obj.aggregationBOList.map(d => {
						d.label = d.aggName
						d.value = d.aggName
						d.children = this.dict['018']['dataValue']
						return d
					})
				}
				else{
				}
				if(this.obj2[0].arr.length >0) { // 桶外聚合行信息
					this.obj2Arr = this.obj2.map(d => {
						d.label = d.aggName
						d.value = d.aggName
						d.children = this.dict['018']['dataValue']
						return d
					})
				}else{
				}
				
				this.countArr = this.dict['014']['dataValue'].concat(this.objArr).concat(this.obj2Arr);
				
			
			//同外聚合
	  		for(let aggs of this.ruleForm.rows){
	  			aggs.arr=[]
	  			this.countArr.map(item=>{
		  			if(item.value===aggs.resultFiledName){
		  				aggs.arr.push(item.value)
		  				if(item.children&&item.children.length>0){
		  				for(let i of item.children){
		  					if(i.value===aggs.relationSign){
		  						aggs.arr.push(i.value)
		  					}
		  				}}
		  			}
	//	  			else if(item.fieldName===aggs.resultFiledName){
	//	  				aggs.arr.push(item.value)
	//	  				if(item.children&&item.children.length>0){
	//	  				for(let i of item.children){
	//	  					if(i.value===aggs.relationSign){
	//	  						aggs.arr.push(i.value)
	//	  					}
	//	  				}}
	//	  			}
	  				
	  			})
	  		}
	  		
			console.log('告警数据',this.ruleForm.rows,this.countArr)	
		},
		mounted(){
//			console.log('数组',this.countArr)	
			
		},
		methods: {
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
			addRow(row) {
				this.ruleForm.rows.push({
					ruleName: '',
					bucketName: '',
					resultFiledName: '',
					aggregationSign: '',
					relationSign: '',
					alarmRank: null,
					targetNumValue: 1,
					targetStrValue: '',
					maxValue: 1,
					minValue: 1,
					arr: [],
				})
			},
			delRow(row) {
				let index = this.ruleForm.rows.indexOf(row)
				if(index !== -1) {
					this.ruleForm.rows.splice(index, 1)
				}
			},
			// 规则下拉
			selectInner(row, index) {
				if(row.arr.length > 0) {
					this.ruleForm.rows[index].resultFiledName = row.arr[0]
					this.ruleForm.rows[index].relationSign = row.arr[1]
					this.ruleForm.rows[index].aggregationSign = '1'
						// 判断动态添加的 或dict字典中固定值
					this.dict['014']['dataValue'].forEach(d => {
						if(d.value === row.arr[0]) { // dict中有
							this.ruleForm.rows[index].aggregationSign = '0'
							return false
						}
					})
				} else {
					this.ruleForm.rows[index].resultFiledName = ''
					this.ruleForm.rows[index].relationSign = ''
					this.ruleForm.rows[index].aggregationSign = ''
					return false
				}
			},
		}
	}
</script>

<style scoped>
	.demo-ruleForm {
		margin-bottom: 20px;
	}
</style>
<template>
  <div class="histogram">
    <el-row>
      <el-col :span="8">样式选择</el-col>
      <el-col :span="12">图表属性</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-col :span="12">
            <div class="checkImg checked" @click="checkImg(21, 0)">
              <img src="../assets/image/u711.png" width="100">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="checkImg" @click="checkImg(22, 1)">
              <img src="../assets/image/u712.png" width="100">
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
          <el-form-item label="图表名称"  style="width: 315px;">
          <!--<el-form-item label="图表名称" prop="chartName" style="width: 315px;">-->
            <el-input v-model="ruleForm.chartName" placeholder="请输入图表名称"></el-input>
          </el-form-item>
          <!--<el-form-item label="X轴值" prop="axisX">-->
          <el-form-item label="X轴值" >
            <span>{{obj.bucketName}}</span>
          </el-form-item>
          <el-form-item label="数据值" >
          <!--<el-form-item label="数据值" prop="axisYArr">-->
            <el-select v-model="ruleForm.axisYArr" multiple placeholder="请选择数据值">
              <el-option v-for="item in obj.aggregationBOList" :key="item.aggName" :label="item.aggName" :value="item.aggName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="center">
            <el-button @click="resetForm('ruleForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">配 置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "HistogramZ",
    props: ['obj'],
    data() {
      return {
        ruleForm: {
          chartTemplateId: 21,
          charType: 2,
          chartName: '',
          axisX: this.obj.bucketName,
          axisYArr: []
        },
        rules: {
          chartName: [
            { required: true, message: '请输入图表名称', trigger: 'blur' },
          ],
          axisYArr: [
            { required: true, message: '请选择数据值', trigger: 'change' },
          ],
        },
        // 保存图表到已ChartList组件
        chartListData: []
      }
    },
    watch: {
      obj: {
        handler(newValue, oldValue) {
//      	console.log('柱状图',this.obj)
          this.ruleForm.axisX =  newValue.bucketName
        },
        deep: true
      }
    },
//  created() {
//      	console.log('桶图',this.obj)
////      	
////      	console.log('饼状图111111111',this.obj)
////      	this.ruleForm.axisYArr=this.obj.aggregationBOList
////      	if(this.obj&&this.obj.aggregationBOList.length>0){
////      		for(let item of this.obj.aggregationBOList){
////      			this.ruleForm.axisYArr.push(item)
////      		}
////      	}
////					for(let tada in this.ruleForm){
////		  			this.ruleForm[tada].axisYArr=[]
//		  			this.obj.aggregationBOList.map(item=>{
//		  				this.ruleForm.axisX=item.xaxis
//		  				this.ruleForm.charType=item.chartType
//		  				this.ruleForm.chartName=item.chartName
//		  				this.ruleForm.chartTemplateId=item.chartTemplateId
//		  				this.ruleForm.yAxis=item.yaxisArr
//		  				if(typeof item.yaxisArr!=='String'){
//			  				this.ruleForm.axisYArr.push(item.yaxisArr)
//			  			}
//		  			})
////		  		}
//
//      	console.log('桶图2222222222',this.ruleForm,this.obj)
//  
//
//  },
    methods: {
      // 保存配置图表
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 添加数据到已配置图表chartList组件
            let json = {}
            for(let key in this.ruleForm) {
              json[key] = this.ruleForm[key]
            }
            this.chartListData.push(json)
        	console.log('桶图axisYArr',this.ruleForm.axisYArr)
            this.$Bus.$emit('histogram', this.chartListData)
            this.ruleForm = {
              chartTemplateId: 21,
              charType: 2,
              chartName: '',
              axisX: this.obj.bucketName,
              axisYArr: []
            }
          } else {
            return false
          }
        })
      },
      // 重置输入域
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 选择饼图类型
      checkImg(type, index) {
        $('.checkImg').removeClass('checked')
        $('.checkImg').eq(index).addClass('checked')
        this.ruleForm.chartTemplateId = type
      },
    }
	}
</script>

<style scoped>
  .margin20{
    margin-top: 20px;
  }
  .checkImg{
    width: 104px;
    cursor: pointer;
  }
  .checked{
    border: 2px solid #0fcc1b;
  }
</style>

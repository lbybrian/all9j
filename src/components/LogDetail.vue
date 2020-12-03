<template>
  <div class="logdetail">
    <el-row v-if="detail.result!=='fail'">
      <el-col :offset="6" :span="12" class="center">
        <el-form>
          <el-form-item label="日志ID：">
            {{currentData.id}}
          </el-form-item>
          
          <el-form-item label="日志内容：" v-if="typeof(currentData.logCont)==='string'">
          <!--<el-form-item label="日志内容：" v-html="'currentData'+'.logCont'">-->
            <!--{{JSON.stringify(JSON.parse(this.detail.currentData.logCont),null,'`\n`')}}-->
            <!--{{currentData.logCont?currentData.logCont:'无'}}-->
            {{currentData.logCont}}
            <!--<el-row v-for="item in JSON.parse(currentData.logCont)">-->
            	<!--{{item}}-->
            <!--</el-row>-->
          </el-form-item>
          <el-form-item label="日志内容：" v-if="typeof(currentData.logCont)==='object'">
          <!--<el-form-item label="日志内容：" v-html="'currentData'+'.logCont'">-->
            {{JSON.stringify(JSON.parse(this.detail.currentData.logCont),null,'`\n`')}}
            <!--{{currentData.logCont?currentData.logCont:'无'}}-->
            <!--{{currentData.logCont}}-->
            <!--<el-row v-for="item in JSON.parse(currentData.logCont)">-->
            	<!--{{item}}-->
            <!--</el-row>-->
          </el-form-item>
          <el-form-item label="软件名称：">
            {{softName[currentData.softwareSign]}}
          </el-form-item>
          <el-form-item label="日志类型：">
            {{logType[currentData.logType]}}
          </el-form-item>
          <el-form-item label="模块名称：">
            {{blockName[currentData.moduleSign]}}
          </el-form-item>
          <el-form-item label="操作描述：">
            {{currentData.operationDesc}}
          </el-form-item>
          <el-form-item label="操作时间：">
            {{currentData.operationTime}}
          </el-form-item>
          <el-form-item label="操作类型：">
            {{operationType[currentData.operationType]}}
          </el-form-item>
          <el-form-item label="操作用户：">
            {{currentData.operationUserId}}
          </el-form-item>
          <el-form-item label="系统名称：">
            {{systemSign[currentData.systemSign]}}
          </el-form-item>
          <el-form-item label="请求IP：" v-if="currentData.requestIp">
            {{currentData.requestIp}}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row v-if="detail.result==='fail'">
      <el-col :span="12">
        <p>当前日志</p><br />
        <el-form>
          <el-form-item label="日志ID：">
            {{currentData.id}}
          </el-form-item>
          
          <el-form-item label="日志内容：">
            {{currentData.logCont}}
          </el-form-item>
          <el-form-item label="软件名称：">
            {{softName[currentData.softwareSign]}}
          </el-form-item>
          <el-form-item label="日志类型：">
            {{logType[currentData.logType]}}
          </el-form-item>
          <el-form-item label="模块名称："class="lang">
            {{blockName[currentData.moduleSign]}}
          </el-form-item>
          <el-form-item label="操作描述：">
            {{currentData.operationDesc}}
          </el-form-item>
          <el-form-item label="操作时间：">
            {{currentData.operationTime}}
          </el-form-item>
          <el-form-item label="操作类型：">
            {{operationType[currentData.operationType]}}
          </el-form-item>
          <el-form-item label="操作用户：">
            {{currentData.operationUserId}}
          </el-form-item>
          <el-form-item label="系统标识：">
            {{systemSign[currentData.systemSign]}}
          </el-form-item>
          <el-form-item label="请求IP：" v-if="currentData.requestIp">
            {{currentData.requestIp}}
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12">
        <p>链上日志</p><br />
        <el-form>
          <el-form-item label="日志ID：">
            {{bcData.id}}
          </el-form-item>
          
          <el-form-item label="日志内容：">
            {{bcData.logCont}}
          </el-form-item>
          <el-form-item label="软件名称：">
            {{softName[bcData.softwareSign]}}
          </el-form-item>
          <el-form-item label="日志类型：">
            {{logType[bcData.logType]}}
          </el-form-item>
          <el-form-item label="模块名称：">
            {{blockName[bcData.moduleSign]}}
          </el-form-item>
          <el-form-item label="操作描述：">
            {{bcData.operationDesc}}
          </el-form-item>
          <el-form-item label="操作时间：">
            {{bcData.operationTime}}
          </el-form-item>
          <el-form-item label="操作类型：">
            {{operationType[bcData.operationType]}}
          </el-form-item>
          <el-form-item label="操作用户：">
            {{bcData.operationUserId}}
          </el-form-item>
          <el-form-item label="系统标识：">
            {{systemSign[bcData.systemSign]}}
          </el-form-item>
          <el-form-item label="请求IP：" v-if="currentData.requestIp">
            {{currentData.requestIp}}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "LogDetail",
    props: ['detail'],
    data() {
		  return {
		  	logCont:{},
        dict: JSON.parse(localStorage.getItem('dict')),
        softName: JSON.parse(localStorage.getItem('softName')),
        blockName: JSON.parse(localStorage.getItem('blockName')),
        logType: JSON.parse(localStorage.getItem('logType')),
        operationType: JSON.parse(localStorage.getItem('operationType')),
        systemSign: JSON.parse(localStorage.getItem('systemSign')),
        currentData: '',
        bcData: this.detail.bcData ? this.detail.bcData : {}
      }
    },
    created() {
    	console.log('审计详情detail',this.detail)
    	this.currentData=this.detail.currentData;
//this.logCont=JSON.stringify(JSON.parse(this.detail.currentData.logCont),null,'/\n|\r\n/g')
			
    },
    watch: {
      detail: {
        handler(newValue, oldValue) {
        	this.currentData=this.detail.currentData;
        },
        deep: true
      }
    },
    methods: {
    }
	}
</script>
<style>
	/*element.style {
		z-index: 0!important;
	}*/
	 .lang{
  }

</style>
<style scoped>
  .center{
    text-align: center;
  }
  .logdetail{
  	z-index: 9999!important;
  }
 
</style>

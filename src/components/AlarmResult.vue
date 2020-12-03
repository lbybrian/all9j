<template>
  <div class="alarmResult">
    <el-page-header @back="goBack" content="告警结果"></el-page-header>
    <alarm-list :obj="params" v-if="params.ruleId!==''"></alarm-list>
  </div>
</template>

<script>
	import AlarmList from "@/components/AlarmList";
  export default {
		name: "AlarmResult",
		props:['backSign'],
    components: {AlarmList},
    data() {
		  return {
		  	Back:false,
        params: {
		      ruleId: ''
        },
      }
    },
    created() {
//  	console.log(1111111111111111,this.$route.query.id)
      this.params.ruleId = this.$route.query.id;
//    this.params.status = this.$route.query.status;
    },
    mounted() {
      if(this.backSign){
	      this.Back=this.backSign;
      }
    },
    methods: {
      goBack() {
//    	if(this.Back){
//	        this.$router.push({
//	          path: '/ruleModelList'
//	        })
//    	}else{
//	        this.$router.push({
//	          path: '/rule'
//	        })
//    	}

        this.$router.go(-1)
      
      },
    }
	}
</script>

<style scoped>
  .alarmResult{
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }
  .alarmResult::-webkit-scrollbar {display: none;}
  .alarmResult { -ms-overflow-style: none; }
  .alarmResult { overflow: -moz-scrollbars-none; }
  .center{
    text-align: center;
  }
</style>

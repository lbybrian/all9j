<template>
  <div class="auditResult">
    <el-page-header @back="goBack" content="审计结果" class="header"></el-page-header>
    <audit-list-execu class="childA" :objexe="params.id" v-if="cycleSign==='2'" ></audit-list-execu>
    <audit-list-cycle class="childA" :objres="params" v-if="cycleSign==='1'"></audit-list-cycle>
    <!--<instant-audit class="childA" :objId="params.id" v-if="cycleSign==='1'"></instant-audit>-->
  </div>
</template>

<script>
//	import InstantAudit from "@/components/InstantAudit";
  import AuditListExecu from "@/components/AuditListExecu";
import AuditListCycle from "@/components/AuditListCycle";
  export default {
		name: "AuditResult",
    components: {AuditListCycle, AuditListExecu,},
    data() {
      return {
        cycleSign: '',
        params: {
          id: '',
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    created() {
    	console.log('结果页',this.$route.query)
      this.cycleSign = this.$route.query.cycleSign
      this.params.id = this.$route.query.id
    },
    mounted() {},
    methods: {
      goBack() {
//      this.$router.push({
//        path: '/rule'
//      })

        this.$router.go(-1)
      
      },
    }
	}
</script>

<style scoped>
.header{
	margin-bottom: 30px;
}
  .auditResult{
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }
  .auditResult::-webkit-scrollbar {display: none;}
  .auditResult { -ms-overflow-style: none; }
  .auditResult { overflow: -moz-scrollbars-none; }
  .childA{
    overflow-x: hidden;
  }
  .childA::-webkit-scrollbar {display: none;}
  .childA { -ms-overflow-style: none; }
  .childA { overflow: -moz-scrollbars-none; }
  .center{
    text-align: center;
  }
</style>

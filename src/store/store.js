import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 字典表
    dict: {},
    // 日志相关
    log: {},
    // 告警相关
    alarm: {},
    // 规则相关
    rule: {},
    // 审计相关
    audit: {},
    logCont:{},
    modelLists:{},
    ruleForm:{},
    formDatas:{
	          // 时间范围下拉
	          timeRangeSign:'测试vuex',
	          // 自定义时间范围
	          showTime: ['2019-10-14 01:22:30','2018-11-24 02:21:41'],
	          startTime: '',
	          endTime: '',
	          // 逻辑与
	          queryANDList: [{
	            fieldName: '',
	            relationSign: '',
	            targetValue: '',
	            and: []
	          }],
	          // 逻辑或
	          queryORList: [{
	            fieldName: '',
	            relationSign: '',
	            targetValue: '',
	            or: []
	          }],
	          // 分桶
	          bucketBO: {
	            fieldName: 'hh',
	            bucketName: 'agadsf',
	            typ: 'df',
	            type: 'gdfg',
	            dateType: '',
	            aggregationBOList: [{
	              fieldName: 'gfdg',
	              aggName: 'fdg',
	              aggSign: 'gdfgd',
	              aggAlias:"数量",
	              arr: [],
	            }]
	          },
	          // 桶外聚合
	          aggOutList: [{
	            fieldName: '',
	            aggName: '',
	            aggSign: '',
	            arr: [],
	          }],
          },
    formDatas2:{
					rows: [{
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
					}],
				},//缓存告警规则第二页
    countArr:{},
//  objx:{}
jk3:{
    "code": 200,
    "message": "操作成功",
    "data": {
        "id": 49,
        "name": "用户登录异常告警规则配置",
        "type": "2",
        "cycleSign": "1",
        "ruleDesc": "用户登录异常告警规则配置",
        "queryRuleJson": {
            "queryANDList": [
                {
                    "fieldName": "systemSign",
                    "relationSign": "eq",
                    "targetValue": 1,
                    "maxValue": null,
                    "minValue": null
                },
                {
                    "fieldName": "operationType",
                    "relationSign": "eq",
                    "targetValue": 4,
                    "maxValue": null,
                    "minValue": null
                },
                {
                    "fieldName": "logType",
                    "relationSign": "eq",
                    "targetValue": 2,
                    "maxValue": null,
                    "minValue": null
                }
            ],
            "queryORList": null,
            "aggOutList": [
                {
                    "fieldName": "_id",
                    "aggName": "user_sum",
                    "aggSign": "count"
                }
            ],
//          "timeRangeSign": "oneYear",
            "timeRangeSign": "oneDay",
            "bucketBO": {
                "fieldName": "operationUserId",
                "bucketName": "user_id_bucket",
                "type": "normal",
                "dateType": null,
                "format": null,
                "aggregationBOList": [
                    {
                        "fieldName": "_id",
                        "aggName": "bucketnei_id_count",
                        "aggSign": "count"
                    }
                ],
                "bucketBO": null
            },
            "resultList": null,
            "sort": null,
            "direction": null,
            "page": null,
            "size": null,
            "sizeLimit": null
        },
        "aardList": [
            {
                "id": 13,
                "analyzeRuleId": 49,
                "ruleName": "十分钟登录次数超过5次",
                "ruleDesc": null,
                "bucketName": "user_id_bucket",
                "resultFiledName": "bucketnei_id_count",
                "aggregationSign": "1",
                "relationSign": "gt",
                "alarmRank": 1,
                "targetStrValue": null,
                "targetNumValue": 5,
                "maxValue": null,
                "minValue": null,
                "status": "1"
            },
            {
                "id": 14,
                "analyzeRuleId": 49,
                "ruleName": "十分钟登录次数超过10次",
                "ruleDesc": null,
                "bucketName": "user_id_bucket",
                "resultFiledName": "bucketnei_id_count",
                "aggregationSign": "1",
                "relationSign": "gt",
                "alarmRank": 2,
                "targetStrValue": null,
                "targetNumValue": 10,
                "maxValue": null,
                "minValue": null,
                "status": "1"
            },
            {
                "id": 15,
                "analyzeRuleId": 49,
                "ruleName": "十分钟登录次数超过20次",
                "ruleDesc": null,
                "bucketName": "user_id_bucket",
                "resultFiledName": "bucketnei_id_count",
                "aggregationSign": "1",
                "relationSign": "gt",
                "alarmRank": 3,
                "targetStrValue": null,
                "targetNumValue": 20,
                "maxValue": null,
                "minValue": null,
                "status": "1"
            }
        ],
        "cycleStatTastDetailDTO": {
            "id": 38,
            "cycleUnit": "hour",
            "cycleNum": 2,
            "numLimit": 0,
            "executeNum": 55,
            "versionNum": 88,
            "executeTime": "2020-09-02 18:57:59",
            "startTime": "2020-08-27 01:00:00",
            "endTime": "2021-08-27 02:00:00",
            "createTime": "2020-08-27 17:27:58",
            "status": "1"
        },
        "arctList": [],
        "status": "1"
    }
},

  },
  mutations: {
    setDict(state,dict){
      state.dict = dict
    }
  },
  actions: {
  },
  getters: {
    getDict: state => state.dict
  },
  modules: {
  },
  
})

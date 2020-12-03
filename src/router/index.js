// 路由配置

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/main/index' // 首页
import Login from '@/main/Login' // 登录
import Audit from '@/components/Audit' // 审计
import Log from '@/components/Log' // 日志
import Rule from '@/components/Rule' // 规则
import Alarm from '@/components/Alarm' // 告警
import AlarmResult from '@/components/AlarmResult' // 告警结果
import AuditResult from '@/components/AuditResult' // 审计结果
import AuditListCycle from "@/components/AuditListCycle";
import AuditListExecu from "@/components/AuditListExecu";
import RuleModelList from "@/components/RuleModelList";
Vue.use(Router)

export default new Router({
  routes: [
//  {
//    path: '/',
//    name: 'Login',
//    component: Login // 登录
//  },
    { // 审计模块
      path: '/',
      name: 'Index',
      component: Index,
      redirect:'/log',
      children: [
        {
          path: '/audit',
          name: 'audit',
          component: Audit, // 审计分析,
//    		redirect:'/audit/AuditListExecu',
//        children:[
//        	{
//        		path: '/auditListCycle',
//		          name: 'AuditListCycle',
//		          component: AuditListCycle // 周期审计,
//        	},
//        	{
//        		path: 'auditListExecu',
//		          name: 'AuditListExecu',
//		          component: AuditListExecu // 即时审计,
//        	}
//        ]
        },
//      {
//        		path: 'alarmList',
//		          name: 'AlarmList',
//		          component: ()=> import ('@/components/AlarmList'), // 未处理列表
//      },
        {
          path: '/log',
          name: 'Log',
          component: Log // 日志管理
        },
        {
          path: '/rule',
          name: 'Rule',
          component: Rule // 规则管理
        },
        {
          path: '/alarm',
          name: 'Alarm',
          component: Alarm, // 告警管理
//        children:[]
        },
        {
          path: '/auditResult',
          name: 'AuditResult',
          component: AuditResult // 审计结果
        },
        {
          path: '/alarmResult',
          name: 'AlarmResult',
          component: AlarmResult // 告警结果
        },
        {
          path: '/alarmxx',
          name: 'AlarmXX',
          component:()=> import ('@/components/AlarmXX'), // 未处理列表
        },
        {
          path: '/ruleModelList',
          name: 'RuleModelList',
          component: RuleModelList // 模板
        },
      ]
    }
  ]
})

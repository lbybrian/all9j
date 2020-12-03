const config = {
  fileCaptrue: {
    url: "/418-URL-prefix/cm/mbgl_info/read",
    method: "get"
  },
  extractItem: {
    url: "/418-URL-prefix/cm/entity_info/list",
    method: "post"
  },
  abstractContent: {
    url: "ABSTRACT-URL-prffix/",
    method: "post"
  },
  previewPdf: {
    url: "418-URL-prefix/cm/read/"
  },
  saveAbstract: {
    url: "ES-URL-prefix/mbgf_418/sc_info/saveOrUpdate",
    method: "post"
  },
  produceReport: {
    url: "418-URL-prefix/mbgf_418/tscp_info/saveOrUpdate/report",
    method: "post"
  },
  catalogData: {
    url: "/418-URL-prefix/groupTree",
    method: "get"
  },
  addFolderItem: {
    url: "/CM-URL-prefix/db_418/group_info/",
    method: "put"
  },
  deleteFolderItem: {
    url: "/CM-URL-prefix/db_418/group_info/",
    method: "delete"
  },
  queryMaterialTable: {
    url: "/418-URL-prefix/mbgf_418/sc_info/page/group",
    method: "get"
  },
  deleteMultiMaterial: {
    url: "/CM-URL-prefix/db_418/sc_group_info/_delete",
    method: "post"
  },
  queryDictData: {
    url: "/418-URL-prefix/cm/dict",
    method: "get"
  },
  addTranslateTask: {
    url: "/418-URL-prefix/sc_dy_info/_batch",
    method: "post"
  },
  pressRecordTable: {
    url: "/ES-URL-prefix/mbgf_418/tscp_info/page",
    method: "get"
  },
  downloadPressRecord: {
    url: "/418-URL-prefix/cm/log_file/download",
    method: "get"
  },
  downloadMultiRecord: {
    url: "/418-URL-prefix/cm/log_file/_batch",
    method: "get"
  },
  mouldDataTable: {
    url: "/CM-URL-prefix/db_418/mbgl_info",
    method: "get"
  },
  downloadMould: {
    url: "/418-URL-prefix/cm/mbgl_info/download",
    method: "get"
  },
  downloadMultiMould: {
    url: "/418-URL-prefix/cm/mbgl_info/_batch",
    method: "get"
  },
  deleteMould: {
    url: "/418-URL-prefix/cm/mbgl_info/download",
    method: "delete"
  },
  deleteMultiMould: {
    url: "/CM-URL-prefix/db_418/mbgl_info/_delete",
    method: "post"
  },
  deleteMultiProduct: {
    url: "/ES-URL-prefix/mbgf_418/tscp_info",
    method: "delete"
  },
  productDataTable: {
    url: "/418-URL-prefix/mbgf_418/tscp_info/page/tscp",
    method: "get"
  },
  downloadProduct: {
    url: "/418-URL-prefix/cm/sc_dy_info/download",
    method: "get"
  },
  downloadMultiProduct: {
    url: "/418-URL-prefix/cm/log_file/_batch",
    method: "get"
  },
  deleteProduct: {
    url: "/ES-URL-prefix/mbgf_418/tscp_info",
    method: "delete"
  },
  deleteMultiProduct: {
    url: "/ES-URL-prefix/mbgf_418/tscp_info/",
    method: "delete"
  },
  submitCheckRequest: {
    url: "/418-URL-prefix/mbgf_418/tscp_info/saveOrUpdate/sb",
    method: "post"
  },
  submitComment: {
    url: "/418-URL-prefix/mbgf_418/tscp_info/saveOrUpdate/sh",
    method: "post"
  },
  translateMaterialTable : {
    url: "/418-URL-prefix/mbgf_418/sc_info/page/trans",
    method: "get"
  },
  deleteTranslateMaterial : {
    url: "/CM-URL-prefix/db_418/sc_dy_info/",
    method: "delete"
  },
  deleteMultiTranslate : {
    url: "/CM-URL-prefix/db_418/sc_dy_info/_delete",
    method: "post"
  },
  userInfoTable: {
    url: "/418-URL-prefix/cm/getUsersXt",
    method: "get"
  },
  cooperatorRequest: {
    url: "/418-URL-prefix/mbgf_418/translate_task_info/saveOrUpdate/task",
    method: "post"
  },
  translateTaskTable: {
    url: "/418-URL-prefix/mbgf_418/translate_task_info/page/task",
    method: "get"
  },
  translateTaskInfo: {
    url: "/418-URL-prefix/mbgf_418/translate_task_info/",
    method: "get"
  },
  translateDetailInfo: {
    url: "/418-URL-prefix/mbgf_418/sc_info/",
    method: "get"
  },
  saveTranslateDetail: {
    url: "/ES-URL-prefix/mbgf_418/translate_result_info/saveOrUpdate",
    method: "post"
  },
  submitCheckTranslate: {
    url: "/418-URL-prefix/mbgf_418/translate_task_info/saveOrUpdate/toSh",
    method: "post"
  },
  submitCommentTranslate: {
    url: "/418-URL-prefix/mbgf_418/translate_task_info/saveOrUpdate/sh",
    method: "post"
  },
  addForEditing: {
    url: "/418-URL-prefix/sc_group_info/_batch",
    method: "post"
  },
  translateContent: {
    url: "/TRANSLATE-URL-prefix/",
    method: "post"
  }
}

export default config

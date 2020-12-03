// import {openLoadingCommon,closeLoadingCommon,notice,alert_util,alertNotice,openView,dataToForm,cleanForm} from './common'

import Vue from "vue";

/**
 * 公共方法
 * @constructor
 */
var Utils;
Utils = {
  utilSubString: function (val, length) {
    if (val.length <= length) {
      return val
    } else if (val.length > length) {
      return val.substring(0, length) + "……";
    }
  },
  getServerDate: function () {
    return new Date($.ajax({
      async: false
    }).getResponseHeader("Date"));
  },
  // 获取两个时间之差（毫秒）
  getInervalMilliseconds() {
    let in_time = new Date(localStorage.getItem("in_time"));
    let current_time = this.getServerDate();
    let val = current_time - in_time;
    if (val < 0) {
      return 0;
    } else {
      return val;
    }
  },
  /**
   * 拖拽初始化
   */
  dragInit() {
    let host_proxy = this;
    var dragged;
    /* 可拖动的目标元素会触发事件 */

    document.addEventListener("drag", function (event) {}, false);
    document.addEventListener("dragstart", function (event) {
      // 保存拖动元素的引用(ref.)
      dragged = event.target;
      // 使其半透明
      event.target.style.opacity = .5;
    }, false);
    document.addEventListener("dragend", function (event) {
      // 重置透明度
      event.target.style.opacity = "";
    }, false);
    /* 放下目标节点时触发事件 */
    document.addEventListener("dragover", function (event) {
      // 阻止默认动作
      event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function (event) {
      // 当可拖动的元素进入可放置的目标高亮目标节点
      if (event.target.className == "dropzone") {
        event.target.style.background = "#F2F6FC";
      }

    }, false);
    document.addEventListener("dragleave", function (event) {
      // 当拖动元素离开可放置目标节点，重置其背景
      if (event.target.className == "dropzone") {
        event.target.style.background = "";
      }

    }, false);
    document.addEventListener("drop", function (event) {
      // 阻止默认动作（如打开一些元素的链接）
      event.preventDefault();
      // 移动拖动的元素到所选择的放置目标节点’
      if (event.target.className == "dropzone") {
        let name = $(event.target).attr("name");
        if (name != 'home') {
          // 判断是否已经有拖拽
          let html = $(event.target).html();
          if (html == null || html == "") {
            event.target.style.background = "";
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
          } else {
            alert("提示：只能添加一个标签")
            //alert_util(host_proxy,'提示：已存在，无须再添加','warning')
          }
        } else {
          event.target.style.background = "";
          dragged.parentNode.removeChild(dragged);
          event.target.appendChild(dragged);
        }

      }
    }, false);
  },
  /**
   * 将map1 转到 mao2 中
   * @param map1
   * @param map2
   */
  mapToMap: function (map1, map2) {
    $.each(map2, function (key, value) {
      map2[key] = map1[key];
    })
  },
  /**
   * 清空map
   * @param map
   */
  cleanMap(map) {
    $.each(map, function (key, value) {
      if (key == 'is_enable') {
        map[key] = true;
      } else {
        map[key] = "";
      }

    })
  },
  /**
   * 清空map
   * @param map
   */
  cleaarMap(map) {
    $.each(map, function (key, value) {
      map[key] = "";
    })
  },
  /**
   * 获取复选框中的id
   * @param list
   * @returns {Array}
   */
  getIds(list) {
    let ids = [];
    $(list).each(function (i, item) {
      if ($.inArray(item._id, list) == '-1') {
        ids.push(item._id)
      }
    })
    return ids;
  },
  /**
   *
   * @param num
   * @param str
   */
  isNoStr(num) {
    let str = "";
    if (num == "0") {
      str = "否"
    } else if (num == "1") {
      str = "是"
    }
    return str;
  },
  /**
   * 转化sex
   * @param str
   */
  changeSex(str) {
    if (str == '0') {
      return "男";
    } else {
      return "女";
    }
  },
  auditFormat(row) {
    if (row.is_audit == 0) {
      return '待审核'
    } else if (row.is_audit == 1) {
      return '通过'
    } else if (row.is_audit == 2) {
      return '退回'
    } else if (row.is_audit == 3) {
      return '已保存'
    } else {
      return '已保存'
    }
  },
  auditFormatOrderby(str) {
    let map = {};
    if (str == 0) {
      map.order_by = "2";
      map.status = '待审核';
    } else if (str == 1) {
      map.order_by = "3";
      map.status = '通过';
    } else if (str == 2) {
      map.order_by = "4";
      map.status = '退回';
    } else if (str == 3) {
      map.order_by = "1";
      map.status = '已保存';
    } else {
      map.order_by = "5";
      map.status = '其他';
    }
    return map;
  },
  //加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : k;
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);

    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);


  },
  //解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : k;
    var key = CryptoJS.enc.Utf8.parse(keyStr);

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);

    var decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });

    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();

  },
  /* 数组对象排序,array-数组对象，key-排序字段,status=0-升序，status=1-降序 */
  sortByKey(array, key, status) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      if (status === 0) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    })
  },
  loginType(row) {
    if (row.login_type == "1") {
      return '登录'
    } else if (row.login_type == "2") {
      return '异常'
    } else if (row.login_type == "3") {
      return '登出'
    } else {
      return '流程错误'
    }
  },

  replace_all(html_str, name) {
    let replace_str = "<span style='color: red'>" + name + "</span>"
    let re = new RegExp(name, "g"); //定义正则表达式
    //第一个参数是要替换掉的内容，第二个参数"g"表示替换全部（global）。
    var Newstr = html_str.replace(re, replace_str); //第一个参数是正则表达式。//本例会将全部匹配项替换为第二个参数。
    return Newstr;
  },
  /**
   * 将list1 转到 list2中
   * @param list1
   * @param list2
   */
  listToList: function (list1, list2) {
    $.each(list2, function (index, item) {
      $.each(list1, function (id, iten) {
        if (item._id == iten._id) {
          $.each(item, function (key, value) {
            item[key] = iten[key];
          })
        }
      })
    })
    return list2;
  },
  addCoreUrl() {
    return "/kb-core/"
  },
  addApiUrl() {
    return '/api'
  },
  getPicUrl() {
    return "http://10.170.130.230:9002/core/static"
  },
  getUserInfo() {
    let user = localStorage.getItem("user")
    user = JSON.parse(user);
    return user.id

  },
  addLoginUrl() {
    return "/login/"
  },
  /**
   * 将list转成map
   * @param list 集合
   * @param key map 的key
   * @param value map 的value
   */
  listToMap(list, key, value) {
    let map = {}
    if (list != null) {
      list.forEach(function (item, index) {
        map[item[key]] = item[value]
      })
    }
    return map
  },
  /**
   * 给多个查询条件的选项标签添加对应值映射和key。
   * @param arr 查询条件数组
   * @param dictMap 数据字典Map
   */
  initConditionData(arr, dictMap) {
    for (let i = 0; i < arr.length; i++) {
      var key = arr[i].dict || arr[i].key;
      if (key && dictMap[key]) {
        this.attachDataMap(arr[i], dictMap[key]);
      }
    }
  },
  /**
   * 获取字典表Map。
   * @param callback 字典获取之后回调执行函数
   * 
   */
  getDictDataMap(callback) {
    adapter.queryDictData({}, function (d) {
      var tData = d.data || {};
      var mData = tData.data || {};
      var map = {};
      for (var k in mData) {
        map[k] = map[k] || {};
        for (var i = 0; i < mData[k].length; i++) {
          var v = mData[k][i].value;
          map[k][v] = mData[k][i].name;
        }
      }
      if (typeof (callback) === "function") {
        callback(map);
      }
      console.log(tData);
    });
  },
  /**
   * 给单个查询条件的选项标签添加对应值映射和key。
   * @param obj 查询条件对象
   * @param dict 数据字典
   */
  attachDataMap(obj, dict) {
    console.log(dict)
    var t = dict.length && obj.dataMap;
    if (t) {
      obj.items = [];
      for (let i = 0; i < dict.length; i++) {
        let item = dict[i]
        let name = item.name;
        if (name) {
          obj.items.push(name);
          obj.dataMap[name] = item.value;
        }
      }
    }
  },
  /**
   * 获取当前用户输入的查询条件参数。
   * @param arr 查询条件数组
   */
  getConditionParam(arr) {
    let param = {};
    for (let i = 0; i < arr.length; i++) {
      let key = arr[i].key;
      var map = arr[i].dataMap || {};
      if (key && !arr[i].flag) {
        let value = arr[i].value;
        if (value.constructor.name === "Array") {
          var tArr = [];
          for (let j = 0; j < value.length; j++) {
            tArr.push(map[value[j]] || value[j]);
          }
          param[key] = tArr;
        } else {
          param[key] = map[value] || value;
        }
      }
    }
    var ret = this.transferConditionData(param);
    for (var t in ret) {
      if (ret[t] && typeof (ret[t]) === "object") {
        ret[t] = JSON.stringify(ret[t]);
      }
    }
    return ret
  },
  transferConditionData(param) {
    var dsl = {};
    for (let k in param) {
      var t = this.produceDSL(k, param[k]);
      var type = t.type;
      var data = t.data;
      dsl[type] = dsl[type] || {};
      if (type === "exact_search" && data.value !== "" && data.value !== undefined) {
        dsl[type][data.key] = data.value;
      } else if (type === "in_search" && data.value.constructor.name === "Array" && data.value.length !== 0) {
        dsl[type][data.key] = data.value;
      } else if (type === "rang_search" && data.value.start && data.value.end) {
        dsl[type][data.key] = data.value;
      } else {

      }

    }
    return dsl;
  },
  produceDSL(key, value) {
    var ret = {
      type: "exact_search",
      data: {
        key: key,
        value: value
      }
    }
    if (key === "publish_time") {
      ret.type = "rang_search";
      if (value.constructor.name === "Array") {
        ret.data = {
          key: "publish_time",
          value: {
            start: value[0],
            end: value[1]
          }
        }
      } else {
        ret.data = {
          key: "publish_time",
          value: ""
        }
      }

    } else if (value.constructor.name === "Array") {
      ret.type = "in_search";
    } else {}
    return ret;
  },
  downloadItem(fileName, content) {
    const blob = new Blob([content]);
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  },
  checkConditions(dsl, tDSL) {
    var ret = false;
    if (!tDSL) {
      return true;
    }
    for (var k in dsl) {
      if (dsl[k] === "{}" || (dsl[k] && Object.keys(dsl[k]).length === 0)) {
        delete dsl[k];
      }
    }
    for (var k in tDSL) {
      if (
        dsl[k] === "{}" ||
        (tDSL[k] && Object.keys(tDSL[k]).length === 0)
      ) {
        delete tDSL[k];
      }
    }

    for (var k in dsl) {
      var v = dsl[k];
      if (typeof v === "object") {
        ret = !(JSON.stringify(v) === JSON.stringify(tDSL[k]));
      } else {
        ret = !(v === tDSL[k]);
      }
      if (ret) {
        break;
      }
    }
    return ret;
  }

  /* function getInervalHour(startDate, endDate) {
   var ms = endDate.getTime() - startDate.getTime();
   if (ms < 0) return 0;
   return Math.floor(ms/1000/60/60);
 }

   console.log("登录时间："+localStorage.getItem("in_time"))*/

};

export default Utils

/**
 * 将查询的到的数据转成form
 * @param map
 * @param data
 * @returns {*}
 */
export function dataToForm(map,data){

  $.each(data,function(key,value){
    $.each(map,function(key1,value1){
      if(key == key1){
        if(key == "labels"){
          data[key] = value1.join(";");
        }else{
          data[key] = value1;
        }

      }
    })
  })
  return data;
}

/**
 * 清空form表单
 * @param map  form表单数据
 */
export function cleanForm(map){
  $.each(map,function(key,value){
    map[key] = "";
  })
}





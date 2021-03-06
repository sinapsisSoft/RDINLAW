var jsonObj1 = "";
var arrayCell = new Array("Ciudad", "Origen", "Despacho", "Radicado", "Consecutivo", "Apoderado", "Demandante", "Demandado", "Estado", "Detalle", "Actuaciones");
var arrayCell1 = new Array("Fecha de informe", "Actuación", "Inicio término", "Fin término", "Ubicación", "Anexo");

function setGeneralInformation(){
  let obj=new StoragePage();
  let json=JSON.parse(obj.getStorageLogin());
  getDataUser(json,0);
  setTimeout(function(){ 
    getDataRequest("",0);             
  }, 1000);  
}

function getDataUser(data, type) {
  try {
    var xhttp = new XMLHttpRequest();
    var JsonData;
    xhttp.open("POST", ajaxUserLogin, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(xhttp.responseText);        
        if (jsonObj.length != 0) {
          if(type == 0){            
            document.getElementById("User_identification").innerHTML = jsonObj[0]["User_identification"];
            document.getElementById("User_email").innerHTML = data[0]["User_email"];
            document.getElementById("User_id").innerHTML = data[0]["User_id"];
            getDataProcess("",0);
            getDataProcess(data[0]["User_email"],3);
          }
        }
      }
    };
    if(type == 0){
      JsonData = '{"GET":"GET_USER_ID","User_email":"' + data[0]["User_email"] + '"}';
    }  
    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
  }
}


function getDataProcess(data, type) {
  try {
    var xhttp = new XMLHttpRequest();
    var JsonData;
    xhttp.open("POST", ajaxProcess, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");    
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(xhttp.responseText);        
        if (jsonObj.length != 0) {
          if(type == 0){ 
            jsonObj1 = jsonObj;           
            createtableProcess('tableProcess', arrayCell, jsonObj1);
          }
          if(type == 1){    
            createtablePerfomance('tablePerformance', arrayCell1, jsonObj);            
            viewModal('perfomance',0);            
          }
          if(type == 2){
            setDataForm(jsonObj);
            disableForm('processDetailForm');
            viewModal('detailProcess',0);
          }
          if(type == 3){
            for (let key in jsonObj[0]) {
              document.getElementById(key).innerHTML = jsonObj[0][key];
            }
          }
        }
      }
    };
    if(type == 0){
      let obj=new StoragePage();
      let user = JSON.parse(obj.getStorageLogin());
      JsonData = '{"GET":"GET_PROCESS_USER","User_email":"' + user[0]["User_email"] + '","Name":"' + data + '"}';
    }
    if(type == 1){
      JsonData = '{"GET":"GET_PERFORMANCE_PROCESS","Proc_id":"' + data + '"}';
    }   
    if(type == 2){
      JsonData = '{"GET":"GET_PROCESS_DETAIL","Proc_id":"' + data + '"}';
    }
    if(type == 3){
      JsonData = '{"GET":"GET_PROC_CLIENT_COUNT","User_email":"' + data + '"}';
    }
    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
  }
}

  //**Method create process table **/
  function createtableProcess(id, arrayCell, jSon) {
    var objTable = document.getElementById(id);
    objTable.innerHTML = "";
    let objThead = '<thead>';
    let objtbody = '<tbody>';
    let table = "";
    for (let j = 0; j < arrayCell.length; j++) {
      if (j == 0) {
        objThead += '<tr class="thead-dark title">';
      }
      objThead += '<th>' + arrayCell[j] + '</th>';
      if (j == arrayCell.length) {
        objThead += '</tr>';
      }
    }
    for (let k = 0; k < arrayCell.length - 2; k++) {
      if (k == 0) {
        objThead += '<tr class="blue">';
      }
      objThead += '<th><input type="text" class="form-control bg-light border-0 small noExport" id="myInput' + k + '" onkeyup="searchTable(' + "'" + id + "'," + k  + ",'myInput'" + ')" placeholder="Search.." title="Search"></th>';
    }
    for(let l = arrayCell.length; l > arrayCell.length - 2; l--){
      objThead += '<th></th>';
    }
    for (let i = 0, j = jSon.length; i < jSon.length; i++, j--) {
      objtbody += "<tr><td>" + jSon[i].Proc_city + "</td><td>" + jSon[i].Proc_origin + "</td><td>" + jSon[i].Proc_office + "</td><td>'" + jSon[i].Proc_filing + "</td><td>" + jSon[i].Proc_consecutive + "</td><td>" + jSon[i].Proc_attorney + "</td><td>" + jSon[i].Proc_plaintiff + "</td><td>" + jSon[i].Proc_defendant + "</td><td>" + jSon[i].Proc_status + "</td><td style='text-align: center;'><button onclick='getDataProcess("+ jSon[i].Proc_id + ",2)' class='btn btn-primary' style='margin:0; padding:5px' value=''><i class='icon-list-alt'></i></button></td><td style='text-align: center;'><button onclick='getDataProcess("+ jSon[i].Proc_id + ",1)' class='btn btn-primary' style='margin:0; padding:5px' value=''><i class='icon-history'></i></button></td></tr>";
    }
    objtbody += '</tbody>';
    objThead += '</thead>';
    table = objThead + objtbody;
    objTable.innerHTML = table;
  }

  //**Method create perfomance tables **/
  function createtablePerfomance(id, arrayCell, jSon) {
    var objTable = document.getElementById(id);
    objTable.innerHTML = "";
    let objThead = '<thead>';
    let objtbody = '<tbody>';
    let table = "";
    for (let j = 0; j < arrayCell.length; j++) {
      if (j == 0) {
        objThead += '<tr class="thead-dark title">';        
      }
      if(j == 1){
        objThead += '<th style="width: 35%;">' + arrayCell[j] + '</th>';
      }    
      else{
        objThead += '<th>' + arrayCell[j] + '</th>';
      }  
      if (j == arrayCell.length) {
        objThead += '</tr>';
      }
    }
    for (let k = 0; k < arrayCell.length - 1; k++) {
      if (k == 0) {
        objThead += '<tr class="blue">';
      }
      objThead += '<th><input type="text" class="form-control bg-light border-0 small" id="myInput1' + k + '" onkeyup="searchTable(' + "'" + id + "'," + k + ",'myInput1'" + ')" placeholder="Search.." title="Search"></th>';
    }
    for(let l = arrayCell.length; l > arrayCell.length - 1; l--){
      objThead += '<th></th>';
    }
    for (let i = 0; i < jSon.length; i++) {
      let rute = jSon[i].Perf_attached.length == 0 ? '' : 'href="' + jSon[i].Perf_attached + '"';
      jSon[i].Perf_initialDate = jSon[i].Perf_initialDate == '0000-00-00' ? '' : jSon[i].Perf_initialDate; 
      jSon[i].Perf_finalDate = jSon[i].Perf_finalDate == '0000-00-00' ? '' : jSon[i].Perf_finalDate; 
      objtbody += '<tr><td>' + jSon[i].Perf_date + '</td><td>' + jSon[i].Perf_description + '</td><td>' + jSon[i].Perf_initialDate + '</td><td>' + jSon[i].Perf_finalDate + '</td><td>' + jSon[i].Perf_location + '</td><td><a ' + rute + ' target="_blank" class="btn btn-info" style="margin:0; padding:5px"><i class="icon-attach_file"></i></a></td></tr>';
    }
    objtbody += '</tbody>';
    objThead += '</thead>';
    table = objThead + objtbody;
    objTable.innerHTML = table;
  }

  function filter(id){    
    let selected = document.getElementById(id).value;
    let order = selected.split("-");
    jsonObj1.sort(getSorted(order[0],order[1]));
    createtableProcess('tableProcess', arrayCell, jsonObj1);
  }

//************SEARCH ANY PROCESS FIELD**************//
function searchProcessField(e) {
  try {
    var objForm = document.getElementById('formSearchField');
    let intLogForm = objForm.querySelectorAll('input').length;
    let jsonData = '';    
    for (let i = 0; i < intLogForm; i++) {
      jsonData = objForm[i].value;
    }
    getDataProcess(jsonData, 0);
  }
  catch (error) {
    console.error(error);
  }
  e.preventDefault();
}

  function getSorted(prop, order){
    return function(a,b){
      if(order == 0){ //ASC
        var a1 = 1;
        var b1 = -1;
      }
      else if(order == 1){ //DESC
        var a1 = -1;
        var b1 = 1;
      }      
      if(a[prop] > b[prop]){
        return a1;
      }
      else if(a[prop] < b[prop]){
        return b1;
      }
      return 0;
    }
  }

function closeSession() {
  let obj = new StoragePage();
  obj.removeStorageUser();
  window.location.assign("../login/login.php");
}

function fnExcelReport() {
  let table = document.getElementById('tableProcess').innerHTML;
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

  tab_text = tab_text + '<x:Name>Reporte Expedientes</x:Name>';

  tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

  tab_text = tab_text + "<table border='1px'>";
  tab_text = tab_text + table;
  tab_text = tab_text + '</table></body></html>';
  tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");

  var data_type = 'data:application/vnd.ms-excel;charset=UTF-8';
  
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      if (window.navigator.msSaveBlob) {
          var blob = new Blob([tab_text], {
              type: "text/plain;charset=utf-8;"
          });
          navigator.msSaveBlob(blob, 'reporteExpedientes.xls');
      }
  } else {
      $('#btnExcel').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
      $('#btnExcel').attr('download', 'reporteExpedientes.xls');
  }

}
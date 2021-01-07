var jsonObj1 = "";
var arrayCell = new Array("Edificio", "Origen", "Despacho", "Radicado", "Consecutivo", "Apoderado", "Demandante", "Demandado", "Estado", "Detalle", "Actuaciones");
var arrayCell1 = new Array("#","Actuación", "Fecha", "Inicio término", "Fin término", "Ubicación", "Anexo");

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
            getDataProcess(data[0]["User_email"],0);
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
        }
      }
    };
    if(type == 0){
      JsonData = '{"GET":"GET_PROCESS_USER","User_email":"' + data + '"}';
    }
    if(type == 1){
      JsonData = '{"GET":"GET_PERFORMANCE_PROCESS","Proc_id":"' + data + '"}';
    }   
    if(type == 2){
      JsonData = '{"GET":"GET_PROCESS_DETAIL","Proc_id":"' + data + '"}';
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
        objThead += '<tr class="thead-dark">';
      }
      objThead += '<th>' + arrayCell[j] + '</th>';
      if (j == arrayCell.length) {
        objThead += '</tr>';
      }
    }
    for (let k = 0; k < arrayCell.length - 2; k++) {
      if (k == 0) {
        objThead += '<tr>';
      }
      objThead += '<th><input type="text" class="form-control bg-light border-0 small" id="myInput' + k + '" onkeyup="searchTable(' + "'" + id + "'," + k  + ",'myInput'" + ')" placeholder="Search.." title="Search"></th>';
      if (k == arrayCell.length) {
        objThead += '</tr>';
      }
    }
    for (let i = 0, j = jSon.length; i < jSon.length; i++, j--) {
      objtbody += '<tr><td>' + jSon[i].Proc_building + '</td><td>' + jSon[i].Proc_origin + '</td><td>' + jSon[i].Proc_office + '</td><td>' + jSon[i].Proc_filing + '</td><td>' + jSon[i].Proc_consecutive + '</td><td>' + jSon[i].Proc_attorney + '</td><td>' + jSon[i].Proc_plaintiff + '</td><td>' + jSon[i].Proc_defendant + '</td><td>' + jSon[i].Proc_status + '</td><td style="text-align: center;"><button onclick="getDataProcess('+ jSon[i].Proc_id + ',2)" class="btn btn-primary" style="margin:0; padding:5px" value=""><i class="icon-list-alt"></i></button></td><td style="text-align: center;"><button onclick="getDataProcess('+ jSon[i].Proc_id + ',1)" class="btn btn-primary" style="margin:0; padding:5px" value=""><i class="icon-history"></i></button></td></tr>';
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
        objThead += '<tr class="thead-dark">';
      }
      objThead += '<th>' + arrayCell[j] + '</th>';
      if (j == arrayCell.length) {
        objThead += '</tr>';
      }
    }
    for (let k = 0; k < arrayCell.length - 1; k++) {
      if (k == 0) {
        objThead += '<tr>';
      }
      objThead += '<th><input type="text" class="form-control bg-light border-0 small" id="myInput1' + k + '" onkeyup="searchTable(' + "'" + id + "'," + k + ",'myInput1'" + ')" placeholder="Search.." title="Search"></th>';
      if (k == arrayCell.length) {
        objThead += '</tr>';
      }
    }
    for (let i = 0, j = jSon.length; i < jSon.length; i++, j--) {
      let rute = jSon[i].Perf_attached.length == 0 ? '' : 'href="' + jSon[i].Perf_attached + '"';
      objtbody += '<tr><td>' + j + '</td><td>' + jSon[i].Perf_description + '</td><td>' + jSon[i].Perf_date + '</td><td>' + jSon[i].Perf_initialDate + '</td><td>' + jSon[i].Perf_finalDate + '</td><td>' + jSon[i].Perf_location + '</td><td><a ' + rute + ' target="_blank" class="btn btn-info" style="margin:0; padding:5px"><i class="icon-attach_file"></i></a></td></tr>';
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
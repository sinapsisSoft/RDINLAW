var arrayCell2 = new Array("#","Asunto","Mensaje", "Fecha", "Estado", "","Seguimiento");
var arrayCell3 = new Array("Observación", "Fecha", "Estado", "");

function getDataRequest(dataSetRequest, typeSend) {
  try {
    loadPageView();
    var xhttp = new XMLHttpRequest();
    var JsonData;
    xhttp.open("POST", ajaxRequest, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(xhttp.responseText);
        if (json.length != 0) {
          if (typeSend == 0) {
            createtableRequest("tableRequest",arrayCell2,json);
            enableScroll();
          } 
          if(typeSend == 1){
            createtableAction("tableAction",arrayCell3,json);
            viewModal('action',0);
            enableScroll();
          } 
        } else {
          enableScroll();
        }
      }
    };
    if (typeSend == 0) {
      let user = document.getElementById("Client_id").value;
      JsonData = '{"GET":"GET_CLIENT_REQUEST","Client_id":"' + user + '"}';
    }  
    if (typeSend == 1) {
      JsonData = '{"GET":"GET_ACTION","Req_id":"' + dataSetRequest + '"}';
    } 
    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
    enableScroll();
  }
}

//**Function set Request **/
function setDataRequest(dataSetRequest, typeSend) {
  try {
    loadPageView();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", ajaxRequest, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {     
        var json = JSON.parse(xhttp.responseText);
        if (json.length != 0) {
          if(typeSend == 0){ 
            createAlert("Exitoso","Operación realizada con éxito", "success", 0);    
            viewModal("requestsForm", 1);
            enableScroll();                          
          }   
        }
         else {
          createAlert("Exitoso","Valide la información", "warning", 0);    
          enableScroll();
        }
      }
    };
    if(typeSend == 0){      
      dataSetRequest = '{"POST":"POST",' + dataSetRequest + "}";
    }
    xhttp.send(dataSetRequest);
  } catch (error) {
    console.error(error);
    enableScroll();
  }
}

  //**Method create perfomance tables **/
  function createtableRequest(id, arrayCell, jSon) {
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
      objThead += '<th><input type="text" class="form-control bg-light border-0 small" id="myInput2' + k + '" onkeyup="searchTable(' + "'" + id + "'," + k + ",'myInput2'" + ')" placeholder="Search.." title="Search"></th>';
    }
    for(let l = arrayCell.length; l > arrayCell.length - 2; l--){
      objThead += '<th></th>';
    }
    for (let i = 0, j = jSon.length; i < jSon.length; i++, j--) {
      let className = jSon[i].Stat_name.replace(/\s+/g, ''); 
      objtbody += '<tr><td>' + j + '</td><td>' + jSon[i].Req_subject + '</td><td>' + jSon[i].Req_message + '</td><td>' + jSon[i].Act_date + '</td><td>' + jSon[i].Stat_name + '</td><td><div class="square ' + className + ' mx-auto" title='+ jSon[i].Stat_name +'></td><td style="text-align: center;"><button onclick="getDataRequest('+ jSon[i].Req_id + ',1)" class="btn btn-primary" style="margin:0; padding:5px" value=""><i class="icon-clock-o"></i></button></td></tr>';
    }
    objtbody += '</tbody>';
    objThead += '</thead>';
    table = objThead + objtbody;
    objTable.innerHTML = table;
  }

  function createtableAction(id, arrayCell, jSon) {
    var objTable = document.getElementById(id);
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
    for (let k = 0; k < arrayCell.length - 1; k++) {
      if (k == 0) {
        objThead += '<tr class="blue">';
      }
      objThead += '<th><input type="text" class="form-control bg-light border-0 small" id="myInput3' + k + '" onkeyup="searchTable(' + "'" + id + "'," + k + ",'myInput3'" + ')" placeholder="Search.." title="Search"></th>';
    }
    for(let l = arrayCell.length; l > arrayCell.length - 1; l--){
      objThead += '<th></th>';
    }
    for (let i = 0; i < jSon.length; i++) {      
      let className = jSon[i].Stat_name.replace(/\s+/g, ''); 
      objtbody += '<tr>' + 
      '<td>' + jSon[i].Act_observation+ '</td>'+
      '<td>' + jSon[i].Act_date+ '</td>'+
      '<td>' + jSon[i].Stat_name+ '</td>'+
      '<td><div class="square ' + className + ' mx-auto" title='+ jSon[i].Stat_name +'></div></td></tr>';
    }
    objtbody += '</tbody>';
    objThead += '</thead>';
    table =  objThead+objtbody;
    objTable.innerHTML = table;
  }

  function sendDataRequest(idForm, e, typeSend) {
    let jSon = "";
    if (validatorForm(idForm)) {
      jSon = getDataForm(idForm);
      let user = document.getElementById("User_id");
      let client = document.getElementById("Client_id");
      let dateNow = new Date();
      dateNow = dateNow.getFullYear() + "-" + month2digits(dateNow.getMonth()+1) + "-" + dateNow.getDate() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
      jSon += ',"'+user.id+'":'+'"'+user.value+'",';
      jSon += '"'+client.id+'":'+'"'+client.value+'",';
      jSon += '"Act_date":'+'"'+dateNow+'"';
      setDataRequest(jSon, typeSend);  
    } else {
      createModalAlert("Error al realizar el registro", 4, 4000);
    }
    e.preventDefault();
  }

  function createAlert(title, message, icon, color){
    let arrayColor = new Array();
    arrayColor = ["#3085d6"];
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: arrayColor[color],
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if(result.isConfirmed){
        location.reload();
      }      
    });
  }

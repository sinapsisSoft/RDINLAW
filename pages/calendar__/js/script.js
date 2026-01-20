(function () {
  'use strict';
  // Your code here
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize your scripts here
    console.log('Process page scripts loaded');
    getDataClient();
  });
})();
const storage = new AppStorage();
const alertManager = new AlertManager('alert-container', 6000);
const modal = new bootstrap.Modal(document.getElementById('modalProcess'));
const modalPerformances = new bootstrap.Modal(document.getElementById('modalPerformances'));
clientId = 0;
userId = 0;
function getDataClient() {

  let dataSetUser = { "GET": "GET_USER_CLIENT", "User_id": document.getElementById('User_id').value };

  fetch(ajaxUserLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetUser)
  }).then(response => response.json())
    .then(data => {
      //console.log('Success:', data);
      document.getElementById("labelName").innerHTML = data[0]["Client_name"];
      document.getElementById("User_identification").innerHTML = data[0]["Client_identification"];
      document.getElementById("User_email").innerHTML = data[0]["User_email"];
      document.getElementById("Client_id").value = data[0]["Client_id"];
      getDataEventTable();
    })
    .catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    });

}
function getDataEventTable() {

  let dataSetUser = { "GET": "GET_EVENT_CLIENT", "User_id": document.getElementById('User_id').value };
  fetch(ajaxCalendar, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetUser)
  }).then(response => response.json())
    .then(data => {
      //console.log('Success:', data);
      createTable(data);
      fadeIn("table-container", 500, () => {
        LoadingScreen.hide();
      });

    }).catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    }).finally(() => {
      console.log('Finally');
    });

  //createTable(dataSet)
}
function getClientCalendar() {
  userId = document.getElementById("User_id").value;
  //loadPageView();
  $('#calendarModal').modal('show');
  setTimeout(function () {
    getDataEvent(userId, 0);
  }, 2000);
}



//**Function get Event **/
function getDataEvent(dataSetEvent, typeSend) {
  try {
    //loadPageView();
    var xhttp = new XMLHttpRequest();
    var JsonData;
    xhttp.open("POST", ajaxCalendar, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(xhttp.responseText);
        if (json.length != 0) {
          if (typeSend == 0) {
            setCalendar(json);
            //enableScroll();   
          }
          else if (typeSend == 1) {
            createMenuItem(json);
          }

        } else {
          setCalendar(json);
          //enableScroll();
        }
      }
    };
    if (typeSend == 0) {
      JsonData = '{"GET":"GET_EVENT_CLIENT","User_id":"' + dataSetEvent + '"}';
    }
    else if (typeSend == 1) {
      JsonData = '{"GET":"GET_EVENT_LIST_USER","User_id":"' + dataSetEvent + '"}';
    }

    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
    //enableScroll();
  }
}

function setCalendar(json) {
  var jsonData = [];
  var objDate = new Date();
  var day = objDate.getDate();
  var month = objDate.getMonth();
  var year = objDate.getFullYear();
  var getDate = year + "-" + (month + 1) + "-" + day;
  var calendarEl = document.getElementById('calendar');
  document.getElementById("addEventView").addEventListener("click", function () {
    $('#selectEvent').fadeOut();
    $('#addEvent').fadeIn();
  });
  $.each(json, function (idx, e) {
    jsonData.push({
      id: "" + e.id + "",
      title: "" + e.title + "",
      start: "" + e.start + "",
      end: "" + e.end + "",
      color: "" + e.color + ""
    })
  });
  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    defaultDate: getDate,
    editable: true,
    eventLimit: true,
    selectable: true,
    selectHelper: true,
    navLinks: true, // can click day/week names to navigate views
    select: function (arg) {
      $('#selectEvent').fadeOut();
      $('#addEvent').fadeIn();
      $('#delete').fadeOut();
      //clearForm("addForm", 1);
      //clearForm("calendarInfo", 1);
      document.getElementById('Event_info').scrollIntoView({ behavior: "smooth" });
    },
    eventClick: function (arg) {
      //clearForm("addForm", 1);
      //clearForm("calendarInfo", 1);
      $('#selectEvent').fadeIn();
      $('#addEvent').fadeOut();
      $('#delete').fadeIn();
      $('#calendarModal #Event_id').val(arg.event.id);
      $('#calendarModal #Event_title').val(arg.event.title);
      $('#calendarModal #Event_color').val(arg.event.borderColor);
      $('#calendarModal #Event_start').val(moment(arg.event.start).format('YYYY-MM-DD HH:mm:ss'));
      $('#calendarModal #Event_end').val(moment(arg.event.end).format('YYYY-MM-DD HH:mm:ss'));
      document.getElementById('Event_info').scrollIntoView({ behavior: "smooth" });
    },
    events: jsonData
  });
  calendar.render();
}

function addEvent(obj) {
  id = obj["Event_id"].value;
  start = obj["Event_start"].value;
  end = obj["Event_end"].value;
  title = obj["Event_title"].value;
  color = obj["Event_color"].value;

  var JsonData = '"Event_id"' + ':' + '"' + id + '","Event_start"' + ':' + '"' + start + '","Event_end"' + ':' + '"' + end + '","Event_title"' + ':' + '"' + title + '","Event_color"' + ':' + '"' + color + '","User_id"' + ':' + '"' + userId + '"';

  try {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", ajaxCalendar, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(xhttp.responseText);
        if (jsonObj == 1) {
          //createAlert("Exitoso","Evento creado con éxito", "success", 0);  
          console.log("Evento creado con éxito");
        }
        else {
          //createAlert("Hubo un error","No se pudo crear el evento", "error", 0);
          console.log("Error creando el evento");
        }
        $('#calendarModal').modal('hide');
      }
    };
    JsonData = '{"POST":"POST",' + JsonData + '}';
    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
  }
}

function edit(arg) {
  start = moment(arg.event.start).format('YYYY-MM-DD HH:mm:ss');
  if (arg.event.end) {
    end = moment(arg.event.end).format('YYYY-MM-DD HH:mm:ss');
  } else {
    end = start;
  }
  id = arg.event.id;
  title = arg.event.title;
  color = arg.event.color;
  var JsonData = '"Event_id"' + ':' + '"' + id + '","Event_start"' + ':' + '"' + start + '","Event_end"' + ':' + '"' + end + '","Event_title"' + ':' + '"' + title + '","Event_color"' + ':' + '"' + color + '","User_id"' + ':' + '"' + userId + '"';

  try {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", ajaxCalendar, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(xhttp.responseText);
        if (jsonObj.length != 0) {
          // createAlert("Exitoso","Evento editado con éxito", "success", 0);  
        } else {
          // createAlert("Hubo un error","No puedo ser editado el evento", "error", 0);  

        }
      }
    };
    JsonData = '{"POST":"POST",' + JsonData + '}';
    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
  }
  calendar.render();
}

function deleteEvent(idForm) {
  var obj = document.getElementById(idForm);
  id = obj["Event_id"].value;
  start = obj["Event_start"].value;
  end = obj["Event_end"].value;
  title = obj["Event_title"].value;
  color = obj["Event_color"].value;

  if (confirm("Esta seguro de eliminar este evento")) {
    try {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", ajaxCalendar, true);
      xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var jsonObj = JSON.parse(xhttp.responseText);
          if (jsonObj == 1) {
            //createAlert("Exitoso", "Evento eliminado con éxito", "success", 0);
            console.log("Evento eliminado con éxito ");

          } else {
            //createAlert("Hubo un error", "El evento no pudo ser eliminado", "error", 0);
            console.log("Error al Eliminar el evento ");
          }
          $('#modalEdit').modal('hide');
        }
      };
      JsonData = '{"POST":"DELETE","Event_id":"' + id + '"}';
      xhttp.send(JsonData);
    } catch (error) {
      console.error(error);
    }
  } else {
    return false;
  }
}

$("#closeAddEvent").click(function () {
  $('#selectEvent').fadeIn();
  $('#addEvent').fadeOut();
  $('#delete').fadeOut();
  cleanForm("calendarInfo");
  cleanForm("addForm");
});

function cleanForm(idForm) {
  document.getElementById(idForm).reset();
}

$("#calendarModal").on('hidden.bs.modal', function () {
  objForm = document.getElementById("calendarInfo");
  cleanForm("calendarInfo");
  cleanForm("addForm");
});

function createMenuItem(json) {
  let count = document.getElementsByClassName("badge-counter");
  for (item of count) {
    item.textContent = json.length
  }
  let menuItems = document.getElementsByClassName("dropdown-menu");
  let content = "";
  for (item of json) {
    content += `<a class="dropdown-item d-flex align-items-center">
                  <div class="mr-3">
                    <div class="menu-circle bg-warning">
                      <i class="fas fa-exclamation-triangle"></i>
                    </div>
                  </div>
                  <div>
                    <div class="small text-gray-500">${item.Event_start}</div>
                    <span class="font-weight-bold text-wrap">${item.Event_title}</span>
                  </div>
                </a>`;
  }
  for (item of menuItems) {
    item.innerHTML += content;
  }

}

function createTable(dataSet) {

  const table = $('#dataTableApp').DataTable({
    data: dataSet,
    columns: [
      { data: 'id' },
      { data: 'title' },
      { data: 'color',
        render:function(data){
          return `<input style="width: 100%; text-aling:center" class="form-control" type="color" value="${data}" readonly disabled>`;
        }
       },
      { data: 'start' },
      { data: 'end' },
      {
        data: null,
        title: 'Acciones',
        orderable: false,
        render: function (data, type, row) {
          return `
        <div class="dropdown">
            <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Acciones
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item btn-detalle" href="#" data-id="${row.User_id}">
                    <i class="fas fa-eye"></i> Detalle
                </a></li>
                <li><a class="dropdown-item btn-otro" href="#" data-id="${row.User_id}">
                    <i class="fas fa-cog"></i> Otra acción
                </a></li>
            </ul>
        </div>
    `;
        }
      }

    ],
    order: [[0, 'asc']],
    dom: '<"d-flex justify-content-between align-items-center mb-3"lfB>rtip',
    lengthMenu: [5, 10, 25, 50, 100],
    pageLength: 5,
    buttons: {
      dom: {
        button: {
          className: 'btn btn-sm'
        },
        buttonLiner: {
          tag: null
        }
      },
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="fas fa-eye"></i> Columnas',
          className: 'btn btn-secondary'
        },
        {
          extend: 'collection',
          text: '<i class="fas fa-download"></i> Exportar',
          className: 'btn btn-primary dropdown-toggle',
          buttons: [
            {
              extend: 'excelHtml5',
              text: '<i class="fas fa-file-excel"></i> Excel',
            },
            {
              extend: 'csvHtml5',
              text: '<i class="fas fa-file-csv"></i> CSV',
            },
            {
              extend: 'pdfHtml5',
              text: '<i class="fas fa-file-pdf"></i> PDF',
            },
            {
              extend: 'print',
              text: '<i class="fas fa-print"></i> Imprimir'
            }
          ]
        }

      ]
    },
    language: {
      decimal: "",
      emptyTable: "No hay datos disponibles",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 a 0 de 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      infoPostFix: "",
      thousands: ", ",
      lengthMenu: "Mostrar _MENU_ registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "_INPUT_",
      searchPlaceholder: "Buscar...",
      zeroRecords: "No se encontraron registros coincidentes",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      }
    },
    initComplete: function () {
      // Ajustes adicionales para alinear elementos
      $('.dataTables_length label').addClass('mb-0');
      $('.dataTables_filter label').addClass('mb-0');
    }
  });
  // Eventos para los botones (delegados porque se crean dinámicamente)
  $('#dataTableApp tbody').on('click', '.btn-detalle', function () {
    const id = $(this).data('id');
    showDetail(id);
  });
  $('#dataTableApp tbody').on('click', '.btn-actuacion', function () {
    const id = $(this).data('id');
    showPerformances(id);
  });

  $('#dataTableApp tbody').on('click', '.btn-otro', function () {
    const id = $(this).data('id');
    otraAccion(id);
  });

}

// Funciones que reciben el ID
function showDetail(id) {
 userId = document.getElementById("User_id").value;
$('#calendarModal').modal('show');
  setTimeout(function () {
    getDataEvent(userId, 0);
  }, 2000);
}

function showHiddenModal(status = true, type = 1) {

  switch (type) {
    case 1:
      if (status) {
        modal.show();
      } else {
        modal.hide();
      }
      break;
    case 2:
      if (status) {
        modalPerformances.show();
      } else {
        modalPerformances.hide();
      }
      break;
  }


}
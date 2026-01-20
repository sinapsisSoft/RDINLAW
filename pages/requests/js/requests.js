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
const modalRequests = new bootstrap.Modal(document.getElementById('modalRequests'));
const appForm = document.getElementById('requestsForm');

appForm.addEventListener("submit", (event) => {
  event.preventDefault();
  LoadingScreen.show('Enviando Información...');
  if (checkValidity()) {
    // Aquí iría la lógica para enviar los datos al servidor
    let dateNow = new Date();
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    let hour = dateNow.getHours();
    let minutes = dateNow.getMinutes();
    let seconds = dateNow.getSeconds();
    let newDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;

    const formData = {
      User_id: document.getElementById('User_id').value,
      Client_id: document.getElementById('Client_id').value,
      Req_subject: document.getElementById('Req_subject').value,
      Req_message: document.getElementById('Req_message').value,
      Req_id: document.getElementById('Req_id').value,
      Stat_id: document.getElementById('Stat_id').value,
      Act_observation: document.getElementById('Act_observation').value,
      Act_date: newDate,
      POST: "POST"
    };

    //console.log(formData);
    setDataRequests(formData);
  } else {
    console.log(this.validationMessage);
    alertManager.showError('Por favor, complete todos los campos', 2000, true);
  }
});

function checkValidity() {
  const form = document.getElementById('requestsForm');
  const validationMessage = form.checkValidity();
  //console.log(validationMessage);
  return validationMessage;
}

function setDataRequests(dataSet) {

  fetch(ajaxRequest, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSet)
  }).then(response => response.json())
    .then(data => {
      //console.log('Success:', data);
      alertManager.showAlert('Solicitud enviada', 4000, true);
      
    }).catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, true);
    }).finally(() => {
      console.log('Finally');
      LoadingScreen.hide();
      showHiddenModal(false, 2);
      window.location.href = '../requests/';
    });

}

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
      getDataRequests();
    })
    .catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    });

}

function getDataRequests() {

  let dataSetUser = { "GET": "GET_CLIENT_REQUEST", "Client_id": document.getElementById('Client_id').value };

  fetch(ajaxRequest, {
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

}

function createTable(dataSet) {

  const table = $('#dataTableApp').DataTable({
    data: dataSet,
    columns: [
      { data: 'Req_id' },
      { data: 'Req_subject' },
      { data: 'Req_message' },
      { data: 'Act_date' },
      {
        data: 'Stat_name',
        render: function (data) {
          const badgeClass = data === 'Resuelto' ? 'bg-success' : 'bg-secondary';
          return `<span class="badge ${badgeClass}">${data}</span>`;
        }
      },
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
                <li><a class="dropdown-item btn-detalle" href="#" data-id="${row.Req_id}">
                    <i class="fas fa-eye"></i> Detalle
                </a></li>
                <li><a class="dropdown-item btn-otro" href="#" data-id="${row.Req_id}">
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


  $('#dataTableApp tbody').on('click', '.btn-otro', function () {
    const id = $(this).data('id');
    otraAccion(id);
  });

}

function createTableRequests(dataSet) {
  // Verificar si la tabla ya existe y destruirla
  if ($.fn.DataTable.isDataTable('#dataTableRequests')) {
    $('#dataTableRequests').DataTable().destroy();
  }
  const tablePerformances = $('#dataTableRequests').DataTable({
    data: dataSet,
    columns: [
      { data: 'Act_id' },
      { data: 'Act_observation' },
      { data: 'Act_date' },
      {
        data: 'Stat_name',
        render: function (data) {
          const badgeClass = data === 'Resuelto' ? 'bg-success' : 'bg-secondary';
          return `<span class="badge ${badgeClass}">${data}</span>`;
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


}

// Evento delegado para el botón de ver documento
$(document).on('click', '.btn-ver-documento', function () {
  const url = $(this).data('url');
  window.open(url, '_blank');
});


function showDetail(id) {

  let dataSetUser = { "GET": "GET_ACTION", "Req_id": id };

  fetch(ajaxRequest, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetUser)
  }).then(response => response.json())
    .then(data => {
      console.log('Success:', data[0]);

      createTableRequests(data);

      showHiddenModal(true, 2);

    }).catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    }).finally(() => {
      //console.log('Finally');
      //LoadingScreen.hide();
    });

}

function otraAccion(id) {
  console.log('Otra acción con ID:', id);
  // Aquí tu lógica para otra acción
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
        modalRequests.show();
      } else {
        modalRequests.hide();
      }
      break;
  }


}

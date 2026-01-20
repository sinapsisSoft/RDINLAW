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
      getDataProceeding();
    })
    .catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    });

}

function getDataProceeding() {

  let dataSetUser = { "GET": "GET_PROCESS_USER", "User_id": document.getElementById('User_id').value };

  fetch(ajaxProcess, {
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
      { data: 'Proc_internConsec' },
      { data: 'Proc_city' },
      { data: 'Proc_office' },
      { data: 'Proc_filing' },
      { data: 'Proc_consecutive' },
      { data: 'Proc_attorney' },
      { data: 'Proc_plaintiff' },
      { data: 'Proc_defendant' },
      {
        data: 'Proc_status',
        render: function (data) {
          const badgeClass = data === 'Activo' ? 'bg-success' : 'bg-secondary';
          return `<span class="badge ${badgeClass}">${data}</span>`;
        }
      },
      { data: 'Proc_building' },
      { data: 'Proc_origin' },
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
                <li><a class="dropdown-item btn-detalle" href="#" data-id="${row.Proc_id}">
                    <i class="fas fa-eye"></i> Detalle
                </a></li>
                <li><a class="dropdown-item btn-actuacion" href="#" data-id="${row.Proc_id}">
                    <i class="fas fa-file-alt"></i> Actuación
                </a></li>
                <li><a class="dropdown-item btn-otro" href="#" data-id="${row.Proc_id}">
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

function createTablePerformance(dataSet) {
// Verificar si la tabla ya existe y destruirla
    if ($.fn.DataTable.isDataTable('#dataTablePerformances')) {
        $('#dataTablePerformances').DataTable().destroy();
    }
  const tablePerformances = $('#dataTablePerformances').DataTable({
    data: dataSet,
    columns: [
      { data: 'Perf_description' },
      { data: 'Perf_date' },
      { data: 'Perf_initialDate' },
      { data: 'Perf_finalDate' },
      { data: 'Perf_location' },
      { data: 'Perf_type' },
      {
        data: 'Perf_notification',
        title: 'Notificación',
        render: function (data) {
          return data || 'N/A';
        }
      },
      {
        data: 'Perf_attached',
        title: 'Documento Adjunto',
        render: function (data, type, row) {
          if (data && data.trim() !== '') {
            // Si hay documento adjunto
            return `
                    <button class="btn btn-sm btn-primary btn-ver-documento" 
                            data-url="${data}" 
                            title="Ver documento">
                        <i class="bi bi-eye-fill"></i> Ver
                    </button>
                `;
          } else {
            // Si no hay documento adjunto
            return `
                    <button class="btn btn-sm btn-secondary" disabled title="No hay documento adjunto">
                        <i class="bi bi-eye-slash-fill"></i> Sin documento
                    </button>
                `;
          }

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
$(document).on('click', '.btn-ver-documento', function() {
    const url = $(this).data('url');
    window.open(url, '_blank');
});

// Funciones que reciben el ID
function showDetail(id) {
  //LoadingScreen.show('Consultando información ...');
  let dataSetUser = { "GET": "GET_PROCESS_DETAIL", "Proc_id": id };

  fetch(ajaxProcess, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetUser)
  }).then(response => response.json())
    .then(data => {
      //console.log('Success:', data[0]);
      let getJson = data[0];

      Object.keys(getJson).forEach(element => {
        //console.log(element);
        document.getElementById(element).value = "";
        document.getElementById(element).value = getJson[element];
      });
      showHiddenModal(true, 1);

    }).catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    }).finally(() => {
      //console.log('Finally');
      //LoadingScreen.hide();
    });


}

function showPerformances(id) {
  console.log('Mostrar actuación del ID:', id);
  let dataSetUser = { "GET": "GET_PERFORMANCE_PROCESS", "Proc_id": id };

  fetch(ajaxProcess, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetUser)
  }).then(response => response.json())
    .then(data => {
      console.log('Success:', data[0]);

      createTablePerformance(data);

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

// Exportar a PDF
function exportToPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text('Información del Proceso', 105, 20, { align: 'center' });

  // Datos
  const datos = getFormData();
  const rows = Object.entries(datos).map(([key, value]) => [key, value || 'N/A']);

  // Tabla
  doc.autoTable({
    startY: 30,
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [13, 110, 253] }, // Color azul Bootstrap
    styles: { cellPadding: 5, fontSize: 10 }
  });

  // Guardar
  doc.save('informacion_proceso.pdf');
}

// Exportar a Excel
function exportToExcel() {
  const datos = getFormData();
  const ws = XLSX.utils.json_to_sheet([datos]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Proceso");

  // Generar archivo
  XLSX.writeFile(wb, 'informacion_proceso.xlsx');
}

// Exportar a CSV
function exportToCSV() {
  const datos = getFormData();
  const csvRows = [];

  // Encabezados
  csvRows.push(Object.keys(datos).join(','));

  // Valores
  const values = Object.values(datos).map(v => v || 'N/A');
  csvRows.push(values.join(','));

  // Crear archivo
  const csv = csvRows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  saveAs(blob, 'informacion_proceso.csv');
}


function getFormData() {
  return {
    "Edificio/Juzgado": document.getElementById('Proc_building').value,
    "Origen": document.getElementById('Proc_origin').value,
    "Despacho": document.getElementById('Proc_office').value,
    "Correo Despacho": document.getElementById('Proc_officeEmail').value,
    "Radicado": document.getElementById('Proc_filing').value,
    "Consecutivo": document.getElementById('Proc_consecutive').value,
    "Apoderado": document.getElementById('Proc_attorney').value,
    "Demandante": document.getElementById('Proc_plaintiff').value,
    "Demandado": document.getElementById('Proc_defendant').value,
    "Departamento": document.getElementById('Proc_department').value,
    "Ciudad": document.getElementById('Proc_city').value,
    "Tipo Jurídico": document.getElementById('Proc_juridistic').value,
    "Área": document.getElementById('Proc_area').value,
    "Tipo Proceso": document.getElementById('Ptype_name').value,
    "Contenido": document.getElementById('Proc_content').value,
    "Fase": document.getElementById('Proc_phase').value,
    "Historial": document.getElementById('Proc_history').value
  };
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

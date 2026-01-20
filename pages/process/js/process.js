(function () {
  'use strict';
  // Your code here
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize your scripts here
    console.log('Process page scripts loaded');
    getDataClient();
  });
})();

var arrayCell = new Array("# Interno", "Ciudad", "Despacho", "Radicado", "Consecutivo", "Apoderado", "Demandante", "Demandado", "Estado", "Detalle", "Actuaciones");

var arrayCell1 = new Array("Fecha de informe", "Actuación", "Tipo de actuación", "Inicio término", "Fin término", "Ubicación", "Tipo de notificación", "Anexo");

var arrayCel2 = new Array("# Interno", "Edificio", "Origen", "Despacho", "Autoriza", "Radicado", "Consecutivo", "Apoderado", "Demandante", "Demandado", "Departamento", "Ciudad", "Jurisdicción", "Competencia", "Tipo de proceso", "Etapa Procesal", "Contenido", "Historial de radicados", "Estado");

var arrayCel3 = new Array("# Interno", "Ciudad", "Despacho", "Radicado", "Consecutivo", "Apoderado", "Demandante", "Demandado", "Historial Radicados", "Fecha Informe", "Actuación", "Tipo Actuación", "Inicio Término", "Fin Término", "Ubicación", "Tipo Notificación");


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
      //getDataProcess();
    })
    .catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    });

}
function getDataProcessToDate() {
  userId = document.getElementById("User_id").value;
  dateIni = document.getElementById("DateIni").value;
  dateFin = document.getElementById("DateFin").value;
  json = '"User_id":"' + userId + '","DateIni":"' + dateIni + '","DateFin":"' + dateFin + '"';
const dataSetReport = {
      GET: 'GET_PERFORMANCE_ALL_REPORT',
      userId:document.getElementById("User_id").value,
      dateIni: document.getElementById('DateIni').value,
      dateFin: document.getElementById('DateFin').value,
    };
//console.log(reportData);
  fetch(ajaxProcess, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetReport)
  }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    }).finally(() => {
      console.log('Finally');
    });

}
function getDataProcess() {

  let dataSetUser = { "GET": "GET_PROCESS_ALL_DETAIL", "User_id": document.getElementById('User_id').value };

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
      { data: 'Proc_building' },
      { data: 'Proc_origin' },
      { data: 'Proc_office' },
      { data: 'Proc_officeEmail' },
      { data: 'Proc_filing' },
      { data: 'Proc_consecutive' },
      { data: 'Proc_attorney' },
      { data: 'Proc_plaintiff' },
      { data: 'Proc_defendant' },
      { data: 'Proc_department' },
      { data: 'Proc_city' },
      { data: 'Proc_juridistic' },
      { data: 'Proc_area' },
      { data: 'Ptype_name' },
      { data: 'Proc_phase' },
      { data: 'Proc_content' },
      { data: 'Proc_history' },
      {
        data: 'Proc_status',
        render: function (data) {
          const badgeClass = data != null ? 'bg-success' : 'bg-secondary';
          return `<span class="badge ${badgeClass}">${data}</span>`;
        }
      },
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

function changeReport(select) {
  let objSelect = document.getElementById(select);
  optionSelectd = objSelect.options[objSelect.selectedIndex].value;
  btnExcel = document.getElementById("btnExcelReport");
  btnSearch = document.getElementById("searchReport");
  finDate = document.getElementById("DateFin");
  if (optionSelectd == 0) {
    btnExcel.addEventListener("click", function () {
      fnExcelReport('tableReport', "btnExcelReport", 0);
    }, false);
    btnSearch.addEventListener("click", function () {
      loadReport(0);
    }, false);
    document.getElementById("divDateIni").classList.add("d-none");
    document.getElementById("divDateFin").classList.add("d-none");
    document.getElementById("searchReport").removeAttribute("disabled");
  }
  else if (optionSelectd == 1) {
    document.getElementById("divDateIni").classList.remove("d-none");
    document.getElementById("divDateFin").classList.remove("d-none");
    btnExcel.addEventListener("click", function () {
      fnExcelReport('tableReport', "btnExcelReport", 1);
    }, false);
    btnSearch.addEventListener("click", function () {
      loadReport(1);
    }, false);
    finDate.addEventListener("change", function () {
      document.getElementById("searchReport").removeAttribute("disabled");
    }, false);
  }
}

function loadReport(type) {
  if (type == 0) {
    //getDataReports(userId, 4);
    getDataProcess();

  }
  else if (type == 1) {

    getDataProcessToDate();
   
  }

}



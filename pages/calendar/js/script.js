document.addEventListener('DOMContentLoaded', function () {
  const calendarElement = document.getElementById('calendar');
  const eventModal = new bootstrap.Modal(document.getElementById('eventModal'), {
    backdrop: 'static',
    keyboard: false
  });

  let globalDataSet = [];
  const calendarModal = new bootstrap.Modal(document.getElementById('calendarModal'));
  const eventForm = document.getElementById('eventForm');
  const saveBtn = document.getElementById('saveBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const exportSection = document.getElementById('export-section');

  const storage = new AppStorage();
  const alertManager = new AlertManager('alert-container', 6000);
  // Obtener la fecha actual
  const today = new Date();

  getDataClient();


  async function getDataClient() {
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
        getDataEvents().then(response => response.json()).then(data => {
          createTable(data);
          fadeIn("table-container", 500, () => {
            LoadingScreen.hide();
          });
        })

      })
      .catch((error) => {
        console.error('Error:', error);
        alertManager.showError("Error en la conexión", 4000, dismissible = true);
      });

  }

  function getDataEvents() {

    const eventsData = {
      GET: 'GET_EVENT_CLIENT',
      User_id: document.getElementById('User_id').value,
    };
    return fetch(ajaxCalendar, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventsData)
    });
  }
  // Guardar evento
  saveBtn.addEventListener('click', function () {
    const eventId = document.getElementById('eventId').value;
    const isEdit = eventId != 0 && eventId !== '';

    const eventData = {
      Event_id: isEdit ? eventId : 0,
      Event_title: document.getElementById('title').value,
      Event_start: document.getElementById('start').value,
      Event_end: document.getElementById('end').value,
      Event_color: document.getElementById('color').value,
      User_id: document.getElementById('User_id').value,
      POST: isEdit ? 'UPDATE_EVENT' : 'ADD_EVENT',
    };

    if (!eventData.Event_title || !eventData.Event_start) {
      alert('El título y la fecha de inicio son obligatorios');
      return;
    }

    if (isEdit) {
      // Actualizar evento existente
      console.log('Actualizando evento...', eventData);
      updateEvent(eventData);
    } else {
      // Crear nuevo evento
      console.log('Creando evento...', eventData);
      createEvent(eventData);
    }
  });

  // Función para crear evento
  function createEvent(eventData) {
  fetch(ajaxCalendar, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
    .then(async response => {
      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('JSON inválido en createEvent:', text);
      }

      if (!response.ok) {
        const msg = data.message || `HTTP ${response.status}`;
        throw new Error(msg);
      }

      return data;
    })
    .then(data => {
      alert('Evento creado correctamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error en createEvent:', error);
      alert('Error al crear el evento: ' + error.message);
      calendar.refetchEvents();
    });
}

  // Función para actualizar evento
  function updateEvent(eventData) {
  fetch(ajaxCalendar, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
    .then(async response => {
      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('JSON inválido en updateEvent:', text);
      }

      if (!response.ok) {
        const msg = data.message || `HTTP ${response.status}`;
        throw new Error(msg);
      }

      return data;
    })
    .then(data => {
      alert('Evento actualizado correctamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error en updateEvent:', error);
      alert('Error al actualizar el evento: ' + error.message);
      calendar.refetchEvents();
    });
}



  // Función para eliminar evento
  function deleteEvent(eventId) {
  fetch(ajaxCalendar, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Event_id: eventId })
  })
    .then(async response => {
      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('JSON inválido en deleteEvent:', text);
      }

      if (!response.ok) {
        const msg = data.message || `HTTP ${response.status}`;
        throw new Error(msg);
      }

      return data;
    })
    .then(data => {
      alert('Evento eliminado correctamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error en deleteEvent:', error);
      alert('Error al eliminar el evento: ' + error.message);
      calendar.refetchEvents();
    });
}

  
  document.getElementById('eventModal').addEventListener('shown.bs.modal', function () {
    if (window.innerWidth < 768) {
      this.querySelector('.modal-dialog').classList.add('modal-fullscreen-sm-down');
    }
  });

  document.getElementById('btn-calendar').addEventListener('click', () => {

    getDataEvents().then(response => response.json()).then(data => {
        inicializarCalendario(
          calendarElement,
          data
        );
        fadeIn("calendarModal", 500, () => {
          calendarModal.show();

        });
    }).catch(error => {
      console.error('Error:', error);
      alert('Error al consultar los eventos');
    }).finally(() => {
      LoadingScreen.hide();
    });


  });

  document.getElementById('btn-calendar2').addEventListener('click', () => {

    getDataEvents().then(response => response.json()).then(data => {
        inicializarCalendario(
          calendarElement,
          data
        );
        fadeIn("calendarModal", 500, () => {
          calendarModal.show();

        });
    }).catch(error => {
      console.error('Error:', error);
      alert('Error al consultar los eventos');
    }).finally(() => {
      LoadingScreen.hide();
    });

  });

 

//Variable global
let calendar = null;

//Función para determinar vista inicial
function getInitialViewBasedOnScreenSize() {
  if (window.innerWidth < 576) {
    return 'timeGridDay';
  } else if (window.innerWidth < 992) {
    return 'timeGridWeek';
  } else {
    return 'dayGridMonth';
  }
}

function inicializarCalendario(calendarEl, jsonData) {
  // Si existe, destruye antes de crear uno nuevo
  if (calendar) {
    calendar.destroy();
    calendar = null;
  }

  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'es',
    initialView: getInitialViewBasedOnScreenSize(),
    initialDate: today,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: jsonData,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    height: 'auto',
    contentHeight: 'auto',
    aspectRatio: 1.8,
    handleWindowResize: true,
    windowResizeDelay: 100,
    views: {
      dayGridMonth: {
        dayMaxEventRows: 3,
      },
      timeGridWeek: {
        allDaySlot: false
      },
      timeGridDay: {
        allDaySlot: false
      }
    },
    eventClick: function (info) {
      document.getElementById('eventId').value = info.event.id;
      document.getElementById('title').value = info.event.title;
      document.getElementById('start').value = formatDateTimeForInput(info.event.start);
      document.getElementById('end').value = info.event.end ? formatDateTimeForInput(info.event.end) : '';
      document.getElementById('color').value = info.event.backgroundColor || '#bd3d3d';

      deleteBtn.style.display = 'inline-block';
      exportSection.style.display = 'inline-block';
      deleteBtn.onclick = function () {
        if (confirm('¿Estás seguro de eliminar este evento?')) {
          deleteEvent(info.event.id);
        }
      };

      document.getElementById('eventModalLabel').textContent = 'Editar Evento';
      eventModal.show();
    },
  select: function (info) {
  eventForm.reset();
  document.getElementById('eventId').value = '';

  const start = info.start;
  const endExclusive = info.end;
  const endInclusive = new Date(endExclusive.getTime() - 24 * 60 * 60 * 1000);

  document.getElementById('start').value = formatDateTimeForInput(start);
  document.getElementById('end').value   = formatDateTimeForInput(endInclusive);
  document.getElementById('color').value = '#bd3d3d';

  deleteBtn.style.display = 'none';
  exportSection.style.display = 'none';
  document.getElementById('eventModalLabel').textContent = 'Agregar Evento';
  eventModal.show();
  },
    eventDrop: function (info) {
      updateEvent(info.event);
    },
    eventResize: function (info) {
      updateEvent(info.event);
    },
    datesSet: function () {
      // Ajuste suave después de cambiar fechas/vista
      setTimeout(forceCalendarRender, 150);
      console.log('Calendar rendered');
    }
  });

  calendar.render();

  // Redibujar cuando cambia tamaño de la ventana 
  window.addEventListener('resize', function () {
    const newView = getInitialViewBasedOnScreenSize();
    if (calendar.view.type !== newView) {
      calendar.changeView(newView);
    }
    console.log('Botón resize');
    setTimeout(forceCalendarRender, 100);
  });

  // Botón today
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('fc-today-button')) {
      goToToday();
    }
  });

  // Forzar ir al día actual una vez
  goToToday();
}


function forceCalendarRender() {
  calendar.updateSize();
  calendar.render();
  // Múltiples actualizaciones para asegurar el renderizado completo
  setTimeout(() => {
        calendar.updateSize();
        calendar.render();
  }, 100);
  setTimeout(() => calendar.updateSize(), 300);
  setTimeout(() => calendar.updateSize(), 600);
}

function goToToday() {
  if (!calendar) return;
  calendar.today();
  highlightToday();
  setTimeout(forceCalendarRender, 50);
}

function highlightToday() {
  document.querySelectorAll('.fc-day-today').forEach(day => {
    day.style.backgroundColor = '';
  });

  setTimeout(() => {
    const todayCells = document.querySelectorAll('.fc-day-today');
    todayCells.forEach(cell => {
      cell.style.backgroundColor = '#e6f7ff';
    });
  }, 50);
}

// Formatear para datetime-local
function formatDateTimeForInput(date) {
  return date.toISOString().slice(0, 16);
}

  
  function createTable(dataSet) {
     globalDataSet = dataSet;
    const table = $('#dataTableApp').DataTable({
      data: dataSet,
      columns: [
        { data: 'id' },
        { data: 'title' },
        {
          data: 'color',
          render: function (data) {
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
                <li><a class="dropdown-item btn-detalle" href="#" data-id="${row.id}">
                    <i class="fas fa-eye"></i> Detalle
                </a></li>
                <li><a class="dropdown-item btn-otro" href="#" data-id="${row.id}">
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
  // Buscar el evento en los datos ya cargados
  const event = globalDataSet.find(e => String(e.id) === String(id));

  if (!event) {
    console.error('No se encontró el evento con id:', id);
    alert('No se encontró el evento');
    return;
  }

  //console.log('Evento:', event);
  eventForm.reset();
  document.getElementById('eventId').value = event.id || '';
  document.getElementById('title').value = event.title || '';
  document.getElementById('start').value = event.start ? formatDateTimeInput(event.start) : '';
  document.getElementById('end').value = event.end ? formatDateTimeInput(event.end) : '';
  document.getElementById('color').value = event.color || '#bd3d3d';

  deleteBtn.style.display = 'inline-block';
  exportSection.style.display = 'inline-block';
  deleteBtn.onclick = function () {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
    deleteEvent(id);
    }
    };
  document.getElementById('eventModalLabel').textContent = 'Editar Evento';

  fadeIn("eventModal", 500, () => {
    eventModal.show();
  });
}

  // Event listeners para exportación
  document.getElementById('exportGoogle').addEventListener('click', function () {
    const eventData = getEventDataFromForm();
    if (validateExportData(eventData)) {
      exportToGoogleCalendar(eventData);
    }
  });

  document.getElementById('exportOutlook').addEventListener('click', function () {
    const eventData = getEventDataFromForm();
    if (validateExportData(eventData)) {
      exportToOutlook(eventData);
    }
  });

  document.getElementById('exportICS').addEventListener('click', function () {
    const eventData = getEventDataFromForm();
    if (validateExportData(eventData)) {
      const icsContent = generateICS(eventData);
      const filename = `evento-${new Date().toISOString().slice(0, 10)}.ics`;
      downloadICS(icsContent, filename);
      showNotification('Evento descargado correctamente', 'success');
    }
  });

  document.getElementById('copyLink').addEventListener('click', function () {
    const eventData = getEventDataFromForm();
    if (validateExportData(eventData)) {
      copyCalendarLink(eventData);
    }
  });

  // Función para obtener datos del formulario
  function getEventDataFromForm() {
    return {
      title: document.getElementById('title').value,
      start: document.getElementById('start').value,
      end: document.getElementById('end').value
    };
  }
  // Validar datos para exportación
  function validateExportData(eventData) {
    if (!eventData.title || !eventData.start) {
      showNotification('Complete el título y fecha de inicio para exportar', 'error');
      return false;
    }
    return true;
  }

});


// Funciones para exportación de eventos
function generateICS(eventData) {
  const { title, start, end, description, location } = eventData;

  // Formatear fechas para ICS
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//hacksw/handcal//NONSGML v1.0//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(new Date(start))}`,
    end ? `DTEND:${formatDate(new Date(end))}` : `DTEND:${formatDate(new Date(start))}`,
    `SUMMARY:${title}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line !== '').join('\n');

  return icsContent;
}

function downloadICS(icsContent, filename) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'evento.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToGoogleCalendar(eventData) {
  const { title, start, end, description, location } = eventData;

  const startDate = new Date(start).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const endDate = end ? new Date(end).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') : startDate;

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDate}/${endDate}`,
    sf: true,
    output: 'xml'
  });

  window.open(`${baseUrl}?${params.toString()}`, '_blank');
}

function exportToOutlook(eventData) {
  const { title, start, end, description, location } = eventData;

  const startDate = new Date(start).toISOString();
  const endDate = end ? new Date(end).toISOString() : startDate;

  const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
  const params = new URLSearchParams({
    subject: title,
    startdt: startDate,
    enddt: endDate
  });

  window.open(`${baseUrl}?${params.toString()}`, '_blank');
}

function copyCalendarLink(eventData) {
  const icsContent = generateICS(eventData);
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  navigator.clipboard.writeText(url).then(() => {
    showNotification('Enlace copiado al portapapeles', 'success');
  }).catch(err => {
    console.error('Error al copiar el enlace:', err);
    showNotification('Error al copiar el enlace', 'error');
  });
}

function showNotification(message, type = 'info') {
  // Crear notificación toast de Bootstrap
  const toastContainer = document.getElementById('toastContainer') || createToastContainer();

  const toastId = 'toast-' + Date.now();
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.id = toastId;

  toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

  toastContainer.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  // Remover el toast después de que se oculte
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  container.style.zIndex = '9999';
  document.body.appendChild(container);
  return container;
}

// Función para formatear fecha para input datetime-local
function formatDateTimeInput(date) {
  let getDate = new Date(date);
  return getDate.toISOString().slice(0, 16);
}



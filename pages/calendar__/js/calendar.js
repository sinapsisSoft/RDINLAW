document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const eventForm = document.getElementById('eventForm');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    
    // Inicializar el calendario
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: 'eventos.php?action=fetch',
        editable: true,
        selectable: true,
        selectMirror: true,
        eventClick: function(info) {
            // Cargar datos del evento en el modal
            document.getElementById('eventId').value = info.event.id;
            document.getElementById('title').value = info.event.title;
            document.getElementById('start').value = formatDateTimeForInput(info.event.start);
            document.getElementById('end').value = info.event.end ? formatDateTimeForInput(info.event.end) : '';
            document.getElementById('color').value = info.event.backgroundColor || '#bd3d3d';
            
            // Mostrar botón de eliminar
            deleteBtn.style.display = 'inline-block';
            deleteBtn.onclick = function() {
                if (confirm('¿Estás seguro de eliminar este evento?')) {
                    deleteEvent(info.event.id);
                }
            };
            
            document.getElementById('eventModalLabel').textContent = 'Editar Evento';
            eventModal.show();
        },
        select: function(info) {
            // Limpiar el formulario para nuevo evento
            eventForm.reset();
            document.getElementById('eventId').value = '';
            document.getElementById('start').value = formatDateTimeForInput(info.start);
            document.getElementById('end').value = formatDateTimeForInput(info.end);
            document.getElementById('color').value = '#bd3d3d';
            
            // Ocultar botón de eliminar
            deleteBtn.style.display = 'none';
            
            document.getElementById('eventModalLabel').textContent = 'Agregar Evento';
            eventModal.show();
        },
        eventDrop: function(info) {
            updateEvent(info.event);
        },
        eventResize: function(info) {
            updateEvent(info.event);
        }
    });
    
    calendar.render();
    
    // Función para formatear fecha para input datetime-local
    function formatDateTimeForInput(date) {
        return date.toISOString().slice(0, 16);
    }
    
    // Guardar evento
    saveBtn.addEventListener('click', function() {
        const eventId = document.getElementById('eventId').value;
        const eventData = {
            title: document.getElementById('title').value,
            start: document.getElementById('start').value,
            end: document.getElementById('end').value,
            color: document.getElementById('color').value
        };
        
        if (!eventData.title || !eventData.start) {
            alert('El título y la fecha de inicio son obligatorios');
            return;
        }
        
        if (eventId) {
            // Actualizar evento existente
            eventData.id = eventId;
            updateEvent(eventData);
        } else {
            // Crear nuevo evento
            createEvent(eventData);
        }
    });
    
    // Función para crear evento
    function createEvent(eventData) {
        fetch('eventos.php?action=create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                calendar.refetchEvents();
                eventModal.hide();
            } else {
                alert('Error al crear el evento: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al crear el evento');
        });
    }
    
    // Función para actualizar evento
    function updateEvent(eventData) {
        fetch('eventos.php?action=update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'success') {
                alert('Error al actualizar el evento: ' + data.message);
                calendar.refetchEvents(); // Recargar eventos para revertir cambios
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el evento');
            calendar.refetchEvents(); // Recargar eventos para revertir cambios
        });
    }
    
    // Función para eliminar evento
    function deleteEvent(eventId) {
        fetch('eventos.php?action=delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: eventId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                calendar.refetchEvents();
                eventModal.hide();
            } else {
                alert('Error al eliminar el evento: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el evento');
        });
    }
});
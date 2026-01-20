/**
 * Muestra una alerta de Bootstrap 5
 * @param {string} type - Tipo de alerta ('success', 'danger', 'warning', 'info', 'primary', 'secondary', 'light', 'dark')
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en milisegundos (0 = no se cierra automáticamente)
 * @param {string} position - Posición ('top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center')
 */
function showBootstrapAlert(type, message, duration = 5000, position = 'top-right') {
    // Crear el contenedor de alertas si no existe
    let alertsContainer = document.getElementById('bootstrap-alerts-container');
    
    if (!alertsContainer) {
        alertsContainer = document.createElement('div');
        alertsContainer.id = 'bootstrap-alerts-container';
        alertsContainer.style.position = 'fixed';
        alertsContainer.style.zIndex = '9999';
        document.body.appendChild(alertsContainer);
    }

    // Configurar posición
    const positionStyles = {
        'top-right': { top: '20px', right: '20px' },
        'top-left': { top: '20px', left: '20px' },
        'bottom-right': { bottom: '20px', right: '20px' },
        'bottom-left': { bottom: '20px', left: '20px' },
        'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
        'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' }
    };

    Object.assign(alertsContainer.style, positionStyles[position] || positionStyles['top-right']);

    // Crear la alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.style.width = '300px';
    alertDiv.style.marginBottom = '10px';
    alertDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    // Agregar icono según el tipo (opcional)
    const icons = {
        success: 'check-circle',
        danger: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle',
        primary: 'bell',
        secondary: 'envelope',
        light: 'lightbulb',
        dark: 'moon'
    };
    
    const icon = icons[type] || 'info-circle';
    alertDiv.innerHTML = `
        <i class="fas fa-${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Agregar a contenedor
    alertsContainer.appendChild(alertDiv);
    
    // Inicializar la alerta de Bootstrap
    const bsAlert = new bootstrap.Alert(alertDiv);
    
    // Cerrar automáticamente después de la duración especificada
    if (duration > 0) {
        setTimeout(() => {
            bsAlert.close();
        }, duration);
    }
    
    // Eliminar el elemento del DOM después de cerrar
    alertDiv.addEventListener('closed.bs.alert', () => {
        alertDiv.remove();
        // Eliminar el contenedor si no hay más alertas
        if (alertsContainer.children.length === 0) {
            alertsContainer.remove();
        }
    });
}
/**
 * Clase AlertManager - Maneja alertas de Bootstrap 5
 * 
 * @property {string} containerId - ID del contenedor donde se mostrarán las alertas
 * @property {number} defaultDuration - Duración predeterminada en milisegundos
 */
class AlertManager {
    /**
     * Constructor de la clase
     * @param {string} containerId - ID del contenedor para las alertas
     * @param {number} defaultDuration - Duración predeterminada en ms (opcional, default: 5000)
     */
    constructor(containerId = 'alert-container', defaultDuration = 5000) {
        this.containerId = containerId;
        this.defaultDuration = defaultDuration;
        this.ensureContainerExists();
    }

    /**
     * Crea el contenedor de alertas si no existe
     */
    ensureContainerExists() {
        let container = document.getElementById(this.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            container.className = 'position-fixed top-0 end-0 p-3';
            container.style.zIndex = '1100'; // Por encima del navbar de Bootstrap
            document.body.appendChild(container);
        }
    }

    /**
     * Muestra una alerta
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de alerta (primary, secondary, success, danger, warning, info, light, dark)
     * @param {number} duration - Duración en milisegundos (opcional)
     * @param {boolean} dismissible - Si la alerta puede ser cerrada (default: true)
     * @returns {string} ID de la alerta creada
     */
    showAlert(message, type = 'info', duration = null, dismissible = true) {
        const alertId = `alert-${Date.now()}`;
        const durationMs = duration || this.defaultDuration;
        
        const alertDiv = document.createElement('div');
        alertDiv.id = alertId;
        alertDiv.className = `alert alert-${type} ${dismissible ? 'alert-dismissible fade show' : ''}`;
        alertDiv.role = 'alert';
        alertDiv.style.transition = 'opacity 0.5s ease-in-out';
        
        if (dismissible) {
            alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        } else {
            alertDiv.textContent = message;
        }
        
        document.getElementById(this.containerId).appendChild(alertDiv);
        
        // Si tiene duración, programar el cierre automático
        if (durationMs > 0) {
            setTimeout(() => {
                this.hideAlert(alertId);
            }, durationMs);
        }
        
        return alertId;
    }

    /**
     * Oculta una alerta específica
     * @param {string} alertId - ID de la alerta a ocultar
     */
    hideAlert(alertId) {
        const alert = document.getElementById(alertId);
        if (alert) {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.classList.remove('show');
                alert.classList.add('hide');
                setTimeout(() => alert.remove(), 500);
            }, 500);
        }
    }

    /**
     * Oculta todas las alertas
     */
    hideAllAlerts() {
        const container = document.getElementById(this.containerId);
        if (container) {
            const alerts = container.querySelectorAll('.alert');
            alerts.forEach(alert => {
                this.hideAlert(alert.id);
            });
        }
    }

    // Métodos rápidos para tipos específicos de alertas
    showSuccess(message, duration = null, dismissible = true) {
        return this.showAlert(message, 'success', duration, dismissible);
    }

    showError(message, duration = null, dismissible = true) {
        return this.showAlert(message, 'danger', duration, dismissible);
    }

    showWarning(message, duration = null, dismissible = true) {
        return this.showAlert(message, 'warning', duration, dismissible);
    }

    showInfo(message, duration = null, dismissible = true) {
        return this.showAlert(message, 'info', duration, dismissible);
    }
}

// Uso básico:
// const alertManager = new AlertManager();
// alertManager.showSuccess('Operación completada con éxito', 3000);
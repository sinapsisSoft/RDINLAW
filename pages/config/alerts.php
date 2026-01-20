<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alert Manager Demo</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding: 20px;
        }
        .demo-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }
        .custom-controls {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="mb-4">Alert Manager Demo</h1>
        
        <div class="demo-buttons">
            <button class="btn btn-success" id="btnSuccess">Mostrar Éxito</button>
            <button class="btn btn-danger" id="btnError">Mostrar Error</button>
            <button class="btn btn-warning" id="btnWarning">Mostrar Advertencia</button>
            <button class="btn btn-info" id="btnInfo">Mostrar Información</button>
            <button class="btn btn-primary" id="btnCustom">Alerta Personalizada</button>
            <button class="btn btn-secondary" id="btnHideAll">Ocultar Todas</button>
        </div>
        
        <div class="custom-controls">
            <h4>Control Personalizado</h4>
            <div class="mb-3">
                <label for="alertType" class="form-label">Tipo de Alerta</label>
                <select class="form-select" id="alertType">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="success" selected>Success</option>
                    <option value="danger">Danger</option>
                    <option value="warning">Warning</option>
                    <option value="info">Info</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="alertMessage" class="form-label">Mensaje</label>
                <input type="text" class="form-control" id="alertMessage" value="Este es un mensaje de ejemplo">
            </div>
            <div class="mb-3">
                <label for="alertDuration" class="form-label">Duración (ms)</label>
                <input type="number" class="form-control" id="alertDuration" value="3000">
            </div>
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="alertDismissible" checked>
                <label class="form-check-label" for="alertDismissible">
                    ¿Permitir cerrar?
                </label>
            </div>
            <button class="btn btn-primary" id="btnShowCustom">Mostrar Alerta</button>
        </div>
    </div>

    <!-- Bootstrap 5 JS Bundle con Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Nuestra clase AlertManager -->
    <script>
        class AlertManager {
            constructor(containerId = 'alert-container', defaultDuration = 5000) {
                this.containerId = containerId;
                this.defaultDuration = defaultDuration;
                this.ensureContainerExists();
            }

            ensureContainerExists() {
                let container = document.getElementById(this.containerId);
                if (!container) {
                    container = document.createElement('div');
                    container.id = this.containerId;
                    container.className = 'position-fixed top-0 end-0 p-3';
                    container.style.zIndex = '1100';
                    document.body.appendChild(container);
                }
            }

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
                
                if (durationMs > 0) {
                    setTimeout(() => {
                        this.hideAlert(alertId);
                    }, durationMs);
                }
                
                return alertId;
            }

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

            hideAllAlerts() {
                const container = document.getElementById(this.containerId);
                if (container) {
                    const alerts = container.querySelectorAll('.alert');
                    alerts.forEach(alert => {
                        this.hideAlert(alert.id);
                    });
                }
            }

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

        // Uso de la clase
        const alertManager = new AlertManager('alert-container', 4000);

        // Event listeners para los botones de ejemplo
        document.getElementById('btnSuccess').addEventListener('click', () => {
            alertManager.showSuccess('¡Operación completada con éxito!');
        });

        document.getElementById('btnError').addEventListener('click', () => {
            alertManager.showError('¡Error! No se pudo completar la operación.');
        });

        document.getElementById('btnWarning').addEventListener('click', () => {
            alertManager.showWarning('Advertencia: Esto puede afectar el sistema.');
        });

        document.getElementById('btnInfo').addEventListener('click', () => {
            alertManager.showInfo('Información: Nuevos datos disponibles.');
        });

        document.getElementById('btnCustom').addEventListener('click', () => {
            alertManager.showAlert(
                'Alerta personalizada con configuración especial',
                'primary',
                5000,
                false
            );
        });

        document.getElementById('btnHideAll').addEventListener('click', () => {
            alertManager.hideAllAlerts();
        });

        // Control personalizado
        document.getElementById('btnShowCustom').addEventListener('click', () => {
            const type = document.getElementById('alertType').value;
            const message = document.getElementById('alertMessage').value;
            const duration = parseInt(document.getElementById('alertDuration').value);
            const dismissible = document.getElementById('alertDismissible').checked;
            
            alertManager.showAlert(message, type, duration, dismissible);
        });
    </script>
</body>
</html>
<!-- Modal para agregar/editar eventos -->
<div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="eventModalLabel">Agregar Evento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="eventForm">
                    <input type="hidden" id="eventId">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="title" class="form-label">Título del Evento *</label>
                                <input type="text" class="form-control" id="title" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="color" class="form-label">Color del Evento</label>
                                <input type="color" class="form-control form-control-color" id="color" value="#bd3d3d" title="Elige un color">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="start" class="form-label">Fecha y Hora de Inicio *</label>
                                <input type="datetime-local" class="form-control" id="start" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="end" class="form-label">Fecha y Hora de Fin</label>
                                <input type="datetime-local" class="form-control" id="end">
                            </div>
                        </div>
                    </div>
                </form>
                
                <!-- Sección de exportación -->
                <div class="export-section mt-4 p-3 border rounded" id="export-section">
                    <h6 class="mb-3">Exportar evento:</h6>
                    <div class="d-flex flex-wrap gap-2">
                        <button type="button" class="btn btn-outline-primary btn-sm" id="exportGoogle">
                            <i class="bi bi-google"></i> Google Calendar
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm" id="exportOutlook">
                            <i class="bi bi-microsoft"></i> Outlook
                        </button>
                        <button type="button" class="btn btn-outline-success btn-sm" id="exportICS">
                            <i class="bi bi-download"></i> Descargar .ICS
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-sm" id="copyLink">
                            <i class="bi bi-link-45deg"></i> Copiar enlace
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-danger" id="deleteBtn" style="display: none;">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
                <button type="button" class="btn btn-primary" id="saveBtn">
                    <i class="bi bi-save"></i> Guardar
                </button>
            </div>
        </div>
    </div>
</div>
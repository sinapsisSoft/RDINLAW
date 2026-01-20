<!-- Modal -->
<div class="modal fade" id="modalProcess" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header  text-white header-app">
        <h5 class="modal-title" id="modalProcessLabel">Detalles del Evento</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="procesoForm">
          <input type="hidden" name="id" id="id" value="" readonly>
          <div class=" form-section">
            <h5>Datos Básicos</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="title" class="form-label">Evento</label>
                  <input type="text" class="form-control" id="title" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="color" class="form-label">Etiqueta</label>
                  <input type="color" class="form-control" id="color" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="start" class="form-label">Fecha Inicio</label>
                  <input type="text" class="form-control" id="start" value="" readonly>
                </div>
              </div>
                <div class="mb-3">
                  <label for="end" class="form-label">Fecha Fin</label>
                  <input type="text" class="form-control" id="end" value="" readonly>
                </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
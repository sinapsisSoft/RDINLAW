<!-- Modal -->
<div class="modal fade" id="modalRequest" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header  text-white header-app">
        <h5 class="modal-title" id="modalRequestLabel">Solicitudes</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="requestsForm">
          <!-- Sección 1: Información básica -->
          <input type="hidden" name="Req_id" id="Req_id" value="0">
          <input id="Stat_id" value="12" type="hidden">
          <input type="hidden" id="Act_observation">
          <div class=" form-section">
          <h5>Datos Básicos</h5>
          <div class="row g-3">
            <div class="col-md-12">
              <div class="mb-3">
                <label for="Req_subject" class="form-label">Asunto</label>
                <input type="text" class="form-control" id="Req_subject" name="Req_subject" value="" required>
              </div>

            </div>

          </div>
      </div>


      <div class="form-section">
        <h5>Detalles Adicionales</h5>
        <div class="mb-3">
          <label for="Req_message" class="form-label"> Mensaje: </label>
          <textarea class="form-control" id="Req_message" name="Req_message" rows="3" required></textarea>
        </div>

      </div>

      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" title="Cerrar Modal" data-bs-dismiss="modal">Cerrar</button>
      <button type="submit" form="requestsForm" title="Enviar Enlace" class="btn btn-primary" style="padding: 2px; padding-left:1px;" id="sendResetLink">
        <lord-icon class="lord-icon"
          style="width: 30px;height: 30px; position: relative;left: 0pc;top: 0.1pc;"
          src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-solid-161-trending-flat-hover-ternd-flat-4.json"
          trigger="hover"
          stroke="light"
          state="hover-pinch"
          colors="primary:#FFFFFF,secondary:#b4b4b4"
          href="index.html">
        </lord-icon><strong style="bottom: 6px;position: relative; padding-left: 6px;padding-right: 6px;">Enviar Solicitud</strong>
      </button>
    </div>
  </div>
</div>
</div>
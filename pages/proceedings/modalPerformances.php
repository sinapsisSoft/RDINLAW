<!-- Modal -->
<div class="modal fade" id="modalPerformances" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header  text-white header-app">
        <h5 class="modal-title" id="modalPerformancesLabel">Detalles del Actuaciones</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTablePerformances" class="table table-striped table-bordered" style="width:100%" data-order='[[ 1, "asc" ]]'>
          <thead class="table-dark">
            <tr>
              <th>Descripción </th>
              <th>Fecha </th>
              <th>Fecha Inicial</th>
              <th>Fecha Final</th>
              <th>Ubicación</th>
              <th>Tipo</th>
              <th>Notificación</th>
              <th>Documento Adjunto</th>
            </tr>
          </thead>

          <tbody>

          </tbody>
          <tfoot>
            <tr>
              <th>Descripción </th>
              <th>Fecha </th>
              <th>Fecha Inicial</th>
              <th>Fecha Final</th>
              <th>Ubicación</th>
              <th>Tipo</th>
              <th>Notificación</th>
              <th>Documento Adjunto</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="modal-footer">
        <div class="d-flex gap-2 position-absolute bottom-1 start-0">
        </div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
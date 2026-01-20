<!-- Modal -->
<div class="modal fade" id="modalRequests" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header  text-white header-app">
        <h5 class="modal-title" id="modalRequestsLabel">Detalles del Solicitudes</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableRequests" class="table table-striped table-bordered" style="width:100%" data-order='[[ 1, "asc" ]]'>
          <thead class="table-dark">
            <tr>
              <th># </th>
              <th>Observación </th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>

          </tbody>
          <tfoot>
            <tr>
              <th># </th>
              <th>Observación </th>
              <th>Fecha</th>
              <th>Estado</th>
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
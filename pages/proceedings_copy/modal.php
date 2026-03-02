<!-- Modal -->
<div class="modal fade" id="modalProcess" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header  text-white header-app">
        <h5 class="modal-title" id="modalProcessLabel">Detalles del Proceso</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="procesoForm">
          <!-- Sección 1: Información básica -->
          <div class="form-section">
            <h5>Datos Básicos</h5>

            <div class="row g-3">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="Proc_building" class="form-label">Edificio/Juzgado</label>
                  <input type="text" class="form-control" id="Proc_building" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="Proc_office" class="form-label">Despacho</label>
                  <input type="text" class="form-control" id="Proc_office" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="Proc_filing" class="form-label">Radicado</label>
                  <input type="text" class="form-control" id="Proc_filing" value="" readonly>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="Proc_consecutive" class="form-label">Consecutivo</label>
                  <input type="text" class="form-control" id="Proc_consecutive" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="Proc_phase" class="form-label">Fase</label>
                  <input type="text" class="form-control" id="Proc_phase" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="Ptype_name" class="form-label">Tipo de Proceso</label>
                  <input type="text" class="form-control" id="Ptype_name" value="" readonly>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección 2: Partes involucradas -->
          <div class="form-section">
            <h5>Partes Involucradas</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="Proc_attorney" class="form-label">Apoderado</label>
                  <input type="text" class="form-control" id="Proc_attorney" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="Proc_plaintiff" class="form-label">Demandante</label>
                  <input type="text" class="form-control" id="Proc_plaintiff" value="" readonly>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="Proc_defendant" class="form-label">Demandado</label>
                  <input type="text" class="form-control" id="Proc_defendant" value="" readonly>
                </div>
                <div class="mb-3">
                  <label for="Proc_officeEmail" class="form-label">Correo del Despacho</label>
                  <input type="text" class="form-control" id="Proc_officeEmail" value="" readonly>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección 3: Información geográfica/jurídica -->
          <div class="form-section">
            <h5>Ubicación y Área Jurídica</h5>
            <div class="row g-3">
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="Proc_department" class="form-label">Departamento</label>
                  <input type="text" class="form-control" id="Proc_department" value="" readonly>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="Proc_city" class="form-label">Ciudad</label>
                  <input type="text" class="form-control" id="Proc_city" value="" readonly>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="Proc_juridistic" class="form-label">Tipo Jurídico</label>
                  <input type="text" class="form-control" id="Proc_juridistic" value="" readonly>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="Proc_area" class="form-label">Área</label>
                  <input type="text" class="form-control" id="Proc_area" value="" readonly>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="Proc_origin" class="form-label">Origen</label>
                  <input type="text" class="form-control" id="Proc_origin" value="" readonly>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección 4: Contenido e historial -->
          <div class="form-section">
            <h5>Detalles Adicionales</h5>
            <div class="mb-3">
              <label for="Proc_content" class="form-label">Contenido</label>
              <textarea class="form-control" id="Proc_content" rows="3" readonly></textarea>
            </div>
            <div class="mb-3">
              <label for="Proc_history" class="form-label">Historial</label>
              <textarea class="form-control" id="Proc_history" rows="3" readonly></textarea>
            </div>
          </div>

        </form>
      </div>
      <div class="modal-footer">
        <div class="d-flex gap-2 position-absolute bottom-1 start-0">
          <!-- Dropdown para Exportar -->
          <div class="dropdown ">
            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownExport" data-bs-toggle="dropdown">
                <i class="fas fa-download"></i> Exportar
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownExport">
              <li><a class="dropdown-item" href="#" onclick="exportToPdf()"><i class="fas fa-file-pdf"></i> PDF</a></li>
              <li><a class="dropdown-item" href="#" onclick="exportToExcel()"><i class="fas fa-file-excel"></i> Excel</a></li>
              <li><a class="dropdown-item" href="#" onclick="exportToCSV()"><i class="fas fa-file-csv"></i> CSV</a></li>
            </ul>
          </div>
        </div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
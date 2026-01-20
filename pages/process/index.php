<?php
require_once '../../config/SessionManager.php';
require_once '../../config/config.php';
// Iniciar sesión
SessionManager::start();
$var_session = SessionManager::get(SESSION_KEY);
if ($var_session === null) {
  // Si no hay sesión, redirigir a login
  header("Location: ../auth");
  exit;
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <title>Dendrite Process - RDL </title>
  <!--Styles and Icons-->
  <?php require_once '../assets/css/styles.php'; ?>
  <!--End Styles and Icons-->
  <link rel="stylesheet" href="css/process.css" />

</head>

<body class="sb-nav-fixed">
  <!-- Loading Screen -->
  <?php require_once '../loading/loading.php'; ?>
  <!--End Loading Screen-->

  <div style="display: none;" id="main-container">

    <!--navbar-->
    <?php require_once '../navbar/navbar.php'; ?>
    <!--End navbar-->

    <div id="layoutSidenav">
      <!--Slide bar-->
      <?php require_once '../sidebar/sidebar.php'; ?>

      <!--End slide bar-->
      <div id="layoutSidenav_content">
        <main>

          <div class="container-fluid px-4">
            <!--Page Heading-->
            <?php require_once 'heading.php'; ?>
            <!-- End Page Heading-->

            <div class="row">
              <!-- section basic data -->
              <?php require_once 'basicData.php'; ?>
              <!-- Basic Data Section -->
            </div>
          </div>
          <!--Report-->
          <section class="site-section-process card-filter">
            <div class="container">
              <form id="formSearchReport" class="col-12">
                <div class="row justify-content-md-center">
                  <div class="form-group col-10">
                    <label for="reportSelected" class="col-lg-2 col-md-2 col-sm-2 col-3">Reporte</label>
                    <select name="reportSelected" id="reportSelected" class="custom-select col-lg-9 col-md-9 col-sm-9 col-8" onChange="changeReport(this.id); return false;">
                      <option value="">Seleccione</option>
                      <option value="0">Detalle de los procesos con la última actuación</option>
                      <option value="1">Todas las actuaciones en un rango de fecha</option>
                    </select>
                  </div>
                  <div id="divDateIni" class="form-group row col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-none">
                    <label for="DateIni" class="col-4">Fecha Inicial</label>
                    <input type="date" class="form-control col-7" id="DateIni">
                  </div>
                  <div id="divDateFin" class="form-group row col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 d-none">
                    <label for="DateFin" class="col-4">Fecha Final</label>
                    <input type="date" class="form-control col-7" id="DateFin">
                  </div>
                  <div class="col-lg-1 col-md-2 col-sm-auto col-2">
                    <button id="searchReport" type="submit" class="btn btn-primary mb-2" onclick="return false;" disabled><i class="icon-search"></i></button>
                  </div>
                </div>
              </form>
              <div id="divExcel" class="row justify-content-end d-none">
                <div class="col-auto">
                  <a href="#" class="btn btn-success" id="btnExcelReport">Descargar en excel <i class="fas fa-plus"></i></a>
                </div>
              </div>
            </div>
            <div class="container card-filter table-responsive table-process my-custom-scrollbar">
              <table class="table table-hover table-shadow" data-order='[[ 1, "desc" ]]' data-page-length='25' id="tableReport" width="100%" cellspacing="0">
              </table>
            </div>
          </section>
          <!--End Content-->
          <!--Table-->
          <div class="container-fluid px-4 pt-2" style="display: none;" id="table-container">
            <div class="card mb-4">
              <div class="card-header">
                <a class="nav-link" style="display:contents" href="#">

                  <lord-icon class="lord-icon"
                    style="width: 30px; height: 30px;"
                    src="../assets/startbootstrap-sb-admin/assets/img/icons/json/wired-outline-970-video-conference-hover-pinch.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-pinch"
                    href="index.html"
                    colors="primary:#000000,secondary:#b4b4b4">
                  </lord-icon>
                </a>

                <strong style="line-height: 2;position: absolute;">Tabla de Procesos</strong>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="dataTableApp" class="table table-striped table-bordered" style="width:100%" data-order='[[ 1, "asc" ]]'>
                    <thead class="table-dark">
                      <tr>
                        <th># Interno</th>
                        <th>Edificio</th>
                        <th>Origen</th>
                        <th>Despacho</th>
                        <th>Autoriza</th>
                        <th>Radicado</th>
                        <th>Consecutivo</th>
                        <th>Apoderado</th>
                        <th>Demandante</th>
                        <th>Demandado</th>
                        <th>Departamento</th>
                        <th>Ciudad</th>
                        <th>Jurisdicción</th>
                        <th>Competencia</th>
                        <th>Tipo de proceso </th>
                        <th>Etapa Procesal</th>
                        <th>Contenido</th>
                        <th>Historial de radicados</th>
                        <th>Estado</th>
                      </tr>
                    </thead>

                    <tbody id="table_body">

                    </tbody>
                    <tfoot>
                      <tr>
                         <th># Interno</th>
                        <th>Edificio</th>
                        <th>Origen</th>
                        <th>Despacho</th>
                        <th>Autoriza</th>
                        <th>Radicado</th>
                        <th>Consecutivo</th>
                        <th>Apoderado</th>
                        <th>Demandante</th>
                        <th>Demandado</th>
                        <th>Departamento</th>
                        <th>Ciudad</th>
                        <th>Jurisdicción</th>
                        <th>Competencia</th>
                        <th>Tipo de proceso </th>
                        <th>Etapa Procesal</th>
                        <th>Contenido</th>
                        <th>Historial de radicados</th>
                        <th>Estado</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!--End Table-->
       

        </main>
        <!--End Main Content-->
        <?php require_once '../footer/footer.php'; ?>

      </div>
    </div>
  </div>
  <!--Modal Detail Process-->
  <?php require_once 'modal.php'; ?>
  <!--End-->
  <!--Modal Detail Performaces-->
  <?php require_once 'modalPerformances.php'; ?>
  <!--End -->
  <!--Script App-->
  <?php require_once '../assets/js/script.php'; ?>
  <!--End Script App-->
  <!--Scripts page -->
  <script src="js/process.js"></script>
  <!--End Scripts-->
</body>

</html>
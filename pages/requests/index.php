<?php
require_once '../../config/SessionManager.php';
require_once '../../config/config.php';
// Iniciar sesión
SessionManager::start();
$var_session = SessionManager::get(SESSION_KEY);
var_dump($var_session);
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
  <link rel="stylesheet" href="css/requests.css" />

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
          <!--Table-->
          <div class="container-fluid px-4 pt-2" style="display: none;" id="table-container">
            <div class="card mb-4">
              <div class="card-header">
                <a class="nav-link" style="display:contents" href="#">

                  <lord-icon class="lord-icon"
                    style="width: 30px; height: 30px;"
                    src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-47-chat-hover-chat.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-pinch"
                    colors="primary:#000000,secondary:#b4b4b4">
                  </lord-icon>
                </a>

                <strong style="line-height: 2;position: absolute;">Tabla de Solicitudes </strong>
                <div class="position-absolute top-0 end-0 m-1">
                  <a href="#modal" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalRequest"><lord-icon class="lord-icon"
                      style="width: 20px; height: 20px;"
                      src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-40-add-card-hover-add-card.json"
                      trigger="hover"
                      stroke="light"
                      state="hover-pinch"
                      colors="primary:#ffffff,secondary:#b4b4b4">
                    </lord-icon></a>
                </div>
              </div>

              <div class="card-body">
                <div class="table-responsive">
                  <table id="dataTableApp" class="table table-striped table-bordered" style="width:100%" data-order='[[ 1, "asc" ]]'>
                    <thead class="table-dark">
                      <tr>
                        <th># Id</th>
                        <th>Asunto</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>

                    <tbody id="table_body">

                    </tbody>
                    <tfoot>
                      <tr>
                        <th># Id</th>
                        <th>Asunto</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
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

  <!--Modal Detail Request-->
  <?php require_once 'modalRequests.php'; ?>
  <!--End -->

  <!--Modal -->
  <?php require_once 'modal.php'; ?>
  <!--End -->
  <!--Script App-->
  <?php require_once '../assets/js/script.php'; ?>
  <!--End Script App-->
  <!--Scripts page -->
  <script src="js/requests.js"></script>
  <!--End Scripts-->
</body>

</html>
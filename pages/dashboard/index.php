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

</head>

<body class="sb-nav-fixed">
  <!-- Loading Screen -->
  <?php require_once '../loading/loading.php'; ?>
  <!--End Loading Screen-->
  <div style="display: none;" id="main-container">
    <!--navbar-->
    <?php include '../navbar/navbar.php'; ?>
    <!--End navbar-->

    <div id="layoutSidenav">
      <!--Slide bar-->
      <?php include '../sidebar/sidebar.php'; ?>
      <!--End slide bar-->
      <div id="layoutSidenav_content">
        <main>
          <div class="container-fluid px-4">
            <div class="d-flex ">
              <a class="nav-link" style="display:contents" href="#">
                <h1 class="mt-4">Panel de Control</h1>
                <lord-icon class="lord-icon mt-4"
                  style="width: 48px; height: 48px;"
                  src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-33-speed-hover-speed.json"
                  trigger="hover"
                  stroke="light"
                  state="hover-pinch"
                  href="index.html"
                  colors="primary:#000000,secondary:#b4b4b4">
                </lord-icon>
              </a>
            </div>
            <ol class="breadcrumb mb-4">
              <li class="breadcrumb-item active">Panel de Control</li>
            </ol>
            <div class="row">
              <div class="col-xl-3 col-md-6">
                <div class="card bg-app-secondary text-white mb-4">
                  <div class="card-body">
                    <p class="card-text">Expedientes</p>
                    <h5 class="card-title">TOTAL 239 </h5>

                  </div>
                  <div class="card-footer  d-flex align-items-center justify-content-between header-app">
                    <a class="nav-link" style="display:contents" href="../proceedings">
                      Ir al Módulo
                      <div class="sb-nav-link-icon">
                        <lord-icon class="lord-icon"
                          style="width: 48px; height: 48px;"
                          src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-44-folder-hover-folder.json"
                          trigger="hover"
                          stroke="light"
                          state="hover-pinch"
                          href="index.html"
                          colors="primary:#FFFFFF,secondary:#b4b4b4">
                        </lord-icon>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card bg-app-secondary text-white mb-4">
                  <div class="card-body">
                    <p class="card-text">Solicitudes</p>
                    <h5 class="card-title">TOTAL 16</h5>
                  </div>
                  <div class="card-footer d-flex align-items-center justify-content-between header-app">
                    <a class="nav-link" style="display:contents" href="../requests">
                      Ir al Módulo
                      <div class="sb-nav-link-icon">
                        <lord-icon class="lord-icon"
                          style="width: 48px; height: 48px;"
                          src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-47-chat-hover-chat.json"
                          trigger="hover"
                          stroke="light"
                          state="hover-pinch"
                          href="index.html"
                          colors="primary:#FFFFFF,secondary:#b4b4b4">
                        </lord-icon>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card bg-app-secondary text-white mb-4">
                  <div class="card-body">
                    <p class="card-text">Procesos</p>
                    <h5 class="card-title">TOTAL PROCESOS</h5>
                  </div>
                  <div class="card-footer d-flex align-items-center justify-content-between header-app">
                    <a class="nav-link" style="display:contents" href="../process">
                      Ir al Módulo
                      <div class="sb-nav-link-icon">
                        <lord-icon class="lord-icon"
                          style="width: 48px; height: 48px;"
                          src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-18-autorenew-hover-autorenew.json"
                          trigger="hover"
                          stroke="light"
                          state="hover-pinch"
                          href="index.html"
                          colors="primary:#FFFFFF,secondary:#b4b4b4">
                        </lord-icon>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card bg-app-secondary text-white mb-4">
                  <div class="card-body">
                    <p class="card-text">Calendario</p>
                    <h5 class="card-title">TOTAL 23</h5>
                  </div>
                  <div class="card-footer d-flex align-items-center justify-content-between header-app">
                    <a class="nav-link" style="display:contents" href="../calendar/">
                      Ir al Módulo
                      <div class="sb-nav-link-icon">
                        <lord-icon class="lord-icon"
                          style="width: 48px; height: 48px;"
                          src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-23-calendar-hover-calendar.json"
                          trigger="hover"
                          stroke="light"
                          state="hover-pinch"
                          href="index.html"
                          colors="primary:#FFFFFF,secondary:#b4b4b4">
                        </lord-icon>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <?php include '../footer/footer.php'; ?>
      </div>
    </div>
  </div>
  <!--Script App-->
  <?php require_once '../assets/js/script.php'; ?>
  <!--End Script App-->
  <!--Scripts page -->
  <script src="js/dashboard.js"></script>
  <!--End Scripts-->

</body>

</html>
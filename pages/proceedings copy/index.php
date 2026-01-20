<?php
session_start();

if (!isset($_SESSION['User'])) {
  header("../login/login.php");
} else {
  $var_session = $_SESSION['User'];
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
          <div class="d-flex ">
            <a class="nav-link" style="display:contents" href="#">
              <h1 class="mt-4">Procesos</h1>
              <lord-icon class="lord-icon mt-4"
                style="width: 48px; height: 48px;"
                src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-18-autorenew-hover-autorenew.json"
                trigger="hover"
                stroke="light"
                state="hover-pinch"
                href="index.html"
                colors="primary:#000000,secondary:#b4b4b4">
              </lord-icon>
            </a>
          </div>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active"><a href="../dashboard">Panel de Control</a>/Procesos</li>
          </ol>
          <div class="row">


          </div>
        </div>
      </main>
      <?php include '../footer/footer.php'; ?>
    </div>
  </div>

  <!--Styles and Icons-->
  <?php require_once '../assets/js/script.php'; ?>
  <!--End Styles and Icons-->
</body>

</html>
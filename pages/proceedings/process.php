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
  <link rel="shortcut icon" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon.ico">
  <link rel="icon" type="image/png" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon-16x16.png" sizes="16x16" />
  <link rel="icon" type="image/png" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon-96x96.png" sizes="96x96">
  <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
  <link href="../assets/startbootstrap-sb-admin/css/styles.css" rel="stylesheet" />
  <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
  <script src="https://cdn.lordicon.com/lordicon.js"></script>
  <style>
    .lord-icon {
      width: 20px;
      height: 20px;
      padding-top: 3px;
      cursor: pointer;

    }
  </style>
</head>

<body class="sb-nav-fixed">

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
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  <script src="../assets/startbootstrap-sb-admin/js/scripts.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
  <script src="../assets/startbootstrap-sb-admin/js/datatables-simple-demo.js"></script>
</body>

</html>
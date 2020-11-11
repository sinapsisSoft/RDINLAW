<?php
session_start();

if (!isset($_SESSION['User'])) {
  header("../login/login.php");
} else {
  $var_session = $_SESSION['User'];
}
?>
<!doctype html>
<html lang="en">

<head>
  <title>RDL - Seguimiento de expedientes</title>
  <link rel="icon" href="../../images/favicon1.ico">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
  <link rel="stylesheet" href="../../fonts/icomoon/style.css">

  <link rel="stylesheet" href="../../css/toast/toastr.css">
  <link rel="stylesheet" href="../../css/bootstrap.min.css">
  <link rel="stylesheet" href="../../css/jquery-ui.css">
  <link rel="stylesheet" href="../../css/owl.carousel.min.css">
  <link rel="stylesheet" href="../../css/owl.theme.default.min.css">
  <link rel="stylesheet" href="../../css/owl.theme.default.min.css">
  <link rel="stylesheet" href="../../css/jquery.fancybox.min.css">
  <link rel="stylesheet" href="../../css/bootstrap-datepicker.css">
  <link rel="stylesheet" href="../../fonts/flaticon/font/flaticon.css">
  <link rel="stylesheet" href="../../fonts/icomoon/style.css">
  <link rel="stylesheet" href="../../css/aos.css">
  <link rel="stylesheet" href="../../css/style.css">
  <link rel="stylesheet" href="css/process.css">

</head>

<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
  <div class="loadPage" id="loadPage"></div>
  <div id="overlayer"></div>
  <div class="loader">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="site-wrap">
    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>


    <header class="site-navbar js-sticky-header site-navbar-target" role="banner">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 col-xl-2">
            <h1 class="mb-0 site-logo">
              <a href="../../index.html"><img src="../../images/logo-02.png" style="width: 150px;" alt=""></a>
            </h1>
          </div>
          <div class="col-12 col-md-10 d-none d-xl-block">
            <nav class="site-navigation position-relative text-right" role="navigation">
              <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li><a href="" data-placement="top" title="Crear nueva solicitud" data-toggle="modal" data-target="#requests">
                    <i class="flaticon-solicitud"></i>
                  </a></li>
                <li><a href="../login/login.php" id="loginbtn" data-toggle="tooltip" data-placement="top" title="Salir" onclick="closeSession()"><i class="flaticon-usuario-de-perfil"></i></a></li>
              </ul>
            </nav>
          </div>
          <div class="col-6 d-inline-block d-xl-none ml-md-0 py-3" style="position: relative; top: 3px;"><a href="#" class="site-menu-toggle js-menu-toggle float-right"><span class="icon-menu h3"></span></a></div>
        </div>
      </div>
    </header>
    <div class="site-blocks-cover overlay" style="background-image: url(../../images/hero_1.jpg);" data-aos="fade" id="home-section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 mt-lg-5 text-center">
            <div class="single-text owl-carousel">
              <div class="slide">
                <h1 class="text-uppercase" data-aos="fade-up">Seguimiento de expedientes</h1>
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">Encuentre aquí todos sus expediente y el detalle de cada uno de ellos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#records-section" class="mouse smoothscroll">
        <span class="mouse-icon">
          <span class="mouse-wheel"></span>
        </span>
      </a>
    </div>

    <section class="site-section-process bg-light" id="records-section">
      <div class="container">
        <div class="card">
          <div class="card-header">
            Datos básicos
          </div>
          <div class="card-body">
            <span id="Comp_id" hidden></span>
            <input id="User_id" hidden>
            <h5 id="labelName" class="card-title"></h5>
            <p class="card-text">
              <strong>NIT.: </strong><span id="User_identification"></span><br>
              <strong>Teléfono: </strong><span id="User_telephone"></span><br>
          </div>
        </div>
      </div>
    </section>
    <section class="site-section-process">
      <div class="container table-responsive table-process my-custom-scrollbar">
        <table class="table table-hover table-shadow" data-order='[[ 1, "desc" ]]' data-page-length='25' id="tableProcess" width="100%" cellspacing="0">
        </table>
      </div>
    </section>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-5 justify">
                <h1 class="mb-0 site-logo"><img src="../../images/logo-02.png" style="width: 60%;" alt=""></h1>
                <hr>
                <p>Novedosa firma de abogados especializada en el manejo, estudio e investigación íntegra del área jurídica, diseñada para brindar asesoría y blindaje legal a empresas y personas naturales.</p>
              </div>
              <div class="col-md-3 ml-auto">
                <h2 class="footer-heading mb-4">Accesos rápidos</h2>
                <ul class="list-unstyled">
                  <li><a href="index.html#about-section" class="smoothscroll">Nosotros</a></li>
                  <li><a href="index.html#services-section" class="smoothscroll">Servicios</a></li>
                  <li><a href="index.html#contact-section" class="smoothscroll">Contáctanos</a></li>
                </ul>
              </div>
              <div class="col-md-3 footer-social">
                <h2 class="footer-heading mb-4">Síguenos</h2>
                <a href="https://www.facebook.com/rdinlaw/" target="_blank" class="pl-0 pr-3"><span class="icon-facebook"></span></a>
                <!-- <a href="#" class="pl-3 pr-3"><span class="icon-twitter"></span></a>
                                <a href="#" class="pl-3 pr-3"><span class="icon-instagram"></span></a>
                                <a href="#" class="pl-3 pr-3"><span class="icon-linkedin"></span></a> -->
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-5 mt-5 text-center">
          <div class="col-md-12">
            <div class="border-top pt-5">
              <p>Copyright &copy;
                <script>
                  document.write(new Date().getFullYear());
                </script> All rights reserved | <a href="https://www.sinapsistechnologies.com.co" target="_blank">Sinapsis Technologies</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <a href="#" data-toggle="tooltip" data-placement="left" title="Inicio" class="back-to-top"><i class="flaticon-flecha-arriba"></i></a>
  </div>
  <!-- .site-wrap -->

  <!-- Detail modal -->
  <div class="modal fade" id="perfomance" tabindex="-1" aria-labelledby="perfomanceLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="perfomanceModalLabel">Detalle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body my-custom-scrollbar">
            <div class="container table-responsive table-performance">
              <table class="table table-hover table-shadow" data-order='[[ 1, "desc" ]]' data-page-length='25' id="tablePerformance" width="100%" cellspacing="0">
              </table>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>      
    </div>
  </div>
  <!-- Fin Detail Modal -->

  <!-- Requests Modal -->
  <div class="modal fade" id="requests" tabindex="-1" aria-labelledby="requestsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="requestsModalLabel">Nueva solicitud</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="requestsForm" onsubmit="sendMail(this.id); return false">
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Asunto:</label>
              <input type="text" class="form-control" id="recipient-name" required>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Mensaje:</label>
              <textarea class="form-control" rows="6" id="message-text" required></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Requests Modal -->

  <script src="../../js/jquery-3.5.1.min.js"></script>
  <script src="../../js/jquery-ui.js"></script>
  <script src="../../js/popper.min.js"></script>
  <script src="../../js/bootstrap.min.js"></script>
  <script src="../../js/owl.carousel.min.js"></script>
  <script src="../../js/jquery.countdown.min.js"></script>
  <script src="../../js/jquery.easing.1.3.js"></script>
  <script src="../../js/aos.js"></script>
  <script src="../../js/jquery.fancybox.js"></script>
  <script src="../../js/jquery.sticky.js"></script>
  <script src="../../js/isotope.pkgd.min.js"></script>
  <script async src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

  <script src="../../js/main.js"></script>
  <script src="../../js/properties.js"></script>
  <script src="js/process.js"></script>
  <?php include("../../php/viewHtml/jsLinks.php") ?>

  <script>
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    });
  </script>
  <script>
    window.onload = loadGeneralView();
    setGeneralInformation();
  </script>
</body>

</html>
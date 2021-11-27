<?php
session_start();

if (!isset($_SESSION['User'])) {
  header("../login/login.php");
} else {
  $var_session = $_SESSION['User'];
}
?>
<!doctype html>
<html lang="es">

<head>
  <title>RDL - Seguimiento de expedientes</title>
  <link rel="icon" href="../../images/favicon3.ico">
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
  <link rel="stylesheet" href="css/request.css">
  <link rel='stylesheet' href='../../vendor/fullcalendar/css/main.css' />

</head>

<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
  <div class="loadPage" id="loadPage"></div>
  <div id="overlayer"></div>
  <div class="loader">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!-- Guía de uso -->
  <div class="actionLeft">
    <div class="cont-float" data-toggle="tooltip" data-placement="top" title="Revise la guía rápida de uso de la plataforma">
      <a href="https://ior.ad/7nXD" target="_blank" title="Guía de apoyo"><i class="flaticon-signo-de-exclamacion-dentro-de-un-circulo"></i></a>
    </div>
  </div>
  <!-- Fin guía de uso -->
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
              <a href="../../index.html"><img src="../../images/logo-03.png" style="width: 150px; margin-top: 26px;" alt=""></a>
            </h1>
          </div>
          <div class="col-12 col-md-10 d-none d-xl-block">
            <nav class="site-navigation position-relative text-right" role="navigation">
              <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li data-toggle="tooltip" data-placement="top" title="Nueva Solicitud"><a href="" data-placement="top" title="Crear nueva solicitud" data-toggle="modal" data-target="#requests">
                    <i class="flaticon-solicitud"></i> Nueva solicitud
                  </a></li>
                <li><a href="../../php/class/closeSession.php" id="loginbtn" data-toggle="tooltip" data-placement="top" title="Salir" onclick="closeSession()"><i class="flaticon-usuario-de-perfil"></i> Cerrar Sesión</a></li>
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
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">Encuentre aquí todos sus expedientes y el detalle de cada uno de ellos.</p>
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
            <div class="row d-flex justify-content-between">
              <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                <span id="Comp_id" hidden=""></span>
                <input type="hidden" id="User_id">
                <input type="hidden" id="Client_id">
                <h5 id="labelName" class="card-title"></h5>
                <p class="card-text">
                  <strong>NIT.: </strong><span id="User_identification"></span><br>
                  <strong>E-mail del usuario actual: </strong><span id="User_email"></span><br>
                </p>
              </div>
              <div class="col-auto" data-toggle="tooltip" data-placement="top" title="Revisar calendario">
                <button style="color: darkcyan; cursor: pointer;background-color: transparent; border: none;" onclick="getClientCalendar()"><i class="icon-calendar" style="font-size: 62px;"></i></button>
              </div>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-light bg-light card-filter" style="text-align: center;">
          <div style="width: 100%;">
            <button class="btn btn-warning mb-2 mb-sm-2 mr-lg-4 mb-md-3 mr-md-2" data-toggle="collapse" href="#processCollapse" data-parent="#selector" role="button" aria-expanded="true" aria-controls="processCollapse">Seguimiento de expedientes</button>
            <button class="btn btn-info mb-2 mb-sm-2 mr-lg-4 mb-md-3 mr-md-2" data-toggle="collapse" href="#requestCollapse" data-parent="#selector" role="button" aria-expanded="false" aria-controls="requestCollapse">Seguimiento de solicitudes</button>
            <button class="btn btn-warning mb-2 mb-sm-2 mr-lg-4 mb-md-3 mr-md-2" data-toggle="collapse" href="#reportsCollapse" data-parent="#selector" role="button" aria-expanded="false" aria-controls="reportsCollapse">Reporte de Procesos/Actuaciones</button>
          </div>
        </nav>
    </section>
    <div id="selector">
      <div id="processCollapse" class="collapse show" data-parent="#selector">
        <section class="site-section-process bg-light" style="padding-top: 0;">
          <div class="container">
            <div class="card">
              <div class="card-header">
                Ordenamiento rápido
              </div>
              <div class="card-body">
                <select name="selectFilter" id="selectFilter" class="custom-select" onChange="filter(this.id); return false;">
                  <option value="0">Seleccione</option>
                  <option value="Proc_internConsec-0"># Interno de 0-9</option>
                  <option value="Proc_internConsec-1"># Interno de 9-0</option>
                  <option value="Proc_building-0">Edificio de A-Z</option>
                  <option value="Proc_building-1">Edificio de Z-A</option>
                  <option value="Proc_origin-0">Origen de A-Z</option>
                  <option value="Proc_origin-1">Origen de Z-A</option>
                  <option value="Proc_office-0">Despacho de 0-9</option>
                  <option value="Proc_office-1">Despacho de 9-0</option>
                  <option value="Proc_filing-0">Radicado de 0-9</option>
                  <option value="Proc_filing-1">Radicado de 9-0</option>
                  <option value="Proc_consecutive-0">Consecutivo de 0-9</option>
                  <option value="Proc_consecutive-1">Consecutivo de 9-0</option>
                  <option value="Proc_attorney-0">Apoderado de A-Z</option>
                  <option value="Proc_attorney-1">Apoderado de Z-A</option>
                  <option value="Proc_plaintiff-0">Demandante de A-Z</option>
                  <option value="Proc_plaintiff-1">Demandante de Z-A</option>
                  <option value="Proc_defendant-0">Demandado de A-Z</option>
                  <option value="Proc_defendant-1">Demandado de Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <section class="site-section-process card-filter">
          <div class="container">
            <div class="row">
              <form id="formSearchField" class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-7">
                <div class="form-row">
                  <div class="form-group col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <input type="text" class="form-control mb-2 mr-sm-2" id="Name" placeholder="Búsqueda general">
                  </div>
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <button type="submit" class="btn btn-primary mb-2" onclick="searchProcessField(event);return false"><i class="icon-search"></i></button>
                  </div>
                </div>
              </form>
              <div class="col-auto">
                <label for="Proc_active" class="col-form-label">Procesos activos:</label>
                <label id="Proc_active"></label>
              </div>
              <div class="col-auto">
                <a href="#" class="btn btn-success" id="btnExcel" onclick="fnExcelReport('tableProcess', this.id, 0);">Descargar en excel <i class="fas fa-plus"></i></a>
              </div>
            </div>
          </div>
          <div class="container mt-3">

          </div>
          <div class="container card-filter table-responsive table-process my-custom-scrollbar">
            <table class="table table-hover table-shadow" data-order='[[ 1, "desc" ]]' data-page-length='25' id="tableProcess" width="100%" cellspacing="0">
            </table>
          </div>
        </section>
      </div>
      <div id="requestCollapse" class="collapse" data-parent="#selector">
        <section class="site-section-process card-filter">
          <div class="container">
            <div class="row justify-content-end">
              <div class="col-auto">
                <a href="#" class="btn btn-primary btn-success" data-toggle="modal" data-target="#requests">Añadir <i class="fas fa-plus"></i></a>
              </div>
            </div>
          </div>
          <div class="container card-filter table-responsive table-process my-custom-scrollbar">
            <table class="table table-hover table-shadow" data-order='[[ 1, "desc" ]]' data-page-length='25' id="tableRequest" width="100%" cellspacing="0">
            </table>
          </div>
        </section>
      </div>
      <div id="reportsCollapse" class="collapse" data-parent="#selector">
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
      </div>
    </div>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-5 justify">
                <h1 class="mb-0 site-logo"><img src="../../images/logo-04.png" style="width: 90%;" alt=""></h1>
              </div>
              <div class="col-md-3 ml-auto">
                <h2 class="footer-heading mb-4">Accesos rápidos</h2>
                <ul class="list-unstyled">
                  <li><a href="../../index.html#about-section" class="smoothscroll" target="_blank">Nosotros</a></li>
                  <li><a href="../../index.html#services-section" class="smoothscroll" target="_blank">Servicios</a></li>
                  <li><a href="../../index.html#contact-section" class="smoothscroll" target="_blank">Contáctanos</a></li>
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
          <h5 class="modal-title" id="perfomanceModalLabel">Actuaciones</h5>
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

  <!-- Process Detail modal -->
  <div class="modal fade" id="detailProcess" tabindex="-1" aria-labelledby="detailProcessLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="detailProcessModalLabel">Detalle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="processDetailForm">
            <div class="row">
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_building" class="col-form-label">Edificio</label>
                <input type="text" class="form-control read" id="Proc_building">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_origin" class="col-form-label">Origen</label>
                <input type="text" class="form-control read" id="Proc_origin">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_office" class="col-form-label">Despacho</label>
                <input type="text" class="form-control read" id="Proc_office">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_officeEmail" class="col-form-label">Parte que autoriza</label>
                <input type="text" class="form-control read" id="Proc_officeEmail">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_filing" class="col-form-label">Radicado</label>
                <input type="text" class="form-control read" id="Proc_filing">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_consecutive" class="col-form-label">Consecutivo</label>
                <input type="text" class="form-control read" id="Proc_consecutive">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_attorney" class="col-form-label">Apoderado</label>
                <input type="text" class="form-control read" id="Proc_attorney">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_plaintiff" class="col-form-label">Demandante</label>
                <input type="text" class="form-control read" id="Proc_plaintiff">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_defendant" class="col-form-label">Demandado</label>
                <input type="text" class="form-control read" id="Proc_defendant">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_department" class="col-form-label">Departamento</label>
                <input type="text" class="form-control read" id="Proc_department">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_city" class="col-form-label">Ciudad</label>
                <input type="text" class="form-control read" id="Proc_city">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_juridistic" class="col-form-label">Jurisdicción</label>
                <input type="text" class="form-control read" id="Proc_juridistic">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_area" class="col-form-label">Competencia</label>
                <input type="text" class="form-control read" id="Proc_area">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Ptype_name" class="col-form-label">Tipo de proceso</label>
                <input type="text" class="form-control read" id="Ptype_name">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_phase" class="col-form-label">Etapa Procesal</label>
                <input type="text" class="form-control read" id="Proc_phase">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_content" class="col-form-label">Contenido</label>
                <input type="text" class="form-control read" id="Proc_content">
              </div>
              <div class="form-group col-lg-4 col-sm-12">
                <label for="Proc_history" class="col-form-label">Hitorial de radicados</label>
                <input type="text" class="form-control read" id="Proc_history">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Detail Modal -->

  <!-- Detail modal -->
  <div class="modal fade" id="action" tabindex="-1" aria-labelledby="actionLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="actionModalLabel">Detalle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body my-custom-scrollbar">
          <div class="container table-responsive table-performance">
            <table class="table table-hover table-shadow" data-order='[[ 1, "desc" ]]' data-page-length='25' id="tableAction" width="100%" cellspacing="0">
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
          <form id="requestsForm" onsubmit="sendDataRequest(this.id, event, 0); return false">
            <input id="Req_id" value="0" type="hidden">
            <input id="Stat_id" value="12" type="hidden">
            <input id="Act_observation" type="hidden">
            <div class="form-group">
              <label for="Req_subject" class="col-form-label">Asunto:</label>
              <input type="text" class="form-control" id="Req_subject" required>
            </div>
            <div class="form-group">
              <label for="Req_message" class="col-form-label">Mensaje:</label>
              <textarea class="form-control" rows="6" id="Req_message" required></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Requests Modal -->
  <!-- Calendar modal -->
  <div class="modal fade" id="calendarModal" tabindex="-1" aria-labelledby="calendarLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="calendarModalLabel">Calendario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body my-custom-scrollbar">
          <div class="row">
            <div id='calendar' class="col-8"></div>
            <div id="selectEvent" class="col-4">
              <div id="eventInfo">
                <form id="calendarInfo">
                  <h3 id="Event_info">Información del evento</h3>
                  <div class="form-row">
                    <input type="hidden" class="id" name="Event_id" id="Event_id" value="0">
                    <div class="col-12">
                      <label for="Event_title">Título</label>
                      <input type="text" class="form-control" name="Event_title" id="Event_title" readonly>
                    </div>
                    <input type="hidden" name="Event_color" id="Event_color" class="form-group">
                    <div class="col-12">
                      <label for="Event_start">Fecha Inicial</label>
                      <input type="text" class="form-control" name="Event_start" id="Event_start" readonly>
                    </div>
                    <div class="col-12">
                      <label for="Event_end">Fecha Final</label>
                      <input type="text" class="form-control" name="Event_end" id="Event_end" readonly>
                    </div>
                  </div>
                  <div class="mt-4 col-12">
                    <button type="button" class="btn btn-warning" id="addEventView" name="Crear">Crear
                    <button type="button" onclick="deleteEvent('calendarInfo');" class="btn btn-danger" id="delete" name="Eliminar" style="display: none;">Eliminar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="addEvent" class="col-4" style="display: none;">
              <form class="form-horizontal" method="POST" id="addForm" onsubmit="addEvent(this);return false">
                <h3 id="Event_info">Crear evento</h3>
                <div class="form-row">
                  <input type="hidden" class="id" name="Event_id" id="Event_id" value="0">
                  <div class="col-12">
                    <label for="Event_title">Titulo</label>
                    <input type="text" class="form-control" name="Event_title" id="Event_title" required>
                  </div>
                  <div class="mt-2 col-12">
                    <label for="Event_color">Color</label>
                    <input type="color" name="Event_color" id="Event_color" class="form-group" placeholder="Color" required>
                  </div>
                  <div class="col-12">
                    <label for="Event_start">Fecha Inicial</label>
                    <input type="datetime-local" class="form-control" name="Event_start" id="Event_start" placeholder="Inicio" required>
                  </div>
                  <div class="col-12">
                    <label for="Event_end">Fecha Final</label>
                    <input type="datetime-local" class="form-control" name="Event_end" id="Event_end" placeholder="Fin" required>
                  </div>
                </div>
                <div class="mt-4 col-12">
                  <button id="closeAddEvent" type="button" class="btn btn-secondary">Cerrar</button>
                  <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Calendar Modal -->
  <!-- Modal Edit-->
  <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true">
    <div class="modal-dialog" role="document">

      <div class="modal-content">
        <form class="form-horizontal" method="POST" id="editForm" onsubmit="deleteEvent(false); return false">
          <input type="hidden" class="id" name="Event_id" id="Event_id">
          <input type="hidden" name="Event_start" id="Event_start">
          <input type="hidden" name="Event_end" id="Event_end">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Evento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="col-10 ">
                <label for="Event_title">Titulo</label>
                <input type="text" class="form-control is-valid" name="Event_title" id="Event_title" placeholder="Título del evento" required>
                <div class="valid-feedback">
                  Campo diligenciado!
                </div>
                <div class="invalid-feedback">
                  Verifique la información
                </div>
              </div>
              <div class="col-2">
                <label for="Event_color">Color</label>
                <input type="color" name="Event_color" id="Event_color" class="form-group" placeholder="Color" required>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" onclick="deleteEvent(true);" style=" left: 20px;position: absolute;" class="btn btn-danger" id="delete" name="delete"><span class="material-icons">
                delete
              </span></button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>

  <script src="../../js/main.js"></script>
  <script src="../../js/properties.js"></script>

  <script src="js/process.js"></script>
  <script src="js/request.js"></script>
  <script src="js/calendar.js"></script>
  <script src='../../vendor/fullcalendar/js/main.js'></script>


  <?php include("../../php/viewHtml/jsLinks.php") ?>

  <script>
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    });
  </script>
  <script>
    // window.onload = loadGeneralView();
    window.onload = setGeneralInformation();    
  </script>
</body>

</html>
<style>
 .status-text {
    font-weight: bold;
    color: white;
    font-size: x-small;
  }
  
  .status-container {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .dot-animation {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 5px;
    /* Animación personalizada para cada punto */
    animation: color-change 1.5s infinite alternate;
  }

  /* Define la animación de cambio de color */
  @keyframes color-change {
    0% { background-color: #006400; }   /* Verde oscuro */
    100% { background-color: #90EE90; } /* Verde claro */
  }

  /* Retardos diferenciales para cada punto */
  .dot-animation:nth-child(2) { animation-delay: 0s; }
  .dot-animation:nth-child(3) { animation-delay: 0.5s; }
  .dot-animation:nth-child(4) { animation-delay: 1s; }
  </style>
<div id="layoutSidenav_nav">
  <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
      <div class="nav">
        <div class="sb-sidenav-menu-heading">Módulos</div>
        <a class="nav-link" href="../dashboard">
          <div class="sb-nav-link-icon">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-33-speed-hover-speed.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
          </div>
          Panel de Control
        </a>
        <a class="nav-link" href="../proceedings">
          <div class="sb-nav-link-icon">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-44-folder-hover-folder.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
          </div>
          Expedientes
        </a>
        <a class="nav-link" href="../requests">
          <div class="sb-nav-link-icon">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-47-chat-hover-chat.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
          </div>
          Solicitudes
        </a>
        <a class="nav-link" href="../process">
          <div class="sb-nav-link-icon">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-18-autorenew-hover-autorenew.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
          </div>
          Procesos
        </a>
        <a class="nav-link" href="../calendar">
          <div class="sb-nav-link-icon">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-23-calendar-hover-calendar.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
          </div>
          Calendario
        </a>


        <div class="sb-sidenav-menu-heading">Ajustes</div>
        <a class="nav-link" href="#">
          <div class="sb-nav-link-icon">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-63-settings-cog-hover-cog-1.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
          </div>
          Configuración
        </a>

      </div>
    </div>
    <div class="sb-sidenav-footer text-center">
      <div class="status-container">
        <span class="status-text">Usuario en línea</span>
        <div class="dot-animation"></div>
        <div class="dot-animation"></div>
        <div class="dot-animation"></div>
      </div>
      <img src="../assets/startbootstrap-sb-admin/assets/img/logos/logo_dendrite.png" width="80px">
    </div>
  </nav>
</div>
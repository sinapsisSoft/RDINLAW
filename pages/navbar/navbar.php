

<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
  <!-- Navbar Brand-->
  <a class="navbar-brand ps-3" href="#"><img src="../assets/startbootstrap-sb-admin/assets/img/logos/logo-slide_bar.png" class="img w-50"></a>

  <!-- Sidebar Toggle-->

  <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
    <lord-icon class="lord-icon"
      src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-24-view-1-hover-view-1.json"
      trigger="hover"
      stroke="light"
      state="hover-pinch"
      href="index.html"
      colors="primary:#ffffff,secondary:#b4b4b4">
    </lord-icon>
  </button>
  <!-- Navbar Search-->
  <div class="d-md-inline-block form-inline ms-auto ">
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-3">
      <li class="nav-item dropdown" style="margin-left: 10px;">
        <a class="nav-link " id="navbarDropdown" style="padding:inherit" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <button type="button" class="btn btn-primary position-relative">
            <lord-icon
              src="https://cdn.lordicon.com/yhtmwrae.json"
              trigger="hover"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4"
              style="width:20px;height:20px;">
            </lord-icon>
           
          </button>
        </a>
        <div id="menu-notifications" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#"><strong>Manuales </strong></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" style="font-size: 1em;" href="https://rdl.dendrite.com.co/documents/manuals/Manual%20-%20Panel_de_Control_Dendrite.pdf" target="_blank">Panel de Control</a>
          <a class="dropdown-item" style="font-size: 1em;" href="https://rdl.dendrite.com.co/documents/manuals/Manual%20-%20Modulo_de_Expedientes_Dendrite.pdf" target="_blank">Expedientes</a>
          <a class="dropdown-item" style="font-size: 1em;" href="https://rdl.dendrite.com.co/documents/manuals/Manual%20-%20Modulo_de_Solicitudes_Dendrite.pdf" target="_blank">Solicitudes</a>
          <a class="dropdown-item" style="font-size: 1em;" href="https://rdl.dendrite.com.co/documents/manuals/Manual%20-%20Modulo_de_Calendario_y_Eventos_Dendrite.pdf" target="_blank">Informes</a>
          <a class="dropdown-item" style="font-size: 1em;" href="https://rdl.dendrite.com.co/documents/manuals/Manual%20-%20Modulo_de_Informes_Dendrite.pdf" target="_blank">Calendario</a>

        </div>
      </li>
      <li class="nav-item dropdown " style="margin-left: 10px;">
        <a class="nav-link " id="navbarDropdown" style="padding:inherit" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <button type="button" class="btn btn-warning position-relative">
            <lord-icon class="lord-icon"
              src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-46-notification-bell-hover-bell.json"
              trigger="hover"
              stroke="light"
              state="hover-pinch"
              href="index.html"
              colors="primary:#ffffff,secondary:#b4b4b4">
            </lord-icon>
            <span id="notificationCount" class="position-absolute mt-1 start-100 translate-middle badge rounded-pill bg-danger">
              0
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </a>
        <div id="menu-notifications" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <h6 class="dropdown-header">Pr&#243ximos eventos</h6>

        </div>
      </li>
    </ul>
  </div>
  <!-- Navbar-->
  <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <lord-icon class="lord-icon"
          src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-8-account-hover-account.json"
          trigger="hover"
          stroke="light"
          state="hover-pinch"
          href="index.html"
          colors="primary:#ffffff,secondary:#b4b4b4">
        </lord-icon>
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#!">Perfil</a></li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li><a class="dropdown-item " style="cursor:pointer" id="loginbtn" onclick="closeSession()">Cerrar sesi&#243n</a></li>
      </ul>
    </li>
  </ul>
</nav>
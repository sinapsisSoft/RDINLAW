<link rel="shortcut icon" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon.ico">
<link rel="icon" type="image/png" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="../assets/startbootstrap-sb-admin/assets/img/icons/favicon-96x96.png" sizes="96x96">

<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- DataTables CSS -->
<link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet">

<!-- Botones de exportación -->
<link href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.bootstrap5.min.css" rel="stylesheet">

<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<link href="../assets/startbootstrap-sb-admin/css/styles.css" rel="stylesheet" />
<link href="../../css/loading.css" rel="stylesheet" />
<style>
  .lord-icon {
    width: 20px;
    height: 20px;
    padding-top: 3px;
    cursor: pointer;
  }

  .header-app {
    background: linear-gradient(90deg, #4a4a4a 0%, #4389ff 100%);
    color: white;
    padding: 10px;
    text-align: left;
    position: relative;
    text-transform: uppercase;
    border-radius: 5px 5px 0px 0px;
  }

  .header-app a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  .bg-app-secondary {
    background-color: #4b4a4d;
  }

  /* Asegurar que todos los elementos estén alineados */
  .dataTables_wrapper .d-flex {
    display: flex !important;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  /* Ajustar el input de búsqueda */
  .dataTables_filter input {
    margin-left: 10px;
    height: 38px;
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #ced4da;
  }

  /* Estilo para los botones */
  .dt-buttons .btn {
    margin-left: 10px;
  }

  /* Ajustar responsive */
  @media (max-width: 768px) {
    .dataTables_wrapper .d-flex {
      flex-direction: column;
      align-items: flex-start;
    }

    .dt-buttons {
      margin-top: 10px;
    }

    /* Estilo para los botones de acción */
    .btn-group-sm .btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      margin-right: 2px;
    }

    /* Espaciado entre icono y texto */
    .btn i {
      margin-right: 5px;
    }
  }

  /* Estilo para inputs de solo lectura */
  .form-control[readonly] {
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    cursor: not-allowed;
  }

  /* Mejorar el aspecto del modal */
  .modal-content {
    border: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .modal-footer {
    border-top: 1px solid #dee2e6;
  }

  /* Estilos para el modal de proceso */
  #procesoModal .modal-dialog {
    max-width: 900px;
  }

  #procesoModal .form-control[readonly] {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    color: #495057;
  }

  #procesoModal textarea.form-control {
    min-height: 100px;
  }

  #procesoModal .modal-header {
    padding: 1rem 2rem;
  }

  #procesoModal .modal-body {
    padding: 2rem;
  }

  /* Estilo para campos vacíos */
  #procesoModal .form-control:empty {
    color: #6c757d;
    font-style: italic;
  }

  /* Estilo para campos requeridos */
  #procesoModal .form-control:required {
    color: red;
  }
  /* Estilos para los botones de documento */
.btn-ver-documento {
    min-width: 80px;
}

/* Estilo para celdas sin documento */
.text-muted {
    opacity: 0.6;
}

/* Alinear íconos en los botones */
.btn i.bi {
    margin-right: 5px;
}

/* Hover para botones activos */
.btn:not(:disabled):not(.disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
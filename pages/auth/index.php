<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dendrite Process - RDL Login</title>
    <!--Styles and Icons-->
    <?php require_once '../assets/css/styles.php'; ?>
    <link rel="stylesheet" href="css/login.css">
</head>

<body>
    <!-- Loading Screen -->
    <?php require_once '../loading/loading.php'; ?>
    <!--End Loading Screen-->
    <div id="main-container" class="container" style="display: none;">
        <!-- Logo de aplicación en esquina superior derecha -->
        <div class="login-container">
            <div class="login-header">
            </div>
            <div class="login-body">
                <!-- Logo de empresa centrado sobre el formulario -->
                <img src="../assets/startbootstrap-sb-admin/assets/img/logos/logo_login.png" alt="Logo Empresa" class="company-logo">
                <!-- Formulario de login -->
                <?php include 'form.php'; ?>
                <!-- End Formulario de login -->
            </div>
        </div>
        <!-- Footer -->
        <?php include 'footer.php'; ?>
        <!-- End Footer -->
    </div>

    <!-- Modal para cambio de contraseña -->
    <?php include 'modal-changes-password.php'; ?>
    <!-- End Modal -->
    <script src="../../js/appStorage.js"></script>
    <script src="../../js/Constants.js"></script>
    <script src="../../js/loadingScreen.js"></script>
    <script src="../../js/fadeInOut.js"></script>
    <script src="../../js/Auth.js"></script>

    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>

    <script src="../assets/startbootstrap-sb-admin/js/datatables-simple-demo.js"></script>

    <script src="../../js/alerts.js"></script>
    <script src="js/login.js"></script>

</body>

</html>
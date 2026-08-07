<?php
// Iniciar sesión para acceder a las variables de sesión
require_once '../../vendor/autoload.php';
require_once '../../config/config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;



// Obtener token desde la URL
$token = isset($_GET['token']) ? $_GET['token'] : null;

// Variables de estado
$tokenValido = false;
$mensajeError = '';
$usuario = null;

// Validar token
if ($token) {
  // En reset-password.php al validar:
  try {
    $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
    $userData = (array)$decoded;

    //var_dump($userData);
    $usuario = [
      'user_id' => $userData['user_id'],
      'email' => $userData['email']
    ];
    $tokenValido = true;
    // Mostrar formulario...

  } catch (Exception $e) {
    $mensajeError = 'Error: ' . $e->getMessage();
  }
} else {
  $mensajeError = 'No se proporcionó un token de recuperación válido.';
}


?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dendrite Process - RDL Restablecer Contraseña</title>
    <!--Styles and Icons-->
    <?php require_once '../assets/css/styles.php'; ?>
    <link rel="stylesheet" href="css/login.css">

  <style>
    body {
      background-color: #f8f9fa;
      padding-top: 50px;
    }

    .password-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .password-strength {
      height: 5px;
      margin-top: 5px;
      background: #eee;
      border-radius: 3px;
      overflow: hidden;
    }

    .password-strength-bar {
      height: 100%;
      width: 0%;
      background: #dc3545;
      transition: width 0.3s, background 0.3s;
    }
  </style>
</head>

<body>
   <!-- Loading Screen -->
    <?php require_once '../loading/loading.php'; ?>
    <!--End Loading Screen-->
  <div id="main-container" class="container" >
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="password-container">
          <h2 class="text-center mb-4">Restablecer Contraseña</h2>
<!-- Logo de empresa centrado sobre el formulario -->
                <img src="../assets/startbootstrap-sb-admin/assets/img/logos/logo_login.png" alt="Logo Empresa" class="company-logo">
          <?php if (isset($mensajeExito)): ?>
            <div class="alert alert-success text-center">
              <?php echo $mensajeExito; ?>
              <div class="mt-3">
                <a href="login.php" class="btn btn-primary">Iniciar Sesión</a>
              </div>
            </div>
          <?php elseif (!$tokenValido): ?>
            <div class="alert alert-danger text-center">
              <?php echo $mensajeError; ?>
              <div class="mt-3">
                <a href="./" class="btn btn-primary">Solicitar nuevo enlace</a>
              </div>
            </div>
          <?php else: ?>
            <form id="resetPasswordForm" method="POST">
              <input type="hidden"  id="user_id"  name="user_id" value="<?php echo $usuario['user_id']; ?>">

              <div class="mb-3">
                <label for="new_password" class="form-label">Nueva Contraseña</label>
                <input type="password" class="form-control" id="new_password" name="new_password" placeholder="Contraseña nueva" minlength=8 maxlength="15" pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$" autocomplete="off" title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico." required>

                <div class="password-strength">
                  <div class="password-strength-bar" id="passwordStrengthBar"></div>
                </div>
                <div class="form-text">Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas y números.</div>
              </div>

              <div class="mb-4">
                <label for="confirm_password" class="form-label">Confirmar Nueva Contraseña</label>
                <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Confirmar contraseña " minlength=8 maxlength="15" pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$" autocomplete="off" title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico." required>
                <div class="invalid-feedback">Las contraseñas no coinciden.</div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Actualizar Contraseña</button>
              </div>
            </form>
          <?php endif; ?>
        </div>
      </div>
    </div>
       <!-- Footer -->
        <?php include 'footer.php'; ?>
        <!-- End Footer -->
  </div>

  
    <script src="../../js/Constants.js"></script>
    <script src="../../js/loadingScreen.js"></script>
    <script src="../../js/fadeInOut.js"></script>
   
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>


    
    <script src="../../js/alerts.js"></script>

  <!-- Change Password Script -->
     <script src="js/resetPassword.js"></script>
</body>

</html>
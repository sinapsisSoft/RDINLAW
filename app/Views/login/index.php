<!DOCTYPE html>
<html lang="en">

<head>
	<title>RDL - Ingreso al sistema</title>
	<link rel="icon" href="../app/images/favicon3.ico">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--===============================================================================================-->
	<link rel="stylesheet" href="../app/css/toast/toastr.css">
	<link rel="stylesheet" type="text/css" href="../app/vendor/bootstrap/css/bootstrap.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../app/fonts/flaticon/font/flaticon.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../app/vendor/animate/animate.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../app/vendor/css-hamburgers/hamburgers.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../app/vendor/select2/select2.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../app/css/util.css">
	<link rel="stylesheet" type="text/css" href="../app/Views/login/css/login.css">
	<!--===============================================================================================-->
</head>

<body>
	<div class="loadPage" id="loadPage"></div>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<a href="../../index.html"><img src="../app/images/logo-05.png" alt="IMG"></a>
				</div>

				<form class="login100-form validate-form" method="POST" id="form_login" onsubmit="sendData(this.id);return false">
					<input type="hidden" name="Platform_id" id="Platform_id" value="1">
					<span class="login100-form-title">
						Bienvenido <?php echo "Usuario" ?>
					</span>
					<div class="wrap-input100 validate-input" data-validate="Se requiere un email válido">
						<input class="input100" type="text" id="User_email" name="User_email" placeholder="E-mail" required>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="flaticon flaticon-usuario-de-perfil" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Contraseña es requerida">
						<input class="input100" type="password" id="Login_password" name="Login_password" placeholder="Contraseña" required>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="flaticon flaticon-contrasena" aria-hidden="true"></i>
						</span>
					</div>

					<div class="container-login100-form-btn">
						<button type="submit"  class="login100-form-btn">
							Ingresar
						</button>
					</div>

					<!-- <div class="text-center p-t-12">
						<span class="txt1">
							Olvidó
						</span>
						<a class="txt2" href="#">
							su contraseña?
						</a>
					</div> -->
				</form>
			</div>
		</div>
	</div>
	<!--Alert-->
	<div id="myAlert"></div>
	<!--Alert-->


	<!--===============================================================================================-->
	<script src="../app/vendor/jquery/jquery-3.2.1.min.js"></script>
	<!--===============================================================================================-->
	<script src="../app/vendor/bootstrap/js/popper.js"></script>
	<script src="../app/vendor/bootstrap/js/bootstrap.min.js"></script>
	<!--===============================================================================================-->
	<script src="../app/vendor/select2/select2.min.js"></script>
	<!--===============================================================================================-->
	<script src="../app/vendor/tilt/tilt.jquery.min.js"></script>
	<script>
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
	<!--===============================================================================================-->
	<script src="../app/js/aos.js"></script>
	<script src="../app/js/main.js"></script>
	<script src="../app/js/properties.js"></script>
	<script async src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
	<script src="../app/js/analytics.js"></script>
	<?php require_once("../app/php/viewHtml/jsLinks.php") ?>







</body>

</html>
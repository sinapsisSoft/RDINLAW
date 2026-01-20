<!DOCTYPE html>
<html lang="en">

<head>
	<title>RDL - Ingreso al sistema</title>
	<link rel="icon" href="../../images/favicon3.ico">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--===============================================================================================-->
	<link rel="stylesheet" href="../../css/toast/toastr.css">
	<link rel="stylesheet" type="text/css" href="../../vendor/bootstrap/css/bootstrap.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../../fonts/flaticon/font/flaticon.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../../vendor/animate/animate.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../../vendor/css-hamburgers/hamburgers.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../../vendor/select2/select2.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../../css/util.css">
	<link rel="stylesheet" type="text/css" href="css/login.css">
	<!--===============================================================================================-->
</head>

<body>
	<div class="loadPage" id="loadPage"></div>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<a href="../../index.html"><img src="../../images/logo-05.png" alt="IMG"></a>
				</div>

				<form class="login100-form validate-form" method="POST" id="form_login" onsubmit="sendData(this.id);return false">
					<input type="hidden" name="Platform_id" id="Platform_id" value="1">
					<span class="login100-form-title">
						Bienvenido <?php echo "Usuario" ?>
					</span>
					<div class="wrap-input100 validate-input" data-validate="Se requiere un email válido">
						<input class="input100" type="text" id="User_email" name="User_email" placeholder="E-mail" require>
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
						<button type="submit" form="form_login" class="login100-form-btn">
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
	<script src="../../vendor/jquery/jquery-3.2.1.min.js"></script>
	<!--===============================================================================================-->
	<script src="../../vendor/bootstrap/js/popper.js"></script>
	<script src="../../vendor/bootstrap/js/bootstrap.min.js"></script>
	<!--===============================================================================================-->
	<script src="../../vendor/select2/select2.min.js"></script>
	<!--===============================================================================================-->
	<script src="../../vendor/tilt/tilt.jquery.min.js"></script>
	<script>
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
	<!--===============================================================================================-->
	<script src="../../js/main.js"></script>
	<script src="../../js/properties.js"></script>
	<script async src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
	<script src="../../js/analytics.js"></script>
	<?php include("../../php/viewHtml/jsLinks.php") ?>
	<script src="js/login.js"></script>

</body>

</html>
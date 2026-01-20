<?php
header('Content-Type: application/json; charset=utf-8');



use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Incluir PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';
require '../../vendor/phpmailer/phpmailer/src/Exception.php';
require '../../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../../vendor/phpmailer/phpmailer/src/SMTP.php';
require 'config.php';

// Validar que el correo fue enviado
if (!isset($_GET['email']) || empty($_GET['email'])) {
  echo json_encode([
    'success' => false,
    'message' => 'El campo de correo electrónico es requerido.'
  ]);
  exit;
}
$email = filter_var($_GET['email'], FILTER_SANITIZE_EMAIL);
$idUser = filter_var($_GET['id'], FILTER_SANITIZE_EMAIL);
// Validar formato del correo
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode([
    'success' => false,
    'message' => 'Por favor ingresa un correo electrónico válido.'
  ]);
  exit;
}
// Aquí normalmente buscarías en tu base de datos si el correo existe
// $usuarioExiste = buscarUsuarioPorEmail($email);
$usuarioExiste = true; // Simulamos que el usuario existe

if (!$usuarioExiste) {
  echo json_encode([
    'success' => false,
    'message' => 'No existe una cuenta asociada a este correo electrónico.'
  ]);
  exit;
}
// En send_email.php al generar el token:
$payload = [
    'user_id' => $idUser, // ID del usuario de tu BD
    'email' => $email,
    'Platform_id' => 1, // ID de la plataforma (puedes cambiarlo según tu lógica)
    'exp' => time() + 3600 // Expira en 1 hora
];

$token = JWT::encode($payload, JWT_SECRET, 'HS256');

$fechaExpiracion = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token válido por 1 hora

// URL de recuperación (debes cambiar esto por tu URL real)
$resetUrl = "https://rdl.dendrite-web.app/user/pages/auth/reset-password.php?token=$token";

// echo json_encode([
//   'success' => true,
//   'message' => 'Enlace de recuperación enviado al correo electrónico.',
//   'resetUrl' => $resetUrl
// ]);

// Configurar PHPMailer
try {
  $mail = new PHPMailer(true);
   // Configuración de charset UTF-8
  $mail->CharSet = 'UTF-8';
  $mail->Encoding = 'base64';
  // Configuración de debug
  $mail->SMTPDebug = SMTP_DEBUG; // Mostrar detalles del error
  $mail->Debugoutput = function ($str, $level) {
    error_log("PHPMailer: $level: $str");
  };

  // Configuración del servidor
  $mail->isSMTP();
  $mail->Host       = SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = SMTP_USERNAME;
  $mail->Password   = SMTP_PASSWORD;
  $mail->SMTPSecure = SMTP_SECURE;
  $mail->Port       = SMTP_PORT;

  // Configuración del correo
  $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
  $mail->addAddress($email); // Destinatario
  $mail->addReplyTo('soporte@tudominio.com', 'Soporte');

  // Contenido del correo
  $mail->isHTML(true);
  $mail->Subject = 'Recuperación de contraseña';

  $mail->Body = "
    <html>
    <meta charset='UTF-8'>
    <head>
        <title>Recuperación de contraseña</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .btn { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Recuperación de contraseña</h2>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Por favor haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <p><a href='$resetUrl' class='btn'>Restablecer contraseña</a></p>
            <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
            <p><small>Este enlace expirará el $fechaExpiracion</small></p>
        </div>
    </body>
    </html>
    ";

  // Versión alternativa sin HTML para clientes de correo simples
  $mail->AltBody = "Recuperación de contraseña\n\n" .
    "Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.\n\n" .
    "Por favor visita el siguiente enlace para crear una nueva contraseña:\n" .
    "$resetUrl\n\n" .
    "Si no solicitaste este cambio, puedes ignorar este mensaje.\n\n" .
    "Este enlace expirará el $fechaExpiracion";

  // Enviar el correo
  $mail->send();

  echo json_encode([
    'success' => true,
    'message' => 'Se ha enviado un correo con instrucciones para restablecer tu contraseña. Por favor revisa tu bandeja de entrada.'
  ]);
} catch (Exception $e) {
  $errorDetails = [
    'success' => false,
    'message' => 'Error al enviar el correo. Por favor intenta nuevamente.',
    'debug' => [
      'error' => $e->getMessage(),
      'smtp_error' => $mail->ErrorInfo,
      'smtp_config' => [
        'host' => SMTP_HOST,
        'port' => SMTP_PORT,
        'secure' => SMTP_SECURE
      ]
    ]
  ];

  error_log(json_encode($errorDetails, JSON_PRETTY_PRINT));
  echo json_encode($errorDetails);
}
<?php
header('Content-Type: application/json; charset=utf-8');

require_once '../vendor/autoload.php';
require_once 'SessionManager.php';
require_once 'config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['type'])) {

  switch ($data['type']) {
    case 'login':
      // Validar que los datos de usuario estén completos
      if (!isset($data['User_id']) || !isset($data['User_name']) || !isset($data['User_email']) || !isset($data['Platform_id'])) {
        echo json_encode([
          'success' => false,
          'message' => 'Datos de usuario incompletos.'
        ]);
        exit;
      }
      $User_id = $data['User_id'];
      $User_name = $data['User_name'];
      $User_email = $data['User_email'];
      $Platform_id = $data['Platform_id'];

      // Iniciar sesión
      SessionManager::start();

      // Guardar datos del usuario en la sesión
      $userApp = ["User_id" => $User_id, "User_name" => $User_name, "User_email" => $User_email, "Platform_id" => $Platform_id];
      SessionManager::set(SESSION_KEY, $userApp);
      $payload = [
        'User_id' => $User_id, // ID del usuario de tu BD
        'User_name' => $User_name,
        'User_email' => $User_email,
        'Platform_id' => $Platform_id,  
        'iat' => time(), // Tiempo de emisión
        'exp' => time() + 3600 // Expira en 1 hora
      ];
      $token = JWT::encode($payload, JWT_SECRET, 'HS256');
      echo json_encode([
        'success' => true,
        'message' => 'Sesión iniciada correctamente.',
        'user' => $userApp,
        'token' =>  $token
      ]);
      break;
    case 'validateToken':
      // Validar que el token JWT esté presente
   
      if (!isset($data['token'])) {
        echo json_encode([
          'success' => false,
          'message' => 'Token no proporcionado.'
        ]);
        exit;
      }
      $token = $data['token'];
      try {
        $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        $userData = (array)$decoded;  
        echo json_encode([
          'success' => true,
          'message' => 'Token válido.',
          'user' => $userData
        ]);
        http_response_code(200);
        exit;
      } catch (Exception $e) {
        echo json_encode([
          'success' => false,
          'message' => 'Token inválido: ' . $e->getMessage()
        ]); 
        http_response_code(500);

      }
      break;
  }
} else {
  echo json_encode([
    'success' => false,
    'message' => 'Tipo de solicitud no válido.'
  ]);
}

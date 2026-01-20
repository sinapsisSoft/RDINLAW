<?php

namespace App\Controllers\Route;

/**
 * Author:DIEGO CASALLAS
 * Date:25/02/2025
 * Update Date:
 * Descriptions:This Http are mandatory methods to apply in the classes that use it
 *
 */


class RouteController
{

   private $routesFile;
   private $data;
   private $model;
   private $method;

   public function __construct()
   {
      $this->routesFile = '../app/Config/routes/';
      $this->data = [];
      $this->model = "Model_id";
      $this->method = "Model_method";
   }

   public function getRoutes()
   {
      try {
         if ($_SERVER["REQUEST_METHOD"] == "POST") {

            $this->routesFile = $this->routesFile . $this->getDataModel()[$this->model] . '.json';
            $getRoute = json_decode(file_get_contents($this->routesFile), true);
            $encryptedRoute = $this->encryptJson($getRoute[$this->getDataModel()[$this->method]], KEY_HTTP);

            if (file_exists($this->routesFile)) {
               $this->data["data"] = $encryptedRoute;
               $this->data["message"] = "Ok";
               $this->data["status"] = 200;
               http_response_code(200);
            } else {
               $this->data["data"] = $this->routesFile;
               $this->data["message"] = "Route file not found";
               $this->data["status"] = 404;
               http_response_code(404);
            }
         } else {
            $this->data["data"] = "";
            $this->data["message"] = "NOT REQUEST_METHOD GET - PUT - DELETE";
            $this->data["status"] = 404;
            http_response_code(404);
         }
      } catch (\Exception $e) {
         $this->data["data"] = "";
         $this->data["message"] = "Error";
         $this->data["status"] = 400;
         http_response_code(400);
      }
      echo (json_encode($this->data));
   }
   public function getDataModel()
   {
      try {
         $jsonData = file_get_contents('php://input');
         $data = json_decode($jsonData, true);
         $_REQUEST = $data;
         $getDataRequest = [];
         $getDataRequest['Model_id'] = $_REQUEST['Model_id'];
         $getDataRequest['Model_method'] = $_REQUEST['Model_method'];
      } catch (\Exception $e) {
      }
      return $getDataRequest;
   }

   function encryptJson($data, $key)
   {
      // Validate key
      if (strlen($key) != 32) {
         throw new \Exception("La clave debe tener 32 caracteres para AES-256");
      }
      // Convert data to JSON
      $jsonData = json_encode($data);
      if ($jsonData === false) {
         throw new \Exception("Error al convertir datos a JSON");
      }
      // Generate IV randomly
      $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
      // Data encryption
      $encrypted = openssl_encrypt(
         $jsonData,
         'aes-256-cbc',
         $key,
         OPENSSL_RAW_DATA,
         $iv
      );
      if ($encrypted === false) {
         throw new \Exception("Error al cifrar los datos");
      }
      //Combine IV + encrypted data and encode in base64
      return base64_encode($iv . $encrypted);
   }
}

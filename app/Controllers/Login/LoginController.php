<?php

/**
 * Author:DIEGO CASALLAS
 * Date:24/02/2025
 * Update Date:
 * Descriptions:This is user class have implemented the methods the interface IController
 * 
 */

namespace App\Controllers\Login;


use App\Models\User\UserModel;
use App\Config\View;
use App\System\core\SessionManager;
use App\System\core\EmailSender;


class LoginController
{

  private $userModel;
  private $UserPassword;
  private $data;
  private $view;


  public function __construct()
  {
    $this->userModel = new UserModel();
    $this->UserPassword = "User_password";
    $this->data = [];
    $this->view = new View();
  }

  public function login()
  {
    try {
      if ($_SERVER["REQUEST_METHOD"]=="POST") {
        $getData = $this->getDataModel();
        $pass = $getData[$this->UserPassword];
        $user = $this->userModel->spLogin($getData);
        if (!empty($user)) {
          if (password_verify($pass,  $user[$this->UserPassword])) {
            $this->data["data"] = $user;
            $this->data["message"] = "Ok";
            $this->data["status"] = 200;
            http_response_code(200);
            SessionManager::set(SESSION_USER, $user);
          } else {
            $this->data["data"] = "";
            $this->data["message"] = "Error password";
            $this->data["status"] = 400;
            http_response_code(200);
          }
        } else {
          $this->data["data"] = $_SERVER["REQUEST_METHOD"];
          $this->data["message"] = "Error user";
          $this->data["status"] = 400;
          http_response_code(200);
        }
      } else {
        $this->data["data"] = "";
        $this->data["message"] = "NOT REQUEST_METHOD GET - PUT - DELETE";
        $this->data["status"] = 404;
        http_response_code(404);
      }
    } catch (\Exception $e) {
      $this->data["data"] = "";
      $this->data['message'] = $e->getMessage();
      $this->data["status"] = 500;
      http_response_code(500);
    }

    echo (json_encode($this->data));
  }
  public function forgotPassword()
  {
    try {
      if ($_SERVER["REQUEST_METHOD"]=="POST") {
        $getData = $this->getDataModel();
        if (!empty($getData)) {
          $userEmail = $this->userModel->spForgotPassword($getData);
          if (!empty($userEmail)) {
            // if($this->emailToChangePassword($userEmail)){
            //   $this->data["data"] = $userEmail;
            //   $this->data["message"] = "Email send";
            //   $this->data["status"] = 200;
            //   http_response_code(200);
            // }else{
              $emailSender = new EmailSender();

              $data = [
                'email' => 'cliente@example.com',
                'name' => 'Juan Pérez',
                'phone' => '123456789',
                'prefixesId' => '57',
                'businessName' => 'Empresa XYZ',
                'servicesText' => 'Desarrollo Web',
                'comments' => 'Necesito cotización para sitio web corporativo',
                'subject' => 'Cotización de Servicios'
              ];
              
              
              $this->data["data"] = $userEmail;
                $this->data["message"] = $emailSender->sendEmail('quotation', $data);
                $this->data["status"] = 200;
                http_response_code(200);
           
          } else {
            $this->data["data"] = "";
            $this->data["message"] = "Error user";
            $this->data["status"] = 400;
            http_response_code(200);
          }
        } else {
          $this->data["data"] ="";
          $this->data["message"] = "Error user";
          $this->data["status"] = 400;
          http_response_code(200);
        }
      } else {
        $this->data["data"] = "";
        $this->data["message"] = "NOT REQUEST_METHOD GET - PUT - DELETE";
        $this->data["status"] = 404;
        http_response_code(404);
      }
    } catch (\Exception $e) {
      $this->data["data"] = "";
      $this->data['message'] = $e->getMessage();
      $this->data["status"] = 500;
      http_response_code(500);
    }
    echo (json_encode($this->data));
  }
  public function show()
  {
    $this->data['title'] = "Dendrite | Login";
    $this->view->render('login/index', $this->data);
  }

  public function showForgotPassword()
  {
    $this->data['title'] = "Dendrite | Forgotten Password";
    $this->view->render('login/forgot-password', $this->data);
  }
  public function getDataModel()
  {
    try {
      $jsonData = file_get_contents('php://input');
      $data = json_decode($jsonData, true);
      $_REQUEST = $data;
      $getDataRequest = [];
      $getDataRequest['User_user'] =  empty($_REQUEST['User_user'])?"": "'" . $_REQUEST['User_user'] . "'";
      $getDataRequest['User_password'] = empty($_REQUEST['User_password'])?"" : "'" . $_REQUEST['User_password'] . "'";
    } catch (\Exception $e) {
    }
    return $getDataRequest;
  }
  public function emailToChangePassword($userEmail)
  {
    try {
      $to = $userEmail['User_email'];
      $subject = "Password Reset Request";
      $token = bin2hex(random_bytes(50));
      $resetLink = "https://yourdomain.com/reset-password?token=" . $token;

      $message = "Hello " . $userEmail['User_name'] . ",\n\n";
      $message .= "We received a request to reset your password. Please click the link below to reset your password:\n";
      $message .= $resetLink . "\n\n";
      $message .= "If you did not request this, please ignore this email.\n\n";
      $message .= "Thank you,\nYour Team";

      $headers = "From: no-reply@yourdomain.com\r\n";
      $headers .= "Reply-To: support@yourdomain.com\r\n";
      $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

      if (mail($to, $subject, $message, $headers)) {
        // Optionally, save the token to the database for verification later
        //$this->userModel->savePasswordResetToken($userEmail['User_id'], $token);
        return true;
      } else {
        return false;
      }
    } catch (\Exception $e) {
      return false;
    }
  }
}

<?php

/* This PHP code snippet is defining an array that maps different URL routes to specific controller
classes and methods in an MVC (Model-View-Controller) architecture. Each key in the array represents
a route, and the corresponding value is an array containing the controller class and method that
should be executed when that route is accessed. */
return [
  '/dashboard' => [
    "httpMethod"=> "GET",
    'controller' => App\Controllers\Dashboard\DashboardController::class,
    'method' => 'index',
    "uri"=> "",        
  ],
  '/login/send' => [
    "httpMethod"=> "POST",
    'controller' => App\Controllers\Login\LoginController::class,
    'method' => 'login',
    "uri"=> "",        
  ],
  '/' => [
    'controller' => App\Controllers\Login\LoginController::class,
    'method' => 'show'
  ],
  '/login' => [
    'controller' => App\Controllers\Login\LoginController::class,
    'method' => 'show'
  ],
  '/test' => [
    'controller' => App\System\core\EmailSender::class,
    'method' => 'sendEmail'
  ],
  '/forgotPassword' => [
    'controller' => App\Controllers\Login\LoginController::class,
    'method' => 'showForgotPassword'
  ],
  '/forgotPassword/send' => [
    'controller' => App\Controllers\Login\LoginController::class,
    'method' => 'forgotPassword'
  ],
  '/routes' => [
    "httpMethod"=> "POST",
    'controller' => App\Controllers\Route\RouteController::class,
    'method' => 'getRoutes',
    "uri"=> "",  
  ],
  
];

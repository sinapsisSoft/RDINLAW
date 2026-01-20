<?php
namespace App\Config;
class Config{
    
  public function getRoutes():array{
    return [
      'routes' => require('../app/Config/routes/AppRoutes.php')
    ];
  }

}
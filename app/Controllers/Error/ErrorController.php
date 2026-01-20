<?php

/**
 * Author:DIEGO CASALLAS
 * Date:10/04/2025
 * Update Date:
 * Descriptions:This is user class have implemented the methods the interface IController
 * 
 */

namespace App\Controllers\Error;



use App\Config\View;

class ErrorController
{


  private $data;
  private $view;


  public function __construct()
  {
    $this->data = [];
    $this->view = new View();
  }


  public function show()
  {
    $this->data['title'] = "Dendrite | Login";
    $this->view->render('error/404', $this->data);
  }


}

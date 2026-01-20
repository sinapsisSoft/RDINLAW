<?php

/**
 * Author:DIEGO CASALLAS
 * Date:14/04/2025
 * Update Date:
 * Descriptions:This is 
 *
 */

namespace App\Controllers\Dashboard;



use App\System\interface\IController;
use App\Models\User\UserModel;
use App\Models\Role\RoleModel;
use App\Models\UserStatus\UserStatusModel;
use App\Config\View;

/* The `UserController` class in PHP contains methods for creating, updating, deleting, and displaying
user data with error handling and JSON responses. */

class DashboardController
{
  /* These lines are declaring private properties in the `UserController` class: */
  private $userModel;
  private $roleModel;
  private $userStatusModel;

  private $data;
  private $view;

  /**
   * The function initializes various models and properties for a PHP class.
   */
  public function __construct()
  {
    $this->userModel = new UserModel();
    // $this->roleModel = new RoleModel();
    // $this->userStatusModel = new UserStatusModel();

    $this->data = [];
    $this->view = new View();
  }


  public function index()
  {
    try {
      $this->data['title'] = "Dendrite | DASHBOARD";
      $this->view->render('dashboard/dashboard', $this->data);
    } catch (\Exception $e) {
      $this->data['error'] = $e->getMessage();
    }
    return $this->data;
  }
}

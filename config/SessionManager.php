<?php

/**
 * Author:DIEGO CASALLAS
 * Date:20/02/2025
 * Update Date:
 * Descriptions: this is class session manager
 * 
 */
class SessionManager {
    
  // Start the session if it is not active
  public static function start() {
      if (session_status() === PHP_SESSION_NONE) {
          session_start();
      }
  }

// Set a session variable

  public static function set($key, $value) {
      self::start();
      $_SESSION[$key] = $value;
  }

 // Get a session variable
  public static function get($key, $default = null) {
      self::start();
      return $_SESSION[$key] ?? $default;
  }

// Check if a session variable exists
  public static function has($key) {
      self::start();
      return isset($_SESSION[$key]);
  }

// Delete a session variable
  public static function remove($key) {
      self::start();
      if (isset($_SESSION[$key])) {
          unset($_SESSION[$key]);
      }
  }

  // Destroy the session completely
  public static function destroy() {
      self::start();
      session_unset();
      session_destroy();
  }
}

?>







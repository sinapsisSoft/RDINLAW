<?php

class Router {
    private $routes = [];
    
    public function addRoute($route, $controller, $method, $action) {
        $this->routes[$route] = [
            'controller' => $controller,
            'method' => $method,
            'action' => $action
        ];
    }
    
    public function dispatch($url) {
        // Limpiar la URL
        $url = $this->cleanUrl($url);
        
        // Verificar si la ruta existe
        if (array_key_exists($url, $this->routes)) {
            $route = $this->routes[$url];
            
            $controllerName = $route['controller'];
            $action = $route['action'];
            
            // Verificar si el controlador y el método existen
            if (class_exists($controllerName) {
                $controller = new $controllerName();
                
                if (method_exists($controller, $action)) {
                    // Llamar al método del controlador
                    call_user_func([$controller, $action]);
                    return;
                }
            }
        }
        
        // Ruta no encontrada
        $this->notFound();
    }
    
    private function cleanUrl($url) {
        // Eliminar parámetros GET
        $url = strtok($url, '?');
        
        // Eliminar barras al inicio y final
        $url = trim($url, '/');
        
        // Convertir a minúsculas (opcional)
        $url = strtolower($url);
        
        return $url ?: 'home';
    }
    
    private function notFound() {
        http_response_code(404);
        echo "Página no encontrada";
        exit;
    }
}
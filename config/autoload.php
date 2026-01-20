<?php
spl_autoload_register(function ($class) {
    // Directorios donde buscar las clases
    $directories = [
        'app/controllers/',
        'app/models/',
        'config/'
    ];
    
    // Reemplazar las barras invertidas por barras normales (para namespaces)
    $class = str_replace('\\', '/', $class);
    
    // Buscar la clase en los directorios
    foreach ($directories as $directory) {
        $file = __DIR__ . '/../' . $directory . $class . '.php';
        if (file_exists($file)) {
            require $file;
            return;
        }
    }
});
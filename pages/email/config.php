<?php

// Configuración del servidor SMTP
define('SMTP_HOST', 'smtp.hostinger.com'); // Servidor SMTP
define('SMTP_USERNAME', 'noreply@dendrite.com.co'); // Usuario SMTP
define('SMTP_PASSWORD', 'SinapsisT2025*'); // Contraseña SMTP
define('SMTP_PORT', 465); // Puerto SMTP (generalmente 587 para TLS)
define('SMTP_SECURE', 'ssl'); // 'tls' o 'ssl'
define('EMAIL_FROM', 'noreply@dendrite.com.co'); // Correo remitente
define('EMAIL_FROM_NAME', 'Soporte Dendrite'); // Nombre remitente
// Habilitar modo debug en desarrollo
define('SMTP_DEBUG', 2); // 0 = off, 1 = client messages, 2 = client and server messages

// Clave secreta para firmar tokens (debe ser segura y única)
define('JWT_SECRET', 'tu_clave_secreta_super_segura_123!');
// Tiempo de expiración de los tokens en segundos (por ejemplo, 3600 segundos = 1 hora)
define('JWT_EXPIRATION', 3600);
define('SESSION_KEY', 'App_dendrite'); // Clave de sesión para almacenar datos del usuario
?>



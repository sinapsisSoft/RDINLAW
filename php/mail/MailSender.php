<?php
class MailSender {
    private $smtpHost;
    private $smtpPort;
    private $smtpUsername;
    private $smtpPassword;
    private $smtpSecure; // 'tls' o 'ssl'
    private $fromEmail;
    private $fromName;
    private $templatePath;
    
    /**
     * Constructor de la clase
     * 
     * @param array $config Configuración del servidor SMTP
     * @param string $templatePath Ruta al directorio de plantillas
     */
    public function __construct(array $config, string $templatePath) {
        $this->smtpHost = $config['host'] ?? 'smtp.example.com';
        $this->smtpPort = $config['port'] ?? 587;
        $this->smtpUsername = $config['username'] ?? '';
        $this->smtpPassword = $config['password'] ?? '';
        $this->smtpSecure = $config['secure'] ?? 'tls';
        $this->fromEmail = $config['from_email'] ?? 'no-reply@example.com';
        $this->fromName = $config['from_name'] ?? 'Sistema de Notificaciones';
        $this->templatePath = rtrim($templatePath, '/') . '/';
    }
    
    /**
     * Envía un correo electrónico utilizando una plantilla
     * 
     * @param string $toEmail Correo del destinatario
     * @param string $subject Asunto del correo
     * @param string $templateName Nombre del archivo de plantilla (sin extensión)
     * @param array $data Datos para reemplazar en la plantilla
     * @return bool True si el envío fue exitoso
     */
    public function sendTemplateEmail(string $toEmail, string $subject, string $templateName, array $data = []): bool {
        // Obtener contenido de la plantilla
        $htmlContent = $this->getTemplateContent($templateName, $data);
        
        // Si no se pudo cargar la plantilla
        if ($htmlContent === false) {
            return false;
        }
        
        // Crear el transporte SMTP
        $transport = (new Swift_SmtpTransport($this->smtpHost, $this->smtpPort, $this->smtpSecure))
            ->setUsername($this->smtpUsername)
            ->setPassword($this->smtpPassword);
        
        // Crear el mailer
        $mailer = new Swift_Mailer($transport);
        
        // Crear el mensaje
        $message = (new Swift_Message($subject))
            ->setFrom([$this->fromEmail => $this->fromName])
            ->setTo([$toEmail])
            ->setBody($htmlContent, 'text/html');
        
        // Enviar el correo
        try {
            $result = $mailer->send($message);
            return $result > 0;
        } catch (Exception $e) {
            error_log('Error al enviar correo: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Envía un correo con enlace para cambio de contraseña
     * 
     * @param string $toEmail Correo del destinatario
     * @param string $userName Nombre del usuario
     * @param string $resetLink Enlace para restablecer contraseña
     * @return bool True si el envío fue exitoso
     */
    public function sendPasswordResetEmail(string $toEmail, string $userName, string $resetLink): bool {
        $subject = 'Restablecimiento de contraseña';
        $templateName = 'password_reset';
        
        $data = [
            'user_name' => $userName,
            'reset_link' => $resetLink,
            'current_year' => date('Y'),
            'company_name' => 'Tu Empresa',
            'support_email' => 'soporte@empresa.com'
        ];
        
        return $this->sendTemplateEmail($toEmail, $subject, $templateName, $data);
    }
    
    /**
     * Obtiene el contenido de una plantilla reemplazando variables
     * 
     * @param string $templateName Nombre del archivo de plantilla
     * @param array $data Datos para reemplazar
     * @return string|false Contenido de la plantilla o false si hay error
     */
    private function getTemplateContent(string $templateName, array $data): string|false {
        $templateFile = $this->templatePath . $templateName . '.html';
        
        if (!file_exists($templateFile) || !is_readable($templateFile)) {
            error_log('Plantilla no encontrada o no accesible: ' . $templateFile);
            return false;
        }
        
        // Leer el contenido de la plantilla
        $content = file_get_contents($templateFile);
        
        // Reemplazar las variables en la plantilla
        foreach ($data as $key => $value) {
            $placeholder = '{{' . $key . '}}';
            $content = str_replace($placeholder, $value, $content);
        }
        
        return $content;
    }
}
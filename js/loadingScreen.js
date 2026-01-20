// Objeto que controla la pantalla de carga
const LoadingScreen = {
    // Elemento DOM
    element: document.getElementById('loadingScreen'),
    
    // Mostrar pantalla de carga con fadeIn
    show: function(message = 'Cargando...') {
        // Actualizar mensaje si se proporciona
        if (message) {
            const messageElement = this.element.querySelector('h2');
            if (messageElement) {
                messageElement.textContent = message;
            }
        }
        
        // Activar pantalla
        this.element.classList.add('active');
        
        // Deshabilitar scroll del body
        document.body.style.overflow = 'hidden';
    },
    
    // Ocultar pantalla de carga con fadeOut
    hide: function() {
        this.element.classList.remove('active');
      document.body.style.overflow="auto";
      
    },
    
    // Mostrar por un tiempo determinado (ms)
    showTemporarily: function(duration = 2000, message) {
        this.show(message);
        setTimeout(() => this.hide(), duration);
    }
};


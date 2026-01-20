/**
 * Author:Diego Casallas 
 * Date: 10/06/2025 
 * Description: Module to handle user authentication and session validation.
 * This script checks for a valid authentication token in local storage
 * and redirects users based on their authentication status.
 */
window.document.addEventListener('DOMContentLoaded', () => {
  const idContainer = "main-container";
  const container = document.getElementById(idContainer);
  const storage = new AppStorage();
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes('/auth') || currentPath.endsWith('/login');

  // Ocultar body inicialmente
  
  container.style.display = 'none';
  LoadingScreen.show('Cargando...');

  // Función para redireccionar
  const redirect = (path) => {
    LoadingScreen.hide();
    window.location.href = path;
  };

  // Función para manejar sesión válida
  const handleValidSession = () => {
    if (isLoginPage) {
      // Si está en login pero tiene sesión válida, redirigir a dashboard
      redirect('../dashboard');
    } else {
      // Mostrar contenido para páginas protegidas
      fadeIn(idContainer, 500, () => {
        LoadingScreen.hide();
      });
     
    }
  };

  // Función para manejar sesión inválida
  const handleInvalidSession = () => {

    if (!isLoginPage) {
      // Si no está en login y no tiene sesión válida, redirigir a login
      redirect('../auth');
    } else {
      // Mostrar formulario de login

       fadeIn(idContainer, 500, () => {
        LoadingScreen.hide();
      });
      
    }
  };

  // Verificar token en almacenamiento
  const token = storage.getItem(KEY_STORAGE);

  if (token === null) {
    handleInvalidSession();
    return;
  }

 // console.log('Token found:', token);

  try {
    const requestData = {
      "type": "validateToken",
      "token": token
    };

    fetch('../../config/auth.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
       // console.log('Validation response:', data);

        if (data.success) {
          handleValidSession();
        } else {
          storage.removeItem(KEY_STORAGE); // Limpiar token inválido
          handleInvalidSession();
        }
      })
      .catch(error => {
        console.error('Error checking token:', error);
        handleInvalidSession();
      });

  } catch (error) {
    console.error('Error parsing token:', error.message);
    handleInvalidSession();
  }
});
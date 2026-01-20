
<?php
//////////////////////////////////////
//GENERAL CONSTANT VARIABLES

define("BASE_URL",__DIR__);
define("PASS","");
define("USER","root");
define("DB","");
define("URL_LOGO","assets/img/logos/logo_dendrite.png");
define("APP_LOGO","assets/img/logos/logo_dendrite.png");
define("APP_BACKGROUND","assets/img/background");
define("APP_DENDRITE","assets/img/logos/logo_dendrite.png");
//////////////////////////////////////
//URI CONSTANT VARIABLES
define('URI',$_SERVER['REQUEST_URI']);
define('REQUEST_METHOD', $_SERVER['REQUEST_METHOD']);

//////////////////////////////////////
//ROUTE CONSTANT VARIABLES
define('FOLDER_PATH', '/App');
define('ROOT', $_SERVER['DOCUMENT_ROOT']);
define('PATH_CSS',  'assets/css/');
define('PATH_META',  'assets/meta/');
define('PATH_JS',  'assets/js/');
define('PATH_CONTROLLERS_JS',  'assets/js/controllers/');
define('PATH_LIBRARIES_JS',  'assets/js/libraries/');
define('PATH_IMG_ICONS',  'assets/img/icons/');
define('PATH_IMG_LOGOS',  'assets/img/logos/');
define('PATH_VIEWS',  '../app/Views/');
define('PATH_FOOTER',  'assets/footer/');
define('PATH_CONTROLLERS', '../app/Controllers/');
define('PATH_MODELS', '../app/Models/');
define('PATH_INTERFACE', '../app/System/interface/');
define('PATH_SYSTEM_CORE', '../app/System/core/');
define('PATH_SYSTEM', '../app/System/');
define('HELPER_PATH', '../app/System/helpers/');

//////////////////////////////////////
//CORE CONSTANT VARIABLES
define('LOCAL_KEY', 'SINAPSIS_T');
define('KEY_HTTP', 'SINAPSIS_HASH_KEY_2025_901261786');
define('SESSION_USER', 'MY_SESSION_USER');
define('CORE', '../app/System/core/');
define('DEFAULT_CONTROLLER', 'Home');
define('DEFAULT_METHOD', 'index');
define('DEFAULT_ERROR', 'Error');
define('DEFAULT_METHOD_ERROR', 'index');
//////////////////////////////////////
//CORE CONSTANT VARIABLES FOR ERROR
define('DEFAULT_METHOD_ERROR_404', 'error404');
define('DEFAULT_METHOD_ERROR_500', 'error500');
define('DEFAULT_METHOD_ERROR_403', 'error403');

?>
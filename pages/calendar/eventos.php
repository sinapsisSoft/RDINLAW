<?php
require_once 'includes/database.php';

header('Content-Type: application/json');

// Obtener el ID del usuario de la sesión
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no autenticado']);
    exit;
}
$user_id = $_SESSION['user_id'];

$action = $_GET['action'] ?? '';

try {
    switch ($action) {
        case 'fetch':
            // Obtener eventos del usuario
            $stmt = $pdo->prepare("SELECT id, title, color, start, end, User_id FROM eventos WHERE User_id = ?");
            $stmt->execute([$user_id]);
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($events);
            break;
            
        case 'create':
            // Crear nuevo evento
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("INSERT INTO eventos (title, color, start, end, User_id) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['title'],
                $data['color'],
                $data['start'],
                $data['end'] ?? null,
                $user_id
            ]);
            
            echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'update':
            // Actualizar evento
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Verificar que el evento pertenezca al usuario
            $stmt = $pdo->prepare("SELECT User_id FROM eventos WHERE id = ?");
            $stmt->execute([$data['id']]);
            $event = $stmt->fetch();
            
            if (!$event || $event['User_id'] != $user_id) {
                echo json_encode(['status' => 'error', 'message' => 'No autorizado']);
                exit;
            }
            
            $stmt = $pdo->prepare("UPDATE eventos SET title = ?, color = ?, start = ?, end = ? WHERE id = ?");
            $stmt->execute([
                $data['title'],
                $data['color'],
                $data['start'],
                $data['end'] ?? null,
                $data['id']
            ]);
            
            echo json_encode(['status' => 'success']);
            break;
            
        case 'delete':
            // Eliminar evento
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Verificar que el evento pertenezca al usuario
            $stmt = $pdo->prepare("SELECT User_id FROM eventos WHERE id = ?");
            $stmt->execute([$data['id']]);
            $event = $stmt->fetch();
            
            if (!$event || $event['User_id'] != $user_id) {
                echo json_encode(['status' => 'error', 'message' => 'No autorizado']);
                exit;
            }
            
            $stmt = $pdo->prepare("DELETE FROM eventos WHERE id = ?");
            $stmt->execute([$data['id']]);
            
            echo json_encode(['status' => 'success']);
            break;
            
        default:
            echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
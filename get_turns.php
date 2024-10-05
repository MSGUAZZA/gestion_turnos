<?php
require_once 'Turno.php';

$search = isset($_GET['search']) ? $_GET['search'] : ''; // Obtener el parámetro de búsqueda si existe
$turno = new Turno();
echo json_encode($turno->getTurnos($search));
?>

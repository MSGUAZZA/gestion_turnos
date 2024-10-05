<?php
require_once 'Turno.php';

if (isset($_POST['name']) && isset($_POST['datetime'])) {
    $name = $_POST['name'];
    $datetime = $_POST['datetime'];

    $turno = new Turno();
    $turno->agregarTurno($name, $datetime);

    echo 'Turno agendado con éxito';
}
?>

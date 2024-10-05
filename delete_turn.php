<?php
require_once 'Turno.php';

if (isset($_POST['id'])) {
    $turnId = $_POST['id'];

    $turno = new Turno();
    $turno->eliminarTurno($turnId);

    echo 'Turno eliminado con éxito';
}
?>

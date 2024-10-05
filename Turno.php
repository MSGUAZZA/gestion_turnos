<?php
class Turno {
    private $file = 'turns.json'; // Archivo JSON donde se guardan los turnos

    // Método para obtener todos los turnos
    public function getTurnos($search = '') {
        if (file_exists($this->file)) {
            $turnos = json_decode(file_get_contents($this->file), true);
            if ($search) {
                // Filtrar turnos por nombre o fecha
                $turnos = array_filter($turnos, function ($turno) use ($search) {
                    return stripos($turno['name'], $search) !== false || stripos($turno['datetime'], $search) !== false;
                });
            }
            return $turnos;
        }
        return [];
    }

    // Método para agregar un nuevo turno
    public function agregarTurno($name, $datetime) {
        $turnos = $this->getTurnos();
        $turnos[] = ['name' => $name, 'datetime' => $datetime];
        file_put_contents($this->file, json_encode($turnos));
    }

    // Método para eliminar un turno
    public function eliminarTurno($id) {
        $turnos = $this->getTurnos();
        if (isset($turnos[$id])) {
            unset($turnos[$id]);
            $turnos = array_values($turnos); // Reindexar el array
            file_put_contents($this->file, json_encode($turnos));
        }
    }
}
?>

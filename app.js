$(document).ready(function () {
    // Función para obtener todos los turnos o filtrarlos
    function getTurns(query = '') {
        $.ajax({
            url: 'get_turns.php',
            method: 'GET',
            data: { search: query }, // Enviar la búsqueda como parámetro
            success: function (response) {
                let turns = JSON.parse(response);
                let turnList = '';
                turns.forEach(function (turn, index) {
                    turnList += `
                        <tr>
                            <td>${turn.name}</td>
                            <td>${turn.datetime}</td>
                            <td>
                                <button class="btn btn-danger btn-sm deleteTurn" data-id="${index}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#turnList').html(turnList);
            }
        });
    }

    // Llamar a getTurns cuando se cargue la página
    getTurns();

    // Manejar la búsqueda mientras se escribe
    $('#search').on('input', function () {
        let query = $(this).val();
        getTurns(query); // Filtrar mientras se escribe
    });

    // Manejar la búsqueda cuando se presiona "Enter"
    $('#search').on('keypress', function (e) {
        if (e.which === 13) { // 13 es la tecla Enter
            e.preventDefault(); // Evitar el comportamiento por defecto de Enter
            let query = $(this).val();
            getTurns(query); // Ejecutar la búsqueda al presionar Enter
        }
    });

    // Enviar nuevo turno
    $('#turnForm').on('submit', function (e) {
        e.preventDefault();
        let name = $('#name').val();
        let datetime = $('#datetime').val();
        if (name && datetime) {
            $.ajax({
                url: 'add_turn.php',
                method: 'POST',
                data: { name: name, datetime: datetime },
                success: function () {
                    $('#name').val(''); // Limpiar el campo de nombre
                    $('#datetime').val(''); // Limpiar el campo de fecha y hora
                    getTurns(); // Refrescar la lista de turnos
                }
            });
        }
    });

    // Eliminar un turno
    $(document).on('click', '.deleteTurn', function () {
        let turnId = $(this).data('id');
        $.ajax({
            url: 'delete_turn.php',
            method: 'POST',
            data: { id: turnId },
            success: function () {
                getTurns(); // Refrescar la lista de turnos después de eliminar
            }
        });
    });
});

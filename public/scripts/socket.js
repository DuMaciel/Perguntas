document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    var textArea = document.getElementById("questionText");
    const roomId = document.getElementById("room-id").dataset.id;

    textArea.addEventListener("keyup", function () {
        sessionStorage.setItem("autosave", roomId + textArea.value);
    });

    window.onload = function () {
        if (sessionStorage.getItem("autosave")) {
            let texto = sessionStorage.getItem("autosave");
            if (texto.slice(0, 6) == roomId) {
                textArea.value = texto.slice(6, texto.length);
            }
        } else {
            sessionStorage.clear();
        }
    }


    socket.on(`update question ${roomId}`, () => {
        window.location.reload();
    });
})






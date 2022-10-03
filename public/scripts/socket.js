document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    var textArea = document.getElementById("questionText");
    const roomId = document.getElementById("room-id").dataset.id;

    textArea.addEventListener("keyup", function () {
        sessionStorage.setItem("autosave", textArea.value);
    });
    window.onload = function () {
        if (sessionStorage.getItem("autosave"))
            textArea.value = sessionStorage.getItem("autosave");
    }


    socket.on(`update question ${roomId}`, () => {
        window.location.reload();
    });
})






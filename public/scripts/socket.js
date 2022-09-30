document.addEventListener("DOMContentLoaded", () => {
    const socket = io();


    const roomId = document.getElementById("room-id").dataset.id

    socket.on(`update question ${roomId}`, () => {
        window.location.reload();
    })
})

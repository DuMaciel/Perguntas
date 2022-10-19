document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const textArea = document.getElementById("questionText");
    const roomId = document.getElementById("room-id").dataset.id;


    //Não atualizar o site enquanto está em digitação continua
    //Persistencia de texto
    let atualizar = true;
    let idTime = 0;
    textArea.addEventListener("keyup", function () {
        sessionStorage.setItem("autosave", roomId + textArea.value);
        clearTimeout(idTime);
        atualizar = false;
        idTime = setTimeout(()=>atualizar=true, 3000);
    });
    
    //persistencia de foco
    textArea.addEventListener("focusin", () => {
        sessionStorage.setItem("focus", 'true');
    })
    textArea.addEventListener("focusout", () => {
        sessionStorage.setItem("focus", 'false');
    })
    

    window.onload = function () {
        if (sessionStorage.getItem("autosave")) {
            let texto = sessionStorage.getItem("autosave");
            let foco = sessionStorage.getItem("focus");
            if (texto.slice(0, 6) == roomId) {
                textArea.value = texto.slice(6, texto.length);
                if(foco == 'true'){
                    textArea.focus();
                }
            }
        } else {
            sessionStorage.clear();
        }
    }


    socket.on(`update question ${roomId}`, () => {
        refresh();
    });


function refresh(){
    if(atualizar){
        window.location.reload()
    }else{
        setTimeout(refresh,1000);
    }
}

});


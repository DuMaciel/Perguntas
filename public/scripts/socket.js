document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const textArea = document.getElementById("questionText");
    const roomId = document.getElementById("room-id").dataset.id;
    const questions = document.getElementById("question");


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


    socket.on(`update question ${roomId}`, (questionsVetor) => {
            console.log(questionsVetor);
            const questionsRead = questionsVetor.filter((value) => {return value.read==1});
            const questionsNotRead = questionsVetor.filter((value) => {return value.read==0});
            questions.innerHTML = "";
            questionsNotRead.forEach((questão) => {
                questions.innerHTML += `
                <div class="question-wrapper">
                  <div class="question-content">
                    <div class="user">
                      <img src="/images/user.svg" alt="Usuario" />
                    </div>
                    <div class="question">
                      <p>${questão.title}</p>
                    </div>
                  </div>
                  <div class="actions">
                    <a
                    href=""
                    class="check"
                    data-id="${questão.id_question}"
                    >
                    <img src="/images/check 1.svg" alt="Marcar como lida" />
                      Marcar como lida
                    </a>
                    <a
                      href=""
                      class="delete"
                      data-id="${questão.id_question}"
                    >
                      <img src="/images/trash 1.svg" alt="Excluir" /> Excluir
                    </a>
                  </div>
                </div>
                `});
              questionsRead.forEach((questão) => {
                questions.innerHTML += `
                <div class="question-wrapper read">
                  <div class="question-content">
                    <div class="user">
                      <img src="/images/user.svg" alt="Usuario" />
                    </div>
                    <div class="question">
                      <p>${questão.title}</p>
                    </div>
                  </div>
                  <div class="actions">
                    <a
                      href=""
                      class="delete"
                      data-id="${questão.id_question}"
                    >
                      <img src="/images/trash 1.svg" alt="Excluir" /> Excluir
                    </a>
                  </div>
                </div>
                `});
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                  bubbles: true,
                  cancelable: true
                }));
    });


function refresh(){
    if(atualizar){
        window.location.reload()
    }else{
        setTimeout(refresh,1000);
    }
}

});


import Modal from './modal.js'

document.addEventListener('DOMContentLoaded', () => {

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll(".actions a.check")


checkButtons.forEach(button => {
    const questionId = button.getAttribute("data-id")
    button.addEventListener("click", (event) => handleClick(event, questionId, true))
})

const deleteButton = document.querySelectorAll(".actions a.delete")
deleteButton.forEach(button => {
    const questionId = button.getAttribute("data-id")
    button.addEventListener("click", (event) => handleClick(event, questionId, false))
})

function handleClick(event, questionId, check) {
    event.preventDefault()
    const form = document.querySelector(".modal form")

    const roomId = document.querySelector("#room-id").dataset.id

    const slug = check ? "check" : "delete"

    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    

    modalTitle.innerHTML = check ? "Marcar como lido" : "Excluir"
    modalDescription.innerHTML = check ? "Tem certeza que deseja marcar como lida esta pergunta?" : "Tem certeza que deseja excluir esta pergunta?"

    if (screen.availWidth < 470) {
        modalButton.innerHTML = check ? "Marcar" : "Excluir"
    } else {
        modalButton.innerHTML = check ? "Sim, marcar" : "Sim, excluir"
    }
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}


const buttonId = document.getElementById('room-id')
buttonId.addEventListener("click", copiar)

async function copiar() {

    const roomId = document.querySelector("#room-id").dataset.id
    await navigator.clipboard.writeText(roomId)
}




const buttonCancelWarning = document.querySelector('.button.cancel.warning')

let url = document.URL
url = url.slice(0, url.indexOf('?'))

buttonCancelWarning.addEventListener('click', cancelar)

function cancelar() {
    window.location.href = url
}

const form = document.getElementById("question-form-form")
form.onsubmit = (e) => {
    e.preventDefault()
    const question = form.elements["questionText"].value
    const roomId = document.querySelector("#room-id").dataset.id
    if(question == ""){
        let url = document.URL
        url = url + '?error=1'
        window.location.href = url
    }else{
    const data = {
        "question": question
    }


    fetch(`/question/create/${roomId}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(() => {
        form.elements["questionText"].value = "";
        sessionStorage.clear("autosave");
    })
    }
}
});





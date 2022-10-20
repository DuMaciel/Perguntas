const modalWarning = document.querySelector('.modal-warning')
let url = document.URL
let urlError = url.slice(url.indexOf('?') + 1, url.indexOf('='))
let sala = url.slice(url.indexOf('=') + 1, url.length)
url = url.slice(0, url.indexOf('?'))

const texto = document.getElementById('texto')
if(texto != null)
texto.innerHTML = 'A sala ' + sala + ' não existe!'

if (urlError == 'error') {
    modalWarning.classList.add('active')
}

const buttonCancelWarning = document.querySelector('.button.cancel.warning')

if(buttonCancelWarning != null)
buttonCancelWarning.addEventListener('click', cancelar)

function cancelar() {
    window.location.href = url
}


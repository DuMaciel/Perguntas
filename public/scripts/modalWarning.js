console.log("teste")

const modalWarning = document.querySelector('.modal-warning')
let url = document.URL
let urlError = url.slice(url.indexOf('=') + 1, url.length)
url = url.slice(0, url.indexOf('?'))

console.log('urlerror', url, urlError)
if (urlError == 'true') {
    console.log(modalWarning)
    modalWarning.classList.add('active')
}

const buttonCancelWarning = document.querySelector('.button.cancel.warning')




buttonCancelWarning.addEventListener('click', cancelar)

function cancelar() {
    window.location.href = url
}
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
})

function valid(itemValue) {
    return this;
}

let errorName = document.createElement('p');
errorName.style.color = 'red';

let errorNumber = document.createElement('p');
errorNumber.style.color = 'red';

let errorEmail = document.createElement('p');
errorEmail.style.color = 'red';

function check() {

    errorName.innerHTML = '';
    const name = document.querySelector('.name');
    name.style.border = '1px solid black';
    const regexpName = /\b[A-zА-я]{2,}\b/;
    if (!regexpName.test(name.value)) {
        name.style.border = '1px solid red';
        errorName.innerHTML = 'Имя может содержать только буквы';
        name.parentElement.insertBefore(errorName, name);
    }

    errorNumber.innerHTML = '';
    const number = document.querySelector('.number');
    number.style.border = '1px solid black';
    const regexpNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
    if (!regexpNumber.test(number.value)) {
        number.style.border = '1px solid red';
        errorNumber.innerHTML = 'Номер должен иметь вид +7(000)000-0000.';
        number.parentElement.insertBefore(errorNumber, number);
    }

    errorEmail.innerHTML = '';
    const Email = document.querySelector('.Email');
    Email.style.border = '1px solid black';
    const regexpEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})/
    if (!regexpEmail.test(Email.value)) {
        Email.style.border = '1px solid red';
        errorEmail.innerHTML = 'E-mail должени иметь вид mymail@mail.ru,my.mail@mail.ru, или my-mail@mail.ru.';
        Email.parentElement.insertBefore(errorEmail, Email);
    }

}

const button = document.querySelector('.button')
button.addEventListener('click', check)
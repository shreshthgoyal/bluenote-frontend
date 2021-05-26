particlesJS.load("particles-js", "particles.json");

const password = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');

const password2 = document.querySelector('#pass2');
const togglePassword2 = document.querySelector('#togglePassword2');

const password3 = document.querySelector('#pass3');
const togglePassword3 = document.querySelector('#togglePassword3');


togglePassword.addEventListener('click', function (e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

togglePassword2.addEventListener('click', function (e) {
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

togglePassword3.addEventListener('click', function (e) {
    const type = password3.getAttribute('type') === 'password' ? 'text' : 'password';
    password3.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

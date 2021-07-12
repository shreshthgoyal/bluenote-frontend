particlesJS.load("particles-js", "particles.json");
const apiUrl = "https://rocky-anchorage-64506.herokuapp.com";

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

const signInForm = document.querySelector(".sign");

signInForm.addEventListener("click", (event) => {

  event.preventDefault();

  const signInEmail = document.querySelector(".mail");
  const signInPassword = document.querySelector(".pass");

  const email = signInEmail.value;
  const password = signInPassword.value;

  fetch(`${apiUrl}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        Swal.fire({
          icon: 'success',
          title: 'Welcome',
          text: `${data.message}`,
          allowOutsideClick: false,
          confirmButtontext: 'Continue',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = "../dashboard"
          }
        })

      } else {
        Swal.fire({
          icon: 'warning',
          text: 'Wrong Credentials, Try Again!',
        })
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    });
});


const signUpForm = document.querySelector(".register");

signUpForm.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.querySelector(".mailin").value;
  const name = document.querySelector(".name").value;
  const password = document.querySelector(".passin").value;
  const retypedPassword = document.querySelector(
    ".passin2"
  ).value;

  if (password !== retypedPassword) {
    Swal.fire({
      position: 'bottom',
      icon: 'warning',
      title: `Password's do not match!`,
      showConfirmButton: false,
      timer: 1000
    })
    return;
  }

  fetch(`${apiUrl}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const token = data;
      if (!token.error) {
        Swal.fire({
          title: 'Registered',
          text: `Welcome to Bluenote ${name}!`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sign In to Bluenote!'
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = "../signin-signup"
          }
        })
      } else {
        Swal.fire(
         `${data.error}`
        )
      }
    })
    .catch((err) => {
      Swal.fire(
        'Error Registering, Try again!'
      )
    });
});

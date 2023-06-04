const check = document.querySelector('#check');
const password = document.querySelector('#passwordForm');

check.addEventListener('change', () => {

  if(password.type === 'password') {
    password.type = 'text';
  }else {
    password.type = 'password';
  }

});

  // if()

  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.get('message')){
    swal("Usuario registrado!", "Usuario registrado!", "success");

    setTimeout(() => {
      window.location.href = `http://localhost:5000/login`;
    }, 1500);
  }

console.log();

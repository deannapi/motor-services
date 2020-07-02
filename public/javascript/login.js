async function signupFormHandler(event) {
    event.preventDefault();
  
    const full_name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // Whichever oil type radio button is selected 'Conventional' or 'Synthetic'
    // const synthOil = document.getElementById('#synth-radio');
    // const convOil = document.getElementById('#conv-radio');

    // if (synthOil.checked) {
    //   const oil_type = synthOil.value;
    //   return oil_type;
    // }
    // else {
    //   oil_type = convOil.value;
    // };
    const oil_type = document.querySelector('input[name="oilRadios"]:checked').value;

  
    if (full_name && email && password) {
      const response = await fetch ('/api/users', {
        method: 'post',
        body: JSON.stringify({
          full_name,
          email,
          password,
          oil_type
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      // check the response status
      if (response.ok) {
        console.log('Account created successfully.');
        window.alert('Account created successfully.');
      } else {
        alert(response.statusText);
        window.alert('Please try again.');
      }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
         headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.assign('/welcome');
      } else {
        alert(response.statusText);
        window.alert('Please try again.');
      }
    }
}

document.querySelector('#signup').addEventListener('click', signupFormHandler);
document.querySelector('.signup-form').addEventListener('keyup',  (e) => {
  if(e.keyCode === 13) {
    event.preventDefault();
    signupFormHandler(e);
  }
});

document.querySelector('#login').addEventListener('click', loginFormHandler);
document.querySelector('.login-form').addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    event.preventDefault();
    loginFormHandler(e);
  }
});

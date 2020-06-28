async function signupFormHandler(event) {
    event.preventDefault();
  
    const full_name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (full_name && email && password) {
      const response = await fetch ('/api/users', {
        method: 'post',
        body: JSON.stringify({
          full_name,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      // check the response status
      if (response.ok) {
        console.log('Account created successfully.');
      } else {
        alert(response.statusText);
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
      }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
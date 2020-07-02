// const session = require('express-session');

async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      window.location.assign('/');
    } else {
      console.log(response.statusText);
    }
  }
  
  document.querySelector('.logout').addEventListener('click', logout);
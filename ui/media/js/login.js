document.getElementById("loginButton").addEventListener("click", function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (verificarCredenciais(username, password)) {
      localStorage.setItem('username', username);
      window.location.href = '/home';
    } else {
      alert('Failed to login: Invalid username or password');
    }
  });
  
  document.getElementById("signupLink").addEventListener("click", function(event) {
    event.preventDefault();
    var username = prompt("Enter a username:");
    var password = prompt("Enter a password:");
  
    if (criarNovaConta(username, password)) {
      alert('Account created successfully!');
      localStorage.setItem('username', username);
      window.location.href = '/home';
    } else {
      alert('Failed to create account');
    }
  });
  
  function verificarCredenciais(username, password) {
    return username === 'admin' && password === 'password';
  }
  
  function criarNovaConta(username, password) {
    return true;
  }
  
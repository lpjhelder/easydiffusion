document.getElementById("loginButton").addEventListener("click", function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Aqui você pode fazer algo com o token, como armazená-lo em localStorage
        // e usá-lo para autenticar futuras solicitações
        localStorage.setItem('token', data.access_token);
        // Redirecionar para a página inicial após o login bem-sucedido
        window.location.href = '/home';
      })
      .catch((error) => {
        // Exibir uma mensagem de erro ao usuário
        alert('Failed to login: ' + error);
      });
  });
  
const fs = require('fs');
const express = require('express');
const app = express();
const port = 9000;

// Middleware para processar dados JSON
app.use(express.json());

// Caminho para a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ui/index.html');
});

// Caminho para a página home
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/ui/home.html');
});

// Rota para criar uma nova conta
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o arquivo accounts.json existe
  fs.access('accounts.json', fs.constants.F_OK, (err) => {
    if (err) {
      // O arquivo não existe, criar um novo array vazio
      const accounts = [];
      accounts.push({ username, password });

      // Converter os dados em formato JSON
      const jsonData = JSON.stringify(accounts);

      // Gravar os dados no arquivo accounts.json
      fs.writeFile('accounts.json', jsonData, (err) => {
        if (err) {
          console.error('Erro ao gravar os dados da conta:', err);
          res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
          console.log('Dados da conta foram gravados em accounts.json');
          res.sendStatus(200);
        }
      });
    } else {
      // O arquivo já existe, ler os dados existentes
      fs.readFile('accounts.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler os dados da conta:', err);
          res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
          const accounts = JSON.parse(data);
          accounts.push({ username, password });

          // Converter os dados em formato JSON
          const jsonData = JSON.stringify(accounts);

          // Gravar os dados no arquivo accounts.json
          fs.writeFile('accounts.json', jsonData, (err) => {
            if (err) {
              console.error('Erro ao gravar os dados da conta:', err);
              res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
              console.log('Dados da conta foram gravados em accounts.json');
              res.sendStatus(200);
            }
          });
        }
      });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

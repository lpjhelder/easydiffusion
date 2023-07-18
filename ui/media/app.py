from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('ui/index.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']

    # Verifica se o arquivo JSON existe
    try:
        with open('ui/accounts.json', 'r') as file:
            accounts = json.load(file)
    except FileNotFoundError:
        accounts = []

    # Verifica se o usuário já existe
    for account in accounts:
        if account['username'] == username:
            return jsonify({'message': 'Usuário já existe'})

    # Adiciona o novo usuário aos dados existentes
    accounts.append({'username': username, 'password': password})

    # Salva os dados no arquivo JSON
    with open('ui/accounts.json', 'w') as file:
        json.dump(accounts, file)

    return jsonify({'message': 'Registro bem-sucedido'})

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Verifica se o arquivo JSON existe
    try:
        with open('ui/accounts.json', 'r') as file:
            accounts = json.load(file)
    except FileNotFoundError:
        return jsonify({'message': 'Nenhum usuário registrado'})

    # Verifica se as credenciais são válidas
    for account in accounts:
        if account['username'] == username and account['password'] == password:
            return jsonify({'message': 'Login bem-sucedido'})

    return jsonify({'message': 'Usuário ou senha inválidos'})

if __name__ == '__main__':
    app.run()

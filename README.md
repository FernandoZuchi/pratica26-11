1. Planejamento do Projeto
Duração: 1 dia
Objetivo: Definir a arquitetura do projeto, ferramentas, e criar o ambiente de desenvolvimento.

Arquitetura do Projeto

Frontend: React.js com Vite para inicialização rápida.
Backend: Node.js com Express.
Banco de Dados: SQLite (armazenamento local simples e eficiente).
Design: Responsivo, usando CSS/SCSS ou frameworks como Tailwind CSS.
Controle de versão: Git e GitHub para colaboração.
Ferramentas adicionais: Figma para design, Postman para testes de API.
Configuração do Ambiente

Instalar Node.js e configurar o gerenciador de pacotes (npm ou yarn).
Instalar SQLite e ferramentas de administração, como DB Browser for SQLite.
Estrutura do Repositório

java
Copiar código
comercio/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── database.sqlite
│   └── package.json
├── README.md
├── .gitignore
└── .env
2. Desenvolvimento do Backend
Duração: 3 dias
Objetivo: Criar a API para gerenciar produtos, serviços e contatos.

Passo 1: Inicializar o Projeto
Criar o projeto do backend:
bash
Copiar código
mkdir backend
cd backend
npm init -y
npm install express sqlite3 cors dotenv
npm install --save-dev nodemon
Adicionar scripts no package.json:
json
Copiar código
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
Passo 2: Configurar o Servidor
Criar o arquivo principal src/app.js:
javascript
Copiar código
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
Passo 3: Configurar Banco de Dados
Criar o arquivo src/database.js:

javascript
Copiar código
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Conectado ao banco de dados SQLite.');
});

module.exports = db;
Criar tabelas:

javascript
Copiar código
const db = require('./database');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            imageUrl TEXT
        )
    `);
});
Passo 4: Criar Rotas
Criar rota para listar produtos:

javascript
Copiar código
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

module.exports = router;
Integrar rotas no app.js:

javascript
Copiar código
const productRoutes = require('./routes/products');
app.use('/api', productRoutes);
3. Desenvolvimento do Frontend
Duração: 4 dias
Objetivo: Criar a interface do usuário e consumir a API.

Passo 1: Inicializar o Projeto
Criar o projeto React:

bash
Copiar código
mkdir frontend
cd frontend
npm create vite@latest .
npm install
npm install axios react-router-dom
Estruturar o diretório src:

css
Copiar código
src/
├── components/
│   ├── ProductCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Contact.jsx
├── App.jsx
└── main.jsx
Passo 2: Criar Componentes
ProductCard.jsx:

javascript
Copiar código
import React from 'react';

const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
    </div>
);

export default ProductCard;
Home.jsx:

javascript
Copiar código
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Produtos</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
Criar navegação no App.jsx:

javascript
Copiar código
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
);

export default App;
4. Design Responsivo
Duração: 2 dias
Objetivo: Garantir que o site funcione em dispositivos móveis e desktops.

Configurar Tailwind CSS:

bash
Copiar código
npm install -D tailwindcss
npx tailwindcss init
Adicionar classes responsivas ao CSS dos componentes.

5. Testes e Finalização
Duração: 2 dias
Objetivo: Testar o sistema e corrigir bugs.

Testar o Backend

Testar endpoints com Postman.
Garantir que o banco de dados está persistindo corretamente.
Testar o Frontend

Verificar responsividade em diferentes dispositivos.
Garantir que as requisições à API estão funcionando.
6. Deploy
Duração: 1 dia
Objetivo: Hospedar o projeto.

Frontend: Deploy no Vercel.
Backend: Deploy no Render ou Railway.
Banco de Dados: Usar arquivo SQLite no backend.

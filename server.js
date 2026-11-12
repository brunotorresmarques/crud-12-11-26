require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true'
    ? { minVersion: 'TLSv1.2' }
    : undefined,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});



/////////////////////////////////////////////////

const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.json());

app.use(express.static('public'))

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
            return;
        }
        res.json(results);
    });
});

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    
    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], (err, results) => {
        if (err) {
            console.error('Erro ao criar usuário:', err);
            res.status(500).json({ error: 'Erro ao criar usuário' });
            return;
        }
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    });
});


app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
    db.query(sql, [nome, email, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.json({ message: 'Usuário atualizado com sucesso' });
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir usuário:', err);
            res.status(500).json({ error: 'Erro ao excluir usuário' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.json({ message: 'Usuário excluído com sucesso' });
    });
});

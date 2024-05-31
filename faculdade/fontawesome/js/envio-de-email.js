const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 8080; // Porta do servidor

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cade.roots@gmail.com',
        pass: 'Cade3110'
    }
});

app.use(bodyParser.json());

app.post('/recuperar-senha', (req, res) => {
    var txtEmail = document.getElementById("txtEmail");

    
    const mailOptions = {
        from: 'cade.roots@gmail.com',
        to: txtEmail,
        subject: 'Recuperação de Senha',
        text: 'Olá! Aqui estão as instruções para redefinir sua senha...'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar e-mail de recuperação de senha');
        } else {
            console.log('E-mail de recuperação de senha enviado: ' + info.response);
            res.send('E-mail de recuperação de senha enviado com sucesso');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

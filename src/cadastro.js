window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmail = document.getElementById("txtEmail");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {
        e.preventDefault();
        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var senha = txtSenha.value;
        var telefone = txtTelefone.value;
        var email = txtEmail.value;
        var genero = slcGenero.value;
    
        if (nome == "" || sobrenome == "" || senha == "" || telefone == "" || email == "" || genero == "") {
            var mensagem = "Todos os campos são obrigatórios.";
            exibirMensagemErro(mensagem);
        } else {
            var resultado = criarConta(nome, sobrenome, email, telefone, genero, senha);
            if (resultado.sucesso) {
                alert(resultado.mensagem);
                // Redirecionar para página de login ou qualquer outra ação necessária
            } else {
                exibirMensagemErro(resultado.mensagem);
            }
        }
    };
    

    // Função para criar uma nova conta de usuário
function criarConta(nome, sobrenome, email, telefone, genero, senha) {
    // Carregar os dados de usuários existentes
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se o email já está em uso
    var usuarioExistente = usuarios.find(function(usuario) {
        return usuario.email === email;
    });

    if (usuarioExistente) {
        return { sucesso: false, mensagem: "O email já está em uso." };
    } else {
        // Adicionar o novo usuário à lista de usuários
        var novoUsuario = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            telefone: telefone,
            genero: genero,
            senha: senha
        };
        usuarios.push(novoUsuario);

        // Salvar os dados atualizados no armazenamento local
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        return { sucesso: true, mensagem: "Conta criada com sucesso." };
    }
}

// Função para fazer login
function fazerLogin(email, senha) {
    // Carregar os dados de usuários existentes
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se existe um usuário com o email fornecido
    var usuario = usuarios.find(function(usuario) {
        return usuario.email === email;
    });

    if (usuario && usuario.senha === senha) {
        return { sucesso: true, mensagem: "Login bem-sucedido.", usuario: usuario };
    } else {
        return { sucesso: false, mensagem: "Email ou senha incorretos." };
    }
}
document.getElementById("formCadastro").onsubmit = function(e) {
    e.preventDefault();

    var nome = document.getElementById("txtNome").value;
    var sobrenome = document.getElementById("txtSobrenome").value;
    var email = document.getElementById("txtEmail").value;
    var telefone = document.getElementById("txtTelefone").value;
    var genero = document.getElementById("slcGenero").value;
    var senha = document.getElementById("txtSenha").value;

    var resultado = criarConta(nome, sobrenome, email, telefone, genero, senha);

    if (resultado.sucesso) {
        // Conta criada com sucesso, redirecione ou faça qualquer outra coisa necessária
        alert(resultado.mensagem);
    } else {
        // Exiba mensagem de erro
        alert(resultado.mensagem);
    }
};


}


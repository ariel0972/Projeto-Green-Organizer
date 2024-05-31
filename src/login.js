window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");
    var txtEmail = document.getElementById("txtEmail");
    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    function fazerLogin(email, senha) {
        var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
        var usuario = usuarios.find(function(usuario) {
            return usuario.email === email;
        });
    
        if (usuario && usuario.senha === senha) {
            return { sucesso: true, mensagem: "Login bem-sucedido.", usuario: usuario};
        } else {
            exibirMensagemErro("Email ou senha incorretos");
        }
    }
    

    btnEntrar.onclick = function (e) {
        e.preventDefault();

        var email = txtEmail.value;
        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Campo E-mail obrigatório.");
        }
        else if (senha == "") {
            exibirMensagemErro("Campo Senha obrigatório.");
        }
        else {
            var resultado = fazerLogin(email, senha);
            if (resultado.sucesso) {
                window.location.href = "http://localhost:5501/To-do/to-do.html";
            } else {
                alert(resultado.mensagem);
            }
        }
    };

    //função pra exibir o erro na caixa de login
    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;
        spnErro.style.display = "block";
        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
        
    }

    document.getElementById("formLogin").onsubmit = function(e) {
        e.preventDefault();
    
        var email = document.getElementById("txtEmail").value;
        var senha = document.getElementById("txtSenha").value;
    
        var resultado = fazerLogin(email, senha);
    
        if (resultado.sucesso) {
            // Login bem-sucedido, redirecione para a página de tarefas
            window.location.href = "http://localhost:5501/To-do/to-do.html";
        } else {
            // Exiba mensagem de erro
            alert(resultado.mensagem);
        }
        
    };
}

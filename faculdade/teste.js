document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtenha os valores inseridos pelo usuário
    const emailInserido = document.getElementById("email").value;
    const senhaInserida = document.getElementById("senha").value;

    // Carregue o arquivo JSON (substitua pelo caminho correto)
    fetch("usuarios.json")
        .then(response => response.json())
        .then(data => {
            const usuarios = data.usuarios;
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailInserido && usuario.senha === senhaInserida);

            if (usuarioEncontrado) {
                // Redirecione para outra página (substitua pelo caminho correto)
                window.location.href = "/to-do/to-do.html";
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
});

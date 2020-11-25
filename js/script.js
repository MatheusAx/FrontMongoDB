// Criação de variaveis para representar os campos do formulario
var nome = document.getElementById("txtnome");
var email = document.getElementById("txtemail");
var telefone = document.getElementById("txttelefone");
var cpf = document.getElementById("txtcpf");
var idade = document.getElementById("txtidade");
var btn = document.getElementById("btnCadastrar");

btn.onclick = function () {
  //Vamos usar a função fatch para usar a url da api e cadastrar os dados
  fetch("http://localhost:3000/cadastro", {
    method: "POST",
    headers: {
      accept: "aplication/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomecliente: nome.value,
      email: email.value,
      telefone: telefone.value,
      cpf: cpf.value,
      idade: idade.value,
    }),
  })
    .then((response) => response.json())
    .then((rs) => {
      alert("Cadastro concluido com sucesso");
      // Vamos recarregar a pagina e limpar
      //os campos
      window.location.reload();
    })
    .catch((erro) => console.error(`Erro ao tetnar cadastrar ${erro}`));
};

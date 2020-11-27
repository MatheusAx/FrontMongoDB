// Criação de variaveis para representar os campos do formulario
var nome = document.getElementById("txtnome");
var email = document.getElementById("txtemail");
var telefone = document.getElementById("txttelefone");
var cpf = document.getElementById("txtcpf");
var idade = document.getElementById("txtidade");
var btn = document.getElementById("btnCadastrar");
var btnAtualizar =document.getElementById("btnAtualizar");

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

function listarClientes() {
  var tabela = document.getElementById("tabela");

  fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((rs) => {
      for (var i = 0; i < rs.saida.length; i++) {
        tabela.innerHTML += "<tr>";
        tabela.innerHTML += "<td>" + rs.saida[i]._id + "</td>"+
         "<td>" + rs.saida[i].nomecliente + "</td>"+
         "<td>" + rs.saida[i].email + "</td>"+
         "<td>" + rs.saida[i].telefone + "</td>"+
         "<td>" + rs.saida[i].cpf + "</td>"+
         "<td>" + rs.saida[i].idade + "</td>"+
         "<td>" + rs.saida[i].datacadastro + "</td>"+

         '<td> <a href="atualizar.html?id='+rs.saida[i]._id +'"> <i class="material-icons" style= "cursor:pointer"> refresh </i> </a> </td>'+
         
         '<td> <i class="material-icons" style= "cursor:pointer" onclick= "apagar(\'' + rs.saida[i]._id +"')\">  delete </i> </td>"+
         
         
         "</tr>";
      }
    });
}



function apagar(id){
  if(confirm("Você tem certeza que deseja apagar esse cliente?") == 1) {
    fetch("http://localhost:3000/apagar/"+id,{
      method: "DELETE",
      headers:{
        accept:"application/json",
        "Content-Type":"application/json"
      }
    })
    .then ((response)=>response.json())
    .then (rs => {
      alert(rs.resultado);
      window.location.reload();
    })
    .catch(erro => console.error(`Erro ao tentar apagar ${erro}`));
  }
}


function atualizar(){

  var ds = window.location.search;
  var qtd = window.location.search.length;//quantidade de caracteres no search

  var rs = window.location.search.substring(4,qtd);


  fetch("http://localhost:3000/atualizar/" + rs,{
  method:"PUT",
  headers:{
    accept: "application/json",
    "content-type":"application/json"
  },
  body:JSON.stringify({
      nomecliente: nome.value,
      email: email.value,
      telefone: telefone.value,
      cpf: cpf.value,
      idade: idade.value,


    })

  }).then( (response)=>response.json() )
  .then(rs => {
    alert(rs.resultado);
    window.location.reload();
  })
  .catch(erro => console.error(`Erro ao tentar atualizar ${erro}`)); 
}

document.getElementById("btnAtualizar").onclick = function () {
  alert("Atualização feita com sucesso");
}
const base_url = "https://api.box3.work/api/Contato";

function post(url, body) {
  console.log("Body=", body);
  const request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(body));

  request.onload = function () {
    console.log(this.responseText);
  };

  return request.responseText;
}

function createContact() {
  event.preventDefault();
  const url = "https://api.box3.work/api/Contato";
  const nome = document.getElementById("create-nome").value;
  const telefone = document.getElementById("create-telefone").value;
  const email = document.getElementById("create-email").value;
  const nascimento = document.getElementById("create-nascimento").value;

  body = {
    nome: nome,
    telefone: telefone,
    email: email,
    ativo: true,
    nascimento: nascimento,
  };

  post(url, body);
}

function get(url) {
  const request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function criaLinha(contato) {
  // console.log(contato);

  linha = document.createElement("tr");
  tdId = document.createElement("td");
  tdNome = document.createElement("td");
  tdTelefone = document.createElement("td");
  tdEmail = document.createElement("td");
  tdAtivo = document.createElement("td");
  tdNascimento = document.createElement("td");

  tdId.innerHTML = contato.id;
  tdNome.innerHTML = contato.nome;
  tdTelefone.innerHTML = contato.telefone;
  tdEmail.innerHTML = contato.email;
  tdAtivo.innerHTML = contato.ativo;
  tdNascimento.innerHTML = contato.dataNascimento;

  linha.appendChild(tdId);
  linha.appendChild(tdNome);
  linha.appendChild(tdTelefone);
  linha.appendChild(tdEmail);
  linha.appendChild(tdAtivo);
  linha.appendChild(tdNascimento);

  // console.log(linha);
  return linha;
}

function fillTable() {
  const data = get(base_url);
  const contatos = JSON.parse(data);
  const tabela = document.querySelector(".tabela");

  contatos.forEach((element) => {
    const linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function getById(id) {
  id = document.querySelector("#list-by-id").value;
  const data = get(`${base_url}/${id}`);
  const contato = JSON.parse(data);

  const linha = criaLinha(contato);
  const tabela = document.querySelector(".tabela-by-id");
  tabela.appendChild(linha);

  document.querySelector("#list-by-id").value = "";

  console.log(contato);
}

function deleteContato(id) {
  id = document.querySelector("#deletar-contato-id").value;
  fetch(`${base_url}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      console.log("Removed");
    })
    .catch((err) => {
      console.log("ID INEXISTENTE");
    });
}

function put(url, body) {
  console.log("Body=", body);
  const request = new XMLHttpRequest();
  request.open("PUT", url, false);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(body));

  request.onload = function () {
    console.log(this.responseText);
  };

  return request.responseText;
}

function editarContato() {
  event.preventDefault();
  const id = document.getElementById("put-id").value;

  const url = `${base_url}/${id}`;
  const nome = document.getElementById("edit-nome").value;
  const telefone = document.getElementById("edit-telefone").value;
  const email = document.getElementById("edit-email").value;
  const nascimento = document.getElementById("edit-nascimento").value;

  body = {
    nome: nome,
    telefone: telefone,
    email: email,
    ativo: true,
    nascimento: nascimento,
  };

  put(url, body);
}

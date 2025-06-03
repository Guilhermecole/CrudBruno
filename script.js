function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrar(usuarios = obterUsuarios()) {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  usuarios.forEach(u => {
    tabela.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.login}</td>
        <td>${u.senha}</td>
      </tr>
    `;
  });
}

function cadastrar() {
  const id = parseInt(document.getElementById("id").value);
  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!id || !login || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuarios = obterUsuarios();
  if (usuarios.some(u => u.id === id)) {
    alert("ID já existe!");
    return;
  }

  usuarios.push({ id, login, senha });
  salvarUsuarios(usuarios);
  mostrar();
  alert("Usuário cadastrado com sucesso!");
  limparCampos();
}

function atualizar() {
  const id = parseInt(document.getElementById("id").value);
  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!id || !login || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuarios = obterUsuarios();
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) {
    alert("ID não encontrado!");
    return;
  }

  usuarios[index] = { id, login, senha };
  salvarUsuarios(usuarios);
  mostrar();
  alert("Usuário atualizado com sucesso!");
  limparCampos();
}

function apagar() {
  const id = parseInt(document.getElementById("id").value);
  if (!id) {
    alert("Informe um ID para apagar!");
    return;
  }

  const usuarios = obterUsuarios();
  const novosUsuarios = usuarios.filter(u => u.id !== id);
  if (novosUsuarios.length === usuarios.length) {
    alert("ID não encontrado!");
    return;
  }

  salvarUsuarios(novosUsuarios);
  mostrar();
  alert("Usuário apagado com sucesso!");
  limparCampos();
}

function buscar() {
  const termo = document.getElementById("buscarInput").value.toLowerCase();
  const usuarios = obterUsuarios();
  const filtrados = usuarios.filter(u => u.login.toLowerCase().includes(termo));
  mostrar(filtrados);
}

function limparCampos() {
  document.getElementById("id").value = "";
  document.getElementById("login").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("buscarInput").value = "";
}

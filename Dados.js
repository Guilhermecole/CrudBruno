function GetUsers() {
  if (!localStorage.getItem("usuarios")) {
    const dadosIniciais = [
      { id: 1, login: "paulo", senha: "12340" },
      { id: 2, login: "anel", senha: "2233" },
      { id: 3, login: "john", senha: "2255" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(dadosIniciais));
  }
  mostrar();
}

function suma() {
    localStorage.setItem("operation","s");
    mostrar("Suma");
  }
function resta() {
    localStorage.setItem("operation","r");
    mostrar("Res");
}
function multiplicacion() {
    localStorage.setItem("operation","m");
    mostrar("Mul");
}
function random() {
    localStorage.setItem("operation","a");
    mostrar("Ale");
}
function operacion(op) {
    localStorage.setItem("operation", op);
    console.log(localStorage.getItem("operation"));
}
function jugar() {
    window.location.href="paginas/game.html";
}
function carga() {
  switch (localStorage.getItem("operation")) {
    case "s":
      suma();
      break;
      case "r":
      resta();
      break;
      case "m":
      multiplicacion();
      break;
      case "a":
      random();
      break;
  
    default:
      suma();
      break;
  }
}
function mostrar(dato) {
    for (let i = 1; i <= 3; i++) {
      const valor = (localStorage.getItem("TOP"+dato+i) || 0);
      const divValores = document.getElementById("top"+i);
      divValores.textContent = valor;
    }
}

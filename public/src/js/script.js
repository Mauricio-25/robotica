
document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  /*
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

*/

  // ! SELECCIONAR ELEMENTOS DEL DOM

  const btnMovUp = document.getElementById("btnMovUp");
  const btnMovLeft = document.getElementById("btnMovLeft");
  const btnMovDown = document.getElementById("btnMovDown");
  const btnMovRight = document.getElementById("btnMovRight");

  const inputsRange = document.querySelectorAll("input[type='range'");
  const buttons = document.querySelectorAll(".toggleOpen");

  // ! EVENTO DE MOVIMIENTO DEL CARRITO

  // * Función para prevenir el arrastre de imágenes
  const preventDefault = (event) => {
    event.preventDefault();
  };

  // * Asignar preventDefault a todas las imágenes
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("mousedown", preventDefault);
  });

  let intervalId;

  const startMoving = (direction) => {
    socket.emit("mover", direction);
    intervalId = setInterval(() => {
      socket.emit("mover", direction);
      console.log(`El carrito se mueve a la direccion: ${direction}`);
    }, 100); // Emitir evento de movimiento cada 100 milisegundos
  };

  const stopMoving = () => {
    clearInterval(intervalId);
    socket.emit("detener");
    console.log("El carrito se detuvo");
  };

  // * HACIA ADELANTE

  if (btnMovUp) {
    btnMovUp.addEventListener("mousedown", () => startMoving("up"));
    btnMovUp.addEventListener("mouseup", stopMoving);
    btnMovUp.addEventListener("mouseleave", stopMoving);
  }

  // * HACIA LA IZQUIERDA

  if (btnMovLeft) {
    btnMovLeft.addEventListener("mousedown", () => startMoving("left"));
    btnMovLeft.addEventListener("mouseup", stopMoving);
    btnMovLeft.addEventListener("mouseleave", stopMoving);
  }

  // * HACIA ABAJO

  if (btnMovDown) {
    btnMovDown.addEventListener("mousedown", () => startMoving("down"));
    btnMovDown.addEventListener("mouseup", stopMoving);
    btnMovDown.addEventListener("mouseleave", stopMoving);
  }

  // * HACIA LA DERECHA

  if (btnMovRight) {
    btnMovRight.addEventListener("mousedown", () => startMoving("right"));
    btnMovRight.addEventListener("mouseup", stopMoving);
    btnMovRight.addEventListener("mouseleave", stopMoving);
  }

  // * LEER DATOS DEL SERVIDOR SOCKET

  socket.on("mover", (direction) => {
    if (direction == "up") {
      btnMovUp.style.background = `#355BBF`;
    }

    if (direction == "left") {
      btnMovLeft.style.background = `#2183BA`;
    }

    if (direction == "down") {
      btnMovDown.style.background = `#355BBF`;
    }

    if (direction == "right") {
      btnMovRight.style.background = `#2183BA`;
    }

  });

  socket.on("detener", () => {
    btnMovUp.style.background = `#4678FB`;
    btnMovDown.style.background = `#4678FB`;
    btnMovLeft.style.background = `#32B5FF`;
    btnMovRight.style.background = `#32B5FF`;

  });


  // ! EVENTO DEL BRAZO ROBOTICO

  if(inputsRange) {
    for(let i=0; i<inputsRange.length; i++) {
      inputsRange[i].addEventListener("input", ()=>{
        let valor = inputsRange[i].value;
        let span = inputsRange[i].parentNode.parentNode.querySelector(".span");
        let dataSocket = inputsRange[i].getAttribute('data-socket');

        span.innerHTML = `${valor}°`;

        socket.emit(`${dataSocket}`, valor);

      })
    }
  }

  if(buttons) {
    for(let i=0; i<buttons.length; i++) {
      buttons[i].addEventListener("click", ()=>{
        let texto = buttons[i].parentNode.querySelector(".texto");
        let circulo = buttons[i].children[0];
        let dataSocket = buttons[i].getAttribute('data-socket');

        if (texto.innerHTML == "Abierto") {
          texto.innerHTML = `Cerrado`;
          buttons[i].classList.add("bg-[#C6C6C6]");
          buttons[i].classList.remove("bg-[#0076CC]");
          circulo.classList.add("left-[3px]");
          circulo.classList.remove("left-[23px]");

          socket.emit(`${dataSocket}`, false);
        } 

        else {
          texto.innerHTML = `Abierto`;
          buttons[i].classList.remove("bg-[#C6C6C6]");
          buttons[i].classList.add("bg-[#0076CC]");
          circulo.classList.remove("left-[3px]");
          circulo.classList.add("left-[23px]");

          socket.emit(`${dataSocket}`, true);
        }
      })
    }
  }

  // * LEER DATOS DEL SERVIDOR SOCKET

  socket.on("range_base", (valor) => {
    
    let input =  devolverInput("range_base");
    let span = input.parentNode.parentNode.querySelector(".span");

    input.value = valor;
    span.innerHTML = `${valor}°`;

  });

  socket.on("range_cuerpo", (valor) => {
    
    let input =  devolverInput("range_cuerpo");
    let span = input.parentNode.parentNode.querySelector(".span");

    input.value = valor;
    span.innerHTML = `${valor}°`;

  });

  socket.on("range_brazo", (valor) => {
    
    let input =  devolverInput("range_brazo");
    let span = input.parentNode.parentNode.querySelector(".span");

    input.value = valor;
    span.innerHTML = `${valor}°`;

  });

  socket.on("garra", (valor) => {
    
    let button =  devolverButton("garra");
    let texto = button.parentNode.querySelector(".texto");
    let circulo = button.children[0];

    if (valor) {
      texto.innerHTML = "Abierto";
      button.classList.remove("bg-[#C6C6C6]");
      button.classList.add("bg-[#0076CC]");
      circulo.classList.remove("left-[3px]");
      circulo.classList.add("left-[23px]");
    }
    
    else {
      texto.innerHTML = "Cerrado";
      button.classList.add("bg-[#C6C6C6]");
      button.classList.remove("bg-[#0076CC]");
      circulo.classList.add("left-[3px]");
      circulo.classList.remove("left-[23px]");
    }

  });

  //

  function devolverInput(evento) {
    for(let i=0; i<inputsRange.length; i++) {
      if (inputsRange[i].getAttribute("data-socket") == `${evento}`) {
        return inputsRange[i];
      }
    }
  }

  function devolverButton(evento) {
    for(let i=0; i<buttons.length; i++) {
      if (buttons[i].getAttribute("data-socket") == `${evento}`) {
        return buttons[i];
      }
    }
  }

})


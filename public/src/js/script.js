
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
  // ! CORREGIR EL MOVER LA PANTALLA CON LOS INPUTS

  const rangeInputs = document.querySelectorAll('input[type="range"]');

  if(rangeInputs) {
    rangeInputs.forEach(input => {
      input.addEventListener('mousedown', disableScroll);
      input.addEventListener('mouseup', enableScroll);
      input.addEventListener('touchstart', disableScroll, { passive: true });
      input.addEventListener('touchend', enableScroll, { passive: true });
    });
  }

  function disableScroll() {
    document.querySelector("main").classList.remove('overflow-y-auto');
    document.querySelector("main").classList.add('overflow-hidden');
    document.querySelector("main").classList.add('pr-2');
  }

  function enableScroll() {
    document.querySelector("main").classList.add('overflow-y-auto');
    document.querySelector("main").classList.remove('overflow-hidden');
    document.querySelector("main").classList.remove('pr-2');
  }

  // ! Prevent pull-to-refresh
  let startY = null;

  function handleInput(input) {
    // Check if the input is at its top or bottom limit
    if ((input.value == input.min && startY < input.getBoundingClientRect().top) ||
        (input.value == input.max && startY > input.getBoundingClientRect().bottom)) {
      input.style.touchAction = 'auto'; // Allow vertical scroll
    } else {
      input.style.touchAction = 'none'; // Disable vertical scroll
    }
  }

  document.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY; // Store the initial touch position
  });

  document.addEventListener('touchmove', (event) => {
    if (startY !== null) {
      let input = document.querySelector('.inputVertical');
      if (input) {
        handleInput(input); // Check if input is at its limit
      }
    }
  });

  document.addEventListener('touchend', () => {
    startY = null; // Reset the initial touch position
    let input = document.querySelector('.inputVertical');
    if (input) {
      input.style.touchAction = 'none'; // Reset touch action
    }
  });


  // ! CORREGIR LOS TOUCH DE LAS IMAGENES DE MOVIMIENTO

  // Obtener las imágenes dentro de los botones
  const btnMovUpImg = document.querySelector('#btnMovUp img');
  const btnMovLeftImg = document.querySelector('#btnMovLeft img');
  const btnMovDownImg = document.querySelector('#btnMovDown img');
  const btnMovRightImg = document.querySelector('#btnMovRight img');

  // Evitar la selección de la imagen en dispositivos táctiles
  if(btnMovUpImg) {
    btnMovUpImg.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Evitar la acción táctil predeterminada
    });
  }
  if(btnMovLeftImg) {
    btnMovLeftImg.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Evitar la acción táctil predeterminada
    });
  }
  if(btnMovDownImg) {
    btnMovDownImg.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Evitar la acción táctil predeterminada
    });
  }
  if(btnMovRightImg) {
    btnMovRightImg.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Evitar la acción táctil predeterminada
    });
  }

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
      btnMovUp.classList.add("bg-[#355BBF]");
      btnMovUp.classList.remove("bg-[#4678FB]")

      btnMovUp.classList.remove("shadow-[3px_3px_0_#D7D7D7]")
      btnMovUp.classList.add("shadow-none")
    }

    if (direction == "left") {
      btnMovLeft.classList.add("bg-[#2183BA]");
      btnMovLeft.classList.remove("bg-[#32B5FF]");

      btnMovLeft.classList.remove("shadow-[3px_3px_0_#D7D7D7]")
      btnMovLeft.classList.add("shadow-none")
    }

    if (direction == "down") {
      btnMovDown.classList.add("bg-[#355BBF]")
      btnMovDown.classList.remove("bg-[#4678FB]")

      btnMovDown.classList.remove("shadow-[3px_3px_0_#D7D7D7]")
      btnMovDown.classList.add("shadow-none")
    }

    if (direction == "right") {
      btnMovRight.classList.add("bg-[#2183BA]");
      btnMovRight.classList.remove("bg-[#32B5FF]");

      btnMovRight.classList.remove("shadow-[3px_3px_0_#D7D7D7]")
      btnMovRight.classList.add("shadow-none")
    }

  });

  socket.on("detener", () => {
    btnMovUp.classList.remove("bg-[#355BBF]");
    btnMovUp.classList.add("bg-[#4678FB]")

    btnMovDown.classList.remove("bg-[#355BBF]")
    btnMovDown.classList.add("bg-[#4678FB]")

    btnMovLeft.classList.remove("bg-[#2183BA]");
    btnMovLeft.classList.add("bg-[#32B5FF]");

    btnMovRight.classList.remove("bg-[#2183BA]");
    btnMovRight.classList.add("bg-[#32B5FF]");

    //

    btnMovUp.classList.add("shadow-[3px_3px_0_#D7D7D7]")
    btnMovUp.classList.remove("shadow-none")

    btnMovLeft.classList.add("shadow-[3px_3px_0_#D7D7D7]")
    btnMovLeft.classList.remove("shadow-none")
    
    btnMovDown.classList.add("shadow-[3px_3px_0_#D7D7D7]")
    btnMovDown.classList.remove("shadow-none")

    btnMovRight.classList.add("shadow-[3px_3px_0_#D7D7D7]")
    btnMovRight.classList.remove("shadow-none")

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

  socket.on("bluetooth", (valor) => {
    
    if(valor) {
      btnConectar.classList.add("bg-[#C6C6C6]");
    } else {
      btnConectar.classList.remove("bg-[#C6C6C6]");
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


  // ! CONECTAR CON BLUETOOTH 

  let bluetoothDevice;

  async function connect() {
    try {
      // Solicitar permiso para acceder al dispositivo Bluetooth
      bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['serial'] }] // Filtro para el servicio serial Bluetooth
      });
  
      // Conectar al dispositivo Bluetooth
      const server = await bluetoothDevice.gatt.connect();
  
      // Obtener el servicio serial
      const service = await server.getPrimaryService('serial');
  
      // Obtener la característica para escribir datos
      const characteristic = await service.getCharacteristic('write');
  
      // Función para enviar un comando al Arduino
      function enviarDireccion(direction) {
        const encoder = new TextEncoder();
        characteristic.writeValue(encoder.encode(direction));
      }
  
      // Ejemplo de enviar comandos al Arduino
      enviarDireccion('up'); // Avanzar
      enviarDireccion('left');    // Girar a la izquierda
  
      // Escuchar datos recibidos del Arduino
      /*
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const decoder = new TextDecoder();
        console.log('Datos recibidos:', decoder.decode(event.target.value));
      });
      */
  
      // Habilitar notificaciones de la característica para recibir datos
      //await characteristic.startNotifications();

      btnConectar.style.background = `#9FDCFF`;
      btnConectar.classList.remove("cursor-pointer");
      btnConectar.classList.remove("hover:bg-slate-100");

      socket.emit("bluetooth", true);
  
    } catch (error) {
      console.error('Error al conectar con el dispositivo Bluetooth:', error);
    }
  }

  // * Event listener para el botón de conexión
  const btnConectar = document.getElementById('conectar');
  if(btnConectar) {
    btnConectar.addEventListener('click', connect);
  }
  

})


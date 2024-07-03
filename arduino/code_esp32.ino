
/*

  A = GARRA
  B = BRAZO
  C = CUERPO
  D = BASE
  

*/


#include <ESP32Servo.h>
#include <Stepper.h>

Servo servomotor4; //Servomotor GARRA
Servo servomotor3; //Servomotor BRAZO
Servo servomotor2; //Servomotor CUERPO
Servo servomotor1; //Servomotor BASE
Stepper motor(2048, 4, 6, 5, 7);

void setup() {

  Serial.begin(115200); // Inicia la comunicación serial a 115200 bps

  // Servo
  servomotor3.attach(12);
  servomotor3.attach(11);
  servomotor2.attach(10);
  servomotor1.attach(9);
  motor.setSpeed(5);
}

void loop() {

  char primerCaracter;
  char letra;
  String datoCompleto;
  int dato;

  if (Serial.available()) {
    primerCaracter = Serial.read(); // Lee el primer carácter
    if (isAlpha(primerCaracter)) {
        // Es una letra (A-Z o a-z)
        letra = primerCaracter;
        datoCompleto = Serial.readString(); // Lee el dato completo
        dato = datoCompleto.toInt(); // Convierte el dato a entero
        // Ahora tienes la letra y el dato por separado (letra y dato)
    }

    if (letra == 'A') {

      Serial.printf("Garra: %s\n", dato ? "Abierto" : "Cerrado");

      // Código para controlar la garra
      if(valor) {
        servomotor4.write(90);
      } else {
        servomotor4.write(0);
      }


    } else if (letra == 'B') {

      Serial.printf("Brazo: %d°\n", dato);

      // Código para controlar el brazo
      servomotor3.write(dato);
      delay(25);

    } else if (letra == 'C') {

      Serial.printf("Cuerpo: %d°\n", dato);

      // Código para controlar el cuerpo
      servomotor2.write(dato);
      delay(25);

    } else if (letra == 'D') {

      Serial.printf("Base: %d°\n", dato);

      // Código para controlar la base
      servomotor1.write(dato);
      delay(25);

    }
  }
}
/*
¡IMPORTANTE! Antes de subir el código, tienes que instalar la librería "Adafruit Motor Shield"
*/


//#include <AFMotor.h>
#include <SoftwareSerial.h>

SoftwareSerial bluetoothSerial(9, 10); // RX, TX

//Pines iniciales de los motores
AF_DCMotor motor1(1, MOTOR12_1KHZ);
AF_DCMotor motor2(2, MOTOR12_1KHZ);
AF_DCMotor motor3(3, MOTOR34_1KHZ);
AF_DCMotor motor4(4, MOTOR34_1KHZ);

void setup()
{
  bluetoothSerial.begin(9600);  //Establecemos los baudios para el módulo bluetooth.
}

void loop() {
  if (bluetoothSerial.available() > 0) {
    String direccion = BTSerial.readStringUntil('\n'); // Lee hasta que se encuentre un salto de línea

    Stop(); //inicializo con motores detenidos
    
    // Procesar el dato recibido

    if (direccion == "up") {
        // Avanzar
        adelante();
    } 
    else if (direccion == "down") {
        // Retroceder
        atras()
    } 
    else if (direccion == "left") {
        // Izquierda
        izquierda()
    } 
    else if (direccion == "right") {
        // Derecha
        derecha()
    }
  }
}

void adelante()
{
  motor1.setSpeed(255); //Asigno maxima velocidad al motor 1
  motor1.run(FORWARD);  //Hago girar el motor 1 hacia delante
  motor2.setSpeed(255); //Asigno maxima velocidad al motor 2
  motor2.run(FORWARD);  //Hago girar el motor 2 hacia delante
  motor3.setSpeed(255); //Asigno maxima velocidad al motor 3
  motor3.run(FORWARD);  //Hago girar el motor 3 hacia delante
  motor4.setSpeed(255); //Asigno maxima velocidad al motor 4
  motor4.run(FORWARD);  //Hago girar el motor 4 hacia delante
}

void atras()
{
  motor1.setSpeed(255); //Asigno maxima velocidad al motor 1
  motor1.run(BACKWARD); //Hago girar el motor 1 hacia atras
  motor2.setSpeed(255); //Asigno maxima velocidad al motor 2
  motor2.run(BACKWARD); //Hago girar el motor 2 hacia atras
  motor3.setSpeed(255); //Asigno maxima velocidad al motor 3
  motor3.run(BACKWARD); //Hago girar el motor 3 hacia atras
  motor4.setSpeed(255); //Asigno maxima velocidad al motor 4
  motor4.run(BACKWARD); //Hago girar el motor 4 hacia atras
}

void izquierda()
{
  motor1.setSpeed(255); //Asigno maxima velocidad al motor 1
  motor1.run(FORWARD); //Hago girar el motor 1 hacia atras
  motor2.setSpeed(255); //Asigno maxima velocidad al motor 2
  motor2.run(BACKWARD); //Hago girar el motor 2 hacia atras
  motor3.setSpeed(255); //Asigno maxima velocidad al motor 3
  motor3.run(BACKWARD);  //Hago girar el motor 3 hacia delante
  motor4.setSpeed(255); //Asigno maxima velocidad al motor 4
  motor4.run(FORWARD);  //Hago girar el motor 4 hacia delante
}

void derecha()
{
  motor1.setSpeed(255); //Asigno maxima velocidad al motor 1
  motor1.run(BACKWARD);  //Hago girar el motor 1 hacia delante
  motor2.setSpeed(255); //Asigno maxima velocidad al motor 2
  motor2.run(FORWARD);  //Hago girar el motor 2 hacia delante
  motor3.setSpeed(255); //Asigno maxima velocidad al motor 3
  motor3.run(FORWARD); //Hago girar el motor 3 hacia atras
  motor4.setSpeed(255); //Asigno maxima velocidad al motor 4
  motor4.run(BACKWARD); //Hago girar el motor 4 hacia atras
}

void Stop()
{
  motor1.setSpeed(0);  //Asigno minima velocidad al motor 1
  motor1.run(RELEASE); //Paro el motor 1 cuando dejo de pulsar el boton
  motor2.setSpeed(0);  //Asigno minima velocidad al motor 2
  motor2.run(RELEASE); //Paro el motor 2 cuando dejo de pulsar el boton
  motor3.setSpeed(0);  //Asigno minima velocidad al motor 3
  motor3.run(RELEASE); //Paro el motor 3 cuando dejo de pulsar el boton
  motor4.setSpeed(0);  //Asigno minima velocidad al motor 4
  motor4.run(RELEASE); //Paro el motor 4 cuando dejo de pulsar el boton
}
#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

#include <Servo.h>
#include <Stepper.h>

Servo servomotor4; //Servomotor GARRA
Servo servomotor3; //Servomotor BRAZO
Servo servomotor2; //Servomotor CUERPO
Servo servomotor1; //Servomotor BASE
Stepper motor(2048, 4, 6, 5, 7);

const char* ssid = "UPN_ESTUDIANTES"; // Nombre wifi
const char* password = "H@azLoCorrectoUPN"; // Contraseña wifi
const char* host = "192.168.1.100"; // Dirección IP de tu servidor
const int port = 3002;

WebSocketsClient webSocket;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("Desconectado!");
      break;
    case WStype_CONNECTED:
      Serial.println("Conectado al servidor!");
      break;
    case WStype_TEXT:
      Serial.printf("Evento recibido: %s\n", payload);

      // Parsear el JSON recibido
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      
      if (doc.containsKey("range_base")) {
        int valor = doc["range_base"];
        Serial.printf("Base: %d°\n", valor);

        // Código para controlar la base
        servomotor1.write(valor);
        delay(25);

      } else if (doc.containsKey("range_cuerpo")) {
        int valor = doc["range_cuerpo"];
        Serial.printf("Cuerpo: %d°\n", valor);

        // Código para controlar el cuerpo
        servomotor2.write(valor);
        delay(25);

      } else if (doc.containsKey("range_brazo")) {
        int valor = doc["range_brazo"];
        Serial.printf("Brazo: %d°\n", valor);

        // Código para controlar el brazo
        servomotor3.write(valor);
        delay(25);

      } else if (doc.containsKey("garra")) {
        bool valor = doc["garra"];
        Serial.printf("Toggle Garra: %s\n", valor ? "Abierto" : "Cerrado");

        // Código para controlar la garra
        if(valor) {
            servomotor4.write(90);
        } else {
            servomotor4.write(0);
        }

      } else if (doc.containsKey("mover")) {
        String direction = doc["mover"];
        Serial.printf("Moviendo carrito hacia: %s\n", direction.c_str());

      } else if (String((char*)payload) == "detener") {
        Serial.println("Deteniendo carrito");
      }
      break;
  }
}

void setup() {

  // WIFI
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando al WiFi...");
  }

  Serial.println("Conexion existosa al WiFi");
  webSocket.begin(host, port, "/socket.io/?EIO=4");

  webSocket.onEvent(webSocketEvent);

  // Servo
  servomotor3.attach(12);
  servomotor3.attach(11);
  servomotor2.attach(10);
  servomotor1.attach(9);
  motor.setSpeed(5);
}

void loop() {
  webSocket.loop();
}
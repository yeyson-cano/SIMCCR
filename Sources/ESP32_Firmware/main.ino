#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Servo.h>
#include <SPIFFS.h>

// Definición de pines
#define ONE_WIRE_BUS 4      // Pin del sensor DS18B20
#define MQ135_PIN 34        // Pin del sensor MQ-135 (entrada analógica)
#define FAN_PIN 5           // Pin del ventilador (controlado por transistor o relé)
#define SERVO_PIN 18        // Pin del servo motor

// Umbrales
#define TEMP_THRESHOLD 8    // Temperatura límite en °C
#define CO2_THRESHOLD 10000 // Límite de CO2 en ppm

// Inicialización de sensores y actuadores
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);
Servo ventilationServo;

void setup() {
    Serial.begin(115200);
    
    // Inicializar sensor de temperatura
    tempSensor.begin();
    
    // Inicializar servo
    ventilationServo.attach(SERVO_PIN);
    ventilationServo.write(0); // Compuerta cerrada por defecto
    
    // Configuración de ventilador como salida
    pinMode(FAN_PIN, OUTPUT);
    digitalWrite(FAN_PIN, LOW);
    
    // Inicializar SPIFFS
    if (!SPIFFS.begin(true)) {
        Serial.println("Error al montar el sistema de archivos");
    }
}

void loop() {
    // Leer temperatura
    tempSensor.requestTemperatures();
    float temperature = tempSensor.getTempCByIndex(0);
    
    // Leer nivel de CO2
    int co2Value = analogRead(MQ135_PIN);
    
    Serial.print("Temperatura: ");
    Serial.print(temperature);
    Serial.print(" °C | CO2: ");
    Serial.print(co2Value);
    Serial.println(" ppm");
    
    // Control de ventilador
    if (temperature > TEMP_THRESHOLD) {
        digitalWrite(FAN_PIN, HIGH);
    } else {
        digitalWrite(FAN_PIN, LOW);
    }
    
    // Control de compuerta de ventilación
    if (co2Value > CO2_THRESHOLD) {
        ventilationServo.write(90); // Abrir compuerta
    } else {
        ventilationServo.write(0); // Cerrar compuerta
    }
    
    // Almacenar datos en SPIFFS
    File file = SPIFFS.open("/data.txt", "a");
    if (file) {
        file.printf("%.2f,%d\n", temperature, co2Value);
        file.close();
    }
    
    delay(5000); // Esperar 5 segundos antes de la próxima lectura
}

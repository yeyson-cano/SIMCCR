#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 4  // Pin del sensor DS18B20
#define MQ135_PIN 34    // Pin del sensor MQ-135 (entrada analógica)

// Inicialización de sensores
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);

void initSensors() {
    Serial.println("Inicializando sensores...");
    
    // Iniciar el sensor de temperatura
    tempSensor.begin();
    
    // Configurar MQ-135 como entrada
    pinMode(MQ135_PIN, INPUT);
    
    Serial.println("Sensores inicializados correctamente.");
}

float readTemperature() {
    tempSensor.requestTemperatures();
    float temperature = tempSensor.getTempCByIndex(0);
    Serial.print("Temperatura: ");
    Serial.print(temperature);
    Serial.println(" °C");
    return temperature;
}

int readCO2() {
    int co2Value = analogRead(MQ135_PIN);
    Serial.print("CO2: ");
    Serial.print(co2Value);
    Serial.println(" ppm");
    return co2Value;
}
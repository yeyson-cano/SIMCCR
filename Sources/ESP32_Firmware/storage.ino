#include <Arduino.h>
#include <SPIFFS.h>

// Nombre del archivo donde se almacenarán los datos
#define DATA_FILE "/data.txt"

// Función para inicializar SPIFFS
void initStorage() {
    Serial.println("Inicializando almacenamiento...");
    if (!SPIFFS.begin(true)) {
        Serial.println("Error al montar el sistema de archivos SPIFFS.");
        return;
    }
    Serial.println("SPIFFS montado correctamente.");
}

// Función para almacenar datos en SPIFFS
void storeData(float temperature, int co2Value) {
    File file = SPIFFS.open(DATA_FILE, "a"); // Abrir archivo en modo adjuntar
    if (!file) {
        Serial.println("Error al abrir el archivo para escritura.");
        return;
    }

    // Escribir datos en formato CSV (temperatura, CO2, timestamp)
    file.printf("%.2f,%d,%lu\n", temperature, co2Value, millis());
    file.close();
    
    Serial.println("Datos almacenados correctamente en SPIFFS.");
}

// Función para leer los datos almacenados
void readStoredData() {
    File file = SPIFFS.open(DATA_FILE, "r");
    if (!file) {
        Serial.println("Error al abrir el archivo para lectura.");
        return;
    }

    Serial.println("Contenido almacenado en SPIFFS:");
    while (file.available()) {
        Serial.write(file.read());
    }
    file.close();
}

// Función para borrar los datos almacenados (opcional)
void clearStoredData() {
    if (SPIFFS.remove(DATA_FILE)) {
        Serial.println("Archivo de datos eliminado correctamente.");
    } else {
        Serial.println("Error al eliminar el archivo de datos.");
    }
}
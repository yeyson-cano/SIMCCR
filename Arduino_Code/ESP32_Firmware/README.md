# 📂 ESP32 Firmware

## 📌 Descripción
Contiene el código principal para el ESP32, encargado de leer sensores, controlar actuadores y almacenar datos.

## 📜 Archivos Principales
- `main.ino` → Código principal del ESP32
- `sensors.ino` → Manejo de sensores
- `actuators.ino` → Control de actuadores (futuro sprint)
- `storage.ino` → Manejo de almacenamiento en flash
- `mqtt.ino` → Comunicación MQTT (futuro sprint)

## 🔧 Configuración
1. Instalar **Arduino IDE**
2. Instalar librerías necesarias:
   ```bash
   OneWire, DallasTemperature, Servo, SPIFFS
   ```
3. Compilar y cargar en el ESP32
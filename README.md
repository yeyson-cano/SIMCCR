# SIMCCR

## 📌 Descripción
Este proyecto tiene como objetivo desarrollar un **sistema IoT** que monitoree la temperatura y la concentración de CO₂ dentro de contenedores refrigerados, asegurando condiciones óptimas para productos sensibles al ambiente.

## 🚀 Características
- Medición de temperatura con **DS18B20**
- Monitoreo de CO₂ con **MQ-135**
- Control de ventilación mediante **servo y ventilador**
- Almacenamiento de datos local en **ESP32**
- Envío de datos a un **dashboard IoT** usando MQTT (futuro sprint)
- Integración con **Node-RED** (futuro sprint)

## 📂 Estructura del Repositorio
```
📦 Proyecto_IoT_Contenedores
│── 📂 Arduino_Code
│   ├── 📂 ESP32_Firmware
│   │   ├── main.ino
│   │   ├── README.md
│   ├── 📂 Pruebas
│   │   ├── test_sensors.ino
│   │   ├── README.md
│
│── 📂 Node-RED_Flows
│   ├── flow.json
│   ├── README.md
│
│── 📂 Docs
│   ├── Informe_Final.pdf
│   ├── README.md
│
│── 📂 Media
│   ├── Video_Final.mp4
│   ├── README.md
│
│── 📜 README.md
│── 📜 .gitignore
```

## 📌 Cómo Usar
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/Proyecto_IoT_Contenedores.git
   ```
2. **Entrar en la carpeta:**
   ```bash
   cd Proyecto_IoT_Contenedores
   ```
3. **Abrir en Arduino IDE o VSCode + PlatformIO**

## 🛠️ Tecnologías Usadas
- **Arduino (ESP32)**
- **Node-RED** (futuro sprint)
- **MQTT** (futuro sprint)
- **GitHub para control de versiones**

## 📌 Documentación
- 📄 [Documentación Original](https://acortar.link/GCjdKK)
- 📑 [Informe Final](https://acortar.link/S1zUbb)
- 📹 Mira el video aquí: [YouTube Video](https://youtu.be/lOH5lWU1oyY)

## 📌 Contribución
1. **Hacer un fork** del repositorio.
2. **Crear una rama** con tu mejora:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Hacer commit y push:**
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   git push origin feature/nueva-funcionalidad
   ```
4. **Crear un Pull Request** en GitHub.

## 📌 Contacto
Para dudas o mejoras, contacta a **Yeyson Samir Cano Carbajo**.


# Lambda de Ultimas Mediciones

## Arquitectura serverless con AWS Lambda

 La elección de AWS Lambda nos permite ejecutar código sin necesidad configurar, y mantener un servidor desplegado todo el tiempo. También trae otras ventajas como

- **Reducción de costos**
- **Escalabilidad automática**
- Respuesta en tiempo real

### Flujo:

ESP32 (Publisher) → Broker (AWS IoT Core) → DynamoDB → **AWS Lambda** ← Request ← Frontend

### Proceso:

1. Consulta la tabla SensorData de DynamoDB
    
    ```python
    response = table.scan()
    ```
    
2. Obtiene o no los registros
    
    ```python
    if not response.get('Items'):
    		return {"message": "No data found"}
    ```
    
3. Convertir los datos del objeto a decimal
    
    ```python
    def convert_decimals(obj):
        """Recorre recursivamente el objeto y convierte decimal.Decimal a int o float."""
        if isinstance(obj, list):
            return [convert_decimals(x) for x in obj]
        elif isinstance(obj, dict):
            return {k: convert_decimals(v) for k, v in obj.items()}
        elif isinstance(obj, decimal.Decimal):
            # Si es entero (p.e. 123) lo convertimos a int, si tiene decimales (p.e. 123.45) a float
            return float(obj) if '.' in str(obj) else int(obj)
        else:
            return obj
    ```
    
4. Hallar el registro más reciente según ‘timestamp’
    
    ```python
    latest_item = max(data, key=lambda x: x.get('timestamp', 0))
    ```
    
5. Limpiar los datos (eliminar payload)
    
    ```python
    if 'payload' in latest_item:
    	# Si lo que quieres es aplanar el contenido de 'payload' al mismo nivel:
    	if isinstance(latest_item['payload'], dict):
    		for k, v in latest_item['payload'].items():
    			latest_item[k] = v
    	# Luego borramos 'payload'
    	del latest_item['payload']
    ```
    
6. Retornar lista
    
    ```python
    return latest_item
    ```
    

### Output:

```json
[
  {
    "temperatura": 21.8,
    "CO2": 380,
    "humedad": 64.1,
    "timestamp": 1689800000000,
    "ubicacion": "contenedor_1",
    "device_id": "ESP32_001",
    "estado_ventilacion": "inactivo"
  },
  {
    "temperatura": 22.1,
    "CO2": 390,
    "humedad": 64.7,
    "timestamp": 1689900000000,
    "ubicacion": "contenedor_1",
    "device_id": "ESP32_001",
    "estado_ventilacion": "inactivo"
  },
  {
    "temperatura": 22.5,
    "CO2": 400,
    "humedad": 65.3,
    "timestamp": 1690000000000,
    "ubicacion": "contenedor_1",
    "device_id": "ESP32_001",
    "estado_ventilacion": "activo"
  }
]
```
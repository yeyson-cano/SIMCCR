# Lambda de Historial de Mediciones

Esta función AWS Lambda recupera mediciones de sensores almacenadas en **Amazon DynamoDB** y devuelve datos filtrados por un rango de días especificado.

## 📌 **Descripción**
- **Consulta DynamoDB** para obtener mediciones.
- **Filtra datos** según el número de días solicitado (por defecto, 7 días).
- **Convierte valores Decimal** para compatibilidad con JSON.
- **Extrae y organiza datos** eliminando el campo `payload`.
- **Ordena las mediciones** por `timestamp`.

## 🚀 **Uso**
La función recibe un parámetro opcional `dias` en la URL para definir el rango de tiempo.

## 📦 **Instalación y Pruebas**
1. Instalar dependencias:
   ```bash
   pip install boto3
   ```
2. Ejecutar localmente:
   ```python
   import json
   from lambda_function import lambda_handler

   event = {"queryStringParameters": {"dias": "3"}}
   response = lambda_handler(event, None)
   print(json.dumps(response, indent=2))
   ```

## 📄 **Licencia**
Este proyecto está bajo la licencia MIT.

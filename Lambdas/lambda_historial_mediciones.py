import boto3
import json
import decimal
import time

# Inicializar DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SensorData')

def convert_decimals(obj):
    """Convierte Decimal a int o float para evitar errores de serialización."""
    if isinstance(obj, list):
        return [convert_decimals(x) for x in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, decimal.Decimal):
        return float(obj) if '.' in str(obj) else int(obj)
    else:
        return obj

def lambda_handler(event, context):
    # Obtener el número de días desde los parámetros de la URL
    query_params = event.get("queryStringParameters", {})
    dias = int(query_params.get("dias", 7))  # Por defecto, 7 días

    # Calcular el timestamp límite
    timestamp_limite = int(time.time() * 1000) - (dias * 24 * 60 * 60 * 1000)

    # Consultar DynamoDB
    response = table.scan()
    if not response.get('Items'):
        return {"message": "No data found"}

    # Convertir decimales y filtrar datos en el rango de días solicitado
    data = convert_decimals(response['Items'])
    filtered_data = [item for item in data if item.get('timestamp', 0) >= timestamp_limite]

    # Eliminar payload y mover su contenido al nivel superior
    clean_data = []
    for item in filtered_data:
        if 'payload' in item and isinstance(item['payload'], dict):
            new_item = item['payload'].copy()  # Copiar el contenido de payload
            clean_data.append(new_item)  # Agregar a la lista sin payload
    
    # Ordenar los datos por timestamp
    clean_data.sort(key=lambda x: x.get('timestamp', 0))

    return clean_data
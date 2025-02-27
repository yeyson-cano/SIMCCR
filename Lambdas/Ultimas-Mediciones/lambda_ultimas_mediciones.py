import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SensorData')

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

def lambda_handler(event, context):
    response = table.scan()
    
    # Si no hay Items, devolvemos un mensaje
    if not response.get('Items'):
        return {"message": "No data found"}

    # 1) Convertir decimales
    data = convert_decimals(response['Items'])

    # 2) Hallar el registro más reciente según 'timestamp'
    #    (si no existe 'timestamp', le asignamos 0 para evitar errores)
    latest_item = max(data, key=lambda x: x.get('timestamp', 0))

    # 3) Eliminar o transformar campos que no desees
    #    Si tu item en DynamoDB tiene "payload": {...}, y NO lo quieres, lo borras:
    if 'payload' in latest_item:
        # Si lo que quieres es aplanar el contenido de 'payload' al mismo nivel:
        if isinstance(latest_item['payload'], dict):
            for k, v in latest_item['payload'].items():
                latest_item[k] = v
        # Luego borramos 'payload'
        del latest_item['payload']

    # Si no quieres la clave 'timestamp' que viene de la DB, elimínala:
    # if 'timestamp' in latest_item:
    #     del latest_item['timestamp']

    # 4) Retornar el JSON "limpio"
    return latest_item
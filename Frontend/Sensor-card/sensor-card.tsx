import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Para manejar clases condicionales

type Measurement = {
  timestamp: number;
  co2: number;
  temperature: number;
  thingName: string;
  type: string;
  compuertaState: boolean;
  fanState: boolean;
};

interface SensorCardProps {
  data: Measurement;
}

export function SensorCard({ data }: SensorCardProps) {
  return (
    <Card className="w-full p-6 shadow-lg rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {data.thingName}
        </CardTitle>
        <CardDescription className="text-gray-500">{data.type}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 ">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">🌡️ Temperatura</span>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
            {data.temperature} °C
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">🌀 CO₂</span>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600">
            {data.co2} ppm
          </span>
        </div>
        
          <Badge
            className={cn(
              "px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 justify-center",
              data.compuertaState
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-400 hover:shadow-lg"
                : "bg-gray-300 text-gray-700 shadow-md hover:bg-gray-400 hover:shadow-lg"
            )}
          >
            🚪 Compuerta: {data.compuertaState ? "Abierta" : "Cerrada"}
          </Badge>
          <Badge
            className={cn(
              "px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 justify-center",
              data.fanState
                ? "bg-green-500 text-white shadow-md hover:bg-green-400 hover:shadow-lg"
                : "bg-gray-300 text-gray-700 shadow-md hover:bg-gray-400 hover:shadow-lg"
            )}
          >
            💨 Ventilador: {data.fanState ? "Encendido" : "Apagado"}
          </Badge>
        
      </CardContent>
    </Card>
  );
}

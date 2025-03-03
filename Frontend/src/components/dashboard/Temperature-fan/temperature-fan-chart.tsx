import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SensorData } from "../dashboard";

export function CombinedTemperatureFanChart({sensorData}: {sensorData: SensorData[]}) {
  const chartData = sensorData.map(data => ({
    timestamp: new Date(data.timestamp).toLocaleTimeString(),
    temperature: data.temperature,
    fanState: data.fanState ? 1 : 0,  // 1 for On, 0 for Off
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Temperature and Fan State</CardTitle>
        <CardDescription>Temperature Over Time with Fan State</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-1))" />
            <Bar dataKey="fanState" fill="hsl(var(--chart-2))" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

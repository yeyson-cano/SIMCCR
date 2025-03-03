import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type SensorData = {
  timestamp: number;
  temperature: number;
  co2: number;
};

interface LinearChartProps {
  data: SensorData[];
}

export function LinearChart({ data }: LinearChartProps) {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Temperature Over Time</CardTitle>
        <CardDescription>Temperature Over Time</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ResponsiveContainer width="100%" height={270}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis
              yAxisId="left"
              label={{ value: "Temp (°C)", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "CO2 (ppm)",
                angle: -90,
                position: "insideRight",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--chart-1))"
              name="Temperature (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="co2"
              stroke="hsl(var(--chart-2))"
              name="CO2 (ppm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

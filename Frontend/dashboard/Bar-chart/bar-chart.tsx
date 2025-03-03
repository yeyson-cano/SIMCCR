import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SensorData } from "../dashboard";

export function MultipleBarChart({ data }: { data: SensorData[] }) {
  const filteredData = data.slice(-10);
  const chartData = filteredData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    temperature: item.temperature,
    co2: item.co2 / 1_000,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature & CO2 Levels</CardTitle>
        <CardDescription>Temperature vs CO2 Levels Over Time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={270}>
          <ChartContainer
            config={{
              temperature: { label: "Temperature (°C)" },
              co2: { label: "CO2 (K, ppm)" },
            }}
          >
            <BarChart width={800} height={300} data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="timestamp" tickLine={false} axisLine={false} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="temperature"
                fill="hsl(var(--chart-1))"
                radius={4}
              />
              <Bar dataKey="co2" fill="hsl(var(--chart-2))" radius={4} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

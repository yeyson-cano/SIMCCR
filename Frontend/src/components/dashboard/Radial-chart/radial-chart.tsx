import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type RadialChart = {
  fan: number;
  compuerta: number;
};

interface RadialChartProps {
  data: {
    fan: number;
    compuerta: number;
  };
}

export function RadialChart({ data }: RadialChartProps) {
  const chartData = [
    {
      month: new Date().toLocaleString("default", { month: "long" }),
      fan: data.fan,
      compuerta: data.compuerta,
    },
  ];

  const totalInteractions = data.fan + data.compuerta;

  const chartConfig = {
    fan: {
      label: "Fan",
      color: "hsl(var(--chart-1))",
    },
    compuerta: {
      label: "Compuerta",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Device Interactions </CardTitle>
        <CardDescription>Fan and Compartment Interactions </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ResponsiveContainer width="100%" height={270}>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[200px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalInteractions.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Active Interactions
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="fan"
                name="Fan"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-1))"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="compuerta"
                name="Compuerta"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-2))"
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <div className="text-center text-sm text-muted-foreground">
          <span className="text-muted-foreground">
            {data.fan.toLocaleString()} Fans
          </span>
          <span className="text-muted-foreground">
            {data.compuerta.toLocaleString()} Compuertas
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

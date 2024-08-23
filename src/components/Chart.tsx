"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Execução",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Finalizadas",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Canceladas",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Previstas",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="bg-slate-900 items-center pb-0">
        <CardTitle className="text-yellow-600">Pie Chart - Label List</CardTitle>
        <CardDescription className="text-slate-400">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 bg-slate-900">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-slate-900 flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-yellow-600">
          Trending up by 5.2% this month <TrendingUp className="text-yellow-400 h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

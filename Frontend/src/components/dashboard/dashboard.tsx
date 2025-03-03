import { LinearChart } from "./Linear-chart";
import { MultipleBarChart } from "./Bar-chart";
import { useDeviceInteractions } from "@/hooks/useDeviceInteractions";
import { RadialChart } from "./Radial-chart";
import { useLatestMeasurement } from "@/hooks/useLatestMeasurement";
import { SensorCard } from "../Sensor-card";

import { useState } from "react";

import { AlertType } from "@/constants";


/**
 * Representa los datos de un sensor.
 *
 * @typedef {Object} SensorData
 * @property {string} thingName - El nombre del dispositivo o sensor.
 * @property {number} timestamp - La marca de tiempo en milisegundos desde la época Unix.
 * @property {number} temperature - La temperatura medida en grados Celsius.
 * @property {number} co2 - El nivel de CO2 medido en partes por millón (ppm).
 * @property {AlertType} type - El tipo de alerta (ALERT_TEMP, ALERT_BOTH, ALERT_CO2).
 * @property {boolean} fanState - El estado del ventilador (true si está encendido, false si está apagado).
 * @property {boolean} compuertaState - El estado de la compuerta (true si está abierta, false si está cerrada).
 */
export type SensorData = {
  thingName: string;
  timestamp: number;
  temperature: number;
  co2: number;
  type: AlertType;
  fanState: boolean;
  compuertaState: boolean;
};

export function Dashboard() {
  const [selectedDays, setSelectedDays] = useState<1 | 3 | 7>(1);
  const { data, interactions } = useDeviceInteractions({ days: selectedDays });
  const { measurement, error } = useLatestMeasurement();
  if (!measurement) return;
  console.debug("measurement", { measurement, error });
  console.debug("Selected days:", selectedDays);

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold pb-4">IoT Sensor Dashboard</h1>
      <div className="pb-4">
        <label htmlFor="day-selector" className="mr-2 font-medium">Seleccionar días:</label>
        <select
          id="day-selector"
          className="border p-2 rounded bg-gray-200 text-black"
          value={selectedDays}
          onChange={(e) => setSelectedDays(Number(e.target.value) as 1 | 3 | 7)}
        >
          <option value={1}>1 día</option>
          <option value={3}>3 días</option>
          <option value={7}>7 días</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-[max-content] md:auto-rows-[400px]">
        <SensorCard data={measurement} />
        <MultipleBarChart data={data} />
        <RadialChart data={interactions} />
        <LinearChart data={data} />
      </div>
    </div>
  );
}

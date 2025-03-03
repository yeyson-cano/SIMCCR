import { SensorData } from "@/components/dashboard";
import { useState, useEffect } from "react";
import axios from "axios";

interface UseDeviceInteractionsProps {
  days: 1 | 3 | 7;
}

const API_URL =
  "https://ugcwwzcxr6.execute-api.us-east-1.amazonaws.com/Production/historial-mediciones";
const API_KEY = "VBfIGUwzft8omx70XCxSO7EtOWHvUAKI2ifR7sVW";

export function useDeviceInteractions({ days }: UseDeviceInteractionsProps) {
  const [data, setData] = useState<SensorData[]>([]);
  const [interactions, setInteractions] = useState({ fan: 0, compuerta: 0 });

  useEffect(() => {
    const endpoint = `${API_URL}?dias=${days}`;
    console.log("Executing useEffect, days:", days);
    console.log(`Fetching data from: ${endpoint}`);

    axios
      .get(endpoint, {
        headers: { "x-api-key": API_KEY },
      })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Loaded data:", response.data);

        let filteredData = response.data as SensorData[];
        if (days === 1) filteredData = filteredData.slice(0, 10);
        if (days === 3) filteredData = filteredData.slice(0, 50);
        if (days === 7) filteredData = filteredData.slice(0, 100);

        setData(filteredData);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [days]);

  // Mantener este useEffect por separado y asegurarse de que siempre se ejecuta
  useEffect(() => {
    if (data.length === 0) return;

    const fanCount = data.filter((item) => item.fanState).length;
    const compuertaCount = data.filter((item) => item.compuertaState).length;

    setInteractions({ fan: fanCount, compuerta: compuertaCount });

    console.debug("Interactions updated:", { fan: fanCount, compuerta: compuertaCount });
  }, [data]);

  return { data, interactions };
}

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartPerformance() {
  const performanceData = {
    labels: ["Task1", "Task2", "Task3"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCEE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCEE56"],
      },
    ],
  };

return (
    <div>
      <Pie data={performanceData} />
    </div>
  );
}

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Container, Row, Col } from "react-bootstrap";
import useAxiosGet from "../services/ServiceAxiosGet";
import { conditionalPieColors } from "../Utilities/conditionalPieColors";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartPerformance({ userId, userRole }) {
  const [data] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/ticket/${userId}/${userRole}`
  );

  const contentCounts = data?.reduce((counts, data) => {
    counts[data?.Status] = (counts[data?.Status] || 0) + 1;
    return counts;
  }, []);

  const total = data?.length;
  const percentage = contentCounts
    ? Object.values(contentCounts).map((item) =>
        ((item / total) * 100).toFixed(2)
      )
    : null;
  
  const performanceData = {
    labels: contentCounts ? Object.keys(contentCounts) : [],
    datasets: [
      {
        label: "Assigned Issues",
        data: contentCounts ? Object.values(contentCounts) : [],
        backgroundColor: contentCounts
          ? [
              conditionalPieColors[Object.keys(contentCounts)[0]]
                ?.backgroundColor,
              conditionalPieColors[Object.keys(contentCounts)[1]]
                ?.backgroundColor,
              conditionalPieColors[Object.keys(contentCounts)[2]]
                ?.backgroundColor,
            ]
          : [],
        hoverBackgroundColor: contentCounts
          ? [
              conditionalPieColors[Object.keys(contentCounts)[0]]
                ?.hoverBackgroundColor,
              conditionalPieColors[Object.keys(contentCounts)[1]]
                ?.hoverBackgroundColor,
              conditionalPieColors[Object.keys(contentCounts)[2]]
                ?.hoverBackgroundColor,
            ]
          : [],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.dataset.data[context.dataIndex];
            const showPercentage = percentage[context.dataIndex];

            return `${label}: ${value} (${showPercentage})%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Task Status</h3>
            {data && <Pie data={performanceData} options={options} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

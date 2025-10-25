import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Typography } from "antd";
import {
  SmileOutlined,
  CheckSquareOutlined,
  WarningOutlined,
  CustomerServiceOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const performanceQualityKpis = [
  {
    label: "Customer Satisfaction Score (CSAT)",
    description: "Feedback-based score for delivery experience.",
    value: "4.7/5",
    icon: <SmileOutlined />,
    iconContainer: "bg-green-200 text-green-600 border-green-400",
  },
  {
    label: "Delivery Accuracy Rate",
    description: "Ratio of correctly delivered orders to total orders.",
    value: "96.8%",
    icon: <CheckSquareOutlined />,
    iconContainer: "bg-blue-200 text-blue-600 border-blue-400",
  },
  {
    label: "Escalated Incidents",
    description:
      "Number of customer complaints or escalations related to the partner.",
    value: "12",
    icon: <WarningOutlined />,
    iconContainer: "bg-orange-200 text-orange-600 border-orange-400",
  },
  {
    label: "Average Response Time to Issues",
    description:
      "Time taken to resolve delivery exceptions or support tickets.",
    value: "2.3 hrs",
    icon: <CustomerServiceOutlined />,
    iconContainer: "bg-purple-200 text-purple-600 border-purple-400",
  },
  {
    label: "Cancelled or Failed Jobs Rate",
    description: "Percentage of orders cancelled or unassigned after pickup.",
    value: "1.8%",
    icon: <CloseCircleOutlined />,
    iconContainer: "bg-red-200 text-red-600 border-red-400",
  },
];

const PerformanceQualityKpisPage = () => {
  return (
    <div>
      <Title level={4} style={{ marginBottom: "0px" }}>
        Performance & Quality KPIs
      </Title>
      <Paragraph className="text-gray-600 ">
        These improve accountability, giving partners visibility into their
        service efficiency and customer satisfaction.
      </Paragraph>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {performanceQualityKpis.map(
          ({ label, description, value, icon, iconContainer }) => (
            <ResponsiveCard hoverable key={label} shadow>
              <div className="flex flex-col gap-3 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-full border-2 ${iconContainer} w-12 h-12 flex items-center justify-center shadow animate-pulse flex-shrink-0`}
                  >
                    <span className="text-3xl">{icon}</span>
                  </div>
                  <Title
                    level={5}
                    className="text-gray-700 capitalize !mb-0 !leading-4.5"
                    style={{ letterSpacing: "0.012em" }}
                  >
                    {label}
                  </Title>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl  font-bold text-center tracking-tight drop-shadow mb-1">
                  {value}
                </p>
                <p className="text-gray-500 text-xs text-center mb-0 leading-4">
                  {description}
                </p>
              </div>
            </ResponsiveCard>
          )
        )}
      </div>
    </div>
  );
};

export default PerformanceQualityKpisPage;

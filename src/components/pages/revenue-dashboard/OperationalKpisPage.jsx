import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Typography } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  RollbackOutlined,
  SafetyOutlined,
  AimOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const operationalKpis = [
  {
    label: "Number of Deliveries Completed",
    description: "Total fulfilled shipments in the time window.",
    value: "23,450",
    icon: <CheckCircleOutlined />,
    iconContainer: "bg-emerald-200 text-emerald-600 border-emerald-400",
  },
  {
    label: "On-Time Delivery Rate (OTD)",
    description: "Percentage of shipments delivered as per SLA.",
    value: "92.4%",
    icon: <ClockCircleOutlined />,
    iconContainer: "bg-blue-200 text-blue-600 border-blue-400",
  },
  {
    label: "First Attempt Delivery Success",
    description: "Fraction of orders delivered on the first attempt.",
    value: "87.8%",
    icon: <RocketOutlined />,
    iconContainer: "bg-violet-200 text-violet-600 border-violet-400",
  },
  {
    label: "Average Delivery Time",
    description: "Time taken from pick-up to delivery completion.",
    value: "1.8 days",
    icon: <ThunderboltOutlined />,
    iconContainer: "bg-amber-200 text-amber-600 border-amber-400",
  },
  {
    label: "RTO Rate (Return to Origin)",
    description: "Percentage of failed deliveries returned to the warehouse.",
    value: "3.2%",
    icon: <RollbackOutlined />,
    iconContainer: "bg-red-200 text-red-600 border-red-400",
  },
  {
    label: "Perfect Order Rate",
    description: "Orders delivered complete, damage-free, and on schedule.",
    value: "85.5%",
    icon: <SafetyOutlined />,
    iconContainer: "bg-cyan-200 text-cyan-600 border-cyan-400",
  },
  {
    label: "Order Fulfillment Accuracy",
    description: "Measures error-free shipping and correct addressing.",
    value: "98.7%",
    icon: <AimOutlined />,
    iconContainer: "bg-lime-200 text-lime-600 border-lime-400",
  },
];

const OperationalKpisPage = () => {
  return (
    <div>
      <Title style={{ marginBottom: "0px" }} level={4}>
        Operational KPIs
      </Title>
      <Paragraph className="text-gray-600">
        These allow partners to see how efficiently shipments are handled.
      </Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {operationalKpis.map(
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

export default OperationalKpisPage;

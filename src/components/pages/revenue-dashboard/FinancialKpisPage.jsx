import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Typography } from "antd";
import {
  DollarCircleOutlined,
  UserOutlined,
  PercentageOutlined,
  GiftOutlined,
  StopOutlined,
  RiseOutlined,
  FundOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const financialKpis = [
  {
    label: "Total Revenue Generated",
    description: "Total value of shipments handled for the selected period.",
    value: "₹12,50,000",
    icon: <DollarCircleOutlined />,
    iconContainer: "bg-blue-200 text-blue-600 border-blue-400",
  },
  {
    label: "Partner Share (Earnings)",
    description: "Amount payable to the partner after aggregator commission.",
    value: "₹8,75,000",
    icon: <UserOutlined />,
    iconContainer: "bg-green-200 text-green-600 border-green-400",
  },
  {
    label: "Aggregator Commission",
    description: "Platform margin deducted before partner payment.",
    value: "₹3,75,000",
    icon: <PercentageOutlined />,
    iconContainer: "bg-pink-200 text-pink-600 border-pink-400",
  },
  {
    label: "Average Revenue per Shipment",
    description: "Revenue earned per completed parcel.",
    value: "₹45.60",
    icon: <GiftOutlined />,
    iconContainer: "bg-purple-200 text-purple-600 border-purple-400",
  },
  {
    label: "Pending Settlements",
    description: "Outstanding dues or unpaid invoices awaiting payout.",
    value: "₹50,000",
    icon: <StopOutlined />,
    iconContainer: "bg-yellow-200 text-yellow-600 border-yellow-400",
  },
  {
    label: "Logistics Cost as % of Sales",
    description: "Indicates cost efficiency across shipments.",
    value: "12.5%",
    icon: <RiseOutlined />,
    iconContainer: "bg-teal-200 text-teal-600 border-teal-400",
  },
  {
    label: "Profit Margin per Route/Partner",
    description: "Highlights regional or operational profitability.",
    value: "18.3%",
    icon: <FundOutlined />,
    iconContainer: "bg-indigo-200 text-indigo-600 border-indigo-400",
  },
];

const FinancialKpisPage = () => {
  return (
    <div>
      <Title style={{ marginBottom: "0px" }} level={4}>
        Financial KPIs
      </Title>
      <Paragraph>
        These help partners instantly understand how much they’ve earned and how
        performance translates to payouts.
      </Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {financialKpis.map(
          ({ label, description, value, icon, iconContainer }) => (
            <ResponsiveCard hoverable key={label} shadow>
              <div className="flex flex-col gap-3">
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

export default FinancialKpisPage;

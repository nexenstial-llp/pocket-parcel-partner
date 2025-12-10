/* eslint-disable react/prop-types */
import { Typography, Space, Divider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const SummaryStep = ({ summaryData }) => {
  const formatCurrency = (amount) => `₹${amount?.toFixed(2)}`;

  const SummaryRow = ({ label, value, bold = false, size = "default" }) => (
    <div className="flex justify-between items-center">
      <Typography.Text
        type="secondary"
        strong={bold}
        className={size === "large" ? "text-base" : ""}
      >
        {label}
      </Typography.Text>
      <Typography.Text
        strong={bold}
        className={size === "large" ? "text-lg" : ""}
      >
        {typeof value === "number" ? formatCurrency(value) : value}
      </Typography.Text>
    </div>
  );

  return (
    <div className="flex justify-center">
      <ResponsiveCard
        title={
          <Space>
            <CheckCircleOutlined className="text-blue-500" />
            <span>Payment Summary</span>
          </Space>
        }
        className="max-w-md w-full shadow-md"
      >
        <Space direction="vertical" className="w-full" size="small">
          <Divider className="my-2!" />

          {/* Subtotal */}
          <SummaryRow label="Base Cost" value={summaryData?.base_cost} />
          <SummaryRow label="Service Cost" value={summaryData?.service_cost} />
          <SummaryRow label="Subtotal" value={summaryData?.subtotal} bold />

          {/* Tax breakdown */}
          {summaryData?.tax_breakdown?.map((tax, index) => (
            <div key={index} className="flex justify-between items-center">
              <Space size={4}>
                <Typography.Text type="secondary">
                  {tax.name} ({tax.percentage}%)
                </Typography.Text>
                {tax.is_inclusive && (
                  <Typography.Tag color="blue" className="text-xs m-0!">
                    Inclusive
                  </Typography.Tag>
                )}
              </Space>
              <Typography.Text>{formatCurrency(tax.amount)}</Typography.Text>
            </div>
          ))}

          {/* Discount */}
          {summaryData?.offer_discount > 0 && (
            <SummaryRow
              label="Offer Discount"
              value={summaryData?.offer_discount}
            />
          )}

          <Divider className="my-3!" />

          {/* Total */}
          <SummaryRow
            label="Total Amount"
            value={summaryData?.total_charge}
            bold
            size="large"
          />
        </Space>
      </ResponsiveCard>
    </div>
  );
};

export default SummaryStep;

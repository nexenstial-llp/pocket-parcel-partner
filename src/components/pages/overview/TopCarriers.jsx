import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Button, Divider, Empty, Radio, Tabs } from "antd";
import TopCarriersForward from "./TopCarriersForward";
import TopCarrierReverse from "./TopCarrierReverse";

const TopCarriers = () => {
  return (
    <ResponsiveCard
      title={
        <div className="py-2">
          <p>Top Carriers</p>
          <small>
            Hold your carriers to a high standard by monitoring their
            performance, from average TATs to failed deliveries
          </small>
        </div>
      }
      size="small"
    >
      <Tabs
        size="small"
        type="card"
        items={[
          {
            key: "forward",
            label: "Forward",
            children: <TopCarriersForward />,
          },
          {
            key: "reverse",
            label: "Reverse",
            children: <TopCarrierReverse />,
          },
        ]}
      />
      <Divider style={{ margin: "12px 0px" }} />
      <Radio.Group size="small" defaultValue="top-cities" buttonStyle="solid">
        <Radio.Button value="top-cities">Top Cities</Radio.Button>
        <Radio.Button value="top-states">Top States</Radio.Button>
      </Radio.Group>

      <div className="flex gap-2 justify-between my-2">
        <p className="text-sm">
          This visualization provides a split view of the top-performing regions
          across two critical metrics: Order Volume and RTO. These insights help
          identify areas with strong demand as well as those needing focus due
          to higher return rates.
        </p>
        <Button size="small">Download CSV</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResponsiveCard>
          <Empty />
        </ResponsiveCard>
        <ResponsiveCard>
          <Empty />
        </ResponsiveCard>
      </div>
    </ResponsiveCard>
  );
};

export default TopCarriers;

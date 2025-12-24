/* eslint-disable react/prop-types */

import { Steps } from "antd";
import { FaBox, FaTruck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";

const OrderStatusSteps = ({ order }) => {
  // 1. Define step mapping from status_timeline
  const STEP_MAPPING = [
    {
      title: "Order Placed",
      statuses: ["PENDING", "RECEIVED", "PACKED"],
      icon: <FaBox />,
    },
    {
      title: "In Transit",
      statuses: ["PICKUP_SCHEDULED", "PICKED_UP", "IN_TRANSIT"],
      icon: <FaTruck />,
    },
    {
      title: "Out For Delivery",
      statuses: ["OUT_FOR_DELIVERY"],
      icon: <TbTruckDelivery />,
    },
    {
      title: "Delivered",
      statuses: ["DELIVERED", "RTO_DELIVERED"],
      icon: <FaCheckCircle />,
    },
  ];

  // 2. Get status_timeline (reverse chronological order for progress)
  const statusTimeline = order?.status_timeline || [];

  // 3. Find current step based on latest status
  const getCurrentStepIndex = (timeline) => {
    if (!timeline.length) return 0;

    // Get the MOST RECENT status (last in timeline array)
    const latestStatus = timeline[timeline.length - 1]?.to_status;

    if (["DELIVERED", "RTO_DELIVERED"].includes(latestStatus)) return 3;
    if (latestStatus === "OUT_FOR_DELIVERY") return 2;
    if (["PICKUP_SCHEDULED", "PICKED_UP", "IN_TRANSIT"].includes(latestStatus))
      return 1;
    if (["PENDING", "RECEIVED", "PACKED"].includes(latestStatus)) return 0;

    return 0; // Default
  };

  // 4. Create dynamic items
  const items = STEP_MAPPING.map((step, index) => {
    const currentStatus = statusTimeline.find((item) =>
      step.statuses.includes(item.to_status)
    );

    const hasProgress = index <= getCurrentStepIndex(statusTimeline);

    return {
      icon: step.icon,
      title: step.title,
      description: hasProgress
        ? currentStatus?.notes || `${step.title} completed`
        : "Pending",
      // Ant Design status logic
      status:
        index < getCurrentStepIndex(statusTimeline)
          ? "finish"
          : index === getCurrentStepIndex(statusTimeline)
          ? "process"
          : "wait",
    };
  });

  const currentStep = getCurrentStepIndex(statusTimeline);

  return (
    <Steps
      labelPlacement="vertical"
      current={currentStep}
      items={items}
      size="small"
    />
  );
};

export default OrderStatusSteps;

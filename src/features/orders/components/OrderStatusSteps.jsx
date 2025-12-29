/* eslint-disable react/prop-types */
import { Steps } from "antd";
import {
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaWarehouse,
  FaExclamationTriangle,
  FaClipboardList,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import moment from "moment-timezone";

const OrderStatusSteps = ({ orders }) => {
  const statusTimeline = orders?.status_timeline || [];
  const currentStatus = orders?.order_status;

  // 1. Define the "Happy Path" Steps
  // These represent the standard milestones of a successful delivery.
  // We map your specific enums to these visual steps.
  const baseSteps = [
    {
      key: "placed",
      title: "Order Placed",
      icon: <FaClipboardList />,
      // Statuses that generally indicate the order exists but hasn't moved physically yet
      matchStatuses: [
        "DRAFT",
        "PENDING_PAYMENT",
        "PAYMENT_FAILED", // Technically here until resolved
        "CONFIRMED",
        "PROCESSING",
        "PENDING", // From Lifecycle
      ],
    },
    {
      key: "warehouse",
      title: "Processing",
      icon: <FaWarehouse />,
      // Statuses indicating warehouse handling
      matchStatuses: [
        "RECEIVED", // Lifecycle & Status
        "PACKED", // Lifecycle
        "PICKUP_SCHEDULED",
        "PICKUP_PENDING",
      ],
    },
    {
      key: "transit",
      title: "In Transit",
      icon: <FaTruck />,
      // Statuses indicating movement
      matchStatuses: [
        "PICKED_UP",
        "PICKED", // Lifecycle
        "IN_TRANSIT", // Lifecycle & Status
      ],
    },
    {
      key: "out_for_delivery",
      title: "Out For Delivery",
      icon: <TbTruckDelivery />,
      matchStatuses: ["OUT_FOR_DELIVERY"],
    },
    {
      key: "delivered",
      title: "Delivered",
      icon: <FaCheckCircle />,
      matchStatuses: ["DELIVERED"],
    },
  ];

  // 2. Identify "Terminal" or "Negative" Statuses based on current state
  const isCancelled = currentStatus === "CANCELLED";

  const isRTO = ["RTO_INITIATED", "RTO_IN_TRANSIT", "RTO_DELIVERED"].includes(
    currentStatus
  );

  const isLostOrDamaged = ["LOST", "DAMAGED", "DELIVERY_FAILED"].includes(
    currentStatus
  );

  // 3. Find the furthest progress on the Happy Path
  // We look at the timeline to see what was the last "positive" step achieved.
  let activeStepIndex = 0;

  // We scan the timeline history to find the 'highest' step index matched.
  // This ensures that if an order was "IN_TRANSIT" and then "CANCELLED",
  // the progress bar stops at step 2 (Transit).
  if (statusTimeline.length > 0) {
    statusTimeline.forEach((log) => {
      const status = log.to_status;
      const stepIndex = baseSteps.findIndex((step) =>
        step.matchStatuses.includes(status)
      );
      // If we find a status that maps to a later step, update our active index
      if (stepIndex > activeStepIndex) {
        activeStepIndex = stepIndex;
      }
    });
  } else {
    // Fallback if timeline is empty but we have a current status
    const currentStepIndex = baseSteps.findIndex((step) =>
      step.matchStatuses.includes(currentStatus)
    );
    if (currentStepIndex > -1) activeStepIndex = currentStepIndex;
  }

  // 4. Construct the Final Steps Items Array
  const items = baseSteps.map((step, index) => {
    // Find the log entry corresponding to this step for timestamp info
    // We reverse to find the latest relevant log if there are multiple
    const relevantLog = [...statusTimeline]
      .reverse()
      .find((log) => step.matchStatuses.includes(log.to_status));

    const isCompleted = index < activeStepIndex;
    const isActive = index === activeStepIndex;

    // --- HANDLE NEGATIVE STATES ON THE ACTIVE STEP ---
    // If this is the current stage of the order, and the order is in a bad state,
    // we override the visual presentation of this step.
    if (isActive) {
      if (isCancelled) {
        // Find specific cancellation log for notes
        const cancelLog = statusTimeline.find(
          (l) => l.to_status === "CANCELLED"
        );
        return {
          title: "Cancelled",
          description: cancelLog?.notes || "Order was cancelled",
          status: "error", // Turns step red
          icon: <FaTimesCircle />,
        };
      }
      if (isRTO) {
        return {
          title: "RTO Initiated",
          description: "Returning to origin",
          status: "error", // Or "process" with orange color if supported
          icon: <FaExclamationTriangle />,
        };
      }
      if (isLostOrDamaged) {
        return {
          title: "Delivery Exception",
          description: "Package lost or damaged",
          status: "error",
          icon: <FaExclamationTriangle />,
        };
      }
    }

    // --- STANDARD RENDERING ---
    let description = "Pending";
    if (relevantLog) {
      description = moment(relevantLog.created_at).format("DD MMM, HH:mm");
    } else if (isActive && !isCompleted) {
      description = "In Progress";
    }

    return {
      title: step.title,
      description: description,
      status: isCompleted ? "finish" : isActive ? "process" : "wait",
      icon: step.icon,
    };
  });

  return (
    <div className="w-full overflow-x-auto py-2">
      <Steps
        items={items}
        current={activeStepIndex}
        labelPlacement="vertical"
        size="small"
        className="min-w-[320px]"
      />
    </div>
  );
};

export default OrderStatusSteps;

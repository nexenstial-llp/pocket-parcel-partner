/* eslint-disable react/prop-types */
import { Modal, Button, Typography, Result } from "antd";
import { useNavigate } from "@tanstack/react-router";

const { Text } = Typography;

const PaymentSuccessModal = ({
  open,
  onClose,
  amount,
  transactionId,
  orderId,
  orderNumber,
}) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate({ to: `/orders/${orderId}` });
    onClose();
  };

  const handleOrdersClick = () => {
    navigate({ to: "/orders" });
    onClose();
  };

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      className="p-4"
    >
      <Result
        status="success"
        title="Payment Successful!"
        subTitle={
          <div className="flex flex-col gap-2">
            <Text>Your payment has been processed successfully.</Text>
            {transactionId && (
              <Text type="secondary" className="text-xs">
                Transaction ID: {transactionId}
              </Text>
            )}
            {orderId && (
              <Text type="secondary" className="text-xs">
                Order ID: {orderId}
              </Text>
            )}
            {orderNumber && (
              <Text type="secondary" className="text-xs">
                Order Number: {orderNumber}
              </Text>
            )}
          </div>
        }
        extra={[
          amount && (
            <div key="amount" className="mb-6">
              <Text className="text-lg font-semibold">
                Amount Paid: ₹{amount}
              </Text>
            </div>
          ),
          <div key="buttons" className="flex  gap-3 w-full">
            <Button size="large" key="orders" onClick={handleOrdersClick} block>
              Back to Orders
            </Button>
            <Button
              type="primary"
              size="large"
              key="details"
              onClick={handleDetailsClick}
              block
              className="bg-green-500 hover:bg-green-600 border-green-500"
            >
              View Order Details
            </Button>
          </div>,
        ]}
      />
    </Modal>
  );
};

export default PaymentSuccessModal;

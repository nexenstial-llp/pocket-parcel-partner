import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetOrders } from "@/features/orders/orders.query";
import { useFetchWarehouse } from "@/features/warehouses/warehouses.query";
import PageLayout from "@/components/layout/PageLayout";
import { Card, Spin, Table, Button, Statistic, Row, Col } from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { BiPackage } from "react-icons/bi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { getStatusColor, removeUnderscores } from "@/utils/typography.util";
import { Tag } from "antd";

export const Route = createFileRoute("/_authenticated/home/")({
  component: HomeComponent,
});

function HomeComponent() {
  // Fetch Stats Data
  const { data: ordersData, isLoading: isLoadingOrders } = useGetOrders({
    page: 1,
    limit: 5,
  });
  console.log("ordersData", ordersData?.orders?.length);
  const { data: warehousesData, isLoading: isLoadingWarehouses } =
    useFetchWarehouse({ page: 1, limit: 1 });
  console.log(ordersData);
  const stats = [
    {
      title: "Total Orders",
      value: ordersData?.pagination?.totalItems || 0,
      icon: <BiPackage size={20} className="text-blue-500" />,
      loading: isLoadingOrders,
    },
    {
      title: "Total Warehouses",
      value: warehousesData?.pagination?.total_items || 0,
      icon: <TbBuildingWarehouse size={20} className="text-green-500" />,
      loading: isLoadingWarehouses,
    },
  ];

  const quickActions = [
    {
      title: "Create Order",
      icon: <ShoppingCartOutlined className="text-2xl text-blue-500" />,
      link: "/orders/create",
      description: "Create a new shipment order",
    },
    {
      title: "Add Warehouse",
      icon: <HomeOutlined className="text-2xl text-green-500" />,
      link: "/warehouses", // Assuming list page has create button, or specific create route
      description: "Register a new warehouse",
    },
  ];

  const columns = [
    {
      title: "S.No",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Order ID",
      dataIndex: "order_number",
      key: "order_number",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{removeUnderscores(status)}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/orders/track-order`} search={{ orderId: record.order_id }}>
          <Button type="link" size="small">
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <PageLayout className="gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1 text-gray-800">Welcome Back</h1>

        {/* Stats Section */}
        <Row gutter={[16, 8]} className="mb-6">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Spin spinning={stat.loading}>
                  <Statistic
                    title={
                      <span className="text-gray-500 font-medium">
                        {stat.title}
                      </span>
                    }
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ fontWeight: "bold" }}
                  />
                </Spin>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders Section */}
          <div className="lg:col-span-2">
            <Card
              title={
                <span className="font-semibold text-lg">Recent Orders</span>
              }
              className="shadow-sm h-full"
              extra={
                <Link to="/orders">
                  <Button type="link" className="flex items-center gap-1 p-0">
                    View All <RightOutlined />
                  </Button>
                </Link>
              }
            >
              <Table
                dataSource={ordersData?.orders || []}
                columns={columns}
                rowKey="id"
                pagination={false}
                loading={isLoadingOrders}
                size="small"
                scroll={{ x: true }}
                bordered
              />
            </Card>
          </div>

          {/* Quick Actions Section */}
          <div className="lg:col-span-1">
            <Card
              title={
                <span className="font-semibold text-lg">Quick Actions</span>
              }
              className="shadow-sm h-full"
            >
              <div className="flex flex-col gap-4">
                {quickActions.map((action, index) => (
                  <Link to={action.link} key={index} className="block">
                    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-blue-100 transition-all cursor-pointer group">
                      <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors">
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-800 m-0">
                          {action.title}
                        </h4>
                        <p className="text-xs text-gray-500 m-0">
                          {action.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <PlusOutlined className="text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

/* eslint-disable react/prop-types */

import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Card, Row, Col, Descriptions, Divider, Tag } from "antd";

// Main Component
const ShipmentDetailsPage = ({ data }) => {
  const { pickup_info, drop_info, shipment_details, additional, gst_info } =
    data;

  return (
    <ResponsiveCard title={<span className="text-xl ">Order Overview</span>}>
      <Row gutter={[16, 16]}>
        {/* Pickup Section */}
        <Col xs={24} md={12}>
          <Card title="Pickup Information" className="shadow-sm rounded-md">
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Name">
                {pickup_info?.pickup_name}
              </Descriptions.Item>
              <Descriptions.Item label="Organisation">
                {pickup_info?.pickup_organisation}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {pickup_info?.pickup_address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {pickup_info?.pickup_city}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {pickup_info?.pickup_state}
              </Descriptions.Item>
              <Descriptions.Item label="Pincode">
                {pickup_info?.pickup_pincode}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {pickup_info?.pickup_phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {pickup_info?.email}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Drop Section */}
        <Col xs={24} md={12}>
          <Card title="Drop Information" className="shadow-sm rounded-md">
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Name">
                {drop_info?.drop_name}
              </Descriptions.Item>
              <Descriptions.Item label="Organisation">
                {drop_info?.drop_organisation}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {drop_info?.drop_address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {drop_info?.drop_city}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {drop_info?.drop_state}
              </Descriptions.Item>
              <Descriptions.Item label="Pincode">
                {drop_info?.drop_pincode}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {drop_info?.drop_phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {drop_info?.drop_email}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Shipment Details */}
      <Card title="Shipment Details" className="mt-4 shadow-sm rounded-md">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Order ID">
                {shipment_details?.order_id}
              </Descriptions.Item>
              <Descriptions.Item label="Invoice Number">
                {shipment_details?.invoice_number}
              </Descriptions.Item>
              <Descriptions.Item label="Invoice Date">
                {shipment_details?.invoice_date}
              </Descriptions.Item>
              <Descriptions.Item label="Order Type">
                {shipment_details?.order_type}
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Type">
                {shipment_details?.delivery_type}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Weight">
                {shipment_details?.weight} g
              </Descriptions.Item>
              <Descriptions.Item label="Length">
                {shipment_details?.length} cm
              </Descriptions.Item>
              <Descriptions.Item label="Breadth">
                {shipment_details?.breadth} cm
              </Descriptions.Item>
              <Descriptions.Item label="Height">
                {shipment_details?.height} cm
              </Descriptions.Item>
              <Descriptions.Item label="Invoice Value">
                {shipment_details?.invoice_value}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Additional Info */}
      <Card title="Additional Info" className="mt-4 shadow-sm rounded-md">
        <div className="flex flex-wrap gap-2 mb-2">
          {additional?.is_fragile && <Tag color="volcano">Fragile</Tag>}
          {additional?.is_dangerous && <Tag color="red">Dangerous</Tag>}
          {additional?.enable_whatsapp && (
            <Tag color="green">WhatsApp Enabled</Tag>
          )}
        </div>

        <Descriptions column={2} bordered size="small" className="text-sm">
          <Descriptions.Item label="GST Number">
            {additional?.gst_number}
          </Descriptions.Item>
          <Descriptions.Item label="Store Code">
            {additional?.store_code}
          </Descriptions.Item>
          <Descriptions.Item label="Zone">{additional?.zone}</Descriptions.Item>
          <Descriptions.Item label="Channel">
            {additional?.channel_name}
          </Descriptions.Item>
          <Descriptions.Item label="Estimated Delivery">
            {additional?.estimated_delivery_date}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />

      {/* GST Info */}
      <Card title="GST Information" className="mt-4 shadow-sm rounded-md">
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Seller GSTIN">
            {gst_info?.seller_gstin}
          </Descriptions.Item>
          <Descriptions.Item label="Invoice Number">
            {gst_info?.invoice_number}
          </Descriptions.Item>
          <Descriptions.Item label="Taxable Value">
            {gst_info?.taxable_value}
          </Descriptions.Item>
          <Descriptions.Item label="CGST Amount">
            {gst_info?.cgst_amount}
          </Descriptions.Item>
          <Descriptions.Item label="SGST Amount">
            {gst_info?.sgst_amount}
          </Descriptions.Item>
          <Descriptions.Item label="IGST Amount">
            {gst_info?.igst_amount}
          </Descriptions.Item>
          <Descriptions.Item label="Total Tax">
            {gst_info?.gst_total_tax}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </ResponsiveCard>
  );
};

export default ShipmentDetailsPage;

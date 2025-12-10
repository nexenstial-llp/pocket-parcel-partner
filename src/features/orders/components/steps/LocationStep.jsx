import { Form, Row, Col, Input, DatePicker } from "antd";
import { APIProvider } from "@vis.gl/react-google-maps";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";
import dayjs from "dayjs";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const LocationStep = () => {
  const form = Form.useFormInstance();

  return (
    <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PICKUP INFO */}
        <ResponsiveCard title="Pickup Information">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_name"]}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Sender Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_phone"]}
                label="Phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="Sender Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                rules={[{ required: true, message: "Email is required" }]}
                name={["pickup_info", "email"]}
                label="Email"
              >
                <Input placeholder="Sender Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                name={["pickup_info", "pickup_address"]}
                label="Address"
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name={["pickup_info", "pickup_landmark"]}
                label="Landmark"
                rules={[{ required: true }]}
              >
                <GoogleAddressPicker
                  showMap={false}
                  onLocationSelect={(loc) => {
                    form.setFieldsValue({
                      pickup_info: {
                        pickup_lat: loc.lat,
                        pickup_long: loc.lng,
                        pickup_landmark: loc.address,
                        pickup_pincode: loc.pincode,
                        pickup_city: loc.city,
                        pickup_state: loc.state,
                        pickup_country: loc.country,
                        pickup_district: loc.district,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_pincode"]}
                label="Pincode"
                rules={[{ required: true }]}
              >
                <Input placeholder="Pincode" maxLength={6} minLength={6} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_city"]}
                label="City"
                rules={[{ required: true }]}
              >
                <Input placeholder="City" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_district"]}
                label="District"
              >
                <Input placeholder="District" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_state"]}
                label="State"
                rules={[{ required: true }]}
              >
                <Input placeholder="State" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_country"]}
                label="Country"
              >
                <Input placeholder="Country" readOnly />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_time"]}
                label="Pickup Time"
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                  showTime
                  style={{ width: "100%" }}
                  format={"DD-MM-YYYY HH:mm"}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_latitude"]}
                label="Latitude"
                hidden
              >
                <Input placeholder="Latitude" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["pickup_info", "pickup_longitude"]}
                label="Longitude"
                hidden
              >
                <Input placeholder="Longitude" readOnly />
              </Form.Item>
            </Col>
          </Row>
        </ResponsiveCard>

        {/* DROP INFO */}
        <ResponsiveCard title="Drop Information">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_name"]}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Receiver Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_phone"]}
                label="Phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="Receiver Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name={["drop_info", "drop_email"]} label="Email">
                <Input placeholder="Receiver Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                name={["drop_info", "drop_address"]}
                label="Address"
                rules={[{ required: true }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                rules={[{ required: true }]}
                name={["drop_info", "drop_landmark"]}
                label="Landmark"
              >
                <GoogleAddressPicker
                  showMap={false}
                  onLocationSelect={(loc) => {
                    form.setFieldsValue({
                      drop_info: {
                        drop_latitude: loc.lat,
                        drop_longitude: loc.lng,
                        drop_landmark: loc.address,
                        drop_pincode: loc.pincode,
                        drop_city: loc.city,
                        drop_state: loc.state,
                        drop_country: loc.country,
                        drop_district: loc.district,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_pincode"]}
                label="Pincode"
                rules={[{ required: true }]}
              >
                <Input placeholder="Pincode" maxLength={6} minLength={6} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_city"]}
                label="City"
                rules={[{ required: true }]}
              >
                <Input placeholder="City" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name={["drop_info", "drop_district"]} label="District">
                <Input placeholder="District" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_state"]}
                label="State"
                rules={[{ required: true }]}
              >
                <Input placeholder="State" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name={["drop_info", "drop_country"]} label="Country">
                <Input placeholder="Country" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_latitude"]}
                label="Latitude"
                hidden
              >
                <Input placeholder="Latitude" readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={["drop_info", "drop_longitude"]}
                label="Longitude"
                hidden
              >
                <Input placeholder="Longitude" readOnly />
              </Form.Item>
            </Col>
          </Row>
        </ResponsiveCard>
      </div>
    </APIProvider>
  );
};

export default LocationStep;

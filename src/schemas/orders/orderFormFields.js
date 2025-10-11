const PICKUP_INFO = "pickup_info";
const DROP_INFO = "drop_info";

export const forwardPickupInfoFormField = [
  // Name
  {
    label: "Name",
    name: [PICKUP_INFO, "pickup_name"],
    required: true,
    component_type: "input",
  },
  //   Phone
  {
    label: "Phone",
    name: [PICKUP_INFO, "pickup_phone"],
    required: true,
    component_type: "input",
  },
  {
    label: "Email",
    name: [PICKUP_INFO, "email"],
    required: true,
    component_type: "input",
    type: "email",
  },
  {
    label: "Pickup Time",
    name: [PICKUP_INFO, "pickup_time"],
    required: true,
    component_type: "date",
    fieldProps: { format: "DD-MM-YYYY hh:mm", showTime: true },
  },
  {
    label: "State",
    name: [PICKUP_INFO, "pickup_state"],
    required: true,
    component_type: "input",
  },
  {
    label: "Address",
    name: [PICKUP_INFO, "address"],
    required: true,
    component_type: "input",
  },
  //   Pincode
  {
    label: "Pincode",
    name: [PICKUP_INFO, "pickup_pincode"],
    required: true,
    component_type: "input",
  },
  // City
  {
    label: "City",
    name: [PICKUP_INFO, "pickup_city"],
    required: true,
    component_type: "input",
  },
  // Country
  {
    label: "Country",
    name: [PICKUP_INFO, "pickup_country"],
    required: true,
    component_type: "input",
  },
  // District
  {
    label: "District",
    name: [PICKUP_INFO, "pickup_district"],
    required: true,
    component_type: "input",
  },
  // tin
  {
    label: "TIN",
    name: [PICKUP_INFO, "tin"],
    required: true,
    component_type: "input",
  },
  // latitude
  {
    label: "Latitude",
    name: [PICKUP_INFO, "pickup_lat"],
    required: true,
    component_type: "input",
  },
  // longitude
  {
    label: "Longitude",
    name: [PICKUP_INFO, "pickup_long"],
    required: true,
    component_type: "input",
  },
  // Organisation
  {
    label: "Organisation",
    name: [PICKUP_INFO, "pickup_organisation"],
    required: true,
    component_type: "input",
  },
  // Landmark
  {
    label: "Landmark",
    name: [PICKUP_INFO, "pickup_landmark"],
    required: true,
    component_type: "input",
  },
  // Address type
  {
    label: "Address Type",
    name: [PICKUP_INFO, "pickup_address_type"],
    required: true,
    component_type: "select",
    options: [
      { label: "Residential", value: "RESIDENTIAL" },
      { label: "Office", value: "OFFICE" },
      { label: "Warehouse", value: "WAREHOUSE" },
    ],
  },
];

export const forwardDropInfoFormFields = [
  // Name
  {
    label: "Name",
    name: [DROP_INFO, "drop_name"],
    required: true,
    component_type: "input",
  },
  //   Phone
  {
    label: "Phone",
    name: [DROP_INFO, "drop_phone"],
    required: true,
    component_type: "input",
  },
  {
    label: "Email",
    name: [DROP_INFO, "email"],
    required: true,
    component_type: "input",
    type: "email",
  },
  {
    label: "Pickup Time",
    name: [DROP_INFO, "drop_time"],
    required: true,
    component_type: "date",
    fieldProps: { format: "DD-MM-YYYY hh:mm", showTime: true },
  },
  {
    label: "State",
    name: [DROP_INFO, "drop_state"],
    required: true,
    component_type: "input",
  },
  {
    label: "Address",
    name: [DROP_INFO, "address"],
    required: true,
    component_type: "input",
  },
  //   Pincode
  {
    label: "Pincode",
    name: [DROP_INFO, "drop_pincode"],
    required: true,
    component_type: "input",
  },
  // City
  {
    label: "City",
    name: [DROP_INFO, "drop_city"],
    required: true,
    component_type: "input",
  },
  // Country
  {
    label: "Country",
    name: [DROP_INFO, "drop_country"],
    required: true,
    component_type: "input",
  },
  // District
  {
    label: "District",
    name: [DROP_INFO, "drop_district"],
    required: true,
    component_type: "input",
  },
  // tin
  {
    label: "TIN",
    name: [DROP_INFO, "tin"],
    required: true,
    component_type: "input",
  },
  // latitude
  {
    label: "Latitude",
    name: [DROP_INFO, "drop_lat"],
    required: true,
    component_type: "input",
  },
  // longitude
  {
    label: "Longitude",
    name: [DROP_INFO, "drop_long"],
    required: true,
    component_type: "input",
  },
  // Organisation
  {
    label: "Organisation",
    name: [DROP_INFO, "drop_organisation"],
    required: true,
    component_type: "input",
  },
  // Landmark
  {
    label: "Landmark",
    name: [DROP_INFO, "drop_landmark"],
    required: true,
    component_type: "input",
  },
  // Address type
  {
    label: "Address Type",
    name: [DROP_INFO, "drop_address_type"],
    required: true,
    component_type: "select",
    options: [
      { label: "Residential", value: "RESIDENTIAL" },
      { label: "Office", value: "OFFICE" },
      { label: "Warehouse", value: "WAREHOUSE" },
    ],
  },
];

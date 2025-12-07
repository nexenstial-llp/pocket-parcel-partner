/* eslint-disable react/prop-types */
import { Table } from "antd";
import { FaTruckFast } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { IoMdDocument } from "react-icons/io";
const columns = [
  {
    title: "Couriers",
    dataIndex: "courier_name",
    key: "courier_name",
  },
  {
    title: "Mode",
    dataIndex: "mode",
    key: "mode",
    render: (_, { mode }) => (
      <div>
        {mode === "surface" ? (
          <FaTruckFast size={24} />
        ) : mode === "air" ? (
          <PiAirplaneTiltFill size={24} />
        ) : (
          <IoMdDocument size={24} />
        )}
      </div>
    ),
  },
  {
    title: "Min Weight",
    dataIndex: "courier_weight",
    key: "courier_weight",
    render: (_, { courier_weight }) => <span>{courier_weight}Kg</span>,
  },
  {
    title: (
      <div className="flex flex-col text-center ">
        <p>
          {" "}
          <strong>Zone A</strong>
        </p>
        <p className="text-gray-500">Within City</p>
        <p>Forward | RTO</p>
      </div>
    ),
    dataIndex: "zone_a",
    key: "zone_a",
    render: (_, { zone_a }) => (
      <div className="text-center">
        {zone_a?.forward || "NA"} | ₹ {zone_a?.rto}
      </div>
    ),
  },
  {
    title: (
      <div className="flex flex-col text-center ">
        <p>
          {" "}
          <strong>Zone B</strong>
        </p>
        <p className="text-gray-500">Within State</p>
        <p>Forward | RTO</p>
      </div>
    ),
    dataIndex: "zone_b",
    key: "zone_b",
    render: (_, { zone_b }) => (
      <div className="text-center">
        {zone_b?.forward || "NA"} | ₹ {zone_b?.rto}
      </div>
    ),
  },
  {
    title: (
      <div className="flex flex-col text-center ">
        <p>
          {" "}
          <strong>Zone C</strong>
        </p>
        <p className="text-gray-500">Metro to Metro</p>
        <p>Forward | RTO</p>
      </div>
    ),
    dataIndex: "zone_c",
    key: "zone_c",
    render: (_, { zone_c }) => (
      <div className="text-center">
        {zone_c?.forward || "NA"} | ₹ {zone_c?.rto}
      </div>
    ),
  },
  {
    title: (
      <div className="flex flex-col text-center ">
        <p>
          {" "}
          <strong>Zone D</strong>
        </p>
        <p className="text-gray-500">Rest of India</p>
        <p>Forward | RTO</p>
      </div>
    ),
    dataIndex: "zone_d",
    key: "zone_d",
    render: (_, { zone_d }) => (
      <div className="text-center">
        {zone_d?.forward || "NA"} | ₹ {zone_d?.rto}
      </div>
    ),
  },
  {
    title: (
      <div className="flex flex-col text-center ">
        <p>
          {" "}
          <strong>Zone E</strong>
        </p>
        <p className="text-gray-500">Special Destination</p>
        <p>Forward | RTO</p>
      </div>
    ),
    dataIndex: "zone_e",
    key: "zone_e",
    render: (_, { zone_e }) => (
      <div className="text-center">
        {zone_e?.forward || "NA"} | ₹ {zone_e?.rto}
      </div>
    ),
  },
  {
    title: "COD Charges/ COD%",
    dataIndex: "cod_charges",
    value: "cod_charges",
    render: (_, { cod_charges }) => (
      <div className="text-center">
        {cod_charges?.forward ? ` ₹ ${cod_charges?.forward}` : "NA"} |{" "}
        {cod_charges?.rto} %
      </div>
    ),
  },
  {
    title: "Other Charges",
    dataIndex: "other_charges",
    value: "other_charges",
    render: (_, { other_charges }) => (
      <div className="text-center">
        {other_charges?.forward ? ` ₹${other_charges?.forward}` : "NA"} |{" "}
        {other_charges?.rto} %
      </div>
    ),
  },
];
const data = [
  {
    plan_name: "Lite",
    plan_rates: {
      forward_new: [
        {
          courier_name: "Srx Economy Pro",
          courier_weight: 0.01,
          zone_a: {
            forward: null,
            rto: "105.0",
          },
          zone_b: {
            forward: null,
            rto: "119.0",
          },
          zone_c: {
            forward: null,
            rto: "168.0",
          },
          zone_d: {
            forward: null,
            rto: "205.0",
          },
          zone_e: {
            forward: null,
            rto: "256.0",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "surface",
        },
        {
          courier_name: "Srx Premium Pro",
          courier_weight: 0.01,
          zone_a: {
            forward: null,
            rto: "105.0",
          },
          zone_b: {
            forward: null,
            rto: "119.0",
          },
          zone_c: {
            forward: null,
            rto: "168.0",
          },
          zone_d: {
            forward: null,
            rto: "205.0",
          },
          zone_e: {
            forward: null,
            rto: "256.0",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "surface",
        },
        {
          courier_name: "Srx Premium Books",
          courier_weight: 0.01,
          zone_a: {
            forward: null,
            rto: "105.0",
          },
          zone_b: {
            forward: null,
            rto: "119.0",
          },
          zone_c: {
            forward: null,
            rto: "168.0",
          },
          zone_d: {
            forward: null,
            rto: "205.0",
          },
          zone_e: {
            forward: null,
            rto: "256.0",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "surface",
        },
        {
          courier_name: "Srx Priority Pro",
          courier_weight: 0.01,
          zone_a: {
            forward: null,
            rto: "105.0",
          },
          zone_b: {
            forward: null,
            rto: "119.0",
          },
          zone_c: {
            forward: null,
            rto: "168.0",
          },
          zone_d: {
            forward: null,
            rto: "205.0",
          },
          zone_e: {
            forward: null,
            rto: "256.0",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "surface",
        },
        {
          courier_name: "Srx Premium Plus Pro",
          courier_weight: 0.01,
          zone_a: {
            forward: null,
            rto: "105.0",
          },
          zone_b: {
            forward: null,
            rto: "119.0",
          },
          zone_c: {
            forward: null,
            rto: "168.0",
          },
          zone_d: {
            forward: null,
            rto: "205.0",
          },
          zone_e: {
            forward: null,
            rto: "256.0",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "surface",
        },
        {
          courier_weight: 0.05,
          courier_name: "India Post-speed Post Air Prepaid",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "35.4",
            rto: "0.0",
          },
          zone_b: {
            forward: "59.0",
            rto: "0.0",
          },
          zone_c: {
            forward: "70.8",
            rto: "0.0",
          },
          zone_d: {
            forward: "94.4",
            rto: "0.0",
          },
          zone_e: {
            forward: "106.2",
            rto: "0.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.9%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.05,
          courier_name: "India Post - Speed Post Air",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "35.4",
            rto: "0.0",
          },
          zone_b: {
            forward: "59.0",
            rto: "0.0",
          },
          zone_c: {
            forward: "70.8",
            rto: "0.0",
          },
          zone_d: {
            forward: "94.4",
            rto: "0.0",
          },
          zone_e: {
            forward: "106.2",
            rto: "0.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.9%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.25,
          courier_name: "Shiprocket 250 Gram",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "89.6",
            rto: "89.6",
          },
          zone_b: {
            forward: "98.7",
            rto: "98.7",
          },
          zone_c: {
            forward: "107.3",
            rto: "107.3",
          },
          zone_d: {
            forward: "119.6",
            rto: "119.6",
          },
          zone_e: {
            forward: "212.6",
            rto: "212.6",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "30.5",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.1%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_name: "Borzo",
          courier_weight: 0.25,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_weight: 0.5,
          courier_name: "Blue Dart Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "61.4",
            rto: null,
          },
          zone_b: {
            forward: "68.3",
            rto: null,
          },
          zone_c: {
            forward: "73.3",
            rto: null,
          },
          zone_d: {
            forward: "78.5",
            rto: null,
          },
          zone_e: {
            forward: "123.5",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "53.1",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.6%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shadowfax Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "47.7",
            rto: "47.7",
          },
          zone_b: {
            forward: "60.8",
            rto: "59.4",
          },
          zone_c: {
            forward: "62.6",
            rto: "63.2",
          },
          zone_d: {
            forward: "68.5",
            rto: "65.3",
          },
          zone_e: {
            forward: "118.1",
            rto: "118.1",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "53.1",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.1%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Blue Dart Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "62.7",
            rto: "62.7",
          },
          zone_b: {
            forward: "69.6",
            rto: "69.6",
          },
          zone_c: {
            forward: "75.5",
            rto: "75.5",
          },
          zone_d: {
            forward: "80.5",
            rto: "80.5",
          },
          zone_e: {
            forward: "125.5",
            rto: "125.5",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "53.1",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.6%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Amazon Cod Surface 500gm",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "41.0",
            rto: "41.0",
          },
          zone_b: {
            forward: "48.5",
            rto: "48.5",
          },
          zone_c: {
            forward: "58.0",
            rto: "58.0",
          },
          zone_d: {
            forward: "64.0",
            rto: "64.0",
          },
          zone_e: {
            forward: "69.0",
            rto: "69.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "26.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ekart Logistics Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "51.1",
            rto: null,
          },
          zone_b: {
            forward: "55.0",
            rto: null,
          },
          zone_c: {
            forward: "65.0",
            rto: null,
          },
          zone_d: {
            forward: "68.6",
            rto: null,
          },
          zone_e: {
            forward: "89.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "49.6",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ekart Logistics Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "51.1",
            rto: "51.1",
          },
          zone_b: {
            forward: "55.0",
            rto: "55.0",
          },
          zone_c: {
            forward: "65.0",
            rto: "65.0",
          },
          zone_d: {
            forward: "69.7",
            rto: "69.7",
          },
          zone_e: {
            forward: "102.2",
            rto: "102.2",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "49.6",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Xpressbees Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "42.2",
            rto: null,
          },
          zone_b: {
            forward: "51.3",
            rto: null,
          },
          zone_c: {
            forward: "52.6",
            rto: null,
          },
          zone_d: {
            forward: "57.6",
            rto: null,
          },
          zone_e: {
            forward: "92.1",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "48.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.5%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Xpressbees Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "45.2",
            rto: "45.2",
          },
          zone_b: {
            forward: "52.9",
            rto: "52.9",
          },
          zone_c: {
            forward: "57.6",
            rto: "57.6",
          },
          zone_d: {
            forward: "62.1",
            rto: "62.1",
          },
          zone_e: {
            forward: "98.6",
            rto: "98.6",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "48.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.5%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shadowfax Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "40.0",
            rto: null,
          },
          zone_b: {
            forward: "49.9",
            rto: null,
          },
          zone_c: {
            forward: "54.3",
            rto: null,
          },
          zone_d: {
            forward: "58.8",
            rto: null,
          },
          zone_e: {
            forward: "118.1",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "53.1",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.1%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Premium And Ros Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "66.7",
            rto: "66.7",
          },
          zone_b: {
            forward: "73.0",
            rto: "73.0",
          },
          zone_c: {
            forward: "87.6",
            rto: "87.6",
          },
          zone_d: {
            forward: "93.8",
            rto: "93.8",
          },
          zone_e: {
            forward: "201.3",
            rto: "201.3",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Blue Dart Air (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "65.4",
            rto: null,
          },
          zone_b: {
            forward: "73.8",
            rto: null,
          },
          zone_c: {
            forward: "89.3",
            rto: null,
          },
          zone_d: {
            forward: "98.2",
            rto: null,
          },
          zone_e: {
            forward: "140.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "53.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.6%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Amazon Prepaid Surface 500g",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "41.0",
            rto: "41.0",
          },
          zone_b: {
            forward: "48.5",
            rto: "48.5",
          },
          zone_c: {
            forward: "58.0",
            rto: "58.0",
          },
          zone_d: {
            forward: "64.0",
            rto: "64.0",
          },
          zone_e: {
            forward: "69.0",
            rto: "69.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "26.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Blue Dart Air",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "69.0",
            rto: "69.0",
          },
          zone_b: {
            forward: "81.5",
            rto: "81.5",
          },
          zone_c: {
            forward: "94.1",
            rto: "94.1",
          },
          zone_d: {
            forward: "109.6",
            rto: "109.6",
          },
          zone_e: {
            forward: "149.1",
            rto: "149.1",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "53.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.6%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Next Day Delivery",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "56.0",
            rto: "51.0",
          },
          zone_b: {
            forward: "56.0",
            rto: "51.0",
          },
          zone_c: {
            forward: "56.0",
            rto: "51.0",
          },
          zone_d: {
            forward: "56.0",
            rto: "51.0",
          },
          zone_e: {
            forward: "56.0",
            rto: "51.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "22.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shiprocket Next Day Delivery",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_b: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_c: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_d: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_e: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "22.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shiprocket Next Day Delivery (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "48.0",
            rto: null,
          },
          zone_b: {
            forward: "48.0",
            rto: null,
          },
          zone_c: {
            forward: "48.0",
            rto: null,
          },
          zone_d: {
            forward: "48.0",
            rto: null,
          },
          zone_e: {
            forward: "48.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "22.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shiprocket Intercity Next Day Delivery",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_b: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_c: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_d: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_e: {
            forward: "53.0",
            rto: "48.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "22.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name:
            "Shiprocket Intercity Next Day Delivery (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "48.0",
            rto: null,
          },
          zone_b: {
            forward: "48.0",
            rto: null,
          },
          zone_c: {
            forward: "48.0",
            rto: null,
          },
          zone_d: {
            forward: "48.0",
            rto: null,
          },
          zone_e: {
            forward: "48.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "22.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Delhivery Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "52.5",
            rto: "52.5",
          },
          zone_b: {
            forward: "58.5",
            rto: "58.5",
          },
          zone_c: {
            forward: "67.2",
            rto: "67.2",
          },
          zone_d: {
            forward: "71.8",
            rto: "71.8",
          },
          zone_e: {
            forward: "103.7",
            rto: "103.7",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "52.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "3.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Next Day Delivery (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "51.0",
            rto: null,
          },
          zone_b: {
            forward: "51.0",
            rto: null,
          },
          zone_c: {
            forward: "51.0",
            rto: null,
          },
          zone_d: {
            forward: "51.0",
            rto: null,
          },
          zone_e: {
            forward: "51.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "22.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_name: "Quick-ola",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_name: "Quick-borzo",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_name: "Quick-flash",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_name: "Quick-mover",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_name: "Shiprocket Quick",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_name: "Quick-rapido",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_name: "Quick-porter",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_weight: 0.5,
          courier_name: "Delhivery Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "49.0",
            rto: null,
          },
          zone_b: {
            forward: "56.9",
            rto: null,
          },
          zone_c: {
            forward: "64.0",
            rto: null,
          },
          zone_d: {
            forward: "67.0",
            rto: null,
          },
          zone_e: {
            forward: "98.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "52.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "3.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Premium And Ros Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "41.8",
            rto: "66.7",
          },
          zone_b: {
            forward: "48.1",
            rto: "73.0",
          },
          zone_c: {
            forward: "62.6",
            rto: "87.6",
          },
          zone_d: {
            forward: "69.0",
            rto: "93.8",
          },
          zone_e: {
            forward: "85.7",
            rto: "201.3",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 3,
            rto: 4,
          },
        },
        {
          courier_name: "Quick-loadshare",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "53.1",
          },
          zone_b: {
            forward: null,
            rto: "53.1",
          },
          zone_c: {
            forward: null,
            rto: "53.1",
          },
          zone_d: {
            forward: null,
            rto: "53.1",
          },
          zone_e: {
            forward: null,
            rto: "53.1",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_weight: 0.5,
          courier_name: "Shiprocket Air Next Day Delivery (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "61.0",
            rto: null,
          },
          zone_b: {
            forward: "61.0",
            rto: null,
          },
          zone_c: {
            forward: "61.0",
            rto: null,
          },
          zone_d: {
            forward: "61.0",
            rto: null,
          },
          zone_e: {
            forward: "61.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "28.3",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.1%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Dtdc Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "49.6",
            rto: "49.6",
          },
          zone_b: {
            forward: "57.2",
            rto: "57.2",
          },
          zone_c: {
            forward: "66.4",
            rto: "66.4",
          },
          zone_d: {
            forward: "70.0",
            rto: "70.0",
          },
          zone_e: {
            forward: "94.1",
            rto: "94.1",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "48.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.6%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Dtdc Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "25.5",
            rto: null,
          },
          zone_b: {
            forward: "32.0",
            rto: null,
          },
          zone_c: {
            forward: "45.8",
            rto: null,
          },
          zone_d: {
            forward: "54.6",
            rto: null,
          },
          zone_e: {
            forward: "62.3",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "48.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.6%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_name: "India Post Tracked Packet Service",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "70.8",
          },
          zone_b: {
            forward: null,
            rto: "70.8",
          },
          zone_c: {
            forward: null,
            rto: "70.8",
          },
          zone_d: {
            forward: null,
            rto: "70.8",
          },
          zone_e: {
            forward: null,
            rto: "70.8",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "air",
        },
        {
          courier_name: "India Post Regd. Small Packet",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "70.8",
          },
          zone_b: {
            forward: null,
            rto: "70.8",
          },
          zone_c: {
            forward: null,
            rto: "70.8",
          },
          zone_d: {
            forward: null,
            rto: "70.8",
          },
          zone_e: {
            forward: null,
            rto: "70.8",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "air",
        },
        {
          courier_name: "India Post Air Parcel",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "70.8",
          },
          zone_b: {
            forward: null,
            rto: "70.8",
          },
          zone_c: {
            forward: null,
            rto: "70.8",
          },
          zone_d: {
            forward: null,
            rto: "70.8",
          },
          zone_e: {
            forward: null,
            rto: "70.8",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "air",
        },
        {
          courier_name: "India Post Ems Merchandise",
          courier_weight: 0.5,
          zone_a: {
            forward: null,
            rto: "70.8",
          },
          zone_b: {
            forward: null,
            rto: "70.8",
          },
          zone_c: {
            forward: null,
            rto: "70.8",
          },
          zone_d: {
            forward: null,
            rto: "70.8",
          },
          zone_e: {
            forward: null,
            rto: "70.8",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "air",
        },
        {
          courier_weight: 0.5,
          courier_name: "Shadowfax Air (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "41.0",
            rto: null,
          },
          zone_b: {
            forward: "50.0",
            rto: null,
          },
          zone_c: {
            forward: "77.0",
            rto: null,
          },
          zone_d: {
            forward: "84.0",
            rto: null,
          },
          zone_e: {
            forward: "103.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "38.2",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.6%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "42.1",
            rto: null,
          },
          zone_b: {
            forward: "48.6",
            rto: null,
          },
          zone_c: {
            forward: "60.2",
            rto: null,
          },
          zone_d: {
            forward: "66.1",
            rto: null,
          },
          zone_e: {
            forward: "91.9",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "47.2",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shadowfax Air",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "53.0",
            rto: "53.0",
          },
          zone_b: {
            forward: "61.0",
            rto: "61.0",
          },
          zone_c: {
            forward: "81.0",
            rto: "81.0",
          },
          zone_d: {
            forward: "88.0",
            rto: "88.0",
          },
          zone_e: {
            forward: "112.0",
            rto: "112.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "38.2",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.6%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Surface",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "49.1",
            rto: "49.1",
          },
          zone_b: {
            forward: "55.4",
            rto: "55.4",
          },
          zone_c: {
            forward: "65.0",
            rto: "65.0",
          },
          zone_d: {
            forward: "69.6",
            rto: "69.6",
          },
          zone_e: {
            forward: "99.2",
            rto: "99.2",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "47.2",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shiprocket Air Next Day Delivery",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "76.0",
            rto: "56.1",
          },
          zone_b: {
            forward: "76.0",
            rto: "56.1",
          },
          zone_c: {
            forward: "76.0",
            rto: "56.1",
          },
          zone_d: {
            forward: "76.0",
            rto: "56.1",
          },
          zone_e: {
            forward: "76.0",
            rto: "56.1",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "28.3",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.1%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ekart Logistics Air (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "50.9",
            rto: null,
          },
          zone_b: {
            forward: "55.2",
            rto: null,
          },
          zone_c: {
            forward: "62.8",
            rto: null,
          },
          zone_d: {
            forward: "62.8",
            rto: null,
          },
          zone_e: {
            forward: "88.6",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "48.2",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.4%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Delhivery Air",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "52.3",
            rto: "52.3",
          },
          zone_b: {
            forward: "59.3",
            rto: "59.3",
          },
          zone_c: {
            forward: "82.7",
            rto: "82.7",
          },
          zone_d: {
            forward: "97.2",
            rto: "97.2",
          },
          zone_e: {
            forward: "137.0",
            rto: "137.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "52.9",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "3.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Delhivery Air (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "48.8",
            rto: null,
          },
          zone_b: {
            forward: "57.7",
            rto: null,
          },
          zone_c: {
            forward: "79.0",
            rto: null,
          },
          zone_d: {
            forward: "88.9",
            rto: null,
          },
          zone_e: {
            forward: "129.9",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "52.9",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "3.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Xpressbees Air",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "45.0",
            rto: "45.0",
          },
          zone_b: {
            forward: "52.8",
            rto: "52.8",
          },
          zone_c: {
            forward: "73.7",
            rto: "73.7",
          },
          zone_d: {
            forward: "80.7",
            rto: "80.7",
          },
          zone_e: {
            forward: "111.9",
            rto: "111.9",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "48.8",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.4%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Air 500gm (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "40.9",
            rto: null,
          },
          zone_b: {
            forward: "46.7",
            rto: null,
          },
          zone_c: {
            forward: "67.1",
            rto: null,
          },
          zone_d: {
            forward: "76.4",
            rto: null,
          },
          zone_e: {
            forward: "93.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ekart Logistics Air",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "50.9",
            rto: "50.9",
          },
          zone_b: {
            forward: "55.2",
            rto: "55.2",
          },
          zone_c: {
            forward: "100.0",
            rto: "100.0",
          },
          zone_d: {
            forward: "107.9",
            rto: "107.9",
          },
          zone_e: {
            forward: "101.3",
            rto: "101.3",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "48.2",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.4%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Xpressbees Air (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "42.0",
            rto: null,
          },
          zone_b: {
            forward: "51.2",
            rto: null,
          },
          zone_c: {
            forward: "70.2",
            rto: null,
          },
          zone_d: {
            forward: "71.8",
            rto: null,
          },
          zone_e: {
            forward: "103.7",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "48.8",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.4%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Dtdc Air 500gm",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "54.2",
            rto: "54.2",
          },
          zone_b: {
            forward: "62.3",
            rto: "62.3",
          },
          zone_c: {
            forward: "84.1",
            rto: "84.1",
          },
          zone_d: {
            forward: "91.3",
            rto: "91.3",
          },
          zone_e: {
            forward: "116.4",
            rto: "116.4",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "38.2",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.6%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Dtdc Air 500gm (Additional 0.5Kg)",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "41.3",
            rto: null,
          },
          zone_b: {
            forward: "51.4",
            rto: null,
          },
          zone_c: {
            forward: "79.1",
            rto: null,
          },
          zone_d: {
            forward: "86.4",
            rto: null,
          },
          zone_e: {
            forward: "107.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "38.2",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.6%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Air 500gm",
          mode: "air",
          ship_type: 1,
          zone_a: {
            forward: "43.0",
            rto: "43.0",
          },
          zone_b: {
            forward: "49.2",
            rto: "49.2",
          },
          zone_c: {
            forward: "70.6",
            rto: "70.6",
          },
          zone_d: {
            forward: "80.4",
            rto: "80.4",
          },
          zone_e: {
            forward: "118.5",
            rto: "118.5",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Bluedart Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "40.0",
            rto: null,
          },
          zone_b: {
            forward: "45.0",
            rto: null,
          },
          zone_c: {
            forward: "53.0",
            rto: null,
          },
          zone_d: {
            forward: "59.0",
            rto: null,
          },
          zone_e: {
            forward: "73.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "44.2",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.7%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Shadowfax Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "34.0",
            rto: null,
          },
          zone_b: {
            forward: "38.0",
            rto: null,
          },
          zone_c: {
            forward: "42.0",
            rto: null,
          },
          zone_d: {
            forward: "44.0",
            rto: null,
          },
          zone_e: {
            forward: "62.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "49.1",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Ekart Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "24.3",
            rto: null,
          },
          zone_b: {
            forward: "29.0",
            rto: null,
          },
          zone_c: {
            forward: "33.7",
            rto: null,
          },
          zone_d: {
            forward: "38.3",
            rto: null,
          },
          zone_e: {
            forward: "63.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Amazon Shipping Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "41.9",
            rto: null,
          },
          zone_b: {
            forward: "45.1",
            rto: null,
          },
          zone_c: {
            forward: "48.3",
            rto: null,
          },
          zone_d: {
            forward: "55.7",
            rto: null,
          },
          zone_e: {
            forward: "62.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "33.5",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Ecom Express Surface 10kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "22.1",
            rto: null,
          },
          zone_b: {
            forward: "24.1",
            rto: null,
          },
          zone_c: {
            forward: "29.2",
            rto: null,
          },
          zone_d: {
            forward: "32.9",
            rto: null,
          },
          zone_e: {
            forward: "33.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Ecom Express Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "24.4",
            rto: null,
          },
          zone_b: {
            forward: "26.7",
            rto: null,
          },
          zone_c: {
            forward: "33.2",
            rto: null,
          },
          zone_d: {
            forward: "40.2",
            rto: null,
          },
          zone_e: {
            forward: "46.3",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Dtdc Surface 20kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "16.3",
            rto: null,
          },
          zone_b: {
            forward: "20.0",
            rto: null,
          },
          zone_c: {
            forward: "25.4",
            rto: null,
          },
          zone_d: {
            forward: "29.0",
            rto: null,
          },
          zone_e: {
            forward: "36.3",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "32.7",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Dtdc Surface 10kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "23.6",
            rto: null,
          },
          zone_b: {
            forward: "27.2",
            rto: null,
          },
          zone_c: {
            forward: "32.7",
            rto: null,
          },
          zone_d: {
            forward: "34.5",
            rto: null,
          },
          zone_e: {
            forward: "38.1",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "32.7",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Amazon Shipping Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "39.0",
            rto: null,
          },
          zone_b: {
            forward: "54.7",
            rto: null,
          },
          zone_c: {
            forward: "63.9",
            rto: null,
          },
          zone_d: {
            forward: "76.5",
            rto: null,
          },
          zone_e: {
            forward: "93.7",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "36.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Amazon Shipping Surface 10kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "25.5",
            rto: null,
          },
          zone_b: {
            forward: "27.3",
            rto: null,
          },
          zone_c: {
            forward: "34.5",
            rto: null,
          },
          zone_d: {
            forward: "43.6",
            rto: null,
          },
          zone_e: {
            forward: "49.1",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "41.8",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "27.2",
            rto: null,
          },
          zone_b: {
            forward: "30.9",
            rto: null,
          },
          zone_c: {
            forward: "40.1",
            rto: null,
          },
          zone_d: {
            forward: "46.5",
            rto: null,
          },
          zone_e: {
            forward: "56.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.7%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Delhivery Surface 20kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "26.7",
            rto: null,
          },
          zone_b: {
            forward: "33.3",
            rto: null,
          },
          zone_c: {
            forward: "38.2",
            rto: null,
          },
          zone_d: {
            forward: "43.4",
            rto: null,
          },
          zone_e: {
            forward: "53.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "66.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "3.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Ekart Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "41.8",
            rto: null,
          },
          zone_b: {
            forward: "54.5",
            rto: null,
          },
          zone_c: {
            forward: "65.4",
            rto: null,
          },
          zone_d: {
            forward: "83.6",
            rto: null,
          },
          zone_e: {
            forward: "148.9",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Delhivery Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "39.5",
            rto: null,
          },
          zone_b: {
            forward: "41.7",
            rto: null,
          },
          zone_c: {
            forward: "45.0",
            rto: null,
          },
          zone_d: {
            forward: "52.2",
            rto: null,
          },
          zone_e: {
            forward: "58.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "66.1",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "3.2%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Amazon Shipping Surface 1kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "42.0",
            rto: null,
          },
          zone_b: {
            forward: "45.4",
            rto: null,
          },
          zone_c: {
            forward: "48.5",
            rto: null,
          },
          zone_d: {
            forward: "56.1",
            rto: null,
          },
          zone_e: {
            forward: "62.8",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "31.8",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Surface 20kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "20.0",
            rto: null,
          },
          zone_b: {
            forward: "23.6",
            rto: null,
          },
          zone_c: {
            forward: "30.8",
            rto: null,
          },
          zone_d: {
            forward: "38.2",
            rto: null,
          },
          zone_e: {
            forward: "43.6",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.7%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Amazon Shipping Surface 1kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "78.8",
            rto: "78.8",
          },
          zone_b: {
            forward: "92.2",
            rto: "92.2",
          },
          zone_c: {
            forward: "105.0",
            rto: "105.0",
          },
          zone_d: {
            forward: "115.0",
            rto: "115.0",
          },
          zone_e: {
            forward: "144.2",
            rto: "144.2",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "31.8",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "24.3",
            rto: null,
          },
          zone_b: {
            forward: "29.0",
            rto: null,
          },
          zone_c: {
            forward: "35.7",
            rto: null,
          },
          zone_d: {
            forward: "42.6",
            rto: null,
          },
          zone_e: {
            forward: "44.5",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "41.2",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.7%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Surface 10kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "18.7",
            rto: null,
          },
          zone_b: {
            forward: "22.3",
            rto: null,
          },
          zone_c: {
            forward: "34.5",
            rto: null,
          },
          zone_d: {
            forward: "42.4",
            rto: null,
          },
          zone_e: {
            forward: "46.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.7%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Dtdc Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "45.0",
            rto: null,
          },
          zone_b: {
            forward: "49.2",
            rto: null,
          },
          zone_c: {
            forward: "65.0",
            rto: null,
          },
          zone_d: {
            forward: "61.6",
            rto: null,
          },
          zone_e: {
            forward: "64.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "33.8",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Delhivery Surface 10kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "28.1",
            rto: null,
          },
          zone_b: {
            forward: "34.7",
            rto: null,
          },
          zone_c: {
            forward: "39.6",
            rto: null,
          },
          zone_d: {
            forward: "46.3",
            rto: null,
          },
          zone_e: {
            forward: "56.2",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "66.1",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "3.3%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Ekart Surface 10kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "23.6",
            rto: null,
          },
          zone_b: {
            forward: "25.5",
            rto: null,
          },
          zone_c: {
            forward: "32.7",
            rto: null,
          },
          zone_d: {
            forward: "41.8",
            rto: null,
          },
          zone_e: {
            forward: "47.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Ecom Express Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "23.0",
            rto: null,
          },
          zone_b: {
            forward: "27.1",
            rto: null,
          },
          zone_c: {
            forward: "33.4",
            rto: null,
          },
          zone_d: {
            forward: "39.7",
            rto: null,
          },
          zone_e: {
            forward: "43.8",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "45.4",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "1.8%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Dtdc Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "45.0",
            rto: null,
          },
          zone_b: {
            forward: "49.2",
            rto: null,
          },
          zone_c: {
            forward: "61.6",
            rto: null,
          },
          zone_d: {
            forward: "61.6",
            rto: null,
          },
          zone_e: {
            forward: "64.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "32.9",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "2.2%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Dtdc Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "89.4",
            rto: "89.4",
          },
          zone_b: {
            forward: "110.0",
            rto: "110.0",
          },
          zone_c: {
            forward: "134.4",
            rto: "134.4",
          },
          zone_d: {
            forward: "145.0",
            rto: "145.0",
          },
          zone_e: {
            forward: "199.1",
            rto: "199.1",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "33.8",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Amazon Shipping Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "88.0",
            rto: "88.0",
          },
          zone_b: {
            forward: "116.0",
            rto: "116.0",
          },
          zone_c: {
            forward: "134.8",
            rto: "134.8",
          },
          zone_d: {
            forward: "162.9",
            rto: "162.9",
          },
          zone_e: {
            forward: "198.8",
            rto: "198.8",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "36.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Ecom Express Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "83.0",
            rto: "83.0",
          },
          zone_b: {
            forward: "105.8",
            rto: "105.8",
          },
          zone_c: {
            forward: "129.8",
            rto: "129.8",
          },
          zone_d: {
            forward: "151.1",
            rto: "151.1",
          },
          zone_e: {
            forward: "192.8",
            rto: "192.8",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Xpressbees Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "101.7",
            rto: "81.3",
          },
          zone_b: {
            forward: "119.8",
            rto: "95.8",
          },
          zone_c: {
            forward: "145.0",
            rto: "116.0",
          },
          zone_d: {
            forward: "160.0",
            rto: "128.0",
          },
          zone_e: {
            forward: "200.0",
            rto: "160.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.7%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Delhivery Surface 2 Kgs",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "112.0",
            rto: "112.0",
          },
          zone_b: {
            forward: "126.0",
            rto: "126.0",
          },
          zone_c: {
            forward: "149.0",
            rto: "149.0",
          },
          zone_d: {
            forward: "164.0",
            rto: "164.0",
          },
          zone_e: {
            forward: "204.0",
            rto: "204.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.7%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Shadowfax Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "80.0",
            rto: "80.0",
          },
          zone_b: {
            forward: "100.0",
            rto: "100.0",
          },
          zone_c: {
            forward: "124.0",
            rto: "124.0",
          },
          zone_d: {
            forward: "136.0",
            rto: "136.0",
          },
          zone_e: {
            forward: "160.0",
            rto: "160.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "49.1",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Bluedart Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "118.0",
            rto: "118.0",
          },
          zone_b: {
            forward: "132.0",
            rto: "132.0",
          },
          zone_c: {
            forward: "155.2",
            rto: "155.2",
          },
          zone_d: {
            forward: "170.0",
            rto: "170.0",
          },
          zone_e: {
            forward: "210.0",
            rto: "210.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "44.2",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.7%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Ekart Surface 2kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "109.0",
            rto: "69.0",
          },
          zone_b: {
            forward: "130.8",
            rto: "96.3",
          },
          zone_c: {
            forward: "145.3",
            rto: "116.2",
          },
          zone_d: {
            forward: "181.6",
            rto: "134.4",
          },
          zone_e: {
            forward: "345.0",
            rto: "163.4",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Ekart Surface 5kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "148.5",
            rto: "98.4",
          },
          zone_b: {
            forward: "175.2",
            rto: "108.7",
          },
          zone_c: {
            forward: "197.9",
            rto: "131.9",
          },
          zone_d: {
            forward: "216.1",
            rto: "145.0",
          },
          zone_e: {
            forward: "406.7",
            rto: "221.1",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Xpressbees Surface 5kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "164.7",
            rto: "131.8",
          },
          zone_b: {
            forward: "181.5",
            rto: "145.2",
          },
          zone_c: {
            forward: "214.2",
            rto: "171.4",
          },
          zone_d: {
            forward: "230.7",
            rto: "184.5",
          },
          zone_e: {
            forward: "296.6",
            rto: "237.3",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "41.2",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.7%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_name: "Borzo 5kg",
          courier_weight: 5,
          zone_a: {
            forward: null,
            rto: "1054.0",
          },
          zone_b: {
            forward: null,
            rto: "1054.0",
          },
          zone_c: {
            forward: null,
            rto: "1054.0",
          },
          zone_d: {
            forward: null,
            rto: "1054.0",
          },
          zone_e: {
            forward: null,
            rto: "1054.0",
          },
          zone_e2: {
            forward: null,
            rto: "0.0",
          },
          cod_charges: {
            forward: null,
            rto: "0.0",
          },
          other_charges: {
            forward: null,
            rto: "0.0",
          },
          cod_percentage: {
            forward: null,
            rto: "0.0%",
          },
          type: {
            forward: null,
            rto: 2,
          },
          mode: "hyperlocal",
        },
        {
          courier_weight: 5,
          courier_name: "Dtdc Surface 5kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "212.4",
            rto: "228.2",
          },
          zone_b: {
            forward: "263.3",
            rto: "276.4",
          },
          zone_c: {
            forward: "282.5",
            rto: "282.5",
          },
          zone_d: {
            forward: "300.9",
            rto: "313.6",
          },
          zone_e: {
            forward: "352.8",
            rto: "352.8",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "32.9",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.2%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Delhivery Surface 5kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "214.9",
            rto: "214.9",
          },
          zone_b: {
            forward: "233.1",
            rto: "233.1",
          },
          zone_c: {
            forward: "251.2",
            rto: "251.2",
          },
          zone_d: {
            forward: "287.4",
            rto: "287.4",
          },
          zone_e: {
            forward: "323.6",
            rto: "323.6",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "66.1",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "3.2%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Amazon Shipping Surface 5kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "212.0",
            rto: "212.0",
          },
          zone_b: {
            forward: "227.7",
            rto: "227.7",
          },
          zone_c: {
            forward: "243.5",
            rto: "243.5",
          },
          zone_d: {
            forward: "280.9",
            rto: "280.9",
          },
          zone_e: {
            forward: "312.4",
            rto: "312.4",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "33.5",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Ecom Express Surface 5kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "170.1",
            rto: "121.0",
          },
          zone_b: {
            forward: "188.3",
            rto: "133.6",
          },
          zone_c: {
            forward: "220.5",
            rto: "155.7",
          },
          zone_d: {
            forward: "240.2",
            rto: "173.2",
          },
          zone_e: {
            forward: "300.0",
            rto: "194.2",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 10,
          courier_name: "Dtdc Surface 10kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "254.2",
            rto: "165.2",
          },
          zone_b: {
            forward: "294.0",
            rto: "191.2",
          },
          zone_c: {
            forward: "352.2",
            rto: "229.0",
          },
          zone_d: {
            forward: "365.0",
            rto: "242.0",
          },
          zone_e: {
            forward: "392.2",
            rto: "255.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "32.7",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 10,
          courier_name: "Amazon Shipping Surface 10kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "308.8",
            rto: "308.8",
          },
          zone_b: {
            forward: "356.0",
            rto: "356.0",
          },
          zone_c: {
            forward: "454.0",
            rto: "454.0",
          },
          zone_d: {
            forward: "454.0",
            rto: "454.0",
          },
          zone_e: {
            forward: "490.2",
            rto: "490.2",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "41.8",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 10,
          courier_name: "Delhivery Surface 10kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "303.8",
            rto: "303.8",
          },
          zone_b: {
            forward: "379.8",
            rto: "379.8",
          },
          zone_c: {
            forward: "439.6",
            rto: "439.6",
          },
          zone_d: {
            forward: "508.8",
            rto: "508.8",
          },
          zone_e: {
            forward: "613.6",
            rto: "613.6",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "66.1",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "3.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 10,
          courier_name: "Xpressbees Surface 10kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "216.4",
            rto: "173.0",
          },
          zone_b: {
            forward: "253.0",
            rto: "202.4",
          },
          zone_c: {
            forward: "354.0",
            rto: "283.2",
          },
          zone_d: {
            forward: "368.8",
            rto: "295.0",
          },
          zone_e: {
            forward: "499.8",
            rto: "399.8",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.7%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 10,
          courier_name: "Ekart Surface 10kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "272.4",
            rto: "188.8",
          },
          zone_b: {
            forward: "353.6",
            rto: "207.0",
          },
          zone_c: {
            forward: "409.8",
            rto: "259.2",
          },
          zone_d: {
            forward: "452.2",
            rto: "286.0",
          },
          zone_e: {
            forward: "759.0",
            rto: "366.8",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 10,
          courier_name: "Ecom Express Surface 10kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "224.6",
            rto: "189.0",
          },
          zone_b: {
            forward: "261.4",
            rto: "215.6",
          },
          zone_c: {
            forward: "320.8",
            rto: "235.4",
          },
          zone_d: {
            forward: "377.0",
            rto: "268.4",
          },
          zone_e: {
            forward: "390.2",
            rto: "319.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 20,
          courier_name: "Xpressbees Surface 20kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "400.0",
            rto: "340.0",
          },
          zone_b: {
            forward: "504.0",
            rto: "428.0",
          },
          zone_c: {
            forward: "588.0",
            rto: "500.0",
          },
          zone_d: {
            forward: "688.0",
            rto: "588.0",
          },
          zone_e: {
            forward: "900.0",
            rto: "764.0",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "45.4",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "2.7%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 20,
          courier_name: "Dtdc Surface 20kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "326.8",
            rto: "261.6",
          },
          zone_b: {
            forward: "366.8",
            rto: "293.2",
          },
          zone_c: {
            forward: "526.4",
            rto: "421.2",
          },
          zone_d: {
            forward: "635.2",
            rto: "508.4",
          },
          zone_e: {
            forward: "771.6",
            rto: "617.2",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "32.7",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "1.8%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
        {
          courier_weight: 20,
          courier_name: "Delhivery Surface 20kg",
          mode: "surface",
          ship_type: 1,
          zone_a: {
            forward: "555.2",
            rto: "555.2",
          },
          zone_b: {
            forward: "697.6",
            rto: "697.6",
          },
          zone_c: {
            forward: "806.4",
            rto: "806.4",
          },
          zone_d: {
            forward: "912.8",
            rto: "912.8",
          },
          zone_e: {
            forward: "1116.4",
            rto: "1116.4",
          },
          zone_e2: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_charges: {
            forward: "66.0",
            rto: "0.0",
          },
          other_charges: {
            forward: "0.0",
            rto: "0.0",
          },
          cod_percentage: {
            forward: "3.3%",
            rto: "0.0%",
          },
          type: {
            forward: 1,
            rto: 2,
          },
        },
      ],
      reverse_new: [
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Ros Reverse Air",
          mode: "air",
          ship_type: 2,
          zone_a: {
            forward: "81.9",
            rto: null,
          },
          zone_b: {
            forward: "96.3",
            rto: null,
          },
          zone_c: {
            forward: "114.8",
            rto: null,
          },
          zone_d: {
            forward: "131.5",
            rto: null,
          },
          zone_e: {
            forward: "196.6",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Delhivery Reverse Surface",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "89.0",
            rto: null,
          },
          zone_b: {
            forward: "105.7",
            rto: null,
          },
          zone_c: {
            forward: "124.2",
            rto: null,
          },
          zone_d: {
            forward: "140.9",
            rto: null,
          },
          zone_e: {
            forward: "159.5",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Ros Reverse Air (Additional 0.5Kg)",
          mode: "air",
          ship_type: 2,
          zone_a: {
            forward: "79.7",
            rto: null,
          },
          zone_b: {
            forward: "94.6",
            rto: null,
          },
          zone_c: {
            forward: "111.3",
            rto: null,
          },
          zone_d: {
            forward: "126.1",
            rto: null,
          },
          zone_e: {
            forward: "196.6",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Xpressbees Reverse Surface",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "83.0",
            rto: null,
          },
          zone_b: {
            forward: "98.0",
            rto: null,
          },
          zone_c: {
            forward: "117.0",
            rto: null,
          },
          zone_d: {
            forward: "132.0",
            rto: null,
          },
          zone_e: {
            forward: "150.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Delhivery Reverse Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "79.7",
            rto: null,
          },
          zone_b: {
            forward: "94.6",
            rto: null,
          },
          zone_c: {
            forward: "111.3",
            rto: null,
          },
          zone_d: {
            forward: "126.1",
            rto: null,
          },
          zone_e: {
            forward: "142.8",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Xpressbees Reverse Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "74.0",
            rto: null,
          },
          zone_b: {
            forward: "88.0",
            rto: null,
          },
          zone_c: {
            forward: "104.0",
            rto: null,
          },
          zone_d: {
            forward: "118.0",
            rto: null,
          },
          zone_e: {
            forward: "134.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shadowfax Reverse Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "40.0",
            rto: null,
          },
          zone_b: {
            forward: "48.0",
            rto: null,
          },
          zone_c: {
            forward: "62.2",
            rto: null,
          },
          zone_d: {
            forward: "64.7",
            rto: null,
          },
          zone_e: {
            forward: "75.4",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Shadowfax Reverse Surface",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "50.0",
            rto: null,
          },
          zone_b: {
            forward: "60.0",
            rto: null,
          },
          zone_c: {
            forward: "77.7",
            rto: null,
          },
          zone_d: {
            forward: "80.9",
            rto: null,
          },
          zone_e: {
            forward: "94.3",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Reverse Surface (Additional 0.5Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "64.1",
            rto: null,
          },
          zone_b: {
            forward: "73.7",
            rto: null,
          },
          zone_c: {
            forward: "97.9",
            rto: null,
          },
          zone_d: {
            forward: "105.3",
            rto: null,
          },
          zone_e: {
            forward: "125.1",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 0.5,
          courier_name: "Ecom Express Reverse Surface",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "79.3",
            rto: null,
          },
          zone_b: {
            forward: "88.7",
            rto: null,
          },
          zone_c: {
            forward: "107.7",
            rto: null,
          },
          zone_d: {
            forward: "115.9",
            rto: null,
          },
          zone_e: {
            forward: "137.6",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Delhivery Reverse Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "29.8",
            rto: null,
          },
          zone_b: {
            forward: "44.8",
            rto: null,
          },
          zone_c: {
            forward: "74.6",
            rto: null,
          },
          zone_d: {
            forward: "104.4",
            rto: null,
          },
          zone_e: {
            forward: "87.7",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Reverse Surface 2kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "53.2",
            rto: null,
          },
          zone_b: {
            forward: "60.2",
            rto: null,
          },
          zone_c: {
            forward: "74.4",
            rto: null,
          },
          zone_d: {
            forward: "88.6",
            rto: null,
          },
          zone_e: {
            forward: "99.2",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Reverse Surface 5kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "45.5",
            rto: null,
          },
          zone_b: {
            forward: "50.6",
            rto: null,
          },
          zone_c: {
            forward: "63.2",
            rto: null,
          },
          zone_d: {
            forward: "75.9",
            rto: null,
          },
          zone_e: {
            forward: "88.5",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Reverse Surface 1kg",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "132.8",
            rto: null,
          },
          zone_b: {
            forward: "147.5",
            rto: null,
          },
          zone_c: {
            forward: "162.3",
            rto: null,
          },
          zone_d: {
            forward: "177.0",
            rto: null,
          },
          zone_e: {
            forward: "286.2",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 1,
          courier_name: "Xpressbees Reverse Surface 1kg (Additional 1Kg)",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "112.2",
            rto: null,
          },
          zone_b: {
            forward: "123.8",
            rto: null,
          },
          zone_c: {
            forward: "135.7",
            rto: null,
          },
          zone_d: {
            forward: "153.3",
            rto: null,
          },
          zone_e: {
            forward: "265.5",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 3,
            rto: null,
          },
        },
        {
          courier_weight: 2,
          courier_name: "Xpressbees Reverse Surface 2kg",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "198.4",
            rto: null,
          },
          zone_b: {
            forward: "233.6",
            rto: null,
          },
          zone_c: {
            forward: "269.2",
            rto: null,
          },
          zone_d: {
            forward: "304.4",
            rto: null,
          },
          zone_e: {
            forward: "354.0",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Delhivery Reverse Surface 5kg",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "316.9",
            rto: null,
          },
          zone_b: {
            forward: "338.8",
            rto: null,
          },
          zone_c: {
            forward: "367.5",
            rto: null,
          },
          zone_d: {
            forward: "418.1",
            rto: null,
          },
          zone_e: {
            forward: "487.2",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
        {
          courier_weight: 5,
          courier_name: "Xpressbees Reverse Surface 5kg",
          mode: "surface",
          ship_type: 2,
          zone_a: {
            forward: "252.9",
            rto: null,
          },
          zone_b: {
            forward: "303.4",
            rto: null,
          },
          zone_c: {
            forward: "328.7",
            rto: null,
          },
          zone_d: {
            forward: "354.0",
            rto: null,
          },
          zone_e: {
            forward: "455.1",
            rto: null,
          },
          zone_e2: {
            forward: "0.0",
            rto: null,
          },
          cod_charges: {
            forward: "0.0",
            rto: null,
          },
          other_charges: {
            forward: "0.0",
            rto: null,
          },
          cod_percentage: {
            forward: "0.0%",
            rto: null,
          },
          type: {
            forward: 1,
            rto: null,
          },
        },
      ],
      document_new: [],
    },
    plan_id: 1,
  },
];
const RateCardTable = ({ name }) => {
  return (
    <Table
      className=""
      columns={columns}
      dataSource={data[0]["plan_rates"][name]}
    />
  );
};

export default RateCardTable;

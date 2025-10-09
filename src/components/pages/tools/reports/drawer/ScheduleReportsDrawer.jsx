import InputTag from "@/components/ui/formFields/InputTag";
import SelectTag from "@/components/ui/selectTag/SelectTag";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Drawer, Form, Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuDownload } from "react-icons/lu";
import { z } from "zod";
const mediumOptions = [
  { value: "all", label: "All" },
  { value: "email", label: "Email" },
  { value: "webhook", label: "Webhook" },
  { value: "whatsapp", label: "Whatsapp" },
];
const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const dayOfTheWeekOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];
const dayOfTheMonthOptions = [
  {
    value: "First day of the month",
    label: "First day of the month",
  },
  {
    value: "Last day of the month",
    label: "Last day of the month",
  },
  { value: "7th of the month", label: "7th of the month" },
  { value: "15th of the month", label: "15th of the month" },
];
const dateRangeOptions = [
  { value: "Yesterday", label: "Yesterday" },
  { value: "Today", label: "Today" },
  { value: "Last 7 days", label: "Last 7 days" },
  { value: "Last 15 days", label: "Last 15 days" },
  { value: "Last 30 days", label: "Last 30 days" },
];
const scheduleTimeOptions = [
  { value: "12:00 AM", label: "12:00 AM" },
  { value: "12:30 AM", label: "12:30 AM" },
  { value: "01:00 AM", label: "01:00 AM" },
  { value: "01:30 AM", label: "01:30 AM" },
  { value: "02:00 AM", label: "02:00 AM" },
  { value: "02:30 AM", label: "02:30 AM" },
  { value: "03:00 AM", label: "03:00 AM" },
  { value: "03:30 AM", label: "03:30 AM" },
  { value: "03:30 AM", label: "03:30 AM" },
  { value: "04:00 AM", label: "04:00 AM" },
  { value: "04:30 AM", label: "04:30 AM" },
  { value: "05:00 AM", label: "05:00 AM" },
  { value: "05:30 AM", label: "05:30 AM" },
  { value: "06:00 AM", label: "06:00 AM" },
  { value: "06:30 AM", label: "06:30 AM" },
  { value: "07:00 AM", label: "07:00 AM" },
  { value: "07:30 AM", label: "07:30 AM" },
  { value: "08:00 AM", label: "08:00 AM" },
  { value: "08:30 AM", label: "08:30 AM" },
  { value: "09:00 AM", label: "09:00 AM" },
  { value: "09:30 AM", label: "09:30 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "10:30 AM", label: "10:30 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "11:30 AM", label: "11:30 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "12:30 PM", label: "12:30 PM" },
  { value: "01:00 PM", label: "01:00 PM" },
  { value: "01:30 PM", label: "01:30 PM" },
  { value: "02:00 PM", label: "02:00 PM" },
  { value: "02:30 PM", label: "02:30 PM" },
  { value: "03:00 PM", label: "03:00 PM" },
  { value: "03:30 PM", label: "03:30 PM" },
  { value: "04:00 PM", label: "04:00 PM" },
  { value: "04:30 PM", label: "04:30 PM" },
  { value: "05:00 PM", label: "05:00 PM" },
  { value: "05:30 PM", label: "05:30 PM" },
  { value: "06:00 PM", label: "06:00 PM" },
  { value: "06:30 PM", label: "06:30 PM" },
  { value: "07:00 PM", label: "07:00 PM" },
  { value: "07:30 PM", label: "07:30 PM" },
  { value: "08:00 PM", label: "08:00 PM" },
  { value: "08:30 PM", label: "08:30 PM" },
  { value: "09:00 PM", label: "09:00 PM" },
  { value: "09:30 PM", label: "09:30 PM" },
  { value: "10:00 PM", label: "10:00 PM" },
  { value: "10:30 PM", label: "10:30 PM" },
  { value: "11:00 PM", label: "11:00 PM" },
  { value: "11:30 PM", label: "11:30 PM" },
];
const reportItems = [
  {
    key: "allOrderReport",
    label: "All Order Report",
    title: "All Orders",
    description:
      "Lifecycle of AWBs can be monitored through the report. Gives information about AWBs, SKUs, Zones, Type of Order (Prepaid/COD), Package Dimensions, Pickup Schedules and ETD (Estimated Time of Delivery)",
    insights:
      "Payment Mode, Channel %, Pickup location, Status of AWB, Estimated Date of Delivery",
    logic: "AWB generated date within selected date range",
  },
  {
    key: "ndrReport",
    label: "NDR Report",
    description:
      "This report will help sellers understand the NDR journey for their  shipments. Sellers can understand what shipments from what channels are getting stuck in NDR, verify customer details whose shipments are stuck in NDR and the last updated reason for NDR.",
    insights:
      "Payment Mode, Channel %, Pickup location, Status of AWB, Estimated Date of Delivery",
    logic:
      " Channel, SKU’s, Date of NDR raised, NDR attempts, Last updated NDR reason",
  },
  {
    key: "remittanceReport",
    label: "Remittance Report",
    description:
      " Gives information about cod reconciliation for delivered awb’s, helps sellers to keep track of incoming cod collected amount.",
    insights: "Remittance amount due between selected date range",
    logic:
      " Channel, SKU’s, Date of NDR raised, NDR attempts, Last updated NDR reason",
  },
  {
    key: "rtoOfdReport",
    label: "RTO OFD Report",
    description:
      "Lifecycle of AWBs can be monitored through the report. Gives information about AWBs, SKUs, Zones, Type of Order (Prepaid/COD), Package Dimensions, Pickup Schedules and ETD (Estimated Time of Delivery)",
    insights:
      "Payment Mode, Channel %, Pickup location, Status of AWB, Estimated Date of Delivery",
    logic:
      "  Payment Mode, Channel %, Pickup location, Status of AWB, Estimated Date of Delivery",
  },
  {
    key: "shipmentSummaryReport",
    label: "Shipment Summary Report",
    description:
      "This report is an overview of your Shipments processed through Pocket Parcel.",
    insights:
      "Total orders processed Pickup Failed % In Transit % Undelivered, Lost and Damaged %y",
    logic: "All the shipments which fall inbetween the selected date range.",
  },
  {
    key: "weightDiscrepancyReport",
    label: "Weight Discrepancy Report",
    description:
      "This report gives information about shipments with weight disputes raised by courier partners",
    insights: "Total Disputed Amount, % of Dispute closed",
    logic: "Weight Dispute raised within selected date range",
  },
];
const ReportContent = ({ title, description, insights, logic }) => (
  <div>
    <div className="flex justify-between mb-2">
      <h5>{title}</h5>
      <a href="" className="text-indigo-500 text-xs flex gap-2 items-center">
        <LuDownload /> Download Sample Reports
      </a>
    </div>
    <div className="bg-indigo-50 rounded-md p-2 text-sm flex flex-col gap-2 text-gray-800">
      <div>
        <p>Description:</p>
        <p>{description}</p>
      </div>
      <div>
        <p>Key Insights:</p>
        <p>{insights}</p>
      </div>
      <div>
        <p>Logic:</p>
        <p>{logic}</p>
      </div>
    </div>
  </div>
);
const scheduleSchema = z.object({
  medium: z.string({ required_error: "Medium is required" }),
  emailId: z.string().optional(),
  subjectOfEmailId: z.string().optional(),
  whatsAppNumber: z.string().optional(),
  webhookURL: z.string().optional(),
  webhookToken: z.string().optional(),
  frequency: z.string({ required_error: "Frequency is required" }),
  dateRange: z.string({ required_error: "Date Range is required" }),
  scheduleTime: z.string({ required_error: "Schedule time is required" }),
});

const ScheduleReportsDrawer = ({ onClose, open, setData }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      medium: undefined,
      emailId: undefined,
      subjectOfEmailId: undefined,
      whatsAppNumber: undefined,
      webhookURL: undefined,
      webhookToken: undefined,
      frequency: undefined,
      dayOfTheWeek: undefined,
      dayOfTheMonth: undefined,
      dateRange: undefined,
      scheduleTime: undefined,
    },
  });
  const [reportType, setReportType] = useState("allOrderReport");
  const medium = watch("medium");
  const frequency = watch("frequency");
  const onSubmit = (data) => {
    console.log("data", { ...data, reportType });
    const formData = {
      report_type: reportType,
      sent_via: data?.medium,
      sent_to:
        data?.medium === "all"
          ? `${data?.emailId} ${data?.whatsAppNumber} ${data?.webhookToken} ${data?.webhookURL}`
          : data?.medium === "whatsapp"
            ? data?.whatsAppNumber
            : data?.medium === "email"
              ? data?.emailId
              : data?.medium === "webhook"
                ? data?.webhookURL
                : "",
      frequency: data?.frequency,
    };
    setData((prev) => [...prev, formData]);
  };
  const onError = (errors) => {
    console.log("Errors:", errors);
  };
  const handleSelectReportType = (data) => {
    setReportType(data);
  };
  return (
    <Drawer
      title="Schedule Report"
      onClose={onClose}
      open={open}
      size={"large"}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit, onError)}>
        <div className="space-y-4">
          <div className="">
            <h5>Select Report Type</h5>
            <small className="text-gray-500">
              Select the type of report you want to schedule
            </small>
          </div>
          <div className="border rounded-md p-2">
            <Tabs
              tabPosition="left"
              items={reportItems.map(({ key, label, ...content }) => ({
                key,
                label,
                children: <ReportContent {...content} />,
              }))}
              onChange={handleSelectReportType}
            />
          </div>
          <SelectTag
            required={true}
            label={"Send report via"}
            subLabel={"Select the medium eg: email, whatsapp or webhook"}
            placeholder="Select report medium"
            name={"medium"}
            options={mediumOptions}
            control={control}
            useForm={true}
          />
          {(medium === "all" || medium === "email") && (
            <div>
              <InputTag
                label={"Email IDs( Upto 10 Email IDs are allowed )"}
                placeholder={
                  "Enter multiple email ID's separated by comma and press enter"
                }
                name={"emailId"}
                control={control}
                useForm={true}
              />
              <InputTag
                label={"Subject of Email"}
                placeholder={"Enter your subject of Email"}
                name={"subjectOfEmailId"}
                control={control}
                useForm={true}
              />
            </div>
          )}
          {(medium === "all" || medium === "whatsapp") && (
            <InputTag
              label={"Whatsapp Number( Upto 10 Subjects are allowed )"}
              placeholder={
                "Enter multiple WhatsApp number separated by comma and press enter"
              }
              name={"whatsAppNumber"}
              control={control}
              useForm={true}
            />
          )}
          {(medium === "all" || medium === "webhook") && (
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                label={"Webhook URL"}
                placeholder={"Enter Webhook URL"}
                name={"webhookURL"}
                control={control}
                useForm={true}
              />
              <InputTag
                label={"Webhook Token"}
                placeholder={"Enter Webhook Token"}
                name={"webhookToken"}
                control={control}
                useForm={true}
              />
            </div>
          )}
          <hr />
          <div className="grid grid-cols-2 gap-4">
            <SelectTag
              label={"Frequency"}
              subLabel={"Select frequency of the report"}
              placeholder="Select frequency of the sending report"
              name={"frequency"}
              options={frequencyOptions}
              control={control}
              useForm={true}
            />
            {frequency === "weekly" && (
              <SelectTag
                label={"Select the day of the week"}
                subLabel={"Select which day of the week you want the report"}
                placeholder="Select the day of the week"
                name={"dayOfTheWeek"}
                options={dayOfTheWeekOptions}
                control={control}
                useForm={true}
              />
            )}
            {frequency === "monthly" && (
              <SelectTag
                label={"Select day of the Month"}
                subLabel={"Select which day of the month you want the report"}
                placeholder="Select which day of the month you want the report"
                name={"dayOfTheMonth"}
                options={dayOfTheMonthOptions}
                control={control}
                useForm={true}
              />
            )}
          </div>
          <hr />
          <SelectTag
            label={"Date Range"}
            subLabel={
              " Select the range of days you want to receive the report for"
            }
            placeholder="Select date range"
            name={"dateRange"}
            options={dateRangeOptions}
            control={control}
            useForm={true}
          />
          <SelectTag
            label={"Schedule Time"}
            subLabel={"Select the time of the day to receive the report"}
            placeholder="Select Schedule Time"
            name={"scheduleTime"}
            options={scheduleTimeOptions}
            control={control}
            useForm={true}
          />
          <hr />
          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button> Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default ScheduleReportsDrawer;

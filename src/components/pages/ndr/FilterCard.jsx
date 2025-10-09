import FiltersModal from "@/components/pages/ndr/FiltersModal";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button, DatePicker, Radio, Select } from "antd";
import dayjs from "dayjs";

// --- Constants ---

const ESCALATION_STATUS_OPTIONS = [
  { label: "New Cases", value: "NEW_CASES" },
  { label: "Processed", value: "PROCESSED" },
  { label: "Mailed", value: "MAILED" },
  { label: "Closed", value: "CLOSED" },
];

const BUCKET_CODE_OPTIONS = [
  { label: "Customer unavailable", value: "Customer unavailable" },
  { label: "Rejected by customer", value: "Rejected by customer" },
  { label: "Delivery rescheduled", value: "Delivery rescheduled" },
  { label: "No attempt", value: "No attempt" },
  { label: "Customer unreachable", value: "Customer unreachable" },
  { label: "Address issue", value: "Address issue" },
  { label: "Payment issue", value: "Payment issue" },
  { label: "Out of delivery area", value: "Out of delivery area" },
  { label: "Order already cancelled", value: "Order already cancelled" },
  { label: "Self collect", value: "Self collect" },
  {
    label: "Shipment seized by customer",
    value: "Shipment seized by customer",
  },
  {
    label: "Customer wants open delivery",
    value: "Customer wants open delivery",
  },
  {
    label: "Shipment misrouted by logistics partner",
    value: "Shipment misrouted by logistics partner",
  },
  { label: "OTP-based cancellation", value: "OTP-based cancellation" },
  {
    label: "OTP mismatch or unavailable",
    value: "OTP mismatch or unavailable",
  },
  {
    label: "Appointment required – delivery pending",
    value: "Appointment required – delivery pending",
  },
  {
    label: "Delivery delayed – external factors",
    value: "Delivery delayed – external factors",
  },
  { label: "Exception", value: "Exception" },
];

const CARRIER_PARTNER_OPTIONS = [
  { label: "SELF - Self Demo", value: "self" },
  { label: "Bluedart - Bluedart", value: "BLUEDART" },
  { label: "DTDC - PP <> DTDC", value: "DTDC" },
];

const FilterCard = () => {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();

  const handleSearchChange = (updates) => {
    navigate({ search: { ...search, ...updates } });
  };

  const {
    escalation_status = "NEW_CASES",
    ndr_bucket_code,
    cp,
    allocated_from_date,
    allocated_end_date,
    start_date,
    end_date,
  } = search;

  const dateRange = [
    allocated_from_date ? dayjs(allocated_from_date, "YYYY-MM-DD") : null,
    allocated_end_date ? dayjs(allocated_end_date, "YYYY-MM-DD") : null,
  ];
  const ndrDateRange = [
    start_date ? dayjs(start_date, "YYYY-MM-DD") : null,
    end_date ? dayjs(end_date, "YYYY-MM-DD") : null,
  ];
  return (
    <ResponsiveCard
      title="Filters"
      size="small"
      extra={
        <Button size="small" onClick={() => navigate({ search: {} })}>
          Clear
        </Button>
      }
    >
      {/* Escalation Status */}
      <Radio.Group
        size="small"
        buttonStyle="solid"
        value={escalation_status}
        onChange={(e) =>
          handleSearchChange({ escalation_status: e.target.value })
        }
      >
        {ESCALATION_STATUS_OPTIONS.map(({ label, value }) => (
          <Radio.Button key={value} value={value}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>

      {/* Filter Fields */}
      <div className="flex flex-wrap gap-2 mt-4">
        {/* Carrier Partner */}
        <Select
          size="small"
          mode="multiple"
          allowClear
          style={{ minWidth: 180 }}
          placeholder="Carrier Partner"
          value={cp}
          options={CARRIER_PARTNER_OPTIONS}
          onChange={(val) => handleSearchChange({ cp: val })}
        />

        {/* NDR Bucket Code */}
        <Select
          size="small"
          mode="multiple"
          allowClear
          style={{ minWidth: 200 }}
          placeholder="NDR Bucket Code"
          value={ndr_bucket_code}
          options={BUCKET_CODE_OPTIONS}
          onChange={(val) => handleSearchChange({ ndr_bucket_code: val })}
        />
        {/* NDR Date */}

        <DatePicker.RangePicker
          size="small"
          style={{ minWidth: 230 }}
          value={ndrDateRange}
          onChange={(dates) =>
            handleSearchChange({
              start_date: dates?.[0] ? dates[0].format("YYYY-MM-DD") : null,
              end_date: dates?.[1] ? dates[1].format("YYYY-MM-DD") : null,
            })
          }
          placeholder={"NDR Date"}
        />
        {/* Date Range */}
        <DatePicker.RangePicker
          size="small"
          style={{ minWidth: 230 }}
          value={dateRange}
          onChange={(dates) =>
            handleSearchChange({
              allocated_from_date: dates?.[0]
                ? dates[0].format("YYYY-MM-DD")
                : null,
              allocated_end_date: dates?.[1]
                ? dates[1].format("YYYY-MM-DD")
                : null,
            })
          }
          placeholder={"Allocation Date"}
        />
        <FiltersModal />
      </div>
    </ResponsiveCard>
  );
};

export default FilterCard;

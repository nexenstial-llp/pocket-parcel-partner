import dayjs from "dayjs";

export const presetDateRanges = [
  {
    label: "Today",
    value: [dayjs(), dayjs()],
  },
  {
    label: "Yesterday",
    value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")],
  },
  {
    label: "Last 7 days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 30 days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "This Month",
    value: [dayjs().startOf("month"), dayjs()],
  },
  {
    label: "Last Month",
    value: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  },
  {
    label: "Last 45 days",
    value: [dayjs().add(-45, "d"), dayjs()],
  },
];

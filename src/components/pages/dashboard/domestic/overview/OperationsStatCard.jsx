/* eslint-disable react/prop-types */

import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { cn } from "@/utils/classname.util";
import { Row, Col } from "antd";
import DefaultExtraContent from "./DefaultExtraContent";

/**
 * OperationsStatCard - A reusable, scalable dashboard stat card for operations.
 *
 * @param {string} title - The title of the stat (e.g., "Today's Orders")
 * @param {object[]} stats - An array of objects containing the stat data in the format { label: string, value: number|string }
 * @param {string} className - Optional class name for the card
 * @param {JSX.Element} extra - Optional extra content to display in the card header
 * @param {string} bgColor - Optional background color for the card (default: "#dadafc")
 * @param {string} itemsBgColor - Optional background color for the stat items (default: "#fff")
 * @param {number} xs - number of columns for the card in the xs breakpoint (default: 12)
 * @param {number} sm - number of columns for the card in the sm breakpoint (default: 8)
 * @param {number} md - number of columns for the card in the md breakpoint (default: 8)
 * @param {number} lg - number of columns for the card in the lg breakpoint (default: 4)
 */
const OperationsStatCard = ({
  title,
  stats = [],
  className,
  extra,
  bgColor = "",
  itemsBgColor = "#f6f6f6",
  xs = 12,
  sm = 8,
  md = 8,
  lg = 4,
}) => {
  return (
    <ResponsiveCard
      style={{ background: bgColor }}
      shadow
      className={cn("col-span-12 md:col-span-8 ", className)}
      size="small"
    >
      {/* Header */}
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <p className="font-semibold text-base">{title}</p>
        </Col>
        {extra ? { extra } : <DefaultExtraContent />}
      </Row>

      {/* Stats Grid */}
      <Row gutter={[16, 16]}>
        {stats.map((item, idx) => (
          <Col key={idx} xs={xs} sm={sm} md={md} lg={lg}>
            <div className="flex flex-col justify-center items-center text-center gap-1">
              <div
                className="text-xl size-14 flex justify-center items-center rounded-2xl font-semibold"
                style={{ backgroundColor: itemsBgColor }}
              >
                {item.value}
              </div>

              <div className="text-[12px]">{item.label}</div>
            </div>
          </Col>
        ))}
      </Row>
    </ResponsiveCard>
  );
};

export default OperationsStatCard;

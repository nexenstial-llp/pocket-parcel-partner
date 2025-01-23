import { cn } from "@/lib/utils";
import { Table } from "antd";
import React from "react";

const ResponsiveTable = ({ columns, dataSource, className, ...rest }) => {
  const responsiveClassName = cn("w-full min-w-[600px] ", className);
  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        className={responsiveClassName}
        {...rest}
      />
    </div>
  );
};

export default ResponsiveTable;

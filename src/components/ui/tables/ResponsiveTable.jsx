/* eslint-disable react/prop-types */

import { Table } from "antd";
import { cn } from "../../../utils/classname.util";

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

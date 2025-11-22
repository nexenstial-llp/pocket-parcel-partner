/* eslint-disable react/prop-types */
import { Pagination } from "antd";
import { useRouter, useSearch } from "@tanstack/react-router";
import { cn } from "@/utils/classname.util";

function UrlPagination({
  total,
  align = "end",
  showSizeChanger = true,
  showQuickJumper = true,
  className,
}) {
  const router = useRouter();
  const { page, limit } = useSearch({ strict: false });

  const handleChange = (page, limit) => {
    router.navigate({
      search: (prev) => ({
        ...prev, // keep search / date filters etc
        page,
        limit,
      }),
    });
  };
  return (
    <div className={cn("mt-4", className)}>
      <Pagination
        align={align}
        total={total}
        current={page}
        pageSize={limit}
        onChange={handleChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
}

export default UrlPagination;

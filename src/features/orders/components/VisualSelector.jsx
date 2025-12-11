/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance.util";
import { Spin, Typography } from "antd";
import { CodeSandboxOutlined } from "@ant-design/icons";
import AWSImage from "@/components/ui/AWSImage";

const { Text } = Typography;

const VisualSelector = ({
  value,
  onChange,
  fetchUrl,
  queryKey,
  params = {},
  dataPoint = "data",
  labelField = "name",
  valueField = "id",
  imageField = "image_key",
  disabled = false,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await axiosInstance.get(fetchUrl, {
        params: { limit: 100, is_active: true, ...params },
      });
      return response.data;
    },
    enabled: !disabled && !!fetchUrl,
  });

  // Handle nested data points like data.items
  const items = data?.data?.[dataPoint] || [];

  const handleSelect = (id) => {
    if (!disabled) {
      onChange?.(id);
    }
  };

  if (isLoading && !disabled) {
    return (
      <div className="flex justify-center p-4">
        <Spin />
      </div>
    );
  }

  if (disabled || items.length === 0) {
    if (disabled) return null;
    return <div className="text-gray-400 text-sm p-4">No items available</div>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-gray-200">
      {items.map((item) => {
        const isSelected = value === item[valueField];
        const imageUrl = item[imageField] || null;

        return (
          <div
            key={item[valueField]}
            onClick={() => handleSelect(item[valueField])}
            className={`
              flex flex-col items-center justify-center 
              min-w-[120px] w-[120px] h-[120px] 
              border rounded-xl cursor-pointer transition-all duration-200 shrink-0
              ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-100"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
              }
            `}
          >
            <div className="mb-3 text-3xl text-gray-400 flex items-center justify-center h-12 w-12">
              {imageUrl ? (
                <AWSImage
                  height={50}
                  width={50}
                  preview={false}
                  s3Key={imageUrl}
                  alt={item[labelField]}
                  className="object-contain"
                />
              ) : (
                <CodeSandboxOutlined />
              )}
            </div>
            <Text
              className={`text-center text-sm px-2 leading-tight w-full truncate ${
                isSelected ? "text-blue-600 font-medium" : "text-gray-600"
              }`}
            >
              {item[labelField]}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default VisualSelector;

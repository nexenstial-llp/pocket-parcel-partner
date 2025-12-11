/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance.util";
import { Spin, Typography } from "antd";
import { CodeSandboxOutlined } from "@ant-design/icons";
import AWSImage from "@/components/ui/AWSImage";

const { Text } = Typography;

const CategorySelector = ({ value, onChange }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories_visual"],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/admin/categories", {
        params: { limit: 100, is_active: true },
      });
      return response.data;
    },
  });

  const categories = data?.data?.categories || [];

  const handleSelect = (id) => {
    onChange?.(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-gray-200">
      {categories.map((cat) => {
        const isSelected = value === cat.id;
        const imageUrl = cat.image_key || null;
        console.log("imageUrl", imageUrl);

        return (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`
              flex flex-col items-center justify-center 
              min-w-[120px] w-[120px] h-[120px] 
              border rounded-xl cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-100"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
              }
            `}
          >
            <div className="mb-3 text-3xl text-gray-400">
              {imageUrl ? (
                <AWSImage
                  height={50}
                  width={50}
                  preview={false}
                  s3Key={imageUrl}
                  alt={cat.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : null}
              {/* Fallback Icon */}
              <CodeSandboxOutlined
                style={{ display: imageUrl ? "none" : "block" }}
              />
            </div>
            <Text
              className={`text-center text-sm px-2 leading-tight ${
                isSelected ? "text-blue-600 font-medium" : "text-gray-600"
              }`}
            >
              {cat.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector;

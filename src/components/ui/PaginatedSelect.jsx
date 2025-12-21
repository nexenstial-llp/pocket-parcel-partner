/* eslint-disable react/prop-types */
import { useCallback, useMemo, useState, useEffect } from "react";
import { Select, Spin, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import axiosInstance from "@/utils/axiosInstance.util";

const getNestedValue = (obj, path) => {
  if (!path || typeof path !== "string") return obj;
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

const PaginatedSelect = ({
  placeholder = "Search items",
  fetchUrl = "/api/search",
  fetchUrlItem,
  queryKey = "select-items",
  debounceTime = 400,
  pageSize = 20,
  style = { width: "100%" },
  onChange,
  value,
  initialLabel, // New prop to accept initial label for the value
  mode,
  labelField = "name",
  valueField = "id",
  defaultParams = {},
  renderOption = null,
  disabled = false,
  sort_by,
  sort_order,
  dropdownRender,
  dataPoint,
  initialItems, // Array of full objects for initial values in multi-select
}) => {
  const [searchText, setSearchText] = useState();
  const [showSelect, setShowSelect] = useState(false);
  const [initialItemDetails, setInitialItemDetails] = useState(null);

  const formatOptions = useCallback(
    (items) => {
      if (!items || !Array.isArray(items)) return [];
      return items.map((item) => ({
        label: renderOption
          ? renderOption(item)
          : getNestedValue(item, labelField),
        value: getNestedValue(item, valueField),
        data: item,
      }));
    },
    [labelField, valueField, renderOption]
  );

  // Format initial items if provided
  const initialOptions = useMemo(() => {
    if (!initialItems || !Array.isArray(initialItems)) return [];
    return formatOptions(initialItems);
  }, [initialItems, formatOptions]);

  // Initialize with provided label if available
  useEffect(() => {
    if (value && initialLabel && !initialItemDetails && mode !== "multiple") {
      setInitialItemDetails({
        [valueField]: value,
        [labelField]: initialLabel,
      });
    }
  }, [value, initialLabel, valueField, labelField, initialItemDetails, mode]);

  // Fetch initial item details if we have a value but no details and no initialLabel
  const { data: itemDetailsData, isLoading: itemDetailsLoading } = useQuery({
    queryKey: [`${queryKey}-details`, value],
    queryFn: async () => {
      // Only fetch if we have a value and need to show the details and don't have initialLabel
      if (!value || initialItemDetails) return null;
      try {
        const response = await axiosInstance.get(
          `${fetchUrlItem || fetchUrl}/${value}`
        );
        return response.data.data;
      } catch (error) {
        console.error("Failed to fetch item details:", error);
        // Return a minimal object with the ID so we can show something
        return {
          [valueField]: value,
          [labelField]: `Item ${value}`,
        };
      }
    },
    enabled: !!value && !initialItemDetails && mode !== "multiple",
  });
  // Store fetched item details
  useEffect(() => {
    if (itemDetailsData) {
      setInitialItemDetails(itemDetailsData);
    }
  }, [itemDetailsData]);

  const fetchItems = useCallback(
    async ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        limit: pageSize,
        search: searchText,
        sort_by,
        sort_order,
        ...defaultParams,
      };

      const response = await axiosInstance.get(fetchUrl, { params });
      const data = response.data;

      let items = [];
      let hasMore = false;

      if (Array.isArray(data.data?.[dataPoint])) {
        // ✅ Case: `/v1/product` (data is a direct array)
        items = data.data?.[dataPoint];
        hasMore = data.data.pagination?.hasMore || false;
      } else if (Array.isArray(data.data)) {
        // ✅ Case: `/v1/customer` (data.data exists)
        items = data.data;
        hasMore = data.data.pagination?.hasMore || false;
      } else if (data.data?.items) {
        // ✅ Case: `/v1/customer` (data.items exists)
        items = data.data.items;

        hasMore = data.data.pagination?.hasMore || false;
      }

      return {
        items,
        nextPage: hasMore ? pageParam + 1 : undefined,
      };
    },
    [
      fetchUrl,
      pageSize,
      searchText,
      defaultParams,
      sort_by,
      sort_order,
      dataPoint,
    ]
  );

  const debouncedSetSearchText = useCallback(
    () => debounce((text) => setSearchText(text), debounceTime),
    [debounceTime]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKey, searchText, defaultParams],
      queryFn: fetchItems,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      staleTime: 60000, // keep previous data for 1 min to avoid flickering
    });

  const options = useMemo(() => {
    let fetchedOptions = [];
    if (data?.pages) {
      fetchedOptions = data.pages.flatMap((page) => formatOptions(page.items));
    }

    // Merge fetched options with initial options to ensure selected items always have labels
    // We use a Map to avoid duplicates, prioritizing fetched options if they exist (might be more up to date)
    const optionMap = new Map();

    // Add initial options first
    initialOptions.forEach((opt) => optionMap.set(opt.value, opt));

    // Add/Overwrite with fetched options
    fetchedOptions.forEach((opt) => optionMap.set(opt.value, opt));

    return Array.from(optionMap.values());
  }, [data?.pages, formatOptions, initialOptions]);

  const handleSearch = (text) => {
    debouncedSetSearchText(text);
  };

  const handlePopupScroll = (e) => {
    const { target } = e;
    if (
      !isFetchingNextPage &&
      hasNextPage &&
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 30
    ) {
      fetchNextPage();
    }
  };

  const handleClearSelection = (e) => {
    if (e) e.stopPropagation();
    if (disabled) return;
    onChange(undefined);
    setInitialItemDetails(undefined);
    setShowSelect(true);
  };

  const handleSelectChange = (newValue) => {
    onChange(newValue);
    // For single select, hide the dropdown after selection
    if (mode !== "multiple") {
      setShowSelect(!newValue);
      if (!newValue) {
        setInitialItemDetails(undefined);
      }
    }
  };

  // If we have a value selected but not showing the dropdown (Single select only)
  if (!showSelect && value && mode !== "multiple") {
    // Find display name from different sources
    let displayContent;

    if (itemDetailsLoading) {
      // Show loading spinner if we're fetching data
      displayContent = (
        <>
          <Spin size="small" /> Loading item details...
        </>
      );
    } else if (initialItemDetails && initialItemDetails[labelField]) {
      // Show name from fetched item details
      displayContent = initialItemDetails[labelField];
    } else {
      // Find in already loaded options
      const selectedOption = options.find((option) => option.value === value);
      displayContent = selectedOption ? selectedOption.label : `Item ${value}`;
    }
    return (
      <Tag
        className="selected-item-tag"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "3px 10px",
          cursor: disabled ? "default" : "pointer",
          backgroundColor: "#f5f5f5",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          fontSize: "14px",
          width: "100%",
          ...style,
        }}
        onClick={() => !disabled && setShowSelect(true)}
      >
        <div
          style={{
            maxWidth: "calc(100% - 24px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {typeof displayContent === "string" && displayContent.length > 32
            ? `${displayContent.substring(0, 32)}...`
            : displayContent}
        </div>

        {!disabled && (
          <CloseCircleOutlined
            onClick={handleClearSelection}
            style={{ marginLeft: "8px" }}
          />
        )}
      </Tag>
    );
  }

  return (
    <Select
      mode={mode}
      value={value}
      placeholder={placeholder}
      filterOption={false}
      showSearch
      onSearch={handleSearch}
      onChange={handleSelectChange}
      onPopupScroll={handlePopupScroll}
      style={style}
      options={options}
      loading={isLoading}
      notFoundContent={isLoading ? <Spin size="small" /> : "No data found"}
      allowClear
      disabled={disabled}
      dropdownRender={dropdownRender}
      onBlur={() => {
        if (mode !== "multiple" && value) {
          setShowSelect(false);
        }
      }}
    />
  );
};

export default PaginatedSelect;
